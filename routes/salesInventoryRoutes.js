import express from "express";

import {
  getSalesInventory,
  createSalesInventory,
  editSalesInventory,
  deleteSalesInventory, 
  getSalesInventoryById, 
  getSalesSummary
} from "/workspaces/mysql-lab-shantel/controllers/salesInventoryController.js";

export const sales_InventoryRouter = express.Router();

sales_InventoryRouter.get("/sales_inventory", getSalesInventory);
sales_InventoryRouter.post("/sales_inventory", createSalesInventory);
sales_InventoryRouter.put("/sales_inventory/:id", editSalesInventory);
sales_InventoryRouter.delete("/sales_inventory/:id", deleteSalesInventory);

sales_InventoryRouter.get("/sales_inventory/:id", getSalesInventoryById);
sales_InventoryRouter.get("/sales_inventory/summary", getSalesSummary)
