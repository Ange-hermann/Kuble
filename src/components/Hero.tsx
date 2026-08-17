import { useEffect, useRef, useMemo } from 'react';
import HeroScene from './HeroScene';
import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle, ChevronDown } from 'lucide-react';
import { COLORS, FONTS } from '../theme/colors';

const HERO_IMG = 'https://images.unsplash.com/photo-1451187580459-9546f14082b5?w=1600&q=80';

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
      color: Math.random() > 0.6 ? '#5BC8F2' : Math.random() > 0.5 ? '#1B6FE0' : '#ffffff',
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


export default function Hero() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isMobile = window.innerWidth <= 768;
    if (isMobile) return;
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
        overflow: 'hidden',
      }}
    >
      {/* Background image */}
      <motion.div
        ref={scrollRef}
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 6, ease: 'easeOut' }}
        style={{ position: 'absolute', inset: 0, zIndex: 0 }}
      >
        <img src={HERO_IMG} alt=""
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </motion.div>

      {/* Dark overlay gradients for readability */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'linear-gradient(135deg, rgba(10,22,80,0.88) 0%, rgba(13,27,76,0.72) 40%, rgba(27,111,224,0.3) 100%)',
      }} />
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'linear-gradient(180deg, rgba(10,22,80,0.4) 0%, transparent 30%, transparent 70%, rgba(10,22,80,0.7) 100%)',
      }} />

      {/* Aurora glows */}
      <motion.div
        animate={{ x: [0, 80, 0], y: [0, -40, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute', top: '-10%', left: '5%', width: 500, height: 500,
          borderRadius: '50%', filter: 'blur(80px)', zIndex: 1,
          background: 'radial-gradient(circle, rgba(91,200,242,0.22) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <motion.div
        animate={{ x: [0, -60, 0], y: [0, 50, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute', top: '20%', right: '0%', width: 450, height: 450,
          borderRadius: '50%', filter: 'blur(90px)', zIndex: 1,
          background: 'radial-gradient(circle, rgba(27,111,224,0.16) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Grid overlay */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.04, zIndex: 1,
        backgroundImage: `linear-gradient(${COLORS.cyan} 1px, transparent 1px), linear-gradient(90deg, ${COLORS.cyan} 1px, transparent 1px)`,
        backgroundSize: '50px 50px', pointerEvents: 'none',
      }} />

      <Particles />

      <div style={{
        maxWidth: 1280, margin: '0 auto', padding: '6rem 2rem 4rem',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))',
        gap: '4rem',
        alignItems: 'center',
        width: '100%',
        position: 'relative', zIndex: 3,
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
              fontFamily: FONTS.display, fontWeight: 800,
              fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
              lineHeight: 1.05, marginBottom: '1.5rem',
              color: COLORS.white, letterSpacing: '-0.02em',
            }}
          >
            L'Afrique Se Connecte.{' '}
            <br />
            Kuble La{' '}
            <span style={{
              background: `linear-gradient(135deg, ${COLORS.cyan} 0%, ${COLORS.electricLt} 100%)`,
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              filter: `drop-shadow(0 0 20px ${COLORS.cyanGlow})`,
            }}>Propulse.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            style={{
              fontFamily: FONTS.body, fontSize: '1.1rem',
              color: 'rgba(255,255,255,0.8)', lineHeight: 1.7,
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
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => document.querySelector('#projets')?.scrollIntoView({ behavior: 'smooth' })}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: `linear-gradient(135deg, ${COLORS.electric}, ${COLORS.cyan})`,
                color: '#fff', padding: '0.9rem 2.2rem', borderRadius: 12,
                fontFamily: FONTS.display, fontWeight: 700, fontSize: '1.05rem',
                border: 'none', cursor: 'pointer',
                boxShadow: `0 8px 30px rgba(91,200,242,0.4)`,
                transition: 'all 0.3s',
              }}
            >
              Voir nos projets <ArrowRight size={18} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                color: COLORS.whiteSoft, border: '1px solid rgba(255,255,255,0.25)',
                padding: '0.9rem 2.2rem', borderRadius: 12,
                fontFamily: FONTS.display, fontWeight: 600, fontSize: '1.05rem',
                background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)',
                cursor: 'pointer', transition: 'all 0.3s',
              }}
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
              color: 'rgba(255,255,255,0.4)', letterSpacing: '0.15em',
            }}
          >
            {['CONNECTER', 'ORCHESTRER', 'PROPULSER'].map((word, i) => (
              <span key={word}>
                <span style={{ color: '#5BC8F2' }}>{'// '}</span>
                {word}
                {i < 2 && <span style={{ color: '#1B6FE0', margin: '0 0.5rem' }}>·</span>}
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
          color: 'rgba(255,255,255,0.5)', cursor: 'pointer', zIndex: 3,
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
          .star { display: none !important; }
        }
      `}</style>
    </section>
  );
}
