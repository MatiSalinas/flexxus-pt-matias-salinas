import { Request, Response } from "express"
import { registerNewUser, loginUser} from "../services/auth.service"
import { Auth } from "../interfaces/auth.interface"
import { handleHttpError } from "../utils/error.handle"

const registerController = async (req: Request, res: Response)  => {
    try {
        const  dataUser : Auth = req.body;
        const responseUser = await registerNewUser(dataUser);
        if (responseUser === "EMAIL_ALREADY_EXISTS") {
            res.status(409).send({
                success: false,
                message:"email already in use"});
            return;
        }
        res.status(201).send({
            success:true,
            message:"user created succesfully"});
        
    } catch (error) {
        handleHttpError(res, "ERROR_REGISTER_USER", error);
    }
    
}
const loginController = async (req: Request, res: Response) => {
    try {
        const  dataUser : Auth = req.body;
        const responseUser = await loginUser(dataUser);
        if (responseUser === "INCORRECT_EMAIL_OR_PASSWORD") {
            res.status(403).send({
                success:false,
                message:"incorrect email or password"});
            return;
        }
        res.status(200).send(responseUser);
    } catch (error) {
        handleHttpError(res, "ERROR_LOGIN_USER", error);
    }
}

export {registerController,loginController};