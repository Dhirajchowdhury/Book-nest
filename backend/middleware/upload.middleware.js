import multer from 'multer';

// Get max PDF file size limit from environment variable (default: 10MB)
const maxPdfSizeMb = parseInt(process.env.MAX_BOOK_PDF_SIZE_MB || '10', 10);
const MAX_FILE_SIZE_BYTES = maxPdfSizeMb * 1024 * 1024;

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const isPdfMime = file.mimetype === 'application/pdf';
  const isPdfExt = file.originalname.toLowerCase().endsWith('.pdf');

  if (isPdfMime && isPdfExt) {
    cb(null, true);
  } else {
    const error = new Error('Invalid file format. Only PDF files (.pdf) are allowed.');
    error.statusCode = 400;
    error.error = 'Validation Error';
    cb(error, false);
  }
};

const upload = multer({
  storage,
  limits: {
    fileSize: MAX_FILE_SIZE_BYTES,
  },
  fileFilter,
});

export const uploadSinglePdf = (req, res, next) => {
  const singleUpload = upload.single('pdf');

  singleUpload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({
          error: 'Validation Error',
          message: `PDF file size exceeds the maximum limit of ${maxPdfSizeMb}MB.`,
        });
      }
      return res.status(400).json({
        error: 'Validation Error',
        message: err.message,
      });
    } else if (err) {
      return res.status(err.statusCode || 400).json({
        error: err.error || 'Validation Error',
        message: err.message,
      });
    }
    next();
  });
};
