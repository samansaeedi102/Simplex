import { NextFunction, Response } from "express";
import { MyRequest } from "../../utils/types/req";
import { addBlogService } from "../../services/blog/addBlogService";


export const addBlogApi = async (
    req: MyRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const {data} = await addBlogService({
            inputs: {
                ...req.body,
                author: req.user._id,
            }
        });
        return res.json(data);
    } catch(err) {
        return (next(err));
    }
}
