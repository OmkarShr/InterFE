import Webcam from "./components/Webcam.jsx";
import ProcessedFeed from "./components/ProcessedFeed.jsx";
import Stats from "./components/Stats.jsx";
import Controls from "./components/Controls.jsx";
import Report from "./components/Report.jsx";
import Header from "./components/Header.jsx";
import StatusBar from "./components/StatusBar.jsx";
import AlertSystem from "./components/AlertSystem.jsx";
import { useState } from "react";

function App() {
  const [isStreaming, setIsStreaming] = useState(false);

  const handleStartCamera = () => setIsStreaming(true);
  const handleStopCamera = () => setIsStreaming(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Header />
      <StatusBar isStreaming={isStreaming} />
      <AlertSystem />
      
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Main Video Display */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8 relative overflow-hidden border border-slate-200">
            {/* Premium Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 25% 25%, #3b82f6 0%, transparent 50%), 
                                 radial-gradient(circle at 75% 75%, #6366f1 0%, transparent 50%)`
              }}></div>
            </div>
            
            {/* KVGAI Watermark */}
            <div className="absolute top-6 left-6 opacity-10 z-10">
              <div className="text-3xl font-bold text-slate-600">KVGAI</div>
              <div className="text-xs text-slate-500 font-medium">PROFESSIONAL</div>
            </div>
            
            {/* Monitoring Status */}
            <div className="absolute top-6 right-6 z-10">
              {isStreaming && (
                <div className="flex items-center gap-3 bg-gradient-to-r from-green-500/10 to-emerald-500/10 backdrop-blur-sm text-green-700 px-4 py-2 rounded-full text-sm font-semibold border border-green-200/50">
                  <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse shadow-lg"></div>
                  <span>AI Monitoring Active</span>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-20">
              {/* Live Feed */}
              <div className="space-y-6">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                  <h3 className="text-xl font-bold text-slate-800">Live Camera Feed</h3>
                </div>
                <div className="bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl p-6 aspect-video flex items-center justify-center border-2 border-slate-300/50 shadow-inner">
                  <Webcam
                    onStart={handleStartCamera}
                    onStop={handleStopCamera}
                    isStreaming={isStreaming}
                  />
                </div>
              </div>

              {/* Processed Analysis */}
              <div className="space-y-6">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
                  <h3 className="text-xl font-bold text-slate-800">AI Analysis Feed</h3>
                </div>
                <div className="bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl p-6 aspect-video flex items-center justify-center border-2 border-slate-300/50 shadow-inner">
                  <ProcessedFeed />
                </div>
              </div>
            </div>
          </div>

          {/* Statistics Dashboard */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8 border border-slate-200">
            <Stats />
          </div>

          {/* Control Panel */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 border border-slate-200">
            <Controls />
          </div>
        </div>
      </div>

      <Report />
    </div>
  );
}

export default App;