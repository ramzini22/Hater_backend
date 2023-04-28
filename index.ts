import express, { Express, Request, Response } from "express";
import router from './src/routes/UserRouter'
const TokenRouter =require( './src/routes/TokenRouter')
const cookieParser=require('cookie-parser')
const dotenv = require('dotenv')
dotenv.config()

const port = process.env.PORT;
const dbUrl= process.env.DB_URL || ""
const app: Express = express();
import mongoose from "mongoose";
const cors = require('cors');
const errorMiddleware= require('./src/middlewears/error-widdlewear')

app.use('/', express.static('src/public'))

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true}));
app.use(express.json())
app.use(cookieParser())
app.use('/token', TokenRouter)
app.use('/api', router)

app.use(errorMiddleware)
async function startApp(){
  try{
    mongoose.set('strictQuery', true);
    mongoose.connect(dbUrl)
    app.listen(port, () => {
      console.log(`now listening on port ${port}`);
    });
  }catch (e){
    console.log(e)
  }
}

startApp()



