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
import { AnimatedList, AnimatedListItem } from "../Components/ui/animated-list.jsx";
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
                A picture worth
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
                  <AnimatedList className="grid md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <FloatingElement delay={0}>
                <div
                  className={`group p-8 rounded-3xl transition-all duration-300 ${
                    darkMode
                      ? "bg-linear-to-br from-gray-800 to-gray-900 hover:from-blue-900/50 hover:to-gray-900"
                      : "bg-linear-to-br from-white to-gray-50 hover:from-blue-50 hover:to-white"
                  } border-2 ${
                    darkMode
                      ? "border-gray-700 hover:border-blue-500"
                      : "border-gray-200 hover:border-blue-300"
                  } shadow-xl transform hover:scale-105 hover:-translate-y-2`}
                >
                  <div
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${
                      darkMode ? "bg-blue-600" : "bg-blue-500"
                    } shadow-lg group-hover:shadow-2xl transition-shadow`}
                  >
                    <Info className="w-8 h-8 text-white" />
                  </div>
                  <h3
                    className={`text-2xl font-bold mb-4 ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    Precise Satellite Captioning
                  </h3>
                  <p
                    className={`${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    } leading-relaxed`}
                  >
                    Get a concise, accurate description summarizing the local
                    and global attributes of small and large objects in the
                    satellite image.
                  </p>
                </div>
              </FloatingElement>

              {/* Feature 2 */}
              <FloatingElement delay={0.2} duration={3.5}>
                <div
                  className={`group p-8 rounded-3xl transition-all duration-300 ${
                    darkMode
                      ? "bg-linear-to-br from-gray-800 to-gray-900 hover:from-purple-900/50 hover:to-gray-900"
                      : "bg-linear-to-br from-white to-gray-50 hover:from-purple-50 hover:to-white"
                  } border-2 ${
                    darkMode
                      ? "border-gray-700 hover:border-purple-500"
                      : "border-gray-200 hover:border-purple-300"
                  } shadow-xl transform hover:scale-105 hover:-translate-y-2`}
                >
                  <div
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${
                      darkMode ? "bg-purple-600" : "bg-purple-500"
                    } shadow-lg group-hover:shadow-2xl transition-shadow`}
                  >
                    <Globe className="w-8 h-8 text-white" />
                  </div>
                  <h3
                    className={`text-2xl font-bold mb-4 ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    Visual Object Grounding
                  </h3>
                  <p
                    className={`${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    } leading-relaxed`}
                  >
                    Accurately localize objects based on a query, ensuring high
                    scale resilience across different sampling rates.
                  </p>
                </div>
              </FloatingElement>

              {/* Feature 3 */}
              <FloatingElement delay={0.4} duration={4}>
                <div
                  className={`group p-8 rounded-3xl transition-all duration-300 ${
                    darkMode
                      ? "bg-linear-to-br from-gray-800 to-gray-900 hover:from-pink-900/50 hover:to-gray-900"
                      : "bg-linear-to-br from-white to-gray-50 hover:from-pink-50 hover:to-white"
                  } border-2 ${
                    darkMode
                      ? "border-gray-700 hover:border-pink-500"
                      : "border-gray-200 hover:border-pink-300"
                  } shadow-xl transform hover:scale-105 hover:-translate-y-2`}
                >
                  <div
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${
                      darkMode ? "bg-pink-600" : "bg-pink-500"
                    } shadow-lg group-hover:shadow-2xl transition-shadow`}
                  >
                    <MessageSquare className="w-8 h-8 text-white" />
                  </div>
                  <h3
                    className={`text-2xl font-bold mb-4 ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    Geospatial Visual Question Answering (VQA)
                  </h3>
                  <p
                    className={`${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    } leading-relaxed`}
                  >
                    Provide accurate answers to binary, numeric, and semantic
                    queries about the image
                  </p>
                </div>
              </FloatingElement>
          </AnimatedList>
            {/* </div> */}
          </div>
        </section>
      </div>
    </>
  );
}

export default Home;