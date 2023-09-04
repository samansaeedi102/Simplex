import {Express} from "express";
import mongoose from "mongoose";
import {MyRequest} from "../../utils/types/req";
import { addUserSubscriptionApi } from "./addUserSubscriptionApi";
import { getUsersApi } from "./getUsersApi";
import { getUserApi} from "./getUserApi"
import { logInApi} from './logInApi';
import { auth } from "../middlewares/auth";
import { logInReqApi } from "../user/logInReqApi"
import { updateUserByTokenApi } from "./updateUserByTokenApi";

export const userApi = (
    app: Express,
    redisConnections: any
) => {
    app.get(
        "/", (req, res, next) => {
        res.json("just simplex text");
    });
    app.get(
        "/delete/everything", async (req, res, next) => {
        const removeDb = await mongoose.connection.db.dropDatabase();
        return res.json(removeDb);
    });
    // app.post(
    //     "/user/create/admin", (req, res, next) => {
    //     createAdmin(req, res, next)
    // });
    app.post(
        "/user/logInReq", (req, res, next) => {
        logInReqApi(req, res, next, redisConnections)
    });
    app.post(
        "/user/add/subscription",
        (req, res, next) => auth(req, res,next),
        (req, res, next) => addUserSubscriptionApi(req as MyRequest, res, next)    
    );
    app.post(
        "/user/logIn", 
        (req, res, next) => logInApi(req, res, next, redisConnections)
    );
    app.get(
        "/user/getany/:_id",
        (req, res, next) => getUserApi(req, res, next, redisConnections)
    );
    app.put(
        "/user/update",
        (req, res, next) => auth(req, res, next),
        (req, res, next) => updateUserByTokenApi(req as MyRequest, res, next, redisConnections)
    );
    app.get(
        "/user/users",
        (req, res, next) => getUsersApi(req, res, next)
    );
};