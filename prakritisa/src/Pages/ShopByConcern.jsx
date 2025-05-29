

import React, { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'



import '../assets/Css/InstaPost.css'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useNavigate } from 'react-router-dom';

    const ShopByConcern = () => {

    const { shopbyconcern ,products ,categories } = useContext(ShopContext);
    const navigate = useNavigate();

    // console.log(shopbyconcern);





   
  const handleShopByConcern = (concernSlug) => {
  
    navigate(`/concern/${concernSlug}`);

   
        

};

    return (
        <div>

            <div className="shopbyconcern_section">
                <div className="container">
                    <Swiper
                        autoplay={{ delay: 3000, disableOnInteraction: false }}
                        loop={true}
                        breakpoints={{
                            320: { slidesPerView: 2 },
                            640: { slidesPerView: 3 },
                            1024: { slidesPerView: 4 },
                            1280: { slidesPerView: 5 },
                        }}
                        spaceBetween={20}>

                        { shopbyconcern.map((item, index) => (

                            <SwiperSlide key={index}>
                                <div className="img_slide_box"  onClick={()=>handleShopByConcern(item.slug) }>
                                    <div className="img_slides">
                                    <img src={`${import.meta.env.VITE_BACKEND_URL}${item.image.url}`} alt={item.id} width="100px" />
                                    </div>
                                   <p className='title'>{item.name}</p>   
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                </div>
            </div>
        </div>
    )
}

export default ShopByConcern