import React, { useState, useEffect } from "react";
import {
  Info,
  MessageSquare,
  Plus,
  Rocket,
  Satellite,
  Globe,
  Sparkles,
  ChevronDown,
  Zap,
  Shield,
  Database,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import StarField from "../Components/ui/StarField.jsx";
import { TypingAnimation } from "../Components/ui/typing-animation.jsx";
import { useTheme } from "../Context/theme/Themecontext";
import TextType from "../Components/ui/TextType.jsx";
import StyleSlider from "../Components/Style_slider.jsx";
import {
  AnimatedList,
  AnimatedListItem,
} from "../Components/ui/animated-list.jsx";
import { LayoutTextFlipDemo } from "../Components/LayoutTextFlipDemo.jsx";
import { motion } from "framer-motion";
function Home() {
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const { darkMode, toggleTheme } = useTheme();
  useEffect(() => {
    setIsVisible(true);
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const FloatingElement = ({ children, delay = 0, duration = 0 }) => (
    <div
      style={{
        animation: ` ${duration}s ease-in-out ${delay}s infinite`,
      }}
    >
      {children}
    </div>
  );

  return (
    <>
      <div
        className={`flex flex-col z-1
    min-h-screen
    h-auto
    overflow-y-auto
    scrollbar-hide transition-colors duration-500  ${
      darkMode ? "bg-gray-900" : "bg-gray-300"
    }`}
      >
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-visible px-6 ">
          {/* <StarField /> */}
          <div className="relative z-10 max-w-5xl w-full text-center space-y-8">
            {/* Main Heading */}
            <div
              className={`space-y-6 ${
                isVisible ? "animate-fadeInUp" : "opacity-0"
              }`}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/20 backdrop-blur-sm border border-blue-500/30">
                <Sparkles className="w-4 h-4 text-blue-400" />
                <span
                  className={`text-sm font-medium ${
                    darkMode ? "text-blue-300" : "text-blue-700"
                  }`}
                >
                  Built for the Inter IIT Tech Meet 14.0
                </span>
              </div>

              <h1
                className={`text-5xl md:text-7xl font-bold leading-tight ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                <LayoutTextFlipDemo />
                <span className="block mt-2 text-orange-500">
                  {/* <TypingAnimation>
                a Thousand Words
            </TypingAnimation> */}
                  <TextType
                    text={"a Thousand Words"}
                    typingSpeed={100}
                    startOnVisible={true}
                    pauseDuration={200000}
                    showCursor={false}
                    cursorCharacter="|"
                  />
                </span>
              </h1>

              <p
                className={`text-xl md:text-2xl max-w-3xl mx-auto ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Talk to satellite images like you're chatting with an expert
              </p>
            </div>

            {/* CTA Buttons */}
            <div
              className={`flex flex-col sm:flex-row items-center justify-center gap-4 ${
                isVisible ? "animate-fadeInUp" : "opacity-0"
              }`}
              style={{ animationDelay: "0.2s" }}
            >
              <button
                onClick={() => navigate("/dashboard")}
                className={`group relative px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 bg-blue-700 hover:bg-orange-700
           text-white shadow-lg hover:shadow-2xl transform hover:scale-105  cursor-pointer
          
             `}
              >
                <span className="flex items-center gap-2">
                  <Rocket className="w-5 h-5" />
                  Get Started
                </span>
                <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
              </button>
            </div>
          </div>
        </section>
        {/* Features Section */}
        <StyleSlider />
        <section
          className={`relative py-20 px-6 ${
            darkMode ? "bg-gray-900/50" : "bg-white/50"
          } backdrop-blur-sm`}
        >
          <div className="z-1">
            <div className="text-center mb-16">
              <h2
                className={`text-4xl md:text-5xl font-bold mb-4 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Mission-Ready Features
              </h2>
              <p
                className={`text-xl ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Built to Simplify Access to Earth Observation Data
              </p>
            </div>
            {/* <div className=""> */}
            <div className="grid md:grid-cols-1 gap-20">
              {/* FEATURE 1 */}
              <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.55, ease: "easeOut" }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.01 }}
                className={`
      group  rounded-3xl p-8 relative overflow-hidden mx-auto max-w-7xl
      ${darkMode ? "bg-[#0E1525]" : "bg-white"}
      border border-white/10 shadow-xl
    `}
              >
                {/* HOVER GLOW AURA */}
                <motion.div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-blue-600/30 blur-3xl opacity-0 group-hover:opacity-70 transition-all duration-700" />

                <div className="grid md:grid-cols-2 gap-10 items-center">
                  {/* TEXT LEFT — STRONG SLIDE */}
                  <motion.div
                    initial={{ opacity: 0, x: -120 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    viewport={{ once: true }}
                  >
                    <div
                      className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 shadow-md
            ${darkMode ? "bg-blue-600" : "bg-blue-500"}`}
                    >
                      <Info className="w-7 h-7 text-white" />
                    </div>

                    <h3
                      className={`text-3xl font-bold mb-2 ${
                        darkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      Precise Satellite{" "}
                      <span className="text-blue-400">Captioning</span>
                    </h3>

                    <p
                      className={`${
                        darkMode ? "text-gray-300" : "text-gray-700"
                      } text-base leading-relaxed`}
                    >
                      Get concise, accurate descriptions summarizing both global
                      and local attributes.
                    </p>

                    <div className="mt-6">
                      <button
                        className={`px-4 py-2 rounded-xl text-sm font-medium shadow-md
              ${
                darkMode
                  ? "bg-blue-900/40 text-blue-300"
                  : "bg-blue-100 text-blue-700"
              }
            `}
                      >
                        Real-time processing
                      </button>
                    </div>
                  </motion.div>

                  {/* IMAGE RIGHT — SMOOTH SLIDE */}
                  <motion.div
                    initial={{ opacity: 0, x: 120 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.03 }}
                    className="rounded-3xl shadow-xl overflow-hidden"
                  >
                    <img
                      src="https://images.pexels.com/photos/346885/pexels-photo-346885."
                      className="rounded-2xl w-full h-full object-cover"
                    />
                  </motion.div>
                </div>
              </motion.div>
              {/* FEATURE 2 */}
              <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.55, ease: "easeOut" }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.01 }}
                className={`
      group p-8 rounded-3xl relative overflow-hidden mx-auto max-w-7xl
      ${darkMode ? "bg-[#0E1525]" : "bg-white"}
      border border-white/10 shadow-xl
    `}
              >
                {/* hover glow */}
                <motion.div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-purple-600/30 blur-3xl opacity-0 group-hover:opacity-70 transition-all duration-700" />

                <div className="grid md:grid-cols-2 gap-10 items-center">
                  {/* IMAGE LEFT */}
                  <motion.div
                    initial={{ opacity: 0, x: -120 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.03 }}
                    className="rounded-3xl shadow-xl overflow-hidden"
                  >
                    <img
                      src="https://images.pexels.com/photos/695299/pexels-photo-695299.jpeg"
                      className="rounded-2xl w-full h-full object-cover"
                    />
                  </motion.div>

                  {/* TEXT RIGHT */}
                  <motion.div
                    initial={{ opacity: 0, x: 120 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    viewport={{ once: true }}
                  >
                    <div
                      className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 shadow-md
            ${darkMode ? "bg-purple-600" : "bg-purple-500"}`}
                    >
                      <Globe className="w-7 h-7 text-white" />
                    </div>

                    <h3
                      className={`text-3xl font-bold mb-2 ${
                        darkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      Visual Object{" "}
                      <span className="text-purple-400">Grounding</span>
                    </h3>

                    <p
                      className={`${
                        darkMode ? "text-gray-300" : "text-gray-700"
                      } text-base leading-relaxed`}
                    >
                      Accurate localization of objects under noisy or dynamic
                      conditions.
                    </p>
                  </motion.div>
                </div>
              </motion.div>
              {/* FEATURE 3 */}
              <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.55, ease: "easeOut" }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.01 }}
                className={`
      group p-8 rounded-3xl relative overflow-hidden mx-auto max-w-7xl
      ${darkMode ? "bg-[#0E1525]" : "bg-white"}
      border border-white/10 shadow-xl
    `}
              >
                {/* glow */}
                <motion.div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-pink-600/30 blur-3xl opacity-0 group-hover:opacity-70 transition-all duration-700" />

                <div className="grid md:grid-cols-2 gap-10 items-center">
                  {/* TEXT LEFT */}
                  <motion.div
                    initial={{ opacity: 0, x: -120 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    viewport={{ once: true }}
                  >
                    <div
                      className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 shadow-md
            ${darkMode ? "bg-pink-600" : "bg-pink-500"}`}
                    >
                      <MessageSquare className="w-7 h-7 text-white" />
                    </div>

                    <h3
                      className={`text-3xl font-bold mb-2 ${
                        darkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      Geospatial <span className="text-pink-400">VQA</span>
                    </h3>

                    <p
                      className={`${
                        darkMode ? "text-gray-300" : "text-gray-700"
                      } text-base leading-relaxed`}
                    >
                      Answer complex semantic, numeric & binary queries from
                      satellite images.
                    </p>
                  </motion.div>

                  {/* IMAGE RIGHT */}
                  <motion.div
                    initial={{ opacity: 0, x: 120 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.03 }}
                    className="rounded-3xl shadow-xl overflow-hidden"
                  >
                    <img
                      src="https://images.pexels.com/photos/695299/pexels-photo-695299.jpeg"
                      className="rounded-2xl w-full h-full object-cover"
                    />
                  </motion.div>
                </div>
              </motion.div>
            </div>
            {/* </div> */}
          </div>
        </section>
      </div>
    </>
  );
}

export default Home;
