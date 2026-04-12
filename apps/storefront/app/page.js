"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import {
  ShoppingCart, X, ArrowRight, Sparkles, Send, Plus, Minus, Check,
  Search, ChevronUp, ArrowUpRight
} from 'lucide-react';
import { PillButton, ObsidianCard, SectionTitle, BrassLine } from '../../../packages/lumina-ui';
import { AIEngine } from '../../../packages/ai-core';

const ai = new AIEngine();

/* ─────────────────────────────────────────────────────────────────────────
   Product Catalog  (brand = Neelora)
───────────────────────────────────────────────────────────────────────── */
const PRODUCTS = [
  {
    id: 1, name: "Neelora Prism Watch", category: "Luxury", price: 1200, demand: 0.8,
    description: "Precision Swiss engineering meets quantum-era aesthetics. 47 mm titanium case with sapphire crystal and AI-powered health tracking.",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
    tags: ["Swiss Made", "Titanium", "AI Health"],
  },
  {
    id: 2, name: "Neon Cyber Sneakers", category: "Fashion", price: 350, demand: 0.6,
    description: "Hand-crafted from sustainable bio-leather with reactive neon sole technology and embedded NFC pairing.",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
    tags: ["Sustainable", "NFC", "Limited Edition"],
  },
  {
    id: 3, name: "Quantum Sound Sculptor", category: "Tech", price: 899, demand: 0.9,
    description: "Room-adaptive spatial audio with quantum noise-cancellation. 40-hour battery, wireless charging pad included.",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
    tags: ["Spatial Audio", "40 hr Battery", "Wireless"],
  },
  {
    id: 4, name: "Neelora Smart Glass", category: "Tech", price: 599, demand: 0.5,
    description: "Transparent AR lens with 4K holographic overlay, eye-tracking and gesture control. IPX6 rated.",
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&q=80",
    tags: ["AR", "4K Holo", "Eye-Track"],
  },
  {
    id: 5, name: "Velvet Void Backpack", category: "Fashion", price: 210, demand: 0.4,
    description: "Architectural silicone-weave construction with integrated solar-charging panel and anti-theft biometric lock.",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80",
    tags: ["Solar Panel", "Biometric", "Waterproof"],
  },
  {
    id: 6, name: "Neural Link Headband", category: "Tech", price: 1500, demand: 0.95,
    description: "EEG-based focus enhancer with real-time brainwave visualization. FDA-cleared biofeedback training protocols.",
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&q=80",
    tags: ["EEG", "FDA-Cleared", "Biofeedback"],
  },
];

