import express from "express";
import {
  getSales,
  createSales,
  editSales,
  deleteSales,
} from "/../controllers/salesController";

export const salesRouter = express.Router();

salesRouter.get("/sales", getSales);
salesRouter.post("/sales", createSales);
salesRouter.put("/sales", editSales);
salesRouter.delete("/sales", deleteSales);
