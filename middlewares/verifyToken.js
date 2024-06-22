const Vendor=require("../models/Vendor")

const jwt= require('jsonwebtoken')
const dotEnv=require("dotenv")


 dotEnv.config()
  const secretKey=process.env.WhatIsYourName

 const verifyToken=async(req,res,next)=>{
   const token= req.headers.token;
   if(!token){
       return res.status(401).json({error:"Token is require"})
   }
    try{
 const decodec=jwt.verify(token,secretKey)
 const vendor=await Vendor.findById(decodec.vendorId)
 
    if(!vendor){
   return res.status(404).json({error:"vendornot found"})
}
  req.vendorId=vendor._id

  next()
}
    catch(error){
console.log(error)
return res.status(500).json({error:"Invalied token"})
    }
 }

  module.exports=verifyToken