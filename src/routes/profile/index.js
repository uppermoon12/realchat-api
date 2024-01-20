import {Router} from "express";
import { addFriend, getAllProfileUser, getConversation, getConversationAnotherVersion, getFriend, profile } from "../../controller/profile/index.js";
import token from "../../middleware/indexx.js";




const profileRouter = Router();

// profileRouter.use(token)
profileRouter.get("/test", profile)
profileRouter.get("/conversation",getConversation)
profileRouter.get("/getAllProfile",getAllProfileUser)

profileRouter.get("/conversationAnother", getConversationAnotherVersion)

profileRouter.post("/friend", addFriend)
profileRouter.get('/friendList', getFriend)
export default profileRouter;
