
import React from 'react'
// import grainImg1 from '../assets/Image/grain-banner.jpg'
// import grainImg2 from '../assets/Image/grain-banner1.jpg'
// import video from '../assets/Image/video/video-1.mp4'
import video from '../assets/Image/video/video-2.mp4'

const GrainBanner = () => {
  return (
   <>
     <div className="">
         <div className="">
             
              <div className="">

                {/* <img src={grainImg2} alt="grain_banner" />
                <img src={grainImg2} alt="grain_banner" />  */}

                           <video src={video}  type="video/mp4" autoPlay muted  loop playsInline   style={{ width: '100%',  objectFit: 'cover', display: 'block', }}
                                  ></video>


              </div>
         </div>
     </div>
   
   </>
  )
}

export default GrainBanner