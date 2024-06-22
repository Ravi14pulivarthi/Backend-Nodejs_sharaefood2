const  express=require("express")

const firmController=require('../controllers/firmController')
const verifyToken=require("../middlewares/verifyToken")


 const router=express.Router()

 router.post("/add-firm",verifyToken,firmController.addFirm)

  router.get('/uploads/:imageName',(req,resp)=>{
     const imageName=req.params.imageName;
     resp.headersSent('Cotent-Type',"image/jpeg")
     resp.sendFile(path.join(__dirname,"..",'uploads',imageName))
  })

  router.delete("/:firmId",firmController.delteFirmById)
 module.exports=router;