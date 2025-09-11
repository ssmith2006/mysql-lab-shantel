import express from "express";

import {
  getCustomer,
  createCustomer,
  editCustomer,
  deleteCustomer,
  getCustomerTotalSpent,
  searchCustomersByName,
  getTop5ByRevenue
} from "../controllers/customerController.js"

export const customerRouter = express.Router();

customerRouter.get("/customer", getCustomer);
customerRouter.post("/customer", createCustomer);
customerRouter.put("/customer", editCustomer);
customerRouter.delete("/customer", deleteCustomer);

//Total spent by customer
customerRouter.get('/customer/:id/total-spent', getCustomerTotalSpent) //import at the top
customerRouter.get('/customer/search/:"name', searchCustomersByName),//import at the top

customerRouter.get('/customer/top/revenue', getTop5ByRevenue)