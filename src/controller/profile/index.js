import moment from "moment-timezone";
import token from "../../middleware/indexx.js";

const user = [
    {
        id: 1,
        name: 'John Doe2222',
        email: 'johndoe@gmail.com'
    },
    {
        id: 2,
        name: 'Jane Doe',
        email: 'johndoe2@gmail.com'
    },
    {
        id: 3,
        name: 'John Doe3',
        email: 'jonhdoe3@gmail.com'
    },{
        id: 4,
        name: 'ler5',
        email: 'ler5@gmail.com'
    }
]
const fotoUrl = [
    {
        id : 1,
        url : 'http://localhost:3000/images/1.jpg'
    },
    {
        id : 2,
        url : 'http://localhost:3000/images/2.jpg'
    },
]
const rate = [
    {
        id : 1,
        rate : 4
    },
    {
        id : 2,
        rate : 5
    },  
    {
        id : 2,
        rate : 3.5
    },
    {
        id : 2,
        rate : 4
    },
]
const status = [
    {
        id : 1,
        status : 'online'
    },
    {
        id : 2,
        status : 'offline'
    },
    {
        id : 3,
        status : 'online'
    },
]
const conversation = [
    {
        idConversation : 1,
        message : 'hello',
        sender : 1,
        receiver : 2,
        date : moment.tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss'),
    },
    {
        idConversation : 1,
        message : 'hello',
        sender : 2,
        receiver : 1,
        date : moment.tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss'),
    },
    {
        idConversation : 2,
        message : 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum',
        sender : 3,
        receiver : 1,
        date : moment.tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss'),
    },
    {
        idConversation : 2,
        message : 'hello',
        sender : 1,
        receiver : 3,
        date : moment.tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss'),
    },{
        idConversation : 1,
        message: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum lore lorem ipsum lorem ipsum',
        sender : 1,
        receiver : 2,
        date : moment.tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss'),
    },{
        idConversation : 1,
        message: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem',
        sender : 2,
        receiver : 1,
        date : moment.tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss'),
    }

]

const friend = []

const profile = async (req, res) => {
    const {u} = req.query;
    const newData =  user.
    filter((result)=>result.id == u).map((result)=>{
        const foto = fotoUrl.find((item)=>item.id == result.id)
        const statusUser = status.find((item)=>item.id == result.id)
        const rating = rate.find((item)=>item.id == result.id)
        const accumulatedRating = rate.filter((item)=>item.id == result.id)
        let total = 0 
        accumulatedRating.map((item)=>{
            total += item.rate
        })
        const averageRating = total/accumulatedRating.length
        return {
            name : result.name,
            email : result.email,
            foto : foto? foto.url : false,
            status : statusUser.status,
            accumulatedRating : rating ? averageRating.toFixed(1) : '0'
        }
    })
    return res.status(200).json({
        status: 'success',
        message: 'success',
        data: newData
    })
}

const getAllProfileUser = async (req, res) => {
    const newData = user.map((result)=>{
        const foto = fotoUrl.find((item)=>item.id == result.id)
        const statusUser = status.find((item)=>item.id == result.id)
        const rating = rate.find((item)=>item.id == result.id)
        const accumulatedRating = rate.filter((item)=>item.id == result.id)
        let total = 0 
        accumulatedRating.map((item)=>{
            total += item.rate
        })
        const averageRating = total/accumulatedRating.length
        return {
            name : result.name,
            email : result.email,
            foto : foto? foto.url : false,
            status : statusUser.status,
            accumulatedRating : rating? averageRating.toFixed(1) : '0',
        }
    })
    return res.status(200).json({
        status:'success',
        message:'success',
        data: newData
    })
}

const getConversation = async (req, res) => {
    const {i} = req.query
    const newData = conversation
    .filter((result)=>result.idConversation == i).map((result)=>{
        const sender = user.find((item)=>item.id === result.sender)
        const receiver = user.find((item)=>item.id === result.receiver)
        const foto = fotoUrl.find((item)=>item.id === result.sender)
        const statusUser = status.find((item)=>item.id === result.sender)
        return {
            message : result.message,
            sender : sender.name,
            receiver : receiver.name,
            foto : foto ? foto.url : false,
            Status : statusUser.status,
            date : result.date

        }
    })
    return res.status(200).json(newData)
}



const getConversationAnotherVersion = async (req, res) => {
    const {i} = req.query

    const userMap = Object.fromEntries(user.map(u => [u.id, u.name]));
    const fotoUrlMap = Object.fromEntries(fotoUrl.map(f => [f.id, f.url]));
    const statusUser = Object.fromEntries(status.map(item=>[item.id, item.status]))
    const newData = conversation
        .filter(result => result.idConversation == i)
        .map(result => ({
            message: result.message,
            sender: userMap[result.sender],
            receiver: userMap[result.receiver],
            foto: fotoUrlMap[result.sender] || false,
            status: statusUser[result.sender],
            date: result.date
        }));

    return res.status(200).json(newData);
}

const addFriend = async(req,res) =>{
    const {u} = req.query
    await token(req,res)
    const username = req.username
    const findUsername = user.filter(result => result.name == username)
    .map(result => ({
        id : result.id,
        username : result.name,
    }))
    const findUser = user.map((result)=> {
        if(u == result.id){
            const newData = {
                userId : findUsername[0].id,
                username : findUsername[0].username,
                id : result.id,
                name : result.name,
                email : result.email,
                friend : true
            }
            return friend.push(newData);
        }
    })
    return res.status(200).json({
        status:'success',
        message:'success',
        data: friend
    })
}

export { 
    profile,
    getAllProfileUser,
    getConversation,
    getConversationAnotherVersion,
    addFriend,
}