import { NextFunction, Request, Response } from "express";
import { logInService } from "../../services/user/logInService"


export const logInApi = async (
  req: Request,
  res: Response,
  next: NextFunction,
  redisConnections: any,
) => {
  try {
    const { phone, code } = req.body;

    const { data } = await logInService({
      inputs: {
        phone,
        code,
      },
      redisConnections,
    });
    return res.json(data);
  } catch (err) {
    return next(err);
  }
};
