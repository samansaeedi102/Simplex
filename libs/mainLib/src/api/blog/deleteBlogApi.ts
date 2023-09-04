import { NextFunction, Response } from "express";
import { MyRequest } from "../../utils/types/req";
import { deleteBlogService } from "../../services/blogService/deleteBlogService";

export const deleteBlogApi = async (
  req: MyRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { data } = await deleteBlogService({
      inputs: {
        _id: req.params.id,
        adminId: req.user._id as string,
      }
    });

    return res.json(data);
  } catch (err) {
    return next(err);
  }
};
