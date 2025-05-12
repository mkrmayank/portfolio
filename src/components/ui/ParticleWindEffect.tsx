
"use client";

import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
}

const NUM_PARTICLES = 200; // Increased from 150 for more density
const PARTICLE_COLOR = "hsl(var(--foreground))"; // White particles based on theme

export const ParticleWindEffect: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameIdRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const isVisibleRef = useRef(false);


  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      if (container && canvas) { // Ensure canvas is still there
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;
        initParticles();
      }
    };

    const initParticles = () => {
      if (!canvas) return; // Guard against null canvas
      particlesRef.current = [];
      for (let i = 0; i < NUM_PARTICLES; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1.5 + 1, // Particle size increased (was 0.5 to 2.0, now 1.0 to 2.5)
          speedX: Math.random() * 0.8 + 0.1, // Horizontal speed (wind)
          speedY: (Math.random() - 0.5) * 0.1, // Slight vertical drift
        });
      }
    };

    const drawParticles = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = PARTICLE_COLOR;
      particlesRef.current.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    const updateParticles = () => {
      if (!canvas) return; // Guard against null canvas
      particlesRef.current.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;

        // Wrap particles around screen edges
        if (p.speedX > 0 && p.x > canvas.width + p.size) {
          p.x = -p.size;
          p.y = Math.random() * canvas.height; // Re-randomize y for variety
        } else if (p.speedX < 0 && p.x < -p.size) {
          p.x = canvas.width + p.size;
          p.y = Math.random() * canvas.height;
        }

        if (p.y > canvas.height + p.size) {
          p.y = -p.size;
          p.x = Math.random() * canvas.width; // Re-randomize x if wrapping vertically
        } else if (p.y < -p.size) {
          p.y = canvas.height + p.size;
          p.x = Math.random() * canvas.width;
        }
      });
    };

    const animate = () => {
      if (isVisibleRef.current) {
        updateParticles();
        drawParticles();
      }
      animationFrameIdRef.current = requestAnimationFrame(animate);
    };
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
        if (isVisibleRef.current && particlesRef.current.length === 0) {
          // Initial setup only if particles haven't been initialized
          // and canvas is ready from a potentially delayed resize.
          if (canvas.width > 0 && canvas.height > 0) {
            initParticles();
          } else {
            // If canvas isn't sized yet, resizeCanvas will handle init.
            // This might happen if observer fires before initial resize.
          }
        }
      },
      { threshold: 0.01 } // Start animation even if a small part is visible
    );

    if (container) {
      observer.observe(container);
    }
    
    // Call resizeCanvas initially to set up canvas size and particles
    // This is crucial for initial render if element is already in view.
    resizeCanvas();
    // Check initial visibility after resize
    if (container) {
        const initialRect = container.getBoundingClientRect();
        if (initialRect.top < window.innerHeight && initialRect.bottom >= 0 && initialRect.left < window.innerWidth && initialRect.right >=0) {
            isVisibleRef.current = true;
            if (particlesRef.current.length === 0 && canvas.width > 0 && canvas.height > 0) {
                initParticles();
            }
        }
    }


    animationFrameIdRef.current = requestAnimationFrame(animate);

    window.addEventListener('resize', resizeCanvas);

    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
      window.removeEventListener('resize', resizeCanvas);
      if (container) {
        observer.unobserve(container);
      }
    };
  }, []); // Empty dependency array: runs once on mount and cleans up on unmount

  return (
    <div ref={containerRef} className="w-full h-full absolute inset-0 overflow-hidden -z-10 pointer-events-none">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
};

