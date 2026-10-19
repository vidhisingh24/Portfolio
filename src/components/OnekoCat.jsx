import { useEffect, useRef, useState } from 'react';

/**
 * "You like cats?" — a little pixel cat (the classic Neko sprite) that naps by the
 * toggle and, when switched on, chases your cursor (or your taps on touch screens).
 *
 * Behaviour follows oneko.js by adryd (MIT, https://github.com/adryd325/oneko.js);
 * the sprite sheet and its licence live in /public/oneko.
 */
const SPRITE = '/oneko/oneko.gif';
const SIZE = 32;
const SPEED = 10;
const FRAME_MS = 100;
const STORAGE_KEY = 'likes-cats';

// [column, row] offsets into the 8×4 sprite sheet
const SPRITES = {
  idle: [[-3, -3]],
  alert: [[-7, -3]],
  scratchSelf: [[-5, 0], [-6, 0], [-7, 0]],
  scratchWallN: [[0, 0], [0, -1]],
  scratchWallS: [[-7, -1], [-6, -2]],
  scratchWallE: [[-2, -2], [-2, -3]],
  scratchWallW: [[-4, 0], [-4, -1]],
  tired: [[-3, -2]],
  sleeping: [[-2, 0], [-2, -1]],
  N: [[-1, -2], [-1, -3]],
  NE: [[0, -2], [0, -3]],
  E: [[-3, 0], [-3, -1]],
  SE: [[-5, -1], [-5, -2]],
  S: [[-6, -3], [-7, -2]],
  SW: [[-5, -3], [-6, -1]],
  W: [[-4, -2], [-4, -3]],
  NW: [[-1, 0], [-1, -1]],
};

const readLikes = () => {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'yes';
  } catch {
    return false;
  }
};

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Where the cat naps: just above-right of the toggle pill (bottom-left corner)
const homePosition = () => ({ x: 100, y: window.innerHeight - 82 });

/**
 * Imperative cat engine (kept outside React: it updates every 100ms).
 * Returns { setChasing, destroy }.
 */
