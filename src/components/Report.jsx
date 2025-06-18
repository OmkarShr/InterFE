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
  faFileAlt
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
        
        pdf.save('KVGAI-Interview-Report.pdf');
    }).catch(error => {
        console.error("Error generating PDF:", error);
    });
  };

  if (!isReportVisible) {
    return null;
  }

  if (error) {
    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
        <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-8 border border-slate-200">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center">
              <FontAwesomeIcon icon={faExclamationTriangle} className="text-2xl text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-800">Report Generation Error</h2>
              <p className="text-slate-600">Unable to generate the interview report</p>
            </div>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
            <p className="text-red-700">{error}</p>
          </div>
          <button
            onClick={hideReport}
            className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-3 px-6 rounded-xl transition-all shadow-lg hover:shadow-xl"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  if (!reportData) {
    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50">
        <div className="bg-white rounded-3xl shadow-2xl p-8 border border-slate-200">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
              <FontAwesomeIcon icon={faBrain} className="text-xl text-white animate-pulse" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-800">Generating Report...</h2>
              <p className="text-slate-600">AI is analyzing session data</p>
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
    if (score > 70) return "bg-gradient-to-br from-red-50 to-red-100 border-red-200";
    if (score > 30) return "bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200";
    return "bg-gradient-to-br from-green-50 to-green-100 border-green-200";
  };

  const getRecommendationIcon = (rec) => {
    if (rec === 'Recommended for Hiring') return faCheckCircle;
    if (rec === 'Proceed with Caution') return faExclamationTriangle;
    return faShieldAlt;
  };

  const getRecommendationColor = (rec) => {
    if (rec === 'Recommended for Hiring') return "text-green-600";
    if (rec === 'Proceed with Caution') return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center p-4 z-50">
      <div className="bg-white rounded-3xl shadow-2xl max-w-6xl w-full max-h-[95vh] overflow-y-auto border border-slate-200">
        
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-slate-200 p-8 rounded-t-3xl z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 rounded-2xl flex items-center justify-center shadow-lg">
                <FontAwesomeIcon icon={faFileAlt} className="text-2xl text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                  KVGAI Interview Assessment Report
                </h1>
                <p className="text-slate-600 mt-1">Professional AI-Powered Behavioral Analysis</p>
                <div className="flex items-center space-x-4 mt-2 text-sm text-slate-500">
                  <span>Generated: {new Date().toLocaleDateString()}</span>
                  <span>•</span>
                  <span>Session ID: IMS-2024-001</span>
                  <span>•</span>
                  <span>Candidate: John Doe</span>
                </div>
              </div>
            </div>
            <button
              onClick={hideReport}
              className="w-12 h-12 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-800 transition-all flex items-center justify-center"
            >
              <FontAwesomeIcon icon={faTimes} className="text-xl" />
            </button>
          </div>
        </div>

        {/* Report Content */}
        <div ref={reportRef} className="p-8 space-y-8">
          
          {/* Executive Summary */}
          <div className={`rounded-2xl border-2 p-8 ${getRiskBgColor(final_suspicion_score)}`}>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
                  final_suspicion_score > 70 ? "bg-red-600" : 
                  final_suspicion_score > 30 ? "bg-yellow-600" : "bg-green-600"
                }`}>
                  <FontAwesomeIcon icon={faShieldAlt} className="text-2xl text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-800">Executive Summary</h2>
                  <p className="text-slate-600">Overall assessment and recommendation</p>
                </div>
              </div>
              <div className="text-right">
                <div className={`text-5xl font-bold ${getRiskColor(final_suspicion_score)}`}>
                  {final_suspicion_score.toFixed(0)}%
                </div>
                <div className="text-sm text-slate-600 mt-1">Risk Score</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <FontAwesomeIcon 
                    icon={getRecommendationIcon(recommendation)} 
                    className={`text-2xl ${getRecommendationColor(recommendation)}`} 
                  />
                  <div>
                    <div className="text-sm text-slate-600">Final Recommendation</div>
                    <div className={`text-xl font-bold ${getRecommendationColor(recommendation)}`}>
                      {recommendation}
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-white/50 rounded-xl">
                    <div className="text-2xl font-bold text-slate-800">{total_alerts}</div>
                    <div className="text-sm text-slate-600">Total Alerts</div>
                  </div>
                  <div className="text-center p-4 bg-white/50 rounded-xl">
                    <div className="text-2xl font-bold text-slate-800">{away_time_percentage.toFixed(1)}%</div>
                    <div className="text-sm text-slate-600">Distraction Rate</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Analysis */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Behavioral Patterns */}
            <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl border border-slate-200 p-6">
              <div className="flex items-center space-x-3 mb-6">
                <FontAwesomeIcon icon={faBrain} className="text-2xl text-blue-600" />
                <h3 className="text-xl font-bold text-slate-800">Behavioral Analysis</h3>
              </div>
              
              {Object.keys(behavior_analysis).length > 0 ? (
                <div className="space-y-4">
                  {Object.entries(behavior_analysis).map(([key, value]) => (
                    <div key={key} className="bg-white rounded-xl p-4 border border-slate-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-slate-800">{value.description}</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          value.severity === 'High' ? 'bg-red-200 text-red-800' :
                          value.severity === 'Medium' ? 'bg-yellow-200 text-yellow-800' :
                          'bg-green-200 text-green-800'
                        }`}>
                          {value.severity}
                        </span>
                      </div>
                      <div className="text-sm text-slate-600">
                        {value.count} instances detected
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <FontAwesomeIcon icon={faCheckCircle} className="text-4xl text-green-600 mb-4" />
                  <p className="text-lg font-semibold text-slate-800">No Concerning Patterns</p>
                  <p className="text-slate-600">All behavioral indicators within normal range</p>
                </div>
              )}
            </div>

            {/* Session Metrics */}
            <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl border border-slate-200 p-6">
              <div className="flex items-center space-x-3 mb-6">
                <FontAwesomeIcon icon={faChartLine} className="text-2xl text-purple-600" />
                <h3 className="text-xl font-bold text-slate-800">Session Metrics</h3>
              </div>
              
              <div className="space-y-4">
                <div className="bg-white rounded-xl p-4 border border-slate-200">
                  <div className="flex items-center space-x-3">
                    <FontAwesomeIcon icon={faEyeSlash} className="text-xl text-yellow-600" />
                    <div className="flex-1">
                      <div className="font-semibold text-slate-800">Attention Deviation</div>
                      <div className="text-sm text-slate-600">
                        {total_looking_away_time.toFixed(1)}s total ({away_time_percentage.toFixed(1)}%)
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl p-4 border border-slate-200">
                  <div className="flex items-center space-x-3">
                    <FontAwesomeIcon icon={faExclamationTriangle} className="text-xl text-red-600" />
                    <div className="flex-1">
                      <div className="font-semibold text-slate-800">Security Alerts</div>
                      <div className="text-sm text-slate-600">
                        {total_alerts} alerts triggered during session
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl p-4 border border-slate-200">
                  <div className="flex items-center space-x-3">
                    <FontAwesomeIcon icon={faClock} className="text-xl text-blue-600" />
                    <div className="flex-1">
                      <div className="font-semibold text-slate-800">Session Duration</div>
                      <div className="text-sm text-slate-600">
                        Complete monitoring session
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Alert Timeline */}
          {alerts.length > 0 && (
            <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl border border-slate-200 p-6">
              <div className="flex items-center space-x-3 mb-6">
                <FontAwesomeIcon icon={faExclamationTriangle} className="text-2xl text-orange-600" />
                <h3 className="text-xl font-bold text-slate-800">Alert Timeline</h3>
              </div>
              
              <div className="space-y-4 max-h-64 overflow-y-auto">
                {alerts.map((alert, index) => (
                  <div key={index} className="bg-white rounded-xl p-4 border border-slate-200 flex items-center space-x-4">
                    <div className="w-12 h-12 bg-orange-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <FontAwesomeIcon icon={faExclamationTriangle} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-slate-800">{alert.alert_info.message}</div>
                      <div className="text-sm text-slate-600">
                        Risk Score: {alert.suspicion_score.toFixed(1)} • {new Date(alert.timestamp).toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="sticky bottom-0 bg-white border-t border-slate-200 p-8 rounded-b-3xl">
          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-500">
              Report generated by KVGAI Professional Monitoring System
            </div>
            <div className="flex space-x-4">
              <button
                onClick={hideReport}
                className="px-6 py-3 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold rounded-xl transition-all"
              >
                Close Report
              </button>
              <button
                onClick={handleDownloadPdf}
                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl"
              >
                <FontAwesomeIcon icon={faDownload} />
                <span>Download PDF</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;