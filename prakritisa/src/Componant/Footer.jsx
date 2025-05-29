

import logo from '../assets/Image/logo/prakritisa-logo.png'
import '../assets/Css/Footer.css'
import { Link } from 'react-router-dom'
import { IoMdCall } from "react-icons/io";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import { useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';

import { MdEmail } from "react-icons/md";

import React, { useContext, useEffect } from 'react'

import { ShopContext } from '../context/ShopContext';

const Footer = () => {


  const [isMobile, setIsMobile] = useState(Window.innerWidth <= 600)
  const [openSection, setOpenSection] = useState(null)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600)
    }
    window.addEventListener('resize', handleResize)
  }, [])
  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section)
  }


  const { blog } = useContext(ShopContext);
  const firstBlogId = blog?.[0]?.id || 1;
  return (
    <div className='footer_section'>
      <div className="container">

        <div className="footer_links">
          <div className="footer_widget  footer_logo">

            <div className="">
              <Link to="/"><img src={logo} width={100} alt="logo" />  </Link>

              <p>
                At Prakritisa, we craft natural, Ayurvedic skincare rooted in ancient wisdom and modern purity — no toxins, just care.
              </p>
            </div>
          </div>

          <div className="footer_widget"  >
            <h4 onClick={() => toggleSection('useful')}>
              Useful Links{' '}
              {isMobile &&
                (openSection === 'useful' ? <FaMinus className='icon' /> : <FaPlus className='icon' />)}
            </h4>
            <div style={{ display: !isMobile || openSection === 'useful' ? 'block' : 'none' }}>
              <ul>
                <li><Link to='/'> Home  </Link></li>
                <li><Link to='/about'> About Us </Link></li>
                <li><Link to='product/soap'> Our Products  </Link></li>
                <li><Link to='/all-blogs'> Blogs </Link></li>
                <li><Link to='/signin'> My Account </Link></li>

              </ul>
            </div>
          </div>

          <div className='footer_widget' >
            <h4 onClick={() => toggleSection('knowledge')}>
              Knowledge{' '}
              {isMobile &&
                (openSection === 'knowledge' ? <FaMinus className='icon' /> : <FaPlus className='icon' />)}
            </h4>
            <div style={{ display: !isMobile || openSection === 'knowledge' ? 'block' : 'none' }}>
              <ul>
                <li><Link to="/privacy-policy" > Privacy  Policy </Link></li>
                <li><Link to="/terms-and-condition-policy" > Terms & Condition</Link></li>
                <li><Link to="/return-and-refund-policy" > Return & Refund Policy </Link></li>
                <li><Link to="/shipping-policy" > Shipping Policy </Link></li>
                <li><Link to='/contact'> Contact Us </Link></li>

              </ul>
            </div>
          </div>

          <div className="footer_widget">
            <h4 onClick={() => toggleSection('contact')}>
              Contact Us{' '}
              {isMobile &&
                (openSection === 'contact' ? <FaMinus className='icon' /> : <FaPlus className='icon' />)}
            </h4>

            <div style={{ display: !isMobile || openSection === 'contact' ? 'block' : 'none' }}>
              <ul className='contact_address_detail '>


                <li >
                  <div className='address'>
                    <FaMapMarkerAlt className='icon' />  &nbsp; &nbsp;   <span>  T3-1406,14 FLOOR,TOWER T3, ACE PARKWAY, SECTOR-150, Noida,  Gautam Buddha Nagar UTTAR PRADESH 201301 </span>
                  </div>
                </li>
                <li>
                  <div className='contact_info'>
                    <FaPhone className='icon' /> &nbsp; &nbsp;
                    <Link to="tel:+91 9220807109"> +91 9220807109</Link>
                    {/* <Link to='tel:+91 0000000'> +91 9220807109</Link> */}
                  </div>
                </li>
                <li>
                  <div className='email_info'>
                    <MdEmail className='icon' />  &nbsp; &nbsp; <Link to='mailto: @gmail.com'>finance@prakritisa.com</Link>
                  </div>
                </li>
              </ul>


            </div>
          </div>



        </div>

         <div className='copyright_section'>
             <p>
              Copyright &copy; <Link to='/'> Prakritisa. </Link> All Right Reserved
             </p>
        </div>


      </div>








      <a href="tel: +91 9220807109" className="btn-call-pulse">
        <img
          src="https://img.icons8.com/ios-filled/50/ffffff/phone.png"
          style={{ position: 'absolute', width: '20px', height: '20px' }}
          alt="call"
        />
      </a>

      <a href="//wa.me/9220807109" target='_blank' className="btn-whatsapp-pulse">
        <img
          src="https://img.icons8.com/ios-filled/50/ffffff/whatsapp--v1.png"
          style={{ position: 'absolute', width: '18px', height: '18px' }}
          alt="whatsapp"
        />
      </a>

    </div>
  )
}

export default Footer