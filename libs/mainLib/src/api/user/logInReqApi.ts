import { NextFunction, Request, Response } from "express";
import { logInReqService } from "../../services/user/logInReqService";

export const logInReqApi = async (
  req: Request,
  res: Response,
  next: NextFunction,
  redisConnections: any,
) => {
  try {
    const { phone } = req.body;
    const { data } = await logInReqService({
      inputs: {
        phone
      },
      redisConnections,
    });
    return res.json(data);
  } catch (err) {
    return next(err);
  }
};
