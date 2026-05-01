import express from 'express';
import multer from 'multer';
import {
    createSubCategoryController,
    getAllSubCategoriesController,
    getSubCategoryByIdController,
    updateSubCategoryController,
    deleteSubCategoryController,
    getSubCategoriesByCategoryController
} from '../controllers/subCategory.controller.js';
import { authMiddleware } from '../middlware/auth.middleware.js';

const subCategoryRouter = express.Router();

// Configure multer for image uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/subcategories/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.mimetype.split('/')[1]);
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed'), false);
        }
    }
});

// Public routes
subCategoryRouter.get('/', getAllSubCategoriesController);
subCategoryRouter.get('/:subCategoryId', getSubCategoryByIdController);
subCategoryRouter.get('/category/:categoryId', getSubCategoriesByCategoryController);

// Admin routes (would need admin middleware)
subCategoryRouter.post('/', authMiddleware, upload.single('image'), createSubCategoryController);
subCategoryRouter.put('/:subCategoryId', authMiddleware, upload.single('image'), updateSubCategoryController);
subCategoryRouter.delete('/:subCategoryId', authMiddleware, deleteSubCategoryController);

export default subCategoryRouter;
