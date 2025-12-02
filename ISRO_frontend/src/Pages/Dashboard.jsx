import React, { useState, useEffect, useContext } from "react";
import {
  Moon,
  Sun,
  MessageSquare,
  Plus,
  Rocket,
  Search,
  Trash2,
  Calendar,
  Satellite,
  Globe,
  Sparkles,
  ChevronDown,
  Zap,
  Shield,
  Database,
} from "lucide-react";
import StarField from "../Components/ui/StarField.jsx";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../Context/theme/Themecontext";
import { sessioncontext } from "../Context/session/sessioncontext.jsx";

const Dashboard = () => {
  const navigate = useNavigate();
  const { sessions, setSessions, activeSessionId, setActiveSessionId } =
    useContext(sessioncontext);

  // TEMP LOCAL chats (your teammate’s version)
  const [chats, setChats] = useState([
    {
      id: 1,
      title: "Urban Development Analysis",
      date: "2024-11-28",
      time: "14:30",
      preview:
        "Analyzed satellite imagery of urban sprawl in Mumbai region. Identified key infrastructure developments and building density patterns.",
      image: "satellite",
      tags: ["Urban", "Infrastructure"],
    },
    {
      id: 2,
      title: "Coastal Erosion Detection",
      date: "2024-11-27",
      time: "10:15",
      preview:
        "Detected changes in coastline patterns along Kerala coast. Measured erosion rates and identified vulnerable areas.",
      image: "coastal",
      tags: ["Coastal", "Erosion"],
    },
    {
      id: 3,
      title: "Agricultural Land Classification",
      date: "2024-11-26",
      time: "16:45",
      preview:
        "Classified agricultural lands in Punjab region. Identified crop types and estimated vegetation health indices.",
      image: "agriculture",
      tags: ["Agriculture", "NDVI"],
    },
    {
      id: 4,
      title: "Forest Cover Monitoring",
      date: "2024-11-25",
      time: "09:20",
      preview:
        "Monitored forest cover changes in Western Ghats. Detected deforestation patterns and biodiversity hotspots.",
      image: "forest",
      tags: ["Forest", "Conservation"],
    },
    {
      id: 5,
      title: "Water Body Detection",
      date: "2024-11-24",
      time: "11:30",
      preview:
        "Identified and mapped water bodies across Rajasthan. Tracked seasonal variations in reservoir levels.",
      image: "water",
      tags: ["Water", "Resources"],
    },
    {
      id: 6,
      title: "Disaster Assessment",
      date: "2024-11-23",
      time: "13:50",
      preview:
        "Post-disaster damage assessment of flood-affected areas. Quantified infrastructure damage and evacuation needs.",
      image: "disaster",
      tags: ["Disaster", "Emergency"],
    },
  ]);

  const { darkMode, toggleTheme } = useTheme();

  // FIXED: you were using sessions.filter instead of chats.filter
  const deleteChat = (id) => {
    setChats(chats.filter((chat) => chat.id !== id));
  };

  const openChat = (id) => {
    navigate(`/chat?id=${id}`);
  };

  const DashboardPage = () => (
    <div
      className={`relative flex flex-col min-h-screen h-auto overflow-y-auto transition-colors duration-500 ${
        darkMode ? "bg-gray-900" : "bg-gray-300"
      }`}
    >
      <div className="relative min-h-screen flex flex-col max-w-7xl mx-auto px-6 pb-20">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2
              className={`text-4xl font-extrabold tracking-tight ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Analysis History
            </h2>
            <p
              className={`mt-2 text-lg ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Explore and revisit your satellite imagery analysis sessions
            </p>
          </div>

          <button
            onClick={() => navigate("/chat")}
            className="group relative flex items-center gap-2 px-6 py-4 font-semibold rounded-xl bg-orange-500 text-white shadow-lg hover:bg-orange-600 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 active:shadow-md transition-all duration-200 overflow-hidden"
          >
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />

            <Plus className="w-5 h-5 relative z-10" />
            <span className="relative z-10">New Analysis</span>
          </button>
        </div>

        {/* SEARCH + FILTER */}
        <div className="mb-10 flex flex-col sm:flex-row gap-4">
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
              className={`w-full pl-12 pr-4 py-4 rounded-xl text-base transition-all ${
                darkMode
                  ? "bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:border-orange-500"
                  : "bg-white text-gray-900 placeholder-gray-500 border border-gray-200 focus:border-orange-400"
              } outline-none shadow-md`}
            />
          </div>

          {/* Category Filter */}
          <select
            className={`px-4 py-4 rounded-xl appearance-none text-base font-medium transition-all cursor-pointer shadow-md ${
              darkMode
                ? "bg-gray-800 text-white border border-gray-700 focus:border-blue-500"
                : "bg-white text-gray-900 border border-gray-200 focus:border-blue-400"
            }`}
          >
            <option>All Categories</option>
            <option>Urban</option>
            <option>Agriculture</option>
            <option>Coastal</option>
            <option>Forest</option>
          </select>
        </div>

        {/* GRID OF ANALYSIS CARDS */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {chats.map((chat) => (
            <div
              key={chat.id}
              className={`group relative p-6 rounded-2xl transition-all duration-300 cursor-pointer ${
                darkMode
                  ? "bg-gray-800 border border-gray-700 hover:border-orange-500/40"
                  : "bg-white border border-gray-200 hover:border-orange-300"
              } shadow-xl hover:shadow-2xl transform hover:-translate-y-2`}
              onClick={() => openChat(chat.id)}
            >
              {/* CARD HEADER */}
              <div className="flex items-start justify-between mb-5">
                <div
                  className={`p-3 rounded-xl shadow-inner ${
                    darkMode
                      ? "bg-gradient-to-br from-orange-600/20 to-blue-600/20"
                      : "bg-gradient-to-br from-orange-100 to-blue-100"
                  }`}
                >
                  <Satellite
                    className={`w-6 h-6 ${
                      darkMode ? "text-orange-400" : "text-orange-600"
                    }`}
                  />
                </div>

                {/* MERGED DELETE BUTTON */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteChat(chat.id);
                  }}
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
                className={`text-xl font-bold mb-3 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                {chat.title}
              </h3>

              {/* PREVIEW */}
              <p
                className={`text-sm mb-4 line-clamp-3 ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {chat.preview}
              </p>

              {/* TAGS */}
              <div className="flex flex-wrap gap-2 mb-5">
                {chat.tags.map((tag, idx) => (
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
                      darkMode ? "text-gray-500" : "text-gray-500"
                    }`}
                  >
                    {chat.date}
                  </span>
                </div>
                <span
                  className={`text-sm font-medium ${
                    darkMode ? "text-gray-500" : "text-gray-500"
                  }`}
                >
                  {chat.time}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* EMPTY STATE */}
        {chats.length === 0 && (
          <div
            className={`text-center py-24 ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            <Satellite className="w-20 h-20 mx-auto mb-6 opacity-40" />
            <h3 className="text-3xl font-bold mb-3">No analyses yet</h3>
            <p className="text-lg mb-6">
              Start your first satellite imagery analysis
            </p>

            <button
              onClick={() => navigate("/chat")}
              className={`px-8 py-4 text-lg font-semibold rounded-xl transition-all shadow-xl ${
                darkMode
                  ? "bg-gradient-to-r from-orange-600 to-blue-600 hover:from-orange-700 hover:to-blue-700"
                  : "bg-gradient-to-r from-orange-500 to-blue-500 hover:from-orange-600 hover:to-blue-600"
              } text-white transform hover:scale-105`}
            >
              Start Analysis
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      <StarField />
      <DashboardPage />
    </>
  );
};

export default Dashboard;
