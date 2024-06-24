const express= require('express')
const  dotEnv=require('dotenv')
const mongoose=require('mongoose')
const vendorrouter1=require('./routers/vendorrouter1')
const bodyParser=require("body-parser")
  const firmrouters=require("./routers/firmrouters")
 const  productrout=require("./routers/productrout")
 const path=require("path")
  const cors=require('cors')

const app= express()


const PORT=process.env.PORT || 4000;
dotEnv.config()
app.use(cors)


mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log("Mondodb conect successfully"))
.catch((error)=>console.Console.log(error))

app.use(bodyParser.json())
app.use("/vendor",vendorrouter1)
app.use("/firm",firmrouters)
 app.use("/product",productrout)
 app.use("/uploads",express.static('uploads'))








app.listen(PORT,()=>{
    console.log(`serverside stared and running at ${PORT}`)
 })

  app.use('/',(req,resp)=>{
   resp.send("<h1>Welcome to SHARE FOOD</h1>")
  })