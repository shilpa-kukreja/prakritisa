import React, { useContext } from 'react';
import { ShopContext } from '../Context/ShopContext';
import '../assets/Css/Wishlist.css';
import { MdOutlineDeleteForever } from 'react-icons/md';
import { Link } from 'react-router-dom';


const Wishlist = () => {
    const { wishlistItems, showWishlist, toggleWishlist, removeFromWishlist, addToCart } = useContext(ShopContext);





    





    return (
        <div>
            {showWishlist && <div className="product_overlay" onClick={toggleWishlist}></div>}
            <div className={`wishlist_sidebar ${showWishlist ? 'active' : ''}`}>

                <div className="remove_icon">
                    <h2>My Wishlist</h2>
                    
                    <button className="removewishlist" onClick={toggleWishlist}>x</button>
                </div>

                {wishlistItems.length === 0 ? (
                    <div className="no_item_here">
                        <h4>Your Wishlist  is currently empty.</h4>
                        <p>
                            Explore our products and start adding items to your cart for a
                            delightful shopping experience!
                        </p>
                        <button ><Link to='/product/soap'>Continue Shopping</Link></button> 
                    </div>
                ) : (
                    wishlistItems.map(item => (
                        <div key={item.id} className="wishlist-item">
                            <img src={item.thumbImg} alt={item.name} />
                            <div>
                                <h4>{item.name}</h4>
                                <p>₹{item.price || item.variant?.[0]?.discountPrice}</p>


                                <div className='wishlist_cart_button '>
                                    <button className='cart_wishlist' onClick={() => addToCart(item)}>Add to Cart</button>
                                    {/* <button className='cart_wishlist' onClick={(e) => handleAddToCart(e,products)}>Add to Cart</button> */}


                                    <button className="removewishlist" onClick={() => removeFromWishlist(item.id)}> <MdOutlineDeleteForever size={20} /></button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Wishlist;