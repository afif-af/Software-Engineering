import express from "express";
import {placeOrder,placeOrderBkash,bkashCallback,updateStatus,allOrders,userOrders} from "../controllers/orderController.js";
import authUser from "../middleware/auth.js";
import adminAuth from "../middleware/adminAuth.js";

const orderRouter =express.Router();
orderRouter.post("/list",adminAuth,allOrders);
orderRouter.post( "/status",adminAuth,updateStatus);

orderRouter.post("/userorders",authUser,userOrders);
orderRouter.post("/bkash",authUser,placeOrderBkash);
orderRouter.get( "/bkash/callback",bkashCallback);
orderRouter.post("/place",authUser,placeOrder);

export default orderRouter;








// import express from 'express'
// import { placeOrder, placeOrderBkash,bkashCallback, updateStatus, allOrders, userOrders} from "../controllers/orderController.js"


// import authUser from "../middleware/auth.js"
// import adminAuth from "../middleware/adminAuth.js"

// const orderRouter = express.Router()

// //Admin Routes
// orderRouter.post('/list', adminAuth, allOrders)
// orderRouter.post('/status', adminAuth, updateStatus)

// //User Routes
// orderRouter.post('/userorders', authUser, userOrders)


// //Payment Routes
// orderRouter.post('/bkash', authUser, placeOrderBkash)
// orderRouter.post('/bkash/callback',authUser, bkashCallback)
// orderRouter.post('/place', authUser, placeOrder)


// export default orderRouter;