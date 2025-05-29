

import React from 'react';

import videoSlider from '../assets/Image/video/videoslide.mp4'
import video1 from '../assets/Image/video/1.mp4'
import video2 from '../assets/Image/video/2.mp4'
import '../assets/Css/InstaPost.css'




import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';

const VideoSlider = () => {


    const videoSlides = [

        {
            id: '1',
            video: video1,
        },
        {
            id: '2',
            video: video2,
        },
        {
            id: '3',
            video: video1,
        },
        {
            id: '4',
            video: video2,
        },
        {
            id: '5',
            video: video1,
        },
        {
            id: '6',
            video: video2,
        },

    ]
    // console.log(videoSlides)

    return (
        <div className='video_container'>
            <div className="container">
                <Swiper
                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                    loop={true}
                    breakpoints={{
                        320: { slidesPerView: 1.2 },
                        640: { slidesPerView: 3 },
                        1024: { slidesPerView: 4 },
                        1280: { slidesPerView: 5 },
                    }}
                    spaceBetween={20}>

                    {videoSlides.map((item, index) => (
                        <SwiperSlide key={index}>
                            <div className="video_slides">

                                <video width="100%"  height="400" playsInline autoPlay loop muted>
                                    <source src={item.video} type="video/mp4"/>
                                </video>

                            </div>
                        </SwiperSlide>
                      
                    ))}
                </Swiper>


            </div>
        </div>
    )
}

export default VideoSlider