

import Header from './Componant/Header';

import CouponNavbar from './Pages/CouponNavbar';
import Footer from './Componant/Footer';
import Contact from './Componant/Contact';
import About from './Componant/About';
import Home from './Componant/Home';
import ProductDetail from './Componant/ProductDetail';
import Cart from './Pages/Cart';
import { Route, Routes, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react'
import Product from './Componant/Product';
import Error from './Componant/Error'
import Checkout from './Componant/CheckOut';
import Blog from './Componant/Blog';
import SignIn from './Componant/SignIn'
import BlogDetail from './Pages/BlogDetail'
import LogIn from './Componant/LogIn';
import Wishlist from './Pages/Wishlist';
import CategorySlider from './Pages/CategorySlider';
import PrivacyPolicy from './Componant/PrivacyPolicy';
import TermsCondition from './Componant/TermsCondition';
import ShippingPolicy from './Componant/ShippingPolicy';
import ReturnRefundPolicy from './Componant/ReturnRefundPolicy';
import BlogPage from './Componant/BlogPage';


// import Bg from '../src/assets/Image/BG.jpg'
import Bg from '../src/assets/Image/BG-1.jpg'
import ResetPassword from './Pages/ResetPassword';
import Orders from './Pages/Orders';
import UserOrders from './Pages/UserOrders';
import ScrollToTop from './Componant/ScrollToTop';
import ShopByConcerns from './Pages/ShopByConcerns';

const App = () => {

  const location = useLocation();

  const hideHeaderFooter = location.pathname === '/cart';
  const removeHeaderFooter = location.pathname === '/signin'
  const loginremoveheader = location.pathname === '/login'

  return (

    <>
      <div className="" style={{
        backgroundImage: `url(${Bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment:'fixed',
        width: '100%',
      }}>


         <ToastContainer/>

        <ScrollToTop/>



        {!hideHeaderFooter  && < Header />}


        <Routes>


          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />

          <Route path="/concern/:slug" element={<ShopByConcerns />} />
          <Route path="/product/:category" element={<Product />} />
          <Route path="/product/:category/:subcategory" element={<Product />} />


          <Route path="/product/search" element={<Product />} />

          <Route path='/product-details/:id' element={<ProductDetail />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/all-blogs' element={<BlogPage/>} />
          <Route path='/blog' element={<Blog />} />
          <Route path='/blog-details/:id' element={<BlogDetail />} />
          <Route path="/reset-password/:token" element={<ResetPassword/>} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/login' element={<LogIn />} />
          <Route path='/privacy-policy' element={<PrivacyPolicy />} />
          <Route path='/terms-and-condition-policy' element={<TermsCondition />} />
          <Route path='/shipping-policy' element={<ShippingPolicy />} />
          <Route path='/return-and-refund-policy' element={<ReturnRefundPolicy />} />
          <Route path='/orders/:id' element={<Orders />} />
          <Route path='/orders' element={<UserOrders />} />



          <Route path='*' element={<Error />} />


        </Routes>

        < Cart />
        < Wishlist />

        {!hideHeaderFooter && !removeHeaderFooter && !loginremoveheader && <Footer />}


      </div>



    </>



  )
}

export default App;