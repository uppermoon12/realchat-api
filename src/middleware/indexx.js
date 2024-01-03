import jwt from "jsonwebtoken";


const token = async (req, res, next) => {
    let token = req.cookies.token;
    try {
        jwt.verify(token, process.env.SECRET_KEY,async (err,decoded)=>{
           req.username = decoded.username;
            next
        });
    } catch (error) {
        console.log(error);
    }
}

export default token;