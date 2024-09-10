import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBlogs, incrementLikes, addComment, deleteBlog, updateBlog } from '../../features/blogSlice';
import { fetchUsers } from '../../features/authSlice';
import Navbar from '../Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faComment, faEye, faEdit, faTrash, faMicrophone, faCirclePlay } from '@fortawesome/free-solid-svg-icons';
import Footer from '../pages/Footer';

import { speak } from '../../SpeechHelper';

const BlogDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { blogs = [] } = useSelector((state) => state.blogs);
    const { users } = useSelector((state) => state.auth);

    const [blog, setBlog] = useState(null);
    const [bloggerInfo, setBloggerInfo] = useState(null);
    const [comment, setComment] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState('');
    const [editDescription, setEditDescription] = useState('');
    const commentsRef = useRef(null);
    useEffect(() => {
        dispatch(fetchBlogs());
        dispatch(fetchUsers());
    }, [dispatch]);
    const handleSpeak = () => {
        // Concatenate title and description
        const blogContent = `${blog?.title}. ${blog?.description}`;

        // Call the speak function to read the blog content aloud
        speak(blogContent);
    };

    useEffect(() => {
        if (Array.isArray(blogs) && blogs.length > 0) {
            const foundBlog = blogs.find(blog => blog._id === id);
            if (foundBlog) {
                setBlog(foundBlog);
                setEditTitle(foundBlog.title);
                setEditDescription(foundBlog.description);

                if (Array.isArray(users) && users.length > 0) {
                    const blogger = users.find(user => String(user._id) === String(foundBlog.userId));
                    setBloggerInfo(blogger || null);
                }

            }
        }
    }, [blogs, users, id]);
    const handleCommentClick = () => {
        if (commentsRef.current) {
            commentsRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };
    const loggedInUserId = JSON.parse(localStorage.getItem('userLogin'))?._id || '';
    const handleLike = () => {
        dispatch(incrementLikes(id))
            .unwrap()
            .then(() => {
                dispatch(fetchBlogs());
                setBlog(blogs.find(blog => blog._id === id));
            })
            .catch((error) => {
                console.error('Failed to increment likes:', error);
            });
    };

    const handleDeleteBlog = () => {
        if (window.confirm("Are you sure you want to delete this blog?")) {
            dispatch(deleteBlog(id))
                .unwrap()
                .then(() => navigate("/"))
                .catch((error) => console.error('Failed to delete the blog:', error));
        }
    };

    const handleEditToggle = () => setIsEditing(!isEditing);

    const handleUpdate = () => {
        dispatch(updateBlog({ id, title: editTitle, description: editDescription }))
            .unwrap()
            .then(() => {
                dispatch(fetchBlogs());
                alert("Your Blog Has Been Updated Successfully");
                setIsEditing(false);
                navigate(`/blog/${id}`);
            })
            .catch((error) => console.error('Failed to update the blog:', error));
    };

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        const name = JSON.parse(localStorage.getItem('userLogin'))?.name || 'Anonymous';
        dispatch(addComment({ id, user: name, text: comment }))
            .unwrap()
            .then(() => {
                setComment('');
                alert("Your Comment has been added");
                dispatch(fetchBlogs());
            })
            .catch((error) => console.error('Failed to add comment:', error));
    };

    return (
        <>
            <Navbar />
            <br /><br />
            <div className="container mt-5">
                {blog ? (
                    <div className="blog-details">
                        <div className="row">
                            <div className="col-md-8 offset-md-2">
                                {/* Show only the editing section when editing */}
                                {isEditing ? (
                                    <div className="edit-section">
                                        <h3 style={{ color: "navy" }}>Edit Blog</h3>
                                        <div className="form-group">
                                            <label htmlFor="editTitle">Title:</label>
                                            <input
                                                type="text"
                                                id="editTitle"
                                                className="form-control"
                                                value={editTitle}
                                                onChange={(e) => setEditTitle(e.target.value)}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="editDescription">Description:</label>
                                            <textarea
                                                id="editDescription"
                                                className="form-control"
                                                value={editDescription}
                                                onChange={(e) => setEditDescription(e.target.value)}
                                                rows="5"
                                            />
                                        </div>
                                        <button className="btn btn-success" onClick={handleUpdate}>Save Changes</button>
                                        <button className="btn btn-secondary ml-3" onClick={handleEditToggle}>Cancel</button>
                                        <br></br><br></br><br></br>
                                    </div>
                                ) : (
                                    <>
                                        {/* Blog Title */}
                                        <h1 className="text-left mb-3" style={{ fontWeight: 'bold', cursor: 'pointer' }}>
                                            {blog.title}
                                        </h1>
                                        {/* Blogger Info and Icons */}
                                        <div className="d-flex justify-content-between align-items-center mb-3" >
                                            <div className="d-flex align-items-center">
                                                <div

                                                    className="rounded-circle  text-white d-flex justify-content-center align-items-center"
                                                    style={{ width: '45px', height: '45px', fontSize: '1.4rem', backgroundColor: "purple", border: "1px solid brown" }}
                                                >
                                                    {bloggerInfo?.name.charAt(0).toUpperCase()}
                                                </div>
                                                <div className="ml-3">
                                                    <h5 className="mb-0" style={{ color: "darkblue" }}>{bloggerInfo?.name}</h5>
                                                    <p className="text-muted mb-0">
                                                        {new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <hr></hr>
                                        {/* Icons for Edit, Delete, Like, Comment Count, Views */}
                                        <div className="d-flex">
                                            {bloggerInfo?._id === loggedInUserId && (
                                                <>
                                                    <span className="mr-3" style={{ cursor: 'pointer' }}>
                                                        <FontAwesomeIcon icon={faEdit} onClick={handleEditToggle} title="Edit" />
                                                    </span>&nbsp;&nbsp;
                                                    <span className="mr-3" style={{ cursor: 'pointer' }}>
                                                        <FontAwesomeIcon icon={faTrash} onClick={handleDeleteBlog} title="Delete" />
                                                    </span>
                                                    &nbsp;&nbsp;
                                                </>
                                            )}
                                            <span className="mr-3" style={{ cursor: 'pointer' }}>
                                                <FontAwesomeIcon icon={faThumbsUp} onClick={handleLike} title="Like" /> ({blog.likes})
                                            </span>&nbsp;&nbsp;
                                            <span className="mr-3" style={{ cursor: 'pointer' }}>
                                                <FontAwesomeIcon icon={faComment} onClick={handleCommentClick} title="Comments" /> ({blog.comments ? blog.comments.length : 0})
                                            </span>&nbsp;&nbsp;
                                            <span>
                                                <FontAwesomeIcon icon={faEye} title="Views" /> ({blog.views})
                                            </span>&nbsp;
                                            <span
                                                onClick={handleSpeak}
                                                title="Listen"
                                                className="ml-auto"
                                            >
                                                <FontAwesomeIcon icon={faCirclePlay} style={{ fontSize: "20px", cursor: "pointer", border: "2px solid navy", borderRadius: "50%" }} />
                                            </span>

                                        </div>
                                        <hr></hr>

                                        {/* Blog Description */}
                                        <p className=" text-justify" style={{ fontSize: '1.1rem', lineHeight: "26px" }}>
                                            {blog.description}
                                        </p>

                                        {/* Blog Image */}
                                        {blog.image &&
                                            <div className="text-center mb-4">
                                                <img
                                                    src={blog.image}
                                                    alt={blog.title}
                                                    className="img-fluid rounded"
                                                    style={{ maxHeight: '400px', width: '100%', objectFit: 'cover', cursor: 'pointer' }}
                                                />
                                            </div>
                                        }

                                        {/* Comments Section (at the bottom before Blogger Info) */}
                                        <hr></hr>
                                        <div className="mt-4" ref={commentsRef}>
                                            <h5>Comments:</h5>
                                            <ul className="list-unstyled">
                                                {Array.isArray(blog.comments) && blog.comments.length > 0 ? (
                                                    blog.comments.map((comment, index) => (
                                                        <li key={index} className="mb-2">
                                                            <strong>{comment.user}:</strong> {comment.text}
                                                        </li>
                                                    ))
                                                ) : (
                                                    <p>No comments yet.</p>
                                                )}
                                            </ul>
                                            <form onSubmit={handleCommentSubmit} className="mt-3">
                                                <div className="form-group">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Write a comment..."
                                                        value={comment}
                                                        onChange={(e) => setComment(e.target.value)}
                                                    />
                                                </div>
                                                <button type="submit" className="btn btn-primary">Add Comment</button>
                                            </form>
                                        </div>
                                        <hr></hr>

                                        {/* Blogger Info at the Bottom */}

                                        <div className="bg-light p-3">
                                            <h5 className="text-center mb-0" style={{ color: "darkblue" }}>Written by {bloggerInfo?.name}</h5>
                                        </div>
                                        <br></br><br></br>

                                    </>
                                )}

                            </div>
                        </div>
                    </div>

                ) : (
                    <p>Loading...</p>
                )}
            </div >



        </>
    );
};

export default BlogDetails;
