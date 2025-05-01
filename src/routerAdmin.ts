import carController from "./controller/Car.controller";
import express from "express";
import makeUploader from "./libs/utils/uploader";
import productController from "./controller/product.controller";
const routerAdmin = express.Router();

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
    makeUploader("members").single("memberImage"),
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

/*USER */

routerAdmin.get("/user/all", carController.verifyCar, carController.getUsers);

export default routerAdmin;
