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
        receiver : 2
    },
    {
        idConversation : 1,
        message : 'hello',
        sender : 2,
        receiver : 1
    },
    {
        idConversation : 2,
        message : 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum',
        sender : 3,
        receiver : 1
    },
    {
        idConversation : 2,
        message : 'hello',
        sender : 1,
        receiver : 3
    }

]



const profile = async (req, res) => {
    const newData =  user.map((result)=>{
        const foto =  fotoUrl.find((item)=>item.id === result.id)
        const rating = rate.find((item)=>item.id === result.id)
        const statusUser = status.find((item)=>item.id === result.id)
        return {
            name: result.name,
            email: result.email,
            status : statusUser.status,
            fotoUrl : foto ? foto.url : false,
            rate : rating ? rating.rate : false
        }
    })
    return res.status(200).json(newData)
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
            Status : statusUser.status
        }
    })
    return res.status(200).json(newData)
}

const getConversationAnotherVersion = async (req, res) => {
    const {i} = req.query

    const userMap = Object.fromEntries(user.map(u => [u.id, u.name]));
    const fotoUrlMap = Object.fromEntries(fotoUrl.map(f => [f.id, f.url]));

    const newData = conversation
        .filter(result => result.idConversation == i)
        .map(result => ({
            message: result.message,
            sender: userMap[result.sender],
            receiver: userMap[result.receiver],
            foto: fotoUrlMap[result.sender] || false,
        }));

    return res.status(200).json(newData);
}

export { profile,
    getConversation }