

import React from 'react'
import prakritisaLogo from '../assets/Image/logo/prakritisa-logo.png'
import '../assets/Css/Authform.css'
import { Link, useNavigate } from 'react-router-dom'
import FacebookLogin from 'react-facebook-login'

import { FaEyeSlash, FaEye } from 'react-icons/fa';

import img1 from '../assets/Image/banner/myaccount.jpg'

import { FaFacebook } from "react-icons/fa";
import { FaUserAlt } from "react-icons/fa";
import { useGoogleLogin } from '@react-oauth/google';
import { useContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { ShopContext } from '../Context/ShopContext';


const SignIn = () => {
    const { token, setToken } = useContext(ShopContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // 👁️ Separate state for show/hide password
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        const url = '/api/auth/register';
        const body = { email, mobile, password };

        try {
            const response = await fetch(`http://localhost:4000${url}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });
            const data = await response.json();
            console.log(data);
            if (response.ok) {
                setToken(data.token);
                localStorage.setItem('token', data.token);
                alert('Registration successful');
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };


    const googleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            try {
                const userInfo = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                    headers: {
                        Authorization: `Bearer ${tokenResponse.access_token}`,
                    },
                });

                const user = await userInfo.json();
                console.log('Google User Info:', user);

                // You can now use user.email / user.name / user.picture etc.
                // Send to your backend to handle login/register
                const response = await fetch('http://localhost:4000/api/auth/gogglelogin', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(user),
                });

                const data = await response.json();
                if (response.ok) {
                    setToken(data.token);
                    localStorage.setItem('token', data.token);
                    alert('Google login successful');
                } else {
                    alert(data.message);
                }
            } catch (err) {
                console.error('Google Login Error', err);
            }
        },
        onError: (error) => {
            console.log('Login Failed:', error);
        },
    });



    // ✅ Facebook login
    const handleFacebookResponse = async (response) => {
        const { email, name, picture } = response;

        try {
            const res = await fetch('http://localhost:4000/api/auth/facebooklogin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, name, picture: picture.data.url }),
            });

            const data = await res.json();
            if (res.ok) {
                setToken(data.token);
                localStorage.setItem('token', data.token);
                alert('Facebook login successful');
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error('Facebook login error', error);
        }
    };


    useEffect(() => {
        if (token) {
            navigate('/login');
        }
    }, [token, navigate]);
    return (
        <div className='signin_Cont'>
            <div className="signin_cont_left">
                <div className="signin_inner_cont">
                    <div>
                        <Link to='/'> <img src={prakritisaLogo} alt="logo" width='110px' /></Link>
                    </div>
                    <div className="signin_title">
                        Fill Out the form to register
                    </div>

                    <form onSubmit={handleSubmit}   >

                        <div className="form_group w-100">
                            <input value={email}
                                onChange={(e) => setEmail(e.target.value.toLowerCase())} type="email" className="form_control" placeholder='Email ' required />
                        </div>
                        <div className="form_group w-100">
                            <input value={mobile}
                                onChange={(e) => setMobile(e.target.value)} type="number" className="form_control" placeholder='Contact' required />
                        </div>
                        <div className="form_group w-100 password-group">
                            <input value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type={showPassword ? 'text' : 'password'} className="form_control" required placeholder='Create Password' />
                            <span
                                onClick={() => setShowPassword(!showPassword)}
                                className="password-toggle"
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                        <div className="form_group w-100 password-group">
                            <input value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                type={showConfirmPassword ? 'text' : 'password'} className="form_control confirm_password " placeholder='Confirm Password' required />
                            <span
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="password-toggle"
                            >
                                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>

                        <button> <FaUserAlt /> &nbsp; SignUp </button>



                    </form>

                    <div className='dashed_line'>
                        Or
                    </div>
                    <div className='navigate_link'>
                        Already a member ?
                        <Link to='/login'> Login</Link>
                    </div>

                    <div className='other_login'>

                        <button onClick={() => googleLogin()}>
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="22" height="25" viewBox="0 0 48 48">
                                <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                            </svg> &nbsp;Google </button>
                        <button> <FacebookLogin
                            appId="1379730216499477"
                            autoLoad={false}
                            fields="name,email,picture"
                            callback={handleFacebookResponse}
                            cssClass="facebook_login"
                            textButton="&nbsp;&nbsp; Facebook"
                            icon={<FaFacebook size={20} style={{ color: '#105da1' }} />}
                        /></button>
                    </div>


                </div>



            </div>
            <div className="signin_cont_right">

                <img src={img1} alt="img" />

            </div>



        </div>
    )
}

export default SignIn