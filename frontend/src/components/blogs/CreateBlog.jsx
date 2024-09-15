import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import axios from 'axios';
import { createBlog } from '../../features/blogSlice';

const CreateBlog = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState();
    const [showModal, setShowModal] = useState(false);
    const [waitingForImage, setWaitingForImage] = useState(false);
    const [imageUploaded, setImageUploaded] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, success, blog } = useSelector((state) => state.blogs);
    const userId = JSON.parse(localStorage.getItem('userLogin'))?._id;

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        if (image) {
            formData.append('image', image);
            // setWaitingForImage(true);
        }
        formData.append('userId', userId);
        alert("Your blog is being created. It may take a few moments for the changes to reflect.");

        navigate("/")
        // Show the loading dialog
        // setShowModal(true);

        // try {
        // Dispatch the action

        // try {
        // Dispatch createBlog action and pass the formData
        await dispatch(createBlog(formData)).then((resp) => {
            console.log(resp.data)
        }).catch((err) => {
            console.log(err)
        });

        // Notify user of success
        // Redirect to home page
        // } catch (err) {
        //     // Handle errors
        //     console.error("Error creating blog:", err);
        //     alert("Failed to create blog. Please try again.");
        // }
        // setImageUploaded(true);
        // } catch (err) {
        // setImageUploaded(false);
        //}
        // setTimeout(() => {
        //     alert("Your Blog has been created successfully");
        //     navigate("/");
        // }, 6000);
    };

    // useEffect(() => {
    //     if (imageUploaded) {
    //         // Wait for 6 seconds to ensure the image URL is available
    //         // const timer = setTimeout(() => {
    //             if (success && blog) {
    //                 setWaitingForImage(false);
    //                 setShowModal(false);
    //             } else {
    //                 setShowModal(false);
    //             }
    // }, 5000);

    // Clean up timer if component unmounts or if redirect is not needed
    // return () => clearTimeout(timer);
    //     }
    // }, [imageUploaded, success, blog, navigate]);

    return (
        <>
            <Navbar />
            <br></br><br></br>
            <div className="container mt-5">
                <h1 className="mb-4 text-center" style={{ color: "navy" }}>Create Blog</h1>
                <form onSubmit={submitHandler} className="bg-light p-4 rounded shadow">
                    <div className="form-group mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}

                        />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea
                            className="form-control"
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}

                        />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="image" className="form-label">
                            Image Upload
                            <span className="text-danger"> (Make sure you have a stable internet connection)</span>
                        </label>
                        <input
                            type="file"
                            className="form-control"
                            id="image"
                            onChange={(e) => setImage(e.target.files[0])}
                        />
                    </div>
                    <div className="d-flex justify-content-center mt-4">
                        <button type="submit" className="btn btn-primary">
                            Create Blog
                        </button>
                    </div>


                </form>

                {/* Modal for loading and success messages */}
                {showModal && (
                    <div className="modal fade show d-block" tabIndex="-1" role="dialog">
                        <div className="modal-dialog modal-dialog-centered" role="document">
                            <div className="modal-content">
                                <div className="modal-header bg-primary text-white">
                                    <h5 className="modal-title">
                                        {loading || waitingForImage ? 'Please Wait...' : 'Success!'}
                                    </h5>
                                </div>
                                <div className="modal-body text-center">
                                    {(loading || waitingForImage) ? (
                                        <>
                                            <p>
                                                {waitingForImage
                                                    ? 'Your blog is being created. Please wait...'
                                                    : 'Your blog is being created. Please wait...'}
                                            </p>
                                        </>
                                    ) : (
                                        <>
                                            <i className="bi bi-check-circle-fill text-success mb-3" style={{ fontSize: '2rem' }}></i>
                                            <p>Your blog has been created successfully!</p>
                                        </>
                                    )}
                                </div>
                                {!loading && !waitingForImage && (
                                    <div className="modal-footer">
                                        <button
                                            type="button"
                                            className="btn btn-primary"
                                            onClick={() => navigate('/')}
                                        >
                                            Close and Go to Home
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <br></br><br></br>

        </>
    );
};

export default CreateBlog;
