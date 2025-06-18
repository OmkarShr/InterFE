import React, { useRef } from 'react';
import useReportStore from '../store/reportStore';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faShieldAlt, 
  faExclamationTriangle, 
  faCheckCircle, 
  faEyeSlash, 
  faUsers, 
  faClock, 
  faDownload, 
  faTimes,
  faChartLine,
  faBrain,
  faFileAlt,
  faCrown,
  faRocket,
  faAward,
  faLightbulb,
  faGem,
  faStar
} from '@fortawesome/free-solid-svg-icons';

const Report = () => {
  const { reportData, isReportVisible, hideReport, error } = useReportStore();
  const reportRef = useRef();

  const handleDownloadPdf = () => {
    const input = reportRef.current;
    if (!input) {
      console.error("Report element for PDF generation not found!");
      return;
    }

    html2canvas(input, {
        allowTaint: true,
        useCORS: true,
        scale: 2,
        backgroundColor: "#0f172a",
    }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        
        const imgProps = pdf.getImageProperties(imgData);
        const imgHeight = imgProps.height;
        const imgWidth = imgProps.width;
        
        const ratio = imgWidth / imgHeight;
        const reportHeightInPdf = pdfWidth / ratio;
        
        let heightLeft = reportHeightInPdf;
        let position = 0;

        pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, reportHeightInPdf);
        heightLeft -= pdfHeight;

        while (heightLeft > 0) {
          position -= pdfHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, reportHeightInPdf);
          heightLeft -= pdfHeight;
        }
        
        pdf.save('KVGAI-Elite-Neural-Assessment-Report.pdf');
    }).catch(error => {
        console.error("Error generating PDF:", error);
    });
  };

  if (!isReportVisible) {
    return null;
  }

  if (error) {
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-2xl flex justify-center items-center z-50 p-4">
        <div className="bg-gradient-to-br from-slate-900 via-red-900/20 to-slate-900 backdrop-blur-xl rounded-3xl shadow-2xl max-w-3xl w-full p-12 border-2 border-red-500/30">
          <div className="flex items-center space-x-8 mb-10">
            <div className="w-24 h-24 bg-gradient-to-br from-red-500 to-rose-600 rounded-3xl flex items-center justify-center shadow-2xl border-2 border-white/20">
              <FontAwesomeIcon icon={faExclamationTriangle} className="text-4xl text-white" />
            </div>
            <div>
              <h2 className="text-4xl font-black text-white mb-2">Report Generation Error</h2>
              <p className="text-red-200 text-xl font-semibold">Unable to generate the neural assessment report</p>
            </div>
          </div>
          <div className="bg-gradient-to-br from-red-500/20 to-rose-500/20 border-2 border-red-400/30 rounded-2xl p-8 mb-10 backdrop-blur-sm">
            <p className="text-red-200 text-xl font-semibold">{error}</p>
          </div>
          <button
            onClick={hideReport}
            className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-5 px-10 rounded-2xl transition-all shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 text-xl"
          >
            Close Report
          </button>
        </div>
      </div>
    );
  }

  if (!reportData) {
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-2xl flex justify-center items-center z-50">
        <div className="bg-gradient-to-br from-slate-900 via-violet-900/20 to-slate-900 backdrop-blur-xl rounded-3xl shadow-2xl p-16 border-2 border-violet-500/30">
          <div className="flex items-center space-x-8">
            <div className="w-20 h-20 bg-gradient-to-br from-violet-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl border-2 border-white/20">
              <FontAwesomeIcon icon={faBrain} className="text-3xl text-white animate-pulse" />
            </div>
            <div>
              <h2 className="text-4xl font-black text-white mb-2">Generating Elite Report...</h2>
              <p className="text-violet-200 text-xl font-semibold">Neural intelligence engine analyzing comprehensive session data</p>
              <div className="flex items-center space-x-3 mt-4">
                <div className="w-3 h-3 bg-violet-500 rounded-full animate-bounce"></div>
                <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-3 h-3 bg-indigo-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const { 
    final_suspicion_score,
    recommendation,
    total_alerts,
    total_looking_away_time,
    away_time_percentage,
    behavior_analysis,
    alerts 
  } = reportData;

  const getRiskColor = (score) => {
    if (score > 70) return "text-red-400";
    if (score > 30) return "text-yellow-400";
    return "text-emerald-400";
  };

  const getRiskBgColor = (score) => {
    if (score > 70) return "bg-gradient-to-br from-red-500/20 via-rose-500/20 to-red-600/20 border-red-400/40";
    if (score > 30) return "bg-gradient-to-br from-yellow-500/20 via-amber-500/20 to-yellow-600/20 border-yellow-400/40";
    return "bg-gradient-to-br from-emerald-500/20 via-green-500/20 to-emerald-600/20 border-emerald-400/40";
  };

  const getRecommendationIcon = (rec) => {
    if (rec === 'Recommended for Hiring') return faAward;
    if (rec === 'Proceed with Caution') return faLightbulb;
    return faShieldAlt;
  };

  const getRecommendationColor = (rec) => {
    if (rec === 'Recommended for Hiring') return "text-emerald-400";
    if (rec === 'Proceed with Caution') return "text-yellow-400";
    return "text-red-400";
  };

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-2xl flex justify-center items-center p-4 z-50">
      <div className="bg-gradient-to-br from-slate-900 via-violet-900/10 to-slate-900 backdrop-blur-xl rounded-3xl shadow-2xl max-w-7xl w-full max-h-[95vh] overflow-y-auto border-2 border-violet-500/30">
        
        {/* Enhanced Header */}
        <div className="sticky top-0 bg-gradient-to-r from-slate-900/95 via-violet-900/20 to-slate-900/95 backdrop-blur-xl border-b-2 border-violet-500/30 p-12 rounded-t-3xl z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-10">
              {/* Enhanced Logo */}
              <div className="relative group">
                <div className="w-24 h-24 bg-gradient-to-br from-violet-500 via-purple-600 to-indigo-700 rounded-3xl flex items-center justify-center shadow-2xl border-4 border-white/20 group-hover:scale-105 transition-all duration-500">
                  <div className="relative">
                    <span className="text-white font-black text-4xl tracking-tight drop-shadow-lg">K</span>
                    <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full shadow-xl animate-pulse"></div>
                  </div>
                </div>
                <div className="absolute inset-0 w-24 h-24 bg-gradient-to-br from-violet-500 via-purple-600 to-indigo-700 rounded-3xl blur-2xl opacity-40 -z-10 group-hover:opacity-60 transition-opacity duration-500"></div>
              </div>
              
              <div>
                <div className="flex items-center space-x-6 mb-3">
                  <h1 className="text-5xl font-black bg-gradient-to-r from-white via-violet-200 to-blue-200 bg-clip-text text-transparent tracking-tight">
                    KVGAI Elite Assessment Report
                  </h1>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1 bg-gradient-to-r from-violet-600 to-purple-700 px-4 py-2 rounded-full shadow-xl">
                      <FontAwesomeIcon icon={faGem} className="text-yellow-300 text-lg" />
                      <span className="text-white font-bold">ELITE</span>
                    </div>
                    <div className="flex items-center space-x-1 bg-gradient-to-r from-blue-600 to-indigo-700 px-3 py-1 rounded-full shadow-lg">
                      <FontAwesomeIcon icon={faStar} className="text-yellow-300" />
                      <span className="text-white text-sm font-bold">v3.0</span>
                    </div>
                  </div>
                </div>
                <p className="text-violet-200 text-2xl font-bold mb-4">Neural Intelligence & Behavioral Risk Assessment</p>
                <div className="flex items-center space-x-8 text-lg text-violet-300">
                  <div className="flex items-center space-x-3">
                    <FontAwesomeIcon icon={faClock} className="text-violet-400" />
                    <span className="font-semibold">Generated: {new Date().toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</span>
                  </div>
                  <div className="w-2 h-2 bg-violet-400 rounded-full"></div>
                  <span className="font-mono font-bold">Session: KVGAI-2024-001</span>
                  <div className="w-2 h-2 bg-violet-400 rounded-full"></div>
                  <span className="font-bold">Candidate: John Doe</span>
                </div>
              </div>
            </div>
            <button
              onClick={hideReport}
              className="w-16 h-16 rounded-2xl bg-slate-800/60 hover:bg-slate-700/60 text-slate-400 hover:text-white transition-all flex items-center justify-center shadow-2xl hover:shadow-3xl border border-slate-600/50"
            >
              <FontAwesomeIcon icon={faTimes} className="text-2xl" />
            </button>
          </div>
        </div>

        {/* Report Content */}
        <div ref={reportRef} className="p-12 space-y-12 bg-gradient-to-br from-slate-900 via-violet-900/5 to-slate-900">
          
          {/* Executive Summary */}
          <div className={`rounded-3xl border-2 p-12 shadow-2xl backdrop-blur-xl ${getRiskBgColor(final_suspicion_score)}`}>
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center space-x-8">
                <div className={`w-24 h-24 rounded-3xl flex items-center justify-center shadow-2xl border-2 border-white/20 ${
                  final_suspicion_score > 70 ? "bg-gradient-to-br from-red-500 to-red-600" : 
                  final_suspicion_score > 30 ? "bg-gradient-to-br from-yellow-500 to-yellow-600" : "bg-gradient-to-br from-emerald-500 to-green-600"
                }`}>
                  <FontAwesomeIcon icon={faShieldAlt} className="text-white text-4xl" />
                </div>
                <div>
                  <h2 className="text-4xl font-black text-white mb-2">Executive Summary</h2>
                  <p className="text-violet-200 text-xl font-bold">Comprehensive neural risk assessment and hiring recommendation</p>
                </div>
              </div>
              <div className="text-right">
                <div className={`text-8xl font-black mb-3 ${getRiskColor(final_suspicion_score)}`}>
                  {final_suspicion_score.toFixed(0)}%
                </div>
                <div className="text-2xl text-violet-200 font-bold">Risk Score</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-8">
                <div className="flex items-center space-x-6">
                  <FontAwesomeIcon 
                    icon={getRecommendationIcon(recommendation)} 
                    className={`text-4xl ${getRecommendationColor(recommendation)}`} 
                  />
                  <div>
                    <div className="text-lg text-violet-300 font-bold uppercase tracking-wide">Final Recommendation</div>
                    <div className={`text-3xl font-black ${getRecommendationColor(recommendation)}`}>
                      {recommendation}
                    </div>
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 shadow-xl">
                  <div className="text-lg text-violet-300 font-bold mb-4">Assessment Confidence</div>
                  <div className="w-full bg-slate-700/50 rounded-full h-4 shadow-inner">
                    <div 
                      className="h-4 rounded-full bg-gradient-to-r from-violet-500 to-indigo-600 transition-all duration-1000 shadow-lg"
                      style={{ width: `${Math.min(95, 100 - (final_suspicion_score * 0.3))}%` }}
                    ></div>
                  </div>
                  <div className="text-sm text-violet-400 mt-2 font-semibold">High confidence neural assessment</div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center p-8 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl">
                    <div className="text-4xl font-black text-white mb-2">{total_alerts}</div>
                    <div className="text-lg text-violet-300 font-bold">Security Alerts</div>
                  </div>
                  <div className="text-center p-8 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl">
                    <div className="text-4xl font-black text-white mb-2">{away_time_percentage.toFixed(1)}%</div>
                    <div className="text-lg text-violet-300 font-bold">Distraction Rate</div>
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 shadow-xl">
                  <div className="text-lg text-violet-300 font-bold mb-4">Session Quality Score</div>
                  <div className="flex items-center space-x-4">
                    <div className="flex-1 bg-slate-700/50 rounded-full h-3 shadow-inner">
                      <div 
                        className={`h-3 rounded-full transition-all duration-1000 shadow-lg ${
                          final_suspicion_score < 30 ? 'bg-gradient-to-r from-emerald-500 to-green-600' :
                          final_suspicion_score < 70 ? 'bg-gradient-to-r from-yellow-500 to-amber-600' :
                          'bg-gradient-to-r from-red-500 to-rose-600'
                        }`}
                        style={{ width: `${100 - final_suspicion_score}%` }}
                      ></div>
                    </div>
                    <span className="text-2xl font-black text-white">{(100 - final_suspicion_score).toFixed(0)}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Analysis */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Behavioral Patterns */}
            <div className="bg-gradient-to-br from-white/10 to-violet-500/10 backdrop-blur-xl rounded-3xl border-2 border-violet-400/30 p-10 shadow-2xl">
              <div className="flex items-center space-x-6 mb-10">
                <div className="w-20 h-20 bg-gradient-to-br from-violet-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl border-2 border-white/20">
                  <FontAwesomeIcon icon={faBrain} className="text-white text-3xl" />
                </div>
                <h3 className="text-3xl font-black text-white">Neural Behavioral Analysis</h3>
              </div>
              
              {Object.keys(behavior_analysis).length > 0 ? (
                <div className="space-y-6">
                  {Object.entries(behavior_analysis).map(([key, value]) => (
                    <div key={key} className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border-2 border-violet-400/20 shadow-xl">
                      <div className="flex items-center justify-between mb-4">
                        <span className="font-black text-white text-xl">{value.description}</span>
                        <span className={`px-4 py-2 rounded-full text-lg font-bold shadow-lg ${
                          value.severity === 'High' ? 'bg-red-500/20 text-red-300 border border-red-400/30' :
                          value.severity === 'Medium' ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-400/30' :
                          'bg-emerald-500/20 text-emerald-300 border border-emerald-400/30'
                        }`}>
                          {value.severity}
                        </span>
                      </div>
                      <div className="text-violet-200 font-bold text-lg">
                        {value.count} instances detected during neural analysis
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <FontAwesomeIcon icon={faCheckCircle} className="text-8xl text-emerald-400 mb-8" />
                  <p className="text-3xl font-black text-white mb-4">Exceptional Behavioral Profile</p>
                  <p className="text-violet-200 text-xl font-semibold">All behavioral indicators within optimal professional range</p>
                </div>
              )}
            </div>

            {/* Session Metrics */}
            <div className="bg-gradient-to-br from-white/10 to-blue-500/10 backdrop-blur-xl rounded-3xl border-2 border-blue-400/30 p-10 shadow-2xl">
              <div className="flex items-center space-x-6 mb-10">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl flex items-center justify-center shadow-2xl border-2 border-white/20">
                  <FontAwesomeIcon icon={faChartLine} className="text-white text-3xl" />
                </div>
                <h3 className="text-3xl font-black text-white">Performance Metrics</h3>
              </div>
              
              <div className="space-y-6">
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border-2 border-blue-400/20 shadow-xl">
                  <div className="flex items-center space-x-6">
                    <div className="w-16 h-16 bg-yellow-500 rounded-2xl flex items-center justify-center shadow-2xl border-2 border-white/20">
                      <FontAwesomeIcon icon={faEyeSlash} className="text-white text-2xl" />
                    </div>
                    <div className="flex-1">
                      <div className="font-black text-white text-xl mb-2">Attention Analysis</div>
                      <div className="text-blue-200 font-bold text-lg">
                        {total_looking_away_time.toFixed(1)}s deviation ({away_time_percentage.toFixed(1)}% of session)
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border-2 border-blue-400/20 shadow-xl">
                  <div className="flex items-center space-x-6">
                    <div className="w-16 h-16 bg-red-500 rounded-2xl flex items-center justify-center shadow-2xl border-2 border-white/20">
                      <FontAwesomeIcon icon={faExclamationTriangle} className="text-white text-2xl" />
                    </div>
                    <div className="flex-1">
                      <div className="font-black text-white text-xl mb-2">Security Monitoring</div>
                      <div className="text-blue-200 font-bold text-lg">
                        {total_alerts} security alerts triggered during neural assessment
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border-2 border-blue-400/20 shadow-xl">
                  <div className="flex items-center space-x-6">
                    <div className="w-16 h-16 bg-violet-500 rounded-2xl flex items-center justify-center shadow-2xl border-2 border-white/20">
                      <FontAwesomeIcon icon={faStar} className="text-white text-2xl" />
                    </div>
                    <div className="flex-1">
                      <div className="font-black text-white text-xl mb-2">Session Quality</div>
                      <div className="text-blue-200 font-bold text-lg">
                        Elite-grade monitoring with advanced neural intelligence
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Alert Timeline */}
          {alerts.length > 0 && (
            <div className="bg-gradient-to-br from-white/10 to-red-500/10 backdrop-blur-xl rounded-3xl border-2 border-red-400/30 p-10 shadow-2xl">
              <div className="flex items-center space-x-6 mb-10">
                <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-rose-600 rounded-3xl flex items-center justify-center shadow-2xl border-2 border-white/20">
                  <FontAwesomeIcon icon={faExclamationTriangle} className="text-white text-3xl" />
                </div>
                <h3 className="text-3xl font-black text-white">Security Alert Timeline</h3>
              </div>
              
              <div className="space-y-6 max-h-96 overflow-y-auto">
                {alerts.map((alert, index) => (
                  <div key={index} className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border-2 border-red-400/20 shadow-xl flex items-center space-x-8">
                    <div className="w-18 h-18 bg-gradient-to-br from-red-500 to-rose-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-2xl border-2 border-white/20">
                      <FontAwesomeIcon icon={faExclamationTriangle} className="text-white text-2xl" />
                    </div>
                    <div className="flex-1">
                      <div className="font-black text-white text-xl mb-2">{alert.alert_info.message}</div>
                      <div className="text-red-200 font-bold text-lg">
                        Risk Impact: {alert.suspicion_score.toFixed(1)}% • Detected at {new Date(alert.timestamp).toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Enhanced Footer Actions */}
        <div className="sticky bottom-0 bg-gradient-to-r from-slate-900/95 via-violet-900/20 to-slate-900/95 backdrop-blur-xl border-t-2 border-violet-500/30 p-12 rounded-b-3xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="w-14 h-14 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl border-2 border-white/20">
                <span className="text-white font-black text-2xl">K</span>
              </div>
              <div className="text-violet-200">
                <div className="font-black text-xl">Report generated by KVGAI Elite Neural Intelligence System</div>
                <div className="text-lg font-semibold">Advanced AI Engine v3.0 • Enterprise Security Grade • Neural Analysis</div>
              </div>
            </div>
            <div className="flex space-x-6">
              <button
                onClick={hideReport}
                className="px-10 py-4 bg-slate-700/60 hover:bg-slate-600/60 text-slate-300 hover:text-white font-bold rounded-2xl transition-all shadow-xl hover:shadow-2xl text-lg border border-slate-600/50"
              >
                Close Report
              </button>
              <button
                onClick={handleDownloadPdf}
                className="flex items-center space-x-4 px-10 py-4 bg-gradient-to-r from-violet-500 via-purple-600 to-indigo-600 hover:from-violet-600 hover:via-purple-700 hover:to-indigo-700 text-white font-bold rounded-2xl transition-all shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 text-lg border-2 border-violet-400/30"
              >
                <FontAwesomeIcon icon={faDownload} className="text-xl" />
                <span>Download Elite Report</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;