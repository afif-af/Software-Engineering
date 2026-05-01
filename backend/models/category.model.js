import mongoose from 'mongoose';

const cartProductSchema = new mongoose.Schema({
    productId: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'product',
    },
    quantity: {
        type: Number,
        default: 1,
    },
    userId: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'user',
    }
},{
    timestamps: true,
})

const CartProductModel = mongoose.model('cartProduct', cartProductSchema);

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide category name"],
        unique: true,
        trim: true
    },
    description: {
        type: String,
        default: ''
    },
    image: {
        type: String,
        default: ''
    },
    isActive: {
        type: Boolean,
        default: true
    },
    displayOrder: {
        type: Number,
        default: 0
    },
    seoTitle: {
        type: String,
        default: ''
    },
    seoDescription: {
        type: String,
        default: ''
    }
}, {
    timestamps: true
});

// Index for better performance
categorySchema.index({ name: 'text' });
categorySchema.index({ isActive: 1 });
categorySchema.index({ displayOrder: 1 });

const CategoryModel = mongoose.model('category', categorySchema);

export { CartProductModel, CategoryModel };
export default CartProductModel;
