import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/user.js'
import {generateOTP, mailTransport} from '../utils/mail.js'
import UserOTP from '../models/Otp.js'
import mongoose from 'mongoose'



export const getUsers = async (req, res) => {
    try {

        const users = await User.find()


        res.status(200).json(users)

    } catch (error) {
        res.status(404).json({message: error.message})
    }
}


export const deleteUser =  async (req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No such user')

    await User.findByIdAndRemove(id)

    res.json({message: 'User deleted successfully!'})

}

export const signin = async (req, res) => {
    const {email, password} = req.body;

    try {
        const existingUser = await User.findOne({email})
        if(!existingUser) return res.status(404).json({message: "User doesn't exist"})

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)

        if(!isPasswordCorrect) return res.status(400).json({message: 'Invalid credentials'})

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id}, 'test', {expiresIn: "1h"});

        res.status(200).json({ result: existingUser, token})
    } catch (error) {
        res.status(500).json({message:  'Something went wrong'})
        
    }
}

export const signup = async (req, res) => {

    const {email, password, confirmPassword, firstName, lastName, phone } = req.body

    try {
        const existingUser = await User.findOne({email})

        if(existingUser) return res.status(400).json({message: "User already exists"})

        if(password !== confirmPassword) return res.status(400).json({message: "Password don't match"})

        const hashedPassword = await bcrypt.hash(password, 12)

        const result = await User.create({email, password: hashedPassword, name: `${firstName}, ${lastName}`, phone})
        const otp = generateOTP()
        const verifyToken = new UserOTP({
            owner: result._id,
            token: otp
        })

        await verifyToken.save()

        mailTransport().sendMail({
            from: 'veriphy@outlook.com',
            to: result.email,
            subject: 'Verify your email account',
            html: `<h1> Hello please verify that your email account is ${result.email}. Your device is  {XiaoMi Redmi 7}</h1>`
        }, (err, data) => {
            if(err){
                console.log('Error occurs', err)
            }else{
                console.log('email sent')
            }
        })


        const token = jwt.sign({email: result.email, id: result._id}, 'test', {expiresIn: '1h'})

        res.status(200).json({result, token})



    } catch (error) {
        res.status(500).json({message: 'Something went wrong'})
    }
}


