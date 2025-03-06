import express from "express";
const routerAdmin = express.Router();
import carController from "./controller/Car.controller";
import productController from "./controller/product.controller";

/**Car  */

routerAdmin.get("/", carController.goHome);

routerAdmin
  .get("/login", carController.logIn)
  .post("/login", carController.processLogin);

routerAdmin.get("/logout", carController.logout);

routerAdmin
  .get("/signup", carController.signUp)
  .post("/signup", carController.processSignup);

/**Products */
routerAdmin
  .get("/product/all", productController.getAllProducts)
  .post("/product/create", productController.createNewProduct)
  .post("/product/:id", productController.updateChosenProduct);

export default routerAdmin;
