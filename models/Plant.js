const { Schema, models, model } = require('mongoose');

const plantSchema = new Schema({
    title: { type: String },
    slug: { type: String, required: true },
    images: [{ type: String }],
    description: { type: String },
    client: { type: String },
    plantcategory: [{ type: String }],
    tags: [{ type: String }],
    livepreview: [{ type: String }],
    status: { type: String },
}, {
    timestamps: true, // this will automatically manage createdAt and updatedAt
});

export const Plant = models.Plant || model('Plant', plantSchema, 'plants');