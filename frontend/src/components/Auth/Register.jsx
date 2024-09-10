import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../features/authSlice';
import { useNavigate, NavLink } from 'react-router-dom';
import Navbar from '../Navbar';
import Footer from '../pages/Footer';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, userInfo } = useSelector((state) => state.auth);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(registerUser({ name, email, password }));
    };

    useEffect(() => {
        if (userInfo) {
            navigate('/login');
        }
    }, [userInfo, navigate]);

    return (
        <>
            <Navbar />
            <br></br><br></br>
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card p-4 border rounded shadow-sm">
                            <h1 className="text-center mb-4" style={{ color: "darkblue" }}>Register</h1>
                            <form onSubmit={submitHandler}>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        placeholder="Enter your name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-primary w-100"
                                    disabled={loading}
                                >
                                    {loading ? 'Registering...' : 'Register'}
                                </button>
                                {error && <div className="alert alert-danger mt-3">{error}</div>}
                            </form>
                            <div className="text-center mt-3">
                                <p>Already have an account? <NavLink to="/login" >
                                    Login
                                </NavLink></p>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <br></br>
            <br></br>
            <Footer />
        </>
    );
};

export default Register;
