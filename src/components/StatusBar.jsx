import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faClock, faCalendarAlt, faBrain, faShieldAlt, faRocket, faStar } from '@fortawesome/free-solid-svg-icons';

const StatusBar = ({ isStreaming }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-gradient-to-r from-slate-900/95 via-violet-900/90 to-indigo-900/95 backdrop-blur-xl text-white py-5 shadow-2xl border-b border-violet-500/20">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-10">
            {/* Status Indicator */}
            <div className="flex items-center space-x-5">
              <div className="relative">
                <div className={`w-5 h-5 rounded-full shadow-xl transition-all duration-300 ${
                  isStreaming ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'
                }`}></div>
                {isStreaming && (
                  <div className="absolute inset-0 w-5 h-5 bg-emerald-400 rounded-full animate-ping opacity-75"></div>
                )}
              </div>
              <div>
                <span className="font-bold text-xl text-white">
                  {isStreaming ? 'Neural Analysis Active' : 'System Ready'}
                </span>
                <div className="text-sm text-violet-300 mt-1 font-medium">
                  {isStreaming ? 'Real-time behavioral intelligence in progress' : 'Awaiting session initialization'}
                </div>
              </div>
            </div>

            {/* System Info */}
            <div className="hidden md:flex items-center space-x-8 text-violet-200">
              <div className="flex items-center space-x-3 bg-violet-500/20 px-4 py-2 rounded-xl border border-violet-400/30">
                <FontAwesomeIcon icon={faCalendarAlt} className="text-violet-400" />
                <span className="font-semibold">{currentTime.toLocaleDateString('en-US', { 
                  weekday: 'short', 
                  month: 'short', 
                  day: 'numeric' 
                })}</span>
              </div>
              <div className="flex items-center space-x-3 bg-blue-500/20 px-4 py-2 rounded-xl border border-blue-400/30">
                <FontAwesomeIcon icon={faClock} className="text-blue-400" />
                <span className="font-mono font-semibold">{currentTime.toLocaleTimeString('en-US', { 
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
            <div className="hidden lg:flex items-center space-x-4 bg-gradient-to-r from-violet-500/20 to-purple-500/20 backdrop-blur-sm px-6 py-3 rounded-2xl border border-violet-400/30 shadow-xl">
              <FontAwesomeIcon icon={faBrain} className="text-violet-400 text-lg" />
              <span className="text-violet-200 font-bold">Neural Engine</span>
              <div className="w-3 h-3 bg-violet-400 rounded-full animate-pulse shadow-lg"></div>
            </div>

            {/* Security Badge */}
            <div className="flex items-center space-x-3 bg-gradient-to-r from-emerald-500/20 to-green-500/20 backdrop-blur-sm px-6 py-3 rounded-2xl border border-emerald-400/30 shadow-xl">
              <FontAwesomeIcon icon={faShieldAlt} className="text-emerald-400 text-lg" />
              <span className="text-emerald-200 font-bold">SECURE</span>
            </div>

            {/* Version Badge */}
            <div className="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 px-6 py-3 rounded-2xl shadow-2xl border border-white/20">
              <div className="flex items-center space-x-3">
                <FontAwesomeIcon icon={faStar} className="text-yellow-300" />
                <span className="text-white font-bold">KVGAI Elite v3.0</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusBar;