
import mongoose from "mongoose";
import Product from "../models/product.model.js";
import asyncHandler from "express-async-handler";

// Create Product
export const createProductList = asyncHandler(async (req, res) => {
    
    const { name, title, description, price} = req.body;
    
    const parsedPrice = parseFloat(price);
    let category = req.body.category?.trim(); 


    if (!name || !title || !description || !category || isNaN(parsedPrice)) {
        return res.status(400).json({ message: "All fields are required" });
    }

    let imagePaths = [];
    if (req.files?.length > 0) {
        imagePaths = req.files.map(file => `/images/${file.filename}`);
    } else if (req.body.images) {
        const imagesInput = req.body.images;
        if (Array.isArray(imagesInput)) {
            imagePaths = imagesInput;
        } else if (typeof imagesInput === 'string') {
            imagePaths = [imagesInput];
        }
    }

    if (imagePaths.length === 0) {
        return res.status(400).json({ message: "Product image is required" });
    }

    const productList = await Product.create({
        name,
        title,
        description,
        price: parsedPrice,
        images: imagePaths,
        category,
    });

    res.status(201).json(productList);
});

// Get All Products
export const getProductsList = asyncHandler(async (req, res) => {
    const productsList = await Product.find();
    res.status(200).json(productsList);
});

// Get Product By ID
export const getProductListById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: "Invalid product id" });
    }

    const productList = await Product.findById(id);
    if (!productList) {
        return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(productList);
});


// Update Product
export const updateProductList = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, title, description, price,  category} = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid product id" });
    }

    const toUpdate = {};
    if (name) toUpdate.name = name;
    if (title) toUpdate.title = title;
    if (description) toUpdate.description = description;
    if (price) toUpdate.price = price;
    // if (image) toUpdate.image = image;
    if (category) toUpdate.category = category;
   

    if (req.files && req.files.length > 0) {
        // If new files uploaded, update images
        toUpdate.images = req.files.map(file => `/images/${file.filename}`);
    } else if (req.body.images) {
        // If images are sent as external URLs (string or array)
        const imagesInput = req.body.images;
        if (Array.isArray(imagesInput)) {
            toUpdate.images = imagesInput;
        } else if (typeof imagesInput === 'string') {
            toUpdate.images = [imagesInput];
        }
    }
    

    if (Object.keys(toUpdate).length === 0) {
        return res.status(400).json({ message: "No fields to update" });
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, toUpdate, { new: true });

    if (!updatedProduct) {
        return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(updatedProduct);
});


// Delete Product
export const deleteProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: "Invalid product id" });
    }

    const productList = await Product.findByIdAndDelete(id);

    if (!productList) {
        return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
});
