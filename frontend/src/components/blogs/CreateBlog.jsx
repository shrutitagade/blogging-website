import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createBlog } from '../../features/blogSlice';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';

const CreateBlog = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [waitingForImage, setWaitingForImage] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, success, blog } = useSelector((state) => state.blogs);
    const userId = JSON.parse(localStorage.getItem('userLogin'))?._id;

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('userId', userId);

        if (image) {
            formData.append('image', image);
        }

        // Show the loading dialog
        setShowModal(true);
        setWaitingForImage(true);

        try {
            // Dispatch the action
            await dispatch(createBlog(formData)).unwrap();
            setWaitingForImage(false);
            setShowModal(true);
        } catch (err) {
            console.error("Error creating blog:", err);
            setWaitingForImage(false);
            setShowModal(false);
        }
    };

    useEffect(() => {
        if (success && blog) {
            const timer = setTimeout(() => {
                setShowModal(false);
                alert("Your Blog has been created successfully");
                navigate('/');
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [success, blog, navigate]);

    return (
        <>
            <Navbar />
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
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="image" className="form-label">Image Upload</label>
                        <input
                            type="file"
                            className="form-control"
                            id="image"
                            onChange={(e) => setImage(e.target.files[0])}
                        />
                    </div>
                    <div className="d-flex justify-content-center mt-4">
                        <button type="submit" className="btn btn-primary" disabled={loading || waitingForImage}>
                            {loading || waitingForImage ? 'Creating...' : 'Create Blog'}
                        </button>
                    </div>
                    {error && <p className="text-danger mt-3">{error}</p>}
                </form>

                {/* Modal for success message */}
                {showModal && (
                    <div className="modal fade show d-block" tabIndex="-1" role="dialog">
                        <div className="modal-dialog modal-dialog-centered" role="document">
                            <div className="modal-content">
                                <div className="modal-header bg-primary text-white">
                                    <h5 className="modal-title">
                                        {waitingForImage ? 'Please Wait...' : 'Success!'}
                                    </h5>
                                </div>
                                <div className="modal-body text-center">
                                    {waitingForImage ? (
                                        <p>Your blog is being created. Please wait...</p>
                                    ) : (
                                        <>
                                            <i className="bi bi-check-circle-fill text-success mb-3" style={{ fontSize: '2rem' }}></i>
                                            <p>Your blog has been created successfully!</p>
                                        </>
                                    )}
                                </div>
                                {!waitingForImage && (
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
        </>
    );
};

export default CreateBlog;
