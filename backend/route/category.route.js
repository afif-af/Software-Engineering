import express from 'express';
import multer from 'multer';
import {
    createCategoryController,
    getAllCategoriesController,
    getCategoryByIdController,
    updateCategoryController,
    deleteCategoryController,
    getCategoryWithSubcategoriesController
} from '../controllers/category.controller.js';
import { authMiddleware } from '../middlware/auth.middleware.js';

const categoryRouter = express.Router();

// Configure multer for image uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/categories/');
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
categoryRouter.get('/', getAllCategoriesController);
categoryRouter.get('/:categoryId', getCategoryByIdController);
categoryRouter.get('/:categoryId/with-subcategories', getCategoryWithSubcategoriesController);

// Admin routes (would need admin middleware)
categoryRouter.post('/', authMiddleware, upload.single('image'), createCategoryController);
categoryRouter.put('/:categoryId', authMiddleware, upload.single('image'), updateCategoryController);
categoryRouter.delete('/:categoryId', authMiddleware, deleteCategoryController);

export default categoryRouter;
