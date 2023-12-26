import { findUser, registerAccount } from "../../function/auths.js";
import token from "../../middleware/indexx.js";
import img from "../../model/table/foto.js";

 const login = async (req,res) => {
    // Logic for handling login request
    const {username, password} = req.body;
    const user = await findUser(username, password);
    if(!user){
        return res.status(400).json({message:"Username or password is wrong"})
    }
    const token = jwt.sign({username : user.username}, process.env.SECRET_KEY, {expiresIn : "30d"})
    return res.cookie("token", token,{
        httpOnly : true,
        secure : true,
        sameSite : "none",
        maxAge : 1000 * 60 * 60 * 24 * 30
    })
    .res.status(200)
    .json({message:"Login successful", data : user})
};

 const register = async(req, res) => {
    const {username, email, password} = req.body;
    // Logic for handling register request
    if(!username || !email || !password){
        return res.status(400).json({message:"Please fill all the fields"})
    }
    await registerAccount(username, email, password);
    return res.status(200).json({message:"Register successful"})
};

 const logout = (req, res) => {
    return res.clearCookie("token")
    .status(200)
    .json({message:"Logout successful"})
};

export { login, register, logout };