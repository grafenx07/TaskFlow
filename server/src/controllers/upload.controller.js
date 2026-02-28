import fs from 'fs';
import Agent from '../models/Agent.model.js';
import { asyncHandler } from '../middleware/error.middleware.js';
import { parseFile, validateRecords, normalizeRecords } from '../utils/csvParser.js';
import { distributeLeadsRoundRobin, getDistributionStats } from '../utils/distributor.js';

/**
 * @desc    Upload CSV/Excel file and distribute leads to agents
 * @route   POST /api/upload
 * @access  Private
 */
export const uploadAndDistribute = asyncHandler(async (req, res) => {
  // Check if file was uploaded
  if (!req.file) {
    return res.status(400).json({
      status: 'error',
      message: 'Please upload a file'
    });
  }

  const filePath = req.file.path;

  try {
    // 1. Parse the uploaded file
    const records = await parseFile(filePath);

    // 2. Validate records
    const validation = validateRecords(records);

    if (!validation.valid) {
      // Delete uploaded file
      fs.unlinkSync(filePath);

      return res.status(400).json({
        status: 'error',
        message: 'File validation failed',
        errors: validation.errors
      });
    }

    // 3. Normalize records (handle case-insensitive field names)
    const normalizedLeads = normalizeRecords(records);

    // 4. Get all active agents
    const agents = await Agent.find({ isActive: true });

    if (agents.length === 0) {
      // Delete uploaded file
      fs.unlinkSync(filePath);

      return res.status(400).json({
        status: 'error',
        message: 'No active agents available for distribution'
      });
    }

    // 5. Distribute leads using round-robin
    const distribution = distributeLeadsRoundRobin(normalizedLeads, agents);

    // 6. Save leads to each agent
    const updatePromises = [];

    distribution.forEach((leads, agentId) => {
      // Add leads to the agent's existing leads array
      const promise = Agent.findByIdAndUpdate(
        agentId,
        { $push: { leads: { $each: leads } } },
        { new: true }
      );
      updatePromises.push(promise);
    });

    await Promise.all(updatePromises);

    // 7. Get statistics
    const stats = getDistributionStats(distribution);

    // 8. Delete uploaded file after processing
    fs.unlinkSync(filePath);

    // 9. Send response
    res.status(200).json({
      status: 'success',
      message: 'File uploaded and leads distributed successfully',
      data: {
        totalLeads: stats.totalLeads,
        totalAgents: stats.totalAgents,
        distribution: stats.agentStats
      }
    });

  } catch (error) {
    // Delete uploaded file in case of error
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    throw error;
  }
});

/**
 * @desc    Get distribution report (all agents with their leads)
 * @route   GET /api/upload/distribution
 * @access  Private
 */
export const getDistribution = asyncHandler(async (req, res) => {
  const agents = await Agent.find()
    .select('name email phone leads')
    .sort({ createdAt: -1 });

  const report = agents.map(agent => ({
    agentId: agent._id,
    name: agent.name,
    email: agent.email,
    phone: agent.phone,
    totalLeads: agent.leads.length,
    leads: agent.leads
  }));

  res.status(200).json({
    status: 'success',
    results: agents.length,
    data: { distribution: report }
  });
});
