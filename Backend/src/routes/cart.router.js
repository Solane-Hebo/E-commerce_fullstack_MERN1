import express from 'express';
import {
  getCart,
  updateCart,
  clearCart,
  removeCartItem,
  updateCartItem
} from '../controllers/cart.controller.js';
import { verifyToken } from '../middleware/auth.middleware.js';

const router = express.Router();


router.use(verifyToken);

router.get('/', getCart);
router.post('/', updateCart);
router.patch('/:id', updateCartItem);
router.delete('/', clearCart);
router.delete('/:itemId', removeCartItem);

export default router;
