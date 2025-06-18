import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faClock, faCalendarAlt, faBrain, faShieldAlt, faRocket } from '@fortawesome/free-solid-svg-icons';

const StatusBar = ({ isStreaming }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white py-4 shadow-2xl border-b border-slate-700">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-8">
            {/* Status Indicator */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className={`w-4 h-4 rounded-full shadow-lg transition-all duration-300 ${
                  isStreaming ? 'bg-green-400 animate-pulse' : 'bg-slate-500'
                }`}></div>
                {isStreaming && (
                  <div className="absolute inset-0 w-4 h-4 bg-green-400 rounded-full animate-ping opacity-75"></div>
                )}
              </div>
              <div>
                <span className="font-bold text-lg">
                  {isStreaming ? 'AI Monitoring Active' : 'System Ready'}
                </span>
                <div className="text-xs text-slate-400 mt-0.5">
                  {isStreaming ? 'Real-time behavioral analysis in progress' : 'Awaiting session initiation'}
                </div>
              </div>
            </div>

            {/* System Info */}
            <div className="hidden md:flex items-center space-x-6 text-slate-300">
              <div className="flex items-center space-x-2">
                <FontAwesomeIcon icon={faCalendarAlt} className="text-blue-400" />
                <span className="font-medium">{currentTime.toLocaleDateString('en-US', { 
                  weekday: 'short', 
                  month: 'short', 
                  day: 'numeric' 
                })}</span>
              </div>
              <div className="flex items-center space-x-2">
                <FontAwesomeIcon icon={faClock} className="text-green-400" />
                <span className="font-mono font-medium">{currentTime.toLocaleTimeString('en-US', { 
                  hour: '2-digit', 
                  minute: '2-digit',
                  second: '2-digit'
                })}</span>
              </div>
            </div>
          </div>

          {/* Right Side Info */}
          <div className="flex items-center space-x-6">
            {/* AI Engine Status */}
            <div className="hidden lg:flex items-center space-x-3 bg-slate-800/50 px-4 py-2 rounded-xl border border-slate-700">
              <FontAwesomeIcon icon={faBrain} className="text-blue-400" />
              <span className="text-slate-300 font-medium">Neural Engine</span>
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            </div>

            {/* Security Badge */}
            <div className="flex items-center space-x-2 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 px-4 py-2 rounded-xl border border-blue-500/30">
              <FontAwesomeIcon icon={faShieldAlt} className="text-blue-400" />
              <span className="text-blue-200 font-bold text-xs">SECURE</span>
            </div>

            {/* Version Badge */}
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-2 rounded-xl shadow-lg">
              <div className="flex items-center space-x-2">
                <FontAwesomeIcon icon={faRocket} className="text-white text-xs" />
                <span className="text-white font-bold text-xs">KVGAI v2.1 Pro</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusBar;