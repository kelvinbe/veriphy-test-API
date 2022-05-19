import bcrypt from "bcryptjs";
import mongoose from "mongoose";


const userOTP = mongoose.Schema({
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    token:{
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        expires: 3600,
        default: Date.now()
    }

})


userOTP.pre("save", async function(next){
    if(this.isModified('token')){
        const hash = await bcrypt.hash(this.token, 8)
        this.token = hash
    }

    next()
})


userOTP.methods.compareToken = async function (token) {
    const result = await bcrypt.compareSync(token, this.password)
    return result
}


const UserOTP = mongoose.model("userOtp", userOTP)

export default UserOTP