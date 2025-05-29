import categoryModel from "../models/categoryModel.js";

const addCategory=async(req,res)=>{
    try {
        const {name,slug}=req.body;
        console.log(req.body)
        const categoryData={
            name,slug
        }

    const cateogory=categoryModel(categoryData);
    await cateogory.save();
    res.json({success:true,message:"Category Added"})
    } catch (error) {
        res.json({success:false})
        console.log(error)
    }
}


const listCategory=async(req,res)=>{
    try {
        const allCategory=await categoryModel.find({});
        res.json({success:true,categorys:allCategory})
    } catch (error) {
        res.json({success:false})
        console.log(error)
    }
}


const removeCategory=async(req,res)=>{
    try {
        await categoryModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"Category Removed"})
    } catch (error) {
        res.json({success:false})
        console.log(error) 
    }
}


const updateCategory=async(req,res)=>{
    try {
        const updateCategory=await categoryModel.findByIdAndUpdate(req.params.id,req.body,{ new: true });
        if (!updateCategory) return res.status(404).json({ message: "Category not found" });
        res.json(updateCategory);
    } catch (error) {
        res.json({success:false})
        console.log(error)
    }
}

export {addCategory,listCategory,removeCategory,updateCategory}