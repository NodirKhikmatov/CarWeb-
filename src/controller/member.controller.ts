import { LoginInput, Member, MemberInput } from "../libs/types/member";
import { T } from "../libs/types/common";
import { Request, Response } from "express";
import Errors, { HttpCode, Message } from "../libs/errors";
import MemberService from "../models/Member.service";

const memberService = new MemberService();

const memberController: T = {};

memberController.signup = async (req: Request, res: Response) => {
  try {
    console.log("signup");
    const input: MemberInput = req.body,
      result: Member = await memberService.signup(input);

    res.json({ member: result });
  } catch (err) {
    console.log("Error: ", err);
    res.status(Errors.standard.code).json(Errors.standard);
  }
};

memberController.login = async (req: Request, res: Response) => {
  try {
    console.log("login");
    const input: LoginInput = req.body,
      result = await memberService.login(input);

    res.json({ member: result });
  } catch (err) {
    console.log("Error: ", err);
    res.status(Errors.standard.code).json(Errors.standard);
  }
};

export default memberController;
