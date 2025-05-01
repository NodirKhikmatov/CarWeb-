import express from "express";
import memberController from "./controller/member.controller";
const router = express.Router();


// member

router.post("/member/login", memberController.login);
router.post("/member/signup", memberController.signup);
router.post(
  "/member/logout",
  memberController.verifyAuth,
  memberController.logout
);
router.get("/member/detail", memberController.verifyAuth);

export default router;
 