
import React from 'react'
import '../assets/Css/Blog.css';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { ShopContext } from '../Context/ShopContext';
import { LuUserRound } from "react-icons/lu";
import { IoSearchOutline } from "react-icons/io5";
import { CgCalendarDates } from "react-icons/cg";

const BlogPage = () => {
    const { blog } = useContext(ShopContext)
    const { id } = useParams()
    const relatedBlogs = blog.filter(item => item.slug !== id);
    console.log(blog)


    return (
        <div className='blogpage_section'>
            <div className="container">

                <div class="page_header">
                    <div class="breadcrumbs">
                        <ul>
                            <li><Link to='/'>Home</Link></li>/&nbsp;
                            <li><a href="#">Blogs</a></li>
                        </ul>
                    </div>
                </div>


                {/*  all blogs show  */}

                <div className="blog_detail_wrapper">
                    <div className="blog_detail_img">

                        <div className="blog_slide ">

                            {blog.map((blogItem, id) => (

                                <div key={id} className="blog_item">

                                    <div className="blog_image_wrapper">

                                        <img src={`${import.meta.env.VITE_BACKEND_URL}${blogItem.blogImg.url}`} alt={blogItem.blogName} className="blog_image" />


                                    </div>

                                    <div className="blog_content">
                                        <p className="blog_date">{new Date(blogItem.blogDate).toISOString().split("T")[0]}</p>

                                        <p className='blog_soapName'> <LuUserRound /> &nbsp;Admin</p>
                                        <h3 className="blog_name">{blogItem.blogName}</h3>

                                        <Link to={`/blog-details/${blogItem.slug}`} className="read_more"> Read More </Link>
                                    </div>


                                </div>
                            ))}
                        </div>



                    </div>
                   

                </div>







            </div>
        </div>
    )
}

export default BlogPage