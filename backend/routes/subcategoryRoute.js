import express from 'express'
import { addSubcategory, listSubcategory, removeSubcategory, updateSubcategory } from '../controllers/subcategoryController.js';
import upload from '../middleware/multer.js';


const subcategoryRouter=express.Router()

subcategoryRouter.post('/add',upload.single("image"),addSubcategory);
subcategoryRouter.get('/get',listSubcategory);
subcategoryRouter.post('/remove',removeSubcategory);
subcategoryRouter.put('/:id',upload.single("image"),updateSubcategory)


export default subcategoryRouter;