import {Router} from "express";
import { login, register, verifLogin } from '../../controller/auth/index.js';



const authRouter = Router();

authRouter.get("/test", login)

authRouter.post("/login", login)
authRouter.post("/register", register)
authRouter.post('/verifLogin', verifLogin)

export default authRouter;