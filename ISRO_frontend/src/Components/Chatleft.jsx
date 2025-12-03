import { useContext, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
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

  const handleDelete = (e, sessionId) => {
    e.stopPropagation(); // Prevent triggering the session click
    
    if (window.confirm("Are you sure you want to delete this chat?")) {
      const updatedSessions = sessions.filter(s => s.sessionId !== sessionId);
      setSessions(updatedSessions);
      localStorage.setItem("GeoNLI_Sessions", JSON.stringify(updatedSessions));
      
      // If deleted session was active, clear active session
      if (activeSessionId?.sessionId === sessionId) {
        setActiveSessionId(null);
      }
    }
  };

  return (
    <div className={`h-full flex flex-col transition-colors duration-300 ${
      darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"
    }`}>
      {/* Header */}
      <div className={`px-6 py-4 flex items-center justify-between border-b transition-colors shrink-0 ${
        darkMode ? "border-gray-800 bg-gray-800/50" : "border-gray-200 bg-gray-50"
      }`}>
        <h2 className={`text-lg font-bold tracking-wide ${darkMode ? "text-white" : "text-gray-900"}`}>
          Sessions
        </h2>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className={`px-4 py-2 text-sm  cursor-pointer transition-all rounded-xl shadow-md hover:shadow-lg font-semibold flex items-center gap-2 transform hover:scale-105 active:scale-95 ${
            darkMode 
              ? 'bg-orange-600/20 text-orange-400 hover:bg-orange-600/30 border border-orange-600/30' 
              : 'bg-orange-100 text-orange-700 hover:bg-orange-200 border border-orange-200'
          }`}
        >
          <Plus className="w-4 h-4" />
          New
        </button>
      </div>

      {/* Sessions List */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden px-3 py-2 min-h-0">
        {sessions.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full px-6 py-12 text-center">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
              darkMode ? 'bg-gray-800' : 'bg-gray-100'
            }`}>
              <Plus className={`w-8 h-8 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`} />
            </div>
            <p className={`text-sm font-medium mb-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              No sessions yet
            </p>
            <p className={`text-xs ${darkMode ? "text-gray-600" : "text-gray-500"}`}>
              Create your first chat to get started
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {sessions.map((session) => (
              <div
                key={session.sessionId}
                onClick={() => setActiveSessionId(session)}
                className={`group relative p-4 rounded-xl cursor-pointer transition-all duration-200 border ${
                  activeSessionId?.sessionId === session.sessionId
                    ? darkMode 
                      ? 'bg-linear-to-r from-orange-600/20 to-blue-600/20 border-orange-500/50 shadow-lg' 
                      : 'bg-linear-to-r from-orange-100 to-blue-100 border-orange-400 shadow-md'
                    : darkMode
                    ? "bg-gray-800 border-gray-700 hover:bg-gray-750 hover:border-gray-600"
                    : "bg-gray-50 border-gray-200 hover:bg-gray-100 hover:border-gray-300"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-semibold truncate ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}>
                      {session.name}
                    </p>
                    <p className={`text-xs mt-1 ${
                      darkMode ? "text-gray-500" : "text-gray-500"
                    }`}>
                      {new Date(session.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  
                  {/* Delete Button */}
                  <button
                    type="button"
                    onClick={(e) => handleDelete(e, session.sessionId)}
                    className={`opacity-0 group-hover:opacity-100 p-2 rounded-lg transition-all shrink-0 ${
                      darkMode 
                        ? 'hover:bg-red-900/30 text-red-400 hover:text-red-300' 
                        : 'hover:bg-red-50 text-red-500 hover:text-red-600'
                    }`}
                    title="Delete chat"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 flex items-center justify-center z-999">
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
            <h2 className={`text-2xl font-bold mb-6 ${
              darkMode ? 'text-white' : 'bg-linear-to-r from-orange-500 to-blue-500 bg-clip-text text-transparent'
            }`}>
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
                className={`px-5 py-2 rounded-lg text-white font-medium transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95 ${
                  darkMode
                    ? "bg-orange-600 hover:bg-orange-700"
                    : "bg-linear-to-r from-orange-500 to-blue-500 hover:from-orange-600 hover:to-blue-600"
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