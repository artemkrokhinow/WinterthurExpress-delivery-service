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
  const offscreenRef = useRef<HTMLCanvasElement[]>([]);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const sources = ["/images/box1.png", "/images/box2.png", "/images/box3.png"];
    let loaded = 0;

    let cw = 0;
    let ch = 0;
    let rect: DOMRect | null = null;

    sources.forEach((src, i) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        // Pre-render the image with its shadow to an offscreen canvas.
        // This is the ultimate optimization for Canvas shadows.
        const osc = document.createElement("canvas");
        const octx = osc.getContext("2d");
        
        // We make the canvas large enough to contain the shadow (300x300)
        osc.width = 300;
        osc.height = 300;
        
        if (octx) {
          octx.shadowColor = "rgba(66,75,84,0.2)";
          octx.shadowBlur = 30;
          octx.shadowOffsetY = 12;
          
          // Draw the image in the center at 150x150
          octx.drawImage(img, 75, 75, 150, 150);
        }
        
        offscreenRef.current[i] = osc;
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
      cw = container.clientWidth;
      ch = container.clientHeight;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = cw * dpr;
      canvas.height = ch * dpr;
      canvas.style.width = cw + "px";
      canvas.style.height = ch + "px";
      ctx!.scale(dpr, dpr);
      initBoxes(cw, ch);
      rect = canvas.getBoundingClientRect();
    }

    const updateRect = () => {
      if (canvas) rect = canvas.getBoundingClientRect();
    };

    function startAnimation() {
      resize();
      animate();
    }

    function animate() {
      if (!ctx || !canvas || !container) return;
      const cx = cw / 2;
      const cy = ch / 2;

      ctx.clearRect(0, 0, cw, ch);

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

        const osc = offscreenRef.current[i];
        if (!osc) return;

        const s = box.size;
        // The original image was drawn at 150x150 inside a 300x300 canvas
        const scale = s / 150;
        const drawSize = 300 * scale;

        const tilt = Math.sin(box.angle * 0.7) * 0.15;

        ctx.save();
        ctx.translate(box.x, box.y);
        ctx.rotate(tilt);
        ctx.globalAlpha = 0.88;
        // Extremely fast hardware-accelerated draw
        ctx.drawImage(osc, -drawSize / 2, -drawSize / 2, drawSize, drawSize);
        ctx.restore();
      });

      frameRef.current = requestAnimationFrame(animate);
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!rect) rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", updateRect, { passive: true });

    return () => {
      cancelAnimationFrame(frameRef.current);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", updateRect);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 z-10 pointer-events-none">
      <canvas ref={canvasRef} className="pointer-events-auto" />
    </div>
  );
}
