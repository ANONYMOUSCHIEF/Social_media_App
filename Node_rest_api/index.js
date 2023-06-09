const express = require('express');
const mongoose=require('mongoose');
const morgan=require('morgan');
const helmet=require('helmet');
const dotenv=require('dotenv');
const cors = require('cors');
const multer=require('multer')

dotenv.config();
const app=express();
const UserRoute=require("./Routes/user");
const AuthRoute=require("./Routes/auth");
const PostRoute=require("./Routes/post");
const ConverstionRoute=require("./Routes/converstion");
const ChatRoute=require("./Routes/chat");
const path=require('path');


mongoose.connect(process.env.MONGO_URI,{family:4})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(error => console.error(error));


//   middleWare
app.use(express.json());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from this origin
}));

app.use("/images", express.static(path.join(__dirname, "public/images")));

const storage=multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,"public/images");
  },
  filename:(req,file,cb)=>{
    cb(null,req.body.name)
  }
})
const upload=multer({storage});



app.post('/api/upload',upload.single('file'),(req,res)=>{
  try {
    return res.status(200).json("File Uploaded Successfully")
  } catch (error) {
    console.log(error);
  }
})


app.use("/api/users",UserRoute);
app.use("/api/auth",AuthRoute);
app.use("/api/post",PostRoute);
app.use("/api/converstion",ConverstionRoute);
app.use("/api/chat",ChatRoute);
app.listen(5000,()=>{
    console.log("Server is running at port 5000");
})