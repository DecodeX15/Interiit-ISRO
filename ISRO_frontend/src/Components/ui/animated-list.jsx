import React, { useEffect, useMemo, useState, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "../../lib/utils.js";

export function AnimatedListItem({ children }) {
  const animations = {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1, originY: 0 },
    exit: { scale: 0, opacity: 0 },
    transition: { type: "spring", stiffness: 350, damping: 40 },
  };

  return (
    <motion.div {...animations} layout className="mx-auto w-full">
      {children}
    </motion.div>
  );
}

export const AnimatedList = React.memo(({
  children,
  className,
  delay = 1000,
  threshold = 0.3,
  ...props
}) => {
  const [index, setIndex] = useState(-1);
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef(null);
  const childrenArray = useMemo(() => React.Children.toArray(children), [children]);

  // Intersection Observer to detect when component is in viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isInView) {
          setIsInView(true);
          // Immediately show first item when entering viewport
          setIndex(0);
        }
      },
      {
        threshold: threshold,
        rootMargin: '0px',
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [threshold, isInView]);

  // Animate subsequent items with delay
  useEffect(() => {
    if (!isInView || index < 0) return;

    if (index < childrenArray.length - 1) {
      const timeout = setTimeout(() => {
        setIndex((prevIndex) => prevIndex + 1);
      }, delay);

      return () => clearTimeout(timeout);
    }
  }, [index, delay, childrenArray.length, isInView]);

  const itemsToShow = useMemo(() => {
    if (index < 0) return [];
    const result = childrenArray.slice(0, index + 1).reverse();
    return result;
  }, [index, childrenArray]);

  return (
    <div 
      ref={containerRef}
      className={cn(`flex flex-row items-center gap-4`, className)} 
      {...props}
    >
      <AnimatePresence>
        {itemsToShow.map((item) => (
          <AnimatedListItem key={item.key}>
            {item}
          </AnimatedListItem>
        ))}
      </AnimatePresence>
    </div>
  );
});

AnimatedList.displayName = "AnimatedList";