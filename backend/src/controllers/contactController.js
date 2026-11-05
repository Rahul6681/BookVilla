import { Contact } from '../models/Contact.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { ApiError } from '../utils/apiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { sendContactReceiptEmail } from '../utils/emailService.js';

// @desc    Submit a customer inquiry and send acknowledgment email
// @route   POST /api/contact
// @access  Public
export const submitContactInquiry = asyncHandler(async (req, res) => {
  const { name, email, phone, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    throw new ApiError(400, 'Name, email, subject, and message are required.');
  }

  const contact = await Contact.create({
    name,
    email,
    phone: phone || '',
    subject,
    message
  });

  // Send Nodemailer confirmation receipt
  sendContactReceiptEmail({ name, email, subject, message }).catch((err) =>
    console.error('[EMAIL] Contact email failed:', err.message)
  );

  res.status(201).json(new ApiResponse(201, contact, 'Your inquiry has been received. Our team will contact you shortly.'));
});

// @desc    Get all inquiries (admin)
// @route   GET /api/contact
// @access  Public
export const getAllInquiries = asyncHandler(async (req, res) => {
  const inquiries = await Contact.find().sort({ createdAt: -1 });
  res.status(200).json(new ApiResponse(200, inquiries, 'Inquiries retrieved'));
});

