import { useEffect, useRef } from 'react';

const CHARS = '01{}<>/;=+*#[]()'.split('');

/**
 * The name drawn with tiny code characters on a canvas. Move the pointer through it
 * and the characters scatter, then spring back. Static under reduced motion.
 */
const AsciiSignature = ({ text, label }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = canvas?.parentElement;
    if (!canvas || !wrap) return undefined;
    const ctx = canvas.getContext('2d');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const color = getComputedStyle(wrap).getPropertyValue('--sig').trim() || '#C9B6FF';

    let particles = [];
    let w = 0;
    let h = 0;
    let dpr = 1;
    let glyph = 10;
    let frame = 0;
    let built = false;
    const pointer = { x: -9999, y: -9999, active: false };

    const draw = () => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      ctx.font = `600 ${glyph}px "Geist Mono", ui-monospace, monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = color;
      for (const p of particles) {
        ctx.globalAlpha = p.o;
        ctx.fillText(p.c, p.x, p.y);
      }
      ctx.globalAlpha = 1;
    };

    const build = async () => {
      try {
        await document.fonts.load('600 200px "Schibsted Grotesk"');
      } catch {
        /* draw with the fallback font */
      }
      const rect = wrap.getBoundingClientRect();
      w = Math.round(rect.width);
      h = Math.round(rect.height);
      if (!w || !h) return;
      dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = w * dpr;
      canvas.height = h * dpr;

      // Draw the word off-screen, then sample it on a grid
      const off = document.createElement('canvas');
      off.width = w;
      off.height = h;
      const o = off.getContext('2d', { willReadFrequently: true });
      let size = h * 1.05;
      o.font = `600 ${size}px "Schibsted Grotesk", Arial, sans-serif`;
      let tw = o.measureText(text).width;
      if (tw > w * 0.97) {
        size *= (w * 0.97) / tw;
        o.font = `600 ${size}px "Schibsted Grotesk", Arial, sans-serif`;
        tw = o.measureText(text).width;
      }
      const m = o.measureText(text);
      const asc = m.actualBoundingBoxAscent;
      const desc = m.actualBoundingBoxDescent;
      o.fillStyle = '#000';
      o.fillText(text, (w - tw) / 2, (h + asc - desc) / 2);
      const data = o.getImageData(0, 0, w, h).data;

      const cell = w > 1000 ? 8 : w > 640 ? 7 : 5;
      glyph = cell * 1.3;
      particles = [];
      for (let y = cell / 2; y < h; y += cell) {
        for (let x = cell / 2; x < w; x += cell) {
          if (data[((y | 0) * w + (x | 0)) * 4 + 3] > 128) {
            particles.push({
              hx: x,
              hy: y,
              x,
              y,
              vx: 0,
              vy: 0,
              c: CHARS[(Math.random() * CHARS.length) | 0],
              o: 0.7 + Math.random() * 0.3,
            });
          }
        }
      }
      built = true;
      draw();
    };

    const step = () => {
      frame = 0;
      const r = w > 900 ? 90 : 60;
      let moving = false;
      for (const p of particles) {
        if (pointer.active) {
          const dx = p.x - pointer.x;
          const dy = p.y - pointer.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < r * r) {
            const d = Math.sqrt(d2) || 1;
            const f = ((r - d) / r) * 5;
            p.vx += (dx / d) * f;
            p.vy += (dy / d) * f;
            if (Math.random() < 0.08) p.c = CHARS[(Math.random() * CHARS.length) | 0];
          }
        }
        p.vx += (p.hx - p.x) * 0.06;
        p.vy += (p.hy - p.y) * 0.06;
        p.vx *= 0.82;
        p.vy *= 0.82;
        p.x += p.vx;
        p.y += p.vy;
        if (Math.abs(p.vx) + Math.abs(p.vy) > 0.05 || Math.abs(p.x - p.hx) + Math.abs(p.y - p.hy) > 0.3) {
          moving = true;
        } else {
          p.x = p.hx;
          p.y = p.hy;
        }
      }
      draw();
      if (moving || pointer.active) frame = requestAnimationFrame(step);
    };
    const kick = () => {
      if (!frame && built) frame = requestAnimationFrame(step);
    };

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active = true;
      kick();
    };
    const onLeave = () => {
      pointer.active = false;
      kick();
    };

    // Build only when the footer comes near the viewport
    let resizeTimer = 0;
    const ro = new ResizeObserver(() => {
      if (!built) return;
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(build, 150);
    });
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting) && !built) {
          build();
          ro.observe(wrap);
        }
      },
      { rootMargin: '200px 0px' },
    );
    io.observe(wrap);

    if (!reduce) {
      canvas.addEventListener('pointermove', onMove);
      canvas.addEventListener('pointerleave', onLeave);
      canvas.addEventListener('pointercancel', onLeave);
    }

    return () => {
      io.disconnect();
      ro.disconnect();
      cancelAnimationFrame(frame);
      window.clearTimeout(resizeTimer);
      canvas.removeEventListener('pointermove', onMove);
      canvas.removeEventListener('pointerleave', onLeave);
      canvas.removeEventListener('pointercancel', onLeave);
    };
  }, [text]);

  return (
    <div className="signature">
      <canvas ref={canvasRef} className="signature__canvas" aria-hidden="true" />
      <span className="sr-only">{label}</span>
    </div>
  );
};

export default AsciiSignature;
