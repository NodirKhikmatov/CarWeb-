import { MemberInput, LoginInput } from "./../libs/types/member";

import { T } from "../libs/types/common";
import { Request, Response } from "express";
import MemberService from "../models/Member.service";
import { MemberType } from "../libs/enums/member.enum";

const carController: T = {};

const memberService = new MemberService();

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

carController.signUp = (req: Request, res: Response) => {
  try {
    console.log("signUp");
    res.send("SignUpPage ");
  } catch (err) {
    console.log("Error: ", err);
  }
};

carController.processLogin = async (req: Request, res: Response) => {
  try {
    console.log("processLogin");
    console.log("req", req.body);

    const input: LoginInput = req.body,
      result = await memberService.processLogin(input);

    res.send(result);
  } catch (err) {
    console.log("Error: ", err);
    res.send(err);
  }
};

carController.processSignup = async (req: Request, res: Response) => {
  try {
    console.log("processSignup");
    console.log("body", req.body);

    const newMember: MemberInput = req.body;
    newMember.memberType = MemberType.CAR;

    const result = await memberService.processSignup(newMember);
    res.send(result);
  } catch (err) {
    console.log("Error: ", err);
    res.send(err);
  }
};

export default carController;
