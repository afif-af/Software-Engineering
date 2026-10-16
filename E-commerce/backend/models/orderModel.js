import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true
        },

        items: {
            type: Array,
            required: true
        },

        amount: {
            type: Number,
            required: true
        },

        address: {
            type: Object, 
            required: true
        },

        status: {
            type: String,
            required: true,
            default: "Order Placed"
        },

        paymentMethod: {
            type: String,
            required: true
        },

        paymentStatus: {
            type: String,
            enum: ["pending", "paid", "failed", "cancelled"],
            default: "pending"
        },

        payment: {
            type: Boolean,
            required: true,
            default: false
        },

        paymentId:{
            type:String,
            default:null

        },

        transactionId: {
            type: String,
            default: null
        },
        
        bkashResponse: {
            type: Object,
            default: null
        },

        
        date: {
            type: Date,
            default: Date.now
        }
    }
);

const orderModel =
    mongoose.models.order ||
    mongoose.model("order", orderSchema);

export default orderModel;
