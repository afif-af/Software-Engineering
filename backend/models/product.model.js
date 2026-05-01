import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide product name"],
        trim: true
    },
    description: {
        type: String,
        required: [true, "Please provide product description"]
    },
    price: {
        type: Number,
        required: [true, "Please provide product price"],
        min: [0, "Price cannot be negative"]
    },
    discountPrice: {
        type: Number,
        default: null,
        min: [0, "Discount price cannot be negative"]
    },
    stock: {
        type: Number,
        required: [true, "Please provide stock quantity"],
        min: [0, "Stock cannot be negative"],
        default: 0
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category',
        required: [true, "Please provide product category"]
    },
    subCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'subcategory',
        required: [true, "Please provide product subcategory"]
    },
    images: [{
        type: String,
        required: true
    }],
    brand: {
        type: String,
        default: ''
    },
    weight: {
        type: Number,
        default: null
    },
    dimensions: {
        length: { type: Number, default: null },
        width: { type: Number, default: null },
        height: { type: Number, default: null }
    },
    tags: [{
        type: String,
        trim: true
    }],
    isActive: {
        type: Boolean,
        default: true
    },
    isFeatured: {
        type: Boolean,
        default: false
    },
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },
    reviewCount: {
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
    },
    attributes: [{
        name: { type: String, required: true },
        value: { type: String, required: true }
    }],
    variants: [{
        name: { type: String, required: true },
        options: [{ type: String, required: true }],
        price: { type: Number, default: null }
    }]
}, {
    timestamps: true
});

// Indexes for better performance
productSchema.index({ name: 'text', description: 'text' });
productSchema.index({ category: 1 });
productSchema.index({ subCategory: 1 });
productSchema.index({ price: 1 });
productSchema.index({ isActive: 1 });
productSchema.index({ isFeatured: 1 });

// Virtual for discounted price
productSchema.virtual('finalPrice').get(function() {
    return this.discountPrice && this.discountPrice < this.price ? this.discountPrice : this.price;
});

// Method to check if product is in stock
productSchema.methods.isInStock = function(quantity = 1) {
    return this.stock >= quantity;
};

// Method to reduce stock
productSchema.methods.reduceStock = function(quantity = 1) {
    if (this.stock >= quantity) {
        this.stock -= quantity;
        return true;
    }
    return false;
};

// Static method to find featured products
productSchema.statics.findFeatured = function(limit = 10) {
    return this.find({ isActive: true, isFeatured: true })
        .populate('category', 'name')
        .populate('subCategory', 'name')
        .limit(limit)
        .sort({ createdAt: -1 });
};

// Static method to find products by category
productSchema.statics.findByCategory = function(categoryId, limit = 20) {
    return this.find({ category: categoryId, isActive: true })
        .populate('category', 'name')
        .populate('subCategory', 'name')
        .limit(limit)
        .sort({ createdAt: -1 });
};

const ProductModel = mongoose.model('product', productSchema);
export default ProductModel;
