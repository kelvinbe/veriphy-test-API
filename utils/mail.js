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
        host: "smtp-mail.outlook.com",
        secureConnection: false, // TLS requires secureConnection to be false
        port: 587,
        auth: {
          user: "veriphy@outlook.com",
          pass: "Developer123"
        },
        tls: {
            ciphers:'SSLv3'
         },
      });
      return transport
}