import express from 'express';
import upload from '../config/multer.js';
import { uploadAndDistribute, getDistribution } from '../controllers/upload.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

// All upload routes are protected
router.use(protect);

/**
 * @route   POST /api/upload
 * @desc    Upload CSV/Excel and distribute leads
 * @access  Private
 */
router.post('/', upload.single('file'), uploadAndDistribute);

/**
 * @route   GET /api/upload/distribution
 * @desc    Get distribution report
 * @access  Private
 */
router.get('/distribution', getDistribution);

export default router;
