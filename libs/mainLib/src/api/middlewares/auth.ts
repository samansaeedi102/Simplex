import {CONFIG} from "../../../../utils/src/lib/config/config"
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { MyRequest} from "../../../../mainLib/src/utils/types/req";

export const ValidateSignature = async (req: MyRequest) => {
  const signature = req.get("Authorization");

  const addUserToReq = () => {
    try {
      const payload: any = jwt.verify(signature, CONFIG().APP_SECRET as string);
      req.user = payload;
      return true;
    } catch (error) {
      return false;
    }
  };

  return signature ? addUserToReq() : false;
};

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  const isAuthorized = await ValidateSignature(req as MyRequest);

  return isAuthorized
    ? next()
    : res.status(401).json({ message: "Not Authorized" });
};

export const checkAuth = async (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  await ValidateSignature(req as MyRequest);
  return next();
};

export default auth;
