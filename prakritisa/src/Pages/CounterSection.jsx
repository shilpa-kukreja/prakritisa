
import React from 'react'


import '../assets/Css/Counter.css'
import textSaopImg from '../assets/Image/textSoapImg.jpg'
import { Link } from 'react-router-dom'
import { TfiArrowTopRight } from "react-icons/tfi";


import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';







const CounterSection = () => {


    const counterData = [{
        value: '128+',
        title: 'GLOBAL STORES'
    },
    {
        value: '99 K',
        title: 'HAPPY CUSTOMERS'
    },
    {
        value: '190 +',
        title: 'PROFESSION TEAM'
    },
    {
        value: '84 K',
        title: 'CORPORATE MEMBERS'
    },
    {
        value: '54 +',
        title: 'CUSTOMIZED PRODUCTS'
    }
    ]





    return (
        <div className='counter_section'>

            <div className="container">

                <div className=' counter_section_title '>
                {/* <img src={textSaopImg} width='140px' alt="textImg" /> */}
                    <h2>
                        Luxurious Skin   Care Natural Products                    
                        Dedicated To Give Radiant And Youthful Glow
                    </h2>
                    {/* <p className='para'>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum provident nesciunt rem architecto praesentium voluptatibus nisi adipisci, at minus doloremque!
                    </p> */}


                </div>



                <Swiper

                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                    loop={true}
                    breakpoints={{
                        320: { slidesPerView: 1 },
                        640: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                        1280: { slidesPerView: 4 },
                    }}
                    spaceBetween={20}
                >
                    {counterData.map((item, index) => (
                        <SwiperSlide key={index}>
                            <div className="counter_box">
                                <h3 className="counter_value">{item.value}</h3>
                                <p className="counter_title" style={{justifyContent:'center'}}>{item.title}</p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>



            </div>


        </div>
    )
}

export default CounterSection