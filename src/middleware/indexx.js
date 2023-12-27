import jwt from "jsonwebtoken";
import { findUser } from "../function/auths.js";


const token = (req, res, next) => {
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({message:"You are not authorized"})
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        username = decoded.username;
        next();
    } catch (error) {
        return res.status(401).json({message:"You are not authorized"})
    }
}

export default token;