/* ─────────────────────────────────────────────────────────────────────────
   Dark Starfield + Shooting Stars Canvas
───────────────────────────────────────────────────────────────────────── */
function ParticleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let anim;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };

    // Static stars
    let STARS = [];
    const initStars = () => {
      STARS = Array.from({ length: 220 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.2 + 0.2,
        alpha: Math.random() * 0.7 + 0.1,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        twinkleDir: Math.random() > 0.5 ? 1 : -1,
      }));
    };

    // Shooting stars
    let SHOOTS = [];
    const spawnShoot = () => {
      SHOOTS.push({
        x: Math.random() * canvas.width * 0.7,
        y: Math.random() * canvas.height * 0.4,
        len: Math.random() * 120 + 60,
        speed: Math.random() * 8 + 6,
        alpha: 1,
        angle: Math.PI / 5 + (Math.random() - 0.5) * 0.3,
      });
    };
    // Spawn a shooting star every 3–6 seconds
    const shootInterval = setInterval(() => {
      if (Math.random() > 0.3) spawnShoot();
    }, 3000);

    initStars();
    resize();
    window.addEventListener('resize', resize);

    let t = 0;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 0.016;

      // Draw twinkling stars
      STARS.forEach(s => {
        s.alpha += s.twinkleSpeed * s.twinkleDir;
        if (s.alpha > 0.85 || s.alpha < 0.05) s.twinkleDir *= -1;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        // Mix white and brass for variety
        const brass = s.r > 0.9;
        ctx.fillStyle = brass
          ? `rgba(201, 169, 110, ${s.alpha * 0.65})`
          : `rgba(255, 255, 255, ${s.alpha})`;
        ctx.fill();
        // Glow on larger stars
        if (s.r > 1.0) {
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.r * 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,255,255,${s.alpha * 0.06})`;
          ctx.fill();
        }
      });

      // Draw shooting stars
      SHOOTS = SHOOTS.filter(sh => sh.alpha > 0);
      SHOOTS.forEach(sh => {
        const dx = Math.cos(sh.angle) * sh.speed;
        const dy = Math.sin(sh.angle) * sh.speed;
        const grad = ctx.createLinearGradient(
          sh.x, sh.y,
          sh.x - Math.cos(sh.angle) * sh.len,
          sh.y - Math.sin(sh.angle) * sh.len
        );
        grad.addColorStop(0, `rgba(255, 240, 200, ${sh.alpha})`);
        grad.addColorStop(1, 'rgba(255,240,200,0)');
        ctx.beginPath();
        ctx.moveTo(sh.x, sh.y);
        ctx.lineTo(sh.x - Math.cos(sh.angle) * sh.len, sh.y - Math.sin(sh.angle) * sh.len);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        sh.x += dx;
        sh.y += dy;
        sh.alpha -= 0.018;
      });

      anim = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(anim);
      clearInterval(shootInterval);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} id="particle-canvas" />;
}

/* ─────────────────────────────────────────────────────────────────────────
   Rotating 3D Wireframe Globe
───────────────────────────────────────────────────────────────────────── */
function GlobeCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let anim;
    let angle = 0;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Rotate a 3-D point around the Y axis
    const rotY = (x, y, z, a) => ({
      x: x * Math.cos(a) - z * Math.sin(a),
      y,
      z: x * Math.sin(a) + z * Math.cos(a),
    });
    // Simple perspective projection
    const project = (x, y, z, cx, cy, fov) => {
      const s = fov / (fov + z);
      return { x: cx + x * s, y: cy + y * s, z };
    };

    // City-like nodes on the surface
    const NODES = [
      [0.4, 0.6], [1.0, 2.2], [1.3, 1.0], [0.7, 3.8],
      [1.6, 4.5], [0.5, 5.9], [1.1, 0.3], [0.9, 2.8],
      [1.4, 5.2], [0.3, 1.8], [1.2, 3.3], [0.6, 4.9],
    ];

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      angle += 0.004;

      const cx  = canvas.width  * 0.72;
      const cy  = canvas.height * 0.48;
      const R   = Math.min(canvas.width, canvas.height) * 0.32;
      const fov = 500;

      const LATS = 14;
      const LONS = 18;
      const SEGS = 72;

      // Draw latitude rings
      for (let li = 0; li <= LATS; li++) {
        const phi = (li / LATS) * Math.PI;
        const yr  = Math.cos(phi) * R;
        const lr  = Math.sin(phi) * R;
        const pts = [];
        for (let s = 0; s <= SEGS; s++) {
          const th = (s / SEGS) * Math.PI * 2;
          const p  = rotY(Math.cos(th) * lr, yr, Math.sin(th) * lr, angle);
          pts.push(project(p.x, p.y, p.z, cx, cy, fov));
        }
        for (let s = 0; s < pts.length - 1; s++) {
          const alpha = Math.max(0.02, 0.14 + (pts[s].z / R) * 0.09);
          ctx.beginPath();
          ctx.moveTo(pts[s].x, pts[s].y);
          ctx.lineTo(pts[s + 1].x, pts[s + 1].y);
          ctx.strokeStyle = `rgba(201,169,110,${alpha})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }

      // Draw longitude arcs
      for (let lo = 0; lo < LONS; lo++) {
        const th0 = (lo / LONS) * Math.PI * 2;
        const pts = [];
        for (let s = 0; s <= SEGS; s++) {
          const phi = (s / SEGS) * Math.PI;
          const yy  = Math.cos(phi) * R;
          const lr  = Math.sin(phi) * R;
          const p   = rotY(Math.cos(th0) * lr, yy, Math.sin(th0) * lr, angle);
          pts.push(project(p.x, p.y, p.z, cx, cy, fov));
        }
        for (let s = 0; s < pts.length - 1; s++) {
          const alpha = Math.max(0.02, 0.14 + (pts[s].z / R) * 0.09);
          ctx.beginPath();
          ctx.moveTo(pts[s].x, pts[s].y);
          ctx.lineTo(pts[s + 1].x, pts[s + 1].y);
          ctx.strokeStyle = `rgba(201,169,110,${alpha})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }

      // Draw glowing city nodes
      NODES.forEach(([phi, th]) => {
        const yr = Math.cos(phi) * R;
        const lr = Math.sin(phi) * R;
        const p  = rotY(Math.cos(th) * lr, yr, Math.sin(th) * lr, angle);
        if (p.z < -R * 0.05) return; // back side: hide
        const proj  = project(p.x, p.y, p.z, cx, cy, fov);
        const alpha = 0.35 + (p.z / R) * 0.65;
        // Pulse dot
        ctx.beginPath();
        ctx.arc(proj.x, proj.y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(240,192,96,${alpha})`;
        ctx.fill();
        // Halo glow
        const g = ctx.createRadialGradient(proj.x, proj.y, 0, proj.x, proj.y, 14);
        g.addColorStop(0, `rgba(240,192,96,${alpha * 0.45})`);
        g.addColorStop(1, 'rgba(240,192,96,0)');
        ctx.beginPath();
        ctx.arc(proj.x, proj.y, 14, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();
      });

      // Atmospheric rim glow
      const rim = ctx.createRadialGradient(cx, cy, R * 0.80, cx, cy, R * 1.18);
      rim.addColorStop(0,   'rgba(100,60,200,0)');
      rim.addColorStop(0.6, 'rgba(100,60,200,0.06)');
      rim.addColorStop(1,   'rgba(100,60,200,0)');
      ctx.beginPath();
      ctx.arc(cx, cy, R * 1.18, 0, Math.PI * 2);
      ctx.fillStyle = rim;
      ctx.fill();

      anim = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(anim);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} id="globe-canvas" />;
}

