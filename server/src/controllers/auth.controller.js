import Admin from '../models/Admin.model.js';
import { asyncHandler } from '../middleware/error.middleware.js';

/**
 * @desc    Login admin
 * @route   POST /api/auth/login
 * @access  Public
 */
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(400).json({
      status: 'error',
      message: 'Please provide email and password'
    });
  }

  // Find admin by email (include password field)
  const admin = await Admin.findOne({ email }).select('+password');

  if (!admin) {
    return res.status(401).json({
      status: 'error',
      message: 'Invalid credentials'
    });
  }

  // Check if password matches
  const isPasswordMatch = await admin.comparePassword(password);

  if (!isPasswordMatch) {
    return res.status(401).json({
      status: 'error',
      message: 'Invalid credentials'
    });
  }

  // Generate JWT token
  const token = admin.generateAuthToken();

  // Send response
  res.status(200).json({
    status: 'success',
    message: 'Login successful',
    data: {
      token,
      admin: {
        id: admin._id,
        email: admin.email,
        role: admin.role
      }
    }
  });
});

/**
 * @desc    Get current admin info
 * @route   GET /api/auth/me
 * @access  Private
 */
export const getMe = asyncHandler(async (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      admin: {
        id: req.user._id,
        email: req.user.email,
        role: req.user.role
      }
    }
  });
});
