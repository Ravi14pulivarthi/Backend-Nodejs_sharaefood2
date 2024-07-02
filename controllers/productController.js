const Firm = require("../models/Firm");
const Product=require("../models/Product")
const multer =require("multer")
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

// addproduct

   const addProduct=async(req,resp)=>{
   try{
    const{productName,price,category,bestseller,description,image}=req.body
   //  const image=req.file? req.file.filename:undefined;
    
    
    const firmId= req.params.firmId;
    const firm=await Firm.findById(firmId)
if( !firm){
    return resp.status(404).json({error:"No firm found"})
}
 const product=new Product({
    productName,price,category,bestseller,description,image,firm:firm._id
 })
  const savedProduct =await product.save()
   
  firm.products.push(savedProduct);

  await firm.save()

   resp.status(200).json(savedProduct)
}
    
   catch(error){
      console.error(error)
       resp.status(500).json({error:"Internal error"})
    }

   }

   // getProductByFirm
   
    const getProductByFirm=async(req,resp)=>{
         try{
            const firmId=req.params.firmId
             const firm=await Firm.findById(firmId)
             if(!firm){
                return resp.status(404).json({error:"Nofirm Found"})
             }

             const  restaurantName=firm.firmName
              const products=await Product.find({firm:firmId})
         resp.status(200).json({restaurantName,products})
           
         
        
        }
            catch(error){
                console.error(error)
                 resp.status(500).json({error:"Internal error"})
              }

    }

   //   delteproduct
   const deletProductById=async(req,resp)=>{
    try{
      const productId=req.params.productId;
      const deletedProduct=await Product.findByIdAndDelete(productId)
    
   if(!deletedProduct){
      return resp.status(404).json({error:'No product found'})
   }
   
   }
    catch(error){
      console.error(error)
       resp.status(500).json({error:"Internal error"})
    }
   }



  
    module.exports={addProduct:[upload.single('image'),addProduct],getProductByFirm,deletProductById}