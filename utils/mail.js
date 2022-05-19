import nodemailer from 'nodemailer'

export const generateOTP = () => {
    let otp = ""
    for(let i =0; i <= 3; i++){
        const randVal = Math.round(Math.random() * 9)
        otp = otp + randVal
    }
    return otp
}

export  const mailTransport = () => {
    var transport = nodemailer.createTransport({
        service: "gmail",
        port: 587,
        auth: {
          user: "kelvinbeno526@gmail.com",
          pass: "Makovuproject1"
        },
        tls:{
            rejectUnauthorized: false
        }
      });
      return transport
}