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
  faLightbulb
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
        backgroundColor: "#ffffff",
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
        
        pdf.save('KVGAI-Professional-Interview-Report.pdf');
    }).catch(error => {
        console.error("Error generating PDF:", error);
    });
  };

  if (!isReportVisible) {
    return null;
  }

  if (error) {
    return (
      <div className="fixed inset-0 bg-black/70 backdrop-blur-lg flex justify-center items-center z-50 p-4">
        <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-10 border border-slate-200">
          <div className="flex items-center space-x-6 mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-red-600 to-rose-700 rounded-3xl flex items-center justify-center shadow-xl">
              <FontAwesomeIcon icon={faExclamationTriangle} className="text-3xl text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-slate-800">Report Generation Error</h2>
              <p className="text-slate-600 text-lg">Unable to generate the interview assessment report</p>
            </div>
          </div>
          <div className="bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-200 rounded-2xl p-6 mb-8">
            <p className="text-red-700 text-lg">{error}</p>
          </div>
          <button
            onClick={hideReport}
            className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-4 px-8 rounded-2xl transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  if (!reportData) {
    return (
      <div className="fixed inset-0 bg-black/70 backdrop-blur-lg flex justify-center items-center z-50">
        <div className="bg-white rounded-3xl shadow-2xl p-12 border border-slate-200">
          <div className="flex items-center space-x-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-xl">
              <FontAwesomeIcon icon={faBrain} className="text-2xl text-white animate-pulse" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-slate-800">Generating Professional Report...</h2>
              <p className="text-slate-600 text-lg">AI neural engine is analyzing comprehensive session data</p>
              <div className="flex items-center space-x-2 mt-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
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
    if (score > 70) return "text-red-600";
    if (score > 30) return "text-yellow-600";
    return "text-green-600";
  };

  const getRiskBgColor = (score) => {
    if (score > 70) return "bg-gradient-to-br from-red-50 via-red-100 to-rose-100 border-red-300";
    if (score > 30) return "bg-gradient-to-br from-yellow-50 via-yellow-100 to-amber-100 border-yellow-300";
    return "bg-gradient-to-br from-green-50 via-green-100 to-emerald-100 border-green-300";
  };

  const getRecommendationIcon = (rec) => {
    if (rec === 'Recommended for Hiring') return faAward;
    if (rec === 'Proceed with Caution') return faLightbulb;
    return faShieldAlt;
  };

  const getRecommendationColor = (rec) => {
    if (rec === 'Recommended for Hiring') return "text-green-600";
    if (rec === 'Proceed with Caution') return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-lg flex justify-center items-center p-4 z-50">
      <div className="bg-white rounded-3xl shadow-2xl max-w-7xl w-full max-h-[95vh] overflow-y-auto border border-slate-200">
        
        {/* Enhanced Header */}
        <div className="sticky top-0 bg-gradient-to-r from-white via-blue-50/30 to-indigo-50/30 border-b border-slate-200 p-10 rounded-t-3xl z-10 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              {/* Enhanced Logo */}
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 rounded-3xl flex items-center justify-center shadow-2xl border-4 border-white">
                  <div className="relative">
                    <span className="text-white font-black text-3xl tracking-tight">K</span>
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full shadow-lg"></div>
                  </div>
                </div>
                <div className="absolute inset-0 w-20 h-20 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 rounded-3xl blur-xl opacity-20 -z-10"></div>
              </div>
              
              <div>
                <div className="flex items-center space-x-4 mb-2">
                  <h1 className="text-4xl font-black bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600 bg-clip-text text-transparent tracking-tight">
                    KVGAI Professional Assessment Report
                  </h1>
                  <div className="flex items-center space-x-1 bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-1 rounded-full">
                    <FontAwesomeIcon icon={faCrown} className="text-yellow-300 text-sm" />
                    <span className="text-white text-sm font-bold">PRO</span>
                  </div>
                </div>
                <p className="text-slate-600 text-xl font-semibold mb-3">AI-Powered Behavioral Intelligence & Risk Assessment</p>
                <div className="flex items-center space-x-6 text-sm text-slate-500">
                  <div className="flex items-center space-x-2">
                    <FontAwesomeIcon icon={faClock} className="text-blue-600" />
                    <span className="font-medium">Generated: {new Date().toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</span>
                  </div>
                  <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
                  <span className="font-mono font-semibold">Session ID: IMS-2024-001</span>
                  <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
                  <span className="font-semibold">Candidate: John Doe</span>
                </div>
              </div>
            </div>
            <button
              onClick={hideReport}
              className="w-14 h-14 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-800 transition-all flex items-center justify-center shadow-lg hover:shadow-xl"
            >
              <FontAwesomeIcon icon={faTimes} className="text-2xl" />
            </button>
          </div>
        </div>

        {/* Report Content */}
        <div ref={reportRef} className="p-10 space-y-10">
          
          {/* Executive Summary */}
          <div className={`rounded-3xl border-2 p-10 shadow-xl ${getRiskBgColor(final_suspicion_score)}`}>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-6">
                <div className={`w-20 h-20 rounded-3xl flex items-center justify-center shadow-2xl ${
                  final_suspicion_score > 70 ? "bg-gradient-to-br from-red-600 to-red-700" : 
                  final_suspicion_score > 30 ? "bg-gradient-to-br from-yellow-600 to-yellow-700" : "bg-gradient-to-br from-green-600 to-green-700"
                }`}>
                  <FontAwesomeIcon icon={faShieldAlt} className="text-3xl text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-black text-slate-800">Executive Summary</h2>
                  <p className="text-slate-600 text-lg font-semibold">Comprehensive risk assessment and hiring recommendation</p>
                </div>
              </div>
              <div className="text-right">
                <div className={`text-6xl font-black ${getRiskColor(final_suspicion_score)} mb-2`}>
                  {final_suspicion_score.toFixed(0)}%
                </div>
                <div className="text-lg text-slate-600 font-bold">Risk Score</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <FontAwesomeIcon 
                    icon={getRecommendationIcon(recommendation)} 
                    className={`text-3xl ${getRecommendationColor(recommendation)}`} 
                  />
                  <div>
                    <div className="text-sm text-slate-600 font-semibold uppercase tracking-wide">Final Recommendation</div>
                    <div className={`text-2xl font-black ${getRecommendationColor(recommendation)}`}>
                      {recommendation}
                    </div>
                  </div>
                </div>
                <div className="bg-white/60 rounded-2xl p-6 backdrop-blur-sm">
                  <div className="text-sm text-slate-600 font-semibold mb-2">Assessment Confidence</div>
                  <div className="w-full bg-slate-200 rounded-full h-3">
                    <div 
                      className="h-3 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-1000"
                      style={{ width: `${Math.min(95, 100 - (final_suspicion_score * 0.3))}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-slate-500 mt-1">High confidence assessment</div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-6 bg-white/60 rounded-2xl backdrop-blur-sm shadow-lg">
                    <div className="text-3xl font-black text-slate-800">{total_alerts}</div>
                    <div className="text-sm text-slate-600 font-semibold">Security Alerts</div>
                  </div>
                  <div className="text-center p-6 bg-white/60 rounded-2xl backdrop-blur-sm shadow-lg">
                    <div className="text-3xl font-black text-slate-800">{away_time_percentage.toFixed(1)}%</div>
                    <div className="text-sm text-slate-600 font-semibold">Distraction Rate</div>
                  </div>
                </div>
                <div className="bg-white/60 rounded-2xl p-6 backdrop-blur-sm shadow-lg">
                  <div className="text-sm text-slate-600 font-semibold mb-2">Session Quality Score</div>
                  <div className="flex items-center space-x-3">
                    <div className="flex-1 bg-slate-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-1000 ${
                          final_suspicion_score < 30 ? 'bg-gradient-to-r from-green-500 to-emerald-600' :
                          final_suspicion_score < 70 ? 'bg-gradient-to-r from-yellow-500 to-amber-600' :
                          'bg-gradient-to-r from-red-500 to-rose-600'
                        }`}
                        style={{ width: `${100 - final_suspicion_score}%` }}
                      ></div>
                    </div>
                    <span className="text-lg font-bold text-slate-800">{(100 - final_suspicion_score).toFixed(0)}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Analysis */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            
            {/* Behavioral Patterns */}
            <div className="bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30 rounded-3xl border-2 border-slate-200 p-8 shadow-xl">
              <div className="flex items-center space-x-4 mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-xl">
                  <FontAwesomeIcon icon={faBrain} className="text-2xl text-white" />
                </div>
                <h3 className="text-2xl font-black text-slate-800">Neural Behavioral Analysis</h3>
              </div>
              
              {Object.keys(behavior_analysis).length > 0 ? (
                <div className="space-y-5">
                  {Object.entries(behavior_analysis).map(([key, value]) => (
                    <div key={key} className="bg-white/80 rounded-2xl p-6 border border-slate-200 shadow-lg backdrop-blur-sm">
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-bold text-slate-800 text-lg">{value.description}</span>
                        <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                          value.severity === 'High' ? 'bg-red-200 text-red-800' :
                          value.severity === 'Medium' ? 'bg-yellow-200 text-yellow-800' :
                          'bg-green-200 text-green-800'
                        }`}>
                          {value.severity}
                        </span>
                      </div>
                      <div className="text-slate-600 font-semibold">
                        {value.count} instances detected during session
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <FontAwesomeIcon icon={faCheckCircle} className="text-6xl text-green-600 mb-6" />
                  <p className="text-2xl font-bold text-slate-800 mb-2">Excellent Behavioral Profile</p>
                  <p className="text-slate-600 text-lg">All behavioral indicators within optimal professional range</p>
                </div>
              )}
            </div>

            {/* Session Metrics */}
            <div className="bg-gradient-to-br from-slate-50 via-purple-50/30 to-pink-50/30 rounded-3xl border-2 border-slate-200 p-8 shadow-xl">
              <div className="flex items-center space-x-4 mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-xl">
                  <FontAwesomeIcon icon={faChartLine} className="text-2xl text-white" />
                </div>
                <h3 className="text-2xl font-black text-slate-800">Performance Metrics</h3>
              </div>
              
              <div className="space-y-5">
                <div className="bg-white/80 rounded-2xl p-6 border border-slate-200 shadow-lg backdrop-blur-sm">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-yellow-600 rounded-xl flex items-center justify-center shadow-lg">
                      <FontAwesomeIcon icon={faEyeSlash} className="text-xl text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-slate-800 text-lg">Attention Analysis</div>
                      <div className="text-slate-600 font-semibold">
                        {total_looking_away_time.toFixed(1)}s deviation ({away_time_percentage.toFixed(1)}% of session)
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/80 rounded-2xl p-6 border border-slate-200 shadow-lg backdrop-blur-sm">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center shadow-lg">
                      <FontAwesomeIcon icon={faExclamationTriangle} className="text-xl text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-slate-800 text-lg">Security Monitoring</div>
                      <div className="text-slate-600 font-semibold">
                        {total_alerts} security alerts triggered during assessment
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/80 rounded-2xl p-6 border border-slate-200 shadow-lg backdrop-blur-sm">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                      <FontAwesomeIcon icon={faRocket} className="text-xl text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-slate-800 text-lg">Session Quality</div>
                      <div className="text-slate-600 font-semibold">
                        Professional-grade monitoring with neural analysis
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Alert Timeline */}
          {alerts.length > 0 && (
            <div className="bg-gradient-to-br from-orange-50 via-red-50/30 to-rose-50/30 rounded-3xl border-2 border-orange-200 p-8 shadow-xl">
              <div className="flex items-center space-x-4 mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-600 to-red-600 rounded-2xl flex items-center justify-center shadow-xl">
                  <FontAwesomeIcon icon={faExclamationTriangle} className="text-2xl text-white" />
                </div>
                <h3 className="text-2xl font-black text-slate-800">Security Alert Timeline</h3>
              </div>
              
              <div className="space-y-5 max-h-80 overflow-y-auto">
                {alerts.map((alert, index) => (
                  <div key={index} className="bg-white/80 rounded-2xl p-6 border border-orange-200 shadow-lg backdrop-blur-sm flex items-center space-x-6">
                    <div className="w-14 h-14 bg-gradient-to-br from-orange-600 to-red-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                      <FontAwesomeIcon icon={faExclamationTriangle} className="text-white text-xl" />
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-slate-800 text-lg mb-1">{alert.alert_info.message}</div>
                      <div className="text-slate-600 font-semibold">
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
        <div className="sticky bottom-0 bg-gradient-to-r from-white via-slate-50/30 to-slate-100/30 border-t border-slate-200 p-10 rounded-b-3xl backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">K</span>
              </div>
              <div className="text-slate-500">
                <div className="font-bold">Report generated by KVGAI Professional Monitoring System</div>
                <div className="text-sm">Neural AI Engine v2.1 • Enterprise Security Grade</div>
              </div>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={hideReport}
                className="px-8 py-4 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold rounded-2xl transition-all shadow-lg hover:shadow-xl"
              >
                Close Report
              </button>
              <button
                onClick={handleDownloadPdf}
                className="flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-2xl transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
              >
                <FontAwesomeIcon icon={faDownload} className="text-lg" />
                <span>Download Professional Report</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;