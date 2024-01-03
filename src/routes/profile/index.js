import {Router} from "express";
import { addFriend, getAllProfileUser, getConversation, getConversationAnotherVersion, profile } from "../../controller/profile/index.js";
import token from "../../middleware/indexx.js";




const profileRouter = Router();

profileRouter.get("/test", profile,token)
profileRouter.get("/conversation",getConversation)
profileRouter.get("/getAllProfile",getAllProfileUser)

profileRouter.get("/conversationAnother", getConversationAnotherVersion)

profileRouter.post("/friend", addFriend)
export default profileRouter;
