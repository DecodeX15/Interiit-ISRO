import React, { useState, useEffect } from 'react';
import { Moon, Sun,Info, MessageSquare, Plus, Rocket, Satellite, Globe, Sparkles, ChevronDown, Zap, Shield, Database } from 'lucide-react';
import Isro from '../assets/ISRO-Color.svg'
import StarField from '../Components/ui/StarField.jsx';
import { TypingAnimation } from "../Components/ui/typing-animation.jsx"
function Home() {
  const [darkMode, setDarkMode] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const FloatingElement = ({ children, delay = 0, duration = 0 }) => (
    <div
      style={{
        animation: ` ${duration}s ease-in-out ${delay}s infinite`,
      }}
    >
      {children}
    </div>
  );

  // Star field background
  // const StarField = () => (
  //   <div className="absolute inset-0 overflow-hidden pointer-events-none">
  //     {[...Array(50)].map((_, i) => (
  //       <div
  //         key={i}
  //         className={`absolute w-1 h-1 rounded-full ${darkMode ? 'bg-white' : 'bg-gray-400'}`}
  //         style={{
  //           left: `${Math.random() * 100}%`,
  //           top: `${Math.random() * 100}%`,
  //           opacity: Math.random() * 0.5 + 0.2,
  //           animation: `twinkle ${Math.random() * 3 + 2}s ease-in-out infinite`,
  //           animationDelay: `${Math.random() * 2}s`,
  //         }}
  //       />
  //     ))}
  //   </div>
  // );
  return (
    <>
     <div className={`max-h-screen min-h-screen transition-colors duration-500 overflow-y-auto ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-b from-blue-50 to-white'}`}>
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 1; }
        }
        @keyframes orbit {
          from { transform: rotate(0deg) translateX(100px) rotate(0deg); }
          to { transform: rotate(360deg) translateX(100px) rotate(-360deg); }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.8; }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        .animate-slideInLeft {
          animation: slideInLeft 0.8s ease-out forwards;
        }
      `}</style>

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrollY > 50 
          ? darkMode ? 'bg-gray-900/95 backdrop-blur-lg shadow-lg' : 'bg-white/95 backdrop-blur-lg shadow-lg'
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* <div className={`relative w-12 h-12 rounded-xl flex items-center justify-center ${
                darkMode ? 'bg-gradient-to-br from-blue-600 to-purple-600' : 'bg-gradient-to-br from-blue-500 to-purple-500'
              } shadow-lg`}> */}
                {/* <Rocket className="w-7 h-7 text-white" style={{ transform: 'rotate(-45deg)' }} /> */}
                <img src={Isro} alt="Logo" className="w-20 h-20" />
                {/* <div className="absolute inset-0 rounded-xl bg-white opacity-0 hover:opacity-20 transition-opacity" /> */}
              {/* </div> */}
              <div>
                <span className={`text-xl font-bold block ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  GeoNLI
                </span>
                <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Inter IIT Tech Meet 14.0
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={toggleDarkMode}
                className={`p-3 rounded-xl transition-all duration-300 ${
                  darkMode 
                    ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                } transform hover:scale-110`}
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-visible px-6 pt-20">
        <StarField />
        {/* <Globee className='text-orange'/> */}
        {/* Orbiting Satellites */}
        {/* <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="relative w-64 h-64">
            <div style={{ animation: 'orbit 20s linear infinite' }}>
              <Satellite className={`w-8 h-8 ${darkMode ? 'text-blue-400' : 'text-blue-500'}`} />
            </div>
          </div>
        </div> */}

        <div className="relative z-10 max-w-5xl w-full text-center space-y-8">
          {/* Main Heading */}
          <div className={`space-y-6 ${isVisible ? 'animate-fadeInUp' : 'opacity-0'}`}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/20 backdrop-blur-sm border border-blue-500/30">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span className={`text-sm font-medium ${darkMode ? 'text-blue-300' : 'text-blue-700'}`}>
                Built for the Inter IIT Tech Meet 14.0
              </span>
            </div>
            

            <h1 className={`text-5xl md:text-7xl font-bold leading-tight ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              A picture worth 
              <span className="block mt-2 text-orange-500">
            <TypingAnimation>
                a Thousand Words
            </TypingAnimation>
              </span> 
            </h1>
            
            <p className={`text-xl md:text-2xl max-w-3xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Talk to satellite images like you're chatting with an expert
            </p>
          </div>

          {/* CTA Buttons */}
          <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 ${isVisible ? 'animate-fadeInUp' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
            <button 
            onClick={() => window.location.href = '/dashboard'}
            className={`group relative px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 bg-blue-700 hover:bg-orange-700
           text-white shadow-lg hover:shadow-2xl transform hover:scale-105`}>
              <span className="flex items-center gap-2">
                <Rocket className="w-5 h-5" />
                Get Started
              </span>
              <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
            </button>
            
            {/* <button className={`px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 ${
              darkMode 
                ? 'bg-gray-800 hover:bg-gray-700 text-white border-2 border-gray-700' 
                : 'bg-white hover:bg-gray-50 text-gray-900 border-2 border-gray-300'
            } shadow-lg transform hover:scale-105`}>
              <span className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                Explore Docs
              </span>
            </button> */}
          </div>

          {/* Scroll Indicator */}
          {/* <div className={`absolute bottom-10 left-1/2 transform -translate-x-1/2 ${isVisible ? 'animate-fadeInUp' : 'opacity-0'}`} style={{ animationDelay: '0.4s' }}>
            <ChevronDown className={`w-8 h-8 ${darkMode ? 'text-gray-500' : 'text-gray-400'} animate-bounce`} />
          </div> */}
        </div>
      </section>

      {/* Features Section */}
      <section className={`relative py-20 px-6 ${darkMode ? 'bg-gray-900/50' : 'bg-white/50'} backdrop-blur-sm`}>
      <StarField/>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Mission-Ready Features
            </h2>
            <p className={`text-xl ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Built for space exploration and beyond
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <FloatingElement delay={0}>
              <div className={`group p-8 rounded-3xl transition-all duration-300 ${
                darkMode 
                  ? 'bg-gradient-to-br from-gray-800 to-gray-900 hover:from-blue-900/50 hover:to-gray-900' 
                  : 'bg-gradient-to-br from-white to-gray-50 hover:from-blue-50 hover:to-white'
              } border-2 ${darkMode ? 'border-gray-700 hover:border-blue-500' : 'border-gray-200 hover:border-blue-300'} shadow-xl transform hover:scale-105 hover:-translate-y-2`}>
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${
                  darkMode ? 'bg-blue-600' : 'bg-blue-500'
                } shadow-lg group-hover:shadow-2xl transition-shadow`}>
                  <Info className="w-8 h-8 text-white" />
                </div>
                <h3 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                 Smart Captioning 
                </h3>
                <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} leading-relaxed`}>
                  Get instant responses to complex queries about mission specs, payload data, and technical documentation
                </p>
              </div>
            </FloatingElement>

            {/* Feature 2 */}
            <FloatingElement delay={0.2} duration={3.5}>
              <div className={`group p-8 rounded-3xl transition-all duration-300 ${
                darkMode 
                  ? 'bg-gradient-to-br from-gray-800 to-gray-900 hover:from-purple-900/50 hover:to-gray-900' 
                  : 'bg-gradient-to-br from-white to-gray-50 hover:from-purple-50 hover:to-white'
              } border-2 ${darkMode ? 'border-gray-700 hover:border-purple-500' : 'border-gray-200 hover:border-purple-300'} shadow-xl transform hover:scale-105 hover:-translate-y-2`}>
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${
                  darkMode ? 'bg-purple-600' : 'bg-purple-500'
                } shadow-lg group-hover:shadow-2xl transition-shadow`}>
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <h3 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Intelligent Grounding
                </h3>
                <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} leading-relaxed`}>
                  Enterprise-grade security ensuring your mission-critical data stays protected and confidential
                </p>
              </div>
            </FloatingElement>

            {/* Feature 3 */}
            <FloatingElement delay={0.4} duration={4}>
              <div className={`group p-8 rounded-3xl transition-all duration-300 ${
                darkMode 
                  ? 'bg-gradient-to-br from-gray-800 to-gray-900 hover:from-pink-900/50 hover:to-gray-900' 
                  : 'bg-gradient-to-br from-white to-gray-50 hover:from-pink-50 hover:to-white'
              } border-2 ${darkMode ? 'border-gray-700 hover:border-pink-500' : 'border-gray-200 hover:border-pink-300'} shadow-xl transform hover:scale-105 hover:-translate-y-2`}>
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${
                  darkMode ? 'bg-pink-600' : 'bg-pink-500'
                } shadow-lg group-hover:shadow-2xl transition-shadow`}>
                  <MessageSquare className="w-8 h-8 text-white" />
                </div>
                <h3 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Visual Q&A
                </h3>
                <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} leading-relaxed`}>
                  AI-powered understanding of technical context, relationships, and dependencies across documents
                </p>
              </div>
            </FloatingElement>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 px-6 overflow-visible">
        <StarField />
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
          <FloatingElement>
            <div className={`inline-block p-4 rounded-full ${darkMode ? 'bg-blue-600/20' : 'bg-blue-500/20'} mb-4`}>
              <Satellite className={`w-16 h-16 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
            </div>
          </FloatingElement>
          
          <h2 className={`text-4xl md:text-5xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Ready for Liftoff?
          </h2>
          
          <p className={`text-xl ${darkMode ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto`}>
            Start exploring mission documentation with the power of AI. Your journey to the stars begins here.
          </p>
          
          <button className={`group relative px-10 py-5 text-xl font-bold rounded-full transition-all duration-300 ${
            darkMode 
              ? 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700' 
              : 'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600'
          } text-white shadow-2xl hover:shadow-3xl transform hover:scale-110`}>
            <span className="flex items-center gap-3">
              <Rocket className="w-6 h-6 transform group-hover:-translate-y-1 transition-transform" />
              Start Your Mission
              <Sparkles className="w-6 h-6" />
            </span>
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-12 px-6 border-t ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-gray-50 border-gray-200'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              {/* <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                darkMode ? 'bg-gradient-to-br from-blue-600 to-purple-600' : 'bg-gradient-to-br from-blue-500 to-purple-500'
              }`}>
                <Rocket className="w-6 h-6 text-white" style={{ transform: 'rotate(-45deg)' }} />
              </div> */}
               <img src={Isro} alt="Logo" className="w-20 h-20" />
              <div>
                <p className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>GeoNLI</p>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Inter IIT Tech Meet 14.0</p>
              </div>
            </div>
            
            <div className="flex items-center gap-8">
              <a href="https://github.com/DecodeX15/Interiit-ISRO" target='blank' className={`text-sm hover:underline ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>
                Codebase
              </a>
              <a href="#" className={`text-sm hover:underline ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>
                Report
              </a>
              
            </div>
            
            
          </div>
        </div>
      </footer>
    </div>
    </>
  )
}

export default Home
