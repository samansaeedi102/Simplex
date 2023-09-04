import { NextFunction, Response } from "express";
import { MyRequest } from "../../utils/types/req";
import { getBlogsService } from "../../services/blogService/getBlogsService";
import { GetBlogsInp } from "../../database/repository/blogRepo/getBlogsRepo";

export const getBlogsApi = async (
    req: MyRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const inputs: GetBlogsInp = {
        documents: req.query.documents
          ? JSON.parse((req.query.documents as string).toLowerCase())
          : undefined,
        author: req.query.author
          ? JSON.parse((req.query.author as string).toLowerCase())
          : undefined,
        filterAuthor: req.query.filterAuthor
          ? (req.query.filterAuthor as string)
          : undefined,
        filterDeleted: req.query.filterDeleted
          ? JSON.parse((req.query.filterDeleted as string).toLowerCase())
          : undefined,
        adminId: req.user
          ? req.user._id as string
          : undefined,
        // page: req.query.page
        //   ? Number(req.query.page as string)
        //   : undefined,
        // take: req.query.take
        //   ? Number(req.query.take as string)
        //   : undefined,
      };
  
      const { data } = await getBlogsService({
        inputs
      });
  
      return res.json(data);
    } catch (err) {
      return next(err);
    }
  };