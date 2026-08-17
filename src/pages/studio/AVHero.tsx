import { motion } from 'framer-motion';
import { Play, Phone, ArrowRight, ChevronDown } from 'lucide-react';
import { AV, AV_FONTS } from './avTheme';

const clients = ['RTI', 'Canal+', 'BBC Africa', 'Orange CI', 'MTN', 'NSIA', 'BNI', 'Moov Africa', 'CIE', 'SIB'];

const HERO_IMG = 'https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

export default function AVHero() {
  const go = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="av-hero" style={{
      minHeight: '100vh', position: 'relative', display: 'flex',
      flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      overflow: 'hidden',
    }}>
      {/* Image immersive plein écran */}
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: [1.1, 1, 1.1] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url(${HERO_IMG})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 0,
        }}
      />

      {/* Overlay gradient sombre pour lisibilité */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: `linear-gradient(180deg, rgba(26,26,46,0.5) 0%, rgba(26,26,46,0.3) 40%, rgba(26,26,46,0.7) 100%)`,
      }} />

      {/* Overlay couleur indigo/corail */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: `linear-gradient(135deg, ${AV.primary}30 0%, transparent 50%, ${AV.coral}25 100%)`,
      }} />

      {/* Blobs animés par-dessus l'image */}
      <motion.div
        animate={{ x: [0, 60, 0], y: [0, -40, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute', top: '10%', left: '5%', width: 400, height: 400, zIndex: 1,
          borderRadius: '50%', background: `radial-gradient(circle, ${AV.primary}30 0%, transparent 70%)`,
          pointerEvents: 'none',
        }}
      />
      <motion.div
        animate={{ x: [0, -50, 0], y: [0, 60, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        style={{
          position: 'absolute', bottom: '15%', right: '8%', width: 350, height: 350, zIndex: 1,
          borderRadius: '50%', background: `radial-gradient(circle, ${AV.coral}25 0%, transparent 70%)`,
          pointerEvents: 'none',
        }}
      />

      {/* Contenu overlay */}
      <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: 860, padding: '90px 2rem 0' }}>
        {/* Badge */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(12px)',
            border: `1px solid rgba(255,255,255,0.25)`, borderRadius: 100,
            padding: '0.4rem 1rem', marginBottom: '2.5rem',
          }}>
          <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }}
            style={{ width: 8, height: 8, borderRadius: '50%', background: AV.coral }} />
          <span style={{ fontFamily: AV_FONTS.mono, fontSize: '0.72rem', color: 'rgba(255,255,255,0.9)', letterSpacing: '0.1em' }}>
            Agence audiovisuelle · Abidjan
          </span>
        </motion.div>

        {/* Boutons */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
          <motion.button whileHover={{ scale: 1.04, boxShadow: `0 12px 40px ${AV.primary}55` }} whileTap={{ scale: 0.97 }}
            onClick={() => go('#av-portfolio')}
            style={{
              background: AV.gradient, color: '#fff', padding: '0.9rem 2.2rem', borderRadius: 12,
              border: 'none', fontFamily: AV_FONTS.display, fontWeight: 700, fontSize: '0.95rem',
              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8,
              boxShadow: `0 8px 30px ${AV.primary}40`,
            }}>
            Voir nos réalisations <ArrowRight size={17} />
          </motion.button>
          <motion.a whileHover={{ scale: 1.04, y: -2 }} href="https://wa.me/2250788043360" target="_blank" rel="noopener noreferrer"
            style={{
              background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(12px)',
              color: '#fff', padding: '0.9rem 2.2rem', borderRadius: 12,
              border: `1px solid rgba(255,255,255,0.25)`, fontFamily: AV_FONTS.display, fontWeight: 600,
              fontSize: '0.95rem', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8,
            }}>
            <Phone size={17} color="#fff" /> Nous appeler
          </motion.a>
        </motion.div>

        {/* Play reel */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: '4rem' }}>
          <motion.button onClick={() => go('#av-portfolio')}
            whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.95 }}
            style={{
              width: 64, height: 64, borderRadius: '50%', border: `2px solid rgba(255,255,255,0.6)`,
              background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer',
            }}>
            <Play size={26} color="#fff" fill="#fff" style={{ marginLeft: 3 }} />
          </motion.button>
          <span style={{ fontFamily: AV_FONTS.body, fontSize: '0.9rem', color: 'rgba(255,255,255,0.8)' }}>Voir le showreel 2025</span>
        </motion.div>
      </div>

      {/* Barre défilante clients */}
      <div style={{
        position: 'absolute', bottom: 60, left: 0, right: 0, overflow: 'hidden',
        borderTop: `1px solid rgba(255,255,255,0.15)`, borderBottom: `1px solid rgba(255,255,255,0.15)`,
        padding: '14px 0', background: 'rgba(26,26,46,0.4)', backdropFilter: 'blur(8px)',
      }}>
        <motion.div
          animate={{ x: [0, -1200] }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          style={{ display: 'flex', gap: '4rem', whiteSpace: 'nowrap', width: 'max-content' }}>
          {[...clients, ...clients].map((c, i) => (
            <span key={i} style={{
              fontFamily: AV_FONTS.display, fontWeight: 700, fontSize: '0.85rem',
              color: 'rgba(255,255,255,0.6)', letterSpacing: '0.15em',
            }}>{c}</span>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}
        onClick={() => go('#av-stats')}
        style={{
          position: 'absolute', bottom: 14, left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
          cursor: 'pointer', color: 'rgba(255,255,255,0.6)', zIndex: 3,
        }}>
        <span style={{ fontFamily: AV_FONTS.mono, fontSize: '0.6rem', letterSpacing: '0.2em' }}>SCROLL</span>
        <ChevronDown size={16} />
      </motion.div>
    </section>
  );
}
