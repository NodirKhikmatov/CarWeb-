import express from "express";
const router = express.Router();
import memberController from "./controller/member.controller";

router.get("/", memberController.goHome);

router.get("/signup", memberController.signUp);

export default router;
