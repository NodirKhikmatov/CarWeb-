import { T } from "../libs/types/common";
import { Request, Response } from "express";

const carController: T = {};

carController.goHome = (req: Request, res: Response) => {
  try {
    res.send("HomePage");
  } catch (err) {
    console.log("Error: ", err);
  }
};

carController.signUp = (req: Request, res: Response) => {
  try {
    res.send("SignUpPage");
  } catch (err) {
    console.log("Error: ", err);
  }
};

carController.logIn = (req: Request, res: Response) => {
  try {
    res.send("loginPage");
  } catch (err) {
    console.log("Error: ", err);
  }
};

export default carController;
