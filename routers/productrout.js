const express=require("express")

 const  productController=require("../controllers/productController")

 const router=express.Router()

  router.post("/add-product/:firmId",productController.addProduct);
  router.get("/:firmId/products",productController.getProductByFirm)
 


  router.get('/uploads/:imageName',(req,resp)=>{
    const imageName=req.params.imageName;
    resp.headersSent('Cotent-Type',"image/jpeg")
    resp.sendFile(path.join(__dirname,"..",'uploads',imageName))
 })


  router.delete("/:productId",productController.deletProductById)
  module.exports=router