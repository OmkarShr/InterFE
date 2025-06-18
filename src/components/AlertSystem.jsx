import React, { useState, useEffect } from 'react';
import useStatsStore from '../store/statsStore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle, faUsers, faEyeSlash, faTimes, faShieldAlt, faStar } from '@fortawesome/free-solid-svg-icons';

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
        message: 'Unusual activity patterns identified by neural analysis',
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
    <div className="fixed top-32 right-6 z-50 space-y-6 max-w-sm">
      {alerts.map((alert) => (
        <div
          key={alert.id}
          className={`bg-gradient-to-br backdrop-blur-xl rounded-3xl border-2 p-8 transform transition-all duration-500 ease-out animate-slide-in shadow-2xl ${
            alert.type === 'error' 
              ? 'from-red-500/20 to-rose-500/20 border-red-400/40' 
              : alert.type === 'warning' 
              ? 'from-yellow-500/20 to-amber-500/20 border-yellow-400/40' 
              : 'from-blue-500/20 to-indigo-500/20 border-blue-400/40'
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-6">
              <div className={`flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center shadow-2xl border-2 border-white/20 ${
                alert.type === 'error' 
                  ? 'bg-gradient-to-br from-red-500 to-red-600' 
                  : alert.type === 'warning' 
                  ? 'bg-gradient-to-br from-yellow-500 to-yellow-600' 
                  : 'bg-gradient-to-br from-blue-500 to-blue-600'
              }`}>
                <FontAwesomeIcon icon={alert.icon} className="text-white text-xl" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-xl font-black text-white mb-2">{alert.title}</h4>
                <p className="text-lg text-violet-200 leading-relaxed mb-4 font-semibold">{alert.message}</p>
                <div className="flex items-center space-x-3">
                  <FontAwesomeIcon icon={faStar} className="text-violet-400" />
                  <p className="text-sm text-violet-300 font-bold">{alert.timestamp}</p>
                </div>
              </div>
            </div>
            <button
              onClick={() => dismissAlert(alert.id)}
              className="flex-shrink-0 ml-3 w-10 h-10 rounded-full bg-slate-700/60 hover:bg-slate-600/60 text-slate-400 hover:text-white transition-all duration-200 flex items-center justify-center shadow-xl border border-slate-600/50"
            >
              <FontAwesomeIcon icon={faTimes} className="text-lg" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AlertSystem;