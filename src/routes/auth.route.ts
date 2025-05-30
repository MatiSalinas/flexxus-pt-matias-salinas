import { Router } from "express";
import { registerController, loginController } from "../controllers/auth.controller";
const authRouter = Router();

authRouter.post("/login")
authRouter.post("/register")

export default authRouter;