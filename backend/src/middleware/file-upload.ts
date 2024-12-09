import multer from 'multer'
import path from 'path'

// Define storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    cb(null, uniqueSuffix + path.extname(file.originalname))
  },
})

// File filter for dynamic validation
const fileFilter = (req: any, file: any, cb: any) => {
  const allowedMimeTypes = {
    pdf: 'application/pdf',
    image: ['image/png', 'image/jpeg', 'image/jpg'],
    text: 'text/plain',
  }

  const format = req.body.format // Get format from request body
  if (
    (format === 'pdf' && file.mimetype === allowedMimeTypes.pdf) ||
    (format === 'image' && allowedMimeTypes.image.includes(file.mimetype)) ||
    (format === 'text' && file.mimetype === allowedMimeTypes.text)
  ) {
    cb(null, true)
  } else {
    cb(new Error('Invalid file type for the selected format'), false)
  }
}

// Multer instance
export const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // Limit file size to 10MB
})
