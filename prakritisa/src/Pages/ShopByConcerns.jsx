


import React, { useContext, useState, useEffect } from 'react';

import { ShopContext } from '../Context/ShopContext';
import '../assets/Css/ProductSlide.css';
// import CommonBanner from './CommonBanner';

import { FiHeart } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';
import { IoStar, IoStarHalfOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';
import top_banner1 from '../assets/Image/banner/soap-top-banner1.jpg'
import { useLocation } from 'react-router-dom';
import { useParams, useNavigate } from 'react-router-dom';
import { IoSearchOutline } from "react-icons/io5";

import sideImg from '../assets/Image/Sidebar-image.jpg'
import { FaChevronDown } from "react-icons/fa";


// infinite scroll products 
import InfiniteScroll from 'react-infinite-scroll-component';

const  ShopByConcerns = () => {

  const { products, subcategories, categories, addToCart, searchProducts, filterProductsByPrice, addToWishlist, wishlistItems, toggleWishlist,  shopbyconcern} = useContext(ShopContext);
  const { slug } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q");

  const [filteredProducts, setFilteredProducts] = useState([]);

  const [searchInput, setSearchInput] = useState("");

  const [visibleProducts, setVisibleProducts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const itemsPerPage = 6;

  const shopbyconcerns = shopbyconcern.find((con) => con.slug == slug);





  const [selectedSizes, setSelectedSizes] = useState({});
  const [showSizeOptions, setShowSizeOptions] = useState({});


  useEffect(() => {
    const isAnyPanelOpen = Object.values(showSizeOptions).some((val) => val);
    document.body.style.overflow = isAnyPanelOpen ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showSizeOptions]);

  const handleSearch = (e) => {
    e.preventDefault();
    const results = searchProducts(searchInput);
    setFilteredProducts(results);
    setVisibleProducts(results.slice(0, itemsPerPage));
  };



  useEffect(() => {
    let filtered = [];
console.log('ok', products);
    if (shopbyconcerns) {

        filtered = products.filter(p => p.shopconcern.includes(shopbyconcerns.name));      
    } else {
      filtered = products;
    }
    

    

    setFilteredProducts(filtered);
    setVisibleProducts(filtered.slice(0, itemsPerPage));
    setHasMore(filtered.length > itemsPerPage);
  }, [ query, products]);




  //  price filter 

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(500);

  const handleMinChange = (e) => setMinPrice(Number(e.target.value));
  const handleMaxChange = (e) => setMaxPrice(Number(e.target.value));

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Filter products between:", minPrice, maxPrice);
    e.preventDefault();
    const results = filterProductsByPrice(minPrice, maxPrice);
    setFilteredProducts(results);
    setVisibleProducts(results.slice(0, itemsPerPage));

  };







  const handleAddToCart = (e, product, variant = null) => {
    if (e) e.preventDefault();

    if (product.productType === 'variable') {
      if (!variant) {
        alert("Please select a size.");
        return;
      }
      const variantData = {
        size: variant.size,
        discountPrice: variant.discountPrice || variant.price,
      };

      addToCart(product, 1, variantData);
    } else {
      addToCart(product, 1);
    }
  };






  //  check subcategory




  const handleSubcategoryClick = (subcategoryName) => {

    navigate(`/product/${category}/${subcategoryName}`);
  };




  // Load more products
  const fetchMoreData = () => {
    const currentLength = visibleProducts.length;
    const nextProducts = filteredProducts.slice(
      currentLength,
      currentLength + itemsPerPage
    );

    setVisibleProducts((prev) => [...prev, ...nextProducts]);

    if (currentLength + itemsPerPage >= filteredProducts.length) {
      setHasMore(false);
    }




  };


  console.log('priduct', filteredProducts);

  return (
    <div className="product_section">
      <div className="top_banner for_desktop">

        {/* <CommonBanner />     */}
      </div>


      <div className="container">
        <div className="product_list">

          


          <div className="all_product_show">




            <InfiniteScroll
              dataLength={visibleProducts.length}
              next={fetchMoreData}
              hasMore={hasMore}
              loader={<h4 style={{ textAlign: 'center', paddingTop: '20px' }}> Loading .....</h4>}
              endMessage={<p ><b style={{ textAlign: 'center', margin: '0 auto', paddingTop: '20px' }}>Yay! You have seen it all</b></p>}
            >

              <div className="category_product">

                {filteredProducts.map(product => {
                  const isInWishlist = wishlistItems.some(item => item.id === product.id);

                  return (
                    <div key={product.id} className="product-card">

                      <div className="product-img-wrapper">
                        <Link to={`/product-details/${product._id}`}>
                          <img src={
                            product.thumbImg
                              ? `http://localhost:4000/uploads/thumbimg/${product.thumbImg}`
                              : "/placeholder.jpg"
                          } alt={product.name} className="img-main" />
                          <img src={
                            product.galleryImg
                              ? `http://localhost:4000/uploads/galleryimg/${product.galleryImg[0]}`
                              : "/placeholder.jpg"
                          } alt={product.name} className="img-hover" />
                        </Link>

                        {/* // add wish */}

                        <div
                          className={`favorite-icon ${isInWishlist ? 'filled' : ''}`}
                          onClick={() => {
                            if (!isInWishlist) addToWishlist(product);
                            toggleWishlist();
                          }}
                        >
                          {isInWishlist ? <FaHeart className="icon" /> : <FiHeart className="icon" />}
                        </div>



                      </div>

                      <h4 className="product-title">{product.name}</h4>

                      {/* <p className='product-categ'>{product.category}</p> */}

                      {product.productType === 'simple' ? (
                        <div className="product-pricing">
                          <span className='product-price'>₹{product.discountPrice}</span> &nbsp;
                          {product.discountPrice && (
                            <span className='discount-price'>₹{product.price}</span>
                          )}
                        </div>
                      ) : (
                        product.variant?.length > 0 && (
                          <div className="product-variants">
                            <div className="variant-item">
                              <span><strong>{product.variant[0].size}</strong></span>
                              <br />
                              <span className='product-price'> ₹{product.variant[0].discountPrice}</span> &nbsp;
                              {product.variant[0].price && (
                                <span className='discount-price'> ₹{product.variant[0].price}</span>
                              )}
                            </div>
                          </div>
                        )
                      )}

                      <div className="product-rating">
                        <IoStar /> <IoStar /> <IoStar /> <IoStar /> <IoStarHalfOutline />
                      </div>



                      {/* <button className="add-to-cart-btn" onClick={(e) => handleAddToCart(e, product)}>Add to Cart</button> */}




                      <div className="product-overlay">


                        {product.productType === 'variable' && showSizeOptions[product.id] && (
                          <div className="size-slide-in">
                            <div className="size-slide-header">
                              <h3>Select Size</h3>
                              <span className="close-icon" onClick={() =>
                                setShowSizeOptions(prev => ({ ...prev, [product.id]: false }))
                              }>
                                &times;
                              </span>
                            </div>
                            <div className="size-selection">
                              {product.variant.map((v, i) => (
                                <button
                                  key={i}
                                  className={`size-btn ${selectedSizes[product.id]?.size === v.size ? 'active' : ''}`}
                                  onClick={() => {
                                    setSelectedSizes(prev => ({
                                      ...prev,
                                      [product.id]: v,
                                    }));
                                  }}
                                >
                                  {v.size} - ₹{v.discountPrice || v.price}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Fixed Add to Cart or Select Size Button */}

                        <div className="fixed-bottom-btn">

                          {product.productType === 'variable' ? (

                            <div>
                              <button
                                className="add-to-cart-btn"
                                onClick={() => {
                                  if (showSizeOptions[product.id]) {


                                    const selectedVariant = selectedSizes[product.id];
                                    if (selectedVariant) {
                                      handleAddToCart(null, product, selectedVariant);
                                      setShowSizeOptions(prev => ({ ...prev, [product.id]: false }));
                                      setSelectedSizes(prev => ({ ...prev, [product.id]: null }));
                                    } else {
                                      alert("Please select a size first.");
                                    }
                                  } else {
                                    // First open size selector
                                    setShowSizeOptions(prev => ({
                                      ...prev,
                                      [product.id]: true,
                                    }));
                                  }
                                }}
                              >

                                {showSizeOptions[product.id] ? (
                                  'Add to Cart'
                                ) : (
                                  <>
                                    Select Size &nbsp;<FaChevronDown size={15} />
                                  </>
                                )}
                              </button> </div>
                          ) : (
                            <button className="add-to-cart-btn" onClick={(e) => handleAddToCart(e, product)}>
                              Add to Cart
                            </button>
                          )}
                        </div>





                      </div>
                    </div>
                  );
                })}
              </div>

            </InfiniteScroll>






          </div>
        </div>



      </div>
    </div>
  )
}

export default ShopByConcerns