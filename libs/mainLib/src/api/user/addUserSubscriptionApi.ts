import { MyRequest } from "../../utils/types/req";
import { NextFunction, Response } from "express";
import { addUserSubscriptionService } from "../../services/user/addUserSubscriptionService";

export const addUserSubscriptionApi = async (
    req: MyRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { data } = await addUserSubscriptionService({
        inputs: {
          _id: req.user._id.toString(),
          duration: req.body.duration,
          description: req.body.description,
        }
      });
  
      return res.json(data);
    } catch (err) {
      return next(err);
    }
  };