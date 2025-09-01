// importing dependencies :

import express from 'express'
import cors from 'cors'   
import 'dotenv/config' ;  // to use env variable in  backend server


// importing clerkmiddleware & requireauth from clerk-express :
import { clerkMiddleware, requireAuth } from '@clerk/express'

import aiRouter from './routes/aiRoutes.js';
// import connectCloudinary from './configs/cloudinary.js';   // bhai chatgpt bola
import userRouter from './routes/userRoutes.js';

// creating app using express package :
const app = express()

// calling cloudinary fun :
// await connectCloudinary()  => chat gpt bola


// middlewares :
app.use(cors()) // all request will be passed using this cors
app.use(express.json()) // all areqest will be pparsed using this json method

// clerk middleware:
app.use(clerkMiddleware()) // all req will be passed using clerk middleware
// and this middlware will add auth object in each req & from this auth object we will get user data.

// first(home) route :
app.get('/',(req,res)=> res.send('Server is Live!'))  // on hitting this path arrow fun will be executed
// it is public route (anyone can access)

// requireauth as middleware :
app.use(requireAuth())
// # when we will create any route after this it will be protected (only loggedin user can access these routes )

// protected routes : (only for loggedin users)

// adding ai router :
app.use('/api/ai', aiRouter)
// adding user router :
app.use('/api/user', userRouter)


// adding port no whwere we will start the backend server :
const PORT = process.env.PORT || 3000;  // if this port no is available in env variable it will be used other wise "3000" port no will be used.

// to start app in port no :
app.listen(PORT, ()=> {  // fun with PORT & arrow fun as parameter
  console.log('server is running on port', PORT);
})

// To start this server write "npm run server" in terminal => to verify in browser write "localhost:3000" (home route) => "Server is Live!" will be displayed
// Whenever we open the route in the browser it will hit with "get" method => and give the response