import pool from "../db/cn.js";

export const getCustomer = async (req, res) => {
  const sql = `SELECT * FROM customer`;
  const customers = await pool.query(sql);
  res.json(customers);
};

export const createCustomer = async (req, res) => {
  const id = req.params.id;
  const { name, phone, email } = req.body;
  const sql = `INSERT INTO customer (id, name, phone, email) VALUES ("${id}", "${name}", "${phone}", "${email}")`;
  const result = await pool.query(sql);
  res.json({ message: "User created!" });
};

export const editCustomer = async (req, res) => {
  const id = req.params.id;
  const { name, phone, email } = req.body;
  const sql = `UPDATE customer 
                SET name = ${name}
                phone = ${phone}
                email = ${email}
                WHERE customer_id = ${id}`;

  const result = await pool.query(sql);
  res.json({ message: "User information modified!" });
};

export const deleteCustomer = async (req, res) => {
  const id = req.params.id;
  const sql = `DELETE FROM customer
                WHERE id = ${id}`;
  const result = await pool.query(sql);
  res.json({ message: "User deleted!" });
};
