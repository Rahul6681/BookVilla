import { User } from '../models/User.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { ApiError } from '../utils/apiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken
} from '../middleware/authMiddleware.js';

// @desc    Register a new user in MongoDB
// @route   POST /api/auth/register
// @access  Public
export const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, password, phone, address, pincode, city, state } = req.body;

  const existingUser = await User.findOne({ email: email.toLowerCase() });
  if (existingUser) {
    throw new ApiError(409, 'An account with this email address already exists in BookVilla.');
  }

  const user = await User.create({
    fullName: fullName.trim(),
    email: email.toLowerCase().trim(),
    password,
    phone: phone || '+91 98765 43210',
    address: address || 'Flat 101, Gulmohar Enclave, MG Road',
    pincode: pincode || '110001',
    city: city || 'New Delhi',
    state: state || 'Delhi',
    membershipTier: 'BookVilla Rasika Patron',
    role: 'user'
  });

  const accessToken = generateAccessToken(user._id, user.role);
  const refreshToken = generateRefreshToken(user._id);

  // Save refresh token to user in MongoDB
  user.refreshToken = refreshToken;
  await user.save();

  res.status(201).json(
    new ApiResponse(
      201,
      {
        user: {
          id: user._id,
          _id: user._id,
          fullName: user.fullName,
          email: user.email,
          phone: user.phone,
          address: user.address,
          pincode: user.pincode,
          city: user.city,
          state: user.state,
          membershipTier: user.membershipTier,
          role: user.role,
          wishlist: user.wishlist,
          createdAt: user.createdAt
        },
        token: accessToken,
        accessToken,
        refreshToken
      },
      'User registered and saved to MongoDB successfully.'
    )
  );
});

// @desc    Authenticate user and issue JWT Access & Refresh tokens
// @route   POST /api/auth/login
// @access  Public
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Find user and explicitly select password and refreshToken
  const user = await User.findOne({ email: email.toLowerCase().trim() }).select('+password +refreshToken');

  if (!user || !(await user.matchPassword(password))) {
    throw new ApiError(401, 'Invalid email or password. Please verify your credentials.');
  }

  const accessToken = generateAccessToken(user._id, user.role);
  const refreshToken = generateRefreshToken(user._id);

  // Update refresh token in MongoDB
  user.refreshToken = refreshToken;
  await user.save();

  res.status(200).json(
    new ApiResponse(
      200,
      {
        user: {
          id: user._id,
          _id: user._id,
          fullName: user.fullName,
          email: user.email,
          phone: user.phone,
          address: user.address,
          pincode: user.pincode,
          city: user.city,
          state: user.state,
          membershipTier: user.membershipTier,
          role: user.role,
          wishlist: user.wishlist,
          createdAt: user.createdAt
        },
        token: accessToken,
        accessToken,
        refreshToken
      },
      'Logged in successfully.'
    )
  );
});

// @desc    Refresh access token using long-lived refresh token
// @route   POST /api/auth/refresh-token
// @access  Public
export const refreshAccessToken = asyncHandler(async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    throw new ApiError(400, 'Refresh token is required.');
  }

  let decoded;
  try {
    decoded = verifyRefreshToken(refreshToken);
  } catch (err) {
    throw new ApiError(401, 'Invalid or expired refresh token. Please sign in again.');
  }

  const user = await User.findById(decoded.id).select('+refreshToken');
  if (!user || user.refreshToken !== refreshToken) {
    throw new ApiError(401, 'Invalid refresh token session. Token has been revoked or rotated.');
  }

  // Issue new access token and rotate refresh token
  const newAccessToken = generateAccessToken(user._id, user.role);
  const newRefreshToken = generateRefreshToken(user._id);

  user.refreshToken = newRefreshToken;
  await user.save();

  res.status(200).json(
    new ApiResponse(
      200,
      {
        token: newAccessToken,
        accessToken: newAccessToken,
        refreshToken: newRefreshToken
      },
      'Access token refreshed successfully.'
    )
  );
});

// @desc    Logout user and invalidate refresh token
// @route   POST /api/auth/logout
// @access  Private
export const logoutUser = asyncHandler(async (req, res) => {
  if (req.user) {
    await User.findByIdAndUpdate(req.user._id, { $unset: { refreshToken: 1 } });
  }

  res.status(200).json(new ApiResponse(200, null, 'Logged out successfully. Refresh session cleared.'));
});

// @desc    Get user profile from MongoDB
// @route   GET /api/auth/profile
// @access  Private (Protected by JWT)
export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    throw new ApiError(404, 'User not found in database.');
  }

  res.status(200).json(new ApiResponse(200, user, 'User profile retrieved.'));
});

// @desc    Update user profile in MongoDB
// @route   PUT /api/auth/profile
// @access  Private (Protected by JWT)
export const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    throw new ApiError(404, 'User not found in database.');
  }

  user.fullName = req.body.fullName || user.fullName;
  user.phone = req.body.phone || user.phone;
  user.address = req.body.address || user.address;
  user.pincode = req.body.pincode || user.pincode;
  user.city = req.body.city || user.city;
  user.state = req.body.state || user.state;

  if (req.body.password) {
    user.password = req.body.password;
  }

  const updatedUser = await user.save();

  res.status(200).json(
    new ApiResponse(
      200,
      {
        id: updatedUser._id,
        _id: updatedUser._id,
        fullName: updatedUser.fullName,
        email: updatedUser.email,
        phone: updatedUser.phone,
        address: updatedUser.address,
        pincode: updatedUser.pincode,
        city: updatedUser.city,
        state: updatedUser.state,
        membershipTier: updatedUser.membershipTier,
        role: updatedUser.role,
        wishlist: updatedUser.wishlist
      },
      'Profile updated in MongoDB successfully.'
    )
  );
});

// @desc    Toggle item in user wishlist in MongoDB
// @route   POST /api/auth/wishlist/:bookId
// @access  Private (Protected by JWT)
export const toggleWishlist = asyncHandler(async (req, res) => {
  const { bookId } = req.params;
  const user = await User.findById(req.user._id);

  if (!user) {
    throw new ApiError(404, 'User not found.');
  }

  const isPresent = user.wishlist.includes(bookId);
  if (isPresent) {
    user.wishlist = user.wishlist.filter(id => id !== bookId);
  } else {
    user.wishlist.push(bookId);
  }

  await user.save();

  res.status(200).json(
    new ApiResponse(
      200,
      { wishlist: user.wishlist, isWishlisted: !isPresent },
      !isPresent ? 'Added to wishlist in MongoDB' : 'Removed from wishlist in MongoDB'
    )
  );
});

// @desc    Get all registered users (Admin telemetry)
// @route   GET /api/auth/users
// @access  Public / Admin
export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select('-password').sort({ createdAt: -1 });
  res.status(200).json(new ApiResponse(200, users, `Retrieved ${users.length} users from MongoDB.`));
});
