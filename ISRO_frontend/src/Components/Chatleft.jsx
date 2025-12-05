import { useContext, useState } from "react";
import { Plus, Trash2, ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";
import { v4 as uuid } from "uuid";
import { useTheme } from "../Context/theme/Themecontext.jsx";
import { sessioncontext } from "../Context/session/sessioncontext.jsx";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../Components/ui/alert-dialog.jsx";

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

export default function ChatLeft({ sidebarOpen, setSidebarOpen }) {
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
    e.stopPropagation();

    const updatedSessions = sessions.filter((s) => s.sessionId !== sessionId);
    setSessions(updatedSessions);
    localStorage.setItem("GeoNLI_Sessions", JSON.stringify(updatedSessions));

    if (activeSessionId?.sessionId === sessionId) {
      setActiveSessionId(null);
    }
  };

  return (
    <>
      {sidebarOpen ? (
        // ✅ EXPANDED SIDEBAR
        <div
          className={`h-full w-full flex flex-col transition-all duration-300 ${
            darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"
          }`}
        >
          {/* Header */}
          <div
            className={`px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between border-b transition-colors shrink-0 ${
              darkMode
                ? "border-gray-800 bg-gray-800/50"
                : "border-gray-200 bg-gray-50"
            }`}
          >
            <h2
              className={`text-base sm:text-lg font-bold tracking-wide truncate ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Sessions
            </h2>

            {/* Action Buttons Container */}
            <div className="flex items-center gap-1 sm:gap-2 shrink-0">
              {/* Create Button */}
              <button
                type="button"
                onClick={() => setOpen(true)}
                className={`p-2 sm:px-4 sm:py-2 text-xs sm:text-sm cursor-pointer transition-all rounded-lg sm:rounded-xl shadow-md hover:shadow-lg font-semibold flex items-center gap-1 sm:gap-2 transform hover:scale-105 active:scale-95 ${
                  darkMode
                    ? "bg-orange-600/20 text-orange-400 hover:bg-orange-600/30 border border-orange-600/30"
                    : "bg-orange-100 text-orange-700 hover:bg-orange-200 border border-orange-200"
                }`}
                title="Create new chat"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">New</span>
              </button>

              {/* Collapse Button */}
              <button
                type="button"
                onClick={() => setSidebarOpen(false)}
                className={`p-2 sm:px-4 sm:py-2 text-xs sm:text-sm cursor-pointer transition-all rounded-lg sm:rounded-xl shadow-md hover:shadow-lg font-semibold flex items-center gap-1 sm:gap-2 transform hover:scale-105 active:scale-95 ${
                  darkMode
                    ? "bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 border border-blue-600/30"
                    : "bg-blue-100 text-blue-700 hover:bg-blue-200 border border-blue-200"
                }`}
                title="Collapse sidebar"
              >
                <ArrowLeftFromLine className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Sessions List */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden px-2 sm:px-3 py-2 sm:py-3 min-h-0">
            {sessions.length === 0 ? (
              // Empty State
              <div className="flex flex-col items-center justify-center h-full px-4 py-8 sm:py-12 text-center">
                <div
                  className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mb-2 sm:mb-4 ${
                    darkMode ? "bg-gray-800" : "bg-gray-100"
                  }`}
                >
                  <Plus
                    className={`w-6 h-6 sm:w-8 sm:h-8 ${
                      darkMode ? "text-gray-600" : "text-gray-400"
                    }`}
                  />
                </div>
                <p
                  className={`text-xs sm:text-sm font-medium mb-1 sm:mb-2 ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  No sessions yet
                </p>
                <p
                  className={`text-xs ${
                    darkMode ? "text-gray-600" : "text-gray-500"
                  }`}
                >
                  Create your first chat
                </p>
              </div>
            ) : (
              // Sessions List
              <div className="space-y-1 sm:space-y-2">
                {sessions.map((session) => (
                  <div
                    key={session.sessionId}
                    onClick={() => setActiveSessionId(session)}
                    className={`group relative p-2 sm:p-4 rounded-lg sm:rounded-xl cursor-pointer transition-all duration-200 border ${
                      activeSessionId?.sessionId === session.sessionId
                        ? darkMode
                          ? "bg-linear-to-r from-orange-600/20 to-blue-600/20 border-orange-500/50 shadow-lg"
                          : "bg-linear-to-r from-orange-100 to-blue-100 border-orange-400 shadow-md"
                        : darkMode
                        ? "bg-gray-800 border-gray-700 hover:bg-gray-750 hover:border-gray-600"
                        : "bg-gray-50 border-gray-200 hover:bg-gray-100 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 sm:gap-3">
                      <div className="flex-1 min-w-0">
                        <p
                          className={`text-xs sm:text-sm font-semibold truncate ${
                            darkMode ? "text-white" : "text-gray-900"
                          }`}
                        >
                          {session.name}
                        </p>
                        <p
                          className={`text-xs mt-0.5 sm:mt-1 ${
                            darkMode ? "text-gray-500" : "text-gray-500"
                          }`}
                        >
                          {new Date(session.createdAt).toLocaleDateString()}
                        </p>
                      </div>

                      {/* Delete Button */}
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <button
                            type="button"
                            className={`opacity-0 group-hover:opacity-100 p-1 sm:p-2 rounded-lg transition-all shrink-0 ${
                              darkMode
                                ? "hover:bg-red-900/30 text-red-400 hover:text-red-300"
                                : "hover:bg-red-50 text-red-500 hover:text-red-600"
                            }`}
                            title="Delete chat"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </AlertDialogTrigger>
                        <AlertDialogContent
                          className={`w-[90%] sm:w-full rounded-xl border-2 shadow-2xl ${
                            darkMode
                              ? "bg-gray-900 border-gray-700"
                              : "bg-white border-gray-200"
                          }`}
                        >
                          <AlertDialogHeader>
                            <AlertDialogTitle
                              className={`text-base sm:text-lg ${
                                darkMode ? "text-gray-200" : "text-gray-900"
                              }`}
                            >
                              Delete Session?
                            </AlertDialogTitle>
                          </AlertDialogHeader>
                          <AlertDialogFooter className="flex flex-col-reverse sm:flex-row gap-2">
                            <AlertDialogCancel
                              className={`text-xs sm:text-sm ${
                                darkMode
                                  ? "border-gray-600 text-gray-300"
                                  : "border-gray-400 text-gray-700"
                              }`}
                            >
                              Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction
                              className="bg-red-500/70 hover:bg-red-500/90 text-xs sm:text-sm"
                              onClick={(e) => handleDelete(e, session.sessionId)}
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        // ✅ COLLAPSED SIDEBAR
        <div className="h-full flex flex-col gap-2 sm:gap-3 items-center justify-start pt-2 sm:pt-3 px-1">

          {/* Expand Button */}
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className={`
              group flex items-center justify-center gap-1
              p-2 sm:p-3 text-xs sm:text-sm font-semibold rounded-lg sm:rounded-xl cursor-pointer
              transition-all duration-200 ease-out shadow-sm w-full sm:w-auto
              hover:shadow-md hover:-translate-y-0.5 active:scale-95
              ${darkMode
                ? "bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 border border-blue-500/25"
                : "bg-blue-100 text-blue-700 hover:bg-blue-200 border border-blue-200"
              }
            `}
            title="Expand sidebar"
          >
            <ArrowRightFromLine className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* ✅ RESPONSIVE MODAL */}
      {open && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
            onClick={() => {
              setOpen(false);
              setChatName("");
            }}
          />
          <div
            className={`
              relative z-50 rounded-xl sm:rounded-2xl shadow-2xl p-4 sm:p-8 
              w-full sm:w-[90%] max-w-sm border backdrop-blur-xl
              ${
                darkMode
                  ? "bg-gray-900/95 border-gray-700 text-white"
                  : "bg-white/95 border-gray-300 text-gray-900"
              }
            `}
          >
            <h2
              className={`text-xl sm:text-2xl font-bold mb-4 sm:mb-6 ${
                darkMode
                  ? "text-white"
                  : "bg-linear-to-r from-orange-500 to-blue-500 bg-clip-text text-transparent"
              }`}
            >
              Create New Chat
            </h2>

            <input
              type="text"
              placeholder="Enter chat name..."
              value={chatName}
              onChange={(e) => setChatName(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
              className={`
                w-full p-2 sm:p-3 rounded-lg border-2 outline-none transition-all text-sm sm:text-base
                ${
                  darkMode
                    ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-orange-500"
                    : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400 focus:border-orange-500"
                }
                focus:shadow-lg
              `}
              autoFocus
            />

            <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 sm:gap-3 mt-4 sm:mt-6">
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  setChatName("");
                }}
                className={`
                  px-4 sm:px-5 py-2 rounded-lg border-2 transition-all font-medium text-sm sm:text-base
                  ${
                    darkMode
                      ? "border-gray-600 text-gray-300 hover:bg-gray-800 hover:border-gray-500"
                      : "border-gray-400 text-gray-700 hover:bg-gray-100 hover:border-gray-500"
                  }
                `}
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleSubmit}
                disabled={!chatName.trim()}
                className={`px-4 sm:px-5 py-2 rounded-lg text-white font-medium transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95 text-sm sm:text-base ${
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
    </>
  );
}