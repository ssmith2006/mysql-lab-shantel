import { pool } from "../db/cn.js"

export const getSales = async (req, res) => {
const sql = `SELECT * FROM sales`;
const sales = await pool.query(sql);

res.json(sales);

}

export const createSales = async (req, res) => {
const {customer_id, date} = req.body;
const sql = `INSERT INTO sales (customer_id, date)VALUES(${customer_id}, '${date}')`;
const results = await pool.query(sql);

res.json({message: "Sale sucessfully recorded"})

}

export const editSales = async (req, res) => {
const id = req.params.id
const {customer_id, date} = req.body
const sql = `UPDATE sales 
	     SET customer_id =${customer_id}, date = ${date}
 	     WHERE sales_id = ${id}`
const results = await pool.query(sql);

res.json({message: "Sale sucessfully updated"})

}

export const deleteSales = async (req, res) => {
const id = req.params.id
const sql = `DELETE FROM sales 
 	     WHERE sales_id = ${id}`
const results = await pool.query(sql);

res.json({message: "Sale sucessfully deleted"})
};