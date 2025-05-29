import express from 'express'
import { addshop, listShop, removeShop, updateShop } from '../controllers/shopController.js';
import upload from '../middleware/multer.js';


const shopRouter=express.Router();

shopRouter.post('/add',upload.single("image"),addshop)
shopRouter.get('/list',listShop)
shopRouter.post('/remove',removeShop);
shopRouter.put('/:id',upload.single("image"),updateShop);

export default shopRouter;