import jwt from "jsonwebtoken";
import { errorHandler } from "./ErrorHandler.js";

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;

    if (!token) return next(errorHandler(402,"You are not authenticated!"))

    jwt.verify(token, process.env.JWT_SECERET, (err, user) => {
        if (err) return next(errorHandler(403,"Invalid Token!"))
        req.user = user;
        next();
    })
}