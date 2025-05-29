import jwt from 'jsonwebtoken';
import userModel from '../models/authModel.js';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import sendEmail from '../utils/sendEmail.js';
import { error } from 'console';



//user register code
export const registerUser=async(req,res)=>{
    const {email,mobile,password}=req.body;
    try {
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
          }
          const hashedPassword = await bcrypt.hash(password, 10);
          const newUser=new userModel({
            email,
            mobile,
            password : hashedPassword,
            provider: 'local',
          })

          await newUser.save();
          const token=jwt.sign({id:newUser._id},process.env.JWT_SECRET,{
            expiresIn: '7d',
          });
          res.status(201).json({token,user:newUser})

    } catch (error) {
        console.log(error)
         res.status(500).json({ message: 'Something went wrong' });
    }
}


//user login code

export const loginUser = async (req, res) => {
    const { email, password } = req.body; 
    try {
        
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" }); 
        }

        
        const isMatch = await bcrypt.compare(password, user.password); 
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        if (user.provider !== 'local') {
            user.provider = 'local';
            await user.save();
          }

      
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '7d',
        });

        res.status(200).json({ token, user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

//api gogglelogin

export const GoggleloginUser=async(req,res)=>{
    const {email,name,picture}=req.body
    try {
        let user=await userModel.findOne({email})
        if (!user) {
            user = await userModel.create({
              email,
              name,
              avatar: picture,
              password: '',
              provider: 'google',
            });
          } else {
            // update provider if necessary
            if (user.provider !== 'google') {
              user.provider = 'google';
              await user.save();
            }
          }

    const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{
        expiresIn: '7d',
    })

    res.json({token})
    } catch (error) {
        console.error(err);
        res.status(500).json({ message: 'Something went wrong' }); 
    }
}

//Guest Login api

export const guestLoginUser= async (req, res) => {
  try {
    
    const guestUser = new userModel({
      name: 'Guest User',
      email: `guest_${Date.now()}@guest.com`,
      mobile: `0000000000`,
      isGuest: true,
    });
    await guestUser.save();

    // Generate token
    const token = jwt.sign(
      { id: guestUser._id, isGuest: true },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(200).json({ token, user: guestUser });
  } catch (err) {
    console.error(error)
    res.status(500).json({ message: 'Guest login failed', error: err.message });
  }
};


//Facebook Login api

export const facebookLoginUser = async (req, res) => {
    const { email, name, picture } = req.body; 

    try {
        let user = await userModel.findOne({ email });

        if (!user) {
            user = await userModel.create({
              email,
              name,
              avatar: picture,
              password: '',
              provider: 'facebook',
            });
          } else {
            // update provider if necessary
            if (user.provider !== 'facebook') {
              user.provider = 'facebook';
              await user.save();
            }
          }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.status(200).json({ token, user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};


//api forgot password

export const forgotPassword=async(req,res)=>{
     const {email} =req.body;
     console.log(email)

     try {
        const user=await userModel.findOne({email});
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
          }

          const resetToken = crypto.randomBytes(20).toString('hex');
          user.resetPasswordToken = resetToken;
          user.resetPasswordExpire = Date.now() + 3600000; // 1 hour
      
          await user.save();

          const resetUrl = `http://localhost:5174/reset-password/${resetToken}`;
          const message = `You are receiving this email because you (or someone else) has requested a password reset. Please click the link to reset your password: \n\n ${resetUrl}`;

          await sendEmail({
            email: user.email,
            subject: 'Password Reset Request',
            message,
          });
         res.status(201).json({message:"Email Sent"}) 

     } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Something went wrong' });
     }
}


//api for reset password

export const resetPassword=async(req,res)=>{
    const {token}=req.params;
    const {password}=req.body;
    try {
        const user = await userModel.findOne({
            resetPasswordToken: token,
            resetPasswordExpire: { $gt: Date.now() },
          }); 
          if (!user) {
            return res.status(400).json({ message: 'Invalid or expired token' });
          }

          user.password = await bcrypt.hash(password, 10);
          user.resetPasswordToken = undefined;
          user.resetPasswordExpire = undefined;
      
          await user.save();

        res.status(200).json({ message: 'Password reset successful' });
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Something Went Wrong"})
    }
}

//Route for admin Login

export const adminLogin=async(req,res)=>{
    try {
       const {email,password} =req.body;
       if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
        const token=jwt.sign(email+password,process.env.JWT_SECRET)
        return res.status(200).json({success:true,token})
       }else{
        return res.status(401).json({success:false,message:"Invalid email or password"})
       }
    } catch (error) {
        console.error("Admin Login Error:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

const alluser=async(req,res)=>{
  try {
    const Users=await userModel.find({}).select('-password');
    res.json({success:true,Users})
  } catch (error) {
    console.log(error)
    res.json({success:false,message:error.message})
  }
}


const deleteUser=async(req,res)=>{
  try {
    await  userModel.findByIdAndDelete(req.body.id)
    res.status(200).json({success:true,message:"User Removed"})
  } catch (error) {
    console.log(error)
    res.json({success:false,message:error.message})
  }
}

export {alluser,deleteUser}