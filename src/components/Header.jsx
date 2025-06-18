import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBrain, faShieldAlt, faCrown } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  return (
    <header className="bg-white shadow-xl border-b border-slate-200 relative overflow-hidden">
      {/* Premium Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/8 via-indigo-600/8 to-purple-600/8"></div>
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%), 
                           radial-gradient(circle at 80% 20%, rgba(99, 102, 241, 0.1) 0%, transparent 50%),
                           radial-gradient(circle at 40% 40%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)`
        }}></div>
      </div>
      
      <div className="container mx-auto px-6 py-8 relative z-10">
        <div className="flex items-center justify-between">
          {/* Enhanced KVGAI Logo and Branding */}
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-6">
              {/* Premium Logo Design */}
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 rounded-3xl flex items-center justify-center shadow-2xl transform hover:scale-105 transition-all duration-300 border-4 border-white">
                  <div className="relative">
                    <span className="text-white font-black text-3xl tracking-tight">K</span>
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full shadow-lg"></div>
                  </div>
                </div>
                {/* Subtle glow effect */}
                <div className="absolute inset-0 w-20 h-20 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 rounded-3xl blur-xl opacity-20 -z-10"></div>
              </div>
              
              <div className="space-y-1">
                <div className="flex items-center space-x-3">
                  <h1 className="text-4xl font-black bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600 bg-clip-text text-transparent tracking-tight">
                    KVGAI
                  </h1>
                  <div className="flex items-center space-x-1 bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-1 rounded-full">
                    <FontAwesomeIcon icon={faCrown} className="text-yellow-300 text-xs" />
                    <span className="text-white text-xs font-bold">PRO</span>
                  </div>
                </div>
                <p className="text-lg text-slate-600 font-semibold">AI-Powered Interview Intelligence</p>
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-2 text-slate-500">
                    <FontAwesomeIcon icon={faBrain} className="text-blue-600" />
                    <span className="font-medium">Neural Analysis Engine</span>
                  </div>
                  <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
                  <div className="flex items-center space-x-2 text-slate-500">
                    <FontAwesomeIcon icon={faShieldAlt} className="text-green-600" />
                    <span className="font-medium">Enterprise Security</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Professional Badge */}
            <div className="hidden lg:flex items-center space-x-3 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 px-6 py-3 rounded-2xl border-2 border-blue-200/50 shadow-lg">
              <div className="w-3 h-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full animate-pulse shadow-lg"></div>
              <span className="text-sm font-bold bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent">
                Enterprise Edition v2.1
              </span>
            </div>
          </div>

          {/* Enhanced Session Information */}
          <div className="text-right">
            <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl p-6 border-2 border-slate-200/50 shadow-xl backdrop-blur-sm">
              <div className="flex items-center justify-end space-x-3 mb-2">
                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                  <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-slate-500 font-medium">Active Session</div>
                  <div className="font-bold text-xl text-slate-800">John Doe</div>
                </div>
              </div>
              <div className="space-y-1 text-xs text-slate-400">
                <div className="flex justify-between items-center">
                  <span>Session ID:</span>
                  <span className="font-mono font-semibold text-slate-600">IMS-2024-001</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Started:</span>
                  <span className="font-semibold text-slate-600">{new Date().toLocaleTimeString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Status:</span>
                  <span className="text-green-600 font-bold">● MONITORING</span>
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