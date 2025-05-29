import React from 'react';
import HomeSlider from '../Pages/HomeSlider';
import CounterSection from '../Pages/CounterSection';
import CommonHeadline from '../Pages/CommonHeadline';

import ProductSlider from '../Pages/ProductSlider'; import GrainBanner from '../Pages/GrainBanner';
import ProductBanner from '../Pages/ProductBanner';
import InstaPostSlider from '../Pages/InstaPostSlider';
import Blog from '../Componant/Blog';

import CategorySlider from '../Pages/CategorySlider';
import ShopByConcern from '../Pages/ShopByConcern';
import VideoSlider from '../Pages/VideoSlider';
import GrainBanners from '../Pages/GrainBanners';

import '../assets/Css/Header.css'

const Home = () => {
  return (
    <>
      <HomeSlider />



      {/* <CategorySlider /> */}

      <div className='margin-60' >
        <CommonHeadline
          // subtitle="handmade collections"
          title="The Prakritisa Soap Story"
        />


         <div className="container">
         <div className="topContent" >
          <h5>
            At Prakritisa, we saw through the illusion of commercial soaps — all lather, no care.
            Loaded with harsh chemicals like SLS, parabens, and phthalates, they often do more harm than good.

            That’s why we created Prakritisa Soaps — beautifully aromatic, genuinely effective, and rooted in purity. A soap that speaks through results — and earns trust, bar by bar
          </h5>
        </div>
         </div>

      </div>


      {/* products slider  */}

      <div  className='margin-60' >
        <CommonHeadline
          subtitle="handmade collections"
          title="natural bathing soaps"
        />
        <ProductSlider category="soap" />
      </div>
      
      <GrainBanner  />

      {/*  videoslider  */}

      <div className='padding-60' >
        <CommonHeadline
          subtitle="Watch video"
          title="natural bathing soaps"
        />
        <VideoSlider />
      </div>

    

      {/* 3 productBanner componant  */}

      <ProductBanner />


      {/* counter section start here  */}
      <CounterSection />




      {/* shopbyconcern section start here  */}
      <div className='padding-60'>
        <CommonHeadline
          subtitle="Shop By Concern"
          title="vitamins & minerals "
        />
        <ShopByConcern />
      </div>



      {/* grains products show here */}

      {/* <div style={{ margin: '60px 0' }}>
        <CommonHeadline
          subtitle="Whole Grain"
          title=" Essential vitamins & minerals"
        />
        <ProductSlider category="grains" />
      </div> */}


      {/*  grains banner show here */}
        <GrainBanners/>
      {/* insta post css   */}


      {/*  blogs section add here */}
      <div className='padding-60'>
        <CommonHeadline
          subtitle=" Instant"
          title=" News & Updated Blogs"
        />
        <Blog />
      </div>


      {/* insta post add here  */}
      <div >
        <CommonHeadline
          subtitle=" Insta Posts"
          title=" View  Our Social Media "
        />
        <InstaPostSlider />
      </div>





    </>
  );
};

export default Home;
