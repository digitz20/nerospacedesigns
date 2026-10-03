"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Cursor() {
  const [isHovering, setIsHovering] = useState(false);
  const isHoveringRef = useRef(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const dotX = useSpring(mouseX, { stiffness: 500, damping: 30 });
  const dotY = useSpring(mouseY, { stiffness: 500, damping: 30 });
  const ringX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const ringY = useSpring(mouseY, { stiffness: 150, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest(
        'a, button, [role="button"], input, textarea, [data-cursor="magnetic"]'
      );
      if (interactive) {
        const rect = interactive.getBoundingClientRect();
        mouseX.set(rect.left + rect.width / 2);
        mouseY.set(rect.top + rect.height / 2);
        if (!isHoveringRef.current) {
          isHoveringRef.current = true;
          setIsHovering(true);
        }
      } else {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
        if (isHoveringRef.current) {
          isHoveringRef.current = false;
          setIsHovering(false);
        }
      }
    };

    const handleMouseLeave = () => {
      isHoveringRef.current = false;
      setIsHovering(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [mouseX, mouseY]);

  return (
    <>
      <motion.div
        className={`cursor-dot ${isHovering ? "hovering" : ""}`}
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
      <motion.div
        className={`cursor-ring ${isHovering ? "hovering" : ""}`}
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
    </>
  );
}
