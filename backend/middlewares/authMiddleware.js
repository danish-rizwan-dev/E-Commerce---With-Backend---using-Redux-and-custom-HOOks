import constants from "../constants.js"
import jwt from "jsonwebtoken";

export function AuthMiddleware(req, res, next) {
    try {
        const token = req.headers.authorization;
        console.log(token);
        
        const payload = jwt.verify(token, constants.SECRET);
        console.log("Payload",payload);
        req.userId = payload.userId;
        req.isAuth = true;
        next();
    } catch (error) {
        req.isAuth = false;
        next();
    }
}