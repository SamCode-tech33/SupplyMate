"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface Sparkle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  size: number;
}

interface PricingCardProps {
  children: React.ReactNode;
  offsetX: number;
}

const PricingCard = ({ children, offsetX }: PricingCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sparklesRef = useRef<Sparkle[]>([]);
  const animFrameRef = useRef<number>(0);
  const isHovering = useRef(false);

  const spawnBorderSparkles = () => {
    const card = cardRef.current;
    if (!card) return;
    const { width, height } = card.getBoundingClientRect();

    // pick a random point along the border
    const perimeter = 2 * (width + height);
    const pos = Math.random() * perimeter;

    let x: number, y: number;
    if (pos < width) {
      x = pos;
      y = 0; // top edge
    } else if (pos < width + height) {
      x = width;
      y = pos - width; // right edge
    } else if (pos < 2 * width + height) {
      x = width - (pos - width - height);
      y = height; // bottom edge
    } else {
      x = 0;
      y = height - (pos - 2 * width - height); // left edge
    }

    sparklesRef.current.push({
      x,
      y,
      vx: (Math.random() - 0.5) * 3,
      vy: (Math.random() - 0.5) * 3,
      life: 1,
      size: Math.random() * 4 + 2,
    });
  };

  const animate = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || !cardRef.current) return;

    const { width, height } = cardRef.current.getBoundingClientRect();
    canvas.width = width;
    canvas.height = height;

    ctx.clearRect(0, 0, width, height);

    if (isHovering.current) {
      // spawn a few sparkles per frame
      for (let i = 0; i < 3; i++) spawnBorderSparkles();
    }

    sparklesRef.current = sparklesRef.current.filter((s) => s.life > 0);

    for (const s of sparklesRef.current) {
      s.x += s.vx;
      s.y += s.vy;
      s.life -= 0.03;

      ctx.save();
      ctx.globalAlpha = s.life;
      ctx.fillStyle = "gold";
      ctx.shadowColor = "gold";
      ctx.shadowBlur = 6;
      // draw a 4-pointed star
      ctx.beginPath();
      for (let i = 0; i < 4; i++) {
        const angle = (i / 4) * Math.PI * 2;
        const outer = s.size;
        const inner = s.size * 0.4;
        ctx.lineTo(
          s.x + Math.cos(angle) * outer,
          s.y + Math.sin(angle) * outer,
        );
        ctx.lineTo(
          s.x + Math.cos(angle + Math.PI / 4) * inner,
          s.y + Math.sin(angle + Math.PI / 4) * inner,
        );
      }
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }

    animFrameRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    animFrameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrameRef.current);
  });

  return (
    <motion.div
      ref={cardRef}
      className="pricing-card"
      onMouseEnter={() => {
        isHovering.current = true;
      }}
      onMouseLeave={() => {
        isHovering.current = false;
      }}
      initial={{ x: offsetX, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 40, damping: 30 }}
    >
      {children}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          pointerEvents: "none",
          zIndex: 10,
        }}
      />
    </motion.div>
  );
};

export default PricingCard;
