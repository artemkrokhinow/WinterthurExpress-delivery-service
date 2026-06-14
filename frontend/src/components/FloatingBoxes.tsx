"use client";

import { useEffect, useRef } from "react";

interface Box {
  angle: number;
  radius: number;
  speed: number;
  size: number;
  x: number;
  y: number;
}

export function FloatingBoxes() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const boxesRef = useRef<Box[]>([]);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const sources = ["/images/box1.png", "/images/box2.png", "/images/box3.png"];
    let loaded = 0;

    sources.forEach((src, i) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        imagesRef.current[i] = img;
        loaded++;
        if (loaded === sources.length) startAnimation();
      };
    });

    function initBoxes(w: number, h: number) {
      const cx = w / 2;
      const cy = h / 2;
      boxesRef.current = [
        { angle: 0,   radius: Math.min(w, h) * 0.38, speed: 0.035, size: 80,  x: cx, y: cy },
        { angle: 2.1, radius: Math.min(w, h) * 0.45, speed: 0.025, size: 100, x: cx, y: cy },
        { angle: 4.2, radius: Math.min(w, h) * 0.30, speed: 0.045, size: 65,  x: cx, y: cy },
      ];
    }

    function resize() {
      if (!container || !canvas) return;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = container.clientWidth * dpr;
      canvas.height = container.clientHeight * dpr;
      canvas.style.width = container.clientWidth + "px";
      canvas.style.height = container.clientHeight + "px";
      ctx!.scale(dpr, dpr);
      initBoxes(container.clientWidth, container.clientHeight);
    }

    function startAnimation() {
      resize();
      animate();
    }

    function animate() {
      if (!ctx || !canvas || !container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      const cx = w / 2;
      const cy = h / 2;

      ctx.clearRect(0, 0, w, h);

      const mouse = mouseRef.current;

      boxesRef.current.forEach((box, i) => {
        box.angle += box.speed * 0.016;

        const targetX = cx + Math.cos(box.angle) * box.radius * 1.5;
        const targetY = cy + Math.sin(box.angle) * box.radius * 0.5;

        const dx = targetX - mouse.x;
        const dy = targetY - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const repelRadius = 180;
        let rx = 0, ry = 0;

        if (dist < repelRadius && dist > 0) {
          const force = ((repelRadius - dist) / repelRadius) * 220;
          rx = (dx / dist) * force;
          ry = (dy / dist) * force;
        }

        const finalX = targetX + rx;
        const finalY = targetY + ry;

        box.x += (finalX - box.x) * 0.06;
        box.y += (finalY - box.y) * 0.06;

        const img = imagesRef.current[i];
        if (!img) return;

        const s = box.size;
        const tilt = Math.sin(box.angle * 0.7) * 0.15;

        ctx.save();
        ctx.translate(box.x, box.y);
        ctx.rotate(tilt);
        ctx.globalAlpha = 0.88;
        ctx.shadowColor = "rgba(66,75,84,0.2)";
        ctx.shadowBlur = 30;
        ctx.shadowOffsetY = 12;
        ctx.drawImage(img, -s / 2, -s / 2, s, s);
        ctx.restore();
      });

      frameRef.current = requestAnimationFrame(animate);
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(frameRef.current);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 z-10 pointer-events-none">
      <canvas ref={canvasRef} className="pointer-events-auto" />
    </div>
  );
}
