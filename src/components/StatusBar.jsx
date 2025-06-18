import React from 'react';

const StatusBar = ({ isStreaming }) => {
  return (
    <div className="bg-slate-800 text-white py-2">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${isStreaming ? 'bg-green-400 animate-pulse' : 'bg-slate-400'}`}></div>
              <span>{isStreaming ? 'Session in Progress' : 'Session Inactive'}</span>
            </div>
            <div className="text-slate-300">
              {new Date().toLocaleDateString()} • {new Date().toLocaleTimeString()}
            </div>
          </div>
          <div className="text-slate-300">
            KVGAI Monitoring v2.1
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusBar;