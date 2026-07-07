import { useEffect, useRef } from 'react';

export default function StarField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animId;

    const STAR_COUNT = 200;
    const stars = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Mix of white and coloured (rose/lavender/sky) stars
    const starColors = [
      'rgba(255,255,255,',
      'rgba(255,107,157,',
      'rgba(192,132,252,',
      'rgba(56,189,248,',
      'rgba(45,212,191,',
      'rgba(255,215,0,',
    ];

    for (let i = 0; i < STAR_COUNT; i++) {
      stars.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        r: Math.random() * 1.6 + 0.3,
        speed: Math.random() * 0.12 + 0.02,
        opacity: Math.random(),
        dir: Math.random() > 0.5 ? 1 : -1,
        twinkleSpeed: Math.random() * 0.009 + 0.002,
        color: starColors[Math.floor(Math.random() * starColors.length)],
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((s) => {
        s.opacity += s.dir * s.twinkleSpeed;
        if (s.opacity > 1 || s.opacity < 0.05) s.dir *= -1;
        s.y -= s.speed;
        if (s.y < -2) { s.y = canvas.height + 2; s.x = Math.random() * canvas.width; }

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `${s.color}${Math.min(s.opacity, 1).toFixed(2)})`;
        ctx.fill();
      });
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }} />;
}
