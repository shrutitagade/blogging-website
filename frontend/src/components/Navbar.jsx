import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css'; // Import the CSS file for styling
import { useDispatch } from 'react-redux';
import { logout } from '../features/authSlice';

const Navbar = () => {
    let auth = JSON.parse(localStorage.getItem("userLogin"));
    const username = auth ? auth.name.charAt(0).toUpperCase() : '';

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = () => {
        dispatch(logout());
        localStorage.removeItem('userLogin');
        navigate('/login');
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark fixed-top">
                <div className="container-fluid">
                    {/* BlogVerse Logo on the left */}
                    <NavLink className="navbar-brand custom-font" to="/">BlogVerse</NavLink>

                    {/* Navbar toggler for mobile view */}
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" style={{ backgroundColor: "gray" }} data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    {/* Navbar links and profile dropdown */}
                    <div className="collapse navbar-collapse justify-content-end" id="navbarNav" >
                        <ul className="navbar-nav d-flex align-items-center">


                            {/* Only show Create Blog and Profile/Logout when logged in */}
                            {auth && (
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link text-light" to="/create" style={{ fontSize: "17px" }}>Create Blog</Link>
                                    </li>
                                    &nbsp;&nbsp;&nbsp;
                                    {/* Profile dropdown with first letter of username */}
                                    <li className="nav-item dropdown">
                                        <Link
                                            className="dropdown-toggle text-light d-flex align-items-center"
                                            id="profileDropdown"
                                            role="button"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                            style={{ textDecoration: 'none' }}
                                        >
                                            {/* Custom circle for profile icon */}
                                            <span
                                                className="profile-icon d-flex align-items-center justify-content-center"
                                                style={{
                                                    backgroundColor: 'white',
                                                    color: 'black',
                                                    borderRadius: '50%',
                                                    height: '35px',
                                                    width: '35px',
                                                    textAlign: 'center',

                                                    fontSize: '1.2rem',

                                                }}
                                            >
                                                {username}
                                            </span>
                                        </Link>

                                        {/* Dropdown menu adjusted to open on the left side */}
                                        <ul className="dropdown-menu dropdown-menu-right" aria-labelledby="profileDropdown">
                                            <li>
                                                <Link className="dropdown-item" to="/myblogs">Profile</Link>
                                            </li>
                                            <li>
                                                <Link className="dropdown-item" to="/create">Create Blog</Link>
                                            </li>
                                            <li>
                                                <button className="dropdown-item" onClick={logoutHandler}>Logout</button>
                                            </li>
                                        </ul>
                                    </li>
                                </>
                            )}

                            {!auth && (
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link text-light" to="/login">Login</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link text-light" to="/register">Register</Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>

            </nav>
        </>
    );
};

export default Navbar;
