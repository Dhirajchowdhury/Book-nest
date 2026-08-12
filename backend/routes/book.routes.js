import express from 'express';
import { requireAuth } from '../middleware/auth.middleware.js';
import {createBookHandler,getBooksHandler,getBookByIdHandler,updateBookHandler,deleteBookHandler,} from '../controllers/book.controller.js';

const router = express.Router();

router.use(requireAuth);

router.post('/', createBookHandler);
router.get('/', getBooksHandler);
router.get('/:id', getBookByIdHandler);
router.put('/:id', updateBookHandler);
router.delete('/:id', deleteBookHandler);

export default router;
