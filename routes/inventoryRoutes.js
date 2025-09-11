import express from "express";

import {
  getInventory,
  createInventory,
  editInventory,
  deleteInventory,
  getInventoryValue,
  getProductSalesHistory,
  getTop5ByUnit,
  getLowStockProducts
} from "../controllers/inventoryController.js"

export const inventoryRouter = express.Router();

inventoryRouter.get("/customer", getInventory);
inventoryRouter.post("/customer", createInventory);
inventoryRouter.put("/customer", editInventory);
inventoryRouter.delete("/customer", deleteInventory)
inventoryRouter.get('/inventory/value', getInventoryValue);
inventoryRouter.get('/inventory/:id/history', getProductSalesHistory)//remember to import
inventoryRouter.get('/inventory/top/units', getTop5ByUnit)
inventoryRouter.get('/inventory/low-stock/:threshold', getLowStockProducts)