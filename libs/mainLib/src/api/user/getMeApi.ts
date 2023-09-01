import { NextFunction, Response } from "express";
import {MyRequest} from "../../utils/types/req";
import {getUserService} from "../../services/user/getUserService";
import { GetUserInp } from "../../database/repository/userRepo/getUserRepo";

export const getMeApi = async (
  req: MyRequest,
  res: Response,
  next: NextFunction,
  redisConnections: any,
) => {
  try {
    const inputs: GetUserInp = {
      _id: req.user._id.toString(),
      kids: req.query.kids
        ? JSON.parse((req.query.kids as string).toLowerCase())
        : undefined,
      city: req.query.city
        ? JSON.parse((req.query.city as string).toLowerCase())
        : undefined,
      province: req.query.province
        ? JSON.parse((req.query.province as string).toLowerCase())
        : undefined,
      allElixir: req.query.allElixir
        ? JSON.parse((req.query.allElixir as string).toLowerCase())
        : undefined,
      avatar: req.query.avatar
        ? JSON.parse((req.query.avatar as string).toLowerCase())
        : undefined,
      kidAvatar: req.query.kidAvatar
        ? JSON.parse((req.query.kidAvatar as string).toLowerCase())
        : undefined,
    };

    const { data } = await getUserService({
      inputs,
      redisConnections,
    });

    return res.json(data);
  } catch (err) {
    return next(err);
  }
};
