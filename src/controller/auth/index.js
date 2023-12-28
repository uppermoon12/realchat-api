import { findUser, registerAccount } from "../../function/auths.js";
import token from "../../middleware/indexx.js";
import img from "../../model/table/foto.js";
import jwt from "jsonwebtoken";
import userInfo from "../../model/table/userInfo.js";
import { mailOptions, transporter } from "../../middleware/email.js";

 const login = async (req,res) => {

    // Logic for handling login request
    const {username, password} = req.body;
    const userAgent = req.headers['user-agent'];
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const user = await findUser(username, password,ip,userAgent);
    try {
        

    if(!user){
        return res.status(400).json({message:"Username or password is wrong"})
    }    
    const alreadyLogin = await userInfo.findOne({where : {username : username}})
    if(alreadyLogin.browser === null){
    const token = jwt.sign({username : user.username}, process.env.SECRET_KEY, {expiresIn : "30d"})
    await userInfo.update({
        ip : ip,
        browser : userAgent
    },{where : {username : username}
    })
    return res.cookie("token", token,{
        httpOnly : true,
        secure : true,
        sameSite : "none",
        maxAge : 1000 * 60 * 60 * 24 * 30
    })
    .status(200)
    .json({message:"Login successful", data : user})
}
        
    if(alreadyLogin.browser !== userAgent){
        const email = user.email;
        const code = Math.floor(Math.random() * 1000000);
        console.log(code)
        const verifToken = jwt.sign({code,username,password}, process.env.SECRET_KEY, {expiresIn : "3m"})
        transporter.sendMail(mailOptions (await email,code), (err, info)=>{
            if(err){
                console.log(err)
            }else{
                console.log("Message sent : %s",info.response)
            }
        })
        return res.cookie("verifToken", verifToken,{
            httpOnly : true,
            secure : true,
            sameSite : "none",
            maxAge : 30000
        })
        .status(200).json({
            status : "success",
            message:"you need to verify your account first"
        })
        
    };
    const token = jwt.sign({username : user.username}, process.env.SECRET_KEY, {expiresIn : "30d"})
    return res.cookie("token", token,{
        httpOnly : true,
        secure : true,
        sameSite : "none",
        maxAge : 1000 * 60 * 60 * 24 * 30
    })
    .status(200)
    .json({message:"Login successful", data : user})
} catch (error) {
    return res.status(500).json({
        status : "error",
        message : error.message
    })       
}
    
};

const verifLogin = async(req,res)=>{
    const verifCode = req.body.verifCode;
    const cookie = req.cookies;
    if(!cookie){
        return res.status(400).json({message:"Please login first"})
    }
    const verifToken = cookie.verifToken;

    if(!verifCode){
        return res.status(400).json({message:"please login first!"})
    }
    jwt.verify(verifToken, process.env.SECRET_KEY, (err, decoded)=>{
        if(err){
            return res.status(400).json({message:"please login first!"})
        }
        const code = decoded.code;
        const username = decoded.username;
        const password = decoded.password;
        if(verifCode === code){
            const userAgent = req.headers['user-agent'];
            const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
            userInfo.update({
                ip : ip,
                browser : userAgent
            },{where : {username : username}
            })
            const user = (username, password);
            const token = jwt.sign({username : user.username}, process.env.SECRET_KEY, {expiresIn : "30d"})
            return res.cookie("token", token,{
                httpOnly : true,
                secure : true,
                sameSite : "none",
                maxAge : 1000 * 60 * 60 * 24 * 30
            })
            .status(200).json({message:"Login successful", data : user})
        }
        return res.status(400).json({message:"Verification code is wrong"})
    })

}

 const register = async(req, res) => {
    const {username, email, password} = req.body;
    const userAgent = req.headers['user-agent'];
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    // Logic for handling register request
    if(!username || !email || !password){
        return res.status(400).json({message:"Please fill all the fields"})
    }
    await registerAccount(username, email, password,userAgent,ip);
    return res.status(200).json({message:"Register successful"})
};

 const logout = (req, res) => {
    return res.clearCookie("token")
    .status(200)
    .json({message:"Logout successful"})
};

export { login,verifLogin, register, logout };