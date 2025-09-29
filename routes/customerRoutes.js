import express from "express";
import multer from "multer";
import { uploadCustomerImage } from "../controllers/customerController.js";
import {
  getCustomer,
  createCustomer,
  editCustomer,
  deleteCustomer,
  getCustomerTotalSpent,
  searchCustomersByName,
  getTop5ByRevenue
} from "../controllers/customerController.js";
import { verifyToken } from "../middlewares/verifyToken.js";

export const customerRouter = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize:5*1024*1024},
});

customerRouter.get("/customer", getCustomer);
customerRouter.post("/customer", createCustomer);
customerRouter.put("/customer", editCustomer);
customerRouter.delete("/customer", deleteCustomer);

//Total spent by customer
customerRouter.get('/customer/:id/total-spent', getCustomerTotalSpent) //import at the top
customerRouter.get('/customer/search/:name', searchCustomersByName),//import at the top

customerRouter.get('/customer/top/revenue', getTop5ByRevenue),
customerRouter.post(
  "/customer/:id/upload-image",
  verifyToken,
  upload.single("image"),
  uploadCustomerImage
);