import jwt from "jsonwebtoken";
import {CONFIG} from "../config/config";

export const generateSignature = (payload: any) => {
     return jwt.sign(payload, CONFIG().APP_SECRET);
    
}