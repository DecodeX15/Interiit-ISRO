import React, { useState, useEffect } from "react";
import { Globe, Info, MessageSquare, Rocket, Sparkles } from "lucide-react";
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
      </div>
    </>
  );
}

export default Home;
