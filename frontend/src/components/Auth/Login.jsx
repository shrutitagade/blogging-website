import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../features/authSlice';
import { useNavigate, NavLink } from 'react-router-dom';
import Navbar from '../Navbar';
import Footer from '../pages/Footer';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userInfo, loading, error } = useSelector((state) => state.auth);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(loginUser({ email, password }));
    };

    useEffect(() => {
        if (userInfo) {
            // Store userInfo in localStorage after successful login
            localStorage.setItem('userLogin', JSON.stringify(userInfo));

            navigate('/');
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
                            <h1 className="text-center mb-4" style={{ color: "darkblue" }}>Login</h1>
                            <form onSubmit={submitHandler}>
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
                                    {loading ? 'Logging in...' : 'Login'}
                                </button>
                                {error && <div className="alert alert-danger mt-3">{error}</div>}
                            </form>
                            <div className="text-center mt-3">
                                <p>Don't have an account? <NavLink to="/register" >
                                    Register
                                </NavLink></p>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <br></br>
            <br></br>
        </>
    );
};

export default Login;
