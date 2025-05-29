
import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { motion } from 'framer-motion';
 import { Link } from 'react-router-dom';


import slider1 from '../assets/Image/banner/Home-page-bn01.jpg'
import slider2 from '../assets/Image/banner/Home-page-bn02.jpg'
import slider3 from '../assets/Image/banner/Home-page-bn03.jpg'


// import mobile1 from '../assets/Image/banner/mobile-banner/mobile1.jpg'
import mobile1 from '../assets/Image/banner/mobile-banner/mobile-1.jpg'
import mobile2 from '../assets/Image/banner/mobile-banner/mobile2.jpg'
import mobile3 from '../assets/Image/banner/mobile-banner/mobile3.jpg'


import { useRef } from 'react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

/* css file  */
import '../assets/Css/Header.css'






const HomeSlider = () => {

    const swiperRef = useRef(null);
     const [isMobile,setIsMobile]=useState(window.innerWidth<=600)
     const useEffect=(()=>{
         const handleResize =()=>{
             
             setIsMobile(window.innerWidth <=600)
        }
         window.addEventListener('resize',handleResize)
         return()=>window.removeEventListener('resize',handleResize)
     },[])





      const slides = [
    {
        image: isMobile ? mobile1 : slider1,
        title: 'Crafted To Enhance Your Skins Glow',
        subtitle: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates maiores eligendi repellat dignissimos voluptatum dolores eveniet, eum libero non necessitatibus consequatur ut quam nam? Repellendus',
        buttonUrl: 'Buy Now',
        buttonLink: 'product/soap'
    },

    {
        image: isMobile ? mobile2 : slider2,
        title: ' Celebrate With Our Limited Edition Soaps ',
        subtitle: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates maiores eligendi repellat dignissimos voluptatum dolores eveniet, eum libero non',
              buttonUrl: 'Buy Now',
           buttonLink: 'product/soap'

    },
    
    {
        image: isMobile ? mobile3 : slider3,
        title: 'Unique Blended  Formula Just For You ',
        subtitle: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates maiores eligendi repellat dignissimos voluptatum dolores eveniet, eum libero non',
              buttonUrl: 'Buy Now',
              buttonLink: 'product/soap'
    },
];


    return (
        <>

         <div className="home_slider"> 
            <div className="slider-container"   
            onMouseEnter={() => swiperRef.current?.autoplay?.stop()}
           onMouseLeave={() => swiperRef.current?.autoplay?.start()}  >

                <Swiper
                    modules={[Navigation, Pagination, Autoplay, EffectFade]}
                    onSwiper={(swiper) => (swiperRef.current = swiper)} 
                    navigation={{
                        nextEl: '.custom-next',
                        prevEl: '.custom-prev',
                    }}
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                    effect="fade"

                    fadeEffect={{ crossFade: true }} 

                    loop
                    spaceBetween={0}
                    slidesPerView={1}
                    className="swiper-wrapper"
                >
                    {slides.map((slide, index) => (
                        <SwiperSlide key={index}>
                            <div
                                // className="slide "
                                // style={{ backgroundImage: `url(${slide.image})` }}
                            >
                                 <img className='slide' src={slide.image} width="100%" alt="" />
                                <motion.div
                                    className=" container"
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 1 }}
                                >
                                    <motion.h2
                                        className="slide-title"
                                        initial={{ opacity: 0, y: -20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 }}
                                    >

                                   <div className=''>
                                   
                                          
                                   {/* {slide.title} */}
                                   </div>
                                    </motion.h2>

                                    <motion.p
                                        className=" slide-subtitle "
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.5 }}
                                    >
                                        <div className=''>
                                        {/* {slide.subtitle} */}
                                        </div>
                                    </motion.p>

                                    <motion.p
                                        className=" slide-subtitle "
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.7 }}
                                    >
                                          
                                           <div className='common_btn '>
                                            {/* <Link  to={slide.buttonLink} > {slide.buttonUrl}</Link> */}

                                             
                                           </div>

                                    </motion.p>




                                </motion.div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>


                {/* <button className="custom-prev nav-btn">◀</button>
                <button className="custom-next nav-btn">▶</button> */}
            </div>





            </div>

            </>
    )
}

export default HomeSlider