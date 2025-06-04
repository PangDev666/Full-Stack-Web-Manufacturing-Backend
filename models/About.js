const { Schema, models, model } = require('mongoose');

const aboutSchema = new Schema({
    title: { type: String },
    slug: { type: String, required: true },
    images: [{ type: String }],
    description: { type: String },
    tags: [{ type: String }],
    status: { type: String },
}, {
    timestamps: true, // this will automatically manage createdAt and updatedAt
});

export const About = models.About || model('About', aboutSchema, 'abouts');