import OrderModel from '../models/order.model.js';
import ProductModel from '../models/product.model.js';
import UserModel from '../models/user.model.js';
import AddressModel from '../models/address.model.js';
import CartProductModel from '../models/category.model.js';
import { createPaymentIntent } from '../config/stripe.js';

// Create order from cart
export const createOrderController = async (req, res) => {
    try {
        const userId = req.userId;
        const { delivery_address, paymentMethod = 'card' } = req.body;

        // Validate delivery address
        if (!delivery_address) {
            return res.status(400).json({
                message: 'Delivery address is required',
                error: true,
                success: false
            });
        }

        // Check if address belongs to user
        const address = await AddressModel.findOne({
            _id: delivery_address,
            userId
        });
        if (!address) {
            return res.status(404).json({
                message: 'Delivery address not found',
                error: true,
                success: false
            });
        }

        // Get user's cart items
        const cartItems = await CartProductModel.find({ userId })
            .populate('productId');

        if (cartItems.length === 0) {
            return res.status(400).json({
                message: 'Cart is empty',
                error: true,
                success: false
            });
        }

        // Calculate total amount and validate products
        let subTotalAmt = 0;
        const orderItems = [];

        for (const cartItem of cartItems) {
            if (!cartItem.productId || !cartItem.productId.isActive) {
                return res.status(400).json({
                    message: `Product ${cartItem.productId?.name || 'Unknown'} is not available`,
                    error: true,
                    success: false
                });
            }

            if (!cartItem.productId.isInStock(cartItem.quantity)) {
                return res.status(400).json({
                    message: `Insufficient stock for ${cartItem.productId.name}`,
                    error: true,
                    success: false
                });
            }

            const price = cartItem.productId.finalPrice;
            const itemTotal = price * cartItem.quantity;
            subTotalAmt += itemTotal;

            orderItems.push({
                productId: cartItem.productId._id,
                quantity: cartItem.quantity,
                price: price,
                total: itemTotal
            });
        }

        // Create payment intent
        const paymentIntentResult = await createPaymentIntent(subTotalAmt);
        if (!paymentIntentResult.success) {
            return res.status(500).json({
                message: 'Failed to create payment intent',
                error: true,
                success: false
            });
        }

        // Generate unique order ID
        const orderId = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

        // Create order
        const orderData = {
            userId,
            orderId,
            productId: orderItems[0].productId, // For backward compatibility with existing schema
            productDetails: {
                name: cartItems[0].productId.name,
                image: cartItems[0].productId.images
            },
            paymentId: paymentIntentResult.paymentIntentId,
            paymentStatus: 'pending',
            delivery_address: delivery_address,
            subTotalAmt,
            totalAmt: subTotalAmt // Add shipping/tax logic here if needed
        };

        const order = new OrderModel(orderData);
        const savedOrder = await order.save();

        // Reduce product stock
        for (const cartItem of cartItems) {
            await cartItem.productId.reduceStock(cartItem.quantity);
            await cartItem.productId.save();
        }

        // Clear user's cart
        await CartProductModel.deleteMany({ userId });
        await UserModel.findByIdAndUpdate(userId, {
            $unset: { shopping_cart: 1 }
        });

        const populatedOrder = await OrderModel.findById(savedOrder._id)
            .populate('userId', 'name email')
            .populate('delivery_address')
            .populate('productId', 'name images price');

        return res.json({
            message: 'Order created successfully',
            data: {
                order: populatedOrder,
                clientSecret: paymentIntentResult.clientSecret,
                paymentIntentId: paymentIntentResult.paymentIntentId
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

// Get user's orders
export const getUserOrdersController = async (req, res) => {
    try {
        const userId = req.userId;
        const { page = 1, limit = 10, status } = req.query;

        const query = { userId };
        if (status) {
            query.paymentStatus = status;
        }

        const orders = await OrderModel.find(query)
            .populate('delivery_address')
            .populate('productId', 'name images price')
            .sort({ createdAt: -1 })
            .limit(parseInt(limit))
            .skip((parseInt(page) - 1) * parseInt(limit));

        const totalOrders = await OrderModel.countDocuments(query);
        const totalPages = Math.ceil(totalOrders / parseInt(limit));

        return res.json({
            message: 'Orders retrieved successfully',
            data: {
                orders,
                pagination: {
                    currentPage: parseInt(page),
                    totalPages,
                    totalOrders,
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

// Get order by ID
export const getOrderByIdController = async (req, res) => {
    try {
        const { orderId } = req.params;
        const userId = req.userId;

        const order = await OrderModel.findOne({
            _id: orderId,
            userId
        })
        .populate('userId', 'name email')
        .populate('delivery_address')
        .populate('productId', 'name images price description');

        if (!order) {
            return res.status(404).json({
                message: 'Order not found',
                error: true,
                success: false
            });
        }

        return res.json({
            message: 'Order retrieved successfully',
            data: order,
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

// Update order status (Admin only - would need role checking)
export const updateOrderStatusController = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { paymentStatus } = req.body;

        const validStatuses = ['pending', 'paid', 'failed', 'cancelled', 'refunded'];
        if (!validStatuses.includes(paymentStatus)) {
            return res.status(400).json({
                message: 'Invalid payment status',
                error: true,
                success: false
            });
        }

        const updatedOrder = await OrderModel.findByIdAndUpdate(
            orderId,
            { paymentStatus },
            { new: true }
        )
        .populate('userId', 'name email')
        .populate('delivery_address')
        .populate('productId', 'name images price');

        if (!updatedOrder) {
            return res.status(404).json({
                message: 'Order not found',
                error: true,
                success: false
            });
        }

        return res.json({
            message: 'Order status updated successfully',
            data: updatedOrder,
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

// Cancel order
export const cancelOrderController = async (req, res) => {
    try {
        const { orderId } = req.params;
        const userId = req.userId;

        const order = await OrderModel.findOne({
            _id: orderId,
            userId
        });

        if (!order) {
            return res.status(404).json({
                message: 'Order not found',
                error: true,
                success: false
            });
        }

        if (order.paymentStatus !== 'pending') {
            return res.status(400).json({
                message: 'Cannot cancel order that is already processed',
                error: true,
                success: false
            });
        }

        // Restore product stock
        const product = await ProductModel.findById(order.productId);
        if (product) {
            product.stock += 1; // Assuming single quantity for backward compatibility
            await product.save();
        }

        order.paymentStatus = 'cancelled';
        await order.save();

        return res.json({
            message: 'Order cancelled successfully',
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

// Get all orders (Admin only)
export const getAllOrdersController = async (req, res) => {
    try {
        const { page = 1, limit = 20, status, userId } = req.query;

        const query = {};
        if (status) query.paymentStatus = status;
        if (userId) query.userId = userId;

        const orders = await OrderModel.find(query)
            .populate('userId', 'name email')
            .populate('delivery_address')
            .populate('productId', 'name images price')
            .sort({ createdAt: -1 })
            .limit(parseInt(limit))
            .skip((parseInt(page) - 1) * parseInt(limit));

        const totalOrders = await OrderModel.countDocuments(query);
        const totalPages = Math.ceil(totalOrders / parseInt(limit));

        return res.json({
            message: 'All orders retrieved successfully',
            data: {
                orders,
                pagination: {
                    currentPage: parseInt(page),
                    totalPages,
                    totalOrders,
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

// Get order statistics (Admin only)
export const getOrderStatsController = async (req, res) => {
    try {
        const totalOrders = await OrderModel.countDocuments();
        const pendingOrders = await OrderModel.countDocuments({ paymentStatus: 'pending' });
        const paidOrders = await OrderModel.countDocuments({ paymentStatus: 'paid' });
        const cancelledOrders = await OrderModel.countDocuments({ paymentStatus: 'cancelled' });

        // Calculate total revenue
        const paidOrdersData = await OrderModel.find({ paymentStatus: 'paid' });
        const totalRevenue = paidOrdersData.reduce((sum, order) => sum + order.totalAmt, 0);

        return res.json({
            message: 'Order statistics retrieved successfully',
            data: {
                totalOrders,
                pendingOrders,
                paidOrders,
                cancelledOrders,
                totalRevenue
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
