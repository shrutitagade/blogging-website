import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBlogs, deleteBlog, updateBlog } from '../../features/blogSlice';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import Footer from '../pages/Footer';

const MyBlogs = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { blogs = [], loading, error } = useSelector((state) => state.blogs);
    const authId = JSON.parse(localStorage.getItem('userLogin'))?._id;
    const [editingBlogId, setEditingBlogId] = useState(null);
    const [editTitle, setEditTitle] = useState('');
    const [editDescription, setEditDescription] = useState('');

    useEffect(() => {
        if (authId) {
            dispatch(fetchBlogs());
            console.log(blogs)
        } else {
            navigate('/login');
        }
    }, [dispatch, authId, navigate]);

    const startEditing = (blog) => {
        setEditingBlogId(blog._id);
        setEditTitle(blog.title);
        setEditDescription(blog.description);
    };

    const handleUpdate = (id) => {
        dispatch(updateBlog({ id, title: editTitle, description: editDescription }))
            .unwrap()
            .then(() => {
                dispatch(fetchBlogs());  // Re-fetch all blogs to ensure state is up to date
                setEditingBlogId(null);  // Exit edit mode
            })
            .catch((error) => {
                console.error('Failed to update the blog:', error);
            });
    };

    const deleteHandler = (id) => {
        dispatch(deleteBlog(id));
    };

    return (
        <>
            <Navbar />
            <br></br><br></br>
            <div className="container mt-5">
                <h1 style={{ color: "navy" }}>My Blogs</h1>
                <br></br>
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p className="text-danger">{error}</p>
                ) : blogs.length > 0 ? (
                    blogs.filter(blog => blog.userId === authId).map((blog) => (
                        <div key={blog._id}>
                            <div key={blog._id} className="blog-item d-flex mb-4 border p-3 rounded" >
                                <div className="blog-text col-8">
                                    <Link
                                        to={`/blog/${blog._id}`}
                                        className="text-decoration-none text-dark"
                                        onClick={() => handleTitleClick(blog._id)}
                                    >
                                        <h4 className="blog-title">{blog.title}</h4>
                                    </Link>
                                    <p className="blog-description">{blog.description.substring(0, 100)}...</p>
                                    <div className="blog-meta">
                                        <span className="text-info">Views: {blog.views}</span>&nbsp;&nbsp;&nbsp;&nbsp;
                                        <span className="text-info">Comments: {blog.comments.length}</span>&nbsp;&nbsp;&nbsp;&nbsp;
                                        <span className="text-danger">Likes: {blog.likes}</span>
                                    </div>
                                </div>
                                <div className="blog-image col-4">
                                    {blog.image && <img src={blog.image} alt={blog.title} className="img-fluid" />}
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No blogs have been added yet.</p>
                )}
            </div>
            <br></br>
        </>
    );
};

export default MyBlogs;
