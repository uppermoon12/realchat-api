import auth from "../model/table/auth.js";
import bcrypt from "bcrypt";
import img from "../model/table/foto.js";
import userInfo from "../model/table/userInfo.js";




const findUser = async (username, password,ip,userAgent)=>{
    const user = await auth.findOne({where: {username}})
    if(user){
        const compare = await bcrypt.compare(password, user.password);
        const imgUser = await img.findOne({where : {id : user.imgId}})
        const alreadyLogin = await userInfo.findOne({where : {username : username, ip : ip, browser : userAgent}})
            if(compare){
                return {
                    id : user.id,
                    idUser : user.idUser,
                    username : user.username,
                    email : user.email,
                    img : imgUser.img,
                    browser : alreadyLogin ? alreadyLogin.browser : userAgent ? userAgent : null,
                    createdAt : user.createdAt
                }
            }
        };
    return false;
}

const registerAccount = async (username, email, password)=>{
    const idUser = `user_` + Math.floor(Math.random() * 1000000);
    const hashPassword = await bcrypt.hash(password, 10)
    await img.create().then((data)=>{
        auth.create({
            idUser,
            username : username,
            email : email,
            password : hashPassword,
            imgId : data.id
        })
    
    })
}

export {findUser, registerAccount};