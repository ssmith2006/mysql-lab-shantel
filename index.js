import express from "express";
import "dotenv/config";

import { customerRouter } from "../mysql-lab-shantel/routes/customerRoutes.js";
import { salesRouter } from "../mysql-lab-shantel/routes/salesRoutes.js";
import { inventoryRouter } from "../mysql-lab-shantel/routes/inventoryRoutes.js";
import { sales_InventoryRouter } from "../mysql-lab-shantel/routes/salesInventoryRoutes.js";
import { logger } from "../mysql-lab-shantel/middlewares/logger.js";
import { verifyToken } from "../mysql-lab-shantel/middlewares/verifyToken.js";
import { authRouter } from "./routes/authRouter.js";
import { userRouter } from "../mysql-lab-shantel/routes/userRouter.js";
import cors from "cors";

const app = express();
app.use((req, res, next) => {
  console.log("🔍 Origin:", req.headers.origin);
  console.log("🔍 Method:", req.method);
  next();
});
app.use(
  cors({
    origin: [/.githubpreview.dev$/],
    credentials: true,
  })
);
app.options("*", cors());

app.use(express.json());

app.use(logger);

app.use(authRouter);

app.use(verifyToken);
app.use(customerRouter);
app.use(salesRouter);
app.use(inventoryRouter);
app.use(sales_InventoryRouter);
app.use(userRouter);

app.listen(3000);
