import { pool } from "../db/cn.js";
import { s3 } from "/workspaces/mysql-lab-shantel/utils/s3client.js"
import { PutObjectCommand } from "@aws-sdk/client-s3";
import path from 'path'

export const getUsers = async(req, res)=>{
    const sql = `select * from users`
    const [result] = await pool.query(sql)
    return res.status(200).json ({message: "User info retrieved successfully."})
    data: result;
}

export const getUserInformation = async(req, res) =>{
    const id =req.params.id
    const sql = `select * form users WHERE user_id = ${id}`

    const [result] = await pool.query(sql)
    res.status(200).json(result)
}

export const uploadProfilePicture = async(req, res)=>{
    const id = req.params.id
    const file = req.file

    if (!file){
        res.statu(400).json({error: "Please send an image file."})
    }

    const fileType =file.mimetype.StartsWith('image/')
    if(!fileType){
        res.status(400).json({error: "Only image file types are allowed."})
    }

    const bucket = process.env.S3_BUCKET_NAME
    const region =process.env.AWS_REGION

    const ext = path.extname(file.originalName)
    const key = `profile-picture/${id}-${Date.now()} ${text}`

    await s3.send(new PutObjectCommand ({
        Bucket: bucket,
        Key: key,
        Body: file.buffer,
        contentType: file.mimetype
    }))

    const url = `https://${bucket}.s3.${region}.amazonaws.com/${key}`
    const sql = `update users
                  SET profile_picture_url = "${url}"
                  WHERE user_id = ${id}`
    await pool.query(sql)
    res.json({message: "Profile Picture Uploaded!"})
}