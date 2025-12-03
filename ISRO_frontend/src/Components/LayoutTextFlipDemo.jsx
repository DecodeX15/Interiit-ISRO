"use client";
import { LayoutTextFlip } from "./ui/layout-text-flip";
import { motion } from "motion/react";

export function LayoutTextFlipDemo() {
  return (
    <div>
      <motion.div className="relative mx-4 my-4 flex flex-col items-center justify-center gap-4 text-center sm:mx-0 sm:mb-0 sm:flex-row">
        <LayoutTextFlip
          text="A Picture "
          words={[
            "Worth",
            "Reveals",
            "Encodes",
            "Explains",
            "Contains",
            "Uncovers"
          ]}
        />
      </motion.div>
    </div>
  );
}
