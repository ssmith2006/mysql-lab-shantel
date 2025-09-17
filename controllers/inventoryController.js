
import {pool} from "../db/cn.js";
import { s3 } from "/workspaces/mysql-lab-shantel/utils/s3client.js";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import path from "path";

export const getInventory = async (req, res) => {
  const sql = `SELECT * FROM inventory`;
  const inventory = await pool.query(sql);
  res.json(inventory);
};

export const createInventory = async (req, res) => {
  
  const { name, price, stock } = req.body
  const sql = `INSERT INTO inventory (name, stock, price) 
               VALUES ("${name}", ${price}, ${stock})`;
  const result = await pool.query(sql);
  res.json({ message: "Product created successfully!" });
};

export const editInventory = async (req, res) => {
  const id = req.params.id;
  const { name, price, stock } = req.body;
  const sql = `UPDATE customer 
               SET name = ${name}
                phone = ${price}
                email = ${stock}
                WHERE product_id = ${id}`;

  const result = await pool.query(sql);
  res.json({ message: "Product modified successfully!" });
};

export const deleteInventory = async (req, res) => {
  const id = req.params.id;
  const sql = `DELETE FROM inventory
                WHERE product_id = ${id}`;
  const result = await pool.query(sql);
  res.json({ message: "Product successfully deleted!" });
};

export const getInventoryValue = async (req, res)=>{
  const sql= `SELECT  
              product_id, 
              name. price, 
              stock, 
              (price * stock) AS inventory_value
              FROM inventory
              ORDER BY inventory_value DESC`
  const result = await pool.query(sql)
  res.json(result)
}

export const getProductSalesHistory = async (req, res) => {
    const id = req.params.id
    const sql = `SELECT s.sales_id, s.date, s.customer_id, c.name, si.quantity, i.product_id, i.name AS product_name, i.price, si.quantity, (i.price * si.quantity) AS total 
    FROM sales_inventory si
    JOIN sales s ON s.sales_id = si.sales_id
    JOIN inventory i ON i.product+id =si.product_id
    JOIN customer con s.customeer_id = c.customer_id
    WHERE i.product_id = ${id}
    ORDER BY s.date DESC`

const result =await pool.query(sql)
res.json(result)
}

export const getTop5ByUnit = async (req, res) => {
  const sql = `SELECT i.product_id, i.name, SUM(si.quanity)
  FROM inventory i
  JOIN si ON si.product_id = i.product_id
  GROUP BY i.product_id
  ORDER BY si.quantity DESC
  LIMIT 5`

  const result =await pool.query(sql)
  res.json(result)
}

export const getLowStockProducts = async (req, res) => {
  const threshold = req.params.threshold
  const sql = `SELECT product_id, name, stock
  FROM inventory
  WHERE stock < ${threshold}
  ORDER BY stock ASC`

  const result = await pool.query(sql)
  res.json(result)
}

export const uploadInventoryImage = async (req, res) => {
  try {
    const id = req.params.id;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: 'Please send an image file in form-data with key "image".' });
    }

    if (!file.mimetype.startsWith("image/")) {
      return res.status(400).json({ error: "Only image files are allowed." });
    }

    const bucket = process.env.S3_BUCKET_NAME;
    const region = process.env.AWS_REGION;

    const ext = path.extname(file.originalname) ||"";
    const key = `inventory-picture/${id}-${Date.now()}${ext}`;

    await s3.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
      })
    );

    const url = `https://${bucket}.s3.${region}.amazonaws.com/${key}`;

    const sql = `UPDATE inventory SET inventory_picture_url = '${url}' WHERE product_id = ${id}`;
    await pool.query(sql);

    return res.json({ message: "Inventory image uploaded!", url });
  } catch (err) {
    console.error("Error uploading inventory image:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};