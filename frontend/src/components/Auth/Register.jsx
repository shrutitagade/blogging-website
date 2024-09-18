import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../features/authSlice';
import { useNavigate, NavLink } from 'react-router-dom';
import Navbar from '../Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';  // Import the icons
import { fetchBlogs } from '../../features/blogSlice';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
    const [passwordHoverText, setPasswordHoverText] = useState('Show Password'); // State for hover text
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, userInfo } = useSelector((state) => state.auth);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            // Dispatch the registerUser action
            const resp = await dispatch(registerUser({ name, email, password }));
            const User = resp;
            console.log(User)
            // Check if registration was successful
            if (User) {
                alert("You have registered successfully!");
                if (userInfo) {
                    // Store userInfo in localStorage after successful login
                    localStorage.setItem('userLogin', JSON.stringify(userInfo));
                    navigate('/login');
                }
                // Navigate to the home page
                navigate('/login');
                dispatch(fetchBlogs())
            } else {
                alert("Registration failed. Please try again.");
            }

        } catch (error) {
            console.error("Registration error:", error);
            alert("There was an issue with registration. Please try again.");
        }
    };


    useEffect(() => {
        if (userInfo) {
            navigate('/login');
        }
    }, [userInfo, navigate]);

    // Function to toggle password visibility and change hover text accordingly
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
        setPasswordHoverText(showPassword ? 'Show Password' : 'Hide Password');  // Change hover text
    };

    return (
        <>
            <Navbar />
            <br /><br />
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
                                <div className="mb-3 position-relative">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input
                                        type={showPassword ? "text" : "password"}  // Conditionally set input type
                                        className="form-control"
                                        id="password"
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                    {/* Icon for showing/hiding password */}
                                    <FontAwesomeIcon
                                        icon={showPassword ? faEyeSlash : faEye}
                                        onClick={togglePasswordVisibility}
                                        className="position-absolute"
                                        style={{
                                            right: '10px',
                                            top: '68%',
                                            transform: 'translateY(-50%)',
                                            cursor: 'pointer'
                                        }}
                                        title={passwordHoverText} // Show hover text dynamically
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-primary w-100"
                                    disabled={loading}
                                >
                                    {loading ? 'Registering...' : 'Register'}
                                </button>
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
            <br /><br />
        </>
    );
};

export default Register;
