import mongoose, { Schema } from "mongoose";
import { MemberStatus, MemberType } from "../libs//enum/member.enum";

//new classlardan object yasash
const memberSchema = new Schema(
  {
    memberType: {
      type: "String",
      enum: MemberType,
      default: MemberType.USER,
    },

    memberStatus: {
      type: "string",
      enum: MemberStatus,
      default: MemberStatus.ACTIVE,
    },

    memberNick: {
      type: "string",
      index: { unique: true, sparse: true },
      required: true,
    },

    memberPhone: {
      type: "string",
      index: { unique: true, sparse: true },
      required: true,
    },

    memberPassword: {
      type: "string",
      select: false,
      required: true,
    },
    memberAddress: {
      type: "string",
    },
    memberDesc: {
      type: "string",
    },

    memberImage: {
      type: "string",
    },
    memberPoints: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true } //createdAt, UpdatedAt
);

export default mongoose.model("Member", memberSchema);
