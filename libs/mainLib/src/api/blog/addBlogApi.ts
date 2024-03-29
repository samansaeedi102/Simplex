import { NextFunction, Response } from "express";
import { MyRequest } from "../../utils/types/req";
import { addBlogService } from "../../services/blogService/addBlogService";


export const addBlogApi = async (
    req: MyRequest,
    res: Response,
    next: NextFunction,
    redisConnections: any
) => {

    try {
        const {data} = await addBlogService({
            inputs: {
                ...req.body,
                author: req.user._id,
            },
            redisConnections
        });
        return res.json(data);
    } catch(err) {
        return (next(err));
    }
}
