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
        set: (v) => {
            if (typeof v === 'string') {
                return Number(v.replace(/\s/g, '')); 
            }
            return v;
        }
         
    },
    description: {
        type: String,
        required: [true, "product description is required"],
        trim: true
    },
    images: {
        type: [String],
        required: [true, "product image is required"],
        
    },
    category: {
        type: String,
        required: [true, "product category is required"],
        trim: true
    },
   

}, {timestamps: true})



const Products = mongoose.model('Product',productsSchema)

export default Products 

