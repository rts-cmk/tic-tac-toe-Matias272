import React, { useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useMotionTemplate,
} from "motion/react";

export default function GradientBackground() {
  const x = useMotionValue(window.innerWidth / 2);
  const y = useMotionValue(window.innerHeight / 2);

  const smoothX = useSpring(x, { stiffness: 80, damping: 20 });
  const smoothY = useSpring(y, { stiffness: 80, damping: 20 });

  // layered gradients for glow and depth
  const glow = useMotionTemplate`radial-gradient(600px circle at ${smoothX}px ${smoothY}px,
    rgba(0,200,255,0.15),
    transparent 60%)`;
  const aura = useMotionTemplate`radial-gradient(900px circle at ${smoothX}px ${smoothY}px,
    rgba(255,0,150,0.08),
    transparent 70%)`;
  const base = "#030303";

  useEffect(() => {
    const resize = () => {
      x.set(window.innerWidth / 2);
      y.set(window.innerHeight / 2);
    };
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [x, y]);

  function onMove(cx, cy) {
    x.set(cx);
    y.set(cy);
  }

  return (
    <div
      onMouseMove={(e) => onMove(e.clientX, e.clientY)}
      onTouchMove={(e) => {
        const t = e.touches[0];
        if (t) onMove(t.clientX, t.clientY);
      }}
      style={{
        width: "100vw",
        height: "100vh",
        background: base,
        overflow: "hidden",
        position: "relative",
      }}
    >
      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          background: glow,
          mixBlendMode: "screen",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />
      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          background: aura,
          mixBlendMode: "overlay",
          filter: "blur(120px)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
