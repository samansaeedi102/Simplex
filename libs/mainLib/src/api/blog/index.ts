import { Express } from "express";
import { addBlogApi } from "./addBlogApi";
import { MyRequest } from "../../utils/types/req";
import { deleteBlogApi } from "./deleteBlogApi";
import { getBlogsApi } from "./getBlogsApi";
import { updateBlogApi } from "./updateBlogApi";
import { auth }  from "../middlewares/auth"

export const blogApi = (
    app: Express,
    redisConnections: any
) => {
    //Get all the blogs
    app.get("/blog/blogs", 
    (req,res, next) => {
        getBlogsApi(req as MyRequest, res, next)
    })
    //Add new blog 
    app.post("/blog/add", 
    (req, res, next) => auth(req, res, next),
    (req,res, next) => {
        addBlogApi(req as MyRequest, res, next, redisConnections);
    })
    //Update and existing blog
    app.put("/blog/update", (req,res, next) => {
        updateBlogApi(req as MyRequest, res, next)
    })
    //Delete a blog
    app.delete("/blog/delete/:id", (req,res, next) => {
        deleteBlogApi(req as unknown as MyRequest, res, next);
    })
};

