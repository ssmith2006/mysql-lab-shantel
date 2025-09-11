import express from 'express';
import jwt from 'jsonwebtoken';
import { basicAuth, register } from '../controllers/authController.js'


export const authRouter = express.Router()

authRouter.post('/auth/login', basicAuth, (req, res) => {

   //retrieve info from headers, we want to use dynamic users, we're going to extract the username and not save the password.  We also get to retrieve the 1st item.
   const credentials = req.headers.authorization.split(" ")[1];
   const decode = Buffer.from(credentials, `base64`).toString(`utf-8`);
   const [username] = decode.split(":")[0]

   const userData = {
    username: username
   
   } 
   const token = jwt.sign(userData, process.env.SECRET_ENV, {expiresIn: '8h'})

   res.status(200).json({
    message: "Successfully logged in.",
    token: token
   })
authRouter.post('/auth/register', register) 
  
})
