// components/Report.jsx
import React, { useRef } from 'react';
import useReportStore from '../store/reportStore';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

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
        backgroundColor: "#111827",
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
        
        pdf.save('interview-report.pdf');
    }).catch(error => {
        console.error("Error generating PDF:", error);
    });
  };

  if (!isReportVisible) {
    return null;
  }

  if (error) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-8 rounded-lg shadow-2xl max-w-2xl w-full">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p>{error}</p>
          <button
            onClick={hideReport}
            className="mt-6 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  if (!reportData) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-8 rounded-lg shadow-2xl">
          <h2 className="text-2xl font-bold">Loading Report...</h2>
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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center p-4 font-sans">
      <div ref={reportRef} className="bg-gray-900 text-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-8">
        <div className="flex justify-between items-center border-b border-gray-700 pb-4 mb-6">
          <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Interview Report</h2>
          <button onClick={hideReport} className="text-gray-400 hover:text-white text-2xl">&times;</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-2xl font-bold mb-4 text-purple-300">Summary</h3>
            <p className={`text-xl font-semibold ${recommendation === 'Recommended for Hiring' ? 'text-green-400' : recommendation === 'Proceed with Caution' ? 'text-yellow-400' : 'text-red-400'}`}>
              Recommendation: {recommendation}
            </p>
            <p className="mt-4 text-lg">Final Suspicion Score: <span className="font-bold text-xl">{final_suspicion_score.toFixed(2)}</span> / 100</p>
            <p className="text-lg">Total Alerts: <span className="font-bold">{total_alerts}</span></p>
            <p className="text-lg">Total Time Looking Away: <span className="font-bold">{total_looking_away_time.toFixed(2)}s</span> ({away_time_percentage.toFixed(2)}%)</p>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-2xl font-bold mb-4 text-purple-300">Behavioral Flags</h3>
            {Object.keys(behavior_analysis).length > 0 ? (
              <ul className="space-y-3">
                {Object.entries(behavior_analysis).map(([key, value]) => (
                  <li key={key} className="flex items-center text-lg">
                    <span className="font-semibold mr-2">{value.description}:</span>
                    <span>{value.count} instances ({value.severity})</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-lg">No specific behavioral patterns were flagged.</p>
            )}
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-2xl font-bold mb-4 text-purple-300">Alert Timeline</h3>
          {alerts.length > 0 ? (
            <div className="space-y-4">
              {alerts.map((alert, index) => (
                <div key={index} className="bg-gray-800 p-4 rounded-lg flex items-center">
                  <div className="mr-4 text-lg font-bold text-pink-400">{(new Date(alert.timestamp)).toLocaleTimeString()}</div>
                  <div>
                    <p className="font-semibold text-lg">{alert.alert_info.message}</p>
                    <p className="text-md text-gray-400">Suspicion Score: {alert.suspicion_score.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-lg">No alerts were triggered during the session.</p>
          )}
        </div>

        <div className="text-center mt-8 flex justify-center gap-4">
            <button onClick={hideReport} className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 px-8 rounded-full hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg hover:shadow-xl">
                Close Report
            </button>
            <button onClick={handleDownloadPdf} className="bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold py-3 px-8 rounded-full hover:from-green-600 hover:to-teal-600 transition-all shadow-lg hover:shadow-xl">
                Download PDF
            </button>
        </div>
      </div>
    </div>
  );
};

export default Report;
