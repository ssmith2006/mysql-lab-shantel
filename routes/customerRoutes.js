import express from "express";

import {
  getCustomer,
  createCustomer,
  editCustomer,
  deleteCustomer,
} from "../controllers/customerController"

export const customerRouter = express.Router();

customerRouter.get("/customer", getCustomer);
customerRouter.post("/customer", createCustomer);
customerRouter.put("/customer", editCustomer);
customerRouter.delete("/customer", deleteCustomer);
