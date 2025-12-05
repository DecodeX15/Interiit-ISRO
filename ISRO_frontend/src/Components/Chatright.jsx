import { useContext, useRef, useState, useEffect } from "react";
import { useTheme } from "../Context/theme/Themecontext.jsx";
import { sessioncontext } from "../Context/session/sessioncontext.jsx";
import { v4 as uuid } from "uuid";
import handlemodelresponse from "./apicaller.js";
import { MessageSquare,Brain, Upload as UploadIcon } from "lucide-react";
import { ShinyButton } from "./ui/shiny-button.jsx";
import ChatInput from "./ui/chat-input.jsx";
function createMessage(role, content) {
  return {
    id: uuid(),
    role,
    content,
    createdAt: Date.now(),
  };
}

export default function Chatright({ setBoundingBoxes }) {
  const { darkMode } = useTheme();
  const { sessions, setSessions, activeSessionId, setActiveSessionId } =
    useContext(sessioncontext);
const [queryType, setQueryType] = useState("Captioning");
  const [message, setMessage] = useState("");
  const textareaRef = useRef(null);
  const [aiLoading, setAiLoading] = useState(false);

  const scrollContainerRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [activeSessionId?.messages]);

  // Reset input/loading when switching chats
  useEffect(() => {
    setMessage("");
    setAiLoading(false);
  }, [activeSessionId?.sessionId]);

  const handleSend = async (e,message,queryType) => {
    try {
      if (e) e.preventDefault();
      if (!message.trim()) return;
      if (!activeSessionId) return alert("Select a chat first!");
      if (aiLoading) return;

      const targetSessionId = activeSessionId.sessionId;
      const targetImageURL = activeSessionId.publicImageURL;

      const userMessage = createMessage("user", message);

      // 1) Add user message to the correct session
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
      localStorage.setItem(
        "GeoNLI_Sessions",
        JSON.stringify(updatedUserSessions)
      );

      // Update active session if user is still in the same chat
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
        queryType,
        message,
        targetSessionId,
        targetImageURL
      );
      console.log(res);
      const answer = res.answer;
      const boxesArray = res.boxesArray;
      console.log(answer)
      
      const aiMessage = createMessage("ai", answer);
      if (boxesArray && boxesArray.length > 0) {
        setBoundingBoxes(boxesArray);
      }
        

      // 2) Add AI message to session
      const updatedAISessions = updatedUserSessions.map((s) => {
        if (s.sessionId === targetSessionId) {
          return {
            ...s,
            messages: [...s.messages, aiMessage],
          };
        }
        return s;
      });

      setSessions(updatedAISessions);
      localStorage.setItem(
        "GeoNLI_Sessions",
        JSON.stringify(updatedAISessions)
      );

      // Update active session
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

  // Auto-expand textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 160) + "px"; // max 160px
    }
  }, [message]);

  return (
    <div
      className={`flex flex-col h-full transition-colors ${
        darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"
      }`}
    >
      {/* NO CHAT SELECTED */}
      {!activeSessionId ? (
        <div className="flex-1 flex flex-col items-center justify-center p-8">
          <div
            className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 ${
              darkMode ? "bg-gray-800" : "bg-gray-200"
            }`}
          >
            <MessageSquare
              className={`w-10 h-10 ${
                darkMode ? "text-gray-600" : "text-gray-400"
              }`}
            />
          </div>
          <p
            className={`text-lg font-medium mb-2 ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            No Chat Selected
          </p>
          <p
            className={`text-sm text-center ${
              darkMode ? "text-gray-500" : "text-gray-500"
            }`}
          >
            Select or create a chat to start analyzing
          </p>
        </div>
      ) : !activeSessionId.publicImageURL ? (
        /* IMAGE NOT UPLOADED */
        <div className="flex-1 flex flex-col items-center justify-center p-8">
          <div
            className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 ${
              darkMode ? "bg-gray-800" : "bg-gray-200"
            }`}
          >
            <UploadIcon
              className={`w-10 h-10 ${
                darkMode ? "text-gray-600" : "text-gray-400"
              }`}
            />
          </div>
          <p
            className={`text-lg font-medium mb-2 ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            No Image Uploaded
          </p>
          <p
            className={`text-sm text-center ${
              darkMode ? "text-gray-500" : "text-gray-500"
            }`}
          >
            Upload a satellite image to begin analysis
          </p>
        </div>
      ) : (
        /* MAIN CHAT INTERFACE */
        <>
          {/* Header */}
          <div
            className={`px-6 py-4 border-b shrink-0 ${
              darkMode
                ? "border-gray-800 bg-gray-800/50"
                : "border-gray-200 bg-gray-50"
            }`}
          >
            <h2
              className={`flex justify-between text-lg font-bold ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Chat Analysis
            <span>
              <Brain className="w-8 h-8 text-blue-500" />
            </span>
            </h2>
            <p
              className={`text-sm mt-1 ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Ask questions about the satellite imagery
            </p>
          </div>

          {/* Messages Container */}
          <div
            ref={scrollContainerRef}
            className="flex-1 overflow-y-auto p-6 space-y-4 min-h-0"
          >
            {activeSessionId?.messages?.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                      darkMode ? "bg-gray-800" : "bg-gray-200"
                    }`}
                  >
                    <MessageSquare
                      className={`w-8 h-8 ${
                        darkMode ? "text-gray-600" : "text-gray-400"
                      }`}
                    />
                  </div>
                  <p
                    className={`font-medium mb-2 ${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Start the conversation
                  </p>
                  <p
                    className={`text-sm ${
                      darkMode ? "text-gray-600" : "text-gray-500"
                    }`}
                  >
                    Type a question below to analyze the image
                  </p>
                </div>
              </div>
            ) : (
              activeSessionId?.messages?.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  } animate-fadeInUp`}
                >
                  <div
                    className={`max-w-[75%] px-4 py-3 rounded-2xl shadow-md transition-all ${
                      msg.role === "user"
                        ? "bg-blue-600 text-white rounded-br-sm"
                        : darkMode
                        ? "bg-gray-800 text-gray-100 rounded-bl-sm border border-gray-700"
                        : "bg-gray-100 text-gray-900 rounded-bl-sm border border-gray-200"
                    }`}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-wrap wrap-break-word">
                      {msg.content}
                    </p>
                    <p
                      className={`text-xs mt-2 ${
                        msg.role === "user"
                          ? "text-white/70"
                          : darkMode
                          ? "text-gray-500"
                          : "text-gray-500"
                      }`}
                    >
                      {new Date(msg.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              ))
            )}

            {/* AI Loading Animation */}
            {aiLoading && (
              <>
                <div className="flex justify-start animate-fadeInUp items-center">
                  <div
                    className={`px-5 py-4 rounded-2xl rounded-bl-sm border shadow-md ${
                      darkMode
                        ? "bg-gray-800 border-gray-700"
                        : "bg-gray-100 border-gray-200"
                    }`}
                  >
                    <div className="flex gap-2 items-center">
                      <div
                        className={`w-2 h-2 rounded-full animate-bounce ${
                          darkMode ? "bg-orange-400" : "bg-orange-600"
                        }`}
                        style={{ animationDelay: "0ms" }}
                      />
                      <div
                        className={`w-2 h-2 rounded-full animate-bounce ${
                          darkMode ? "bg-blue-400" : "bg-blue-600"
                        }`}
                        style={{ animationDelay: "150ms" }}
                      />
                      <div
                        className={`w-2 h-2 rounded-full animate-bounce ${
                          darkMode ? "bg-orange-400" : "bg-orange-600"
                        }`}
                        style={{ animationDelay: "300ms" }}
                      />
                    </div>
                  </div>
                </div>
                <ShinyButton>Thinking......</ShinyButton>
              </>
            )}
            <div ref={bottomRef} />
          </div>


          <ChatInput
            queryType={queryType}
            onSend={handleSend}
            disabled={aiLoading}
            placeholder="Ask a question about the image..."
          />
        </>
      )}
    </div>
  );
}
