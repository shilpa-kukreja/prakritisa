import { Link } from 'react-router-dom'
import RelatedProduct from './RelatedProduct'

import React, { useContext, useEffect, useState } from 'react';
import '../assets/Css/ProductDetailPage.css';
// import top_banner1 from '../assets/Image/banner/soap-top-banner1.jpg';
import productDetail from '../assets/Image/top-banner/checkout.jpg'
import { useParams } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/thumbs';
import { GoDash } from "react-icons/go";
import { IoStar, IoStarHalfOutline } from "react-icons/io5";
import { FaLeaf, FaHandSparkles, FaBan } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';



const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();


  const { products, addToCart } = useContext(ShopContext);


  const [product, setProduct] = useState(null);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  //  counter
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(null);

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  //  add to cart 


  const handleAddToCart = (e) => {
    e.preventDefault();
    if (product.productType === 'variable' && !selectedVariant) {
      alert("Please select a size for the variable product");
      return;
    }


    const selectedVariantData = selectedVariant ? { size: selectedVariant.size, discountPrice: selectedVariant.discountPrice } : null;
    addToCart(product, quantity, selectedVariantData);


  };



  const [activeTab, setActiveTab] = useState('description')

  useEffect(() => {
    const foundProduct = products.find((p) => String(p._id) === id);
    setProduct(foundProduct);



  }, [id, products]);



  if (!product) return <div>Loading...</div>;

  return (
    <>
      <div className="top_banner for_desktop">
        <img src={productDetail} alt="about_banner" />
      </div>

      <div className="container">
        <div className="product_detail_container">
          <div className="productDetail_img">
            <Swiper
              style={{
                '--swiper-navigation-color': '#000',
                '--swiper-pagination-color': '#000',
              }}
              spaceBetween={10}
              thumbs={{ swiper: thumbsSwiper }}
              modules={[Thumbs]}
              className="mainSwiper"
            >

               <SwiperSlide key={id}>
                  <div className="zoom-wrapper">
                    <img src={`https://prakritisa.com/uploads/thumbImg/${product.thumbImg}`} alt={`product-${id}`} width="100%" className="main-img" />
                  </div>
                </SwiperSlide>
               {
                product.galleryImg.map((img, id) => (
                <SwiperSlide key={id}>
                  <div className="zoom-wrapper">
                    <img src={`https://prakritisa.com/uploads/galleryImg/${img}`} alt={`product-${id}`} width="100%" className="main-img" />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            <Swiper
              onSwiper={setThumbsSwiper}
              spaceBetween={10}
              slidesPerView={4}
              watchSlidesProgress
              className="thumbSwiper"
              modules={[Thumbs]}
            >
               <SwiperSlide key={id}>
                  <img src={`https://prakritisa.com/uploads/thumbImg/${product.thumbImg}`} alt={`thumb-${id}`} width="100%" className="thumb-img" />
                </SwiperSlide>
             {
               product.galleryImg.map((img, id) => (
                <SwiperSlide key={id}>
                  <img src={`https://prakritisa.com/uploads/galleryImg/${img}`} alt={`thumb-${id}`} width="100%" className="thumb-img" />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className="prodcut_information">
            <h2 className='product_name'>{product.name}</h2>


            <div className="price_section">
              {product.productType === 'simple' ? (
                <>
                  <span className='price'>₹{product.discountPrice}</span> <GoDash />
                  {product.discountPrice && (
                    <span className='discount_price'>₹{product.price}</span>
                  )}
                </>
              ) : (

                <>

                  {/* Show size */}
                  <span className='price'>₹{selectedVariant ? selectedVariant.discountPrice : product.variant[0].discountPrice}</span> <GoDash />
                  {product.variant[0].price && (
                    <span className='discount_price'>₹{selectedVariant ? selectedVariant.price : product.variant[0].price}</span>
                  )}
                </>
              )}
            </div>





            <div className="product-rating">
              <IoStar /> <IoStar /> <IoStar /> <IoStar /> <IoStarHalfOutline /> <span> (Customer Review)</span>
            </div>
            <div className="sku">SKU: {product.sku}</div>
            <div className="stock">Stock: {product.stock}</div>

            <p
              className="shortDescription"
              dangerouslySetInnerHTML={{ __html: product.shortDescription }}
            ></p>

            <div className="common-tags">
              <div className="tag"><FaLeaf className="tag-icon" /><span>Cruelty Free</span></div>
              <div className="tag"><FaHandSparkles className="tag-icon" /><span>100% Handmade</span></div>
              <div className="tag"><FaBan className="tag-icon" /><span>Paraben Free</span></div>
            </div>

            {/* Show Weights for variable product */}

            {product.productType === 'variable' && Array.isArray(product.variant) && (
              <div className="product_weight">
                <b>Weight: </b>
                <ul>
                  {product.variant.map((v, id) => (
                    <li key={id} className='weight_btn_list'>
                      <button
                        className={` weight-btn ${selectedVariant?.size === v.size ? 'active' : ''}`}
                        onClick={() => setSelectedVariant(v)}
                      >
                        {v.size}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}


            {/* ------------------- */}




            {/* increase  quantity */}



            <div className="product_counter">

              <div className='form'>


                {/* <form onSubmit={(e) => e.preventDefault()}> */}
                <div className="quantity_btn">
                  <button type="button" onClick={handleDecrease} className="minus btn"> - </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    min="1"
                    className="quantity_input"
                    required
                  />




                  <button type="button" onClick={handleIncrease} className="plus btn"> + </button>
                </div>

                <div className="cart_btn">
                  <button onClick={handleAddToCart}>Add To Cart</button>
                </div>
                {/* </form> */}
              </div>

              {/*  buy now btn  */}
              <div class=" buy_now">
                <button type='submit' onClick={handleAddToCart} > Buy Now </button>
              </div>

            </div>


            {/* <div className="cardImg_wrapper">
              <img src={masterCard} alt="masterCard" width='100%' />
              <img src={payPel} alt="payPel" width='100%' />
              <img src={rupay} alt="rupay" width='100%' />
              <img src={stripe} alt="stripe" width='100%' />
              <img src={visa} alt="visa" width='100%' />
            </div> */}



          </div>

        </div>

        <div className="tab_container">
          <div className="tab_btn">
            <button
              className={activeTab === 'description' ? 'active' : ''}
              onClick={() => setActiveTab('description')}
            >
              Description
            </button>

            {/* <button
              className={activeTab === 'addInformation' ? 'active' : ''}
              onClick={() => setActiveTab('addInformation')}
            >
              Additional Information
            </button> */}
          </div>



          <div className="tab_content">
            {activeTab === 'description' && (
             <p dangerouslySetInnerHTML={{ __html: product.description }} />
            )}

            {activeTab === 'addInformation' && (
              <p>    {product.additionalInformation}

              </p>
            )}
          </div>
        </div>






      </div>




      {/*  related product  */}


      <RelatedProduct currentProductId={product.id} category={product.category} />
    </>
  );
};

export default ProductDetail;
