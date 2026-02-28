import Agent from '../models/Agent.model.js';
import { asyncHandler } from '../middleware/error.middleware.js';

/**
 * @desc    Create a new agent
 * @route   POST /api/agents
 * @access  Private
 */
export const createAgent = asyncHandler(async (req, res) => {
  const { name, email, phone, password } = req.body;

  // Check if maximum 5 agents already exist
  const agentCount = await Agent.countDocuments();

  if (agentCount >= 5) {
    return res.status(400).json({
      status: 'error',
      message: 'Maximum limit of 5 agents reached'
    });
  }

  // Create agent
  const agent = await Agent.create({
    name,
    email,
    phone,
    password
  });

  // Return agent without password
  const agentResponse = agent.toObject();
  delete agentResponse.password;

  res.status(201).json({
    status: 'success',
    message: 'Agent created successfully',
    data: { agent: agentResponse }
  });
});

/**
 * @desc    Get all agents
 * @route   GET /api/agents
 * @access  Private
 */
export const getAllAgents = asyncHandler(async (req, res) => {
  const agents = await Agent.find().select('-password').sort({ createdAt: -1 });

  res.status(200).json({
    status: 'success',
    results: agents.length,
    data: { agents }
  });
});

/**
 * @desc    Get single agent by ID
 * @route   GET /api/agents/:id
 * @access  Private
 */
export const getAgentById = asyncHandler(async (req, res) => {
  const agent = await Agent.findById(req.params.id).select('-password');

  if (!agent) {
    return res.status(404).json({
      status: 'error',
      message: 'Agent not found'
    });
  }

  res.status(200).json({
    status: 'success',
    data: { agent }
  });
});

/**
 * @desc    Update agent
 * @route   PUT /api/agents/:id
 * @access  Private
 */
export const updateAgent = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;

  const agent = await Agent.findById(req.params.id);

  if (!agent) {
    return res.status(404).json({
      status: 'error',
      message: 'Agent not found'
    });
  }

  // Update fields
  if (name) agent.name = name;
  if (email) agent.email = email;
  if (phone) agent.phone = phone;

  await agent.save();

  const agentResponse = agent.toObject();
  delete agentResponse.password;

  res.status(200).json({
    status: 'success',
    message: 'Agent updated successfully',
    data: { agent: agentResponse }
  });
});

/**
 * @desc    Delete agent
 * @route   DELETE /api/agents/:id
 * @access  Private
 */
export const deleteAgent = asyncHandler(async (req, res) => {
  const agent = await Agent.findById(req.params.id);

  if (!agent) {
    return res.status(404).json({
      status: 'error',
      message: 'Agent not found'
    });
  }

  await agent.deleteOne();

  res.status(200).json({
    status: 'success',
    message: 'Agent deleted successfully'
  });
});
