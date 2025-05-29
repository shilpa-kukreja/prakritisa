import React from 'react';
import CommonHeadline from './CommonHeadline';

// Swiper imports
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import clientImg from '../assets/Image/banner/about-us.jpg';

const ClientTestimonial = () => {
    const ClientData = [
        {
            productImg: clientImg,
            title: 'The Best Soap I have Ever Used',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, animi?',
            clientImg: clientImg,
            clientName: 'Rupesh',
            clientProfession: 'Developer',
        },
        {
            productImg: clientImg,
            title: 'A Truly Luxurious Experience',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, animi?',
            clientImg: clientImg,
            clientName: 'Rupesh 1',
            clientProfession: 'Engineer',
        },
        {
            productImg: clientImg,
            title: 'Highly Recommended!',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, animi?',
            clientImg: clientImg,
            clientName: 'Rupesh 2',
            clientProfession: 'Designer',
        },
        {
            productImg: clientImg,
            title: 'My Go-To Product',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, animi?',
            clientImg: clientImg,
            clientName: 'Rupesh 3',
            clientProfession: 'Artist',
        },
    ];

    return (
        <div className="clientTestimonial_section">
            <div className="container">
                <CommonHeadline title="Prime Clients" subtitle="Feedback & Testimonials" />

                <div className="testimonials_slider">
                    <Swiper
                        slidesPerView={2}
                        spaceBetween={25}
                        navigation={true}
                        // pagination={{ clickable: true }}
                        autoplay={{ delay: 3000 }}
                        loop={true}
                        modules={[Navigation, Pagination, Autoplay]}
                        breakpoints={{
                            1024: { slidesPerView: 2 },
                            768: { slidesPerView: 2 },
                            640: { slidesPerView: 1 },
                            320: { slidesPerView: 1 },
                        }}
                        className="mySwiper"
                    >

                        {ClientData.map((data, id) => (
                            <SwiperSlide key={id}>
                                <div className="client_section">

                                    <div className="product_img">
                                        <img src={data.productImg}  width='100%'  alt="Product" />
                                    </div>


                                    <div className="client_details">
                                        <h2 className="title">{data.title}</h2>
                                        <p className='description'>{data.description}</p>


                                        <div className="client_img">
                                            <div>
                                                <img src={data.clientImg} width='60px' height='60px' style={{ borderRadius:'50%'}} alt="Client" />
                                            </div>
                                            <div>
                                                <h4>{data.clientName}</h4>
                                                <span>{data.clientProfession}</span>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </div>
    );
};

export default ClientTestimonial;
