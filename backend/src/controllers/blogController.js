import Blog from '../models/Blog.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';

// Create a new blog
export const createBlog = async (req, res) => {
    try {
        const { title, description, userId } = req.body;
        console.log(title, description);
        const imageLocalPath = req.files?.image?.[0]?.path;
        console.log(imageLocalPath);
        const image = imageLocalPath ? await uploadOnCloudinary(imageLocalPath) : null;
        console.log("image", image);

        const blog = new Blog({
            title,
            description,
            image: image?.url || "",
            views: 0, // Initialize views to zero
            likes: 0,
            userId
            // user: req.user._id,  // Uncomment if user info is available and required
        });

        await blog.save();
        res.status(201).json({ message: 'Blog created successfully', blog });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Get all blogs
export const getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({});
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Get blogs by user
export const getMyBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({ userId: req.user._id });
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete a blog
export const deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);

        if (blog) {
            await Blog.deleteOne({ _id: req.params.id });
            res.json({ message: 'Blog removed' });
        } else {
            res.status(404).json({ message: 'Blog not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};


// Increment Views
export const incrementViews = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (blog) {
            blog.views += 1;
            await blog.save();
            res.status(200).json({ views: blog.views });
        } else {
            res.status(404).json({ message: 'Blog not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};


// Increment Likes
export const incrementLikes = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (blog) {
            blog.likes += 1;
            await blog.save();
            res.status(200).json({ likes: blog.likes });
        } else {
            res.status(404).json({ message: 'Blog not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Add Comment
export const addComment = async (req, res) => {
    try {
        const { user, text } = req.body;
        const blog = await Blog.findById(req.params.id);
        if (blog) {
            blog.comments.push({ user, text });
            await blog.save();
            res.status(201).json(blog.comments);
        } else {
            res.status(404).json({ message: 'Blog not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const updateBlog = async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;

    try {
        const blog = await Blog.findById(id);

        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        // Update the title and description
        blog.title = title || blog.title;
        blog.description = description || blog.description;

        const updatedBlog = await blog.save();

        res.json({
            _id: updatedBlog._id,
            title: updatedBlog.title,
            description: updatedBlog.description,
            message: 'Blog updated successfully',
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};


