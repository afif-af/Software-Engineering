import express from 'express'
import { placeOrder, placeOrderRazorpay, placeOrderStripe, updateStatus, allOrders, userOrders} from "../controllers/orderController.js"


import authUser from "../middleware/auth.js"
import adminAuth from "../middleware/adminAuth.js"

const orderRouter = express.Router()

//Admin Routes
orderRouter.post('/list', adminAuth, allOrders)
orderRouter.post('/status', adminAuth, updateStatus)

//User Routes
orderRouter.post('/userorders', authUser, userOrders)


//Payment Routes
orderRouter.post('/razorpay', authUser, placeOrderRazorpay)
orderRouter.post('/stripe', authUser, placeOrderStripe)
orderRouter.post('/place', authUser, placeOrder)


export default orderRouter;