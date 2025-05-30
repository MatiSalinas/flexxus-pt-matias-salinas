import { Router } from "express";
import { registerController, loginController } from "../../controllers/auth.controller";
const authRouter = Router();

authRouter.post("/login",loginController);
authRouter.post("/register", registerController);

export default authRouter;