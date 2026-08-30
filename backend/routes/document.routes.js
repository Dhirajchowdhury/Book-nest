import express from 'express';
import { requireAuth } from '../middleware/auth.middleware.js';
import { uploadSinglePdf } from '../middleware/upload.middleware.js';
import {
  uploadDocumentHandler,
  getDocumentUrlHandler,
  deleteDocumentHandler,
} from '../controllers/document.controller.js';

const router = express.Router({ mergeParams: true });

router.use(requireAuth);

router.post('/', uploadSinglePdf, uploadDocumentHandler);
router.get('/url', getDocumentUrlHandler);
router.delete('/', deleteDocumentHandler);

export default router;
