import {Router} from "express";
import { getAllProfileUser, getConversation, getConversationAnotherVersion, profile } from "../../controller/profile/index.js";




const profileRouter = Router();

profileRouter.get("/test", profile)
profileRouter.get("/conversation",getConversation)
profileRouter.get("/getAllProfile",getAllProfileUser)

profileRouter.get("/conversationAnother", getConversationAnotherVersion)

export default profileRouter;
