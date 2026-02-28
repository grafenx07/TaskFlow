import React, { useState } from 'react';
import { Sidebar, TopBar } from './Header';

const Layout = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-dark-900 relative">
      {/* Ambient orbs */}
      <div className="ambient-orb ambient-orb-1" />
      <div className="ambient-orb ambient-orb-2" />

      {/* Sidebar */}
      <Sidebar mobileOpen={mobileOpen} onCloseMobile={() => setMobileOpen(false)} />

      {/* Mobile top bar */}
      <TopBar onMenuToggle={() => setMobileOpen(!mobileOpen)} />

      {/* Main content */}
      <main className="lg:ml-[260px] relative z-10 min-h-screen">
        <div className="p-4 pt-16 lg:p-8 lg:pt-8 max-w-[1400px] mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
