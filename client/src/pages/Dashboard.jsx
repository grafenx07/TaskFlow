import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import api from '../utils/api';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, FileText, BarChart3, Shield, TrendingUp, Activity } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const AnimatedCounter = ({ value, duration = 1.2 }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const end = value;
    if (end === 0) return;
    const increment = end / (duration * 60);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [value, duration]);
  return <span>{count}</span>;
};

const CHART_COLORS = ['#6c63ff', '#00d4ff', '#00ff88', '#ff6b9d', '#ffa726'];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card px-3 py-2 text-xs">
        <p className="text-white font-medium">{payload[0].name}</p>
        <p className="text-neon-cyan">{payload[0].value} leads</p>
      </div>
    );
  }
  return null;
};

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalAgents: 0,
    totalLeads: 0,
    distribution: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [agentsRes, distributionRes] = await Promise.all([
        api.get('/agents'),
        api.get('/upload/distribution')
      ]);

      const agents = agentsRes.data.data.agents;
      const distribution = distributionRes.data.data.distribution;

      const totalLeads = distribution.reduce((sum, agent) => sum + agent.totalLeads, 0);

      setStats({
        totalAgents: agents.length,
        totalLeads,
        distribution
      });
    } catch (error) {
      toast.error('Failed to fetch dashboard data');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const chartData = stats.distribution.map(agent => ({
    name: agent.name,
    value: agent.totalLeads
  }));

  const statCards = [
    {
      label: 'Total Agents',
      value: stats.totalAgents,
      icon: Users,
      gradient: 'from-neon-purple/20 to-neon-purple/5',
      iconColor: 'text-neon-purple',
      borderColor: 'border-neon-purple/20',
    },
    {
      label: 'Total Leads',
      value: stats.totalLeads,
      icon: FileText,
      gradient: 'from-neon-cyan/20 to-neon-cyan/5',
      iconColor: 'text-neon-cyan',
      borderColor: 'border-neon-cyan/20',
    },
    {
      label: 'Avg per Agent',
      value: stats.totalAgents > 0 ? Math.floor(stats.totalLeads / stats.totalAgents) : 0,
      icon: BarChart3,
      gradient: 'from-neon-green/20 to-neon-green/5',
      iconColor: 'text-neon-green',
      borderColor: 'border-neon-green/20',
    },
    {
      label: 'Max Capacity',
      value: 5,
      icon: Shield,
      gradient: 'from-neon-pink/20 to-neon-pink/5',
      iconColor: 'text-neon-pink',
      borderColor: 'border-neon-pink/20',
    }
  ];

  if (loading) {
    return (
      <Layout>
        <div className="space-y-6">
          <div className="h-8 w-48 skeleton" />
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-32 skeleton rounded-2xl" />
            ))}
          </div>
          <div className="h-64 skeleton rounded-2xl" />
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
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-2xl font-bold font-display text-white">Dashboard</h1>
          <p className="text-white/30 text-sm mt-1">Overview of your lead distribution system</p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {statCards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className={`glass-card-hover p-5 border ${card.borderColor}`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-medium text-white/40 uppercase tracking-wider mb-2">{card.label}</p>
                    <p className="text-3xl font-bold font-display text-white">
                      <AnimatedCounter value={card.value} />
                    </p>
                  </div>
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${card.gradient} flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 ${card.iconColor}`} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Chart + Distribution Table */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Pie Chart */}
          {chartData.length > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="glass-card p-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <Activity className="w-4 h-4 text-neon-purple" />
                <h3 className="text-sm font-semibold text-white">Distribution Chart</h3>
              </div>
              <div className="h-[220px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={85}
                      paddingAngle={4}
                      dataKey="value"
                      stroke="none"
                    >
                      {chartData.map((_, index) => (
                        <Cell key={index} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              {/* Legend */}
              <div className="mt-4 space-y-2">
                {chartData.map((entry, index) => (
                  <div key={index} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ background: CHART_COLORS[index % CHART_COLORS.length] }} />
                      <span className="text-white/50">{entry.name}</span>
                    </div>
                    <span className="text-white/70 font-medium">{entry.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Distribution Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className={`glass-card p-6 ${chartData.length > 0 ? 'xl:col-span-2' : 'xl:col-span-3'}`}
          >
            <div className="flex items-center gap-2 mb-5">
              <TrendingUp className="w-4 h-4 text-neon-cyan" />
              <h3 className="text-sm font-semibold text-white">Lead Distribution</h3>
            </div>

            {stats.distribution.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white/[0.03] flex items-center justify-center">
                  <Users className="w-8 h-8 text-white/20" />
                </div>
                <h3 className="text-white/50 font-medium mb-1">No agents or leads found</h3>
                <p className="text-white/25 text-sm">Create agents and upload CSV files to get started</p>
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
                      <th className="text-left text-[10px] font-semibold text-white/30 uppercase tracking-wider py-3 px-3">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <AnimatePresence>
                      {stats.distribution.map((agent, i) => (
                        <motion.tr
                          key={agent.agentId}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.05 * i }}
                          className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors"
                        >
                          <td className="py-3 px-3">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-[11px] font-bold"
                                   style={{ background: CHART_COLORS[i % CHART_COLORS.length] + '20', color: CHART_COLORS[i % CHART_COLORS.length] }}>
                                {agent.name.charAt(0)}
                              </div>
                              <span className="text-sm text-white font-medium">{agent.name}</span>
                            </div>
                          </td>
                          <td className="py-3 px-3 text-sm text-white/50">{agent.email}</td>
                          <td className="py-3 px-3 text-sm text-white/50">{agent.phone}</td>
                          <td className="py-3 px-3">
                            <span className="text-sm font-semibold text-neon-purple">{agent.totalLeads}</span>
                          </td>
                          <td className="py-3 px-3">
                            <span className="inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-full bg-neon-green/10 text-neon-green border border-neon-green/20">
                              <span className="w-1.5 h-1.5 rounded-full bg-neon-green animate-pulse" />
                              Active
                            </span>
                          </td>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </tbody>
                </table>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
