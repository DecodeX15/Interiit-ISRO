import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globee } from "../Components/ui/globe";
import { GlobeeLight } from "../Components/ui/globe-light";
import { useTheme } from "../Context/theme/Themecontext.jsx";
import { HeroHighlightDemo } from "./HeroHighlightDemo";
import { Info, Globe, MessageSquare } from "lucide-react";
const FEATURES = [
  {
    icon: <Info className="w-8 h-8 text-white" />,
    texts: "Precise satellite  ",
    hitext: "Captioning in seconds ",
    text: "Get a concise, accurate description summarizing the local and global attributes of small and large objects in the satellite image.",
  },
  {
    icon: <Globe className="w-8 h-8 text-white" />,
    texts: "Detect changes ",
    hitext: "across the globe ",
    text: "Accurately localize objects based on a query. Enhance detection reliability by maintaining consistent precision even under dynamic or noisy input conditions.",
  },
  {
    icon: <MessageSquare className="w-8 h-8 text-white" />,
      texts: "Satellite data via",
    hitext: " natural language ",
    text: "Provide accurate answers to binary, numeric, and semantic queries about the image.",
  },
];

export default function RunpodStyleSlider() {
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef(null);
  const { darkMode } = useTheme();

  const FloatingElement = ({ children, delay = 0, duration = 0 }) => (
    <div
      style={{
        animation: ` ${duration}s ease-in-out ${delay}s infinite`,
      }}
    >
      {children}
    </div>
  );

  // Auto‑slide with progress bar
  useEffect(() => {
    setProgress(0);

    if (intervalRef.current) clearInterval(intervalRef.current);

    const duration = 5000; // 5 seconds
    const steps = 100;
    const stepTime = duration / steps;

    let step = 0;

    intervalRef.current = setInterval(() => {
      step++;
      const newProgress = (step / steps) * 100;
      setProgress(newProgress);

      if (step >= steps) {
        setIndex((prev) => (prev + 1) % 3);
      }
    }, stepTime);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [index]);

  return (
    <div className="w-full flex items-center justify-between py-20 px-20 text-white overflow-hidden">
      {/* LEFT TEXT WITH PROGRESS BAR */}

      {/* LEFT TEXT WITH PROGRESS BAR */}
<div className="w-1/2 pr-10">

  {/* 🔥 Card slide animation */}
  <AnimatePresence mode="wait">
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="space-y-8"
    >
      {(() => {
        const f = FEATURES[index];

        return (
          <motion.div
            whileHover={{
              scale: 1.03,
              y: -6,
              transition: { duration: 0.2 },
            }}
            className={`
              group p-8 rounded-3xl transition-all duration-300

              ${darkMode
                ? "bg-gradient-to-br from-gray-800 to-gray-900"
                : "bg-gradient-to-br from-white to-gray-50"
              }

              border-2 ${darkMode ? "border-gray-700" : "border-gray-200"}

              ${
                index === 0
                  ? darkMode
                    ? "hover:from-blue-900/30 hover:border-blue-500"
                    : "hover:from-blue-50 hover:border-blue-300"
                  : index === 1
                  ? darkMode
                    ? "hover:from-purple-900/30 hover:border-purple-500"
                    : "hover:from-purple-50 hover:border-purple-300"
                  : darkMode
                  ? "hover:from-pink-900/30 hover:border-pink-500"
                  : "hover:from-pink-50 hover:border-pink-300"
              }

              shadow-xl hover:shadow-2xl
            `}
          >

            {/* Icon */}
            <div
              className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-2xl transition-shadow
                ${
                  index === 0
                    ? darkMode ? "bg-blue-600" : "bg-blue-500"
                    : index === 1
                    ? darkMode ? "bg-purple-600" : "bg-purple-500"
                    : darkMode ? "bg-pink-600" : "bg-pink-500"
                }
              `}
            >
              {f.icon}
            </div>

            {/* Highlight heading */}
            <div className="text-2xl font-bold mb-4">
              <HeroHighlightDemo
                key={index}
                text={f.texts}
                hightext={f.hitext}
              />
            </div>

            {/* Description */}
            <p
              className={`leading-relaxed ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {f.text}
            </p>

          </motion.div>
        );
      })()}
    </motion.div>
  </AnimatePresence>

  {/* Progress Bar */}
  <div className="space-y-2 my-4">
    <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
      <div
        className="h-full bg-gradient-to-r from-blue-500 to-blue-400"
        style={{ width: `${progress}%` }}
      />
    </div>

    {/* Dots */}
    <div className="flex items-center gap-2">
      {FEATURES.map((_, i) => (
        <button
          key={i}
          onClick={() => setIndex(i)}
          className={`w-2 h-2 rounded-full transition-all ${
            i === index ? "bg-blue-500 scale-125" : "bg-gray-600 hover:bg-gray-500"
          }`}
        />
      ))}
    </div>
  </div>
</div>


      {/* RIGHT SIDE - GLOBE */}
      <div className="w-1/2 flex items-center justify-center h-[350px]">
        <AnimatePresence mode="wait">
          {/* {item.type === "globe" ? ( */}
          {/* // GLOBE COMPONENT for "Detect changes across the globe." */}
          <motion.div
            key="globe"
            className="relative w-full h-full flex items-center justify-center"
            initial={{ opacity: 0, x: 50, rotateY: 90 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            exit={{ opacity: 0, x: -50, rotateY: -90 }}
            transition={{ duration: 0.8 }}
          >
            {/* Globe Component */}
            <div className="absolute inset-0 flex items-center justify-center">
              {darkMode ? (
                <Globee className="h-full w-full left-40" />
              ) : (
                <GlobeeLight className="h-full w-full left-40" />
              )}
            </div>

            {/* Grid overlay */}
          </motion.div>
          {/* ) : ( */}
          {/* // REGULAR IMAGE for other slides */}
          {/* <motion.img
              key={item.img}
              src={item.img}
              alt="slide"
              className="rounded-xl shadow-xl object-cover h-full"
              initial={{ opacity: 0, x: 50, rotateY: 90 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              exit={{ opacity: 0, x: -50, rotateY: -90 }}
              transition={{ duration: 0.8 }}
            /> */}
          {/* )} */}
        </AnimatePresence>
      </div>
    </div>
  );
}