/* ─────────────────────────────────────────────────────────────────────────
   Scroll-reveal wrapper
───────────────────────────────────────────────────────────────────────── */
function RevealOnScroll({ children, delay = 0, direction = 'up', className = '', style = {} }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px 0px' });
  const variants = {
    hidden: {
      opacity: 0,
      y: direction === 'up' ? 50 : direction === 'down' ? -50 : 0,
      x: direction === 'left' ? 50 : direction === 'right' ? -50 : 0,
    },
    visible: { opacity: 1, y: 0, x: 0 },
  };
  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      variants={variants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      transition={{ duration: 0.9, delay, ease: [0.77, 0, 0.175, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   Parallax image wrapper
───────────────────────────────────────────────────────────────────────── */
function ParallaxImage({ src, alt, height = '420px', speed = 0.15 }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [`${speed * -100}px`, `${speed * 100}px`]);
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 });

  return (
    <div ref={ref} style={{ height, overflow: 'hidden', position: 'relative' }}>
      <motion.img
        src={src}
        alt={alt}
        style={{ y: smoothY, width: '100%', height: `calc(${height} + 80px)`, objectFit: 'cover' }}
        className="product-card-img"
      />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   Cart badge
───────────────────────────────────────────────────────────────────────── */
function CartBadge({ count }) {
  if (!count) return null;
  return (
    <motion.span
      initial={{ scale: 0 }} animate={{ scale: 1 }}
      style={{
        position: 'absolute', top: '-8px', right: '-8px',
        background: 'var(--accent-brass)', color: '#fff',
        borderRadius: '50%', width: '18px', height: '18px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '0.6rem', fontFamily: 'IBM Plex Mono',
      }}
    >{count}</motion.span>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   Product Detail Modal
───────────────────────────────────────────────────────────────────────── */
function ProductModal({ product, onClose, onAddToCart }) {
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const price = ai.calculateDynamicPrice(product.price, product.demand);

  const handleAdd = () => {
    onAddToCart(product, qty);
    setAdded(true);
    setTimeout(() => { setAdded(false); onClose(); }, 1200);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)',
        backdropFilter: 'blur(8px)', zIndex: 4000,
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem',
      }}
    >
      <motion.div
        initial={{ y: 70, opacity: 0, scale: 0.97 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 70, opacity: 0, scale: 0.97 }}
        transition={{ type: 'spring', damping: 28, stiffness: 280 }}
        onClick={e => e.stopPropagation()}
        style={{
          background: 'var(--bg-bone)', maxWidth: '900px', width: '100%',
          display: 'grid', gridTemplateColumns: '1fr 1fr', overflow: 'hidden',
          boxShadow: '0 40px 120px rgba(0,0,0,0.35)',
        }}
      >
        {/* Product image */}
        <div style={{ position: 'relative', height: '560px', overflow: 'hidden' }}>
          <motion.img
            src={product.image} alt={product.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            initial={{ scale: 1.1 }} animate={{ scale: 1 }}
            transition={{ duration: 0.8, ease: [0.77, 0, 0.175, 1] }}
          />
          <button onClick={onClose}
            style={{
              position: 'absolute', top: '1rem', left: '1rem',
              background: 'rgba(255,255,255,0.9)', border: 'none', borderRadius: '50%',
              width: '36px', height: '36px', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
            <X size={16} />
          </button>
          {/* Animated brand stamp */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            style={{
              position: 'absolute', bottom: '1.5rem', left: '1.5rem',
              fontFamily: 'IBM Plex Mono', fontSize: '0.6rem', letterSpacing: '0.15em',
              color: '#fff', background: 'rgba(0,0,0,0.55)', padding: '0.4rem 0.8rem',
            }}>
            NEELORA
          </motion.div>
        </div>

        {/* Details */}
        <div style={{ padding: '3rem', display: 'flex', flexDirection: 'column' }}>
          <motion.div className="mono" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}
            style={{ color: 'var(--accent-brass)', marginBottom: '1rem' }}>
            {product.category.toUpperCase()} — #{String(product.id).padStart(3, '0')}
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            style={{ fontSize: '2rem', margin: '0 0 1.5rem', lineHeight: 1.1 }}>
            {product.name}
          </motion.h2>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            style={{ color: '#555', lineHeight: 1.7, marginBottom: '2rem', flex: 1 }}>
            {product.description}
          </motion.p>

          {/* Tags */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
            style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
            {product.tags.map((t, i) => (
              <motion.span key={t} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.45 + i * 0.07 }} className="mono"
                style={{ border: '1px solid var(--accent-brass-muted)', padding: '0.3rem 0.8rem', fontSize: '0.65rem', color: 'var(--accent-brass)' }}>
                {t}
              </motion.span>
            ))}
          </motion.div>

          {/* Price */}
          <motion.div className="mono" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            style={{ fontSize: '2rem', marginBottom: '2rem' }}>
            ${price}
          </motion.div>

          {/* Qty + CTA */}
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', border: '1px solid #ddd', padding: '0.5rem 1rem' }}>
              <button onClick={() => setQty(q => Math.max(1, q - 1))}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}><Minus size={14} /></button>
              <span className="mono">{qty}</span>
              <button onClick={() => setQty(q => q + 1)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}><Plus size={14} /></button>
            </div>
            <motion.button onClick={handleAdd} whileTap={{ scale: 0.95 }}
              style={{
                flex: 1, background: added ? '#10b981' : 'var(--text-obsidian)',
                color: '#fff', border: 'none', padding: '0.875rem 1.5rem', cursor: 'pointer',
                transition: 'background 0.3s', display: 'flex', alignItems: 'center',
                justifyContent: 'center', gap: '0.5rem',
                fontFamily: 'IBM Plex Mono', fontSize: '0.75rem', letterSpacing: '0.1em',
              }}>
              {added ? <><Check size={14} /> ADDED</> : <>ACQUIRE <ArrowRight size={14} /></>}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   Cart Sidebar
───────────────────────────────────────────────────────────────────────── */
function CartSidebar({ cart, onClose, onUpdateQty, onRemove }) {
  const total = cart.reduce(
    (sum, i) => sum + parseFloat(ai.calculateDynamicPrice(i.price, i.demand)) * i.qty, 0
  );
  return (
    <motion.div
      initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 28, stiffness: 250 }}
      style={{
        position: 'fixed', top: 0, right: 0, width: '420px', height: '100vh',
        background: 'var(--bg-bone)', borderLeft: '1px solid #ddd',
        zIndex: 3500, display: 'flex', flexDirection: 'column',
        boxShadow: '-20px 0 60px rgba(0,0,0,0.08)',
      }}
    >
      <div style={{ padding: '2rem', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="mono">CART ({cart.length})</div>
        <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={20} /></button>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem 2rem' }}>
        {cart.length === 0 ? (
          <div style={{ textAlign: 'center', color: '#999', marginTop: '4rem' }} className="mono">YOUR ASSEMBLY IS EMPTY</div>
        ) : cart.map(item => (
          <motion.div key={item.id} layout
            style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', alignItems: 'center' }}>
            <img src={item.image} alt={item.name}
              style={{ width: '72px', height: '72px', objectFit: 'cover', flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '0.9rem', marginBottom: '0.25rem' }}>{item.name}</div>
              <div className="mono" style={{ color: 'var(--accent-brass)', fontSize: '0.7rem' }}>
                ${ai.calculateDynamicPrice(item.price, item.demand)}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '0.5rem' }}>
                {[Minus, Plus].map((Icon, idx) => (
                  <button key={idx}
                    onClick={() => onUpdateQty(item.id, item.qty + (idx === 0 ? -1 : 1))}
                    style={{ background: 'none', border: '1px solid #ddd', width: '24px', height: '24px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon size={10} />
                  </button>
                ))}
                <span className="mono" style={{ fontSize: '0.7rem' }}>{item.qty}</span>
              </div>
            </div>
            <button onClick={() => onRemove(item.id)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#999' }}>
              <X size={14} />
            </button>
          </motion.div>
        ))}
      </div>
      {cart.length > 0 && (
        <div style={{ padding: '2rem', borderTop: '1px solid #eee' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
            <span className="mono">TOTAL</span>
            <motion.span key={total} initial={{ scale: 1.15 }} animate={{ scale: 1 }}
              className="mono" style={{ color: 'var(--accent-brass)' }}>
              ${total.toFixed(2)}
            </motion.span>
          </div>
          <PillButton dark onClick={() => alert('Checkout coming soon!')}>Proceed to Checkout</PillButton>
        </div>
      )}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   AI Concierge Chat
───────────────────────────────────────────────────────────────────────── */
function ConciergeChat({ onClose }) {
  const [messages, setMessages] = useState([
    { from: 'ai', text: 'Welcome to Neelora Concierge. How may I assist your assembly today?' },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const send = async () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setInput('');
    setMessages(m => [...m, { from: 'user', text: userMsg }]);
    setLoading(true);
    try {
      const reply = await ai.processChat(userMsg);
      setMessages(m => [...m, { from: 'ai', text: reply }]);
    } catch {
      setMessages(m => [...m, { from: 'ai', text: 'My apologies, I encountered an issue. Please try again.' }]);
    }
    setLoading(false);
  };

  return (
    <motion.div
      initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      style={{
        position: 'fixed', top: 0, right: 0, width: '450px', height: '100vh',
        background: 'white', borderLeft: '1px solid #ddd',
        zIndex: 3000, display: 'flex', flexDirection: 'column',
        boxShadow: '-20px 0 60px rgba(0,0,0,0.05)',
      }}
    >
      <div style={{ padding: '2rem', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div className="mono" style={{ color: 'var(--accent-brass)' }}>NEELORA CONCIERGE</div>
          <div style={{ fontSize: '0.8rem', color: '#999', marginTop: '0.25rem' }}>AI-Powered Advisor</div>
        </div>
        <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={20} /></button>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem 2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {messages.map((m, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            style={{ display: 'flex', justifyContent: m.from === 'user' ? 'flex-end' : 'flex-start' }}>
            <div style={{
              maxWidth: '80%', padding: '0.875rem 1.25rem',
              background: m.from === 'user' ? 'var(--text-obsidian)' : '#f5f5f5',
              color: m.from === 'user' ? '#fff' : '#000',
              borderRadius: m.from === 'user' ? '16px 16px 0 16px' : '16px 16px 16px 0',
              fontSize: '0.9rem', lineHeight: 1.6,
            }}>{m.text}</div>
          </motion.div>
        ))}
        {loading && (
          <div style={{ display: 'flex', gap: '4px', padding: '0.5rem' }}>
            {[0, 1, 2].map(i => (
              <motion.div key={i}
                style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-brass)' }}
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }} />
            ))}
          </div>
        )}
        <div ref={bottomRef} />
      </div>
      <div style={{ padding: '1.5rem 2rem', borderTop: '1px solid #eee' }}>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', border: '1px solid #ddd', padding: '0.75rem 1rem' }}>
          <input value={input} onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && send()}
            placeholder="ENTER INQUIRY..."
            style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', fontFamily: 'IBM Plex Mono', fontSize: '0.75rem', color: '#000', letterSpacing: '0.05em' }} />
          <button onClick={send}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--accent-brass)', display: 'flex' }}>
            <Send size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   Ticker / Marquee strip
───────────────────────────────────────────────────────────────────────── */
function MarqueeStrip() {
  const items = ['NEELORA', 'PRECISION ENGINEERED', 'AI CURATED', 'LIMITED EDITIONS', 'FREE GLOBAL SHIPPING'];
  const repeated = [...items, ...items];
  return (
    <div style={{ overflow: 'hidden', borderTop: '1px solid #ddd', borderBottom: '1px solid #ddd', padding: '0.85rem 0', background: 'var(--bg-bone)' }}>
      <motion.div
        style={{ display: 'flex', gap: '4rem', whiteSpace: 'nowrap' }}
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 22, ease: 'linear', repeat: Infinity }}
      >
        {repeated.map((item, i) => (
          <span key={i} className="mono" style={{ color: 'var(--accent-brass)', fontSize: '0.7rem', flexShrink: 0 }}>
            ✦ {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   Animated counter
───────────────────────────────────────────────────────────────────────── */
function AnimatedNumber({ target, prefix = '', suffix = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const end = parseInt(target.toString().replace(/,/g, ''), 10);
    const duration = 1800;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setValue(end); clearInterval(timer); }
      else setValue(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref}>{prefix}{value.toLocaleString()}{suffix}</span>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   Real-Time Rendering Effects (Tilt Card & HUD)
───────────────────────────────────────────────────────────────────────── */
function RenderHUD() {
  const [fps, setFps] = useState(60);
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    let lastTime = performance.now();
    let frameCount = 0;
    let anim;

    const loop = (now) => {
      frameCount++;
      setFrame(f => f + 1);
      if (now - lastTime >= 1000) {
        setFps(frameCount);
        frameCount = 0;
        lastTime = now;
      }
      anim = requestAnimationFrame(loop);
    };
    anim = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(anim);
  }, []);

  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', padding: '1rem',
      background: 'rgba(201,169,110,0.05)', borderBottom: '1px solid rgba(201,169,110,0.2)',
      marginBottom: '2rem', fontFamily: 'IBM Plex Mono', fontSize: '0.7rem', color: 'var(--accent-brass)'
    }}>
      <div style={{ display: 'flex', gap: '2rem' }}>
        <span>ENGINE: NEELORA_RTX_V9</span>
        <span>FPS: {fps}</span>
        <span>FRAME: {frame.toString().padStart(6, '0')}</span>
      </div>
      <div style={{ display: 'flex', gap: '2rem' }}>
        <span>POLYGONS: {(frame * 13 % 99999).toString().padStart(5, '0')}</span>
        <span>SHADERS: COMPILED</span>
      </div>
    </div>
  );
}

function RenderEngineCard({ children, onClick }) {
  const cardRef = useRef(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate rotation (-10 to 10 degrees)
    const rotX = ((y / rect.height) - 0.5) * -20;
    const rotY = ((x / rect.width) - 0.5) * 20;

    setRotation({ x: rotX, y: rotY });
    setGlare({ x: (x / rect.width) * 100, y: (y / rect.height) * 100, opacity: 1 });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
    setGlare({ ...glare, opacity: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        perspective: '1000px',
        transformStyle: 'preserve-3d',
        cursor: 'pointer',
        height: '100%',
      }}
      animate={{
        rotateX: rotation.x,
        rotateY: rotation.y,
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 20, mass: 0.5 }}
    >
      <div style={{ position: 'relative', height: '100%', transformStyle: 'preserve-3d' }}>
        {children}
        {/* Dynamic Specular Highlight */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            borderRadius: '6px', // match obsidian card borders roughly
            opacity: glare.opacity,
            transition: 'opacity 0.3s ease',
            background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.15) 0%, transparent 50%)`,
            mixBlendMode: 'screen',
            zIndex: 10,
          }}
        />
        {/* Holographic foil overlay effect */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            borderRadius: '6px',
            opacity: glare.opacity * 0.4,
            transition: 'opacity 0.3s ease',
            background: `conic-gradient(from ${glare.x * 3.6}deg at ${glare.x}% ${glare.y}%, rgba(201,169,110,0.1), rgba(120,60,220,0.1), rgba(30,100,200,0.1), rgba(201,169,110,0.1))`,
            mixBlendMode: 'color-dodge',
            zIndex: 9,
          }}
        />
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   Main Page
───────────────────────────────────────────────────────────────────────── */
export default function StorefrontHome() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart]                       = useState([]);
  const [isCartOpen, setIsCartOpen]           = useState(false);
  const [isChatOpen, setIsChatOpen]           = useState(false);
  const [searchQuery, setSearchQuery]         = useState('');
  const [isSearchOpen, setIsSearchOpen]       = useState(false);
  const [showScrollTop, setShowScrollTop]     = useState(false);

  /* Parallax hero scroll */
  const heroRef = useRef(null);
  const { scrollY } = useScroll();
  const heroY       = useTransform(scrollY, [0, 600], [0, 120]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const smoothHeroY = useSpring(heroY, { stiffness: 80, damping: 25 });

  /* Show/hide scroll-to-top */
  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 600);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const filteredProducts = PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addToCart = (product, qty = 1) => {
    setCart(prev => {
      const exists = prev.find(i => i.id === product.id);
      if (exists) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + qty } : i);
      return [...prev, { ...product, qty }];
    });
  };

  const updateQty = (id, qty) => {
    if (qty <= 0) setCart(prev => prev.filter(i => i.id !== id));
    else setCart(prev => prev.map(i => i.id === id ? { ...i, qty } : i));
  };

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <>
      {/* ── Persistent dark background layers ─────────────────────────── */}
      {/* Layer 1: Starfield */}
      <ParticleCanvas />
      {/* Layer 2: Rotating 3-D Globe */}
      <GlobeCanvas />
      {/* Layer 3: Aurora bands */}
      <div className="dark-aurora">
        <div className="aurora-band-1" />
        <div className="aurora-band-2" />
        <div className="aurora-band-3" />
      </div>
      {/* Layer 4: Animated grid mesh */}
      <div className="dark-grid" />
      {/* Layer 5: Floating glowing orbs */}
      <div className="bg-orbs">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
        <div className="orb orb-4" />
      </div>
      {/* Layer 6: Scan beam */}
      <div className="scan-beam" />
      {/* Layer 7: Vignette */}
      <div className="vignette" />

      <div style={{ position: 'relative', zIndex: 1 }}>

        {/* ── Navigation ──────────────────────────────────────────────────── */}
        <nav style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '2.5rem 4rem', position: 'sticky', top: 0, zIndex: 100,
          background: 'rgba(5,5,8,0.80)', backdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(201,169,110,0.15)',
        }}>
          <motion.h1
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
            className="mono" style={{ fontSize: '1.25rem', fontWeight: 600, margin: 0, color: 'var(--accent-brass)' }}>
            NEELORA
          </motion.h1>
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
            className="mono" style={{ display: 'flex', gap: '3rem', alignItems: 'center' }}>
            <a href="#collections" style={{ color: 'var(--text-bone)', transition: 'color 0.3s' }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-brass)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--text-bone)'}>Collections</a>
            <a href="#featured" style={{ color: 'var(--text-bone)', transition: 'color 0.3s' }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-brass)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--text-bone)'}>Exhibits</a>
            <a href="#stats" style={{ color: 'var(--text-bone)', transition: 'color 0.3s' }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-brass)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--text-bone)'}>About</a>
            <button onClick={() => setIsSearchOpen(s => !s)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
              <Search size={18} strokeWidth={1.5} color="var(--accent-brass)" />
            </button>
            <div style={{ position: 'relative', cursor: 'pointer' }} onClick={() => setIsCartOpen(true)}>
              <ShoppingCart size={18} strokeWidth={1} />
              <CartBadge count={cartCount} />
            </div>
          </motion.div>
        </nav>

        {/* Search Bar */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              style={{ overflow: 'hidden', borderBottom: '1px solid #ddd', background: 'rgba(232,228,219,0.95)', backdropFilter: 'blur(10px)', padding: '0 4rem' }}>
              <div style={{ padding: '1.5rem 0', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <Search size={16} color="var(--accent-brass)" />
                <input autoFocus value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search products, categories..."
                  style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', fontFamily: 'IBM Plex Mono', fontSize: '0.85rem', color: '#000', letterSpacing: '0.05em' }} />
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                    <X size={14} />
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Hero with VIDEO background ───────────────────────────────────── */}
        <section ref={heroRef} style={{ position: 'relative', height: '100vh', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {/* Ambient video loop */}
          <video
            autoPlay muted loop playsInline
            style={{
              position: 'absolute', inset: 0, width: '100%', height: '100%',
              objectFit: 'cover', opacity: 0.28,
            }}
          >
            <source src="https://assets.mixkit.co/videos/preview/mixkit-white-particles-sparkling-12-large.mp4" type="video/mp4" />
            <source src="https://assets.mixkit.co/videos/preview/mixkit-abstract-technology-blur-3155-large.mp4" type="video/mp4" />
          </video>

          {/* Gradient overlay */}
          <div className="video-overlay" />
          <div className="hero-gradient" />

          {/* Parallax hero text */}
          <motion.div style={{ y: smoothHeroY, opacity: heroOpacity, textAlign: 'center', position: 'relative', zIndex: 2, padding: '0 4rem' }}>
            <motion.div className="mono"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              style={{ color: 'var(--accent-brass)', marginBottom: '2rem' }}>
              ESTABLISHED MMXXVI · NEELORA
            </motion.div>

            <div style={{ overflow: 'hidden' }}>
              <motion.h2
                initial={{ y: 200 }} animate={{ y: 0 }}
                transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1] }}
                style={{ fontSize: 'clamp(4rem, 10vw, 10rem)', margin: 0, lineHeight: 0.9, fontWeight: 300 }}>
                PRECISION<br />
                <span style={{ fontStyle: 'italic', fontWeight: 200 }}>ORCHESTRATION</span>
              </motion.h2>
            </div>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9, duration: 1 }}
              style={{ maxWidth: '600px', margin: '4rem auto 3rem', fontSize: '1.25rem', color: '#666', lineHeight: 1.6 }}>
              High-fidelity intelligence curated for the modern architectural lifestyle.
              Explore our latest assembly of precision instruments.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.3 }}
              style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
              <PillButton dark onClick={() => document.getElementById('collections').scrollIntoView({ behavior: 'smooth' })}>
                Explore Assembly
              </PillButton>
              <PillButton onClick={() => setIsChatOpen(true)}>
                AI Concierge
              </PillButton>
            </motion.div>
          </motion.div>

          {/* Animated scroll indicator */}
          <motion.div
            animate={{ y: [0, 10, 0] }} transition={{ duration: 1.8, repeat: Infinity }}
            style={{ position: 'absolute', bottom: '2.5rem', left: '50%', transform: 'translateX(-50%)', zIndex: 2 }}>
            <div style={{ width: '1px', height: '50px', background: 'linear-gradient(to bottom, var(--accent-brass), transparent)', margin: '0 auto' }} />
            <div className="mono" style={{ fontSize: '0.55rem', color: 'var(--accent-brass)', marginTop: '0.5rem', letterSpacing: '0.15em' }}>SCROLL</div>
          </motion.div>
        </section>

        {/* Marquee strip */}
        <MarqueeStrip />

        {/* ── Stats Band ──────────────────────────────────────────────────── */}
        <section id="stats" style={{ padding: '6rem 4rem', background: 'rgba(10,10,18,0.85)', backdropFilter: 'blur(10px)', borderTop: '1px solid rgba(201,169,110,0.12)', borderBottom: '1px solid rgba(201,169,110,0.12)', color: 'var(--text-bone)' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem', textAlign: 'center' }}>
            {[
              { label: 'Products', value: 10000, suffix: '+' },
              { label: 'Happy Clients', value: 4800, suffix: '+' },
              { label: 'Countries', value: 38 },
              { label: 'Avg Rating', value: 49, prefix: '', suffix: '/50' },
            ].map((stat, i) => (
              <RevealOnScroll key={i} delay={i * 0.12}>
                <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '3.5rem', fontWeight: 300, color: 'var(--accent-brass)' }}>
                  <AnimatedNumber target={stat.value} prefix={stat.prefix || ''} suffix={stat.suffix || ''} />
                </div>
                <div className="mono" style={{ color: 'rgba(232,228,219,0.5)', marginTop: '0.5rem' }}>{stat.label}</div>
              </RevealOnScroll>
            ))}
          </div>
        </section>

        <div style={{ padding: '0 4rem' }}>
          <div className="shimmer-line" style={{ margin: '0' }} />
        </div>

        {/* ── Product Grid ────────────────────────────────────────────────── */}
        <section id="collections" style={{ padding: '8rem 4rem' }}>
          <RevealOnScroll>
            <SectionTitle subtitle="01 / CURATED">
              {searchQuery ? `Results for "${searchQuery}"` : 'The Collection'}
            </SectionTitle>
          </RevealOnScroll>

          {filteredProducts.length === 0 ? (
            <div className="mono" style={{ textAlign: 'center', color: '#999', padding: '4rem 0' }}>
              NO ITEMS FOUND FOR "{searchQuery}"
            </div>
          ) : (
            <div style={{ background: 'rgba(5,5,8,0.5)', border: '1px solid rgba(201,169,110,0.1)', padding: '2rem', borderRadius: '4px' }}>
              <RenderHUD />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '3rem' }}>
              {filteredProducts.map((product, i) => (
                <RevealOnScroll
                  key={product.id} delay={i * 0.08}
                  direction={i % 2 === 0 ? 'left' : 'right'}
                  style={{
                    gridColumn: i % 3 === 0 ? 'span 5' : i % 3 === 1 ? 'span 7' : 'span 6',
                    marginTop: i % 2 === 0 ? '0' : '6rem',
                    cursor: 'pointer',
                  }}
                >
                  <RenderEngineCard onClick={() => setSelectedProduct(product)}>
                    <ObsidianCard
                      title={product.name}
                      subtitle={`${product.category.toUpperCase()} — ${String(product.id).padStart(3, '0')}`}
                    >
                      {/* Parallax product image */}
                      <ParallaxImage src={product.image} alt={product.name} height="420px" speed={0.12} />

                      {/* Tags */}
                      <div style={{ display: 'flex', gap: '0.5rem', margin: '1.2rem 0 1rem', flexWrap: 'wrap' }}>
                        {product.tags.slice(0, 2).map(t => (
                          <span key={t} className="mono" style={{ fontSize: '0.6rem', color: 'var(--accent-brass)', border: '1px solid var(--accent-brass-muted)', padding: '0.2rem 0.5rem' }}>
                            {t}
                          </span>
                        ))}
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                        <div className="mono" style={{ fontSize: '1.5rem', fontWeight: 400 }}>
                          ${ai.calculateDynamicPrice(product.price, product.demand)}
                        </div>
                        <motion.div whileHover={{ x: 5 }}
                          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                          <span className="mono" style={{ fontSize: '0.7rem' }}>ACQUIRE</span>
                          <ArrowRight size={14} />
                        </motion.div>
                      </div>
                    </ObsidianCard>
                  </RenderEngineCard>
                </RevealOnScroll>
              ))}
            </div>
            </div>
          )}
        </section>

        {/* ── Featured Dark Section ────────────────────────────────────────── */}
        <section id="featured"
          style={{ margin: '0', background: 'var(--bg-obsidian)', color: 'var(--bg-bone)', padding: '15rem 4rem', position: 'relative', overflow: 'hidden' }}>
          {/* Animated background video inside section */}
          <video autoPlay muted loop playsInline
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.10 }}>
            <source src="https://assets.mixkit.co/videos/preview/mixkit-abstract-technology-blur-3155-large.mp4" type="video/mp4" />
          </video>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 100%)', zIndex: 1 }} />

          <div style={{ position: 'relative', zIndex: 2, maxWidth: '1600px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8rem' }}>
            <RevealOnScroll direction="right">
              <div>
                <div className="mono" style={{ color: 'var(--accent-brass)', marginBottom: '2rem' }}>FEATURED EXHIBIT</div>
                <h3 style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)', margin: 0, lineHeight: 1 }}>
                  THE NEELORA<br />NEURAL LINK
                </h3>
                <p style={{ marginTop: '4rem', fontSize: '1.25rem', opacity: 0.8, maxWidth: '500px', lineHeight: 1.7 }}>
                  A breakthrough in cognitive synchronization. EEG-precision biofeedback with real-time brainwave visualization. Experience the edge of human-machine assembly.
                </p>
                <div style={{ marginTop: '4rem' }}>
                  <PillButton
                    style={{ borderColor: 'var(--bg-bone)', color: 'var(--bg-bone)' }}
                    onClick={() => setSelectedProduct(PRODUCTS[5])}>
                    View Neural Link →
                  </PillButton>
                </div>
              </div>
            </RevealOnScroll>

            <RevealOnScroll direction="left" delay={0.1}>
              <motion.div whileHover={{ scale: 1.03 }} transition={{ duration: 0.6 }}
                style={{ overflow: 'hidden', cursor: 'pointer' }}
                onClick={() => setSelectedProduct(PRODUCTS[5])}>
                <img src={PRODUCTS[5].image} alt="Neural Link Headband"
                  style={{ width: '100%', height: '600px', objectFit: 'cover' }} />
              </motion.div>
            </RevealOnScroll>
          </div>
        </section>

        {/* ── Quick Add Grid ───────────────────────────────────────────────── */}
        <section style={{ padding: '8rem 4rem' }}>
          <RevealOnScroll>
            <SectionTitle subtitle="02 / QUICK ACQUIRE">Rapid Assembly</SectionTitle>
          </RevealOnScroll>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
            {PRODUCTS.slice(0, 3).map((product, i) => (
              <RevealOnScroll key={product.id} delay={i * 0.1} direction="up">
                <motion.div
                  whileHover={{ y: -6 }} transition={{ duration: 0.4 }}
                  style={{ cursor: 'pointer' }}
                  onClick={() => setSelectedProduct(product)}>
                  <div style={{ height: '280px', overflow: 'hidden', marginBottom: '1.5rem' }}>
                    <img src={product.image} alt={product.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                      onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.07)'}
                      onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontSize: '1rem', marginBottom: '0.25rem' }}>{product.name}</div>
                      <div className="mono" style={{ color: 'var(--accent-brass)', fontSize: '0.7rem' }}>
                        ${ai.calculateDynamicPrice(product.price, product.demand)}
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.15, rotate: 90 }} whileTap={{ scale: 0.9 }}
                      onClick={e => { e.stopPropagation(); addToCart(product); }}
                      style={{
                        background: 'rgba(201,169,110,0.15)', color: 'var(--accent-brass)',
                        border: '1px solid rgba(201,169,110,0.4)', borderRadius: '50%', width: '40px', height: '40px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                      }}>
                      <Plus size={16} />
                    </motion.button>
                  </div>
                </motion.div>
              </RevealOnScroll>
            ))}
          </div>
        </section>

        {/* ── Studio Showcase (animated product cards) ─────────────────────── */}
        <section style={{ padding: '0 4rem 8rem' }}>
          <RevealOnScroll>
            <div className="shimmer-line" style={{ marginBottom: '6rem' }} />
            <SectionTitle subtitle="03 / EXPERIENCE">Live from the Studio</SectionTitle>
          </RevealOnScroll>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            {[
              { product: PRODUCTS[0], label: 'PRECISION CRAFTED', accent: 'rgba(201,169,110,0.9)' },
              { product: PRODUCTS[2], label: 'WEARABLE FUTURES',  accent: 'rgba(120,180,255,0.9)' },
              { product: PRODUCTS[4], label: 'URBAN ARCHITECTURE', accent: 'rgba(180,120,240,0.9)' },
              { product: PRODUCTS[5], label: 'NEURAL FRONTIERS',  accent: 'rgba(80,220,160,0.9)' },
            ].map((item, i) => (
              <RevealOnScroll key={i} delay={i * 0.12}>
                <motion.div
                  whileHover={{ scale: 1.025 }}
                  transition={{ duration: 0.5 }}
                  onClick={() => setSelectedProduct(item.product)}
                  className="studio-card"
                  style={{ position: 'relative', overflow: 'hidden', height: '340px', cursor: 'pointer' }}
                >
                  {/* Product image */}
                  <motion.img
                    src={item.product.image}
                    alt={item.product.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    whileHover={{ scale: 1.07 }}
                    transition={{ duration: 0.7 }}
                  />
                  {/* Animated scanlines overlay */}
                  <div className="scanlines" />
                  {/* Live indicator */}
                  <div style={{
                    position: 'absolute', top: '1.2rem', left: '1.2rem',
                    display: 'flex', alignItems: 'center', gap: '0.5rem',
                    background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(6px)',
                    padding: '0.3rem 0.75rem', borderRadius: '100px',
                  }}>
                    <motion.span
                      style={{ width: '6px', height: '6px', borderRadius: '50%', background: item.accent, display: 'block' }}
                      animate={{ opacity: [1, 0.2, 1], scale: [1, 1.4, 1] }}
                      transition={{ duration: 1.2, repeat: Infinity }}
                    />
                    <span className="mono" style={{ fontSize: '0.55rem', color: '#fff' }}>LIVE</span>
                  </div>
                  {/* Bottom gradient + label */}
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.1) 55%, transparent 100%)',
                    display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '1.5rem',
                  }}>
                    <div className="mono" style={{ color: item.accent, fontSize: '0.6rem', marginBottom: '0.4rem' }}>{item.label}</div>
                    <div style={{ color: '#fff', fontSize: '1.1rem', fontFamily: 'Playfair Display, serif', fontWeight: 300 }}>
                      {item.product.name}
                    </div>
                    <div className="mono" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.65rem', marginTop: '0.4rem' }}>
                      ${ai.calculateDynamicPrice(item.product.price, item.product.demand)}
                    </div>
                  </div>
                  {/* Corner bracket decoration */}
                  <div style={{ position: 'absolute', top: '1rem', right: '1rem', width: '20px', height: '20px',
                    borderTop: `1px solid ${item.accent}`, borderRight: `1px solid ${item.accent}` }} />
                  <div style={{ position: 'absolute', bottom: '1rem', left: '1rem', width: '20px', height: '20px',
                    borderBottom: `1px solid ${item.accent}`, borderLeft: `1px solid ${item.accent}` }} />
                </motion.div>
              </RevealOnScroll>
            ))}
          </div>
        </section>

        {/* ── AI Concierge footer ──────────────────────────────────────────── */}
        <footer style={{ padding: '8rem 4rem', display: 'flex', justifyContent: 'center', borderTop: '1px solid rgba(201,169,110,0.15)' }}>
          <RevealOnScroll>
            <motion.div
              onClick={() => setIsChatOpen(true)}
              whileHover={{ scale: 1.04 }}
              className="mono"
              style={{
                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '1rem',
                borderBottom: '1px solid rgba(201,169,110,0.5)', paddingBottom: '0.5rem',
                color: 'var(--text-muted)', transition: 'color 0.3s',
              }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-brass)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
            >
              <Sparkles size={16} />
              CONNECT WITH NEELORA CONCIERGE [+]
            </motion.div>
          </RevealOnScroll>
        </footer>

        {/* ── Sidebars & Modals ────────────────────────────────────────────── */}

        {/* Backdrop */}
        <AnimatePresence>
          {(isCartOpen || isChatOpen) && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => { setIsCartOpen(false); setIsChatOpen(false); }}
              style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.35)', zIndex: 3000 }} />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isCartOpen && (
            <CartSidebar
              cart={cart} onClose={() => setIsCartOpen(false)}
              onUpdateQty={updateQty}
              onRemove={id => setCart(prev => prev.filter(i => i.id !== id))} />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isChatOpen && <ConciergeChat onClose={() => setIsChatOpen(false)} />}
        </AnimatePresence>

        <AnimatePresence>
          {selectedProduct && (
            <ProductModal
              product={selectedProduct}
              onClose={() => setSelectedProduct(null)}
              onAddToCart={(product, qty) => {
                addToCart(product, qty);
                setSelectedProduct(null);
                setIsCartOpen(true);
              }} />
          )}
        </AnimatePresence>
      </div>

      {/* ── Scroll-to-top button ────────────────────────────────────────────── */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="scroll-top-btn"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <ChevronUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
