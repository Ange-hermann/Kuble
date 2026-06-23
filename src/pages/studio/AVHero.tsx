import { motion } from 'framer-motion';
import { Play, Phone, ArrowRight, ChevronDown } from 'lucide-react';

const G = '#e8c84a';
const BLUE = '#4d9eff';
const NEON = '#33d4ff';

const clients = ['RTI', 'Canal+', 'BBC Africa', 'Orange CI', 'MTN', 'NSIA', 'BNI', 'Moov Africa', 'CIE', 'SIB'];

export default function AVHero() {
  const go = (href: string) => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="av-hero" style={{
      minHeight: '100vh', position: 'relative', display: 'flex',
      flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      overflow: 'hidden', background: '#0c1a3e',
    }}>
      {/* Background gradient cinematique */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(135deg, #06102a 0%, #0c1a3e 40%, #071228 100%)',
      }} />
      {/* Grain overlay */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.04, pointerEvents: 'none',
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        backgroundSize: '200px 200px',
      }} />
      {/* Orbs */}
      <div style={{ position: 'absolute', top: '20%', left: '10%', width: 400, height: 400, borderRadius: '50%', background: `radial-gradient(circle, ${BLUE}22 0%, transparent 70%)`, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '20%', right: '10%', width: 300, height: 300, borderRadius: '50%', background: `radial-gradient(circle, ${NEON}12 0%, transparent 70%)`, pointerEvents: 'none' }} />

      {/* Film lines */}
      {[20, 40, 60, 80].map(x => (
        <div key={x} style={{ position: 'absolute', left: `${x}%`, top: 0, bottom: 0, width: 1, background: `linear-gradient(to bottom, transparent, ${BLUE}10, transparent)`, pointerEvents: 'none' }} />
      ))}

      {/* Contenu */}
      <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: 860, padding: '90px 2rem 0' }}>
        {/* Titre */}
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.15 }}
          style={{
            fontFamily: 'Space Grotesk', fontWeight: 800,
            fontSize: 'clamp(2.8rem, 7vw, 5.5rem)',
            lineHeight: 1.05, color: '#fff', marginBottom: '1.5rem',
          }}>
          Votre Histoire Mérite<br />
          D'être{' '}
          <span style={{
            display: 'inline-block',
            background: `linear-gradient(90deg, ${G} 0%, ${NEON} 50%, ${BLUE} 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            paddingRight: '4px',
          }}>
            Racontée.
          </span>
        </motion.h1>

        {/* Sous-titre */}
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          style={{ fontFamily: 'Inter', fontSize: '1.1rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.8, marginBottom: '2.5rem', maxWidth: 580, margin: '0 auto 2.5rem' }}>
          Couverture médiatique, production vidéo, gestion de contenu —<br />
          nous donnons vie à votre communication.
        </motion.p>

        {/* Boutons */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
          style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '4rem' }}>
          <motion.button whileHover={{ scale: 1.04, boxShadow: `0 0 30px ${G}55` }} whileTap={{ scale: 0.97 }}
            onClick={() => go('#av-portfolio')}
            style={{ background: `linear-gradient(135deg, ${BLUE}, ${G})`, color: '#0c1a3e', padding: '0.85rem 2rem', borderRadius: 10, border: 'none', fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: '0.95rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
            Voir nos réalisations <ArrowRight size={17} />
          </motion.button>
          <motion.a whileHover={{ scale: 1.04 }} href="https://wa.me/2250788043360" target="_blank" rel="noopener noreferrer"
            style={{ background: 'rgba(77,158,255,0.12)', color: '#fff', padding: '0.85rem 2rem', borderRadius: 10, border: `1px solid ${BLUE}55`, fontFamily: 'Space Grotesk', fontWeight: 600, fontSize: '0.95rem', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
            <Phone size={17} /> Nous appeler
          </motion.a>
        </motion.div>

        {/* Play reel */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: '5rem' }}>
          <motion.button onClick={() => go('#av-portfolio')}
            whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
            style={{ width: 54, height: 54, borderRadius: '50%', border: `2px solid ${BLUE}`, background: `${BLUE}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <Play size={20} color={BLUE} fill={BLUE} style={{ marginLeft: 3 }} />
          </motion.button>
          <span style={{ fontFamily: 'Inter', fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)' }}>Voir le showreel 2024</span>
        </motion.div>
      </div>

      {/* Barre défilante clients */}
      <div style={{ position: 'absolute', bottom: 60, left: 0, right: 0, overflow: 'hidden', borderTop: `1px solid ${BLUE}22`, borderBottom: `1px solid ${BLUE}22`, padding: '12px 0', background: 'rgba(12,26,62,0.7)' }}>
        <motion.div
          animate={{ x: [0, -1200] }} transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
          style={{ display: 'flex', gap: '4rem', whiteSpace: 'nowrap', width: 'max-content' }}>
          {[...clients, ...clients].map((c, i) => (
            <span key={i} style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: '0.85rem', color: `${BLUE}99`, letterSpacing: '0.15em' }}>{c}</span>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}
        onClick={() => go('#av-stats')}
        style={{ position: 'absolute', bottom: 14, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, cursor: 'pointer', color: 'rgba(255,255,255,0.35)', zIndex: 3 }}>
        <span style={{ fontFamily: 'JetBrains Mono', fontSize: '0.6rem', letterSpacing: '0.2em' }}>SCROLL</span>
        <ChevronDown size={16} />
      </motion.div>
    </section>
  );
}
