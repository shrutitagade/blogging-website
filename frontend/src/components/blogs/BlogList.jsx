import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBlogs } from '../../features/blogSlice';
import Navbar from '../Navbar';
import Footer from '../pages/Footer';

const BlogList = () => {
    const dispatch = useDispatch();
    const { blogs, loading, error } = useSelector((state) => state.blogs);

    useEffect(() => {
        dispatch(fetchBlogs());
    }, [dispatch]);

    return (
        <>
            <Navbar />
            <br />
            <div className="container mt-5">
                <h1>All Blogs</h1>
                {/* Handle loading, error, and blogs state */}
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p className="text-danger">{error}</p>
                ) : Array.isArray(blogs) && blogs.length > 0 ? (
                    blogs.map((blog) => (
                        <div className="card mb-3" key={blog._id}>
                            <div className="card-body">
                                <h5 className="card-title">{blog.title}</h5>
                                <p className="card-text">{blog.description}</p>
                                {blog.image && (
                                    <img
                                        src={blog.image}
                                        alt={blog.title}
                                        className="img-fluid"
                                    />
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No blogs available</p>
                )}
            </div>
            <br />
            <Footer />
        </>
    );
};

export default BlogList;
