import { CategoryModel } from '../models/category.model.js';
import SubCategoryModel from '../models/subCategory.model.js';
import ProductModel from '../models/product.model.js';
import { uploadImageToCloudinary, deleteImageFromCloudinary } from '../utils/cloudinary.js';

// Create category
export const createCategoryController = async (req, res) => {
    try {
        const { name, description, displayOrder, seoTitle, seoDescription } = req.body;

        if (!name) {
            return res.status(400).json({
                message: 'Category name is required',
                error: true,
                success: false
            });
        }

        // Check if category already exists
        const existingCategory = await CategoryModel.findOne({ name: { $regex: new RegExp(`^${name}$`, 'i') } });
        if (existingCategory) {
            return res.status(400).json({
                message: 'Category with this name already exists',
                error: true,
                success: false
            });
        }

        let imageUrl = '';
        if (req.file) {
            const uploadResult = await uploadImageToCloudinary(req.file.path, 'categories');
            if (uploadResult.success) {
                imageUrl = uploadResult.url;
            }
        }

        const categoryData = {
            name,
            description,
            image: imageUrl,
            displayOrder: displayOrder ? parseInt(displayOrder) : 0,
            seoTitle,
            seoDescription
        };

        const category = new CategoryModel(categoryData);
        const savedCategory = await category.save();

        return res.json({
            message: 'Category created successfully',
            data: savedCategory,
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

// Get all categories
export const getAllCategoriesController = async (req, res) => {
    try {
        const { includeSubcategories = 'false', includeProductCount = 'false' } = req.query;

        let categories;

        if (includeSubcategories === 'true') {
            categories = await CategoryModel.find({ isActive: true })
                .sort({ displayOrder: 1, name: 1 });

            // Manually populate subcategories
            for (let category of categories) {
                const subcategories = await SubCategoryModel.find({
                    category: category._id,
                    isActive: true
                }).sort({ displayOrder: 1, name: 1 });

                category.subcategories = subcategories;
            }
        } else {
            categories = await CategoryModel.find({ isActive: true })
                .sort({ displayOrder: 1, name: 1 });
        }

        // Include product count if requested
        if (includeProductCount === 'true') {
            for (let category of categories) {
                const productCount = await ProductModel.countDocuments({
                    category: category._id,
                    isActive: true
                });
                category.productCount = productCount;
            }
        }

        return res.json({
            message: 'Categories retrieved successfully',
            data: categories,
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

// Get category by ID
export const getCategoryByIdController = async (req, res) => {
    try {
        const { categoryId } = req.params;

        const category = await CategoryModel.findById(categoryId);

        if (!category) {
            return res.status(404).json({
                message: 'Category not found',
                error: true,
                success: false
            });
        }

        // Get subcategories for this category
        const subcategories = await SubCategoryModel.find({
            category: categoryId,
            isActive: true
        }).sort({ displayOrder: 1, name: 1 });

        // Get product count
        const productCount = await ProductModel.countDocuments({
            category: categoryId,
            isActive: true
        });

        return res.json({
            message: 'Category retrieved successfully',
            data: {
                ...category.toObject(),
                subcategories,
                productCount
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

// Update category
export const updateCategoryController = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const updateData = req.body;

        // Handle image upload if provided
        if (req.file) {
            const uploadResult = await uploadImageToCloudinary(req.file.path, 'categories');
            if (uploadResult.success) {
                updateData.image = uploadResult.url;

                // Delete old image if exists
                const category = await CategoryModel.findById(categoryId);
                if (category && category.image) {
                    const publicId = category.image.split('/').pop().split('.')[0];
                    await deleteImageFromCloudinary(publicId);
                }
            }
        }

        // Convert displayOrder to number
        if (updateData.displayOrder) {
            updateData.displayOrder = parseInt(updateData.displayOrder);
        }

        const updatedCategory = await CategoryModel.findByIdAndUpdate(
            categoryId,
            updateData,
            { new: true, runValidators: true }
        );

        if (!updatedCategory) {
            return res.status(404).json({
                message: 'Category not found',
                error: true,
                success: false
            });
        }

        return res.json({
            message: 'Category updated successfully',
            data: updatedCategory,
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

// Delete category
export const deleteCategoryController = async (req, res) => {
    try {
        const { categoryId } = req.params;

        const category = await CategoryModel.findById(categoryId);
        if (!category) {
            return res.status(404).json({
                message: 'Category not found',
                error: true,
                success: false
            });
        }

        // Check if category has products
        const productCount = await ProductModel.countDocuments({ category: categoryId });
        if (productCount > 0) {
            return res.status(400).json({
                message: 'Cannot delete category with existing products. Please reassign or delete products first.',
                error: true,
                success: false
            });
        }

        // Check if category has subcategories
        const subcategoryCount = await SubCategoryModel.countDocuments({ category: categoryId });
        if (subcategoryCount > 0) {
            return res.status(400).json({
                message: 'Cannot delete category with existing subcategories. Please delete subcategories first.',
                error: true,
                success: false
            });
        }

        // Delete category image if exists
        if (category.image) {
            const publicId = category.image.split('/').pop().split('.')[0];
            await deleteImageFromCloudinary(publicId);
        }

        await CategoryModel.findByIdAndDelete(categoryId);

        return res.json({
            message: 'Category deleted successfully',
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

// Get category with subcategories
export const getCategoryWithSubcategoriesController = async (req, res) => {
    try {
        const { categoryId } = req.params;

        const category = await CategoryModel.findById(categoryId);
        if (!category) {
            return res.status(404).json({
                message: 'Category not found',
                error: true,
                success: false
            });
        }

        const subcategories = await SubCategoryModel.find({
            category: categoryId,
            isActive: true
        }).sort({ displayOrder: 1, name: 1 });

        return res.json({
            message: 'Category with subcategories retrieved successfully',
            data: {
                category,
                subcategories
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
