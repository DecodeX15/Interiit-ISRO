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
import StarField from "..//Components/ui/StarField.jsx";
import { sessioncontext } from "../Context/session/sessioncontext.jsx";
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
  const [darkMode, setDarkMode] = useState(true);

  const { sessions, setSessions, activeSessionId, setActiveSessionId } =
    useContext(sessioncontext);
  const [isVisible, setIsVisible] = useState(false);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const deleteChat = (id) => {
    setChats(sessions.filter((chat) => chat.id !== id));
  };
  const navigate = useNavigate();
  const handleclick = (currentactivesession) => {
    console.log(currentactivesession);
    setActiveSessionId(currentactivesession);
    navigate("/chat");
  };
  // Dashboard Page Component
  const DashboardPage = () => (
    <div
      className={`min-h-screen max-h-screen overflow-y-auto ${
        darkMode ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      {/* User Info Section */}
      <div
        className={`border-b ${
          darkMode
            ? "bg-gray-800/50 border-gray-700"
            : "bg-white border-gray-200"
        } backdrop-blur-lg`}
      >
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              {/* User Avatar */}
              <div
                className={`w-20 h-20 rounded-2xl flex items-center justify-center text-3xl font-bold ${
                  darkMode
                    ? "bg-gradient-to-br from-orange-600 to-blue-600"
                    : "bg-gradient-to-br from-orange-500 to-blue-500"
                } text-white shadow-lg`}
              >
                AK
              </div>

              {/* User Details */}
              <div>
                <h1
                  className={`text-3xl font-bold ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Arjun Kumar
                </h1>
                <p
                  className={`text-lg ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  } flex items-center gap-2 mt-1`}
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                  </svg>
                  arjun.kumar@isro.gov.in
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="flex gap-6">
              <div
                className={`text-center px-6 py-3 rounded-xl ${
                  darkMode ? "bg-gray-700/50" : "bg-gray-100"
                }`}
              >
                <p
                  className={`text-3xl font-bold ${
                    darkMode ? "text-orange-400" : "text-orange-600"
                  }`}
                >
                  {sessions.length}
                </p>
                <p
                  className={`text-sm ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Total Analyses
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chat History Section */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2
              className={`text-3xl font-bold ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Analysis History
            </h2>
            <p
              className={`mt-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}
            >
              Your satellite imagery analysis sessions
            </p>
          </div>

          <button
            onClick={() => (window.location.href = "/chat")}
            className={`flex items-center gap-2 px-6 py-3 font-semibold rounded-xl transition-all duration-300 ${
              darkMode
                ? "bg-gradient-to-r from-orange-600 to-blue-600 hover:from-orange-700 hover:to-blue-700"
                : "bg-gradient-to-r from-orange-500 to-blue-500 hover:from-orange-600 hover:to-blue-600"
            } text-white shadow-lg hover:shadow-xl transform hover:scale-105`}
          >
            <Plus className="w-5 h-5" />
            New Analysis
          </button>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search
              className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            />
            <input
              type="text"
              placeholder="Search analyses..."
              className={`w-full pl-12 pr-4 py-3.5 rounded-xl text-base transition-all ${
                darkMode
                  ? "bg-gray-800 text-white placeholder-gray-400 border-2 border-gray-700 focus:border-orange-500"
                  : "bg-white text-gray-900 placeholder-gray-500 border-2 border-gray-200 focus:border-orange-400"
              } outline-none`}
            />
          </div>

          <select
            className={`px-4 appearance-none py-3.5 rounded-xl text-base font-medium transition-all ${
              darkMode
                ? "bg-gray-800 text-white border-2 border-gray-700 focus:border-blue-500"
                : "bg-white text-gray-900 border-2 border-gray-200 focus:border-blue-400"
            } outline-none cursor-pointer`}
          >
            <option>All Categories</option>
            <option>Urban</option>
            <option>Agriculture</option>
            <option>Coastal</option>
            <option>Forest</option>
          </select>
        </div>

        {/* Chat Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sessions.map((chat) => (
            <div
              key={chat.id}
              onClick={() => {
                handleclick(chat);
              }}
              className={`group relative p-6 rounded-2xl transition-all duration-300 cursor-pointer ${
                darkMode
                  ? "bg-gray-800 hover:bg-gray-750 border-2 border-gray-700 hover:border-orange-500/50"
                  : "bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-orange-300"
              } shadow-lg hover:shadow-2xl transform hover:-translate-y-2`}
            >
              {/* Card Header */}
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`p-3 rounded-xl ${
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

                <button
                  className={`opacity-0 group-hover:opacity-100 p-2 rounded-lg transition-all ${
                    darkMode
                      ? "hover:bg-red-900/30 text-red-400"
                      : "hover:bg-red-50 text-red-500"
                  }`}
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>

              {/* Card Content */}
              <h3
                className={`text-xl font-bold mb-3 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                {chat.name}
              </h3>

              {/* Card Footer */}
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
                    {chat.createdAt}
                  </span>
                </div>
                <span
                  className={`text-sm font-medium ${
                    darkMode ? "text-gray-500" : "text-gray-500"
                  }`}
                >
                  {chat.updatedAt}
                </span>
              </div>

              {/* Hover Effect Gradient */}
              <div
                className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none ${
                  darkMode
                    ? "bg-gradient-to-br from-orange-600/5 to-blue-600/5"
                    : "bg-gradient-to-br from-orange-50/50 to-blue-50/50"
                }`}
              />
            </div>
          ))}
        </div>

        {/* Empty State */}
        {sessions.length === 0 && (
          <div
            className={`text-center py-20 ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            <Satellite className="w-20 h-20 mx-auto mb-6 opacity-30" />
            <h3 className="text-2xl font-bold mb-2">No analyses yet</h3>
            <p className="text-lg mb-6">
              Start your first satellite imagery analysis
            </p>
            <button
              onClick={() => setCurrentPage("home")}
              className={`px-8 py-4 font-semibold rounded-xl transition-all ${
                darkMode
                  ? "bg-gradient-to-r from-orange-600 to-blue-600 hover:from-orange-700 hover:to-blue-700"
                  : "bg-gradient-to-r from-orange-500 to-blue-500 hover:from-orange-600 hover:to-blue-600"
              } text-white shadow-lg`}
            >
              Get Started
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
