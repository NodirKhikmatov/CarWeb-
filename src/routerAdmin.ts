import express from "express";
const routerAdmin = express.Router();
import carController from "./controller/Car.controller";
import productController from "./controller/product.controller";
import makeUploader from "./libs/utils/uploader";

/**Car  */

routerAdmin.get("/", carController.goHome);

routerAdmin
  .get("/login", carController.logIn)
  .post("/login", carController.processLogin);

routerAdmin.get("/logout", carController.logout);

routerAdmin
  .get("/signup", carController.signUp)
  .post(
    "/signup",
    makeUploader("members").array("memberImages "),
    carController.processSignup
  );

/**Products */
routerAdmin
  .get(
    "/product/all",
    carController.verifyCar,
    productController.getAllProducts
  )
  .post(
    "/product/create",
    carController.verifyCar,
    makeUploader("products").array("productImages"),
    productController.createNewProduct
  )
  .post("/product/:id", productController.updateChosenProduct);

export default routerAdmin;
