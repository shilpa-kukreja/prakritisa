import mongoose from 'mongoose'

const shopSchema=new mongoose.Schema({
    name:{type:String,required:true},
    slug:{type:String,required:true},
    image: {
                url: String,
                originalname: String,
        },
})

const shopModel=mongoose.models.shop || mongoose.model("shop",shopSchema);
export default shopModel;