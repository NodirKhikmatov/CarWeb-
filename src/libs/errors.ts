export enum HttpCode {
  OK = 200,
  CREATED = 201,
  NOT_MODIFIED = 304,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

export enum Message {
  SOMETHING_WENT_WRONG = "Something went wrong",
  NO_DATA_FOUND = "no data is found",
  CREATE_FAILED = "create is failed",
  UPDATE_FAILED = "update is failed",

  NO_MEMBER_NICK = "No member with that member nick!",
  TOKEN_CREATION_FAILED = "Token creation error",
  NO_NUMBER_NICK = "you are inserting already used nick or phone!",
  WRONG_PASSWORD = "wrong password entered, please try again!",
  BLOCKED_USER = "User is blocked,  please contact Restaurant!",
  USED_NICK_PHONE = "Nick or phone is already used!",
  NOT_AUTHENTICATED = "Please login first!",
}

//inheritance

class Errors extends Error {
  public code: HttpCode;
  public message: Message;

  static standard = {
    code: HttpCode.INTERNAL_SERVER_ERROR,
    message: Message.SOMETHING_WENT_WRONG,
  };
  constructor(statusCode: HttpCode, statusMessage: Message) {
    super();
    this.code = statusCode;
    this.message = statusMessage;
  }
}

export default Errors;
