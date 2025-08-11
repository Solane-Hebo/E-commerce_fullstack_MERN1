import React, { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch  } from 'react-redux'
import { logout as logoutRedux } from '../Store/userSlice'
import { useAuth } from './AuthContext'
import { useCart } from './CartContext'
import logo from '../assets/Images/logo.png'
import Dropdown from './Dropdown'
import './Styles/Navbar.css'


const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [showSearch, setShowSearch] = useState(false)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const searchRef = useRef(null)

  const { logout, user } = useAuth()
  const { clearCart } = useCart()

  
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products?search=${searchTerm}`)
      setShowSearch(false);
      setSearchTerm('')
    }
  };

  const handleLogout = () => {
    logout()
    clearCart()
    dispatch(logoutRedux())
    navigate('/')
  };
  

  const handleNavClick = () => {
    const navbarCollapse = document.getElementById('navbarNav')
    if (navbarCollapse.classList.contains('show')) {
      const bsCollapse = new window.bootstrap.Collapse(navbarCollapse, {
        toggle: true
      });
      bsCollapse.hide()
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearch(false)
      }
    }

    if (showSearch) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    };
  }, [showSearch])

  
  
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <Link to="/" onClick={handleNavClick} className="navbar-brand">
        <img src={logo} alt="Shop Logo" />
      </Link>

      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto align-items-center">
          <li className="nav-item">
            <NavLink to="/" onClick={handleNavClick} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Home</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/products" onClick={handleNavClick} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Products</NavLink>
          </li>

          {/* Cart Dropdown */}
          <li className="nav-item position-relative">
         <Dropdown onClick={handleNavClick}/>
          </li>
          
          <li className="nav-item">
            <NavLink to="/contact" onClick={handleNavClick} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Contact</NavLink>
          </li>

           

          {/* Account Dropdown */}
          <li className="nav-item dropdown">
            <button className="nav-link dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
              <i className="fa-solid fa-user me-2"></i> Account
            </button>
            <ul className="dropdown-menu dropdown-menu-end">
          <li><NavLink to="/register" onClick={handleNavClick} className="dropdown-item">Register</NavLink></li>
             {
               user === null
            ?<li><NavLink to="/login" onClick={handleNavClick} className="dropdown-item">Login</NavLink></li>
            :(
             <>
          <li><NavLink to="/profile" onClick={handleNavClick} className="dropdown-item">Profile</NavLink></li>
          <li><NavLink to="/order-history" onClick={handleNavClick} className="dropdown-item">Order History</NavLink></li>
          <li><hr className="dropdown-divider" /></li>
          <li><button  onClick={() => { handleLogout(); handleNavClick(); }}className="dropdown-item text-danger">Logout</button></li>

         {
          user.role === 'admin' &&  <li><NavLink to="/admin" className={({ isActive }) => `dropdown-item${isActive ? ' active' : ''}`}>Admin </NavLink></li>
         }
         </>
         )
      }  
       
      </ul>
         </li>
   </ul>
     {/* Search Toggle */}
     <div ref={searchRef} className="nav-item d-flex align-items-center position-relative">
        <li className="nav-item" >
            <button className="btn btn-link search-icon" onClick={() => setShowSearch(!showSearch)} aria-label="Search">
            <i className="fa-solid fa-magnifying-glass"></i>
            </button>
        </li>

        {/* Search Form */}
        {showSearch && (
          <form className="search-form d-flex ms-3" onSubmit={handleSearchSubmit}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Search input"
            />
            <button onClick={handleNavClick} className="btn btn-outline-light" type="submit">Search</button>
          </form>
        )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
  

