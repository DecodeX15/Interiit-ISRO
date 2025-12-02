import { useContext, useRef, useState, useEffect } from "react";
import { useTheme } from "../Context/theme/Themecontext.jsx";
import { sessioncontext } from "../Context/session/sessioncontext.jsx";
import { v4 as uuid } from "uuid";
import handlemodelresponse from "./apicaller.js";

import { Forward, SquareX,Send } from "lucide-react";

function createMessage(role, content) {
  return {
    id: uuid(),
    role,
    content,
    createdAt: Date.now(),
  };
}

export default function Chatright() {
  const { darkMode } = useTheme();
  const { sessions, setSessions, activeSessionId, setActiveSessionId } =
    useContext(sessioncontext);

  const [message, setMessage] = useState("");
  const [aiLoading, setAiLoading] = useState(false);

  const scrollContainerRef = useRef(null);
  const bottomRef = useRef(null);

  const isDark = darkMode;
  const bg = isDark ? "#0b0b0d" : "#F8F2E9";
  const text = isDark ? "#ffffff" : "#000000";
  const border = isDark ? "#1f1f22" : "#e3e3e3";


  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [activeSessionId?.messages]);

  // jab user chat switch kare → input / loading reset
  useEffect(() => {
    setMessage("");
    setAiLoading(false);
  }, [activeSessionId?.sessionId]);

  const handleSend = async (e) => {
    try {
      e.preventDefault();
      if (!message.trim()) return;
      if (!activeSessionId) return alert("Select a chat first!");
      if (aiLoading) return;


      // snapshot so that async ke beech me activeSession change ho jaye to bhi
      const targetSessionId = activeSessionId.sessionId;
      const targetImageURL = activeSessionId.publicImageURL;

      const userMessage = createMessage("user", message);

     // 1) Add user message to the correct session (immutably)
const updatedUserSessions = sessions.map((s) => {
  if (s.sessionId === targetSessionId) {
    return {
      ...s,
      messages: [...s.messages, userMessage],
    };
  }
  return s;
});

setSessions(updatedUserSessions);


     

localStorage.setItem("GeoNLI_Sessions", JSON.stringify(updatedUserSessions));
      // agar user abhi bhi isi chat me hai to activeSession bhi update karo
      setActiveSessionId((prev) =>
        prev && prev.sessionId === targetSessionId
          ? {
              ...prev,
              messages: [...prev.messages, userMessage],
            }
          : prev
      );


      setMessage("");
      setAiLoading(true);
      const res = await handlemodelresponse(
        message,
        targetSessionId,
        targetImageURL
      );

      console.log(res);

      const aiMessage = createMessage("ai", res);

      // 3) AI msg session me daalo
      const updatedAISessions = updatedUserSessions.map((s) => {
        if (s.sessionId === targetSessionId) {
          return { ...s,
            messages: [...s.messages, aiMessage],
          };
        }
        return s;
      });


      setSessions(updatedAISessions);
      localStorage.setItem("GeoNLI_Sessions", JSON.stringify(updatedAiSessions));
      // phir se, sirf tab activeSession update karo jab user still isi chat me ho
      setActiveSessionId((prev) =>
        prev && prev.sessionId === targetSessionId
          ? {
              ...prev,
              messages: [...prev.messages, aiMessage],
            }
          : prev
      );
      setAiLoading(false);
    } catch (error) {
      console.log(error);
      setAiLoading(false);
    }
  };

  return (
    <div className={`flex flex-col h-full rounded-2xl border-2 transition-colors ${
      darkMode ? "bg-gray-800/50 border-gray-700" : "bg-white border-gray-200"
    }`}>
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
      ) :
      (

      
            
       <>
       
       {/* Messages Container */}

      <div
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent"
      >
        {activeSessionId?.messages?.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className={`text-center opacity-60 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
              Start the conversation...
            </p>
          </div>
        ) : (
          activeSessionId?.messages?.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >

              <div
                className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl shadow-lg transition-all ${
                  msg.role === "user"
                    ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-br-none"
                    : darkMode
                    ? "bg-gray-700 text-gray-100 rounded-bl-none"
                    : "bg-gray-200 text-gray-900 rounded-bl-none"
                }`}
              >
                <p className="text-sm leading-relaxed">{msg.content}</p>
                <p className={`text-xs mt-2 opacity-70 ${
                  msg.role === "user" ? "text-blue-100" : darkMode ? "text-gray-400" : "text-gray-500"
                }`}>
                  {new Date(msg.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>

            </div>
          ))
        )}
        {aiLoading && (
          <div className="flex justify-start">
            <div className={`px-4 py-3 rounded-2xl rounded-bl-none ${
              darkMode ? "bg-gray-700" : "bg-gray-200"
            }`}>
              <div className="flex gap-2">
                <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" />
                <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce delay-100" />
                <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce delay-200" />
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input Area */}
      <div className={`border-t p-2 ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
        <div className="flex gap-3">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend(e)}
            placeholder="Type your question..."
            disabled={aiLoading}
            className={`flex-1 p-3 rounded-lg border-2 outline-none transition-all ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
                : "bg-gray-100 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500"
            } disabled:opacity-50`}
          />
          <button
            onClick={handleSend}
            disabled={aiLoading || !message.trim()}
            className="px-4 py-3 rounded-lg bg-orange-600 text-white font-semibold transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
      </>)}

    </div>
  );
}