import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LeftBanner from './LeftBanner';
import LoginForm from './LoginForm';
import { useLogin } from '../../hooks/useAuth';
import { useAuth } from '../../context/AuthContext';
import { AUTH_CONSTANTS } from '../../config/constants';

// Barrel exports
export { default as LeftBanner } from './LeftBanner';
export { default as LoginForm } from './LoginForm';

// Main composed default wrapper
export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [error, setError] = useState('');
  const [activeFeature, setActiveFeature] = useState(0);

  const loginMutation = useLogin();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    // If already logged in, redirect to catalog
    if (isAuthenticated) {
      navigate('/catalog');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % AUTH_CONSTANTS.ADMIN_FEATURES.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please provide administrative credentials.');
      return;
    }
    
    setError('');

    loginMutation.mutate(
      { email, password },
      {
        onSuccess: () => {
          setLoginSuccess(true);
          // Delay redirection to show the access granted animation
          setTimeout(() => {
            navigate('/catalog');
          }, 1500);
        },
        onError: (err) => {
          setError(err.message || 'Invalid email or password.');
        }
      }
    );
  };

  return (
    <div className="min-h-screen w-full flex bg-[#022c22] font-sans selection:bg-[#d4af37]/30 selection:text-white">
      {/* Left side: Premium Branding Visuals (Desktop only) */}
      <LeftBanner activeFeature={activeFeature} setActiveFeature={setActiveFeature} />

      {/* Right side: Login Form */}
      <LoginForm
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        emailFocused={emailFocused}
        setEmailFocused={setEmailFocused}
        passwordFocused={passwordFocused}
        setPasswordFocused={setPasswordFocused}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        isLoading={loginMutation.isPending}
        loginSuccess={loginSuccess}
        error={error}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
