import ChatLeft from "../Components/Chatleft";
import Chatmiddle from "../Components/Chatmiddle";
import Chatright from "../Components/Chatright";
import { useState } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import ChatEvalMode from "./ChatEvalMode.jsx";
import { useTheme } from "../Context/theme/Themecontext";
import { Zap, BarChart3, ChevronRight } from "lucide-react";

export default function Chat() {
  const [mode, setMode] = useState("interactive");
  const { darkMode } = useTheme();

  return (
    <div className={`relative flex flex-col min-h-screen h-auto overflow-y-auto z-0 ${
      darkMode ? 'bg-gray-900' : 'bg-gray-300'
    }`}>
      {/* Modern Header */}
      <div className={`sticky top-0 z-50 border-b backdrop-blur-lg ${
        darkMode 
          ? 'bg-gray-900 border-gray-800' 
          : 'bg-gray-300 border-gray-200'
      }`}>
        <div className="max-w-full mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Left: Mode Info */}
            <div className="flex items-center gap-4">
              <div className={`p-2.5 rounded-xl ${
                mode === "interactive" 
                  ? darkMode ? 'bg-orange-600/20' : 'bg-orange-100'
                  : darkMode ? 'bg-blue-600/20' : 'bg-blue-100'
              }`}>
                {mode === "interactive" ? (
                  <Zap className={`w-5 h-5 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
                ) : (
                  <BarChart3 className={`w-5 h-5 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                )}
              </div>
              
              <div>
                <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {mode === "interactive" ? "Interactive Analysis" : "Evaluation Mode"}
                </h2>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {mode === "interactive" 
                    ? "Chat with satellite imagery using natural language" 
                    : "Evaluate model performance and accuracy"}
                </p>
              </div>
            </div>

            {/* Right: Mode Toggle */}
            <button
  onClick={() => setMode(mode === "interactive" ? "evaluation" : "interactive")}
  className={`group flex items-center gap-2 px-5 py-2.5 font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 ${
    darkMode
      ? 'bg-gray-800 hover:bg-gray-700 text-white border-2 border-gray-700'
      : 'bg-white hover:bg-gray-50 text-gray-900 border-2 border-gray-200'
  } ${
    mode === "interactive"
      ? 'hover:border-blue-400'
      :  'hover:border-orange-400'
  }`}
>
  <span>Switch to {mode === "interactive" ? "Evaluation" : "Interactive"}</span>
  <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
</button>
          </div>
        </div>
      </div>

      {/* Panels */}
      {mode === "interactive" ? (
        <PanelGroup direction="horizontal" className="p-6 flex-1 flex min-h-[calc(100vh-88px)]">
          <Panel defaultSize={25} minSize={15}>
            <ChatLeft />
          </Panel>

          <PanelResizeHandle className={`w-1 transition-colors ${
            darkMode 
              ? 'bg-gray-800 hover:bg-orange-500' 
              : 'bg-gray-300 hover:bg-orange-400'
          } cursor-col-resize`} />

          <Panel defaultSize={50} minSize={30}>
            <Chatmiddle />
          </Panel>

          <PanelResizeHandle className={`w-1 transition-colors ${
            darkMode 
              ? 'bg-gray-800 hover:bg-blue-500' 
              : 'bg-gray-300 hover:bg-blue-400'
          } cursor-col-resize`} />

          <Panel defaultSize={25} minSize={20}>
            <Chatright />
          </Panel>
        </PanelGroup>
      ) : (
        <ChatEvalMode />
      )}
    </div>
  );
}