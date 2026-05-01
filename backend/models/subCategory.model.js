import mongoose from 'mongoose';

const subCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide subcategory name"],
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
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category',
        required: [true, "Please provide parent category"]
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

// Compound index for category and name uniqueness
subCategorySchema.index({ category: 1, name: 1 }, { unique: true });
subCategorySchema.index({ name: 'text' });
subCategorySchema.index({ isActive: 1 });
subCategorySchema.index({ displayOrder: 1 });

// Static method to find subcategories by category
subCategorySchema.statics.findByCategory = function(categoryId) {
    return this.find({ category: categoryId, isActive: true })
        .sort({ displayOrder: 1, name: 1 });
};

const SubCategoryModel = mongoose.model('subcategory', subCategorySchema);
export default SubCategoryModel;
