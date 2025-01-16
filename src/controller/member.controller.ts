import { T } from "../libs/types/common";
import { Request, Response } from "express";

const memberController: T = {};

memberController.goHome = (req: Request, res: Response) => {
  try {
    res.send("HomePage");
  } catch (err) {
    console.log("Error: ", err);
  }
};

memberController.signUp = (req: Request, res: Response) => {
  try {
    res.send("SignUpPage");
  } catch (err) {
    console.log("Error: ", err);
  }
};
export default memberController;
