import {v2 as cloudinary} from 'cloudinary'
import subcategoryModel from '../models/subcategoryModel.js';

const addSubcategory=async(req,res)=>{
      try {
        const {name,slug,category}=req.body;
        const imageFile = req.file; 
        if (!imageFile) {
            return res.status(400).json({ success: false, message: "Image file is required" });
        }
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
        const subcategoryData = {
            name,
            slug,
            category,
            image: imageUpload.secure_url,
        };
        const subcategory = new subcategoryModel(subcategoryData);
        await subcategory.save();
        res.status(200).json({ success: true, message: "SubCategory Added" });
      } catch (error) {
        res.json({success:false})
        console.log(error)
      }
}



const listSubcategory=async(req,res)=>{
  try {
    const allSubcategory=await subcategoryModel.find({})
    res.json({success:true,subcategorys:allSubcategory})
  } catch (error) {
      res.json({success:false})
      console.log(error)
  }
}


const removeSubcategory=async(req,res)=>{
  try {
       await subcategoryModel.findByIdAndDelete(req.body.id);
       res.json({success:true,message:"SubCategory Removed"});
  } catch (error) {
    res.json({success:false})
    console.log(error)
  }
}


const updateSubcategory=async(req,res)=>{
  try {
    const {name,slug,category}=req.body;
        const imageFile = req.file; 
        if (!imageFile) {
            return res.status(400).json({ success: false, message: "Image file is required" });
        }
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
        const subcategoryData = {
            name,
            slug,
            category,
            image: imageUpload.secure_url,
        };
       const updateSubcategory=await subcategoryModel.findByIdAndUpdate(req.params.id,subcategoryData,{ new: true });
        if (!updateSubcategory) return res.status(404).json({ message: "SubCategory not found" });
        res.json(updateSubcategory);
  } catch (error) {
    res.json({success:false})
    console.log(error)
  }
}




export {addSubcategory,listSubcategory,removeSubcategory,updateSubcategory}