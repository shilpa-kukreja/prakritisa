import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaEyeSlash, FaEye, FaFacebook } from 'react-icons/fa'
import { useGoogleLogin } from '@react-oauth/google'
import FacebookLogin from 'react-facebook-login'
import prakritisaLogo from '../assets/Image/logo/prakritisa-logo.png'
import img1 from '../assets/Image/banner/myaccount.jpg'
import '../assets/Css/Authform.css'
import { ShopContext } from '../Context/ShopContext'
import axios from 'axios'

const LogIn = () => {
    const { token, setToken ,loginnavigate,setLoginnavigate} = useContext(ShopContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [forgotMode, setForgotMode] = useState(false); // ✅

    useEffect(() => {
        if (token) {
            navigate(loginnavigate);
        }
    }, [token, navigate]);


const handleLoginSuccess = () => {
  
  const fromCart = location.state?.from === 'cart';
  const intendedPath = location.state?.intendedPath;
  
  if (fromCart && intendedPath) {
    
    navigate(intendedPath, { replace: true, state: {} });
  } else {
   
    navigate(loginnavigate, { replace: true });
  }
};

    // ✅ Normal login submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = '/api/auth/login';
        const body = { email, password, rememberMe };

        try {
            const response = await fetch(`http://localhost:4000${url}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });

            const data = await response.json();
            if (response.ok) {
                setToken(data.token);
                localStorage.setItem('token', data.token);
                alert('Login successful');
                 handleLoginSuccess(); 
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    // ✅ Forgot password handler
    const handleForgotPassword = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:4000/api/auth/forgot-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });
            const data = await res.json();
            if (res.ok) {
                alert('Password reset link sent to your email.');
                setForgotMode(false);
            } else {
                alert(data.message || 'Failed to send reset email.');
            }
        } catch (error) {
            console.error('Forgot password error:', error);
        }
    };

    // ✅ Google login
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
                     handleLoginSuccess();
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

//Guest Login

const handleGuestLogin = async () => {
    try {
      const res = await axios.post('http://localhost:4000/api/auth/guest');
      const { token, user } = res.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      handleLoginSuccess();
    } catch (err) {
      alert('Guest login failed');
      console.error(err);
    }
  };

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
                handleLoginSuccess();
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error('Facebook login error', error);
        }
    };

    return (
        <div className='signin_Cont'>
            <div className="signin_cont_left">
                <div className="signin_inner_cont">
                    <Link to='/'>
                        <img src={prakritisaLogo} alt="logo" width='110px' />
                    </Link>
                    <div className="login_title">Welcome Back</div>
                    <div className="login_subtitle">
                        {forgotMode ? "Reset your password" : "Login to your account"}
                    </div>

                    <form onSubmit={forgotMode ? handleForgotPassword : handleSubmit}>
                        <div className="form_group w-100">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value.toLowerCase())}
                                className="form_control"
                                placeholder='Email'
                                required
                            />
                        </div>

                        {!forgotMode && (
                            <>
                                <div className="form_group w-100 password-group">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="form_control"
                                        placeholder='Password'
                                        required
                                    />
                                    <span onClick={() => setShowPassword(!showPassword)} className="password-toggle">
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </span>
                                </div>

                                <div className='flex-forgot flex-row justify-between items-center mt-4'>
                                    <label className='flex items-center text-gray-600'>
                                        <input
                                            type='checkbox'
                                            className='mr-2'
                                            checked={rememberMe}
                                            onChange={(e) => setRememberMe(e.target.checked)}
                                        />
                                        Remember Me
                                    </label>
                                    <div className='text-blue-500 text-sm cursor-pointer' onClick={() => setForgotMode(true)}>
                                        Forgot Password?
                                    </div>
                                </div>
                            </>
                        )}

                        <button type="submit" className='mt-4'>
                            {forgotMode ? 'Send Reset Link' : 'Login'}
                        </button>
                        <button  onClick={handleGuestLogin} type="button" className='mt-4'>
                            Continue as Guest
                        </button>
                    </form>

                    {!forgotMode && (
                        <>
                            <div className='dashed_line'>Or</div>
                            <div className='other_login'>
                            <button onClick={() => googleLogin()}>
                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="22" height="25" viewBox="0 0 48 48">
                                    <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                                </svg> &nbsp; Google 
                            </button>

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
                            <div className='navigate_link'>
                                Not a member? <Link to='/signin'>Register</Link>
                            </div>
                        </>
                    )}

                    {forgotMode && (
                        <div className="text-login text-gray-600  text-center cursor-pointer" onClick={() => setForgotMode(false)}>
                            Back to Login
                        </div>
                    )}
                </div>
            </div>

            <div className="signin_cont_right">
                <img src={img1} alt="img" />
            </div>
        </div>
    );
};

export default LogIn;
