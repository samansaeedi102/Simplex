import { Request } from "express";
import { IUser } from "../../database/models/User";

export interface MyRequest extends Request {
  user: IUser;
}
