import ProductModel from '../models/product.model.js';
import { CategoryModel } from '../models/category.model.js';
import SubCategoryModel from '../models/subCategory.model.js';
import { uploadImageToCloudinary, deleteImageFromCloudinary } from '../utils/cloudinary.js';

// Create product
export const createProductController = async (req, res) => {
    try {
        const {
            name,
            description,
            price,
            discountPrice,
            stock,
            category,
            subCategory,
            brand,
            weight,
            dimensions,
            tags,
            isFeatured,
            seoTitle,
            seoDescription,
            attributes,
            variants
        } = req.body;

        // Validate required fields
        if (!name || !description || !price || !category || !subCategory) {
            return res.status(400).json({
                message: 'Please provide all required fields',
                error: true,
                success: false
            });
        }

        // Check if category exists
        const categoryExists = await CategoryModel.findById(category);
        if (!categoryExists) {
            return res.status(404).json({
                message: 'Category not found',
                error: true,
                success: false
            });
        }

        // Check if subcategory exists and belongs to the category
        const subCategoryExists = await SubCategoryModel.findOne({
            _id: subCategory,
            category: category
        });
        if (!subCategoryExists) {
            return res.status(404).json({
                message: 'Subcategory not found or does not belong to the specified category',
                error: true,
                success: false
            });
        }

        // Handle image uploads if provided
        let imageUrls = [];
        if (req.files && req.files.length > 0) {
            const uploadPromises = req.files.map(file =>
                uploadImageToCloudinary(file.path, 'products')
            );
            const uploadResults = await Promise.all(uploadPromises);
            imageUrls = uploadResults
                .filter(result => result.success)
                .map(result => result.url);
        }

        const productData = {
            name,
            description,
            price: parseFloat(price),
            stock: parseInt(stock),
            category,
            subCategory,
            images: imageUrls,
            brand,
            weight: weight ? parseFloat(weight) : null,
            dimensions: dimensions ? {
                length: parseFloat(dimensions.length) || null,
                width: parseFloat(dimensions.width) || null,
                height: parseFloat(dimensions.height) || null
            } : {},
            tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
            isFeatured: isFeatured === 'true',
            seoTitle,
            seoDescription,
            attributes: attributes ? JSON.parse(attributes) : [],
            variants: variants ? JSON.parse(variants) : []
        };

        if (discountPrice) {
            productData.discountPrice = parseFloat(discountPrice);
        }

        const product = new ProductModel(productData);
        const savedProduct = await product.save();

        const populatedProduct = await ProductModel.findById(savedProduct._id)
            .populate('category', 'name')
            .populate('subCategory', 'name');

        return res.json({
            message: 'Product created successfully',
            data: populatedProduct,
            error: false,
            success: true
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
};

// Get all products with filtering and pagination
export const getAllProductsController = async (req, res) => {
    try {
        const {
            page = 1,
            limit = 12,
            category,
            subCategory,
            minPrice,
            maxPrice,
            search,
            sortBy = 'createdAt',
            sortOrder = 'desc',
            isActive = 'true',
            isFeatured
        } = req.query;

        const query = {};

        // Filter by active status
        if (isActive !== undefined) {
            query.isActive = isActive === 'true';
        }

        // Filter by category
        if (category) {
            query.category = category;
        }

        // Filter by subcategory
        if (subCategory) {
            query.subCategory = subCategory;
        }

        // Filter by price range
        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = parseFloat(minPrice);
            if (maxPrice) query.price.$lte = parseFloat(maxPrice);
        }

        // Filter by featured
        if (isFeatured !== undefined) {
            query.isFeatured = isFeatured === 'true';
        }

        // Search in name and description
        if (search) {
            query.$text = { $search: search };
        }

        const sortOptions = {};
        sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;

        const products = await ProductModel.find(query)
            .populate('category', 'name')
            .populate('subCategory', 'name')
            .sort(sortOptions)
            .limit(parseInt(limit))
            .skip((parseInt(page) - 1) * parseInt(limit));

        const totalProducts = await ProductModel.countDocuments(query);
        const totalPages = Math.ceil(totalProducts / parseInt(limit));

        return res.json({
            message: 'Products retrieved successfully',
            data: {
                products,
                pagination: {
                    currentPage: parseInt(page),
                    totalPages,
                    totalProducts,
                    hasNextPage: parseInt(page) < totalPages,
                    hasPrevPage: parseInt(page) > 1
                }
            },
            error: false,
            success: true
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
};

// Get single product by ID
export const getProductByIdController = async (req, res) => {
    try {
        const { productId } = req.params;

        const product = await ProductModel.findById(productId)
            .populate('category', 'name description')
            .populate('subCategory', 'name description');

        if (!product) {
            return res.status(404).json({
                message: 'Product not found',
                error: true,
                success: false
            });
        }

        return res.json({
            message: 'Product retrieved successfully',
            data: product,
            error: false,
            success: true
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
};

// Update product
export const updateProductController = async (req, res) => {
    try {
        const { productId } = req.params;
        const updateData = req.body;

        // Handle image uploads if provided
        if (req.files && req.files.length > 0) {
            const uploadPromises = req.files.map(file =>
                uploadImageToCloudinary(file.path, 'products')
            );
            const uploadResults = await Promise.all(uploadPromises);
            const newImageUrls = uploadResults
                .filter(result => result.success)
                .map(result => result.url);

            if (newImageUrls.length > 0) {
                updateData.images = newImageUrls;
            }
        }

        // Parse JSON fields
        if (updateData.attributes) {
            updateData.attributes = JSON.parse(updateData.attributes);
        }
        if (updateData.variants) {
            updateData.variants = JSON.parse(updateData.variants);
        }
        if (updateData.dimensions) {
            updateData.dimensions = JSON.parse(updateData.dimensions);
        }
        if (updateData.tags) {
            updateData.tags = updateData.tags.split(',').map(tag => tag.trim());
        }

        // Convert numeric fields
        if (updateData.price) updateData.price = parseFloat(updateData.price);
        if (updateData.discountPrice) updateData.discountPrice = parseFloat(updateData.discountPrice);
        if (updateData.stock) updateData.stock = parseInt(updateData.stock);
        if (updateData.weight) updateData.weight = parseFloat(updateData.weight);
        if (updateData.isFeatured !== undefined) updateData.isFeatured = updateData.isFeatured === 'true';

        const updatedProduct = await ProductModel.findByIdAndUpdate(
            productId,
            updateData,
            { new: true, runValidators: true }
        ).populate('category', 'name').populate('subCategory', 'name');

        if (!updatedProduct) {
            return res.status(404).json({
                message: 'Product not found',
                error: true,
                success: false
            });
        }

        return res.json({
            message: 'Product updated successfully',
            data: updatedProduct,
            error: false,
            success: true
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
};

// Delete product
export const deleteProductController = async (req, res) => {
    try {
        const { productId } = req.params;

        const product = await ProductModel.findById(productId);
        if (!product) {
            return res.status(404).json({
                message: 'Product not found',
                error: true,
                success: false
            });
        }

        // Delete associated images from cloudinary
        if (product.images && product.images.length > 0) {
            const deletePromises = product.images.map(imageUrl => {
                // Extract public ID from cloudinary URL
                const publicId = imageUrl.split('/').pop().split('.')[0];
                return deleteImageFromCloudinary(publicId);
            });
            await Promise.all(deletePromises);
        }

        await ProductModel.findByIdAndDelete(productId);

        return res.json({
            message: 'Product deleted successfully',
            error: false,
            success: true
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
};

// Get featured products
export const getFeaturedProductsController = async (req, res) => {
    try {
        const { limit = 10 } = req.query;

        const products = await ProductModel.findFeatured(parseInt(limit));

        return res.json({
            message: 'Featured products retrieved successfully',
            data: products,
            error: false,
            success: true
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
};

// Get products by category
export const getProductsByCategoryController = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const { limit = 20 } = req.query;

        const products = await ProductModel.findByCategory(categoryId, parseInt(limit));

        return res.json({
            message: 'Products by category retrieved successfully',
            data: products,
            error: false,
            success: true
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
};

// Search products
export const searchProductsController = async (req, res) => {
    try {
        const { query, limit = 20 } = req.query;

        if (!query) {
            return res.status(400).json({
                message: 'Search query is required',
                error: true,
                success: false
            });
        }

        const products = await ProductModel.find({
            $text: { $search: query },
            isActive: true
        })
        .populate('category', 'name')
        .populate('subCategory', 'name')
        .limit(parseInt(limit));

        return res.json({
            message: 'Search results retrieved successfully',
            data: products,
            error: false,
            success: true
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
};
