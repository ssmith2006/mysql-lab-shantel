import express from "express";

import {
 getSales,
 createSales,
 editSales,
 deleteSales
} from "/../workspaces/mysql-lab-shantel/controllers/salesController.js"

export const salesRouter = express.Router();

salesRouter.get("/sales", getSales);
salesRouter.post("/sales", createSales);
salesRouter.put("/sales/:id", editSales);
salesRouter.delete("/sales/:id", deleteSales);
