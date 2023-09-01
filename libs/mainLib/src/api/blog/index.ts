import { Express } from "express";
import { addBlogApi } from "./addBlogApi";
import { MyRequest } from "../../utils/types/req";
import { deleteBlogApi } from "./deleteBlogApi";
import { getBlogsApi } from "./getBlogsApi";
import { updateBlogApi } from "./updateBlogApi";

export const blogApi = (
    app: Express,
) => {
    //Get all the blogs
    app.get("/blog/blogs", async (req,res, next) => {
        getBlogsApi(req as MyRequest, res, next)
    })
    //Add new blog 
    app.post("/blog/add", async (req,res, next) => {
        addBlogApi(req as MyRequest, res, next);
    })
    //Update and existing blog
    app.put("/blog/update", async (req,res, next) => {
        updateBlogApi(req as MyRequest, res, next)
    })
    //Delete a blog
    app.delete("/blog/delete/:id", async (req,res, next) => {
        deleteBlogApi(req as unknown as MyRequest, res, next);
    })
};

