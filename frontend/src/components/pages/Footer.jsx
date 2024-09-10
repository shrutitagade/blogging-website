import React from 'react';
import { NavLink } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-dark text-white py-4 mt-auto w-100" style={{ marginBottom: "0px" }}>
            <div className="container-fluid">
                <div className="row text-center text-md-start">
                    {/* About Section */}
                    <div className="col-md-6 mb-3 mb-md-0">
                        <h5 style={{ marginBottom: "15px" }}>About</h5>
                        <p style={{ lineHeight: " 30px" }} >
                            BlogVerse is a blogging platform built using React, Node.js, and MongoDB, designed to allow users to create, view, and share blogs effortlessly.
                            It features a dynamic user interface and integrates with Cloudinary for image uploads, making it a complete platform for bloggers to showcase their content.
                        </p>
                    </div>

                    {/* Contact Section */}
                    <div className="col-md-6 mb-3 mb-md-0">
                        <h5 style={{ marginBottom: "15px" }}>Contact</h5>
                        Email : shrutitagade507@gmail.com
                        <br></br>
                        <NavLink to="https://www.linkedin.com/in/shruti-tagade-4a6668253/" target="_blank" rel="noopener noreferrer" className="text-white nav-link">
                            <i className='fa fa-linkedin'></i> LinkedIn
                        </NavLink>
                        <NavLink to="https://github.com/shrutitagade" target="_blank" rel="noopener noreferrer" className="text-white nav-link">
                            <i className='fa fa-github'></i> GitHub
                        </NavLink>

                    </div>
                </div>

                {/* Footer Bottom Section */}
                <div className="row text-center mt-3">
                    <div className="col">
                        <hr className="bg-light" />
                        <p className="mb-0">&copy; 2024 BlogVerse. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
