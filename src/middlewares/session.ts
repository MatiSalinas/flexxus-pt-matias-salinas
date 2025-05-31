import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt.handle";
const checkJWT = (req: Request, res: Response, next: NextFunction) => {
    try {
        const jwtByUser = req.headers.authorization || "";
        const jwt = jwtByUser.split(" ").pop();
        const isOk = verifyToken(`${jwt}`);
        if (!isOk) {
            res.status(401).send({
                success:false,
                message: "Invalid token"});
            return;
        }
        req.user = isOk; // no le encuentro solucion a este problema de typescript, intente solucionarlo con el archivo en types/express segun un post de stack overflow
        // aun asi funciona...
        next();
    } catch (error) {
        res.status(400).send({message: "Invalid token", error: error });
    }
}
const checkRole = (roles: number[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const user = req.user;
        if (!user) {
            res.status(401).send({message: "Invalid token"});
            return;
        }
        if (!roles.includes(user.id_rol)){
            res.status(403).send({
                success:false,
                message: "Unauthorized"});
            return;
        }
        next();
    }
}

export { checkJWT, checkRole };