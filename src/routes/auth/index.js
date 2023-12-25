import {Router} from "express";
import { login, register } from '../../controller/auth/index.js';



const authRouter = Router();

authRouter.get("/test", login)

authRouter.post("/login", login)
authRouter.post("/register", register)

export default authRouter;