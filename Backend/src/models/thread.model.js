import mongoose from "mongoose"

const threadSchema = new mongoose.Schema({
    name: {type: String, required: true},
    title: {type: String, required: true},
    // user
    email: {type: String, required: true, match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']},
    messages: [{type: mongoose.Schema.Types.ObjectId, ref: 'Message'}],
    // replies
}, {timestamps: true}
)

const Thread = mongoose.model('Thread', threadSchema)

export default Thread