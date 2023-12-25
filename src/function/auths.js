import auth from "../model/table/auth.js";
import bcrypt from "bcrypt";
import { UUID } from "sequelize";

const findUser = async (username, password)=>{
    const user = await auth.findOne({
        where : {username}
    })
    if(user){
        const compare = await bcrypt.compare(password, user.password);
        if(compare){
            return user;
        }
    };
    return false;
}

const registerAccount = async (username, email, password)=>{
    const idUser = `user_` + UUID(10);
    const hashPassword = await bcrypt.hash(password, 10)
    const user = await auth.create({
        idUser,
        username : username,
        email : email,
        password : hashPassword
    })
    return user;
}

export {findUser, registerAccount};