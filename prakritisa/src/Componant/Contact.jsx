import React from 'react'
import CommonBanner from './CommonBanner'
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import { toast } from 'react-toastify';
import '../assets/Css/Contact.css'
import { MdEmail } from "react-icons/md";
import { Link } from 'react-router-dom';

const Contact = () => {
  const [result, setResult] = React.useState("");
    
      const onSubmit = async (event) => {
        event.preventDefault();
        setResult("Sending...");
    
        const formData = new FormData(event.target);
        const data = {
          firstname: formData.get("FirstName"),
          lastname: formData.get("LastName"),
          email: formData.get("Email"),
          phonenumber: formData.get("PhoneNumber"),
          message: formData.get("Message")
        };
    
        try {
          const response = await fetch("http://localhost:4000/api/contact/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          });
    
          const result = await response.json();
          if (result.success) {
            setResult("");
            toast.success("Form Submitted Successfully");
            event.target.reset();
          } else {
            toast.error(result.message || "Submission Failed");
            setResult("");
          }
        } catch (error) {
          console.error("Error submitting form", error);
          toast.error("An error occurred while submitting the form");
          setResult("");
        }
      };
  return (
    <>
      <div className="contact_componant">
        <div className="top_banner for_desktop">

          <CommonBanner />
        </div>
        <div className="container">

          <div className="contact_form_details">

            <div className="form_wrapper">
              <span>INQUIRY FORM </span>
              <h2>Submit your Question </h2>


              <form onSubmit={onSubmit} action="" className='contact_form ' >

                <div className="form_group w-50">

                  <input name="FirstName" type="text" className="form_control" required placeholder='First Name *' />
                </div>

                <div className="form_group w-50">

                  <input name="LastName" type="text" className='form_control' required placeholder='Last Name *' />
                </div>

                <div className="form_group w-50">
                  <input  name="Email" type="email" className='form_control' required placeholder='Email Address *' />
                </div>
                <div className="form_group w-50">
                  <input name="PhoneNumber" type="number" className='form_control' required placeholder='Phone Number *' />
                </div>

                <div className='form_group w-100'>
                  <textarea name="Message" rows={10} id="" placeholder='Your Message*'></textarea>
                </div>

                <button type='submit'>

                  Submit Now
                </button>

                {result && <p className="text-center text-gray-600 mt-2">{result}</p>}



              </form>

            </div>

            <div className="address_info">

              <div className="personal_details">

                <div className="address   add-icon">
                  <h2> <FaMapMarkerAlt /> Address</h2>
                  <p className=''>
                        T3-1406,14 FLOOR,TOWER T3, ACE PARKWAY, SECTOR-150, Noida,  Gautam Buddha Nagar UTTAR PRADESH 201301
                  </p>
                </div>

                <div className="phone_detail add-icon">
                  <h2> <FaPhone /> Phone</h2>
                  <ul>
                    <li><Link to='tel:+91 9220807109'> +91 9220807109</Link></li>
                    {/* <li><Link to='tel:+91 0000000'> +91 9898989898</Link></li> */}
                  </ul>
                </div>

                <div className="email_detail add-icon ">
                  <h2><MdEmail /> Email</h2>
                  <ul>
                    <li><Link to='mailto:finance@prakritisa.com '>finance@prakritisa.com</Link></li>
                    {/* <li><Link to='mailto:'>@gmail.com</Link></li> */}
                  </ul>
                </div>







              </div>



            </div>

          </div>



        









        </div>


        
   {/*  map location  */}

{/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3503.8368599712635!2d77.37630757495467!3d28.574661186707328!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce527c8c099bb%3A0xbf9711b8bc3f91f8!2sRecreators%20Design%20and%20Media!5e0!3m2!1sen!2sin!4v1745384109956!5m2!1sen!2sin" width='100%' height="450px"  loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe> */}
</div>

    

    </>
  )
}

export default Contact