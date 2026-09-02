import React from 'react';
import { LogoIcon } from './LeftBanner';

// Sub-components: Icons
const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500/60">
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const LockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500/60">
    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const EyeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500/50 hover:text-[#d4af37]">
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOffIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500/50 hover:text-[#d4af37]">
    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
    <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
    <path d="M6.61 6.61A13.52 13.52 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
    <line x1="2" x2="22" y1="2" y2="22" />
  </svg>
);

const LoginForm = ({
  email,
  setEmail,
  password,
  setPassword,
  emailFocused,
  setEmailFocused,
  passwordFocused,
  setPasswordFocused,
  showPassword,
  setShowPassword,
  isLoading,
  loginSuccess,
  error,
  onSubmit
}) => (
  <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8 lg:p-12 relative bg-[#022c22] bg-grid-pattern">
    {/* Soft background glow blobs */}
    <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none"></div>
    <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-[#d4af37]/5 rounded-full blur-[120px] pointer-events-none"></div>

    <div className="w-full max-w-md z-10">
      {/* Mobile Logo Header */}
      <div className="flex flex-col items-center mb-6 lg:hidden">
        <div className="p-2.5 bg-emerald-950/70 rounded-2xl border border-[rgba(212,175,55,0.15)] shadow-lg mb-3">
          <LogoIcon />
        </div>
        <h1 className="font-serif text-3xl font-extrabold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-yellow-100 via-amber-300 to-yellow-500">
          TEXTILE
        </h1>
        <p className="text-[10px] uppercase tracking-[0.3em] text-[#d4af37] font-semibold">
          Administrator
        </p>
      </div>

      <div className="glass border border-[rgba(212,175,55,0.12)] rounded-2xl sm:rounded-3xl p-5 sm:p-10 shadow-2xl relative overflow-hidden animate-fade-in">
        {/* Elegant top gold/emerald gradient line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-emerald-700 via-[#d4af37] to-teal-800"></div>

        {loginSuccess ? (
          <div className="text-center py-10 space-y-5">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[#34d399] shadow-[0_0_25px_rgba(52,211,153,0.25)] animate-pulse">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">Access Granted</h2>
            <p className="text-emerald-100/70 text-sm max-w-xs mx-auto">
              Welcome back, Administrator. Setting up secure environment connections...
            </p>
            <div className="flex justify-center pt-4">
              <div className="w-24 h-1 bg-[#041e18]/80 rounded-full overflow-hidden relative">
                <div className="absolute top-0 bottom-0 left-0 w-1/2 h-full bg-gradient-to-r from-[#d4af37] to-emerald-500 rounded-full animate-loading"></div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white tracking-tight">System Sign In</h2>
              <p className="text-emerald-100/60 text-sm mt-1.5">
                Provide secure credentials to enter admin console
              </p>
            </div>

            {error && (
              <div className="mb-6 p-3 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs rounded-xl flex items-center gap-2.5">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" x2="12" y1="8" y2="12" />
                  <line x1="12" x2="12.01" y1="16" y2="16" />
                </svg>
                <span className="leading-relaxed">{error}</span>
              </div>
            )}

            <form onSubmit={onSubmit} className="space-y-4 sm:space-y-5">
              {/* Email Input Field */}
              <div className="relative group">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 flex items-center pointer-events-none transition-colors group-focus-within:text-[#d4af37]">
                  <MailIcon />
                </div>
                <input
                  type="email"
                  value={email}
                  onFocus={() => setEmailFocused(true)}
                  onBlur={() => setEmailFocused(false)}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder=" "
                  className="w-full pl-11 pr-4 pt-6 pb-2 bg-emerald-950/20 border border-emerald-500/15 rounded-xl text-white text-sm focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] transition-all duration-300 hover:border-emerald-500/30"
                  required
                />
                <label
                  className={`absolute left-11 transition-all duration-300 pointer-events-none ${
                    emailFocused || email
                      ? 'top-2 text-[11px] sm:text-xs font-semibold text-[#d4af37] uppercase tracking-wider'
                      : 'top-4 text-sm text-emerald-100/50'
                  }`}
                >
                  Email Address
                </label>
              </div>

              {/* Password Input Field */}
              <div className="relative group">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 flex items-center pointer-events-none transition-colors group-focus-within:text-[#d4af37]">
                  <LockIcon />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onFocus={() => setPasswordFocused(true)}
                  onBlur={() => setPasswordFocused(false)}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder=" "
                  className="w-full pl-11 pr-11 pt-6 pb-2 bg-emerald-950/20 border border-emerald-500/15 rounded-xl text-white text-sm focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] transition-all duration-300 hover:border-emerald-500/30"
                  required
                />
                <label
                  className={`absolute left-11 transition-all duration-300 pointer-events-none ${
                    passwordFocused || password
                      ? 'top-2 text-[11px] sm:text-xs font-semibold text-[#d4af37] uppercase tracking-wider'
                      : 'top-4 text-sm text-emerald-100/50'
                  }`}
                >
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-1 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center text-slate-500 hover:text-slate-300 transition focus:outline-none cursor-pointer"
                >
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>

              {/* Remember me option */}
              <div className="flex items-center text-xs sm:text-sm pt-1">
                <label className="flex items-center gap-2.5 text-emerald-100/60 hover:text-emerald-100/80 cursor-pointer select-none py-1.5 pr-3">
                  <input 
                    type="checkbox" 
                    className="rounded border-emerald-500/20 bg-emerald-950/40 text-emerald-600 focus:ring-0 focus:ring-offset-0 h-[18px] w-[18px]"
                  />
                  Remember access
                </label>
              </div>

              {/* Action Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full relative mt-4 py-3.5 px-4 bg-gradient-to-r from-emerald-700 to-teal-800 hover:from-emerald-600 hover:to-teal-700 border border-[rgba(212,175,55,0.25)] text-white font-medium text-sm rounded-xl transition-all duration-300 shadow-[0_4px_20px_rgba(4,120,87,0.2)] hover:shadow-[0_4px_25px_rgba(212,175,55,0.2)] hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#d4af37] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-85 disabled:cursor-not-allowed disabled:hover:transform-none"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Verifying...
                  </>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  </div>
);

export default LoginForm;
