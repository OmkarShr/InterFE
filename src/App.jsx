import Webcam from "./components/Webcam";
import ProcessedFeed from "./components/ProcessedFeed";
import Stats from "./components/Stats";
import Controls from "./components/Controls";
import Report from "./components/Report";
import Header from "./components/Header";
import StatusBar from "./components/StatusBar";
import AlertSystem from "./components/AlertSystem";
import { useState } from "react";

function App() {
  const [isStreaming, setIsStreaming] = useState(false);

  const handleStartCamera = () => setIsStreaming(true);
  const handleStopCamera = () => setIsStreaming(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header />
      <StatusBar isStreaming={isStreaming} />
      <AlertSystem />
      
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Main Video Display */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 relative overflow-hidden">
            {/* KVGAI Watermark */}
            <div className="absolute top-4 left-4 opacity-10 z-10">
              <div className="text-2xl font-bold text-slate-600">KVGAI</div>
            </div>
            
            {/* Monitoring Status */}
            <div className="absolute top-4 right-4 z-10">
              {isStreaming && (
                <div className="flex items-center gap-2 bg-green-500/10 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  Monitoring Active
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Live Feed */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-700">Live Feed</h3>
                <div className="bg-slate-50 rounded-xl p-4 aspect-video flex items-center justify-center border-2 border-slate-200">
                  <Webcam
                    onStart={handleStartCamera}
                    onStop={handleStopCamera}
                    isStreaming={isStreaming}
                  />
                </div>
              </div>

              {/* Processed Analysis */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-700">AI Analysis</h3>
                <div className="bg-slate-50 rounded-xl p-4 aspect-video flex items-center justify-center border-2 border-slate-200">
                  <ProcessedFeed />
                </div>
              </div>
            </div>
          </div>

          {/* Statistics Dashboard */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <Stats />
          </div>

          {/* Control Panel */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <Controls />
          </div>
        </div>
      </div>

      <Report />
    </div>
  );
}

export default App;