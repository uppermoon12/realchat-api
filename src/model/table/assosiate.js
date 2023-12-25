import auth from "./auth";
import img from "./foto";

img.hasOne(auth,{
    foreignKey : "userId"
})
