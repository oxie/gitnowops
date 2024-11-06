import React, { useEffect, useRef, useCallback } from 'react';
import { useThrottledCallback } from '../hooks/useThrottledCallback';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
}

interface ParticleConfig {
  particleCount: number;
  connectionDistance: number;
  mouseRadius: number;
  mouseForce: number;
  baseSpeed: number;
  friction: number;
  particleAlpha: number;
  connectionAlpha: number;
  maxSpeed: number;
  naturalMovement: number;
  bufferZone: number;
}

const DEFAULT_CONFIG: ParticleConfig = {
  particleCount: 150,
  connectionDistance: 120,
  mouseRadius: 200,
  mouseForce: 0.5,
  baseSpeed: 0.5,
  friction: 0.97,
  particleAlpha: 0.35,
  connectionAlpha: 0.2,
  maxSpeed: 6,
  naturalMovement: 0.05,
  bufferZone: 50
};

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>();
  const isVisibleRef = useRef(true);

  const setupCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;
    const { innerWidth, innerHeight } = window;
    
    canvas.width = innerWidth * dpr;
    canvas.height = innerHeight * dpr;
    canvas.style.width = `${innerWidth}px`;
    canvas.style.height = `${innerHeight}px`;
    
    const ctx = canvas.getContext('2d', { 
      alpha: true,
      desynchronized: true // Performance optimization
    });
    if (!ctx) return;
    
    ctx.scale(dpr, dpr);
    contextRef.current = ctx;
  }, []);

  const createParticles = useCallback(() => {
    if (!canvasRef.current) return;
    
    const { width, height } = canvasRef.current;
    particlesRef.current = Array.from({ length: DEFAULT_CONFIG.particleCount }, () => {
      const baseRadius = Math.random() * 1.5 + 1;
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * DEFAULT_CONFIG.baseSpeed,
        vy: (Math.random() - 0.5) * DEFAULT_CONFIG.baseSpeed,
        radius: baseRadius,
        baseRadius
      };
    });
  }, []);

  const updateParticle = useCallback((particle: Particle) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Mouse interaction
    const dx = mouseRef.current.x - particle.x;
    const dy = mouseRef.current.y - particle.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < DEFAULT_CONFIG.mouseRadius) {
      const force = (DEFAULT_CONFIG.mouseRadius - distance) / DEFAULT_CONFIG.mouseRadius;
      const angle = Math.atan2(dy, dx);
      const easing = force * force;
      
      particle.vx += Math.cos(angle) * easing * DEFAULT_CONFIG.mouseForce;
      particle.vy += Math.sin(angle) * easing * DEFAULT_CONFIG.mouseForce;
    }

    // Natural movement and physics
    particle.vx += (Math.random() - 0.5) * DEFAULT_CONFIG.naturalMovement;
    particle.vy += (Math.random() - 0.5) * DEFAULT_CONFIG.naturalMovement;
    particle.vx *= DEFAULT_CONFIG.friction;
    particle.vy *= DEFAULT_CONFIG.friction;

    // Speed limiting
    const speed = Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy);
    if (speed > DEFAULT_CONFIG.maxSpeed) {
      const scale = DEFAULT_CONFIG.maxSpeed / speed;
      particle.vx *= scale;
      particle.vy *= scale;
    }

    // Update position
    particle.x += particle.vx;
    particle.y += particle.vy;

    // Screen wrapping
    const { width, height } = canvas;
    if (particle.x < -DEFAULT_CONFIG.bufferZone) particle.x = width + DEFAULT_CONFIG.bufferZone;
    if (particle.x > width + DEFAULT_CONFIG.bufferZone) particle.x = -DEFAULT_CONFIG.bufferZone;
    if (particle.y < -DEFAULT_CONFIG.bufferZone) particle.y = height + DEFAULT_CONFIG.bufferZone;
    if (particle.y > height + DEFAULT_CONFIG.bufferZone) particle.y = -DEFAULT_CONFIG.bufferZone;
  }, []);

  const drawParticles = useCallback(() => {
    const ctx = contextRef.current;
    const canvas = canvasRef.current;
    if (!ctx || !canvas) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.lineWidth = 0.5;

    particlesRef.current.forEach((particle, i) => {
      // Draw connections
      for (let j = i + 1; j < particlesRef.current.length; j++) {
        const other = particlesRef.current[j];
        const dx = other.x - particle.x;
        const dy = other.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < DEFAULT_CONFIG.connectionDistance) {
          const opacity = (1 - distance / DEFAULT_CONFIG.connectionDistance) * DEFAULT_CONFIG.connectionAlpha;
          ctx.strokeStyle = `rgba(250, 189, 0, ${opacity})`;
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(other.x, other.y);
          ctx.stroke();
        }
      }

      // Draw particle
      ctx.fillStyle = `rgba(250, 189, 0, ${DEFAULT_CONFIG.particleAlpha})`;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      ctx.fill();
    });
  }, []);

  const animate = useCallback(() => {
    if (!isVisibleRef.current) return;
    particlesRef.current.forEach(updateParticle);
    drawParticles();
    rafRef.current = requestAnimationFrame(animate);
  }, [updateParticle, drawParticles]);

  const handleMouseMove = useThrottledCallback((e: MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    mouseRef.current = {
      x: (e.clientX - rect.left) * (canvas.width / rect.width),
      y: (e.clientY - rect.top) * (canvas.height / rect.height)
    };
  }, 16); // ~60fps

  const handleVisibilityChange = useCallback(() => {
    isVisibleRef.current = !document.hidden;
    if (isVisibleRef.current && !rafRef.current) {
      animate();
    }
  }, [animate]);

  const handleResize = useThrottledCallback(() => {
    setupCanvas();
    createParticles();
  }, 250);

  useEffect(() => {
    setupCanvas();
    createParticles();
    animate();

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [setupCanvas, createParticles, animate, handleResize, handleMouseMove, handleVisibilityChange]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full"
      style={{
        opacity: 0.6,
        touchAction: 'none',
        pointerEvents: 'none',
        zIndex: 1
      }}
    />
  );
}