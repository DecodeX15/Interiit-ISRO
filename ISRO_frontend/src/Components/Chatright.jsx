import { useContext, useRef, useState, useEffect } from "react";
import { ThemeContext } from "../Context/theme/Themecontext.jsx";
import { sessioncontext } from "../Context/session/sessioncontext.jsx";
import { v4 as uuid } from "uuid";

function createMessage(role, content) {
  return {
    id: uuid(),
    role,
    content,
    createdAt: Date.now(),
  };
}

export default function Chatright() {
  const { theme } = useContext(ThemeContext);
  const { sessions, setSessions, activeSessionId, setActiveSessionId } =
    useContext(sessioncontext);

  const [message, setMessage] = useState("");

  const scrollContainerRef = useRef(null);
  const bottomRef = useRef(null);

  const isDark = theme === "dark";
  const bg = isDark ? "#0b0b0d" : "#F8F2E9";
  const text = isDark ? "#ffffff" : "#000000";
  const border = isDark ? "#1f1f22" : "#e3e3e3";

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [activeSessionId?.messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    if (!activeSessionId) return alert("Select a chat first!");

    const newMessage = createMessage("users", message);

    const updated = sessions.map((s) => {
      if (s.sessionId === activeSessionId.sessionId) {
        const updatedSession = {
          ...s,
          messages: [...s.messages, newMessage],
        };
        setActiveSessionId(updatedSession);
        return updatedSession;
      }
      return s;
    });

    setSessions(updated);
    localStorage.setItem("GeoNLI_Sessions", JSON.stringify(updated));

    setMessage("");
  };

  return (
    <div
      className="h-full flex flex-col relative"
      style={{ background: bg, color: text, borderLeft: `1px solid ${border}` }}
    >
      {/* NO CHAT SELECTED */}
      {!activeSessionId ? (
        <div className="flex-1 flex items-center justify-center opacity-70">
          Select or create a chat to talk with GeoNLI
        </div>
      ) : null}

      {/* IMAGE NOT UPLOADED */}
      {activeSessionId && !activeSessionId.publicImageURL ? (
        <div className="flex-1 flex items-center justify-center opacity-70">
          Upload image to start chat
        </div>
      ) : null}

      {/* CHAT UI */}
      {activeSessionId?.publicImageURL ? (
        <>
          {/* NO MESSAGES YET */}
          {activeSessionId.messages.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
              <p className="opacity-70 mb-4">Start chatting with GeoNLI</p>

              <form
                onSubmit={handleSend}
                className="w-full max-w-[400px] flex items-center gap-2"
              >
                <input
                  placeholder="Type your first message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="flex-1 px-4 py-2 rounded-xl outline-none"
                  style={{
                    background: isDark ? "#111114" : "#f4f4f4",
                    border: `1px solid ${border}`,
                    color: text,
                  }}
                />

                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-xl text-sm shadow text-white"
                >
                  Send
                </button>
              </form>
            </div>
          ) : (
            <>
              {/* MESSAGE LIST (scroll container) */}
              <div
                ref={scrollContainerRef}
                className="
                flex-1 overflow-y-auto 
                px-4 py-3 space-y-4 
                flex flex-col
                "
              >
                {activeSessionId.messages.map((msg) =>
                  msg.role === "user" ? (
                    <div
                      key={msg.id}
                      className="p-3 rounded-xl shadow self-end max-w-[85%] ml-auto"
                      style={{
                        background: isDark ? "#1a1a1d" : "#f5f5f5",
                        border: `1px solid ${border}`,
                      }}
                    >
                      <p className="text-blue-400 font-semibold text-xs mb-1">
                        You
                      </p>
                      <p className="text-sm">{msg.content}</p>
                    </div>
                  ) : (
                    <div
                      key={msg.id}
                      className="p-3 rounded-xl shadow self-start max-w-[85%] mr-auto"
                      style={{
                        background: isDark ? "#131317" : "#f7f7f7",
                        border: `1px solid ${border}`,
                      }}
                    >
                      <p className="text-green-400 font-semibold text-xs mb-1">
                        GeoNLI
                      </p>
                      <p className="text-sm">{msg.content}</p>
                    </div>
                  )
                )}

                <div ref={bottomRef}></div>
              </div>
              {/* FIXED BOTTOM INPUT */}
              <form
                onSubmit={handleSend}
                className="p-3 flex items-center gap-2 border-t"
                style={{
                  borderTop: `1px solid ${border}`,
                  background: bg,
                }}
              >
                <input
                  placeholder="Ask something..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="flex-1 px-4 py-2 rounded-xl outline-none"
                  style={{
                    background: isDark ? "#111114" : "#f4f4f4",
                    border: `1px solid ${border}`,
                    color: text,
                  }}
                />

                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-xl text-sm shadow text-white"
                >
                  Send
                </button>
              </form>
            </>
          )}
        </>
      ) : null}
    </div>
  );
}
