import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Sidebar({ isOpen, setIsOpen }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const navItems = [
    { id: 'catalog', name: 'Catalog', icon: '📂', path: '/catalog' },
    { id: 'users', name: 'Users', icon: '👥', path: '/users' },
    { id: 'orders', name: 'Orders', icon: '📦', path: '/orders' },
    { id: 'settings', name: 'Settings', icon: '⚙', path: '/settings' }
  ];

  const getActiveItem = () => {
    const path = location.pathname;
    if (path.startsWith('/users')) return 'users';
    if (path.startsWith('/orders')) return 'orders';
    if (path.startsWith('/catalog') || path === '/') return 'catalog';
    if (path.startsWith('/settings')) return 'settings';
    return '';
  };

  const activeTab = getActiveItem();

  return (
    <>
      {/* Mobile Sidebar Backdrop */}
      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-40 bg-[#021813]/60 backdrop-blur-sm lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-emerald-950/80 border-r border-[#d4af37]/15 backdrop-blur-md flex flex-col justify-between transition-transform duration-300 lg:sticky lg:translate-x-0 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex flex-col flex-1">
          {/* Logo Brand Header */}
          <div className="h-20 border-b border-[#d4af37]/10 flex items-center justify-between px-6">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 flex items-center justify-center p-1.5 bg-emerald-950/70 border border-[#d4af37]/15 rounded-xl shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none" className="w-full h-full">
                  <path d="M12 8C12 8 16 20 24 20C32 20 36 8 36 8" stroke="#10b981" strokeWidth="3" strokeLinecap="round" />
                  <path d="M8 24C8 24 18 28 24 28C30 28 40 24 40 24" stroke="#d4af37" strokeWidth="3" strokeLinecap="round" />
                  <path d="M24 4V44" stroke="#d4af37" strokeWidth="3" strokeLinecap="round" strokeDasharray="2 3" />
                </svg>
              </div>
              <div>
                <span className="font-serif text-sm font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-yellow-100 to-yellow-500 block">
                  TEXTILE
                </span>
                <span className="block text-[8px] uppercase tracking-widest text-[#d4af37]">Admin Console</span>
              </div>
            </div>

            {/* Mobile Close Button */}
            <button 
              onClick={() => setIsOpen(false)}
              className="lg:hidden p-1.5 rounded-lg text-emerald-100/60 hover:text-white hover:bg-emerald-900/40 cursor-pointer"
            >
              ✕
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  if (!item.disabled) {
                    navigate(item.path);
                    setIsOpen(false);
                  }
                }}
                disabled={item.disabled}
                className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-xs sm:text-sm font-medium transition cursor-pointer bg-transparent border-0 text-left ${
                  item.disabled
                    ? 'opacity-40 cursor-not-allowed text-emerald-100/40'
                    : activeTab === item.id
                      ? 'bg-gradient-to-r from-emerald-800 to-teal-900 text-white shadow border border-[#d4af37]/20'
                      : 'text-emerald-100/70 hover:bg-emerald-900/20 hover:text-white'
                }`}
              >
                <span className="text-base">{item.icon}</span>
                <span>{item.name}</span>
                {item.disabled && (
                  <span className="ml-auto text-[9px] uppercase tracking-wider bg-emerald-950/40 text-emerald-100/40 px-1.5 py-0.5 rounded-md border border-emerald-500/10">
                    Draft
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Footer Logout Option */}
        <div className="p-4 border-t border-[#d4af37]/10 bg-emerald-950/20">
          <button
            onClick={() => {
              logout();
              navigate('/auth');
            }}
            className="w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-xs sm:text-sm font-medium text-rose-300 hover:bg-rose-950/20 hover:text-rose-100 transition cursor-pointer bg-transparent border-0 text-left"
          >
            <span className="text-base">🚪</span>
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
}
