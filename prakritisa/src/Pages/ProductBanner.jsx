

import React from 'react'
import '../assets/Css/ProductSlide.css'
// src/assets/Image/banner/productbanner1.jpg
import img1 from '../assets/Image/banner/productbanner1.jpg'
import img2 from '../assets/Image/banner/productbanner2.jpg'
import img3 from '../assets/Image/banner/productbanner3.jpg'

import { Link } from 'react-router-dom'

const ProductBanner = () => {


    const bannerText = [{
        img:img1,
    //     subtitle: 'Nourish Your Skin',
    //     title: 'Luxurious Organic Soap Collection',
    //      buttonText: 'Shop Now',
    // buttonLink: 'product/soap'

    },

    {      img:img2,
    //     subtitle: 'The Magic of Organic Soap',
    //     title: 'Pure and Natural Cleansing',
    //     buttonText: 'Explore More',
    // buttonLink: 'product/grains'

    },
    {    img:img3,
    //     subtitle: 'Purity of Organic Soaps',
    //     title: 'Our Natural Cleansing Solutions',
    //     buttonText: 'Learn More',
    // buttonLink: 'about'
    }


    ]




    return (
        <>
            <div className="product_banner">
                <div className="container">
                    <div className="product_banner_grid">
                        {
                            bannerText.map((item,id)=>((

                                 <div className="img_box" key={id}>
                                     <img src={item.img} width="100%" alt="product-img" />
                                     {/* <div className="overlay"></div> */}
                                     <div className="product_text">
                                          {/* <div className='item_subtitle'>{item.subtitle}</div> */}
                                          {/* <div className=' item_title'> {item.title}</div> */}
                                          {/* <Link to={item.buttonLink} className="banner_btn">{item.buttonText}</Link> */}
                                     </div>

                                    
                                 </div>

                                

                            )))
                        }

                    </div>
                </div>
            </div>




        </>
    )
}

export default ProductBanner