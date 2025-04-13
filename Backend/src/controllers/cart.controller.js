import asyncHandler from 'express-async-handler'
import Cart from '../models/cart.model.js'
import mongoose from 'mongoose'

export const getCart = asyncHandler(async (req, res) => {
  const userId = req.user._id

  const cart = await Cart.findOne({ user: userId }).populate('items.product')

  res.status(200).json(cart?.items || [])
});

export const updateCartItem = asyncHandler(async (req, res) => {
  const userId = req.user._id
  const { id } = req.params
  const { quantity } = req.body

 


  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid product ID' });
  }

  if (typeof quantity !== 'number' || quantity < 0) {
    return res.status(400).json({ message: 'Quantity must be a positive number' });
  }

  const cart = await Cart.findOne({ user: userId });

  if (!cart) {
    return res.status(404).json({ message: 'Cart not found' });
  }

  const itemIndex = cart.items.findIndex(item => item.product.toString() === id);

  if (itemIndex === -1) {
    return res.status(404).json({ message: 'Item not in cart' });
  }

  if (quantity === 0) {
    // remove item
    cart.items.splice(itemIndex, 1);
  } else {
    cart.items[itemIndex].quantity = quantity;
  }

  await cart.save();
  const populatedCart = await cart.populate('items.product');

  res.status(200).json(populatedCart.items);
});


export const updateCart = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { items } = req.body; 

  if (!Array.isArray(items)) {
    return res.status(400).json({ message: 'Invalid cart format' });
  }

  // Validate product IDs and quantities
  for (const item of items) {
    if (
      !item.product ||
      !mongoose.Types.ObjectId.isValid(item.product) ||
      typeof item.quantity !== 'number' ||
      item.quantity < 1
    ) {
      return res.status(400).json({ message: 'Invalid product or quantity in cart' });
    }
  }

  let cart = await Cart.findOne({ user: userId });

  if (!cart) {
    cart = new Cart({ user: userId, items });
  } else {
    cart.items = items;
  }

  await cart.save();

  const populatedCart = await cart.populate('items.product');

  res.status(200).json(populatedCart.items);
});

export const clearCart = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const cart = await Cart.findOne({ user: userId });

  if (!cart) {
    return res.status(404).json({ message: 'Cart not found' });
  }

  cart.items = [];
  await cart.save();

  res.status(204).end();
});

export const removeCartItem = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { itemId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(itemId)) {
    return res.status(400).json({ message: 'Invalid item ID' });
  }

  const cart = await Cart.findOne({ user: userId });

  if (!cart) {
    return res.status(404).json({ message: 'Cart not found' });
  }

  const index = cart.items.findIndex(
    (item) => item.product.toString() === itemId
  );

  if (index === -1) {
    return res.status(404).json({ message: 'Item not found in cart' });
  }

  cart.items.splice(index, 1);
  await cart.save();

  res.status(204).end();
});
