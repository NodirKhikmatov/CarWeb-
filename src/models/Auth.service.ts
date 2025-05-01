import Errors, { HttpCode, Message } from "../libs/errors";

import { AUTH_TIMER } from "../libs/config";
import { Member } from "../libs/types/member";
import jwt from "jsonwebtoken";
import { token } from "morgan";

class AuthService {
  private readonly secretToken;
  constructor() {
    this.secretToken = process.env.SECRET_TOKEN as string;
  }

  public async createToken(payload: Member) {
    return new Promise((resolve, reject) => {
      const duration = `${AUTH_TIMER}h`; /*24 soat ishlasin degani*/
      jwt.sign(
        payload,
        this.secretToken,
        {
          expiresIn: duration,
        },
        (err, token) => {
          if (err)
            reject(
              new Errors(HttpCode.UNATHORIZED, Message.TOKEN_CREATION_FAILED)
            );
          else resolve(token as string);
        }
      );
    });
  }



  public async checkAuth(token: string): Promise<Member> {
    const result: Member = (await jwt.verify(
      token,
      this.secretToken
    )) as Member;
    console.log(`--[AUTH] memberNick: ${result.memberNick} ---`);
    return result;
  }



}

export default AuthService;
