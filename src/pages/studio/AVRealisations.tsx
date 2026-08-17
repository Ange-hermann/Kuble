import { motion } from 'framer-motion';
import AVPortfolio from './AVPortfolio';
import { AV, AV_FONTS } from './avTheme';

export default function AVRealisations() {
  return (
    <div style={{ background: AV.bg }}>
      {/* Hero avec image immersive */}
      <section style={{
        padding: '140px 2rem 3rem', position: 'relative', overflow: 'hidden',
        minHeight: 400,
      }}>
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: [1.1, 1, 1.1] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'url(https://images.unsplash.com/photo-1452587925148-ce544e77e70d?q=80&w=1920&auto=format&fit=crop)',
            backgroundSize: 'cover', backgroundPosition: 'center', zIndex: 0,
          }}
        />
        <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'linear-gradient(180deg, rgba(26,26,46,0.6) 0%, rgba(26,26,46,0.4) 50%, rgba(26,26,46,0.7) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: `linear-gradient(135deg, ${AV.coral}30 0%, transparent 50%, ${AV.primary}25 100%)` }} />
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 2 }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span style={{ fontFamily: AV_FONTS.mono, fontSize: '0.75rem', color: 'rgba(255,255,255,0.8)', letterSpacing: '0.2em' }}>// PORTFOLIO</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
            style={{
              fontFamily: AV_FONTS.display, fontWeight: 800,
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', color: '#fff',
              lineHeight: 1.05, marginTop: 12, marginBottom: '1.5rem', letterSpacing: '-0.02em',
            }}>
            Nos{' '}
            <span style={{ background: AV.gradientText, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              réalisations
            </span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            style={{ fontFamily: AV_FONTS.body, fontSize: '1.15rem', color: 'rgba(255,255,255,0.8)', lineHeight: 1.8, maxWidth: 600, margin: '0 auto' }}>
            Une sélection de projets qui parlent d'eux-mêmes. Filtrez par catégorie pour explorer notre travail.
          </motion.p>
        </div>
      </section>
      <AVPortfolio />
    </div>
  );
}
