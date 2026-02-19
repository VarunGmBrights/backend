import { log } from "console";
import foodModel from "../models/foodModel.js";

import fs from 'fs'


//add food item


const addFood = async (req,res) => {

    if (!req.file) {
        return res.json({ success: false, message: "No file uploaded or wrong field name. Use field name 'image'" });
    }

    // For Vercel: Read file and convert to Base64 to store in DB
    const imageBuffer = req.file.buffer;
    const base64Image = imageBuffer.toString('base64');
    const imageMimeType = req.file.mimetype;
    const imageDataUrl = `data:${imageMimeType};base64,${base64Image}`;

    const food = new foodModel({
       name:req.body.name,
       description:req.body.description,
       price:req.body.price,
       category:req.body.category,
       image:imageDataUrl  // Store as Base64 data URL
    })
         try {
                await food.save();
                res.json({success:true,message:"Food Added"})
         } catch (error) {
           console.log(error)
           res.json({success:false,message:"Error"})
         }
   }


   // all food list 

   const listFood = async (req,res)=>{
        try {
                const foods = await foodModel.find({});
                res.json({success:true,data:foods})
        } catch (error) {
             console.log(error)
             res.json({success:false,message:"Error"})
        }
   }

   //remove food item

   const removeFood = async (req,res) => {
      try {
                await foodModel.findByIdAndDelete(req.body.id);
                res.json({success:true,message:"Food Removed"})
      } catch (error) {
          console.log(error);
          res.json({success:false,message:"Error"})

      }
   }


export {addFood,listFood,removeFood}
