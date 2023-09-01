import { NextFunction, Response } from "express";
import { MyRequest } from "../../utils/types/req";
import { updateBlogService } from "../../services/blog/updateBlogService";

export const updateBlogApi = async (
    req: MyRequest,
    res: Response,
    next: NextFunction,
    ) => {
    try {
      const { data } = await updateBlogService({
        inputs: {
          ...req.body,
          adminId: req.user._id,
        }
    });
  
      return res.json(data);
    } catch (err) {
      return next(err);
    }
  };