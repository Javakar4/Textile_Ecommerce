import React, { useEffect, useState } from 'react';
import { Settings, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import apiEndpoints from '../config/constants';

const MaintenancePage = () => {
  const navigate = useNavigate();
  const [isChecking, setIsChecking] = useState(false);

  const checkStatus = async () => {
    setIsChecking(true);
    try {
      const res = await fetch(`${apiEndpoints.BASE_URL}${apiEndpoints.CATEGORIES.BASE}`);
      if (res.status !== 503) {
        // Server is back up
        window.location.href = '/';
      }
    } catch (error) {
      console.log('Server still in maintenance or unreachable');
    } finally {
      setIsChecking(false);
    }
  };

  useEffect(() => {
    checkStatus();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 text-center">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full animate-in fade-in zoom-in duration-500">
        <div className="flex justify-center mb-6">
          <div className="bg-blue-100 p-4 rounded-full animate-spin-slow">
            <Settings className="w-12 h-12 text-blue-600" />
          </div>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Under Maintenance</h1>
        
        <p className="text-gray-600 mb-8 leading-relaxed">
          We're currently performing some scheduled maintenance to improve your experience. 
          We'll be back online shortly. Thanks for your patience!
        </p>
        
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
          <p className="text-sm text-blue-700 font-medium">
            Expected downtime: ~15-30 minutes
          </p>
        </div>
        
        <button 
          onClick={checkStatus}
          disabled={isChecking}
          className="mt-8 w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isChecking ? (
            <RefreshCw className="w-5 h-5 animate-spin" />
          ) : (
            'Try Refreshing'
          )}
        </button>
      </div>
      
      <p className="mt-8 text-sm text-gray-400">
        &copy; {new Date().getFullYear()} Textile Ecommerce. All rights reserved.
      </p>
    </div>
  );
};

export default MaintenancePage;
