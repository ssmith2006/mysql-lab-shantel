import express from "express";
import multer from "multer";
import { uploadInventoryImage } from "/workspaces/mysql-lab-shantel/controllers/inventoryController.js";
import {
  getInventory,
  createInventory,
  editInventory,
  deleteInventory,
  getInventoryValue,
  getProductSalesHistory,
  getTop5ByUnit,
  getLowStockProducts,
} from "../controllers/inventoryController.js";
import { verifyToken } from "../middlewares/verifyToken.js";

export const inventoryRouter = express.Router();


const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize:5*1024*1024 },
});



inventoryRouter.get("/inventory", getInventory);
inventoryRouter.post("/inventory", createInventory);
inventoryRouter.put("/inventory/:id", editInventory);
inventoryRouter.delete("/inventory/:id", deleteInventory);
inventoryRouter.get("/inventory/value", getInventoryValue);
inventoryRouter.get("/inventory/:id/history", getProductSalesHistory); //remember to import
inventoryRouter.get("/inventory/top/units", getTop5ByUnit);
inventoryRouter.get("/inventory/low-stock/:threshold", getLowStockProducts);
inventoryRouter.post(
  "/inventory/:id/upload-image",
  verifyToken,
  upload.single("image"),
  uploadInventoryImage
);
