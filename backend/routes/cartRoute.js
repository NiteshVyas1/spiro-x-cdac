import express from 'express';
import { getUserCart, addToCart, removeFromCart } from '../controller/cartController.js';

const cartRouter = express.Router();

cartRouter.post('/get', getUserCart);
cartRouter.post('/add', addToCart);
cartRouter.post('/remove', removeFromCart); // <-- fixed here

export default cartRouter;