const createNeko = (el) => {
  const home = homePosition();
  const s = {
    x: home.x,
    y: home.y,
    target: home,
    chasing: false,
    frameCount: 0,
    idleTime: 0,
    idleAnimation: null,
    idleAnimationFrame: 0,
  };

  const draw = (name, frame) => {
    const set = SPRITES[name];
    const [col, row] = set[frame % set.length];
    el.style.backgroundPosition = `${col * SIZE}px ${row * SIZE}px`;
    el.style.transform = `translate3d(${s.x - SIZE / 2}px, ${s.y - SIZE / 2}px, 0)`;
  };

  const idle = () => {
    s.idleTime += 1;
    if (!s.chasing) {
      // Toggle off: nap in the corner
      s.x = s.target.x;
      s.y = s.target.y;
      draw('sleeping', Math.floor(s.idleAnimationFrame / 4));
      s.idleAnimationFrame += 1;
      return;
    }

    if (s.idleTime > 10 && !s.idleAnimation && Math.floor(Math.random() * 200) === 0) {
      const options = ['sleeping', 'scratchSelf'];
      if (s.x < 32) options.push('scratchWallW');
      if (s.y < 32) options.push('scratchWallN');
      if (s.x > window.innerWidth - 32) options.push('scratchWallE');
      if (s.y > window.innerHeight - 32) options.push('scratchWallS');
      s.idleAnimation = options[Math.floor(Math.random() * options.length)];
    }

    switch (s.idleAnimation) {
      case 'sleeping':
        if (s.idleAnimationFrame < 8) draw('tired', 0);
        else draw('sleeping', Math.floor(s.idleAnimationFrame / 4));
        if (s.idleAnimationFrame > 192) {
          s.idleAnimation = null;
          s.idleAnimationFrame = 0;
        }
        break;
      case 'scratchWallN':
      case 'scratchWallS':
      case 'scratchWallE':
      case 'scratchWallW':
      case 'scratchSelf':
        draw(s.idleAnimation, s.idleAnimationFrame);
        if (s.idleAnimationFrame > 9) {
          s.idleAnimation = null;
          s.idleAnimationFrame = 0;
        }
        break;
      default:
        draw('idle', 0);
        return;
    }
    s.idleAnimationFrame += 1;
  };

  const step = () => {
    s.frameCount += 1;
    const dx = s.x - s.target.x;
    const dy = s.y - s.target.y;
    const distance = Math.hypot(dx, dy);

    if (distance < SPEED || (s.chasing && distance < 48)) {
      idle();
      return;
    }

    s.idleAnimation = null;
    s.idleAnimationFrame = 0;

    // Just noticed something: look alert for a moment before running
    if (s.idleTime > 1) {
      draw('alert', 0);
      s.idleTime = Math.min(s.idleTime, 7) - 1;
      return;
    }

    let direction = dy / distance > 0.5 ? 'N' : '';
    direction += dy / distance < -0.5 ? 'S' : '';
    direction += dx / distance > 0.5 ? 'W' : '';
    direction += dx / distance < -0.5 ? 'E' : '';

    s.x -= (dx / distance) * SPEED;
    s.y -= (dy / distance) * SPEED;
    s.x = Math.min(Math.max(SIZE / 2, s.x), window.innerWidth - SIZE / 2);
    s.y = Math.min(Math.max(SIZE / 2, s.y), window.innerHeight - SIZE / 2);
    draw(direction || 'idle', s.frameCount);
  };

  // Animation loop at ~10fps, paused while the tab is hidden or motion is reduced
  let raf = 0;
  let last = 0;
  const loop = (t) => {
    if (t - last >= FRAME_MS) {
      last = t;
      step();
    }
    raf = window.requestAnimationFrame(loop);
  };
  const start = () => {
    if (!raf && !document.hidden) raf = window.requestAnimationFrame(loop);
  };
  const stop = () => {
    window.cancelAnimationFrame(raf);
    raf = 0;
  };
  const sync = () => {
    // Reduced motion: no animation unless the visitor turned the cat on
    if (prefersReducedMotion() && !s.chasing) {
      stop();
      const h = homePosition();
      s.x = h.x;
      s.y = h.y;
      s.target = h;
      draw('sleeping', 0);
    } else {
      start();
    }
  };

  const onPointer = (e) => {
    if (!s.chasing) return;
    if (e.pointerType === 'mouse' || e.type === 'pointerdown') s.target = { x: e.clientX, y: e.clientY };
  };
  const onResize = () => {
    if (!s.chasing) s.target = homePosition();
  };
  const onVisibility = () => (document.hidden ? stop() : sync());

  window.addEventListener('pointermove', onPointer, { passive: true });
  window.addEventListener('pointerdown', onPointer, { passive: true });
  window.addEventListener('resize', onResize);
  document.addEventListener('visibilitychange', onVisibility);
  draw('sleeping', 0);

  return {
    setChasing(value) {
      s.chasing = value;
      if (!value) {
        s.target = homePosition();
        s.idleTime = 0;
      }
      sync();
    },
    destroy() {
      stop();
      window.removeEventListener('pointermove', onPointer);
      window.removeEventListener('pointerdown', onPointer);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibility);
    },
  };
};

const OnekoCat = () => {
  const [on, setOn] = useState(readLikes);
  const catRef = useRef(null);
  const nekoRef = useRef(null);

  useEffect(() => {
    const neko = createNeko(catRef.current);
    nekoRef.current = neko;
    return () => {
      neko.destroy();
      nekoRef.current = null;
    };
  }, []);

  useEffect(() => {
    nekoRef.current?.setChasing(on);
  }, [on]);

  const toggle = () => {
    setOn((v) => {
      const next = !v;
      try {
        localStorage.setItem(STORAGE_KEY, next ? 'yes' : 'no');
      } catch {
        /* storage blocked: still works for this visit */
      }
      return next;
    });
  };

  return (
    <>
      <div ref={catRef} className="neko" aria-hidden="true" style={{ backgroundImage: `url(${SPRITE})` }} />
      <div className="nekopill">
        <span id="nekopill-label" className="nekopill-label">
          You like cats?
        </span>
        <button
          type="button"
          role="switch"
          aria-checked={on}
          aria-labelledby="nekopill-label"
          onClick={toggle}
          className="nekoswitch"
        >
          <span className="nekoswitch-thumb" />
        </button>
      </div>
    </>
  );
};

export default OnekoCat;
