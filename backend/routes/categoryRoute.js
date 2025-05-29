import express from 'express'
import { addCategory, listCategory, removeCategory, updateCategory } from '../controllers/categoryController.js';



const categoryRouter=express.Router();
categoryRouter.post('/add',addCategory)
categoryRouter.get('/list',listCategory)
categoryRouter.post('/remove',removeCategory)
categoryRouter.put('/:id',updateCategory)


export default categoryRouter;