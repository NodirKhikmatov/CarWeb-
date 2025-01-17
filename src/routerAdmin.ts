import express from "express";
const routerAdmin = express.Router();
import carController from "./controller/Car.controller";

routerAdmin.get("/", carController.goHome);

routerAdmin
  .get("/login", carController.logIn)
  .post("/login", carController.processLogin);

routerAdmin
  .get("/signup", carController.signUp)
  .post("/signup", carController.processSignup);

export default routerAdmin;
