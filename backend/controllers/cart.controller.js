import CartProductModel from '../models/category.model.js';
import ProductModel from '../models/product.model.js';
import UserModel from '../models/user.model.js';

// Add item to cart
export const addToCartController = async (req, res) => {
    try {
        const { productId, quantity = 1 } = req.body;
        const userId = req.userId;

        if (!productId) {
            return res.status(400).json({
                message: 'Product ID is required',
                error: true,
                success: false
            });
        }

        // Check if product exists
        const product = await ProductModel.findById(productId);
        if (!product) {
            return res.status(404).json({
                message: 'Product not found',
                error: true,
                success: false
            });
        }

        // Check if item already exists in cart
        const existingCartItem = await CartProductModel.findOne({
            productId,
            userId
        });

        if (existingCartItem) {
            // Update quantity
            existingCartItem.quantity += quantity;
            await existingCartItem.save();

            return res.json({
                message: 'Item quantity updated in cart',
                data: existingCartItem,
                error: false,
                success: true
            });
        } else {
            // Add new item to cart
            const newCartItem = new CartProductModel({
                productId,
                quantity,
                userId
            });

            const savedItem = await newCartItem.save();

            // Update user's shopping cart array
            await UserModel.findByIdAndUpdate(userId, {
                $push: { shopping_cart: savedItem._id }
            });

            return res.json({
                message: 'Item added to cart successfully',
                data: savedItem,
                error: false,
                success: true
            });
        }

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
};

// Remove item from cart
export const removeFromCartController = async (req, res) => {
    try {
        const { productId } = req.body;
        const userId = req.userId;

        if (!productId) {
            return res.status(400).json({
                message: 'Product ID is required',
                error: true,
                success: false
            });
        }

        // Find and remove the cart item
        const cartItem = await CartProductModel.findOneAndDelete({
            productId,
            userId
        });

        if (!cartItem) {
            return res.status(404).json({
                message: 'Item not found in cart',
                error: true,
                success: false
            });
        }

        // Remove from user's shopping cart array
        await UserModel.findByIdAndUpdate(userId, {
            $pull: { shopping_cart: cartItem._id }
        });

        return res.json({
            message: 'Item removed from cart successfully',
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

// Update cart item quantity
export const updateCartQuantityController = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const userId = req.userId;

        if (!productId || quantity === undefined) {
            return res.status(400).json({
                message: 'Product ID and quantity are required',
                error: true,
                success: false
            });
        }

        if (quantity <= 0) {
            // If quantity is 0 or negative, remove the item
            return await removeFromCartController(req, res);
        }

        // Update quantity
        const updatedItem = await CartProductModel.findOneAndUpdate(
            { productId, userId },
            { quantity },
            { new: true }
        );

        if (!updatedItem) {
            return res.status(404).json({
                message: 'Item not found in cart',
                error: true,
                success: false
            });
        }

        return res.json({
            message: 'Cart item quantity updated successfully',
            data: updatedItem,
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

// Get cart items
export const getCartItemsController = async (req, res) => {
    try {
        const userId = req.userId;

        const cartItems = await CartProductModel.find({ userId })
            .populate('productId')
            .sort({ createdAt: -1 });

        return res.json({
            message: 'Cart items retrieved successfully',
            data: cartItems,
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

// Get cart count
export const getCartCountController = async (req, res) => {
    try {
        const userId = req.userId;

        const cartCount = await CartProductModel.countDocuments({ userId });

        return res.json({
            message: 'Cart count retrieved successfully',
            data: { count: cartCount },
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

// Clear cart
export const clearCartController = async (req, res) => {
    try {
        const userId = req.userId;

        // Get all cart items for this user
        const cartItems = await CartProductModel.find({ userId });

        if (cartItems.length === 0) {
            return res.json({
                message: 'Cart is already empty',
                error: false,
                success: true
            });
        }

        // Delete all cart items
        await CartProductModel.deleteMany({ userId });

        // Clear shopping cart array in user model
        const cartItemIds = cartItems.map(item => item._id);
        await UserModel.findByIdAndUpdate(userId, {
            $pull: { shopping_cart: { $in: cartItemIds } }
        });

        return res.json({
            message: 'Cart cleared successfully',
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

// Get cart total
export const getCartTotalController = async (req, res) => {
    try {
        const userId = req.userId;

        const cartItems = await CartProductModel.find({ userId })
            .populate('productId');

        let totalAmount = 0;
        let totalItems = 0;

        cartItems.forEach(item => {
            if (item.productId && item.productId.price) {
                totalAmount += item.productId.price * item.quantity;
                totalItems += item.quantity;
            }
        });

        return res.json({
            message: 'Cart total calculated successfully',
            data: {
                totalAmount: Math.round(totalAmount * 100) / 100, // Round to 2 decimal places
                totalItems,
                currency: 'USD'
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

// Check if product is in cart
export const checkProductInCartController = async (req, res) => {
    try {
        const { productId } = req.params;
        const userId = req.userId;

        const cartItem = await CartProductModel.findOne({
            productId,
            userId
        });

        return res.json({
            message: 'Product cart status checked',
            data: {
                inCart: !!cartItem,
                quantity: cartItem ? cartItem.quantity : 0
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
