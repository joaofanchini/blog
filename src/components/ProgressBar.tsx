"use client";
import { motion, useScroll, useSpring } from "motion/react";

export default function ProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 bg-teal-600 h-1.5 origin-left z-50"
      style={{ scaleX: scaleX }}
    ></motion.div>
  );
}
