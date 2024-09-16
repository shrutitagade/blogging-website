import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../features/authSlice';
import { useNavigate, NavLink } from 'react-router-dom';
import Navbar from '../Navbar';
import Footer from '../pages/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';  // Import the icons

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);  // State to toggle password visibility
    const [hoverText, setHoverText] = useState('');  // State for hover text
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userInfo, loading, error } = useSelector((state) => state.auth);

    const submitHandler = async (e) => {
        e.preventDefault();
        // try {
        // Dispatch loginUser action and wait for the response
        const resp = await dispatch(loginUser({ email, password }));
        const User = resp;
        console.log(User)
        // Check if the login was successful
        if (User.email && User._id) {
            alert("Login successful!");
        } else {
            if (!User.email && User.password || User.email && !User.password) {
                alert("Invalid email or password. Please try again.");
            }
            else {
                alert("You haven't registered yet, please register");
                navigate("/register");
            }
        }
        // } catch (err) {
        //     console.error("Login error:", err);
        //     alert("There was an issue logging in. Please try again.");
        // }
    };

    useEffect(() => {
        if (userInfo) {
            // Store userInfo in localStorage after successful login
            localStorage.setItem('userLogin', JSON.stringify(userInfo));
            navigate('/');
        }
    }, [userInfo, navigate]);

    // Function to toggle password visibility
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // Function to handle hover text based on password visibility
    const handleMouseEnter = () => {
        setHoverText(showPassword ? 'Hide Password' : 'Show Password');
    };

    const handleMouseLeave = () => {
        setHoverText('');
    };

    return (
        <>
            <Navbar />
            <br /><br />
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
                                <div className="mb-3 position-relative"> {/* Added position-relative to the parent div */}
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
                                        onMouseEnter={handleMouseEnter}  // Show hover text on enter
                                        onMouseLeave={handleMouseLeave}  // Hide hover text on leave
                                        className="position-absolute"
                                        style={{
                                            right: '10px',
                                            top: '68%',
                                            transform: 'translateY(-50%)',
                                            cursor: 'pointer',
                                            fontSize: '1rem',
                                            color: '#495057'
                                        }}
                                        title={hoverText}  // Show hover text
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-primary w-100"
                                    disabled={loading}
                                >
                                    {loading ? 'Logging in...' : 'Login'}
                                </button>
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
            <br /><br />
        </>
    );
};

export default Login;
