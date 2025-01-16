import express from "express";
import path from "path";
import router from "./router";

/** 1-entrance */
const app = express();
app.use(express.static(path.join(__dirname)));
app.use(express.urlencoded({ extended: true })); //htmlni handle qilish tradition api orqali
app.use(express.json());

/** sessions */

/** 3-views */
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

/** 4router */
app.use("/", router);

export default app;
