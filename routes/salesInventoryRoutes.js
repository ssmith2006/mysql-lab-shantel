import express from "express";
import {
  getSalesInventory,
  createSalesInventory,
  editSalesInventory,
  deleteSalesInventory,
} from "/../controllers/salesInventoryController";

export const sales_InventoryRouter = express.Router();

sales_InventoryRouter.get("/sales_inventory", getSalesInventory);
sales_InventoryRouter.post("/sales_inventory", createSalesInventory);
sales_InventoryRouter.put("/sales_inventory", editSalesInventory);
sales_InventoryRouter.delete("/sales_inventory", deleteSalesInventory);
