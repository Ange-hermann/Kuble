import { useEffect, useRef, useMemo } from 'react';
import HeroScene from './HeroScene';
import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle, ChevronDown } from 'lucide-react';

/* ── Particles ── */
function Particles() {
  const particles = useMemo(() =>
    Array.from({ length: 80 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2.5 + 0.5,
      duration: Math.random() * 4 + 2,
      delay: Math.random() * 4,
      color: Math.random() > 0.6 ? '#D4AF37' : Math.random() > 0.5 ? '#00A3FF' : '#ffffff',
    })), []);

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {particles.map((p) => (
        <div
          key={p.id}
          className="star"
          style={{
            left: `${p.x}%`, top: `${p.y}%`,
            width: p.size, height: p.size,
            background: p.color,
            '--duration': `${p.duration}s`,
            '--delay': `${p.delay}s`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}

/* ── Africa SVG Map (unused) ── */
function _AfricaMap() {
  const cities = [
    { name: 'Abidjan', x: 145, y: 295 },
    { name: 'Lagos', x: 210, y: 285 },
    { name: 'Dakar', x: 100, y: 215 },
    { name: 'Accra', x: 175, y: 295 },
    { name: 'Nairobi', x: 310, y: 340 },
    { name: 'Casablanca', x: 155, y: 125 },
  ];

  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: 480 }}>
      <svg
        viewBox="0 0 480 560"
        style={{ width: '100%', height: 'auto', filter: 'drop-shadow(0 0 30px rgba(26,107,255,0.25))' }}
      >
        <defs>
          <linearGradient id="mapGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1A6BFF" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#00A3FF" stopOpacity="0.3" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Africa continent outline (simplified wireframe) */}
        <path
          d="M155,80 L200,60 L240,65 L275,75 L295,90 L310,110 L320,140 L330,170
             L340,200 L345,230 L342,260 L338,285 L330,310 L320,335 L315,360
             L310,385 L300,415 L285,440 L265,460 L245,480 L225,490 L210,485
             L195,475 L180,455 L165,430 L150,400 L140,370 L132,340 L128,310
             L120,280 L110,255 L100,230 L95,205 L98,180 L105,158 L112,138
             L120,118 L130,100 L140,88 Z"
          fill="none"
          stroke="url(#mapGrad)"
          strokeWidth="1.5"
          filter="url(#glow)"
          strokeDasharray="8 4"
        />

        {/* Inner grid lines */}
        {[120,160,200,240,280,320].map((y) => (
          <line key={`h${y}`} x1="100" y1={y} x2="350" y2={y}
            stroke="#1A6BFF" strokeWidth="0.4" strokeOpacity="0.25" />
        ))}
        {[140,180,220,260,300].map((x) => (
          <line key={`v${x}`} x1={x} y1="70" x2={x} y2="490"
            stroke="#1A6BFF" strokeWidth="0.4" strokeOpacity="0.25" />
        ))}

        {/* Connection lines between cities */}
        {cities.map((city, i) =>
          cities.slice(i + 1).map((other, j) => {
            const dist = Math.hypot(city.x - other.x, city.y - other.y);
            if (dist > 200) return null;
            return (
              <motion.line
                key={`${i}-${j}`}
                x1={city.x} y1={city.y} x2={other.x} y2={other.y}
                stroke="#00A3FF" strokeWidth="0.8" strokeOpacity="0.35"
                strokeDasharray="4 3"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2.5, delay: i * 0.3, ease: 'easeInOut' }}
              />
            );
          })
        )}

        {/* City dots + pulse */}
        {cities.map((city, i) => (
          <g key={city.name}>
            <motion.circle
              cx={city.x} cy={city.y} r="10"
              fill="#00A3FF" fillOpacity="0"
              stroke="#00A3FF" strokeWidth="1"
              initial={{ r: 4, opacity: 0.6 }}
              animate={{ r: [4, 14, 4], opacity: [0.6, 0, 0.6] }}
              transition={{ duration: 2.5, delay: i * 0.4, repeat: Infinity }}
            />
            <circle cx={city.x} cy={city.y} r="4" fill="#00A3FF"
              style={{ filter: 'drop-shadow(0 0 6px #00A3FF)' }} />
            <text x={city.x + 8} y={city.y - 6}
              fill="#E8F4FF" fontSize="9" fontFamily="JetBrains Mono" opacity="0.8">
              {city.name}
            </text>
          </g>
        ))}
      </svg>

      {/* Floating cubes above cities */}
      {cities.slice(0, 4).map((city, i) => (
        <motion.div
          key={city.name}
          animate={{ y: [0, -10, 0], rotateZ: [0, 5, -5, 0] }}
          transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.7 }}
          style={{
            position: 'absolute',
            left: `${(city.x / 480) * 100}%`,
            top: `${(city.y / 560) * 100 - 8}%`,
            transform: 'translate(-50%, -100%)',
          }}
        >
          <div style={{ perspective: 60 }}>
            <motion.div
              animate={{ rotateX: [0, 360], rotateY: [0, 360] }}
              transition={{ duration: 5 + i, repeat: Infinity, ease: 'linear' }}
              style={{
                width: 18, height: 18,
                background: 'linear-gradient(135deg, rgba(26,107,255,0.7), rgba(0,163,255,0.7))',
                border: '1px solid #00A3FF',
                borderRadius: 3,
                boxShadow: '0 0 12px rgba(0,163,255,0.8)',
              }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default function Hero() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleParallax = () => {
      if (scrollRef.current) {
        scrollRef.current.style.transform = `translateY(${window.scrollY * 0.3}px)`;
      }
    };
    window.addEventListener('scroll', handleParallax, { passive: true });
    return () => window.removeEventListener('scroll', handleParallax);
  }, []);

  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh', position: 'relative',
        display: 'flex', alignItems: 'center',
        background: 'linear-gradient(180deg, #07122e 0%, #0d1e50 60%, #07122e 100%)',
        overflow: 'hidden',
      }}
    >
      <Particles />

      {/* Glow orbs */}
      <div style={{
        position: 'absolute', top: '20%', left: '10%',
        width: 400, height: 400, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(26,107,255,0.12) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '20%', right: '10%',
        width: 300, height: 300, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{
        maxWidth: 1280, margin: '0 auto', padding: '6rem 2rem 4rem',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '4rem',
        alignItems: 'center',
        width: '100%',
        position: 'relative', zIndex: 1,
      }}>
        {/* Hero 3D Scene */}
        <motion.div
          className="africa-map-container"
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
          style={{ display: 'flex', justifyContent: 'center', height: 480 }}
        >
          <HeroScene />
        </motion.div>

        {/* Text content */}
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{
              fontFamily: 'Space Grotesk', fontWeight: 700,
              fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
              lineHeight: 1.1, marginBottom: '1.5rem',
              color: '#E8F4FF',
            }}
          >
            L'Afrique Se Connecte.{' '}
            <br />
            Kuble La{' '}
            <span className="gradient-text">Propulse.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            style={{
              fontFamily: 'Inter', fontSize: '1.1rem',
              color: 'rgba(232,244,255,0.7)', lineHeight: 1.7,
              marginBottom: '2.5rem', maxWidth: 480,
            }}
          >
            Développement web & app, cybersécurité et intelligence artificielle —
            au service de la transformation numérique africaine.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}
          >
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="btn-primary"
              onClick={() => document.querySelector('#projets')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Voir nos projets <ArrowRight size={18} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="btn-outline"
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Nous contacter <MessageCircle size={18} />
            </motion.button>
          </motion.div>

          {/* Slogan */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            style={{
              marginTop: '3rem', display: 'flex', gap: '1rem', flexWrap: 'wrap',
              fontFamily: 'JetBrains Mono', fontSize: '0.7rem',
              color: 'rgba(232,244,255,0.4)', letterSpacing: '0.15em',
            }}
          >
            {['CONNECTER', 'ORCHESTRER', 'PROPULSER'].map((word, i) => (
              <span key={word}>
                <span style={{ color: '#D4AF37' }}>{'// '}</span>
                {word}
                {i < 2 && <span style={{ color: '#1A6BFF', margin: '0 0.5rem' }}>·</span>}
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{
          position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
          color: 'rgba(232,244,255,0.4)', cursor: 'pointer', zIndex: 2,
        }}
        onClick={() => document.querySelector('#stats')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <span style={{ fontFamily: 'JetBrains Mono', fontSize: '0.7rem', letterSpacing: '0.1em' }}>
          SCROLL
        </span>
        <ChevronDown size={18} />
      </motion.div>

      <style>{`
        @media (max-width: 768px) {
          .africa-map-container { display: none !important; }
        }
      `}</style>
    </section>
  );
}
