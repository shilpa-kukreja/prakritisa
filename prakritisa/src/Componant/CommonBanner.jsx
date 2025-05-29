import React from 'react';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';

// Import all banner images


 import aboutbanner from '../assets/Image/top-banner/about us.jpg'
 import contactbanner from '../assets/Image/top-banner/Contact Us.jpg'
 import shopby from '../assets/Image/top-banner/Shop by.jpg'
import bannerDefault from '../assets/Image/top-banner/about us.jpg';

//  import aboutMobile from '../assets/Image/banner/mobile-banner/aboutMobile.jpg'
//  import contactMobile from '../assets/Image/banner/mobile-banner/contactMobile.jpg'
//  import shopByMobile from '../assets/Image/banner/mobile-banner/shopByMobile.jpg'
//  import defaultMobile from '../assets/Image/banner/mobile-banner/aboutMobile.jpg'


  const CommonBanner = () => {

//  const [isMobile,setIsMobile]=useState(window.innerWidth<=600)

//    const useEffect=(()=>{
//          const handleResize =()=>{
             
//              setIsMobile(window.innerWidth <=600)
//         }
//          window.addEventListener('resize',handleResize)
//          return()=>window.removeEventListener('resize',handleResize)
//      },[])






  const location = useLocation();
  const path = location.pathname;

  let bannerImage = bannerDefault;

 if (path.startsWith('/product/soap')) {
    bannerImage =  shopby;
  } else if (path.startsWith('/product/grains')) {
    bannerImage =   shopby;
  } else if( path.startsWith('/contact')){
     bannerImage =  contactbanner
  }
   else if( path.startsWith('/about')){
     bannerImage =   aboutbanner
  }

  return (
    <div className="top_banner for_desktop">

      <img src={bannerImage} alt="page banner" />
    </div>
  );
};

export default CommonBanner;


