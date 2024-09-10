import express from 'express';
import { createBlog, getBlogs, getMyBlogs, deleteBlog, incrementLikes, incrementViews, addComment, updateBlog } from '../controllers/blogController.js';
import { upload } from '../middlewares/upload.js';
import User from '../models/User.js';

const router = express.Router();

router.get('/', getBlogs);
router.get('/myblogs', getMyBlogs);
router.post('/create-blog', upload.fields([
    { name: 'image', maxCount: 1 },
]), createBlog);
router.delete('/:id', deleteBlog);
router.patch('/:id/views', incrementViews);
router.patch('/:id/likes', incrementLikes); // Increment likes
router.post('/:id/comments', addComment); // Add comment
router.patch('/:id/update', updateBlog);

export default router;
