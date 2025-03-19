import mongoose from "mongoose";

const productsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "product name is required"],
        trim: true
    },
    title: {
        type: String,
        required: [true, "Product title is required"],
        trim: true
    },
    price:{
        type: Number,
        required: [true, "product price is required"],
         
    },
    description: {
        type: String,
        required: [true, "product description is required"],
        trim: true
    },
    image: {
        type: String,
        required: [true, "product image is required"],
        trim: true
    },
    category: {
        type: String,
        required: [true, "product category is required"],
        trim: true
    },
    countInStock: {
        type: Number,
        required: [true, "product countInstock is required"],
    },
    rating: {
        type: Number,
        required: [true, "product rating is required"],
    },
    numReviews: {
        type: Number,
        required: [true, "product numReviews is required"],
    }

}, {timestamps: true})



const Products = mongoose.model('Product',productsSchema)

export default Products 

