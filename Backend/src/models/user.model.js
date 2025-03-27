import mongoose from "mongoose"
import ROLES from "../constants/roles.js"

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true},
    lastName: { type: String, required: true},
    email: {type: String, required: true, unique: true, lowercase: true},
    password: {type: String, required: true},
    role: {
        type: String,
        enum: [...Object.values(ROLES)],
        default: ROLES.CUSTOMER

    }, 
}, { timestamps: true })

const User = mongoose.model('user', userSchema)

export default User 