import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { toast } from 'react-hot-toast';

export default function Settings() {
  // Password State
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

  // Maintenance Mode State
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [isLoadingSettings, setIsLoadingSettings] = useState(true);
  const [isTogglingMaintenance, setIsTogglingMaintenance] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // Load current settings
  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setIsLoadingSettings(true);
      const res = await api.getMaintenanceStatus();
      if (res.success && res.data) {
        setMaintenanceMode(!!res.data.maintenanceMode);
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to load system settings');
    } finally {
      setIsLoadingSettings(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error('Please fill in all password fields.');
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error('New passwords do not match.');
      return;
    }

    if (newPassword.length < 6) {
      toast.error('New password must be at least 6 characters.');
      return;
    }

    try {
      setIsUpdatingPassword(true);
      const res = await api.changePassword(currentPassword, newPassword);
      if (res.success) {
        toast.success(res.message || 'Password updated successfully.');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        toast.error(res.message || 'Failed to update password.');
      }
    } catch (err) {
      toast.error(err.message || 'Error updating password.');
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  const handleToggleMaintenance = async () => {
    const targetState = !maintenanceMode;
    try {
      setIsTogglingMaintenance(true);
      const res = await api.toggleMaintenance(targetState);
      if (res.success) {
        setMaintenanceMode(targetState);
        toast.success(
          `Maintenance mode ${targetState ? 'activated' : 'deactivated'} successfully.`
        );
      } else {
        toast.error(res.message || 'Failed to toggle maintenance mode.');
      }
    } catch (err) {
      toast.error(err.message || 'Error toggling maintenance mode.');
    } finally {
      setIsTogglingMaintenance(false);
      setShowConfirmModal(false);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header section */}
      <div className="border-b border-emerald-500/10 pb-4">
        <h2 className="text-3xl font-bold font-serif text-white tracking-tight relative pb-3 after:absolute after:bottom-0 after:left-0 after:w-20 after:h-0.5 after:bg-gradient-to-r after:from-[#d4af37] after:to-transparent">
          System Settings
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Password Management Card */}
        <div className="bg-gradient-to-b from-[#031d17]/95 to-[#021410]/95 border border-emerald-500/20 rounded-3xl p-8 shadow-2xl relative overflow-hidden transition-all duration-300 hover:border-[#d4af37]/30 flex flex-col justify-between">
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#d4af37]/5 rounded-full blur-3xl pointer-events-none" />
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl select-none">🔐</span>
              <h3 className="text-xl font-bold font-serif text-[#d4af37] tracking-wide">Admin Password</h3>
            </div>

            <form onSubmit={handlePasswordChange} className="space-y-5">
              <div>
                <label className="text-[11px] font-mono font-bold tracking-wider text-[#d4af37]/80 mb-1.5 block ml-1 uppercase">
                  Current Password
                </label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="off"
                  className="w-full bg-[#02110a] border border-[#d4af37]/15 rounded-xl px-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] transition duration-200"
                />
              </div>

              <div>
                <label className="text-[11px] font-mono font-bold tracking-wider text-[#d4af37]/80 mb-1.5 block ml-1 uppercase">
                  New Password
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="off"
                  className="w-full bg-[#02110a] border border-[#d4af37]/15 rounded-xl px-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] transition duration-200"
                />
              </div>

              <div>
                <label className="text-[11px] font-mono font-bold tracking-wider text-[#d4af37]/80 mb-1.5 block ml-1 uppercase">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="off"
                  className="w-full bg-[#02110a] border border-[#d4af37]/15 rounded-xl px-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] transition duration-200"
                />
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  disabled={isUpdatingPassword}
                  className="w-full sm:w-auto px-6 py-3 bg-[#d4af37] hover:bg-amber-400 text-emerald-950 font-bold rounded-xl text-xs sm:text-sm shadow-xl transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
                >
                  {isUpdatingPassword ? 'Updating...' : 'Save Password'}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Maintenance Mode Card */}
        <div className="bg-gradient-to-b from-[#031d17]/95 to-[#021410]/95 border border-emerald-500/20 rounded-3xl p-8 shadow-2xl relative overflow-hidden transition-all duration-300 hover:border-[#d4af37]/30 flex flex-col justify-between">
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl select-none">🛠️</span>
              <h3 className="text-xl font-bold font-serif text-[#d4af37] tracking-wide">Maintenance Mode</h3>
            </div>

            {isLoadingSettings ? (
              <div className="py-12 text-center">
                <div className="w-10 h-10 border-4 border-t-emerald-500 border-emerald-950/40 rounded-full animate-spin mx-auto"></div>
                <span className="text-emerald-100/40 text-xs mt-3 block font-mono">Retrieving state...</span>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="bg-[#02110a] border border-[#d4af37]/15 rounded-2xl p-5 flex items-center justify-between shadow-inner">
                  <div>
                    <span className="block text-xs font-mono text-emerald-100/40 uppercase tracking-wider">Store Status</span>
                    <span className="block text-sm font-bold text-white mt-1">
                      {maintenanceMode ? 'Locked (Admin Access Only)' : 'Active (Open to Public)'}
                    </span>
                  </div>

                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      maintenanceMode
                        ? 'bg-rose-500/15 text-rose-300 border border-rose-500/30'
                        : 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        maintenanceMode ? 'bg-rose-400 animate-pulse' : 'bg-emerald-400'
                      }`}
                    />
                    {maintenanceMode ? 'Offline' : 'Online'}
                  </span>
                </div>

                <div className="border-t border-emerald-500/10 pt-4 flex items-center justify-between">
                  <div className="pr-4">
                    <span className="block text-xs font-semibold text-emerald-100/80">Configure Status Toggle</span>
                    <span className="block text-[11px] text-emerald-100/40 mt-0.5">Toggle to instantly update shopper traffic availability parameters.</span>
                  </div>
                  <button
                    onClick={() => setShowConfirmModal(true)}
                    className={`relative inline-flex h-7 w-12 items-center rounded-full transition-all duration-300 focus:outline-none cursor-pointer flex-shrink-0 ${
                      maintenanceMode 
                        ? 'bg-rose-600/80 shadow-[0_0_12px_rgba(239,68,68,0.4)]' 
                        : 'bg-emerald-700/80 shadow-[0_0_12px_rgba(16,185,129,0.3)]'
                    }`}
                  >
                    <span
                      className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform duration-300 ${
                        maintenanceMode ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#021813]/85 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#031d17] border border-[#d4af37]/35 rounded-3xl max-w-md w-full p-8 shadow-2xl space-y-5">
            <div className="flex items-center gap-3">
              <span className="text-2xl select-none">⚠️</span>
              <h4 className="text-lg font-bold font-serif text-white tracking-wide">
                Confirm Status Override
              </h4>
            </div>
            <p className="text-emerald-100/70 text-xs sm:text-sm leading-relaxed">
              Are you absolutely sure you want to {maintenanceMode ? 'deactivate' : 'activate'} System Maintenance Mode?
              {!maintenanceMode && ' This will immediately restrict site access to administrative staff only.'}
            </p>
            <div className="flex justify-end gap-3 pt-3 border-t border-emerald-500/10">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-emerald-100/60 hover:text-white bg-transparent border-0 cursor-pointer transition duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleToggleMaintenance}
                disabled={isTogglingMaintenance}
                className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white border-0 cursor-pointer transition duration-200 ${
                  maintenanceMode
                    ? 'bg-emerald-700 hover:bg-emerald-600 shadow-[0_0_12px_rgba(16,185,129,0.2)]'
                    : 'bg-rose-700 hover:bg-rose-600 shadow-[0_0_12px_rgba(239,68,68,0.2)]'
                }`}
              >
                {isTogglingMaintenance ? 'Processing...' : 'Confirm'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
