"use client";
import { motion, useScroll } from "motion/react";
import { RefObject, useEffect, useRef, useState } from "react";

const functionToObserver = (
  h1Ref: RefObject<HTMLHeadingElement | null>,
  observer: IntersectionObserver
) => {
  if (h1Ref.current) {
    observer.observe(h1Ref.current);
  }
};

export default function ProgressBar() {
  const { scrollYProgress } = useScroll();
  const [isVisible, setIsVisible] = useState(false);
  const h1Ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(!entry.isIntersecting);
    });

    functionToObserver(h1Ref, observer);

    return () => observer.disconnect();
  }, [h1Ref]);

  return (
    <>
      <motion.div
        className={`fixed rounded top-0 left-0 right-0 bg-teal-600 h-1.5 origin-left z-50 opacity-0 transition-all duration-3 ease-in-out`}
        style={{ scaleX: scrollYProgress, opacity: isVisible ? 1 : 0 }}
      >
        {}
      </motion.div>
      <div ref={h1Ref} className="sr-only">
        Mark
      </div>
    </>
  );
}
