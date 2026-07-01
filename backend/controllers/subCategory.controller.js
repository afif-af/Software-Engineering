import SubCategoryModel from '../models/subCategory.model.js';
import { CategoryModel } from '../models/category.model.js';
import ProductModel from '../models/product.model.js';
import { uploadImageToCloudinary, deleteImageFromCloudinary } from '../utils/cloudinary.js';

// Create subcategory
export const createSubCategoryController = async (req, res) => {
    try {
        const { name, description, category, displayOrder, seoTitle, seoDescription } = req.body;

        if (!name || !category) {
            return res.status(400).json({
                message: 'Subcategory name and category are required',
                error: true,
                success: false
            });
        }

        // Check if category exists
        const categoryExists = await CategoryModel.findById(category);
        if (!categoryExists) {
            return res.status(404).json({
                message: 'Parent category not found',
                error: true,
                success: false
            });
        }

        // Check if subcategory already exists in this category
        const existingSubCategory = await SubCategoryModel.findOne({
            name: { $regex: new RegExp(`^${name}$`, 'i') },
            category
        });
        if (existingSubCategory) {
            return res.status(400).json({
                message: 'Subcategory with this name already exists in the selected category',
                error: true,
                success: false
            });
        }

        let imageUrl = '';
        if (req.file) {
            const uploadResult = await uploadImageToCloudinary(req.file.path, 'subcategories');
            if (uploadResult.success) {
                imageUrl = uploadResult.url;
            }
        }

        const subCategoryData = {
            name,
            description,
            category,
            image: imageUrl,
            displayOrder: displayOrder ? parseInt(displayOrder) : 0,
            seoTitle,
            seoDescription
        };

        const subCategory = new SubCategoryModel(subCategoryData);
        const savedSubCategory = await subCategory.save();

        const populatedSubCategory = await SubCategoryModel.findById(savedSubCategory._id)
            .populate('category', 'name');

        return res.json({
            message: 'Subcategory created successfully',
            data: populatedSubCategory,
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

// Get all subcategories
export const getAllSubCategoriesController = async (req, res) => {
    try {
        const { category, includeProductCount = 'false' } = req.query;

        const query = { isActive: true };

        if (category) {
            query.category = category;
        }

        let subcategories = await SubCategoryModel.find(query)
            .populate('category', 'name')
            .sort({ displayOrder: 1, name: 1 });

        // Include product count if requested
        if (includeProductCount === 'true') {
            for (let subcategory of subcategories) {
                const productCount = await ProductModel.countDocuments({
                    subCategory: subcategory._id,
                    isActive: true
                });
                subcategory.productCount = productCount;
            }
        }

        return res.json({
            message: 'Subcategories retrieved successfully',
            data: subcategories,
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

// Get subcategory by ID
export const getSubCategoryByIdController = async (req, res) => {
    try {
        const { subCategoryId } = req.params;

        const subCategory = await SubCategoryModel.findById(subCategoryId)
            .populate('category', 'name description');

        if (!subCategory) {
            return res.status(404).json({
                message: 'Subcategory not found',
                error: true,
                success: false
            });
        }

        // Get product count
        const productCount = await ProductModel.countDocuments({
            subCategory: subCategoryId,
            isActive: true
        });

        return res.json({
            message: 'Subcategory retrieved successfully',
            data: {
                ...subCategory.toObject(),
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

// Update subcategory
export const updateSubCategoryController = async (req, res) => {
    try {
        const { subCategoryId } = req.params;
        const updateData = req.body;

        // Handle image upload if provided
        if (req.file) {
            const uploadResult = await uploadImageToCloudinary(req.file.path, 'subcategories');
            if (uploadResult.success) {
                updateData.image = uploadResult.url;

                // Delete old image if exists
                const subCategory = await SubCategoryModel.findById(subCategoryId);
                if (subCategory && subCategory.image) {
                    const publicId = subCategory.image.split('/').pop().split('.')[0];
                    await deleteImageFromCloudinary(publicId);
                }
            }
        }

        // Convert displayOrder to number
        if (updateData.displayOrder) {
            updateData.displayOrder = parseInt(updateData.displayOrder);
        }

        const updatedSubCategory = await SubCategoryModel.findByIdAndUpdate(
            subCategoryId,
            updateData,
            { new: true, runValidators: true }
        ).populate('category', 'name');

        if (!updatedSubCategory) {
            return res.status(404).json({
                message: 'Subcategory not found',
                error: true,
                success: false
            });
        }

        return res.json({
            message: 'Subcategory updated successfully',
            data: updatedSubCategory,
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

// Delete subcategory
export const deleteSubCategoryController = async (req, res) => {
    try {
        const { subCategoryId } = req.params;

        const subCategory = await SubCategoryModel.findById(subCategoryId);
        if (!subCategory) {
            return res.status(404).json({
                message: 'Subcategory not found',
                error: true,
                success: false
            });
        }

        // Check if subcategory has products
        const productCount = await ProductModel.countDocuments({ subCategory: subCategoryId });
        if (productCount > 0) {
            return res.status(400).json({
                message: 'Cannot delete subcategory with existing products. Please reassign or delete products first.',
                error: true,
                success: false
            });
        }

        // Delete subcategory image if exists
        if (subCategory.image) {
            const publicId = subCategory.image.split('/').pop().split('.')[0];
            await deleteImageFromCloudinary(publicId);
        }

        await SubCategoryModel.findByIdAndDelete(subCategoryId);

        return res.json({
            message: 'Subcategory deleted successfully',
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

// Get subcategories by category
export const getSubCategoriesByCategoryController = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const { includeProductCount = 'false' } = req.query;

        // Check if category exists
        const category = await CategoryModel.findById(categoryId);
        if (!category) {
            return res.status(404).json({
                message: 'Category not found',
                error: true,
                success: false
            });
        }

        let subcategories = await SubCategoryModel.find({
            category: categoryId,
            isActive: true
        }).sort({ displayOrder: 1, name: 1 });

        // Include product count if requested
        if (includeProductCount === 'true') {
            for (let subcategory of subcategories) {
                const productCount = await ProductModel.countDocuments({
                    subCategory: subcategory._id,
                    isActive: true
                });
                subcategory.productCount = productCount;
            }
        }

        return res.json({
            message: 'Subcategories retrieved successfully',
            data: {
                category: {
                    _id: category._id,
                    name: category.name
                },
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
