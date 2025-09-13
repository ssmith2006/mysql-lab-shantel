//Basic Auth
import jwt from "jsonwebtoken";
import { pool } from "../db/cn.js";
import bcrypt from "bcrypt";

const USER = "admin";


export const basicAuth = async (req, res, next) => {
  if (!req.headers.authorization) {
    console.log("Authorization headers do not exist.");
    res.status(401).send("Please provide username and password");
  }
  const credentials = req.headers.authorization.split(" ")[1];
  const decode = Buffer.from(credentials, `base64`).toString(`utf-8`);
  const [username, password] = decode.split(":");

  /*no longer want to hard code information (like below):
  if (username === USER && password === PASSWORD) {
    console.log("Correct Credentials.");
  } else {
    console.log("Invalid Credentials.");
    res.status(401).send("Invalid Credentials. Please try again");
  }
  Follow steps 1 and 2 below:  
  */

  // Replace with actual code that accesses our database.
  //1. find user

  const [rows] =
    await pool.query(`SELECT user_id, username, password FROM users 
    WHERE username = "${username}"`);
  const user = rows[0]; //Extract the first item in your array
  const password_hash = user.password;

  //2. verify using BCrypt

  const ok = await bcrypt.compare(password, password_hash);
  if (!ok) {
    return res.status(401).json({ error: "Invalid Credentials." }); //security measures
  }

  next();
}

export const register = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "username and password are required" });
  }

  //1. check if username exist

  sql = `SELECT user_id FROM users
        WHERE username = "${username}"`;

  const [existing] = await pool.query(sql);
  if (existing) {
    return res
      .status(409)
      .json({ error: "username already taken. Please try again." });
  }

  //2. Hashing Password
  const hash = await bcrypt.hash(password, 12);
  const new_user_sql = `INSERT INTO users (username, password) VALUES("${username}", "${hash}")`;

  await pool.query(new_user_sql);

  res.status(200).json({ message: "User registered correctly" });
};
