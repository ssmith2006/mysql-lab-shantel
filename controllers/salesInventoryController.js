import pool from "../db/cn.js";

export const getSalesInventory = async (req, res) => {
  const sql = `SELECT * FROM sales_inventory`;
  const salesInventory = await pool.query(sql);

  res.json(salesInventory);
};

export const createSalesInventory = async (req, res) => {
  const { product_id, sales_id, quantity } = req.body;
  const sql = `INSERT INTO sales_inventory (product_id, sales_id, quantity) 
               VALUES(${product_id}, ${sales_id}, ${quantity})`;
  const results = await pool.query(sql);

  res.json({ message: "Sale inventory item sucessfully recorded" });
};

export const editSalesInventory = async (req, res) => {
  const id = req.params.id;
  const { product_id, sales_id, quantity } = req.body;
  const sql = `UPDATE sales_inventory 
	           SET product_id =${product_id}, 
               sales_id = ${sales_id}, 
               quantity = ${quantity}
 	           WHERE contains_id = ${id}`;
  const results = await pool.query(sql);

  res.json({ message: "Sale inventory sucessfully updated" });
};

export const deleteSalesInventory = async (req, res) => {
  const id = req.params.id;
  const sql = `DELETE FROM sales_inventory 
 	     WHERE contains_id = ${id}`;
  const results = await pool.query(sql);

  res.json({ message: "Sale inventory sucessfully deleted" });
};
