
import mongoose from "mongoose";
import Product from "../models/product.model.js";
import asyncHandler from "express-async-handler";

// Create Product
export const createProductList = asyncHandler(async (req, res) => {
    const { name, title, description, price, image, category, countInStock, numReviews, rating } = req.body;

    if (!name || !title || !description || !image || !category) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const productList = await Product.create({
        name,
        title,
        description,
        price,
        image,
        category,
        countInStock,
        numReviews,
        rating
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
    const { name, title, description, price, image, category, countInStock, numReviews, rating } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid product id" });
    }

    const toUpdate = {};
    if (name) toUpdate.name = name;
    if (title) toUpdate.title = title;
    if (description) toUpdate.description = description;
    if (price) toUpdate.price = price;
    if (image) toUpdate.image = image;
    if (category) toUpdate.category = category;
    if (countInStock) toUpdate.countInStock = countInStock;
    if (numReviews) toUpdate.numReviews = numReviews;
    if (rating) toUpdate.rating = rating;

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
