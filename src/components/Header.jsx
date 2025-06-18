import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBrain, faShieldAlt, faCrown, faStar, faRocket } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-slate-900/95 via-violet-900/95 to-indigo-900/95 backdrop-blur-xl shadow-2xl border-b border-violet-500/30 relative overflow-hidden">
      {/* Premium Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-r from-violet-600/10 via-purple-600/10 to-blue-600/10"></div>
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(circle at 20% 80%, rgba(139, 92, 246, 0.2) 0%, transparent 50%), 
            radial-gradient(circle at 80% 20%, rgba(99, 102, 241, 0.2) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(59, 130, 246, 0.2) 0%, transparent 50%)
          `
        }}></div>
      </div>
      
      <div className="container mx-auto px-6 py-10 relative z-10">
        <div className="flex items-center justify-between">
          {/* Enhanced KVGAI Logo and Branding */}
          <div className="flex items-center space-x-10">
            <div className="flex items-center space-x-8">
              {/* Premium Logo Design */}
              <div className="relative group">
                <div className="w-24 h-24 bg-gradient-to-br from-violet-500 via-purple-600 to-indigo-700 rounded-3xl flex items-center justify-center shadow-2xl transform group-hover:scale-105 transition-all duration-500 border-4 border-white/20 relative overflow-hidden">
                  {/* Logo Background Pattern */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
                  <div className="relative z-10">
                    <span className="text-white font-black text-4xl tracking-tight drop-shadow-lg">K</span>
                    <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full shadow-xl animate-pulse"></div>
                  </div>
                </div>
                {/* Enhanced glow effect */}
                <div className="absolute inset-0 w-24 h-24 bg-gradient-to-br from-violet-500 via-purple-600 to-indigo-700 rounded-3xl blur-2xl opacity-30 -z-10 group-hover:opacity-50 transition-opacity duration-500"></div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-4">
                  <h1 className="text-5xl font-black bg-gradient-to-r from-white via-violet-200 to-blue-200 bg-clip-text text-transparent tracking-tight drop-shadow-sm">
                    KVGAI
                  </h1>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1 bg-gradient-to-r from-violet-600 to-purple-700 px-4 py-2 rounded-full shadow-xl">
                      <FontAwesomeIcon icon={faCrown} className="text-yellow-300 text-sm" />
                      <span className="text-white text-sm font-bold">ELITE</span>
                    </div>
                    <div className="flex items-center space-x-1 bg-gradient-to-r from-blue-600 to-indigo-700 px-3 py-1 rounded-full shadow-lg">
                      <FontAwesomeIcon icon={faStar} className="text-yellow-300 text-xs" />
                      <span className="text-white text-xs font-bold">v3.0</span>
                    </div>
                  </div>
                </div>
                <p className="text-2xl text-violet-200 font-bold">Neural Intelligence Platform</p>
                <div className="flex items-center space-x-6 text-sm">
                  <div className="flex items-center space-x-3 text-violet-300">
                    <FontAwesomeIcon icon={faBrain} className="text-violet-400 text-lg" />
                    <span className="font-semibold">Advanced AI Engine</span>
                  </div>
                  <div className="w-2 h-2 bg-violet-400 rounded-full animate-pulse"></div>
                  <div className="flex items-center space-x-3 text-blue-300">
                    <FontAwesomeIcon icon={faShieldAlt} className="text-blue-400 text-lg" />
                    <span className="font-semibold">Enterprise Security</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Professional Badge */}
            <div className="hidden lg:flex items-center space-x-4 bg-gradient-to-r from-white/10 via-violet-500/10 to-blue-500/10 backdrop-blur-xl px-8 py-4 rounded-2xl border-2 border-violet-400/30 shadow-2xl">
              <div className="w-4 h-4 bg-gradient-to-r from-violet-500 to-blue-600 rounded-full animate-pulse shadow-lg"></div>
              <span className="text-lg font-bold bg-gradient-to-r from-violet-200 to-blue-200 bg-clip-text text-transparent">
                Neural Monitoring System
              </span>
            </div>
          </div>

          {/* Enhanced Session Information */}
          <div className="text-right">
            <div className="bg-gradient-to-br from-white/10 to-violet-500/10 backdrop-blur-xl rounded-3xl p-8 border-2 border-violet-400/30 shadow-2xl">
              <div className="flex items-center justify-end space-x-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center shadow-xl">
                  <div className="w-4 h-4 bg-white rounded-full animate-pulse"></div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-violet-300 font-semibold">Active Session</div>
                  <div className="font-black text-2xl text-white">John Doe</div>
                </div>
              </div>
              <div className="space-y-2 text-sm text-violet-200">
                <div className="flex justify-between items-center">
                  <span className="text-violet-300">Session ID:</span>
                  <span className="font-mono font-bold text-white">KVGAI-2024-001</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-violet-300">Started:</span>
                  <span className="font-bold text-white">{new Date().toLocaleTimeString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-violet-300">Status:</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                    <span className="text-emerald-400 font-bold">MONITORING</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;