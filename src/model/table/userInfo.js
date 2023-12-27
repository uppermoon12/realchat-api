import db from "../../config/database/index.js"

const userInfo = db.define("userInfo", {
    idUser :{
        type : db.Sequelize.STRING,
        allowNull : false,
    },
    username : {
        type : db.Sequelize.STRING,
        allowNull : false
    },
    ip: {
        type : db.Sequelize.STRING,
        allowNull : false
    },
    browser: {
        type : db.Sequelize.STRING,
        allowNull : false
    },
},{
    timestamps : false
})

userInfo.sync().then(()=>{
    console.log("userInfo table created")
})

export default userInfo;