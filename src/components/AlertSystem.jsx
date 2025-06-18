import React, { useState, useEffect } from 'react';
import useStatsStore from '../store/statsStore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle, faUsers, faEyeSlash, faTimes, faShieldAlt } from '@fortawesome/free-solid-svg-icons';

const AlertSystem = () => {
  const { cheatingFlags } = useStatsStore();
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    if (!cheatingFlags) return;

    const newAlerts = [];

    if (cheatingFlags.is_looking_away) {
      newAlerts.push({
        id: 'looking-away',
        type: 'warning',
        icon: faEyeSlash,
        title: 'Attention Deviation Detected',
        message: 'Candidate appears to be looking away from the screen',
        timestamp: new Date().toLocaleTimeString()
      });
    }

    if (cheatingFlags.alert_level === 'SUSPICIOUS_BEHAVIOR') {
      newAlerts.push({
        id: 'suspicious',
        type: 'warning',
        icon: faExclamationTriangle,
        title: 'Suspicious Behavior Pattern',
        message: 'Unusual activity patterns have been identified by AI analysis',
        timestamp: new Date().toLocaleTimeString()
      });
    }

    if (cheatingFlags.alert_level === 'CHEATING_DETECTED') {
      newAlerts.push({
        id: 'cheating',
        type: 'error',
        icon: faUsers,
        title: 'Multiple Participants Detected',
        message: 'Additional individuals may be present in the session',
        timestamp: new Date().toLocaleTimeString()
      });
    }

    setAlerts(newAlerts);
  }, [cheatingFlags]);

  const dismissAlert = (alertId) => {
    setAlerts(alerts.filter(alert => alert.id !== alertId));
  };

  if (alerts.length === 0) return null;

  return (
    <div className="fixed top-24 right-6 z-50 space-y-4 max-w-sm">
      {alerts.map((alert) => (
        <div
          key={alert.id}
          className={`bg-white rounded-2xl shadow-2xl border-l-4 p-6 transform transition-all duration-500 ease-out animate-slide-in ${
            alert.type === 'error' 
              ? 'border-red-500 bg-gradient-to-br from-red-50 to-red-100' 
              : alert.type === 'warning' 
              ? 'border-yellow-500 bg-gradient-to-br from-yellow-50 to-yellow-100' 
              : 'border-blue-500 bg-gradient-to-br from-blue-50 to-blue-100'
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-4">
              <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center shadow-lg ${
                alert.type === 'error' 
                  ? 'bg-red-600 text-white' 
                  : alert.type === 'warning' 
                  ? 'bg-yellow-600 text-white' 
                  : 'bg-blue-600 text-white'
              }`}>
                <FontAwesomeIcon icon={alert.icon} className="text-lg" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-lg font-bold text-slate-800 mb-1">{alert.title}</h4>
                <p className="text-sm text-slate-700 leading-relaxed mb-3">{alert.message}</p>
                <div className="flex items-center space-x-2">
                  <FontAwesomeIcon icon={faShieldAlt} className="text-xs text-slate-400" />
                  <p className="text-xs text-slate-500 font-medium">{alert.timestamp}</p>
                </div>
              </div>
            </div>
            <button
              onClick={() => dismissAlert(alert.id)}
              className="flex-shrink-0 ml-2 w-8 h-8 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-500 hover:text-slate-700 transition-all duration-200 flex items-center justify-center"
            >
              <FontAwesomeIcon icon={faTimes} className="text-sm" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AlertSystem;