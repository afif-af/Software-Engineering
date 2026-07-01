import express from 'express';
import {
    createOrderController,
    getUserOrdersController,
    getOrderByIdController,
    updateOrderStatusController,
    cancelOrderController,
    getAllOrdersController,
    getOrderStatsController
} from '../controllers/order.controller.js';
import { authMiddleware } from '../middlware/auth.middleware.js';

const orderRouter = express.Router();

// All order routes require authentication
orderRouter.use(authMiddleware);

// User routes
orderRouter.post('/create', createOrderController);
orderRouter.get('/my-orders', getUserOrdersController);
orderRouter.get('/:orderId', getOrderByIdController);
orderRouter.put('/:orderId/cancel', cancelOrderController);

// Admin routes (would need admin middleware)
orderRouter.get('/admin/all', getAllOrdersController);
orderRouter.put('/admin/:orderId/status', updateOrderStatusController);
orderRouter.get('/admin/stats', getOrderStatsController);

export default orderRouter;
