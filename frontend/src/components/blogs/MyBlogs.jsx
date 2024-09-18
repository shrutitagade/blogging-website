import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBlogs, deleteBlog, updateBlog } from '../../features/blogSlice';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Ensure to import this if you're using FontAwesome icons
import { faThumbsUp, faComment } from '@fortawesome/free-solid-svg-icons'; // Import icons

const MyBlogs = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { blogs = [], loading, error } = useSelector((state) => state.blogs);
    const authUser = JSON.parse(localStorage.getItem('userLogin'));
    const authId = authUser?._id;
    const [editingBlogId, setEditingBlogId] = useState(null);
    const [editTitle, setEditTitle] = useState('');
    const [editDescription, setEditDescription] = useState('');

    useEffect(() => {
        if (authId) {
            dispatch(fetchBlogs());
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
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768); // Mobile size threshold is 768px
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <>
            <Navbar />
            <br /><br />
            <div className="container mt-5">
                {/* Profile Section */}
                <div className="profile-section p-4 mb-4 rounded bg-light border" style={{ backgroundColor: '#f1f4f8' }}>
                    <h2 style={{ color: "navy" }}><span className="font-weight-bold">{authUser?.name}</span></h2>
                    <br /><h6 style={{ color: "navy" }}>Email: {authUser?.email}</h6>
                </div>

                {/* My Blogs Section */}
                {loading ? (
                    <div className="d-flex justify-content-center">
                        <div className="spinner-border text-primary" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                ) : error ? (
                    <div className="alert alert-danger" role="alert">
                        {error}
                    </div>
                ) : blogs.filter(blog => blog.userId === authId).length > 0 ? (

                    blogs.filter(blog => blog.userId === authId).map((blog) => (
                        <div key={blog._id} className="blog-item d-flex mb-4 border p-3 rounded blogs">
                            <div className="blog-text col-8">
                                <Link
                                    to={`/blog/${blog._id}`}
                                    className="text-decoration-none text-dark"
                                >
                                    <h4 className="blog-title">{blog.title}</h4>
                                </Link>
                                <p className="blog-description">
                                    {isMobile ? blog.description.substring(0, 40) : blog.description.substring(0, 100)}...
                                </p>
                                <div className="blog-meta" id='meta'>
                                    <span style={{ color: "navy", fontWeight: "500" }}>
                                        {new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                    </span> &nbsp;&nbsp;&nbsp;
                                    <span>
                                        <FontAwesomeIcon icon={faThumbsUp} title="Like" id="t" /> ({blog.likes})
                                    </span>&nbsp;&nbsp;&nbsp;
                                    <span>
                                        <FontAwesomeIcon icon={faComment} title="Comments" id="c" /> ({blog.comments ? blog.comments.length : 0})
                                    </span>
                                </div>
                            </div>
                            <div className="blog-image col-4">
                                {blog.image && <img src={blog.image} alt={blog.title} className="img-fluid" />}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="alert alert-info" role="alert">
                        No blogs have been added yet.
                    </div>
                )}
            </div>
        </>
    );
};

export default MyBlogs;
