import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt.handle";
const checkJWT = (req: Request, res: Response, next: NextFunction) => {
    try {
        const jwtByUser = req.headers.authorization || "";
        const jwt = jwtByUser.split(" ").pop();
        const isOk = verifyToken(`${jwt}`);
        if (!isOk) {
            return res.status(401).send({message: "Invalid token"});
        }
        console.log(isOk);
        next();
    } catch (error) {
        res.status(400).send({message: "Invalid token", error: error });
    }
}