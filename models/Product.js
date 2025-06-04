const { Schema, models, model } = require('mongoose');

const ProductSchema = new Schema({
    title: { type: String },
    slug: { type: String, required: true },
    images: [{ type: String }],
    description: { type: String },
    productcategory: [{ type: String }],
    tags: [{ type: String }],
    status: { type: String },
}, {
    timestamps: true, // this will automatically manage createdAt and updatedAt
});

export const Product = models.Product || model('Product', ProductSchema, 'products');