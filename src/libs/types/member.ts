import { Session } from ".express-session";
import { Request } from "express";
import { MemberType, MemberStatus } from "../enums/member.enum";
import { ObjectId } from "mongoose";

export interface Member {
  _id: ObjectId;
  memberType: MemberType;
  memberStatus: MemberStatus;
  memberNick: string;
  memberPhone: string;
  memberPassword?: string; //databasedan qaytadigan malumot
  memberAdress?: string;
  memberDesc?: string;
  memberImage?: string;
  memberPoints: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface MemberInput {
  memberType?: MemberType;
  memberStatus?: MemberStatus;
  memberNick: string;
  memberPhone: string;
  memberPassword: string; //borayotgan
  memberAdress: string;
  memberDesc: string;
  memberImage: string;
  memberPoints: string;
}

export interface LoginInput {
  memberNick: string;
  memberPassword: string;
}

export interface MemberUpdateInput {
  _id: ObjectId;
  memberStatus?: MemberStatus;
  memberNick?: string;
  memberPhone?: string;
  memberPassword?: string; //borayotgan
  memberAdress?: string;
  memberDesc?: string;
  memberImage?: string;
}

export interface AdminRequest extends Request {
  member: Member;
  session: Session & { member: Member };
  file: Express.Multer.File;
  files: Express.Multer.File[];
}
