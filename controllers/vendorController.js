const  Vendor=require("../models/Vendor")
const jwt=require('jsonwebtoken')
const  bcrypt= require('bcrypt')
const dotEnv=require('dotenv');




dotEnv.config()
 const secretkey=process.env.WhatIsYourName


// vendor register

 const vendorRegister= async(req,resp)=>{
  const {username,email,password}=req.body
 try {
  const vendorEmail=await Vendor.findOne({email})
  if( vendorEmail){
    return resp.status(400).json("Email alredy taken")
  }
   const hasedPassword=await bcrypt.hash(password,10)

   const newVendor=new Vendor({
    username,email,
    password:hasedPassword
   })
    await  newVendor.save()
     resp.status(201).json({messge:"Vendor register sucessfully"})
 console.log("registered")
}
  catch(error){
     console.log(error)
 resp.status(500).json({error:"Internal server"})
  }
}

//Vendor login
const vendorLogin= async(req,resp)=>{
    const {email,password}=req.body;
    try{
       const vendor= await Vendor.findOne({email})
       if( !vendor || !(await bcrypt.compare(password,vendor.password))){
         return resp.status(401).json({error:"Invalid username or password"})
       }
      
      const token= jwt.sign({vendorId:vendor._id},secretkey,{expiresIn:"1h"})
    //  new
     const vendorId=vendor._id;
       resp.status(200).json({success:"Login successfull" ,token,vendorId})
     console.log(email,"this is token",token)  
    } 
    
    catch(error){
   console.log(error)
   resp.status(500).json({error:"internal server error"})
    }
   }
  

    // get all vendors

     const getAllvendors=async(req,resp)=>{
      try{
         const vendors=await Vendor.find().populate('firm')
       resp.json({vendors})
        }
        
        catch(error){
          console.log(error)
          resp.status(500).json({error:"internal server error"})
           }
     }



    //  get vendor by id
     const getvendorById=async(req,resp)=>{
      const vendorId=req.params.id;
      try{
         const vendor=await Vendor.findById(vendorId).populate('firm')
       if(!vendor){
          return resp.status(404).json({error:"Vendor not found"})
       }

      //  new

       const vendorFirmId=vendor.firm[0]._id
       resp.status(200).json({vendor,vendorFirmId})
      console.log(vendorFirmId)
        }

        catch(error){
          console.log(error)
          resp.status(500).json({error:"internal server error"})
           }

     }

 module.exports={vendorRegister,vendorLogin,getAllvendors,getvendorById}