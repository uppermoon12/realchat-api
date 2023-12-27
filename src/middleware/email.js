import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_MASTER,
        pass: process.env.PASSWORD_MASTER,
    }
});

const mailOptions = (email,code)=>{
    return {
        from: '"Skill Shift" uppermoon1404@gmail.com',
        to: email,
        subject: 'Verification Code',
        text: `Your verification code is ${code}`
    };
}

export {transporter, mailOptions};