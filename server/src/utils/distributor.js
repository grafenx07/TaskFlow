/**
 * Distribute leads equally among agents using round-robin algorithm
 * @param {Array} leads - Array of lead objects
 * @param {Array} agents - Array of agent objects
 * @returns {Map} - Map of agentId to array of leads
 */
export const distributeLeadsRoundRobin = (leads, agents) => {
  if (!leads || leads.length === 0) {
    throw new Error('No leads to distribute');
  }

  if (!agents || agents.length === 0) {
    throw new Error('No agents available for distribution');
  }

  // Create a map to store leads for each agent
  const distribution = new Map();

  // Initialize empty arrays for each agent
  agents.forEach(agent => {
    distribution.set(agent._id.toString(), []);
  });

  // Distribute leads in round-robin fashion
  leads.forEach((lead, index) => {
    // Calculate which agent should receive this lead
    const agentIndex = index % agents.length;
    const agent = agents[agentIndex];
    const agentId = agent._id.toString();

    // Add lead to this agent's array
    distribution.get(agentId).push(lead);
  });

  return distribution;
};

/**
 * Get distribution statistics
 * @param {Map} distribution - Distribution map
 * @returns {Object} - Statistics object
 */
export const getDistributionStats = (distribution) => {
  const stats = {
    totalAgents: distribution.size,
    totalLeads: 0,
    agentStats: []
  };

  distribution.forEach((leads, agentId) => {
    stats.totalLeads += leads.length;
    stats.agentStats.push({
      agentId,
      leadsCount: leads.length
    });
  });

  return stats;
};
