import * as bcrypt from "bcryptjs";

import Errors, {HttpCode, Message} from "../libs/errors";
import {
  LoginInput,
  Member,
  MemberInput,
  MemberUpdateInput,
} from "../libs/types/member";
import {MemberStatus, MemberType} from "../libs/enum/member.enum";

import MemberModel from "../schema/Member.model";
import {shapeIntoMongooseObjectId} from "../libs/config";

class MemberService {
  private readonly memberModel;

  constructor() {
    this.memberModel = MemberModel;
  }
  //***** spa ****

  public async getRestaurant(): Promise<Member> {
    const result = await this.memberModel
      .findOne({
        memberType: MemberType.RESTAURANT,
      })
      .lean()
      .exec();

    if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);
    return result;
  }

  public async signup(input: MemberInput): Promise<Member> {
    console.log("before", input.memberPassword);
    const salt = await bcrypt.genSalt();
    input.memberPassword = await bcrypt.hash(input.memberPassword, salt);
    console.log("after", input.memberPassword);

    try {
      const result = await this.memberModel.create(input); //create static method

      // const tempResult = new this.memberModel(input);
      // const result = await tempResult.save();
      result.memberPassword = "";
      return result.toJSON();
    } catch (err) {
      console.error("error:model:signup", err);

      throw new Errors(HttpCode.BAD_REQUEST, Message.USED_NICK_PHONE);
    }
  }

  public async login(input: LoginInput): Promise<Member> {
    const member = await this.memberModel
      .findOne(
        {
          memberNick: input.memberNick,
          memberStatus: {$ne: MemberStatus.DELETE},
        },
        {memberNick: 1, memberPassword: 1, memberStatus: 1}
      )
      .exec();
    if (!member) throw new Errors(HttpCode.NOT_FOUND, Message.NO_NUMBER_NICK);
    else if (member.memberStatus === MemberStatus.BLOCK)
      throw new Errors(HttpCode.FORBIDDEN, Message.BLOCKED_USER);

    const isMatch = await bcrypt.compare(
      input.memberPassword,
      member.memberPassword
    );
    // const isMatch = input.memberPassword === member.memberPassword;

    // console.log("isMatch", isMatch);
    if (!isMatch) {
      throw new Errors(HttpCode.UNAUTHORIZED, Message.WRONG_PASSWORD);
    }

    return await this.memberModel.findById(member._id).lean().exec();
  }

  public async updateMember(
    member: Member,
    input: MemberUpdateInput
  ): Promise<Member> {
    const memberId = shapeIntoMongooseObjectId(member._id);
    const result = await this.memberModel
      .findOneAndUpdate({_id: memberId}, input, {new: true})
      .exec();

    if (!result) throw new Errors(HttpCode.NOT_MODIFIED, Message.UPDATE_FAILED);

    return result;
  }

  public async getMemberDetail(member: Member): Promise<Member> {
    const memberId = shapeIntoMongooseObjectId(member._id);
    const result = await this.memberModel
      .findOne({
        _id: memberId,
        memberStatus: MemberStatus.ACTIVE,
      })
      .exec();

    if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);

    return result;
  }

  public async getTopUsers(): Promise<Member[]> {
    const result = await this.memberModel
      .find({memberStatus: MemberStatus.ACTIVE, memberPoints: {$gte: 1}})
      .sort({memberPoints: -1})
      .limit(4)
      .exec();

    if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);

    return result;
  }

  public async addUserPoints(member: Member, point: number): Promise<Member> {
    const memberId = shapeIntoMongooseObjectId(member._id);
    return await this.memberModel
      .findOneAndUpdate(
        {
          _id: memberId,
          memberType: MemberType.USER,
          memberStatus: MemberStatus.ACTIVE,
        },
        {$inc: {memberPoints: point}},
        {new: true}
      )
      .exec();
  }
  //***** bssr ****

  // typescipda void ==> hech narsani qaytarmasligini yozishimisz kk
  public async processSignup(input: MemberInput): Promise<Member> {
    // const exist = await this.memberModel
    //   .findOne({ memberType: MemberType.RESTAURANT })
    //   .exec();
    // console.log("exist:", exist);
    // if (exist) throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);

    // console.log("before", input.memberPassword);
    const salt = await bcrypt.genSalt();
    input.memberPassword = await bcrypt.hash(input.memberPassword, salt);
    console.log("after", input.memberPassword);

    try {
      const result = await this.memberModel.create(input); //create static method

      // const tempResult = new this.memberModel(input);
      // const result = await tempResult.save();
      result.memberPassword = "";
      return result;
    } catch (err) {
      throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
    }
  }

  public async processLogin(input: LoginInput): Promise<Member> {
    const member = await this.memberModel
      .findOne(
        {memberNick: input.memberNick},
        {memberNick: 1, memberPassword: 1}
      )
      .exec();
    if (!member) throw new Errors(HttpCode.NOT_FOUND, Message.NO_NUMBER_NICK);

    const isMatch = await bcrypt.compare(
      input.memberPassword,
      member.memberPassword
    );
    // const isMatch = input.memberPassword === member.memberPassword;

    console.log("isMatch", isMatch);
    if (!isMatch) {
      throw new Errors(HttpCode.UNAUTHORIZED, Message.WRONG_PASSWORD);
    }

    return await this.memberModel.findById(member._id).lean().exec();
  }

  //getUsers

  public async getUsers(): Promise<Member[]> {
    const result = await this.memberModel
      .find({memberType: MemberType.USER})
      .exec();

    if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);

    return result;
  }

  public async updateChosenUser(input: MemberUpdateInput): Promise<Member[]> {
    input._id = shapeIntoMongooseObjectId(input._id);

    const result = await this.memberModel
      .findByIdAndUpdate({_id: input._id}, input, {new: true})
      .exec();

    if (!result) throw new Errors(HttpCode.NOT_MODIFIED, Message.UPDATE_FAILED);

    return result;
  }
}

export default MemberService;
