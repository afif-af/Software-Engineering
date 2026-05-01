import express from 'express';
import {
    addToCartController,
    removeFromCartController,
    updateCartQuantityController,
    getCartItemsController,
    getCartCountController,
    clearCartController,
    getCartTotalController,
    checkProductInCartController
} from '../controllers/cart.controller.js';
import { authMiddleware } from '../middlware/auth.middleware.js';

const cartRouter = express.Router();

// All cart routes require authentication
cartRouter.use(authMiddleware);

// Add item to cart
cartRouter.post('/add', addToCartController);

// Remove item from cart
cartRouter.delete('/remove', removeFromCartController);

// Update cart item quantity
cartRouter.put('/update-quantity', updateCartQuantityController);

// Get all cart items
cartRouter.get('/items', getCartItemsController);

// Get cart count
cartRouter.get('/count', getCartCountController);

// Clear entire cart
cartRouter.delete('/clear', clearCartController);

// Get cart total
cartRouter.get('/total', getCartTotalController);

// Check if product is in cart
cartRouter.get('/check/:productId', checkProductInCartController);

export default cartRouter;
