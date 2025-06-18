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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 relative overflow-hidden">
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(circle at 20% 20%, rgba(139, 92, 246, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(59, 130, 246, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 40% 60%, rgba(99, 102, 241, 0.2) 0%, transparent 50%),
            linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%)
          `
        }}></div>
      </div>
      
      {/* Animated Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-violet-400 rounded-full animate-pulse opacity-60"></div>
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-blue-400 rounded-full animate-ping opacity-40"></div>
        <div className="absolute top-1/2 left-3/4 w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce opacity-50"></div>
      </div>

      <Header />
      <StatusBar isStreaming={isStreaming} />
      <AlertSystem />
      
      <div className="container mx-auto px-6 py-12 relative z-10">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Main Video Display */}
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-12 relative overflow-hidden border border-white/20">
            {/* Enhanced Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `
                  radial-gradient(circle at 25% 25%, #8b5cf6 0%, transparent 50%), 
                  radial-gradient(circle at 75% 75%, #3b82f6 0%, transparent 50%),
                  radial-gradient(circle at 50% 50%, #6366f1 0%, transparent 50%)
                `
              }}></div>
            </div>
            
            {/* Enhanced KVGAI Watermark */}
            <div className="absolute top-8 left-8 opacity-15 z-10">
              <div className="text-5xl font-black text-white tracking-tight">KVGAI</div>
              <div className="text-sm text-violet-200 font-bold tracking-wider">NEURAL INTELLIGENCE</div>
            </div>
            
            {/* Enhanced Monitoring Status */}
            <div className="absolute top-8 right-8 z-10">
              {isStreaming && (
                <div className="flex items-center gap-4 bg-gradient-to-r from-emerald-500/20 to-green-500/20 backdrop-blur-xl text-emerald-100 px-8 py-4 rounded-2xl text-sm font-bold border border-emerald-400/30 shadow-2xl">
                  <div className="relative">
                    <div className="w-4 h-4 bg-emerald-400 rounded-full animate-pulse shadow-lg"></div>
                    <div className="absolute inset-0 w-4 h-4 bg-emerald-400 rounded-full animate-ping opacity-75"></div>
                  </div>
                  <span className="text-lg">Neural Analysis Active</span>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-20">
              {/* Live Feed */}
              <div className="space-y-8">
                <div className="flex items-center space-x-4">
                  <div className="w-5 h-5 bg-gradient-to-r from-violet-500 to-purple-600 rounded-full shadow-xl"></div>
                  <h3 className="text-3xl font-bold text-white">Live Camera Feed</h3>
                  <div className="flex-1 h-px bg-gradient-to-r from-violet-400/50 to-transparent"></div>
                </div>
                <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 rounded-3xl p-4 border-2 border-violet-500/30 shadow-2xl backdrop-blur-sm">
                  <div className="w-full h-96 rounded-2xl overflow-hidden shadow-2xl">
                    <Webcam
                      onStart={handleStartCamera}
                      onStop={handleStopCamera}
                      isStreaming={isStreaming}
                    />
                  </div>
                </div>
              </div>

              {/* Processed Analysis */}
              <div className="space-y-8">
                <div className="flex items-center space-x-4">
                  <div className="w-5 h-5 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full shadow-xl"></div>
                  <h3 className="text-3xl font-bold text-white">AI Analysis Feed</h3>
                  <div className="flex-1 h-px bg-gradient-to-r from-blue-400/50 to-transparent"></div>
                </div>
                <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 rounded-3xl p-4 border-2 border-blue-500/30 shadow-2xl backdrop-blur-sm">
                  <div className="w-full h-96 rounded-2xl overflow-hidden shadow-2xl">
                    <ProcessedFeed />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Statistics Dashboard */}
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-12 border border-white/20">
            <Stats />
          </div>

          {/* Control Panel */}
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-12 border border-white/20">
            <Controls />
          </div>
        </div>
      </div>

      <Report />
    </div>
  );
}

export default App;