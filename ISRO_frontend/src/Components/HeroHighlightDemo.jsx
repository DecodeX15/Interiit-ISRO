"use client";
import { motion } from "motion/react";
import { HeroHighlight, Highlight } from "./ui/hero-highlight";
import { useTheme } from "../Context/theme/Themecontext";

export function HeroHighlightDemo({ text, hightext }) {
  const { darkMode } = useTheme();
  return (
    <HeroHighlight>
      <motion.h1
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: [20, -5, 0],
        }}
        transition={{
          duration: 0.5,
          ease: [0.4, 0.0, 0.2, 1],
        }}
        className={`text-2xl px-4 font-bold ${
          !darkMode ? "text-black" : "text-white"
        } max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto`}
      >
        {text}{" "}
        {/* <Highlight className="text-black dark:text-white">{hightext}</Highlight>  */}
        <Highlight className={`${darkMode ? "text-black" : "text-black"}`}>
          {hightext}
        </Highlight>
      </motion.h1>
    </HeroHighlight>
  );
}
