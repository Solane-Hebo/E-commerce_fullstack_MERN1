import React, { useState, useRef, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import logo from '../asserts/Images/Logo.svg';
import Dropdown from './Dropdown';
import "./Styles/Navbar.css";

const Navbar = () => {
  const totalQuantity = useSelector((state) => state?.shoppingCart?.totalQuantity || 0);
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();
  const timeoutRef = useRef(null);

  // Handle search input
  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setShowSearch(false), 2000);
  };

  // Handle search form submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products?search=${searchTerm}`);
      setShowSearch(false);
    }
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <Link to="/" className="navbar-brand">
        <img src={logo} alt="Shop Logo" style={{ height: '40px' }} />
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <NavLink to="/" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/products" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
              Products
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/contact" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
              Contact
            </NavLink>
          </li>

          {/* Cart Dropdown */}
          <li className="nav-item position-relative">
            <Dropdown>
              <NavLink to="/cart" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                <i className="fa-solid fa-cart-shopping me-2"></i>
              </NavLink>
            </Dropdown>

            {totalQuantity > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {totalQuantity}
              </span>
            )}
          </li>

          {/* Account Dropdown */}
          <li className="nav-item dropdown">
            <button 
              className="nav-link dropdown-toggle" 
              id="userDropdown" 
              data-bs-toggle="dropdown" 
              aria-expanded="false"
            >
              <i className="fa-solid fa-user me-2"></i> Account
            </button>
            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
              <li><NavLink to="/profile" className="dropdown-item">Profile</NavLink></li>
              <li><NavLink to="/order-history" className="dropdown-item">Order History</NavLink></li>
              <li><hr className="dropdown-divider" /></li>
              <li><NavLink to="/register" className="dropdown-item">Register</NavLink></li>
              <li><NavLink to="/login" className="dropdown-item">Login</NavLink></li>
              <li><hr className="dropdown-divider" /></li>
              <li><button className="dropdown-item text-danger">Logout</button></li>
            </ul>
          </li>

          {/* Search Icon */}
          <li className="nav-item">
            <button className="btn btn-link text-white search-icon" onClick={() => setShowSearch((prev) => !prev)} aria-label="Search">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </li>
        </ul>

        {/* Search Form */}
        {showSearch && (
          <form className="search-form d-flex ms-3" onSubmit={handleSearchSubmit}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search products..."
              value={searchTerm}
              onChange={handleSearchInputChange}
              aria-label="Search input"
            />
            <button className="btn btn-outline-light" type="submit" aria-label="Submit search">
              Search
            </button>
          </form>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
