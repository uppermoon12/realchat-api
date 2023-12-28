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
        defaultValue : null 
    },
    browser: {
        type : db.Sequelize.STRING,
        defaultValue : null
    },
},{
    timestamps : false
})

userInfo.sync({alter : true}).then(()=>{
    console.log("userInfo table created")
})

export default userInfo;