import mongoose from "mongoose"
import asyncHandler from "express-async-handler"

import Order from "../models/order.model.js"
import Products from "../models/product.model.js"

export const createOrder = asyncHandler(async (req, res) => {
  const { products } = req.body
  const author = req.user._id

  if (!products || !Array.isArray(products) || products.length === 0 ||
    !products.every(p => p.product && p.quantity)) {
    return res.status(400).json({ message: "Order must contain valid products with product and quantity" })
  }

  products.forEach(p => {
    if (typeof p.product === 'object' && p.product._id) {
      p.product = p.product._id
    }
  })
  
  for (const item of products) {
    if (!mongoose.Types.ObjectId.isValid(item.product)) {
      return res.status(400).json({ message: 'Invalid product ID in order' })
    }
  }

  const productIds = products.map(p => p.product)
  const foundProducts = await Products.find({ _id: { $in: productIds } })

  if (foundProducts.length !== products.length) {
    return res.status(404).json({ message: "Some products not found" })
  }

  let totalPrice = 0
  for (const item of products) {
    const product = foundProducts.find(p => p._id.toString() === item.product.toString())
    totalPrice += product.price * item.quantity
  }
  
  const order = await Order.create({ products, author, totalPrice })

  const populatedOrder = await Order.findById(order._id)
    .populate('products.product')
    .populate('author', 'firstName lastName -_id')

  res.status(201).json({
    message: "Order created successfully",
    order: populatedOrder
  })
})



export const getUserOrders = asyncHandler(async (req, res) => {
  const order = await Order.find({ author: req.user._id })
  .populate({
    path: "products.product",
    select: "name price images -_id"
  })
  .populate("author", "firstName lastName -_id")

  res.status(200).json(order)
})

export const getOrdersById = asyncHandler(async (req, res) => {
  const orders = await Order.find({ author: req.user._id })
  .populate({
    path: "products.product",
    select: "name price images -_id"
  })
  .populate("author", "firstName lastName -_id")

  res.status(200).json(orders)
})

export const getAllOrders = asyncHandler(async (req, res) => {
  if (req.user.role !== "admin" && req.user.role !== "moderator") {
    return res.status(403).json({ message: 'Not authorized to get order' })
  }

  const orders = await Order.find()
  .populate({
    path: "products.product",
    select: "name price images -_id"
  })
  .populate("author", "firstName lastName -_id")


  res.status(200).json(orders)
})

export const updateOrderStatus = asyncHandler(async(req, res) =>{
  const { orderId } = req.params
  const { status } = req.body

  if (!mongoose.Types.ObjectId.isValid(orderId)) {
  return res.status(400).json({ message: "Invalid order ID" })
}


  if (!["admin", "moderator", "customer"].includes(req.user.role)) {
    return res.status(403).json({ message: "Not authorized to update order status" })
  }  

  const allowedStatuses = ["pending", "confirmed", "shipped", "delivered", "cancelled"]

  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({ message: "Invalid status value" })
  }

  const order = await Order.findById(orderId)

  if (!order) {
    return res.status(404).json({ message: "Order not found" })
  }

  order.status = status

  if (status === "cancelled") {
    order.cancelledAt = new Date()
  }

  await order.save()

  res.status(200).json({ message: "Order status updated", order })
})

export const cancelOrder = asyncHandler(async (req, res) => {
  const { orderId } = req.params

  if (!mongoose.Types.ObjectId.isValid(orderId)) {
    return res.status(400).json({ message: "Invalid order ID" })
  }
  

  const order = await Order.findById(orderId)

  if (!order) {
    return res.status(404).json({ message: "Order not found" })
  }

  if (order.author.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "You can only cancel your own orders" })
  }

  if (["shipped", "delivered"].includes(order.status)) {
    return res.status(400).json({ message: "Order cannot be cancelled after it’s shipped or delivered" })
  }

  order.status = "cancelled"
  order.cancelledAt = new Date()

  await order.save()

  res.status(200).json({ message: "Order cancelled successfully", order })
})


