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
        service: "outlook",
        port: 587,
        auth: {
          user: "veriphy@outlook.com",
          pass: "Developer123"
        },
        tls:{
            rejectUnauthorized: false
        }
      });
      return transport
}