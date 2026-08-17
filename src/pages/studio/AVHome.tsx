import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Phone, ArrowRight } from 'lucide-react';
import AVHero from './AVHero';
import AVStats from './AVStats';
import AVServices from './AVServices';
import AVPortfolio from './AVPortfolio';
import AVTestimonials from './AVTestimonials';
import { AV, AV_FONTS } from './avTheme';

function CTASection() {
  return (
    <section style={{ padding: '7rem 2rem', background: `linear-gradient(135deg, ${AV.bgTint} 0%, ${AV.bgCoral} 100%)`, position: 'relative', overflow: 'hidden' }}>
      {/* Blob décoratif */}
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute', top: '-10%', right: '-5%', width: 400, height: 400,
          borderRadius: '50%', background: `radial-gradient(circle, ${AV.primary}20 0%, transparent 70%)`,
          pointerEvents: 'none',
        }}
      />
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        style={{
          position: 'absolute', bottom: '-10%', left: '-5%', width: 350, height: 350,
          borderRadius: '50%', background: `radial-gradient(circle, ${AV.coral}20 0%, transparent 70%)`,
          pointerEvents: 'none',
        }}
      />
      <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 2 }}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <span style={{ fontFamily: AV_FONTS.mono, fontSize: '0.75rem', color: AV.primary, letterSpacing: '0.2em' }}>
            // COMMENÇONS ENSEMBLE
          </span>
          <h2 style={{
            fontFamily: AV_FONTS.display, fontWeight: 800,
            fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: AV.text,
            marginTop: 12, marginBottom: '1.5rem', lineHeight: 1.1, letterSpacing: '-0.02em',
          }}>
            Prêt à donner vie à<br />
            <span style={{
              background: AV.gradientText,
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>
              votre vision ?
            </span>
          </h2>
          <p style={{
            fontFamily: AV_FONTS.body, fontSize: '1.1rem', color: AV.textDim,
            maxWidth: 500, margin: '0 auto 2.5rem', lineHeight: 1.7,
          }}>
            Discutons de votre projet autour d'un café. Premier rendez-vous offert.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}>
              <Link to="/audiovisuel/contact"
                style={{
                  background: AV.gradient, color: '#fff', padding: '0.9rem 2.2rem', borderRadius: 12,
                  fontFamily: AV_FONTS.display, fontWeight: 700, fontSize: '0.95rem',
                  textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8,
                  boxShadow: `0 8px 30px ${AV.primary}25`,
                }}>
                Démarrer un projet <ArrowRight size={17} />
              </Link>
            </motion.div>
            <motion.a whileHover={{ scale: 1.04, y: -2 }} href="https://wa.me/2250788043360" target="_blank" rel="noopener noreferrer"
              style={{
                background: AV.white, color: AV.text, padding: '0.9rem 2.2rem', borderRadius: 12,
                border: `1px solid ${AV.glassBorder}`, fontFamily: AV_FONTS.display, fontWeight: 600,
                fontSize: '0.95rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8,
                boxShadow: AV.shadow,
              }}>
              <Phone size={17} color={AV.primary} /> WhatsApp
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function AVHome() {
  return (
    <>
      <AVHero />
      <AVStats />
      <AVServices />
      <AVPortfolio />
      <AVTestimonials />
      <CTASection />
    </>
  );
}
