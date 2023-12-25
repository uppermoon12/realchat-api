import {Router} from "express";
import { getConversation, profile } from "../../controller/profile/index.js";




const profileRouter = Router();

profileRouter.get("/test", profile)
profileRouter.get("/conversation",getConversation)

export default profileRouter;
