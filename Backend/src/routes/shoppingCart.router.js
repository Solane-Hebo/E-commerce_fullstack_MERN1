import express from 'express';
import { verifyToken } from '../middleware/auth.middleware.js';
import {
  getCart,
  updateCart,
  deleteItem,
  addItem
} from '../controllers/shoppingCart.controller.js';

const router = express.Router();

router.use(verifyToken);

router.get('/', getCart);
router.post('/', addItem);
router.patch('/:id', updateCart);
router.delete('/:id', deleteItem);

export default router;
