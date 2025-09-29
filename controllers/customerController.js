import { pool } from "../db/cn.js";

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
                SET name = "${name}",
                phone = "${phone}",
                email = "${email}",
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

export const getCustomerTotalSpent = async (req, res) => {
  const id = req.params.id;
  const sql = `SELECT c.customer_id, c.name, SUM(i.price)
              FROM customer c
              JOIN sales s ON s.customer_id = c.customer_id
              JOIN sales_inventory si ON si.sales_id =s.sales_id
              JOIN inventory i ON i.product_id =si.product_id
              WHERE c.customer_id = ${id}
              GROUP BY c.customer_id`; //when we use a SUM, we have to use GROUP BY
  const result = await pool.query(sql);
  res.json(result);
};

export const searchCustomersByName = async (req, res) => {
  const name = req.params.name; //because the param in the route is name
  const sql = `SELECT * FROM customer
               WHERE name LIKE '%${name}%' //looking from different strings that include what is being search
               ORDER BY name ASC`;
  const result = await pool.query(sql);
  res.json(result);
};

export const getTop5ByRevenue = async (req, res) => {
  
  const sql = `SELECT customer_id, c. name. SUM(i.price * si. quantity)
  FROM customer c
  JOIN sales s ON s. customer_id = c. customer_id
  JOIN sales_inventory si ON si. salesPid = s.sales_id
  JOIN inventory i ON i. product_id = si.product_id
  GROUP BY c.name
  LIMIT 5`;

  const result = await pool.query(sql)
  res.json(result);

};

export const uploadCustomerImage = async (req, res) => {
  try {
    const id = req.params.id;
    const file = req.file;

    if (!file) {
      return res
        .status(400)
        .json({
          error: 'Please send an image file in form-data with key "image".',
        });
    }

    if (!file.mimetype.startsWith("image/")) {
      return res.status(400).json({ error: "Only image files are allowed." });
    }

    const bucket = process.env.S3_BUCKET_NAME;
    const region = process.env.AWS_REGION;

    const ext = path.extname(file.originalname) || "";
    const key = `customer-picture/${id}-${Date.now()}${ext}`;

    await s3.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
      })
    );

    const url = `https://${bucket}.s3.${region}.amazonaws.com/${key}`;

    const sql = `UPDATE customer SET profile_picture_url = '${url}' WHERE customer_id = ${id}`;
    await pool.query(sql);

    return res.json({ message: "Customer image uploaded!", url });
  } catch (err) {
    console.error("Error uploading customer profile image:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};