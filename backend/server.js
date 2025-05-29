import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/db.js';
import categoryRouter from './routes/categoryRoute.js';
import connectCloudinary from './config/cloudinary.js';
import subcategoryRouter from './routes/subcategoryRoute.js';
import productRouter from './routes/productRoute.js';
import authRouter from './routes/authRoute.js';
import shopRouter from './routes/shopRoute.js';
import couponRouter from './routes/couponRoute.js';
import orderRouter from './routes/orderRoute.js';
import contactRouter from './routes/contactRoute.js';
import adminRouter from './routes/adminRoute.js';
import blogRouter from './routes/blogRoute.js';
import path from 'path';
import { fileURLToPath } from 'url';


const app=express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



connectDB();
connectCloudinary();



app.use('/api/category',categoryRouter);
app.use('/api/subcategory',subcategoryRouter)
app.use('/api/product',productRouter)
app.use('/api/auth',authRouter)
app.use('/api/shop',shopRouter)
app.use('/api/coupon',couponRouter)
app.use('/api/order',orderRouter)
app.use('/api/contact',contactRouter)
app.use('/api/admin',adminRouter);
app.use('/api/blog',blogRouter);




const PORT=process.env.PORT || 4000;

app.get('/',(req,res)=>{
    res.send('Api Working');
})

app.listen(PORT,()=>{
    console.log(`Server Running On Port ${PORT}`)
});



