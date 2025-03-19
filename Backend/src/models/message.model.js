import mongoose from "mongoose"

const messageSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']},
    // use
    thread:{type: mongoose.Schema.Types.ObjectId, ref: 'Thread', required: false}

}, {timestamps: true})

const Message = mongoose.model('Message', messageSchema)
export default Message