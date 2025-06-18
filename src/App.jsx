import Webcam from "./components/Webcam";
import ProcessedFeed from "./components/ProcessedFeed";
import Stats from "./components/Stats";
import Controls from "./components/Controls";
import Report from "./components/Report";
import { useState } from "react";

function App() {
  const [isStreaming, setIsStreaming] = useState(false);

  const handleStartCamera = () => setIsStreaming(true);
  const handleStopCamera = () => setIsStreaming(false);

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-[#232b3e] to-[#2d3755] flex flex-col items-center justify-center overflow-hidden">
      <div className="bg-white/5 backdrop-blur-lg rounded-[35px] p-8 shadow-[0_25px_50px_rgba(0,0,0,0.2)] min-w-fit ">
        <div className="w-full max-w-6xl h-2xl grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 px-4">
          <div className="rounded-lg bg-white/5  backdrop-blur-lg shadow-lg flex items-center justify-center h-full">
            <Webcam
              onStart={handleStartCamera}
              onStop={handleStopCamera}
              isStreaming={isStreaming}
            />
          </div>
          <div className="rounded-lg bg-white/5  backdrop-blur-lg shadow-lg flex items-center justify-center h-full">
            <ProcessedFeed />
          </div>
        </div>
        <Stats />
        <div className="w-full max-w-4xl mx-auto mb-4">
          <Controls />
        </div>
      </div>
      <Report />
    </div>
  );
}

export default App;
