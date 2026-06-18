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
