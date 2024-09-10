import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    user: { type: String, required: true },
    text: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

const blogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String },
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    comments: [commentSchema],
    userId: {
        type: String
    }
}, { timestamps: true });

const Blog = mongoose.model('Blog', blogSchema);
export default Blog;
