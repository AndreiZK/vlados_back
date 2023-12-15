import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import {
  registerValidator,
  loginValidator,
  productValidator,
} from "./validations.js";
import handleValidationErrors from "./utils/handleValidationErrors.js";
import * as UserController from "./controllers/UserController.js";
import * as ProductsController from "./controllers/ProductsController.js";

const app = express();
const port = 3000;

app.use(
  cors({
    origin: "*",
  })
);
app.use((req, res, next) => {
  res.append("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.append("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use(bodyParser.json());

app.post(
  "/register",
  registerValidator,
  handleValidationErrors,
  UserController.register
);

app.post(
  "/login",
  loginValidator,
  handleValidationErrors,
  UserController.login
);

app.get("/products", ProductsController.getProducts);

app.post(
  "/products",
  productValidator,
  handleValidationErrors,
  ProductsController.addProduct
);

app.put(
  "/products/:id",
  productValidator,
  handleValidationErrors,
  ProductsController.updateProduct
);

app.listen(port, () => console.log(`Express app running on port ${port}!`));
