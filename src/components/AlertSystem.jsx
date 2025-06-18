import React, { useState, useEffect } from 'react';
import useStatsStore from '../store/statsStore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle, faUsers, faEyeSlash, faTimes } from '@fortawesome/free-solid-svg-icons';

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
        title: 'Suspicious Behavior Detected',
        message: 'Unusual activity patterns have been identified',
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
    <div className="fixed top-20 right-6 z-50 space-y-3 max-w-sm">
      {alerts.map((alert) => (
        <div
          key={alert.id}
          className={`bg-white rounded-lg shadow-lg border-l-4 p-4 transform transition-all duration-300 ease-in-out ${
            alert.type === 'error' 
              ? 'border-red-500' 
              : alert.type === 'warning' 
              ? 'border-yellow-500' 
              : 'border-blue-500'
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3">
              <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${
                alert.type === 'error' 
                  ? 'bg-red-100 text-red-600' 
                  : alert.type === 'warning' 
                  ? 'bg-yellow-100 text-yellow-600' 
                  : 'bg-blue-100 text-blue-600'
              }`}>
                <FontAwesomeIcon icon={alert.icon} className="text-sm" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-slate-800">{alert.title}</h4>
                <p className="text-sm text-slate-600 mt-1">{alert.message}</p>
                <p className="text-xs text-slate-400 mt-2">{alert.timestamp}</p>
              </div>
            </div>
            <button
              onClick={() => dismissAlert(alert.id)}
              className="flex-shrink-0 ml-2 text-slate-400 hover:text-slate-600 transition-colors"
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