import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import Home from './components/pages/Home';
import MyBlogs from './components/blogs/MyBlogs';
import CreateBlog from './components/blogs/CreateBlog';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import BlogDetails from './components/blogs/BlogDetails';
import Footer from './components/pages/Footer'; // Import Footer

function App() {
  return (
    <Provider store={store}>
      <Router>
        {/* <Navbar /> */}
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/myblogs" element={<MyBlogs />} />
            <Route path="/create" element={<CreateBlog />} />
            <Route path="/blog/:id" element={<BlogDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
        <Footer /> {/* Add Footer here */}
      </Router>
    </Provider>
  );
}

export default App;
