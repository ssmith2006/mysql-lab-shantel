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

inventoryRouter.get("/inventory", getInventory);
inventoryRouter.post("/inventory", createInventory);
inventoryRouter.put("/inventory", editInventory);
inventoryRouter.delete("/inventory", deleteInventory)
inventoryRouter.get('/inventory/value', getInventoryValue);
inventoryRouter.get('/inventory/:id/history', getProductSalesHistory)//remember to import
inventoryRouter.get('/inventory/top/units', getTop5ByUnit)
inventoryRouter.get('/inventory/low-stock/:threshold', getLowStockProducts)