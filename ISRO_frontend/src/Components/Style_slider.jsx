import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globee } from "../Components/ui/globe";

const ITEMS = [
  {
    title: "Analyze satellite imagery in seconds.",
    description:
      "Upload high-resolution satellite images with zero pixel loss, or provide structured JSON inputs. Get instant AI-powered insights including object detection, terrain features, and semantic segmentation.",
    img: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?q=80&w=2071&auto=format&fit=crop",
    type: "image",
  },
  {
    title: "Detect changes across the globe.",
    description:
      "Track urban expansion, deforestation, natural disasters, and infrastructure development with automated temporal analysis.",
    type: "globe",
  },
  {
    title: "Natural language interface for satellite data.",
    description:
      "Ask questions in plain English — 'Find all airports in this region', 'Locate water bodies', 'Count vehicles' — and get precise AI-driven results.",
    img: "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?q=80&w=2070&auto=format&fit=crop",
    type: "image",
  },
];

export default function RunpodStyleSlider() {
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef(null);

  // Auto‑slide with progress bar
  useEffect(() => {
    setProgress(0);

    if (intervalRef.current) clearInterval(intervalRef.current);

    const duration = 8000; // 5 seconds
    const steps = 100;
    const stepTime = duration / steps;

    let step = 0;

    intervalRef.current = setInterval(() => {
      step++;
      const newProgress = (step / steps) * 100;
      setProgress(newProgress);

      if (step >= steps) {
        setIndex((prev) => (prev + 1) % ITEMS.length);
      }
    }, stepTime);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [index]);

  const item = ITEMS[index];

  return (
    <div className="w-full flex items-center justify-between py-20 px-20 text-white overflow-hidden">
      {/* LEFT TEXT WITH PROGRESS BAR */}
      <div className="w-1/2 pr-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Text Content */}
            <div className="space-y-4">
              <h1 className="text-4xl font-bold">{item.title}</h1>
              <p className="text-gray-300 text-lg">{item.description}</p>
            </div>

            {/* PROGRESS BAR */}
            <div className="space-y-2">
              <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-500 to-blue-400"
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ type: "tween", duration: 0.1 }}
                />
              </div>

              {/* Dots for Slide Indication */}
              <div className="flex items-center gap-2">
                {ITEMS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIndex(i)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      i === index
                        ? "bg-blue-500 scale-125"
                        : "bg-gray-600 hover:bg-gray-500"
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* RIGHT SIDE - EITHER IMAGE OR GLOBE */}
      <div className="w-1/2 flex items-center justify-center h-[350px]">
        <AnimatePresence mode="wait">
          {item.type === "globe" ? (
            // GLOBE COMPONENT for "Detect changes across the globe."
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
                <Globee className="h-full w-full left-40" />
              </div>

              {/* Grid overlay */}
            </motion.div>
          ) : (
            // REGULAR IMAGE for other slides
            <motion.img
              key={item.img}
              src={item.img}
              alt="slide"
              className="rounded-xl shadow-xl object-cover h-full"
              initial={{ opacity: 0, x: 50, rotateY: 90 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              exit={{ opacity: 0, x: -50, rotateY: -90 }}
              transition={{ duration: 0.8 }}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
