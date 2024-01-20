import jwt from "jsonwebtoken";


const token = async (req, res, next) => {
    let token = req.cookies.token;
    try {
        jwt.verify(token, process.env.SECRET_KEY,async (err,decoded)=>{
            if(err){
                res.status(401).json({
                    status: 'error',
                    message: 'token invalid'
                })
            }
           req.username = decoded.username;
            next
        });
    } catch (error) {
        console.log(error);
    }
}

export default token;