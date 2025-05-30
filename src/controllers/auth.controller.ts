import { Request, Response } from "express"
import { registerNewUser, loginUser} from "../services/auth.service"
import { Auth } from "../interfaces/auth.interface"
import { handleHttpError } from "../utils/error.handle"
const registerController = async (req: Request, res: Response) => {
    try {
        const  dataUser : Auth = req.body;
        const responseUser = await registerNewUser(dataUser);
        if (responseUser === "EMAIL_ALREADY_EXISTS") {
            return res.status(400).send("El correo ya existe");
        }
        res.status(201).send("usuario creado con exito");
    } catch (error) {
        handleHttpError(res, "ERROR_REGISTER_USER", error);
    }
    
}
const loginController = async (req: Request, res: Response) => {
    try {
        const  dataUser : Auth = req.body;
        const responseUser = await loginUser(dataUser);
        if (responseUser === "INCORRECT_EMAIL_OR_PASSWORD") {
            return res.status(403).send("Correo o contraseña incorrectos");
        }
        res.status(201).send(responseUser);
    } catch (error) {
        handleHttpError(res, "ERROR_LOGIN_USER", error);
    }
}

export {registerController,loginController};