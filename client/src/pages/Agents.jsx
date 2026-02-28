import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import api from '../utils/api';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users, Plus, Pencil, Trash2, X, User, Mail, Phone, Lock, AlertCircle
} from 'lucide-react';

const AGENT_COLORS = ['#6c63ff', '#00d4ff', '#00ff88', '#ff6b9d', '#ffa726'];

const Agents = () => {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });

  useEffect(() => {
    fetchAgents();
  }, []);

  const fetchAgents = async () => {
    try {
      const response = await api.get('/agents');
      setAgents(response.data.data.agents);
    } catch (error) {
      toast.error('Failed to fetch agents');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (selectedAgent) {
        await api.put(`/agents/${selectedAgent._id}`, {
          name: formData.name,
          email: formData.email,
          phone: formData.phone
        });
        toast.success('Agent updated successfully');
      } else {
        await api.post('/agents', formData);
        toast.success('Agent created successfully');
      }

      setShowModal(false);
      resetForm();
      fetchAgents();
    } catch (error) {
      toast.error(
        error.response?.data?.message || 'Failed to save agent'
      );
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this agent?')) {
      return;
    }

    try {
      await api.delete(`/agents/${id}`);
      toast.success('Agent deleted successfully');
      fetchAgents();
    } catch (error) {
      toast.error('Failed to delete agent');
    }
  };

  const openAddModal = () => {
    resetForm();
    setSelectedAgent(null);
    setShowModal(true);
  };

  const openEditModal = (agent) => {
    setSelectedAgent(agent);
    setFormData({
      name: agent.name,
      email: agent.email,
      phone: agent.phone,
      password: ''
    });
    setShowModal(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      password: ''
    });
  };

  const closeModal = () => {
    setShowModal(false);
    resetForm();
    setSelectedAgent(null);
  };

  if (loading) {
    return (
      <Layout>
        <div className="space-y-6">
          <div className="h-8 w-48 skeleton" />
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-48 skeleton rounded-2xl" />
            ))}
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        >
          <div>
            <h1 className="text-2xl font-bold font-display text-white">Agents</h1>
            <p className="text-white/30 text-sm mt-1">Manage your team ({agents.length}/5 agents)</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={openAddModal}
            disabled={agents.length >= 5}
            className="neon-btn flex items-center gap-2 w-fit"
          >
            {agents.length >= 5 ? (
              <>
                <AlertCircle className="w-4 h-4" />
                <span>Limit Reached</span>
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                <span>Add Agent</span>
              </>
            )}
          </motion.button>
        </motion.div>

        {/* Capacity Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-4"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-white/40 font-medium">Agent Capacity</span>
            <span className="text-xs font-semibold text-neon-purple">{agents.length}/5</span>
          </div>
          <div className="h-2 rounded-full bg-white/[0.04] overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(agents.length / 5) * 100}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="h-full rounded-full"
              style={{ background: 'linear-gradient(90deg, #6c63ff, #00d4ff)' }}
            />
          </div>
        </motion.div>

        {/* Agent Cards/Table */}
        {agents.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-16 text-center"
          >
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white/[0.03] flex items-center justify-center">
              <Users className="w-8 h-8 text-white/20" />
            </div>
            <h3 className="text-white/50 font-medium mb-1">No agents found</h3>
            <p className="text-white/25 text-sm">Create your first agent to get started</p>
          </motion.div>
        ) : (
          <div className="glass-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/[0.06]">
                    <th className="text-left text-[10px] font-semibold text-white/30 uppercase tracking-wider py-3.5 px-4">Agent</th>
                    <th className="text-left text-[10px] font-semibold text-white/30 uppercase tracking-wider py-3.5 px-4">Email</th>
                    <th className="text-left text-[10px] font-semibold text-white/30 uppercase tracking-wider py-3.5 px-4">Phone</th>
                    <th className="text-left text-[10px] font-semibold text-white/30 uppercase tracking-wider py-3.5 px-4">Leads</th>
                    <th className="text-left text-[10px] font-semibold text-white/30 uppercase tracking-wider py-3.5 px-4">Created</th>
                    <th className="text-right text-[10px] font-semibold text-white/30 uppercase tracking-wider py-3.5 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence>
                    {agents.map((agent, i) => (
                      <motion.tr
                        key={agent._id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        transition={{ delay: 0.05 * i }}
                        className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors group"
                      >
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold shrink-0"
                                 style={{ background: AGENT_COLORS[i % AGENT_COLORS.length] + '20', color: AGENT_COLORS[i % AGENT_COLORS.length] }}>
                              {agent.name.charAt(0).toUpperCase()}
                            </div>
                            <span className="text-sm text-white font-medium">{agent.name}</span>
                          </div>
                        </td>
                        <td className="py-3.5 px-4 text-sm text-white/40">{agent.email}</td>
                        <td className="py-3.5 px-4 text-sm text-white/40 font-mono text-xs">{agent.phone}</td>
                        <td className="py-3.5 px-4">
                          <span className="inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-full bg-neon-purple/10 text-neon-purple border border-neon-purple/20">
                            {agent.leads?.length || 0}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-xs text-white/30">{new Date(agent.createdAt).toLocaleDateString()}</td>
                        <td className="py-3.5 px-4">
                          <div className="flex items-center justify-end gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => openEditModal(agent)}
                              className="w-8 h-8 rounded-lg bg-white/[0.05] hover:bg-neon-purple/20 flex items-center justify-center transition-colors"
                            >
                              <Pencil className="w-3.5 h-3.5 text-white/50 hover:text-neon-purple" />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleDelete(agent._id)}
                              className="w-8 h-8 rounded-lg bg-white/[0.05] hover:bg-red-500/20 flex items-center justify-center transition-colors"
                            >
                              <Trash2 className="w-3.5 h-3.5 text-white/50 hover:text-red-400" />
                            </motion.button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Add/Edit Agent Modal */}
        <AnimatePresence>
          {showModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-4"
              onClick={closeModal}
            >
              <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
                className="relative glass-card p-6 w-full max-w-md border border-neon-purple/20"
                style={{ background: 'rgba(13, 13, 20, 0.95)' }}
              >
                {/* Modal Header */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-lg font-semibold text-white">{selectedAgent ? 'Edit Agent' : 'Add New Agent'}</h2>
                    <p className="text-xs text-white/30 mt-0.5">{selectedAgent ? 'Update agent details' : 'Fill in the details below'}</p>
                  </div>
                  <button onClick={closeModal} className="w-8 h-8 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] flex items-center justify-center transition-colors">
                    <X className="w-4 h-4 text-white/50" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-white/40 uppercase tracking-wider mb-2">Name *</label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        minLength={2}
                        placeholder="Agent name"
                        className="glass-input pl-10"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-white/40 uppercase tracking-wider mb-2">Email *</label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="agent@email.com"
                        className="glass-input pl-10"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-white/40 uppercase tracking-wider mb-2">Phone (with country code) *</label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                      <input
                        type="text"
                        name="phone"
                        placeholder="+1234567890"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        pattern="^\+?[1-9]\d{1,14}$"
                        title="Phone number with country code (e.g., +1234567890)"
                        className="glass-input pl-10"
                      />
                    </div>
                  </div>

                  {!selectedAgent && (
                    <div>
                      <label className="block text-xs font-medium text-white/40 uppercase tracking-wider mb-2">Password *</label>
                      <div className="relative">
                        <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                        <input
                          type="password"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          required={!selectedAgent}
                          minLength={6}
                          placeholder="Min 6 characters"
                          className="glass-input pl-10"
                        />
                      </div>
                      <p className="text-[10px] text-white/20 mt-1.5">Minimum 6 characters</p>
                    </div>
                  )}

                  <div className="flex gap-3 pt-2">
                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      type="submit"
                      className="neon-btn flex-1 py-3"
                    >
                      {selectedAgent ? 'Update Agent' : 'Create Agent'}
                    </motion.button>
                    <button
                      type="button"
                      onClick={closeModal}
                      className="neon-btn neon-btn-ghost flex-1 py-3"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Layout>
  );
};

export default Agents;
