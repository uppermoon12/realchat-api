import auth from "../model/table/auth.js";
import bcrypt from "bcrypt";
import img from "../model/table/foto.js";




const findUser = async (username, password)=>{
    const user = await auth.findOne({where: {username}})
    if(user){
        const imgUser = await img.findOne({where : {id : user.imgId}})
        const compare = await bcrypt.compare(password, user.password);
        if(compare){
            return {
                user,
                img : imgUser.img
            };
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