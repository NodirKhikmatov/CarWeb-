import { MemberInput, LoginInput } from "./../libs/types/member";
import { T } from "../libs/types/common";
import { Request, Response, NextFunction } from "express";
import MemberService from "../models/Member.service";
import { MemberType } from "../libs/enums/member.enum";
import session from "express-session";
import { AdminRequest } from "../libs/types/member";
import { Message, HttpCode } from "../libs/errors";
import Errors from "../libs/errors";

const carController: T = {};

const memberService = new MemberService();

carController.goHome = (req: Request, res: Response) => {
  try {
    console.log("goHome");

    res.render("home");
  } catch (err) {
    console.log("Error: ", err);
  }
};
carController.logIn = (req: Request, res: Response) => {
  try {
    console.log("logIn");
    res.render("login");
  } catch (err) {
    console.log("Error: ", err);
  }
};

carController.logout = (req: AdminRequest, res: Response) => {
  try {
    req.session.destroy(function () {
      res.redirect("/admin");
    });
  } catch (err) {
    console.log("Error: ", err);
  }
};

carController.signUp = (req: Request, res: Response) => {
  try {
    console.log("signUp");
    res.render("signup");
  } catch (err) {
    console.log("Error: ", err);
    res.redirect("/admin");
  }
};

carController.processLogin = async (req: AdminRequest, res: Response) => {
  try {
    console.log("processLogin");
    console.log("req", req.body);

    const input: LoginInput = req.body,
      result = await memberService.processLogin(input);

    req.session.member = result;
    req.session.save(function () {
      res.redirect("/admin/product/all");
    });
  } catch (err) {
    console.log("Error: ", err);
    res.send(err);
  }
};

carController.processSignup = async (req: AdminRequest, res: Response) => {
  try {
    console.log("processSignup");
    const file = req.file;
    console.log(file);

    if (!file) throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);

    const newMember: MemberInput = req.body;
    newMember.memberImage = file?.path;

    newMember.memberType = MemberType.CAR;

    const result = await memberService.processSignup(newMember);

    //todo session authentication

    req.session.member = result;
    req.session.save(function () {
      res.redirect("/admin/product/all");
    });
  } catch (err) {
    console.log("Error: ", err);
    res.send(err);
  }
};

//getusers

carController.getUsers = async (req: Request, res: Response) => {
  try {
    console.log("getUsers");

    const result = await memberService.getUsers();

    res.render("users", { users: result });
  } catch (err) {
    console.log("err: getUsers:", err);
    res.redirect("/admin/login");
  }
};

carController.updateChosenUser = async (req: Request, res: Response) => {
  try {
    console.log("updateChosenUser");
  } catch (err) {
    console.log("err: updateChosenUser:", err);
  }
};

carController.verifyCar = (
  req: AdminRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.session?.member?.memberType === MemberType.CAR) {
    req.member = req.session.member;
    next();
  } else {
    const message = Message.NOT_AUTHENTICATED;
    res.send(
      `<script> alert("${message}"); window.location.replace('/admin/login'); </script>`
    );
  }
};

export default carController;
