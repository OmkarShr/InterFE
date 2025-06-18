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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50">
      <Header />
      <StatusBar isStreaming={isStreaming} />
      <AlertSystem />
      
      <div className="container mx-auto px-6 py-10">
        <div className="max-w-7xl mx-auto space-y-10">
          {/* Main Video Display */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-10 relative overflow-hidden border border-slate-200/50">
            {/* Enhanced Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 25% 25%, #3b82f6 0%, transparent 50%), 
                                 radial-gradient(circle at 75% 75%, #6366f1 0%, transparent 50%),
                                 radial-gradient(circle at 50% 50%, #8b5cf6 0%, transparent 50%)`
              }}></div>
            </div>
            
            {/* Enhanced KVGAI Watermark */}
            <div className="absolute top-8 left-8 opacity-8 z-10">
              <div className="text-4xl font-black text-slate-600 tracking-tight">KVGAI</div>
              <div className="text-xs text-slate-500 font-bold tracking-wider">PROFESSIONAL AI</div>
            </div>
            
            {/* Enhanced Monitoring Status */}
            <div className="absolute top-8 right-8 z-10">
              {isStreaming && (
                <div className="flex items-center gap-4 bg-gradient-to-r from-green-500/15 to-emerald-500/15 backdrop-blur-md text-green-700 px-6 py-3 rounded-2xl text-sm font-bold border border-green-200/50 shadow-xl">
                  <div className="relative">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-lg"></div>
                    <div className="absolute inset-0 w-3 h-3 bg-green-500 rounded-full animate-ping opacity-75"></div>
                  </div>
                  <span>AI Neural Analysis Active</span>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 relative z-20">
              {/* Live Feed */}
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-4 h-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full shadow-lg"></div>
                  <h3 className="text-2xl font-bold text-slate-800">Live Camera Feed</h3>
                  <div className="flex-1 h-px bg-gradient-to-r from-slate-300 to-transparent"></div>
                </div>
                <div className="bg-gradient-to-br from-slate-100/80 to-slate-200/80 rounded-3xl p-3 border-2 border-slate-300/50 shadow-inner backdrop-blur-sm">
                  <div className="w-full h-80 rounded-2xl overflow-hidden shadow-lg">
                    <Webcam
                      onStart={handleStartCamera}
                      onStop={handleStopCamera}
                      isStreaming={isStreaming}
                    />
                  </div>
                </div>
              </div>

              {/* Processed Analysis */}
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-4 h-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full shadow-lg"></div>
                  <h3 className="text-2xl font-bold text-slate-800">AI Analysis Feed</h3>
                  <div className="flex-1 h-px bg-gradient-to-r from-slate-300 to-transparent"></div>
                </div>
                <div className="bg-gradient-to-br from-slate-100/80 to-slate-200/80 rounded-3xl p-3 border-2 border-slate-300/50 shadow-inner backdrop-blur-sm">
                  <div className="w-full h-80 rounded-2xl overflow-hidden shadow-lg">
                    <ProcessedFeed />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Statistics Dashboard */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-10 border border-slate-200/50">
            <Stats />
          </div>

          {/* Control Panel */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-10 border border-slate-200/50">
            <Controls />
          </div>
        </div>
      </div>

      <Report />
    </div>
  );
}

export default App;