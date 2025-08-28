import pool from "../db/cn.js";

export const getInventory = async (req, res) => {
  const sql = `SELECT * FROM inventory`;
  const inventory = await pool.query(sql);
  res.json(inventory);
};

export const createInventory = async (req, res) => {
  const id = req.params.id;
  const { name, price, stock } = req.body;
  const sql = `INSERT INTO inventory (id, name, stock, price) 
               VALUES ( ${id}, "${name}", ${price}, ${stock})`;
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
