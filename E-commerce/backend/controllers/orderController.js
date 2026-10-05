import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

const placeOrder = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;
        const orderData ={
            userId,
            items,
            amount,
            address,
            paymentMethod: "COD",
            payment :false,
            date: Date.now()
        }
        const newOrder = new orderModel(orderData);
        await newOrder.save();

        await userModel.findByIdAndUpdate(userId,{cartData:{}})

        res.json({success:true, message:"Order placed successfully"})
    }
    
    catch(error) {
        console.log(error);
        res.status(500).json({success:false, message:"Error placing order"})
    }


}
// Placing order with stripe payment
const placeOrderStripe = async (req, res) => {
}

// placing order with razorpay payment
const placeOrderRazorpay = async (req, res) => {
}

// placing order with Bakash SLLCOMMERZ
const placeOrderBkash = async (req, res) => {
    
}

const allOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({})
        res.json({success:true, orders})

    }
    catch(error) {
        console.log(error);
        res.status(500).json({success:false, message:"Error fetching orders"})
    }
}

const userOrders = async (req, res) => {
    try {
        const {userId} = req.body;
        const orders = await orderModel.find({userId})
        res.json({success:true, orders})
    }
    catch(error) {
        console.log(error);
        res.status(500).json({success:false, message:"Error fetching user orders"})
    }
}

const updateStatus = async (req, res) => {
    try {
        const {orderId, status} = req.body;
        await orderModel.findByIdAndUpdate(orderId, {status})
        res.json({success:true, message:"Order status updated successfully"})
    }
    catch(error) {
        console.log(error);
        res.status(500).json({success:false, message:"Error updating order status"})
    }
}

export { placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus }
