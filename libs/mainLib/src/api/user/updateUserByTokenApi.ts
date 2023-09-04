import { NextFunction, Response } from "express";
import { updateUserService } from "../../services/userService/updateUserService";
import { MyRequest } from "../../utils/types/req";

export const updateUserByTokenApi = async (
  req: MyRequest,
  res: Response,
  next: NextFunction,
  redisConnections: any,
) => {
  try {
    const _id = req.body._id ? req.body._id : req.user._id.toString();
    const adminId = req.body._id ? req.user._id.toString() : undefined;
    console.log(_id, adminId)
    const { data } = await updateUserService({
      inputs: {
        ...req.body,
        _id,
        adminId,
      },
      redisConnections,
    });

    return res.json(data);
  } catch (err) {
    return next(err);
  }
};
