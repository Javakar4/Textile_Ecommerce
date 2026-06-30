import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useAuth } from '../../context/AuthContext';

export default function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const { adminUser } = useAuth();

  const getViewTitle = () => {
    const path = location.pathname;
    if (path.startsWith('/users')) {
      if (path.split('/').length > 2) return 'User Details';
      return 'User Management';
    }
    if (path.startsWith('/orders')) {
      if (path.split('/').length > 2) return 'Order Details';
      return 'Order Management';
    }
    return 'Catalog Center';
  };

  const getBreadcrumbs = () => {
    const path = location.pathname;
    if (path.startsWith('/users')) {
      if (path.split('/').length > 2) {
        return ['User Management', 'Details'];
      }
      return ['User Management'];
    }
    if (path.startsWith('/orders')) {
      if (path.split('/').length > 2) {
        return ['Order Management', 'Details'];
      }
      return ['Order Management'];
    }
    return ['Catalog Center'];
  };

  return (
    <div className="min-h-screen bg-[#022c22] bg-grid-pattern text-slate-100 flex font-sans">
      {/* Sidebar Navigation */}
      <Sidebar
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />

      {/* Main Content Area Container */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header navbar */}
        <header className="h-20 border-b border-[#d4af37]/15 bg-emerald-950/40 backdrop-blur-md sticky top-0 z-30 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Hamburger Button for mobile */}
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl bg-emerald-950/60 border border-emerald-500/20 text-[#d4af37] hover:text-white cursor-pointer transition text-lg"
              title="Open Navigation"
            >
              ☰
            </button>

            {/* Breadcrumb path for desktop */}
            <div className="hidden lg:flex items-center gap-2 text-xs font-semibold text-emerald-100/50 uppercase tracking-widest font-mono select-none">
              <span>Admin Dashboard</span>
              {getBreadcrumbs().map((b, idx) => (
                <React.Fragment key={idx}>
                  <span>/</span>
                  <span className={idx === getBreadcrumbs().length - 1 ? 'text-[#d4af37]' : ''}>{b}</span>
                </React.Fragment>
              ))}
            </div>

            {/* Title for mobile */}
            <div className="flex lg:hidden items-center gap-2 select-none">
              <span className="font-serif text-sm font-bold tracking-widest text-[#d4af37]">TEXTILE</span>
              <span className="text-[10px] text-emerald-100/40">/</span>
              <span className="text-[11px] font-bold text-white uppercase tracking-wider">{getViewTitle()}</span>
            </div>
          </div>

          {/* User profile info panel */}
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-block text-right select-none">
              <span className="block text-xs font-bold text-white leading-none">{adminUser.fullName || 'Admin Portal'}</span>
              <span className="text-[10px] text-[#d4af37]/75 font-mono">{adminUser.email || 'active session'}</span>
            </span>
            <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-[#d4af37]/20 flex items-center justify-center font-bold text-xs text-[#d4af37] shadow-inner select-none overflow-hidden">
              {adminUser.avatar ? (
                <img src={adminUser.avatar} alt="avatar" className="w-full h-full object-cover" />
              ) : (
                adminUser.fullName ? adminUser.fullName.charAt(0).toUpperCase() : 'A'
              )}
            </div>
          </div>
        </header>

        {/* Inner Content Grid */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
