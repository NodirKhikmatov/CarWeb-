import Errors, { HttpCode, Message } from "../libs/errors";
import { ExtendedRequest, LoginInput, Member, MemberInput } from "../libs/types/member";
import { NextFunction, Request, Response } from "express";

import { AUTH_TIMER } from './../libs/config';
import AuthService from '../models/Auth.service';
import MemberService from "../models/Member.service";
import { T } from "../libs/types/common";

const memberService = new MemberService();
const authService = new AuthService();

const memberController: T = {};

//REACT

memberController.signup = async (req: Request, res: Response) => {
  try {
    console.log("signup");

    const input: MemberInput = req.body,
      result: Member = await memberService.signup(input),
      token = await authService.createToken(result);

    res.cookie("accessToken", token, {
      maxAge: AUTH_TIMER * 3600 * 1000,
      httpOnly: false,
    });

    res.status(HttpCode.CREATED).json({ member: result, accessToken: token });
  } catch (err) {
    console.log("err: signup:", err);
    if (err instanceof Errors) {
      res.status(err.code).json(err);
    } else res.status(Errors.standard.code).json(Errors.standard);
  }
};

memberController.login = async (req: Request, res: Response) => {
  try {
    // console.log("login");
    // console.log("body:", req.body);

    const input: LoginInput = req.body,
      result = await memberService.login(input),
      token = await authService.createToken(result);
    console.log("token",token);

    res.cookie("accessToken", token, {
      maxAge: AUTH_TIMER * 3600 * 1000,
      httpOnly: false,
    });

    res.status(HttpCode.OK).json({ member: result, accessToken: token });
  } catch (err) {
    console.log("err: Login:", err);
    if (err instanceof Errors) {
      res.status(err.code).json(err);
    } else res.status(Errors.standard.code).json(Errors.standard);
  }
};

memberController.logout = async (req: Response, res: Response) => {
  try {
    console.log("logout");
    res.cookie("accessToken", null, { maxAge: 0, httpOnly: true });
    res.status(HttpCode.OK).json({ logout: true });
  } catch (err) {
    console.log("err: Login:", err);
    if (err instanceof Errors) {
      res.status(err.code).json(err);
    } else res.status(Errors.standard.code).json(Errors.standard);
  }
};

memberController.verifyAuth = async (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies["accessToken"];
    if (token) req.member = await authService.checkAuth(token);
    next();
    if (!req.member) {
      throw new Errors(HttpCode.UNATHORIZED, Message.NOT_AUTHENTICATED);
      console.log(req.member);
    }
  } catch (err) {
    console.log("err: Login:", err);
    if (err instanceof Errors) {
      res.status(err.code).json(err);
    } else res.status(Errors.standard.code).json(Errors.standard);
  }
};

memberController.retrieveAuth = async (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies["accessToken"];
    if (token) req.member = await authService.checkAuth(token);

    next();
    if (!req.member) {
      throw new Errors(HttpCode.UNATHORIZED, Message.NOT_AUTHENTICATED);
      console.log(req.member);
    }
  } catch (err) {
    console.log("err: Login:", err);
    if (err instanceof Errors) {
      res.status(err.code).json(err);
    } else res.status(Errors.standard.code).json(Errors.standard);
  }
};

export default memberController;
