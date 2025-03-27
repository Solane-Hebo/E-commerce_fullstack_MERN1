import mongoose from "mongoose"

const orderSchema = new mongoose.Schema({

    author: {type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true},
    
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                min: 1
            }
        }
    ],
    totalPrice: {
        type: Number,
        default: 0,
    },
    status: {
        type: String,
        enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"],
        default: "pending"
      },
      cancelledAt: { type: Date, default: null }
},{ timestamps: true })

const Order = mongoose.model("Order", orderSchema)

export default Order