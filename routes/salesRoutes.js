import express from "express";

import {
 getSales,
 createSales,
 editSales,
 deleteSales
} from "/../workspaces/mysql-lab-shantel/controllers/salesController.js";
import { addSalesItems } from "/../workspaces/mysql-lab-shantel/controllers/salesInventoryController.js"

export const salesRouter = express.Router();

salesRouter.get("/sales", getSales);
salesRouter.post("/sales", createSales);
salesRouter.post("/sales/:sale_id/items", addSalesItems);
salesRouter.put("/sales/:id", editSales);
salesRouter.delete("/sales/:id", deleteSales);
