import { Request, Response } from "express"
import { registerNewUser, loginUser} from "../services/auth.service"
const registerController = async (req: Request, res: Response) => {
    const responseUser = await registerNewUser()
}
const loginController = async (req: Request, res: Response) => {
    
}

export {registerController,loginController}