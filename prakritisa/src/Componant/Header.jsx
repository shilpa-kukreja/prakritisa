
import React, { useEffect, useRef } from 'react'

import prakritisaLogo from '../assets/Image/logo/prakritisa-logo.png'
import { FiUser } from "react-icons/fi";
import { IoIosSearch } from "react-icons/io";
import { LiaShoppingBagSolid } from "react-icons/lia";
import { useLocation } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext';
import { useContext } from 'react';
import { FaAngleDown } from "react-icons/fa6";
import { useState } from 'react';
import { IoMdClose } from "react-icons/io";
import { IoSearchOutline } from "react-icons/io5";
import BlogPage from './BlogPage';
/* css file  */
import '../assets/Css/Header.css'


import { FiMenu } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";


const Header = () => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [showSearchInput, setShowSearchInput] = useState(false);

  const { categories, cartItems, toggleCart, searchProducts, products, token,
    setToken,setLoginnavigate } = useContext(ShopContext);
  const searchBoxRef = useRef(null);
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef();

  useEffect(() => {
    // Check token presence on component mount
    setIsLoggedIn(!!token);
  }, [token]);





  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  const handleLogout = () => {
    setLoginnavigate("/");
    navigate("/login");
    localStorage.removeItem("token");
    setToken(null);
    setIsLoggedIn(false);
    setIsOpen(false);
  
  };


  const totalCartItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };


  const handleCategoryClick = (category) => {
    navigate(`/product/${category}`);


  }




  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      // navigate(`/product/search?q=${encodeURIComponent(searchInput.trim())}`);
      setSearchInput('');

    }
  };

  const filteredSuggestions = searchInput
    ? products.filter(p =>
      p.name.toLowerCase().includes(searchInput.toLowerCase())
    ).slice(0, 5)
    : [];



  // Close suggestions on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchBoxRef.current && !searchBoxRef.current.contains(e.target)) {
        setShowSearchInput(false);
        setSearchInput(' ');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);





  const location = useLocation();
  const isHome = location.pathname === '/';



  return (
    <div className={`header_container ${isHome ? 'transparent' : 'white-bg'}`}>


      {isMenuOpen && <div className="menu_overlay" onClick={() => setIsMenuOpen(false)}></div>}

      <div className="container">
        <div className='navbar'>

          <div className={`nav_links ${isMenuOpen ? 'mobile_menu_open' : ''}`}>


            {/*  cross icon in mobile  */}
            {isMenuOpen && (
              <div className="close_icon_mobile" onClick={() => setIsMenuOpen(false)}>
                <RxCross2 size={24} />
              </div>
            )}




            <Link to='/' onClick={() => setIsMenuOpen(false)}> Home </Link>
            <Link to='/about' onClick={() => setIsMenuOpen(false)}> About Us </Link>
             <Link to='/all-blogs' onClick={()=>setIsMenuOpen(false)}>Blogs</Link>

            <div className="dropdown">
              <span className="dropdown-label">Shop <FaAngleDown size={14} /></span>
              <div className="dropdown-content">
                {categories.map(({ id, name, slug }) => (
                  <div key={id} onClick={() => { handleCategoryClick(slug); setIsMenuOpen(false); }} className="dropdown-category">
                    <strong className='cursor-pointor'>{name}</strong>
                  </div>
                ))}
              </div>
            </div>

            {/* <div className="dropdown">
              <span className="dropdown-label">Shop <FaAngleDown /></span>
              <div className="dropdown-content">
                {categories.map(({ category }) => (
                  <div key={category} onClick={() => { handleCategoryClick(category); setIsMenuOpen(false); }} className="dropdown-category">
                    <strong className='cursor-pointor'>{category.toUpperCase()}</strong>
                  </div>
                ))}
              </div>
            </div> */}


            <Link to='/contact' onClick={() => setIsMenuOpen(false)}> Contact Us </Link>
          </div>

          <div className="logo">
            <Link to='/'> <img src={prakritisaLogo} width='90px' alt="" /> </Link>
          </div>






          <div className='header_right_icons'>


            <div className="hamburger_icon">
              {!isMenuOpen && <FiMenu size={24} onClick={() => setIsMenuOpen(true)} />}
            </div>

            <div className="user_icon icon" ref={menuRef}>
              <div onClick={() => setIsOpen(!isOpen)} className="user-icon">
                <FiUser />
              </div>

              {isOpen && (
                <div className="user-dropdown">
                  {!isLoggedIn ? (
                    <Link to="/signin" className="dropdown-item">
                      Sign In
                    </Link>
                  ) : (
                    <>
                      <Link to="/orders"><button className="dropdown-item">
                        Order History</button>
                      </Link>
                      <button className="dropdown-item" onClick={handleLogout}>
                        Logout
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>

            <div className='search_icon icon' ref={searchBoxRef}>
              <IoIosSearch onClick={() => setShowSearchInput(prev => !prev)} />

              {showSearchInput && (
                <form className='search_form' >
                  {/* <form className='search_form' onSubmit={handleSearch}> */}
                  <input
                    type="text"
                    id='search'
                    placeholder='Search products...'
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    autoFocus
                    required
                    autoComplete='off'
                  />
                  <div className='close_searchbar' onClick={() => setShowSearchInput(prev => !prev)}> <IoMdClose /> </div>

                  {searchInput && filteredSuggestions.length > 0 && (
                    <ul className="search_suggestions">
                      {filteredSuggestions.map((product, index) => (
                        <li className='search_lists '
                          key={product.id}
                          onClick={() => {
                            navigate(`/product-details/${product._id}`);
                            setShowSearchInput(false);
                            setSearchInput('');
                          }}
                        >
                          {index + 1}.  {product.name}
                        </li>
                      ))}
                    </ul>
                  )}

                </form>
              )}
            </div>




            <div className='cart_icon icon' onClick={toggleCart}  >

              <LiaShoppingBagSolid />
              <div className='item_quantity'>

                {totalCartItems}

              </div>

            </div>
          </div>

        </div>


      </div>
    </div>
  )
}

export default Header