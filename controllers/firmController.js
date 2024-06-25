const Firm=require("../models/Firm")
const Vendor=require("../models/Vendor")
const multer=require('multer')
const path=require('path')


//iamge
const storage = multer.diskStorage({
    destination:function(req,file,cb){
       cb(null,'uploads/') 
    },
    filename:function (req, file, cb){
      cb(null,  Date.now() + path.extname(file.originalname) );
    }
  });
   
  const upload=multer({storage:storage})
 
 
 
 const addFirm=async(req,resp)=>{
    try{
    const {firmName,area,category,region,offer}=req.body
   
    const image=req.file? req.file.filename:undefined
    
    const vendor=await Vendor.findById(req.vendorId)
     
     if( !vendor){
        resp.status(404).json({message:"vendor not found"})
     }

   // new
   if(vendor.firm.length > 0){
      return resp.status(400).json({message:"vendor can have only one firm"})
   }
  

          const firm=new Firm({
         firmName,area,category,region,offer,image,vendor:vendor._id
     })

     const savedFirm=await firm.save()
      const firmId=savedFirm._id
      
      
      vendor.firm.push(savedFirm)
      await  vendor.save()
     
   
      return resp.status(200).json({message:"Firm Added succeffully",firmId})
  }
  catch(error){
     console.error(error)
     resp.status(500).json("internal server")
  }
 }



//   deletfirmcontorell
 const delteFirmById=async(req,resp)=>{
   try{
      const firmId=req.params.firmId;
      const deletedFirm=await Firm.findByIdAndDelete(firmId)
    
   if(!deletedFirm){
      return resp.status(404).json({error:'No firm found'})
   }
   
   }
    catch(error){
      console.error(error)
       resp.status(500).json({error:"Internal error"})
    }
 }



module.exports={addFirm:[upload.single("image"),addFirm],delteFirmById}