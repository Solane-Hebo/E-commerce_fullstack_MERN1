
import express from "express"
import Products from "../models/product.model.js";
import { createProductList, deleteProduct, getProductsList,
    getProductListById,
    updateProductList} from "../controllers/product.controller.js";

const router = express.Router();

// CRUD Routes
router.post("/", createProductList);  //Create a product
router.get("/", getProductsList);  // Get all products
router.get("/:id", getProductListById);  // Get a single product by ID
router.patch("/:id", updateProductList);  // Update a product
router.delete("/:id", deleteProduct);  // Delete a product

export default router;
