import express from 'express';
import { requireAuth } from '../middleware/auth.middleware.js';
import {createBookHandler,getBooksHandler,getBookByIdHandler,updateBookHandler,deleteBookHandler,} from '../controllers/book.controller.js';
import documentRoutes from './document.routes.js';

const router = express.Router();

router.use(requireAuth);

router.use('/:bookId/document', documentRoutes);

router.post('/', createBookHandler);
router.get('/', getBooksHandler);
router.get('/:id', getBookByIdHandler);
router.put('/:id', updateBookHandler);
router.delete('/:id', deleteBookHandler);

export default router;

