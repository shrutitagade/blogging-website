import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons'; // Import Font Awesome icon
import Navbar from '../Navbar';
import { createBlog } from '../../features/blogSlice';

const CreateBlog = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState();
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userId = JSON.parse(localStorage.getItem('userLogin'))?._id;

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        if (image) {
            formData.append('image', image);
        }
        formData.append('userId', userId);

        // Show the modal and indicate the loading state
        setModalMessage('Creating your blog. Please wait...');
        setShowModal(true);
        setIsLoading(true);

        try {
            // Dispatch the createBlog action and wait for the result
            const response = await dispatch(createBlog(formData));

            if (response.payload) {
                // Blog created successfully, update the modal message
                setModalMessage('Your blog has been successfully created!');
                setIsLoading(false);

                // Auto-close the modal and redirect after 2 seconds
                setTimeout(() => {
                    setShowModal(false);
                    navigate('/');
                }, 3000);
            }
        } catch (error) {
            console.error("Error creating blog:", error);
            setModalMessage('There was an issue creating your blog. Please try again.');
            setIsLoading(false);
        }
    };

    return (
        <>
            <Navbar />
            <br /><br />
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
                            required
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea
                            className="form-control"
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            rows="6"
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="image" className="form-label">
                            Image Upload
                            <span className="text-danger"> (Ensure a stable internet connection)</span>
                        </label>
                        <input
                            type="file"
                            className="form-control"
                            id="image"
                            onChange={(e) => setImage(e.target.files[0])}
                        />
                    </div>
                    <div className="d-flex justify-content-center mt-4">
                        <button type="submit" className="btn btn-dark">
                            Create Blog
                        </button>
                    </div>
                </form>

                {/* Modal for loading and success messages */}
                {showModal && (
                    <div className="modal fade show d-block" tabIndex="-1" role="dialog" aria-labelledby="blogModal" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered" role="document">
                            <div className="modal-content">
                                <div className="modal-header bg-dark text-white">
                                    <h5 className="modal-title" id="blogModal">Blog Status</h5>
                                    {/* Close button */}
                                    <button type="button" className="btn btn-link text-white" onClick={() => setShowModal(false)}>
                                        <FontAwesomeIcon icon={faTimes} />
                                    </button>
                                </div>
                                <div className="modal-body text-center">
                                    <p className="fs-5 text-description" style={{ fontWeight: "500" }}>{modalMessage}</p>
                                    {isLoading ? (
                                        <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
                                            <span className="visually-hidden"></span>
                                        </div>
                                    ) : modalMessage === 'Your blog has been successfully created!' ? (
                                        <></>
                                    ) : (
                                        <p className="text-danger">Please try again.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <br /><br />
        </>
    );
};

export default CreateBlog;
