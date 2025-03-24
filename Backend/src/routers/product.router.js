
import express from "express"
import Products from "../models/product.model.js";
import { createProductList, deleteProduct, getProductsList,
    getProductListById,
    updateProductList} from "../controllers/product.controller.js";
import upload from "../controllers/upload.controller.js";

const router = express.Router();

// CRUD Routes
router.post("/", upload.array('image', 5), createProductList);  //Create a product
router.get("/", getProductsList);  // Get all products
router.get("/:id", getProductListById);  // Get a single product by ID
router.patch("/:id",upload.array('image', 5), updateProductList);  // Update a product
router.delete("/:id", deleteProduct);  // Delete a product

export default router;
