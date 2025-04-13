import express from "express"
import ROLES from "../constants/roles.js"

import { verifyRoles, verifyToken } from "../middleware/auth.middleware.js"
import { cancelOrder, createOrder, getAllOrders, getOrdersById, getUserOrders, updateOrderStatus } from "../controllers/order.controller.js"



const router = express.Router()

router.post("/", verifyToken, 
    verifyRoles(ROLES.CUSTOMER, ROLES.MODERATOR, ROLES.ADMIN),createOrder)

router.get("/",verifyToken, 
    verifyRoles(ROLES.CUSTOMER),getUserOrders)

router.get ("/all", verifyToken, 
    verifyRoles(ROLES.ADMIN, ROLES.MODERATOR, ROLES.CUSTOMER), getAllOrders)

router.get("/:id", verifyToken, 
        verifyRoles(ROLES.ADMIN, ROLES.MODERATOR, ROLES.CUSTOMER), getOrdersById)

router.patch("/:id/status", verifyToken, 
    verifyRoles(ROLES.ADMIN, ROLES.MODERATOR), updateOrderStatus)

router.delete("/:id/cancel", verifyToken, 
    verifyRoles(ROLES.ADMIN, ROLES.CUSTOMER, ROLES.MODERATOR), cancelOrder)



export default router