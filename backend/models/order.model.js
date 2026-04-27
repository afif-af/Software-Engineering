import  mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    orderId: {
        type: String,
        required: [true, "Please provide a valid orderId"],
        unique: true,
    },
    productId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product',
    },
    productDetails:{
        name: String,
        image:Array
    },
    paymentId: {
        type: String,
        default: '',
    },
    paymentStatus: {
        type: String,
        default: '',
    },
    delivery_address:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'address',
    },
    subTotalAmt: {
        type: Number,
        default: 0,
    },
    totalAmt: {
        type: Number,
        default: 0,
    },

},{
    timestamps: true,
})

const OrderModel = mongoose.model('order', orderSchema);
export  default OrderModel