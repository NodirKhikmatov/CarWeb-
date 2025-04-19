import { MemberType } from "./../libs/enums/member.enum";

import Errors, { HttpCode, Message } from "../libs/errors";
import { Member, MemberInput, LoginInput } from "../libs/types/member";
import MemberModel from "../schema/Member.model";
import * as bcrypt from "bcryptjs";
class MemberService {
  private readonly memberModel;
  constructor() {
    this.memberModel = MemberModel;
  }
  //spa

  public async signup(input: MemberInput): Promise<Member> {
    const salt = await bcrypt.genSalt();
    input.memberPassword = await bcrypt.hash(input.memberPassword, salt);

    try {
      const result = await this.memberModel.create(input);
      result.memberPassword = "";
      return result.toJSON();
    } catch (err) {
      throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
    }
  }

  public async login(input: LoginInput): Promise<Member> {
    const member = await this.memberModel
      .findOne(
        { memberNick: input.memberNick },
        { memberNick: 1, memberPassword: 1 }
      )
      .exec();

    if (!member) throw new Errors(HttpCode.NOT_FOUND, Message.NO_MEMBER_NICK);

    const isMatch = await bcrypt.compare(
      input.memberPassword,
      member.memberPassword
    );
    if (!isMatch)
      throw new Errors(HttpCode.UNATHORIZED, Message.WRONG_PASSWORD);

    return await this.memberModel.findById(member._id).lean().exec();
  }

  //ssr
  public async processLogin(input: LoginInput): Promise<Member> {
    const member = await this.memberModel
      .findOne(
        { memberNick: input.memberNick },
        { memberNick: 1, memberPassword: 1 }
      )
      .exec();
    if (!member) throw new Errors(HttpCode.NOT_FOUND, Message.NO_NUMBER_NICK);

    const isMatch = await bcrypt.compare(
      input.memberPassword,
      member.memberPassword
    );
    console.log("isMatch", isMatch);

    if (!isMatch) {
      throw new Errors(HttpCode.UNATHORIZED, Message.WRONG_PASSWORD);
    }

    return await this.memberModel.findById(member._id).lean().exec();
  }

  public async processSignup(input: MemberInput): Promise<Member> {
    const exist = await this.memberModel
      .findOne({ memberType: MemberType.CAR })
      .exec();

    if (exist) throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
    const salt = await bcrypt.genSalt();
    input.memberPassword = await bcrypt.hash(input.memberPassword, salt);

    try {
      const result = await this.memberModel.create(input);
      return result;
    } catch (err) {
      throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
    }
  }

  public async getUsers(): Promise<Member[]> {
    const result = await this.memberModel
      .find({ memberType: MemberType.USER })
      .exec();

    if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);

    return result;
  }
}
export default MemberService;
