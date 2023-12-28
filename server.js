import express  from "express";
import cors from "cors"
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

const app = express();
import profileRouter from "./src/routes/profile/index.js";
import authRouter from "./src/routes/auth/index.js";

const corsOptions = {
    origin: ["http://localhost:3001"],
    credentials: true,
    exposedHeaders: ["set-cookie"]
}

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const port = process.env.PORT || 3000;

app.use('/api',(req,res)=>{
    return res.status(200).json({message:"api connected!"})
})
app.use('/auth',authRouter)
app.use('/profile',profileRouter)


app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})