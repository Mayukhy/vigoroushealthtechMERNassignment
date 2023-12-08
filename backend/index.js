import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import userRouts from './routes/userrout.js'
import dotenv from 'dotenv'
import cookieParser from "cookie-parser";
import { verifyToken } from './verifyToken.js'

const app = express();
dotenv.config()

app.use(cookieParser())
app.use(express.json());
app.use(cors({
  origin: ["http://localhost:5173"],
  methods:["GET","POST","PUT"],
  credentials: true
  }))
//for properly sending requests from the frontend
app.use(bodyParser.json({limit:"30mb",extended:true}))
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}))
app.use('/user',userRouts)

//for connecting mongodb database with the app
const connect = () => {
    mongoose
      .connect(process.env.CONNECTION_URL)
      .then(() => {
        console.log("Connected to MongoDB");
      })
      .catch((err) => {
        throw err;
      });
  };

app.get('/home',verifyToken,(req,res)=>{
    res.json(req.user)
})

app.get('/',(req,res)=>{
    res.json('Hello this is Mytube 2.0')
    })

const PORT = 5000;

    app.listen(PORT,()=>{
        connect()
        console.log('server is running at http://localhost:5000')
})