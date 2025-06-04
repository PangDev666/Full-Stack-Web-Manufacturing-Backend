const { Schema, models, model } = require('mongoose');

const machineSchema = new Schema({
    title: { type: String },
    slug: { type: String, required: true },
    images: [{ type: String }],
    description: { type: String },
    tags: [{ type: String }],
    afilink: { type: String },
    status: { type: String },
}, {
    timestamps: true, // this will automatically manage createdAt and updatedAt
});

export const Machine = models.Machine || model('Machine', machineSchema, 'machines');