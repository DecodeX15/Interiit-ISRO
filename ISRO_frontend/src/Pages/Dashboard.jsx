import React, { useState, useEffect, useContext } from "react";
import {
  Plus,
  Search,
  Trash2,
  Calendar,
  Satellite,
  ClockFading,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../Context/theme/Themecontext";
import { sessioncontext } from "../Context/session/sessioncontext.jsx";

const Dashboard = () => {
  const navigate = useNavigate();
  const { sessions, setSessions, activeSessionId, setActiveSessionId } =
    useContext(sessioncontext);

  const { darkMode } = useTheme();

  // State for search and filter
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [loading, setLoading] = useState(true);

  // Simulate loading from localStorage for 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Function to handle chat click - navigate to chat with sessionId
  const handleChatClick = (sessionId) => {
    setActiveSessionId(sessionId);
    navigate(`/chat`);
  };

  // Function to handle delete
  const handleDelete = (sessionId, e) => {
    e.stopPropagation();
    // Remove session from the sessions array
    const updatedSessions = sessions.filter(
      (session) => session.sessionId !== sessionId
    );
    setSessions(updatedSessions);

    // If we're deleting the active session, clear activeSessionId
    if (activeSessionId === sessionId) {
      setActiveSessionId(null);
    }
  };

  // Format timestamp to readable date and time
  const formatTimestamp = (timestamp) => {
    if (!timestamp) return { date: "", time: "" };
    const date = new Date(Number(timestamp));
    return {
      date: date.toLocaleDateString("en-GB"), // DD/MM/YYYY format
      time: date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
  };

  // Filter sessions based on search and category
  const filteredSessions = sessions.filter((session) => {
    const matchesSearch =
      searchQuery === "" ||
      session.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.messages?.some((msg) =>
        msg.text?.toLowerCase().includes(searchQuery.toLowerCase())
      );

    // Category filter
    const matchesCategory =
      selectedCategory === "All Categories" ||
      (session.tags && session.tags.includes(selectedCategory));

    return matchesSearch && matchesCategory;
  });
  console.log("aefoin")
  console.log(filteredSessions);
  // Extract tags from session
  const getSessionTags = (session) => {
    if (session.tags && Array.isArray(session.tags)) {
      return session.tags;
    }

    const defaultTags = ["Analysis", "Satellite"];
    const messageText = session.messages?.[0]?.text || "";

    if (
      messageText.toLowerCase().includes("urban") ||
      messageText.toLowerCase().includes("city")
    ) {
      return ["Urban", ...defaultTags];
    }
    if (
      messageText.toLowerCase().includes("agriculture") ||
      messageText.toLowerCase().includes("crop")
    ) {
      return ["Agriculture", ...defaultTags];
    }
    if (
      messageText.toLowerCase().includes("coastal") ||
      messageText.toLowerCase().includes("coast")
    ) {
      return ["Coastal", ...defaultTags];
    }
    if (
      messageText.toLowerCase().includes("forest") ||
      messageText.toLowerCase().includes("tree")
    ) {
      return ["Forest", ...defaultTags];
    }

    return defaultTags;
  };

  // Skeleton Loader Component
  const SkeletonCard = () => (
    <div
      className={`p-6 rounded-2xl ${
        darkMode ? "bg-gray-800" : "bg-gray-100"
      } animate-pulse`}
    >
      <div className="flex items-start justify-between mb-5">
        <div
          className={`p-3 rounded-xl ${
            darkMode ? "bg-gray-700" : "bg-gray-300"
          }`}
        >
          <div className="w-6 h-6 rounded-full"></div>
        </div>
        <div className="p-2 rounded-lg">
          <div className="w-5 h-5"></div>
        </div>
      </div>

      <div className="mb-3">
        <div
          className={`h-6 rounded-lg ${
            darkMode ? "bg-gray-700" : "bg-gray-300"
          } w-3/4`}
        ></div>
      </div>

      <div className="mb-4">
        <div
          className={`h-4 rounded-lg ${
            darkMode ? "bg-gray-700" : "bg-gray-300"
          } w-full mb-2`}
        ></div>
        <div
          className={`h-4 rounded-lg ${
            darkMode ? "bg-gray-700" : "bg-gray-300"
          } w-2/3`}
        ></div>
      </div>

      <div className="flex flex-wrap gap-2 mb-5">
        <div
          className={`px-3 py-1 rounded-full ${
            darkMode ? "bg-gray-700" : "bg-gray-300"
          } w-16 h-6`}
        ></div>
        <div
          className={`px-3 py-1 rounded-full ${
            darkMode ? "bg-gray-700" : "bg-gray-300"
          } w-20 h-6`}
        ></div>
      </div>

      <div
        className={`flex items-center justify-between pt-4 border-t ${
          darkMode ? "border-gray-700" : "border-gray-300"
        }`}
      >
        <div className="flex items-center gap-2">
          <div
            className={`w-4 h-4 rounded ${
              darkMode ? "bg-gray-700" : "bg-gray-300"
            }`}
          ></div>
          <div
            className={`h-4 rounded-lg ${
              darkMode ? "bg-gray-700" : "bg-gray-300"
            } w-24`}
          ></div>
        </div>
        <div
          className={`h-4 rounded-lg ${
            darkMode ? "bg-gray-700" : "bg-gray-300"
          } w-12`}
        ></div>
      </div>
    </div>
  );

  return (
    <div
      className={`relative min-h-screen transition-colors duration-500 ${
        darkMode ? "bg-gray-900" : "bg-gray-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1
              className={`text-3xl sm:text-4xl font-bold ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Analysis History
            </h1>
            <p
              className={`mt-2 text-base sm:text-lg ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Explore and revisit your satellite imagery analysis sessions
            </p>
          </div>

          <button
            onClick={() => {
              setActiveSessionId(null);
              navigate("/chat");
            }}
            className={`px-4 py-3 cursor-pointer text-sm transition-all rounded-xl shadow-md font-semibold flex items-center justify-center gap-2 hover:scale-105 active:scale-95 w-full sm:w-auto ${
              darkMode
                ? "bg-orange-600/20 text-orange-400 hover:bg-orange-600/30 border border-orange-600/30"
                : "bg-orange-100 text-orange-700 hover:bg-orange-200 border border-orange-200"
            }`}
          >
            <Plus className="w-5 h-5" />
            <span>New Analysis</span>
          </button>
        </div>

        {/* SEARCH + FILTER */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          {/* Search Bar */}
          <div className="flex-1 relative">
            <Search
              className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            />
            <input
              type="text"
              placeholder="Search analyses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-12 pr-4 py-3 rounded-xl text-base transition-all ${
                darkMode
                  ? "bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                  : "bg-white text-gray-900 placeholder-gray-500 border border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20"
              } outline-none shadow-sm`}
            />
          </div>

          {/* Category Filter */}
          <div className="relative w-full sm:w-auto ">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className={`w-full px-8 py-3 rounded-xl appearance-none text-base font-medium transition-all cursor-pointer shadow-sm ${
                darkMode
                  ? "bg-gray-800  text-white border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  : "bg-white text-gray-900 border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
              } outline-none`}
            >
              <option>All Categories</option>
              <option>Urban</option>
              <option>Agriculture</option>
              <option>Coastal</option>
              <option>Forest</option>
              <option>Water</option>
              <option>Disaster</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* GRID OF ANALYSIS CARDS OR SKELETONS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading
            ? // Show 6 skeleton loaders
              Array.from({ length: sessions?.length }).map((_, index) => (
                <SkeletonCard key={`skeleton-${index}`} />
              ))
            : // Show actual sessions
              filteredSessions.map((session) => {
                const { date, time } = formatTimestamp(
                  session.createdAt || session.updatedAt
                );
                const tags = getSessionTags(session);
                const preview =
                  session.messages?.[0]?.content||
                  session.draftText ||
                  "No messages yet";
                  console.log("sdoinv"+preview);
                return (
                  <div
                    key={session.sessionId}
                    className={`group relative p-6 rounded-2xl transition-all duration-300 cursor-pointer ${
                      darkMode
                        ? "bg-gray-800 border border-gray-700 hover:border-orange-500/40 hover:shadow-lg hover:shadow-orange-500/10"
                        : "bg-white border border-gray-200 hover:border-orange-300 hover:shadow-lg"
                    } shadow-sm hover:shadow-xl hover:-translate-y-1`}
                    onClick={() => handleChatClick(session)}
                  >
                    {/* CARD HEADER */}
                    <div className="flex items-start justify-between mb-6">
                      {/* DELETE BUTTON */}
                      <button
                        onClick={(e) => handleDelete(session.sessionId, e)}
                        className={`opacity-0 group-hover:opacity-100 p-2 rounded-lg transition-all ${
                          darkMode
                            ? "hover:bg-red-900/30 text-red-400"
                            : "hover:bg-red-50 text-red-500"
                        }`}
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>

                    {/* TITLE */}
                    <h3
                      className={`text-xl font-bold mb-3 line-clamp-1 ${
                        darkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {session.name ||
                        `Analysis ${session.sessionId?.slice(0, 8) || "New"}`}
                    </h3>

                    {/* PREVIEW */}
                    <p
                      className={`text-sm mb-4 line-clamp-3 ${
                        darkMode ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      {preview}
                    </p>

                    {/* TAGS */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            darkMode
                              ? "bg-blue-600/20 text-blue-300 border border-blue-500/30"
                              : "bg-blue-100 text-blue-700 border border-blue-200"
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                      {session.unreadCount > 0 && (
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            darkMode
                              ? "bg-red-600/20 text-red-300 border border-red-500/30"
                              : "bg-red-100 text-red-700 border border-red-200"
                          }`}
                        >
                          {session.unreadCount} new
                        </span>
                      )}
                    </div>

                    {/* FOOTER */}
                    <div
                      className={`flex items-center justify-between pt-4 border-t ${
                        darkMode ? "border-gray-700" : "border-gray-200"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Calendar
                          className={`w-4 h-4 ${
                            darkMode ? "text-gray-500" : "text-gray-400"
                          }`}
                        />
                        <span
                          className={`text-sm ${
                            darkMode ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          {date || "Date not available"}
                        </span>
                      </div>
                      <span
                        className={`text-sm font-medium ${
                          darkMode ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        {time || "Time not available"}
                      </span>
                    </div>
                  </div>
                );
              })}
        </div>

        {/* EMPTY STATE */}
        {!loading && filteredSessions.length === 0 && (
          <div
            className={`text-center py-16 rounded-2xl ${
              darkMode ? "bg-gray-800/50" : "bg-white/50"
            }`}
          >
            <Satellite className="w-16 h-16 mx-auto mb-4 opacity-40" />
            <h3
              className={`text-2xl font-bold mb-2 ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              {sessions.length === 0
                ? "No analyses yet"
                : "No matching analyses"}
            </h3>
            <p
              className={`text-lg mb-6 ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {sessions.length === 0
                ? "Start your first satellite imagery analysis"
                : "Try a different search or category"}
            </p>

            <button
              onClick={() => {
                setActiveSessionId(null);
                navigate("/chat");
              }}
              className={`px-6 py-3 text-base font-semibold rounded-xl transition-all ${
                darkMode
                  ? "bg-gradient-to-r from-orange-600 to-blue-600 hover:from-orange-700 hover:to-blue-700"
                  : "bg-gradient-to-r from-orange-500 to-blue-500 hover:from-orange-600 hover:to-blue-600"
              } text-white hover:shadow-lg`}
            >
              Start Analysis
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
