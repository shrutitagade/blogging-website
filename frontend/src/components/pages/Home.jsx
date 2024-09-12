import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBlogs, incrementViews } from '../../features/blogSlice';
import { Link, NavLink } from 'react-router-dom';
import { logout } from '../../features/authSlice';

const Home = () => {
    const dispatch = useDispatch();
    const { blogs, loading, error } = useSelector((state) => state.blogs);
    const [filteredBlogs, setFilteredBlogs] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [blogsPerPage] = useState(5);
    const [pageRange, setPageRange] = useState([1, 4]);

    useEffect(() => {
        dispatch(fetchBlogs());
    }, [dispatch]);

    useEffect(() => {
        setFilteredBlogs(blogs);
    }, [blogs]);

    useEffect(() => {
        const newStart = Math.max(1, currentPage - 2);
        const newEnd = Math.min(newStart + 4, Math.ceil(filteredBlogs.length / blogsPerPage));
        setPageRange([newStart, newEnd]);
    }, [currentPage, filteredBlogs, blogsPerPage]);

    // Pagination Logic
    const indexOfLastBlog = currentPage * blogsPerPage;
    const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
    const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);
    const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearch = () => {
        if (searchTerm.trim()) {
            const lowercasedSearchTerm = searchTerm.toLowerCase();
            const results = blogs.filter(blog =>
                blog.title.toLowerCase().includes(lowercasedSearchTerm)
            );
            setFilteredBlogs(results);
        } else {
            setFilteredBlogs(blogs);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSearch();
        }
    };

    const handleTitleClick = (id) => {
        dispatch(incrementViews(id));
    };

    const logoutHandler = () => {
        dispatch(logout());
        localStorage.removeItem('userLogin');
        dispatch(fetchBlogs());
    };

    const auth = localStorage.getItem("userLogin");
    const name = JSON.parse(auth)?.name || '';
    const initial = name ? name.charAt(0).toUpperCase() : '';

    // Pagination Handlers
    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <>
            <div>
                {
                    auth ?
                        <>
                            <nav className="navbar navbar-expand-lg navbar-dark fixed-top">
                                <div className="container-fluid">
                                    <NavLink className="navbar-brand custom-font" to="/">BlogVerse</NavLink>
                                    &nbsp;&nbsp; &nbsp;

                                    <form className="form-inline mx-auto">
                                        <input
                                            className="form-control mr-sm-2 search"
                                            type="search"
                                            placeholder="Search Blogs"
                                            aria-label="Search"
                                            value={searchTerm}
                                            onChange={handleSearchChange}
                                            onKeyDown={handleKeyPress}
                                        />
                                        <button
                                            className="btn btn-outline-light my-2 my-sm-0 search-btn"
                                            type="button"
                                            onClick={handleSearch}
                                        >
                                            Search
                                        </button>
                                    </form>&nbsp;&nbsp;
                                    <button className="navbar-toggler" style={{ backgroundColor: "gray" }} type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                                        <span className="navbar-toggler-icon "></span>
                                    </button>
                                    &nbsp;&nbsp;
                                    <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                                        <ul className="navbar-nav d-flex align-items-center">
                                            <ul className="navbar-nav">
                                                <li className="nav-item">
                                                    <Link className="nav-link text-light" to="/create" style={{ fontSize: "17px" }}>Create Blog</Link>
                                                </li>
                                                &nbsp;&nbsp;&nbsp;&nbsp;
                                                <li className="nav-item dropdown">
                                                    <Link
                                                        className="dropdown-toggle text-light d-flex align-items-center"
                                                        id="profileDropdown"
                                                        role="button"
                                                        data-bs-toggle="dropdown"
                                                        aria-expanded="false"
                                                        style={{ textDecoration: 'none' }}
                                                    >
                                                        <span
                                                            className="profile-icon d-flex align-items-center justify-content-center"
                                                            style={{
                                                                backgroundColor: 'white',
                                                                color: 'black',
                                                                borderRadius: '50%',
                                                                height: '35px',
                                                                width: '35px',
                                                                textAlign: 'center',
                                                                fontSize: '1rem',
                                                            }}
                                                        >
                                                            {initial}
                                                        </span>
                                                    </Link>
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
                                            </ul>
                                        </ul>
                                    </div>
                                </div>
                            </nav>
                        </>
                        :
                        <>
                            <nav className="navbar navbar-expand-lg navbar-dark fixed-top">
                                <div className="container-fluid">
                                    <a className="navbar-brand custom-font" href="/">BlogVerse</a>
                                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                                        <span className="navbar-toggler-icon"></span>
                                    </button>
                                    <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                                        <ul className="navbar-nav d-flex align-items-center">
                                            <li className="nav-item">
                                                <Link className="nav-link text-light" to="/login">Login</Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link className="nav-link text-light" to="/register">Register</Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </nav>
                        </>
                }

                <br /><br />

                <div className="container mt-5">
                    {loading ? (
                        <div className="text-center">
                            <div className="spinner-border text-primary" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>
                    ) : error ? (
                        <div className="text-center">
                            <p className="text-danger">{error}</p>
                        </div>
                    ) : (
                        currentBlogs.length > 0 ? (
                            <div className="blog-list">
                                {currentBlogs.map((blog) => (
                                    <div key={blog._id} className="blog-item d-flex mb-4 border p-3 rounded">
                                        <div className="blog-text col-8">
                                            <Link
                                                to={`/blog/${blog._id}`}
                                                className="text-decoration-none text-dark"
                                                onClick={() => handleTitleClick(blog._id)}
                                            >
                                                <h4 className="blog-title">{blog.title}</h4>
                                            </Link>
                                            <p className="blog-description">{blog.description.substring(0, 100)}...</p>
                                            <div className="blog-meta">
                                                <span className="text-info">Views: {blog.views}</span>
                                                <span className="text-info">Comments: {blog.comments.length}</span>
                                                <span className="text-danger">Likes: {blog.likes}</span>
                                            </div>
                                        </div>
                                        <div className="blog-image col-4">
                                            {blog.image && <img src={blog.image} alt={blog.title} className="img-fluid" />}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center">
                                <p>No blogs available</p>
                            </div>
                        )
                    )}
                </div>

                {currentBlogs.length > 0 && (
                    <div className="pagination-container text-center mt-3">
                        <button onClick={handlePrevPage} className="btn btn-outline-primary mx-1" disabled={currentPage === 1} style={{ pointer: "cursor" }}>Previous</button>
                        {Array.from({ length: pageRange[1] - pageRange[0] + 1 }, (_, index) => (
                            <button
                                key={index + pageRange[0]}
                                onClick={() => handlePageChange(index + pageRange[0])}
                                className={`btn btn-outline-primary mx-1 ${currentPage === index + pageRange[0] ? 'active' : ''}`}
                            >
                                {index + pageRange[0]}
                            </button>
                        ))}
                        <button onClick={handleNextPage} className="btn btn-outline-primary mx-1" disabled={currentPage === totalPages} style={{ pointer: "cursor" }}>Next</button>
                    </div>
                )}
            </div>
            <br></br><br></br>
        </>
    );
};

export default Home;
