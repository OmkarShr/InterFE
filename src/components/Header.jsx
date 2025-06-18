import React from 'react';

const Header = () => {
  return (
    <header className="bg-white shadow-lg border-b border-slate-200 relative overflow-hidden">
      {/* Premium Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-indigo-600/5 to-purple-600/5"></div>
      
      <div className="container mx-auto px-6 py-6 relative z-10">
        <div className="flex items-center justify-between">
          {/* KVGAI Logo and Branding */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-2xl">K</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                  KVGAI
                </h1>
                <p className="text-sm text-slate-600 font-medium">Professional Interview Monitoring System</p>
              </div>
            </div>
            
            {/* Professional Badge */}
            <div className="hidden md:flex items-center space-x-2 bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-2 rounded-full border border-blue-200">
              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
              <span className="text-sm font-semibold text-blue-700">Enterprise Edition</span>
            </div>
          </div>

          {/* Session Information */}
          <div className="text-right">
            <div className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl p-4 border border-slate-200">
              <div className="text-sm text-slate-500 font-medium">Current Candidate</div>
              <div className="font-bold text-xl text-slate-800">John Doe</div>
              <div className="text-xs text-slate-400 mt-1">Session ID: IMS-2024-001</div>
              <div className="flex items-center space-x-2 mt-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-medium text-green-700">Session Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;