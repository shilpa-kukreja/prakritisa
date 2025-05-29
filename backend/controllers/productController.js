import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import productModel from '../models/productModel.js';
import mongoose from "mongoose";
import path from "path";

// Add a product
const addProduct = async (req, res) => {
  try {
    const {
      name,
      slug,
      shortDescription,
      description,
      category,
      subcategory,
      shopconcern,
      sku,
      section,
      stock,
      productType,
      price,
      discountPrice,
      variant,
    } = req.body;

     const thumbImg = req.files['thumbImg']?.[0]?.filename;
     const galleryImg = req.files['galleryImg']?.map(file => file.filename);
    // Create product
    const newProduct = new productModel({
      name,
      slug,
      shortDescription,
      description,
      category,
      subcategory: JSON.parse(subcategory),
      shopconcern: JSON.parse(shopconcern),
      sku,
      section,
      stock,
      productType,
      price,
      discountPrice,
      variant: JSON.parse(variant),
      thumbImg,
      galleryImg,
    });
    console.log

    await newProduct.save();
    res.status(201).json({ success: true, message: 'Product added successfully' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error adding product' });
  }
};




// List all products
const listProducts = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.json({ success: true, products });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: 'Error fetching products' });
  }
};





// Remove a product
const removeProduct = async (req, res) => {
  try {
    const product = await productModel.findById(req.body.id);
    if (!product) return res.status(404).json({ error: "Product not found" });

    // Delete local image files
    const imagePaths = [product.thumbImg, ...product.galleryImg];
    imagePaths.forEach(img => {
      const filePath = path.join('uploads', img);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    });
    await productModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: 'Product removed successfully' });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: 'Error deleting product' });
  }
};
const updatelistproduct= async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: "Not found" });

    res.json({ success: true, product });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Update a product
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      slug,
      shortDescription,
      description,
      category,
      subcategory,
      shopconcern,
      sku,
      section,
      stock,
      productType,
      price,
      discountPrice,
      variant,
    } = req.body;

  
    const thumbImg = req.files['thumbImg']?.[0]?.filename;
    const galleryImg = req.files['galleryImg']?.map(file => file.filename);
    // Create product
    const newProduct = {
      name,
      slug,
      shortDescription,
      description,
      category,
      subcategory: JSON.parse(subcategory),
      shopconcern: JSON.parse(shopconcern),
      sku,
      section,
      stock,
      productType,
      price,
      discountPrice,
      variant: JSON.parse(variant),
      thumbImg,
      galleryImg,
    };
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid product ID." });
    }
    console.log(newProduct);
    const updated = await productModel.findOneAndUpdate({_id : id}, newProduct, { new: true });
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, message: 'Product updated', product: updated });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: 'Error updating product' });
  }
};

export { addProduct, listProducts, removeProduct, updateProduct ,updatelistproduct};
