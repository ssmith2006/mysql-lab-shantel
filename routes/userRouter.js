import express from 'express';
import multer from 'multer';
import {uploadProfilePicture, getUsers, getUserInformation} from "/workspaces/mysql-lab-shantel/controllers/userControllers.js"
import { verifyToken } from '../middlewares/verifyToken.js';

export const userRouter = express.Router()

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {fileSize:5*1024*1024}

})



userRouter.get('/users', getUsers)
userRouter.get('/users/:id',verifyToken, getUserInformation)
userRouter.post('/users/:id/upload-picture', verifyToken, upload.single("image"), uploadProfilePicture)
