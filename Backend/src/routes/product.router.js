import express from "express"

import { createProductList, deleteProduct, getProductsList,getProductListById, updateProductList} from "../controllers/product.controller.js"
import { verifyRoles, verifyToken } from "../middleware/auth.middleware.js"
import upload from "../controllers/upload.controller.js"
import ROLES from "../constants/roles.js"

const router = express.Router();

// CRUD Routes
router.post("/", verifyToken,verifyRoles (ROLES.ADMIN, ROLES.MODERATOR), upload.array('image', 5), createProductList) //Create a product
router.get("/", getProductsList) // Get all products
router.get("/:id", getProductListById) // Get a single product by ID
router.patch("/:id",verifyToken,verifyRoles(ROLES.ADMIN, ROLES.MODERATOR), upload.array('image', 5), updateProductList) //Update a product
router.delete("/:id", verifyToken, verifyRoles(ROLES.ADMIN, ROLES.MODERATOR), deleteProduct)  // Delete a product

export default router;
