import { pool } from "../db/cn.js";

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

//getSalesInventoryById
export const getSalesInventoryById = async (req, res) => {
  const id = req.params.id;
  const sql = `SELECT s.sales_id, 
              s.date, 
              c.name AS customer_name, 
              i.product_id, 
              i.name AS product_name, 
              i.price
              FROM sales
              JOIN customer c ON c.customer_id = s.customer_id
              JOIN sales_inventory si ON si.sales_id = s.sales_id
              JOIN inventory i ON i.product_id = si.product_id
              WHERE s.sales_id = ${id}`;
  const result = await pool.query(sql);
  res.json(result);
};

/*
SELECT s.sales_id,
  s.date,
  c.name AS customer_name,
  i.product_id,
  i.name AS product_name,
  i.price,
  */

export const getSalesSummary = async (req, res) => {
  const sqlByDay = `SELECT s.date, SUM(si.quantity), SUM(i.price)
    FROM sales s
    JOIN sales_inventory si ON si.sales_id = sales_id
    JOIN inventory i on i.product_id = si.product_id
    GROUP BY s.date
    GROUP BY s.date DESC`;

  const sqlBYProduct = `SELECT si.product_id, i.name, SUM(si.quantity), SUM(i.price)
    FROM sales_inventory si
    JOIN inventory i ON i.product_id =si.product_id
    GROUP BY si.product_id`;

  const byProduct = await pool.query(sqlBYProduct);
  const byDate = await pool.query(sqlByDay);

  res.json({ byDate, byProduct });
  /*
                  sale 1        apple 4
                  sale 2        3 bananas       5

                  sale 1        quantity: 3     15
                  sale 2
    /*Summary by Day:
    DATE
    SUM of all the items that were sold
    SUM of the price of items that were sold
    order it form most recent to oldest

    Summary by Product:
    Product id
    Product name
    TOTAL of how many of those products have been sold
    TOTAL of how much money has been paid for that specific product

  */
};
export const addSalesItems = async (req, res) => {
  const sales_id = req.params.sales_id;
  const { items } = req.body;
 const sql = `INSERT INTO sales_inventory (product_id, sales_id, quantity) 
               VALUES(${product_id}, ${sales_id}, ${quantity})`;
  const results = await pool.query(sql);

  res.json({ message: "Items sucessfully added to sale" });
};

