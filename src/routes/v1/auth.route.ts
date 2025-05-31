import { Router } from "express";
import { registerController, loginController } from "../../controllers/auth.controller";
import { validateBody } from "../../middlewares/zod.validate";
import { loginSchema, registerSchema } from "../../validations/auth.schema";
const authRouter = Router();

authRouter.post("/login",validateBody(loginSchema),loginController);
authRouter.post("/register",validateBody(registerSchema),registerController);

export default authRouter;