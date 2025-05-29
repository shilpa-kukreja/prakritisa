import {v2 as cloudinary} from 'cloudinary'
import shopModel from '../models/shopModel.js';
import fs from 'fs';
import path from 'path';

const addshop=async(req,res)=>{
              try {
                const {name,slug}=req.body;
                const imageFile=req.file;
                if (!imageFile) {
                   return res.status(400).json({success:false,message:"Image file is required"})
                }
                
                const shopData={
                    name,
                    slug,
                    image: {
                  url: `/uploads/${imageFile.filename}`,
                  originalname: imageFile.originalname,
               },
                }

                const shop=new shopModel(shopData);
                await shop.save();
                res.status(200).json({success:true,message:"Shop Consern Added"})
              } catch (error) {
                res.json({success:false})
                console.log(error)
              }
}


const listShop=async(req,res)=>{
    try {
      const allShop=await shopModel.find({})
      res.json({success:true,shops:allShop})
    } catch (error) {
        res.json({success:false})
        console.log(error)
    }
  }


  const removeShop=async(req,res)=>{
    try {
       const Shop = await shopModel.findById(req.body.id);
          if (!Shop) {
            return res.status(404).json({ success: false, message: "Shop not found" });
          }
      
          // Delete image file from server
          if (Shop.image?.url) {
            const filePath = path.join('uploads', path.basename(Shop.image.url));
            if (fs.existsSync(filePath)) {
              fs.unlinkSync(filePath);
            }
          }
         await shopModel.findByIdAndDelete(req.body.id);
         res.json({success:true,message:"Shop Removed"});
    } catch (error) {
      res.json({success:false})
      console.log(error)
    }
  }



  const updateShop = async (req, res) => {
    try {
      const { name, slug } = req.body;
      const imageFile = req.file;
  
      // Find existing shop
      const existingShop = await shopModel.findById(req.params.id);
      if (!existingShop) return res.status(404).json({ message: "Shop not found" });
  
      let imageUrl = existingShop.image;
  
      // If new image is uploaded, update it
      if (imageFile) {
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
          resource_type: "image",
        });
        imageUrl = imageUpload.secure_url;
      }
  
      const shopData = {
        name,
        slug,
        image: imageUrl,
      };
  
      const updatedShop = await shopModel.findByIdAndUpdate(req.params.id, shopData, {
        new: true,
      });
  
      res.json(updatedShop);
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  };
  

  export {addshop,listShop,removeShop,updateShop};