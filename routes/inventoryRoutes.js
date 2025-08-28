import express from "express";

import {
  getInventory,
  createInventory,
  editInventory,
  deleteInventory,
} from "../controllers/inventoryController"

export const inventoryRouter = express.Router();

inventoryRouter.get("/customer", getInventory);
inventoryRouter.post("/customer", createInventory);
inventoryRouter.put("/customer", editInventory);
inventoryRouter.delete("/customer", deleteInventory)
