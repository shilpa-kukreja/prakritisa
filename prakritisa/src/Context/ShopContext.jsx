import React, { createContext, useState,useEffect} from 'react';
import { products, category, subcategory ,shopbyconcern} from '../assets/assets';
import axios from "axios";



 import {blog}  from '../assets/blog'
 
export const ShopContext = createContext();
const ShopContextProvider = (props) => {


  const [category,setCategory]=useState([]);
  const [subcategory,setSubcategory]=useState([]);
  const [shopbyconcern,setShopbyconcern]=useState([])
  const [products,setProducts]=useState([])
  const [blog,setBlog]=useState([])
  const [loginnavigate, setLoginnavigate] = useState('/');


  const fetchCategories=async()=>{
    try {
        const response=await axios.get("https://prakritisa.com/api/category/list");
        if (response.data.success) {
            // console.log(response.data);
             setCategory(response.data.categorys)
        }
    } catch (error) {
      console.error("Error fetching categories:", err);
    }
  }

  useEffect(()=>{
           fetchCategories();
  },[])



  const fetchSubCategories=async()=>{
          try {
             const response=await axios.get("https://prakritisa.com/api/subcategory/get")
             if (response.data.success) {
                  // console.log(response.data)
                  setSubcategory(response.data.subcategorys)
             }
          } catch (error) {
            console.error("Error fetching SubCategories:", err);
          }
  }

  useEffect(()=>{
      fetchSubCategories();
  },[])



  const fetchConcerns=async()=>{
        try {
          const response=await axios.get("https://prakritisa.com/api/shop/list");
             if (response.data.success) {
                // console.log(response.data);
                setShopbyconcern(response.data.shops);
             }
        } catch (error) {
          console.error("Error fetching ShopConcerns:", err);
        }
  }

  const fetchProducts=async()=>{
    try {
       const response=await axios.get("https://prakritisa.com/api/product/list");
       if (response.data.success) {
        // console.log(response.data)
        setProducts(response.data.products)
        }
    } catch (error) {
      console.error("Error fetching Products:", err);  
    }
  }

  useEffect(()=>{
     fetchProducts();
  },[])

  useEffect(()=>{
    fetchConcerns();
  },[])


  const fetchblogs=async()=>{
     try {
      const response=await axios.get("https://prakritisa.com/api/blog/bloglist")
       if (response.data.success) {
          // console.log(response.data);
          setBlog(response.data.blogs)
       }
     } catch (error) {
      console.error("Error fetching Products:", err); 
     }
  }

  useEffect(()=>{
    fetchblogs()
  },[])
  
  
  // console.log(category);
  const subcategories = subcategory;
  const categories = category;
  
 
  



  // Cart state
  // const [cartItems, setCartItems] = useState([]);
  // const [wishlistItems, setWishlistItems] = useState([]);


  
  // Load from localStorage initially
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cartItems');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [wishlistItems, setWishlistItems] = useState(() => {
    const savedWishlist = localStorage.getItem('wishlistItems');
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  const [token, setToken] = useState("");
  const [showCart, setShowCart] = useState(false);
  // Add at the top with other useState
const [showWishlist, setShowWishlist] = useState(false);

  





  // Save to localStorage when cart changes
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);


  // Save to localStorage when wishlist changes
  useEffect(() => {
    localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));
  }, [wishlistItems]);







  const toggleCart = () => setShowCart(prev => !prev);


  const addToCart = (product, quantity = 1, selectedVariant = null) => {
    if (product.productType === 'variable' && !selectedVariant) {
      // alert('Please select a size');
      return;
    }

    const variantKey = selectedVariant?.size || null;
    const image =
      product.thumbImg
        ? `https://prakritisa.com/uploads/thumbImg/${product.thumbImg}`
        : product.image
          ? `https://prakritisa.com/uploads/${product.image}`
          : "/placeholder.jpg";


  
    const price = Number(
      selectedVariant?.discountPrice || 
      product.discountPrice
    );
     console.log(image);

    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex(
        (item) => item.id === product._id && item.variant === variantKey
      );

      if (existingIndex >= 0) {
        const updated = [...prevItems];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [
          ...prevItems,
          {
            id: product._id,
            name: product.name,
            price,
            productType: product.productType,
            variant: variantKey,
            quantity,
            image,
          },
        ];
      }
    });

    setShowCart(true);
  };

  const increaseQuantity = (productId, variant = null) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId && item.variant === variant
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (productId, variant = null) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId && item.variant === variant
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item
      )
    );
  };

  const removeItem = (targetItem) => {
    setCartItems((prevItems) =>
      prevItems.filter(
        (item) =>
          !(item.id === targetItem.id && item.variant === targetItem.variant)
      )
    );
  };

   // Search products
   const searchProducts = (query) => {
    if (!query) return products;
    return products.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
  };

  // Filter products by price range
  const filterProductsByPrice = (min, max) => {
    return products.filter((product) => {
      const price =
        product.productType === 'variable'
          ? product.variant?.[0]?.discountPrice || product.variant?.[0]?.price
          : product.discountPrice || product.price;

      return price >= min && price <= max;
    });
  };


// wishlist product  
const addToWishlist = (product) => {
  if (!wishlistItems.some(item => item.id === product.id)) {
    setWishlistItems(prev => [...prev, product]);
  }
};

const toggleWishlist = () => {
  setShowWishlist(prev => !prev);
};

// Remove from wishlist
const removeFromWishlist = (productId) => {
  setWishlistItems((prevWishlistItems) => 
    prevWishlistItems.filter(item => item.id !== productId)
  );
};



useEffect(() => {
  if (!token && localStorage.getItem("token")) {
    setToken(localStorage.getItem("token")); 
  }
}, []);



  
  const removeCart = () => setShowCart(false); 


  const value = {
    products,
    categories,
    subcategories,
    shopbyconcern,
    cartItems,
    token,
    setToken,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeCart,
    showCart,
    setShowCart,
    removeItem,
    toggleCart,
    blog ,
    searchProducts,
    filterProductsByPrice,
    wishlistItems,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    showWishlist,
    setCartItems,
    loginnavigate,
    setLoginnavigate,
    
  
  };

  return ( 
     
    <ShopContext.Provider value={value}>
            {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
