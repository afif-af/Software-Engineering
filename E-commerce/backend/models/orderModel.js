import mongoose from "mongoose";

const orderShema =new mongoose.Schema({
    userId: {type: String, required:true},
    items:{types:String, required:true},
    amount:{type:Number, required:true},
    address:{type:String, required:true},
    status:{type:String, required:true, default:"Order Placed"},
    paymentMethod:{type:String, required:true},
    payment:{type:Boolean, required:true, default:false},
    date: {type:Date, default:true}
    
})


const orderModel = mongoose.models.order || mongoose.model("order", orderShema);
export default orderModel;
