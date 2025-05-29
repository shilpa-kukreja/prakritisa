
import React from 'react'
// import top_banner from '../assets/Image/banner/soap-top-banner.jpg'

import aboutUsImg from '../assets/Image/banner/about-us.jpg'

import CommonBanner from './CommonBanner'

import CommonHeadline from '../Pages/CommonHeadline'
import { Link } from 'react-router-dom'
// import aboutus css here

import '../assets/Css/AboutUs.css'
// import aboutVideo from '../assets/Image/video/about-us-video1.mp4'

// testimonial 
import ClientTestimonial from '../Pages/ClientTestimonial'

import icon1 from '../assets/Image/icon/icon1.png'
import icon2 from '../assets/Image/icon/icon2.png'
import icon3 from '../assets/Image/icon/icon3.png'
import icon4 from '../assets/Image/icon/icon4.png'
import icon5 from '../assets/Image/icon/icon5.png'
import icon6 from '../assets/Image/icon/icon6.png'


const About = () => {


  const philosophy = [{
    id: 1,
    img: icon1,
    title: 'Nature First',
    subtitle: "We rely on nature's healing power — herbs, clays, oils, and roots — never on synthetic chemicals or artificial additives.",
  },

  {
    id: 2,
    img: icon2,
    title: 'Value Over Hype',
    subtitle: "Our products are made to deliver real benefits, not just attractive packaging or chemical lather.",
  },
  {
    id: 3,
    img: icon3,
    title: 'Transparency Matters',
    subtitle: " Every ingredient we use is listed clearly — nothing hidden, nothing harmful.",
  },
  {
    id: 4,
    img: icon4,
    title: 'Holistic Wellness',
    subtitle: "Inspired by Ayurveda, we believe skincare should be a ritual of care, not just a routine.",
  },
  {
    id: 5,
    img: icon5,
    title: 'Small Batches, Big Care',
    subtitle: "All soaps are handcrafted and cold-processed in small batches for quality, potency, and freshness.",
  },
  {
    id: 6,
    img: icon6, 
    title: 'Rooted in Tradition',
    subtitle: "We blend Ayurvedic and folk wisdom with modern science to craft deeply nurturing, tradition-rooted skincare solutions.",
  }



  ]
  return (
    <div className="about_container">

      <div className="top_banner for_desktop">

        <CommonBanner />
      </div>


      <div className="container">
        <div className="about_section">

          <div className="about_left" >
            <img src={aboutUsImg} width='100%' alt="aboutusImg" />

          </div>

          <div className="about_right">



            <div className="about_us_content common_right_heading ">
              <span className='common_subtitle'>About Us </span>
              <h2 className='common_title'>Crafted by Nature. Trusted by Skin.


              </h2>

              <p className='common_para'>
                Welcome to Prakritisa, where nature meets tradition to bring you herbal soaps that are truly skin-deep in purity and wellness. At the heart of our brand lies a simple belief — that skincare should nourish, not harm, and that true beauty begins with ingredients you can trust.
              </p>
              <p className='common_para'>
                We are on a mission to raise awareness about the harmful effects of chemical-based soaps and offer safe, Ayurvedic alternatives that actually enhance your skin’s natural quality. With every bar of soap we make, we aim to bring you closer to a lifestyle rooted in wellness, simplicity, and truth.
              </p>



              <div className='about_content_counter'>

                <div className='CounterNumber'>
                  <span>8500 k</span>
                  <div className='count_description'>
                    <p>Product Sold </p>

                  </div>
                </div>
                <div className='CounterNumber'>
                  <span>99.99 %</span>
                  <div className='count_description'>
                    <p>Pure Formula</p>

                  </div>
                </div>
                <div className='CounterNumber'>
                  <span> 99 k</span>
                  <div className='count_description'>
                    <p>Happy Costomers </p>

                  </div>
                </div>
                <div className='CounterNumber'>
                  <span> 48 <b>+</b></span>
                  <div className='count_description'>
                    <p> Corporate Products </p>

                  </div>
                </div>

              </div>

              <div className="common_btn">
                <Link>Explore More</Link>
              </div>

            </div>
          </div>
        </div>

      </div>
      {/*  about video section start here */}



      {/*  our philosophy  */}

      <div className="philosophy">
         

          <div className="container">
          <CommonHeadline
          subtitle=""
          title="Our Philosophy"
        />


        <div className='grid_box'>

          {
            philosophy.map((item, id) => (
              <div className='inner-box' key={id}>
                 <img src={item.img} width="50px" alt={item.title} />
                <h3 className='title'>{item.title}</h3>
                <p className='subtitle'>{item.subtitle}</p>
           
              </div>
            ))
          }
        </div>
          </div>


      </div>










      {/* <AboutVideo /> */}
      {/* <div className="about_video">

        <video src={aboutVideo} type="video/mp4" autoPlay muted loop playsInline style={{ width: '100%', height: '70vh', objectFit: 'cover', display: 'block', }}
        ></video>
      </div>


      <div>
        <ClientTestimonial />
      </div> */}








    </div>
  )
}

export default About