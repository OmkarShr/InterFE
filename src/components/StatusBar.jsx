import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faClock, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

const StatusBar = ({ isStreaming }) => {
  return (
    <div className="bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800 text-white py-3 shadow-lg">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-3">
              <div className={`w-3 h-3 rounded-full shadow-lg ${isStreaming ? 'bg-green-400 animate-pulse' : 'bg-slate-400'}`}></div>
              <span className="font-semibold">
                {isStreaming ? 'Professional Session in Progress' : 'Session Standby Mode'}
              </span>
            </div>
            <div className="flex items-center space-x-2 text-slate-300">
              <FontAwesomeIcon icon={faCalendarAlt} className="text-xs" />
              <span>{new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</span>
            </div>
            <div className="flex items-center space-x-2 text-slate-300">
              <FontAwesomeIcon icon={faClock} className="text-xs" />
              <span>{new Date().toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit',
                second: '2-digit'
              })}</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-slate-300">
              KVGAI Professional Monitoring System
            </div>
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-1 rounded-full text-xs font-bold">
              v2.1 Enterprise
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusBar;