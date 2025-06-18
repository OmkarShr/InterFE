import React from 'react';

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b border-slate-200">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* KVGAI Logo and Branding */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">K</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-800">KVGAI</h1>
                <p className="text-sm text-slate-500">Interview Monitoring System</p>
              </div>
            </div>
          </div>

          {/* Session Information */}
          <div className="text-right">
            <div className="text-sm text-slate-500">Candidate</div>
            <div className="font-semibold text-slate-800">John Doe</div>
            <div className="text-xs text-slate-400">Session ID: IMS-2024-001</div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;