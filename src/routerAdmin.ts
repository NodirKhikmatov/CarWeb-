import express from "express";
const routerAdmin = express.Router();
import carController from "./controller/Car.controller";

routerAdmin.get("/admin", carController.goHome);

routerAdmin.get("/admin/signup", carController.signUp);

routerAdmin.get("/admin/login", carController.logIn);

export default routerAdmin;
