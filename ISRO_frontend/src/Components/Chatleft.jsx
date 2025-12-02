import { useContext, useState } from "react";
import { ThemeContext } from "../Context/theme/Themecontext.jsx";
import { Diff } from "lucide-react";
import { v4 as uuid } from "uuid";
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
  const { theme } = useContext(ThemeContext);
  const { sessions, setSessions, activeSessionId, setActiveSessionId } =
    useContext(sessioncontext);
  const isDark = theme === "dark";
  const bg = isDark ? "#0b0b0d" : "#F8F2E9";
  const text = isDark ? "#ffffff" : "#000000";
  const border = isDark ? "#1f1f22" : "#e3e3e3";

  // Modal states
  const [open, setOpen] = useState(false);
  const [chatName, setChatName] = useState("");

  const handlesubmit = (e) => {
    e.preventDefault();
    if (!chatName.trim()) {
      alert("Please give chat name");
      return;
    }
    console.log("aaofubae");
    const newSession = createNewSession(chatName);
    const updatedSessions = [...sessions, newSession];
    setSessions(updatedSessions);
    localStorage.setItem("GeoNLI_Sessions", JSON.stringify(updatedSessions));
    setActiveSessionId(newSession);
    setChatName("");
    setOpen(false);
  };

  // Add this function to handle backdrop click
  const handleBackdropClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setOpen(false);
  };

  // Add this function to handle cancel button
  const handleCancel = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setOpen(false);
    setChatName("");
  };

  return (
    <div
      className="h-full flex flex-col"
      style={{
        background: bg,
        color: text,
        borderRight: `1px solid ${border}`,
      }}
    >
      <div
        className="p-4 flex items-center justify-between"
        style={{ borderBottom: `1px solid ${border}` }}
      >
        <h2 className="text-lg font-semibold tracking-wide">Sessions</h2>

        <button
          type="button" // ADD THIS
          onClick={() => setOpen(true)}
          className="px-3 py-1 text-sm bg-[#7B3306] hover:bg-[#988d7d] transition rounded-md shadow cursor-pointer"
        >
          <Diff className="text-black" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {sessions.length === 0 ? (
          <> No chat create some session </>
        ) : (
          <>
            {sessions.map((session) => {
              const isActive = activeSessionId?.sessionId === session.sessionId;

              return (
                <div
                  onClick={() => {
                    setActiveSessionId(session);
                    console.log("chat switch ");
                    console.log(session);
                  }}
                  key={session.sessionId}
                  className={`
        group cursor-pointer px-4 py-3 border-b transition-all
        ${
          isActive
            ? "bg-[#7B3306]/20 border-[#7B3306]"
            : "hover:bg-[#2d2d30]/30"
        }
      `}
                  style={{
                    color: isDark ? "#ffffff" : "#000000",
                  }}
                >
                  <p
                    className={`font-medium truncate text-sm transition-colors
          ${
            isActive
              ? "text-[#7B3306] font-semibold"
              : "group-hover:text-[#7B3306]"
          }
        `}
                  >
                    {session.name}
                  </p>

                  <p
                    className="text-[11px] mt-1 opacity-60"
                    style={{ color: isDark ? "#cccccc" : "#444" }}
                  >
                    {session.messages.length} messages
                  </p>
                </div>
              );
            })}
          </>
        )}
      </div>

      {open && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* YEH WALA DIV - isme blur daalna hai */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          ></div>
          {/* Backdrop with form inside it */}
          <form
            onSubmit={handlesubmit}
            className="absolute inset-0"
            onClick={handleBackdropClick}
          >
            {/* Modal Content - Stop propagation here */}
            <div
              className="relative z-50 rounded-xl shadow-xl p-6 w-[90%] max-w-sm border mx-auto mt-20"
              style={{
                background: isDark ? "#1a1a1d" : "#ffffff",
                borderColor: border,
                color: text,
              }}
              onClick={(e) => e.stopPropagation()} // Stop click from bubbling to form
            >
              <h2 className="text-lg font-semibold mb-4">Create New Chat</h2>
              <input
                type="text"
                placeholder="Enter chat name..."
                value={chatName}
                onChange={(e) => setChatName(e.target.value)}
                className="w-full p-2 rounded-md border bg-transparent outline-none mb-4"
                style={{
                  borderColor: border,
                  color: text,
                }}
                autoFocus
              />
              <div className="flex justify-end gap-3 mt-5">
                <button
                  type="button" // CHANGED TO button
                  onClick={handleCancel}
                  className="px-4 py-2 rounded-md border hover:bg-gray-800 dark:hover:bg-[#2a2a2d] transition cursor-pointer"
                  style={{ borderColor: border, color: text }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-md bg-[#7B3306] text-white hover:bg-[#A85A2C] transition cursor-pointer"
                >
                  Create
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
