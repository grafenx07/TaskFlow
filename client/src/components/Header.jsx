import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Users,
  Upload,
  LogOut,
  Zap,
  ChevronRight,
  Menu,
  X
} from 'lucide-react';

const Sidebar = ({ mobileOpen, onCloseMobile }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { path: '/', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/agents', label: 'Agents', icon: Users },
    { path: '/upload', label: 'Upload CSV', icon: Upload }
  ];

  const handleNav = (path) => {
    navigate(path);
    if (onCloseMobile) onCloseMobile();
  };

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 h-full z-50 w-[260px]
          flex flex-col
          border-r border-white/[0.06]
          transition-transform duration-300 ease-in-out
          lg:translate-x-0
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
        style={{
          background: 'rgba(13, 13, 20, 0.95)',
          backdropFilter: 'blur(20px)',
        }}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-6 py-6 border-b border-white/[0.06]">
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #6c63ff, #00d4ff)' }}
            >
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold font-display gradient-text">TaskFlow</span>
          </div>
          <button className="lg:hidden text-white/40 hover:text-white" onClick={onCloseMobile}>
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <motion.button
                key={item.path}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleNav(item.path)}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium
                  transition-all duration-200 group relative
                  ${isActive
                    ? 'text-white'
                    : 'text-white/40 hover:text-white/70'
                  }
                `}
                style={isActive ? {
                  background: 'linear-gradient(135deg, rgba(108,99,255,0.15), rgba(0,212,255,0.08))',
                  border: '1px solid rgba(108,99,255,0.2)',
                } : {
                  background: 'transparent',
                  border: '1px solid transparent',
                }}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 rounded-full"
                    style={{ background: 'linear-gradient(180deg, #6c63ff, #00d4ff)' }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <Icon className={`w-[18px] h-[18px] ${isActive ? 'text-neon-purple' : ''}`} />
                <span>{item.label}</span>
                {isActive && <ChevronRight className="w-4 h-4 ml-auto text-neon-purple/50" />}
              </motion.button>
            );
          })}
        </nav>

        {/* User section */}
        <div className="p-4 border-t border-white/[0.06]">
          <div className="glass-card p-3 mb-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold"
                   style={{ background: 'linear-gradient(135deg, #6c63ff, #00d4ff)' }}>
                {user?.email?.charAt(0).toUpperCase() || 'A'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-white truncate">Admin</p>
                <p className="text-[10px] text-white/30 truncate">{user?.email}</p>
              </div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-white/40 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
};

// Top bar for mobile
const TopBar = ({ onMenuToggle }) => (
  <div className="lg:hidden fixed top-0 left-0 right-0 z-30 flex items-center justify-between px-4 py-3 border-b border-white/[0.06]"
       style={{ background: 'rgba(10,10,15,0.9)', backdropFilter: 'blur(20px)' }}>
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-lg flex items-center justify-center"
           style={{ background: 'linear-gradient(135deg, #6c63ff, #00d4ff)' }}>
        <Zap className="w-4 h-4 text-white" />
      </div>
      <span className="text-sm font-bold font-display gradient-text">TaskFlow</span>
    </div>
    <button onClick={onMenuToggle} className="text-white/50 hover:text-white p-1">
      <Menu className="w-5 h-5" />
    </button>
  </div>
);

export { Sidebar, TopBar };
export default Sidebar;
