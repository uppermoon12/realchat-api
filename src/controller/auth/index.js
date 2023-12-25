import { findUser, registerAccount } from "../../function/auths.js";

 const login = async (req,res) => {
    // Logic for handling login request
    const {username, password} = req.body;
    const user = await findUser(username, password);
    if(!user){
        return res.status(400).json({message:"Username or password is wrong"})
    }
    return res.status(200).json({message:"Login successful"})
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
    // Logic for handling logout request
};

export { login, register, logout };