import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  decay: number;
  color: string;
  twinklePhase: number;
}

const GOLD_PALETTE = [
  '#FFE072', // Bright radiant gold
  '#F5D061', // Warm champagne gold
  '#D4AF37', // Pure metallic gold
  '#C5A059', // Deep antique gold
  '#FFF2B2'  // Starlight gold
];

export const GoldenSparkTrail: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Respect reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    let lastX = 0;
    let lastY = 0;
    let hasMoved = false;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas, { passive: true });

    const createSparks = (x: number, y: number, count: number = 2) => {
      // Limit active particles to prevent performance impact
      if (particles.length > 35) return;

      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 0.9 + 0.3;
        const color = GOLD_PALETTE[Math.floor(Math.random() * GOLD_PALETTE.length)];
        const size = Math.random() * 2.2 + 1.2;

        particles.push({
          x: x + (Math.random() - 0.5) * 8,
          y: y + (Math.random() - 0.5) * 8,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 0.35, // gentle upward drift like fragrance mist
          size,
          alpha: Math.random() * 0.45 + 0.55,
          decay: Math.random() * 0.02 + 0.015,
          color,
          twinklePhase: Math.random() * Math.PI
        });
      }
    };

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0]?.clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0]?.clientY : e.clientY;

      if (clientX === undefined || clientY === undefined) return;

      if (!hasMoved) {
        lastX = clientX;
        lastY = clientY;
        hasMoved = true;
        return;
      }

      const dx = clientX - lastX;
      const dy = clientY - lastY;
      const dist = Math.hypot(dx, dy);

      // Spawn sparks proportionally to pointer movement
      if (dist > 8) {
        createSparks(clientX, clientY, dist > 35 ? 3 : 2);
        lastX = clientX;
        lastY = clientY;
      }
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;
        p.twinklePhase += 0.15;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        const twinkle = Math.sin(p.twinklePhase) * 0.3 + 0.7;
        const currentSize = p.size * twinkle;

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);

        // Soft outer golden halo glow
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, currentSize * 3);
        gradient.addColorStop(0, p.color);
        gradient.addColorStop(0.4, p.color);
        gradient.addColorStop(1, 'transparent');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, currentSize * 2.8, 0, Math.PI * 2);
        ctx.fill();

        // 4-point subtle micro cross star sparkle for larger particles
        if (p.size > 2.0 && p.alpha > 0.3) {
          ctx.strokeStyle = '#FFFFFF';
          ctx.lineWidth = 0.6;
          ctx.beginPath();
          ctx.moveTo(p.x - currentSize * 1.8, p.y);
          ctx.lineTo(p.x + currentSize * 1.8, p.y);
          ctx.moveTo(p.x, p.y - currentSize * 1.8);
          ctx.lineTo(p.x, p.y + currentSize * 1.8);
          ctx.stroke();
        }

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-30"
      aria-hidden="true"
    />
  );
};
