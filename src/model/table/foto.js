import db from "../../config/database/index.js";
import { Sequelize } from "sequelize";
import moment from "moment-timezone";
import auth from "./auth.js";

const img = db.define("img", {
    img : {
        type : Sequelize.STRING,
        allowNull : false,
        defaultValue : "default.png"
    },
    createdAt : {
        type : Sequelize.STRING,
        allowNull : false,
        defaultValue : moment.tz("Asia/Jakarta").format("YYYY-MM-DD HH:mm:ss")
    },
}, {
    timestamps : false

})


img.sync().then(()=>{
    console.log("img table created")
})   


export default img;