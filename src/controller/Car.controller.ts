import { T } from "../libs/types/common";
import { Request, Response } from "express";
import MemberService from "../models/Member.service";

const carController: T = {};

carController.goHome = (req: Request, res: Response) => {
  try {
    console.log("goHome ");

    res.send("HomePage");
  } catch (err) {
    console.log("Error: ", err);
  }
};
carController.logIn = (req: Request, res: Response) => {
  try {
    console.log("logIn");
    res.send("loginPage ");
  } catch (err) {
    console.log("Error: ", err);
  }
};

carController.processLogin = (req: Request, res: Response) => {
  try {
    console.log("processLogin");
    res.send("Done");
  } catch (err) {
    console.log("Error: ", err);
  }
};

carController.signUp = (req: Request, res: Response) => {
  try {
    console.log("signUp");
    res.send("SignUpPage ");
  } catch (err) {
    console.log("Error: ", err);
  }
};

carController.processSignup = (req: Request, res: Response) => {
  try {
    console.log("processSignup");
    res.send("Done processSignup ");
  } catch (err) {
    console.log("Error: ", err);
  }
};

export default carController;
