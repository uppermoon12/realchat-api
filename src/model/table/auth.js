import db from "../../config/database/index.js";
import { Sequelize } from "sequelize";
import moment from "moment-timezone";
import img from "./foto.js";

const auth = db.define("auth", {
    id: {
        type : Sequelize.INTEGER,
        allowNull : false,
        autoIncrement : true,
        primaryKey : true
    },
    idUser : {
        type : Sequelize.STRING,
        allowNull : false,
    },
    username : {
        type : Sequelize.STRING,
        allowNull : false
    },
    email: {
        type : Sequelize.STRING,
        allowNull : false
    },
    imgId: {
        type : Sequelize.INTEGER,
        allowNull : false
    },
    password : {
        type : Sequelize.STRING,
        allowNull : false
    },
    createdAt : {
        type : Sequelize.STRING,
        allowNull : false,
        defaultValue : moment.tz("Asia/Jakarta").format("YYYY-MM-DD HH:mm:ss")
    },
}, {
    timestamps : false

})

auth.sync().then(()=>{
    console.log("auth table created")
})


export default auth;