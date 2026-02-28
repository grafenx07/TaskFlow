import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import api from '../utils/api';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Upload as UploadIcon, FileSpreadsheet, X, CheckCircle2,
  CloudUpload, File, Eye, BarChart3, Loader2
} from 'lucide-react';

const AGENT_COLORS = ['#6c63ff', '#00d4ff', '#00ff88', '#ff6b9d', '#ffa726'];

const Upload = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [distribution, setDistribution] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const [selectedAgentLeads, setSelectedAgentLeads] = useState(null);

  useEffect(() => {
    fetchDistribution();
  }, []);

  const fetchDistribution = async () => {
    try {
      const response = await api.get('/upload/distribution');
      setDistribution(response.data.data.distribution);
    } catch (error) {
      toast.error('Failed to fetch distribution data');
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (selectedFile) => {
    const allowedTypes = ['text/csv', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
    const allowedExtensions = ['.csv', '.xlsx', '.xls'];
    const fileExtension = selectedFile.name.toLowerCase().slice(selectedFile.name.lastIndexOf('.'));

    if (!allowedExtensions.includes(fileExtension) && !allowedTypes.includes(selectedFile.type)) {
      toast.error('Only CSV, XLSX, and XLS files are allowed');
      return;
    }

    setFile(selectedFile);
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error('Please select a file first');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    setUploading(true);

    try {
      const response = await api.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      toast.success(response.data.message);
      setFile(null);
      fetchDistribution();
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to upload file';
      const errors = error.response?.data?.errors;

      if (errors && Array.isArray(errors)) {
        errors.forEach((err) => toast.error(err));
      } else {
        toast.error(errorMessage);
      }
    } finally {
      setUploading(false);
    }
  };

  const viewLeads = (agent) => {
    setSelectedAgentLeads(agent);
  };

  const closeLeadsModal = () => {
    setSelectedAgentLeads(null);
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-2xl font-bold font-display text-white">Upload & Distribute</h1>
          <p className="text-white/30 text-sm mt-1">Upload CSV/Excel files to distribute leads among agents</p>
        </motion.div>

        {/* Upload Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-6"
        >
          <div className="flex items-center gap-2 mb-5">
            <CloudUpload className="w-4 h-4 text-neon-purple" />
            <h3 className="text-sm font-semibold text-white">Upload File</h3>
          </div>

          {/* Drop zone */}
          <motion.div
            whileHover={{ scale: 1.005 }}
            className={`
              relative rounded-2xl border-2 border-dashed p-10 text-center cursor-pointer
              transition-all duration-300
              ${dragActive
                ? 'border-neon-purple bg-neon-purple/5'
                : file
                  ? 'border-neon-green/40 bg-neon-green/5'
                  : 'border-white/10 hover:border-neon-purple/30 hover:bg-white/[0.02]'
              }
            `}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => document.getElementById('fileInput').click()}
          >
            <input
              type="file"
              id="fileInput"
              accept=".csv,.xlsx,.xls"
              onChange={handleFileChange}
              className="hidden"
            />

            <AnimatePresence mode="wait">
              {file ? (
                <motion.div
                  key="file-selected"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex flex-col items-center"
                >
                  <div className="w-14 h-14 rounded-2xl bg-neon-green/10 border border-neon-green/20 flex items-center justify-center mb-4">
                    <FileSpreadsheet className="w-7 h-7 text-neon-green" />
                  </div>
                  <p className="text-white font-medium text-sm">{file.name}</p>
                  <p className="text-white/30 text-xs mt-1">{(file.size / 1024).toFixed(2)} KB</p>
                </motion.div>
              ) : (
                <motion.div
                  key="no-file"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex flex-col items-center"
                >
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-colors ${dragActive ? 'bg-neon-purple/20 border border-neon-purple/30' : 'bg-white/[0.04] border border-white/[0.06]'}`}>
                    <UploadIcon className={`w-7 h-7 ${dragActive ? 'text-neon-purple' : 'text-white/20'}`} />
                  </div>
                  <p className="text-white/60 font-medium text-sm">
                    {dragActive ? 'Drop your file here' : 'Drag & Drop or Click to Upload'}
                  </p>
                  <p className="text-white/20 text-xs mt-2">Supported: CSV, XLSX, XLS (Max 5MB)</p>
                  <p className="text-white/15 text-[10px] mt-1">Required fields: FirstName, Phone, Notes (optional)</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Action buttons */}
          <AnimatePresence>
            {file && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="flex items-center gap-3 mt-5"
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleUpload}
                  className="neon-btn neon-btn-success flex items-center gap-2"
                  disabled={uploading}
                >
                  {uploading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Uploading...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Upload & Distribute</span>
                    </>
                  )}
                </motion.button>
                <button
                  onClick={(e) => { e.stopPropagation(); setFile(null); }}
                  className="neon-btn neon-btn-ghost flex items-center gap-2"
                  disabled={uploading}
                >
                  <X className="w-4 h-4" />
                  <span>Cancel</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Upload progress */}
          {uploading && (
            <div className="mt-4">
              <div className="h-1.5 rounded-full bg-white/[0.04] overflow-hidden">
                <motion.div
                  initial={{ width: '0%' }}
                  animate={{ width: '90%' }}
                  transition={{ duration: 3, ease: 'easeOut' }}
                  className="h-full rounded-full"
                  style={{ background: 'linear-gradient(90deg, #6c63ff, #00d4ff, #00ff88)' }}
                />
              </div>
            </div>
          )}
        </motion.div>

        {/* Distribution Report */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-6"
        >
          <div className="flex items-center gap-2 mb-5">
            <BarChart3 className="w-4 h-4 text-neon-cyan" />
            <h3 className="text-sm font-semibold text-white">Distribution Report</h3>
          </div>

          {distribution.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white/[0.03] flex items-center justify-center">
                <File className="w-8 h-8 text-white/20" />
              </div>
              <h3 className="text-white/50 font-medium mb-1">No distribution data</h3>
              <p className="text-white/25 text-sm">Upload a CSV file to distribute leads among agents</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/[0.06]">
                    <th className="text-left text-[10px] font-semibold text-white/30 uppercase tracking-wider py-3 px-3">Agent</th>
                    <th className="text-left text-[10px] font-semibold text-white/30 uppercase tracking-wider py-3 px-3">Email</th>
                    <th className="text-left text-[10px] font-semibold text-white/30 uppercase tracking-wider py-3 px-3">Phone</th>
                    <th className="text-left text-[10px] font-semibold text-white/30 uppercase tracking-wider py-3 px-3">Leads</th>
                    <th className="text-right text-[10px] font-semibold text-white/30 uppercase tracking-wider py-3 px-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence>
                    {distribution.map((agent, i) => (
                      <motion.tr
                        key={agent.agentId}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.05 * i }}
                        className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors"
                      >
                        <td className="py-3 px-3">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-[11px] font-bold shrink-0"
                                 style={{ background: AGENT_COLORS[i % AGENT_COLORS.length] + '20', color: AGENT_COLORS[i % AGENT_COLORS.length] }}>
                              {agent.name.charAt(0)}
                            </div>
                            <span className="text-sm text-white font-medium">{agent.name}</span>
                          </div>
                        </td>
                        <td className="py-3 px-3 text-sm text-white/40">{agent.email}</td>
                        <td className="py-3 px-3 text-sm text-white/40 font-mono text-xs">{agent.phone}</td>
                        <td className="py-3 px-3">
                          <span className="text-sm font-semibold text-neon-cyan">{agent.totalLeads}</span>
                        </td>
                        <td className="py-3 px-3 text-right">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => viewLeads(agent)}
                            disabled={agent.totalLeads === 0}
                            className="neon-btn py-1.5 px-3 text-xs disabled:opacity-30"
                          >
                            <div className="flex items-center gap-1.5">
                              <Eye className="w-3 h-3" />
                              <span>View</span>
                            </div>
                          </motion.button>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          )}
        </motion.div>

        {/* Leads Modal */}
        <AnimatePresence>
          {selectedAgentLeads && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-4"
              onClick={closeLeadsModal}
            >
              <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
                className="relative glass-card p-6 w-full max-w-3xl max-h-[85vh] overflow-y-auto border border-neon-cyan/20"
                style={{ background: 'rgba(13, 13, 20, 0.95)' }}
              >
                {/* Modal Header */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-lg font-semibold text-white">
                      Leads for {selectedAgentLeads.name}
                    </h2>
                    <p className="text-xs text-white/30 mt-0.5">{selectedAgentLeads.totalLeads} leads assigned</p>
                  </div>
                  <button onClick={closeLeadsModal} className="w-8 h-8 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] flex items-center justify-center transition-colors">
                    <X className="w-4 h-4 text-white/50" />
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/[0.06]">
                        <th className="text-left text-[10px] font-semibold text-white/30 uppercase tracking-wider py-3 px-3">#</th>
                        <th className="text-left text-[10px] font-semibold text-white/30 uppercase tracking-wider py-3 px-3">First Name</th>
                        <th className="text-left text-[10px] font-semibold text-white/30 uppercase tracking-wider py-3 px-3">Phone</th>
                        <th className="text-left text-[10px] font-semibold text-white/30 uppercase tracking-wider py-3 px-3">Notes</th>
                        <th className="text-left text-[10px] font-semibold text-white/30 uppercase tracking-wider py-3 px-3">Assigned</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedAgentLeads.leads.map((lead, index) => (
                        <motion.tr
                          key={lead._id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.03 * index }}
                          className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors"
                        >
                          <td className="py-2.5 px-3 text-xs text-white/25">{index + 1}</td>
                          <td className="py-2.5 px-3 text-sm text-white font-medium">{lead.firstName}</td>
                          <td className="py-2.5 px-3 text-sm text-white/40 font-mono text-xs">{lead.phone}</td>
                          <td className="py-2.5 px-3 text-sm text-white/30">{lead.notes || '-'}</td>
                          <td className="py-2.5 px-3 text-xs text-white/25">{new Date(lead.assignedAt).toLocaleDateString()}</td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-5 text-right">
                  <button onClick={closeLeadsModal} className="neon-btn neon-btn-ghost py-2 px-4 text-xs">
                    Close
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Layout>
  );
};

export default Upload;
