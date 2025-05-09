import session from "express-session";
import { MemberType } from "../libs/enum/member.enum";
import { Request, Response, NextFunction } from "express";
import { T } from "../libs//types//common";
import MemberService from "../models/Member.service";
import { AdminRequest, MemberInput, LoginInput } from "../libs/types/member";
import Errors, { Message, HttpCode } from "../libs/errors";
// import path from "path";

const restaurantController: T = {};
const memberService = new MemberService();
restaurantController.goHome = (req: Request, res: Response) => {
  try {
    console.log("goHome");
    //todo session authentication
    res.render("home"); //response = send | json | redirect | end | render
  } catch (err) {
    console.log("err: gohome:", err);
  }
};

restaurantController.getLogin = (req: Request, res: Response) => {
  try {
    console.log("goLogin");

    //login,
    //service model
    //todo session authentication
    res.render("login");
  } catch (err) {
    console.log("err: getLogin:", err);
    res.redirect("/admin");
  }
};

restaurantController.getSignup = (req: Request, res: Response) => {
  try {
    console.log("getSignup");
    //todo session authentication
    res.render("signup");
  } catch (err) {
    console.log("err: getSignup:", err);
    res.redirect("/admin");
  }
};

restaurantController.processLogin = async (
  req: AdminRequest,
  res: Response
) => {
  try {
    console.log("processLogin");
    console.log("body:", req.body);

    const input: LoginInput = req.body;

    const result = await memberService.processLogin(input);

    //todo session authentication

    req.session.member = result; //cookieni ichiga stickni joylab keladi  session collectionga borib datani save
    req.session.save(function () {
      res.redirect("/admin/product/all");
    });
  } catch (err) {
    const message =
      err instanceof Errors ? err.message : Message.SOMETHING_WENT_WRONG;
    res.send(
      `<script> alert(" ${message}"); window.location.replace('/admin/login') </script>`
    );
    console.log("err: processLogin:", err);
  }
};

restaurantController.processSignup = async (
  req: AdminRequest,
  res: Response
) => {
  try {
    console.log("processSignup");
    console.log("body:", req.body);

    const file = req.file;
    if (!file) {
      throw new Errors(HttpCode.BAD_REQUEST, Message.SOMETHING_WENT_WRONG);
    }

    const newMember: MemberInput = req.body;
    newMember.memberImage = file?.path;

    newMember.memberType = MemberType.RESTAURANT;

    const result = await memberService.processSignup(newMember);

    //todo session authentication
    //db ypzish & 2frontendga yozish
    req.session.member = result;
    req.session.save(function () {
      res.redirect("/admin/product/all");
    });
  } catch (err) {
    console.log("err: processSignup:", err);
    const message =
      err instanceof Errors ? err.message : Message.SOMETHING_WENT_WRONG;
    res.send(
      `<script> alert(" ${message}"); window.location.replace('/admin/signup') </script>`
    );
  }
};

restaurantController.logout = async (req: AdminRequest, res: Response) => {
  try {
    console.log("logout");
    req.session.destroy(function () {
      res.redirect("/admin");
    });
  } catch (err) {
    console.log("err: logout:", err);
    res.redirect("/admin");
  }
};

//getusers

restaurantController.getUsers = async (req: Request, res: Response) => {
  try {
    console.log("getUsers");

    const result = await memberService.getUsers();

    res.render("users", { users: result });
  } catch (err) {
    console.log("err: getUsers:", err);
    res.redirect("/admin/login");
  }
};

restaurantController.updateChosenUser = async (req: Request, res: Response) => {
  try {
    console.log("updateChosenUser");
    const result = await memberService.updateChosenUser(req.body);

    res.status(HttpCode.OK).json({ data: result });
  } catch (err) {
    console.log("err: updateChosenUser:", err);
    if (err instanceof Errors) {
      res.status(err.code).json(err);
    } else res.status(Errors.standard.code).json(Errors.standard);
  }
};

restaurantController.checkAuthSession = async (
  req: AdminRequest,
  res: Response
) => {
  try {
    console.log("checkAuthSession");
    if (req.session?.member) res.send(`hi, ${req.session.member.memberNick}`);
    else res.send(`<script> alert(" ${Message.NOT_AUTHENTICATED}") </script>`);
  } catch (err) {
    console.log("err: checkAuthSession:", err);
    res.send(err);
  }
};

restaurantController.verifyRestaurant = (
  req: AdminRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.session?.member?.memberType === MemberType.RESTAURANT) {
    req.member = req.session.member;
    next();
  } else {
    const message = Message.NOT_AUTHENTICATED;
    res.send(
      `<script> alert(" ${message}"); window.location.replace('/admin/login') </script>`
    );
  }
};
export default restaurantController;
