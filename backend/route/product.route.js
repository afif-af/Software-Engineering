import express from 'express';
import multer from 'multer';
import {
    createProductController,
    getAllProductsController,
    getProductByIdController,
    updateProductController,
    deleteProductController,
    getFeaturedProductsController,
    getProductsByCategoryController,
    searchProductsController
} from '../controllers/product.controller.js';
import { authMiddleware } from '../middlware/auth.middleware.js';

const productRouter = express.Router();

// Configure multer for image uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/products/');
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
productRouter.get('/', getAllProductsController);
productRouter.get('/featured', getFeaturedProductsController);
productRouter.get('/category/:categoryId', getProductsByCategoryController);
productRouter.get('/search', searchProductsController);
productRouter.get('/:productId', getProductByIdController);

// Admin routes (would need admin middleware)
productRouter.post('/', authMiddleware, upload.array('images', 10), createProductController);
productRouter.put('/:productId', authMiddleware, upload.array('images', 10), updateProductController);
productRouter.delete('/:productId', authMiddleware, deleteProductController);

export default productRouter;
