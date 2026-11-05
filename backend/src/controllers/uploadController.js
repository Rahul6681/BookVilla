import { ApiResponse } from '../utils/apiResponse.js';
import { ApiError } from '../utils/apiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

/**
 * File Upload using Multer Controller
 */
export const uploadBookCoverImage = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new ApiError(400, 'Please select an image file to upload.');
  }

  // Construct accessible relative URL for the uploaded folio asset
  const fileUrl = `/uploads/books/${req.file.filename}`;

  res.status(200).json(
    new ApiResponse(
      200,
      {
        fileName: req.file.filename,
        originalName: req.file.originalname,
        mimeType: req.file.mimetype,
        size: req.file.size,
        url: fileUrl
      },
      'Book cover folio uploaded successfully via Multer.'
    )
  );
});

