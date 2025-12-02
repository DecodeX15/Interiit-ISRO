import { useContext, useState } from "react";
import { Diff } from "lucide-react";
import { v4 as uuid } from "uuid";
import { useTheme } from "../Context/theme/Themecontext.jsx";
import { sessioncontext } from "../Context/session/sessioncontext.jsx";

function createNewSession(chatName) {
  return {
    sessionId: uuid(),
    name: chatName,
    createdAt: Date.now(),
    publicImageURL: null,
    draftText: "",
    aiLoading: false,
    messages: [],
    unreadCount: 0,
    updatedAt: Date.now(),
  };
}

export default function ChatLeft() {
  const { darkMode } = useTheme();

  const { sessions, setSessions, activeSessionId, setActiveSessionId } =
    useContext(sessioncontext);

  // Modal states
  const [open, setOpen] = useState(false);
  const [chatName, setChatName] = useState("");

  const handleSubmit = () => {
    if (!chatName.trim()) {
      alert("Please give chat name");
      return;
    }
    
    const newSession = createNewSession(chatName);
    const updatedSessions = [...sessions, newSession];

    setSessions(updatedSessions);
    setActiveSessionId(newSession);
    localStorage.setItem("GeoNLI_Sessions", JSON.stringify(updatedSessions));

    setOpen(false);
    setChatName("");
  };

  return (
    <div className={`m-8 h-full flex flex-col border-r transition-colors duration-300 ${
      darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"
    }`}>
      <div className={`p-4 flex items-center justify-between border-b transition-colors ${
        darkMode ? "border-gray-800 bg-gray-800/50" : "border-gray-200 bg-gray-50"
      }`}>
        <h2 className={`text-lg font-bold tracking-wide ${darkMode ? "text-white" : "text-gray-900"}`}>
          Sessions
        </h2>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className={`px-3 py-2 text-sm transition-all rounded-lg shadow-lg hover:shadow-xl text-white font-medium flex items-center gap-2 transform hover:scale-105 ${
            darkMode 
              ? "bg-gradient-to-r from-orange-600 to-blue-600 hover:from-orange-700 hover:to-blue-700"
              : "bg-gradient-to-r from-orange-500 to-blue-500 hover:from-orange-600 hover:to-blue-600"
          }`}
        >
          <Diff className="w-4 h-4" />
          New Chat
        </button>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
        {sessions.length === 0 ? (
          <div className="p-6 text-center">
            <p className={`opacity-60 text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
              No sessions available
            </p>
            <p className={`text-xs mt-2 opacity-40 ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
              Create one to get started
            </p>
          </div>
        ) : (
          sessions.map((session) => (
            <div
              key={session.sessionId}
              onClick={() => setActiveSessionId(session)}
              className={`m-2 p-3 rounded-lg cursor-pointer transition-all duration-200 border ${
                activeSessionId?.sessionId === session.sessionId
                  ? darkMode
                    ? "bg-gradient-to-r from-orange-900/60 to-blue-900/60 border-orange-500 shadow-lg"
                    : "bg-gradient-to-r from-orange-100 to-blue-100 border-orange-400 shadow-md"
                  : darkMode
                  ? "bg-gray-800 border-gray-700 hover:bg-gray-700/80"
                  : "bg-gray-100 border-gray-300 hover:bg-gray-200"
              }`}
            >
              <p className={`text-sm font-semibold truncate ${darkMode ? "text-white" : "text-gray-900"}`}>
                {session.name}
              </p>
              <p className={`text-xs mt-1 ${darkMode ? "text-gray-500" : "text-gray-500"}`}>
                {new Date(session.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))
        )}
      </div>

      {open && (
        <div className="fixed inset-0 flex items-center justify-center z-[999]">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
            onClick={() => {
              setOpen(false);
              setChatName("");
            }}
          />
          <div className={`
            relative z-50 rounded-2xl shadow-2xl p-8 w-[90%] max-w-md border backdrop-blur-xl
            ${darkMode 
              ? "bg-gray-900/95 border-gray-700 text-white" 
              : "bg-white/95 border-gray-300 text-gray-900"}
          `}>
            <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-orange-500 to-blue-500 bg-clip-text text-transparent">
              Create New Chat
            </h2>
            <input
              type="text"
              placeholder="Enter chat name..."
              value={chatName}
              onChange={(e) => setChatName(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
              className={`
                w-full p-3 rounded-lg border-2 outline-none transition-all
                ${darkMode 
                  ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-orange-500" 
                  : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400 focus:border-orange-500"}
                focus:shadow-lg
              `}
              autoFocus
            />
            <div className="flex justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  setChatName("");
                }}
                className={`
                  px-5 py-2 rounded-lg border-2 transition-all font-medium
                  ${darkMode 
                    ? "border-gray-600 text-gray-300 hover:bg-gray-800 hover:border-gray-500" 
                    : "border-gray-400 text-gray-700 hover:bg-gray-100 hover:border-gray-500"}
                `}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!chatName.trim()}
                className={`px-5 py-2 rounded-lg text-white font-medium transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 ${
                  darkMode
                    ? "bg-gradient-to-r from-orange-600 to-blue-600 hover:from-orange-700 hover:to-blue-700"
                    : "bg-gradient-to-r from-orange-500 to-blue-500 hover:from-orange-600 hover:to-blue-600"
                }`}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}