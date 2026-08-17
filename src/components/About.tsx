import { motion } from 'framer-motion';
import HoloCube from './HoloCube';
import { COLORS, FONTS } from '../theme/colors';

export default function About() {
  return (
    <section id="apropos" style={{ padding: '6rem 2rem', background: 'linear-gradient(180deg, #E8F0FE 0%, #F0F5FF 100%)' }}>
      <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}
        >
          <HoloCube size={72} color={COLORS.electric} />

          <div>
            <span style={{ fontFamily: FONTS.mono, fontSize: '0.78rem', color: COLORS.electric, letterSpacing: '0.2em', display: 'block', marginBottom: 12 }}>
              // À PROPOS
            </span>
            <h2 style={{ fontFamily: FONTS.display, fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 3rem)', color: COLORS.navyDeep, letterSpacing: '-0.02em', marginBottom: '1.5rem' }}>
              Nés en Afrique, pensés pour l'Afrique
            </h2>
          </div>

          <p style={{ fontFamily: FONTS.body, fontSize: '1.1rem', color: 'rgba(10,22,80,0.7)', lineHeight: 1.8, maxWidth: 640 }}>
            <strong style={{ color: COLORS.navyDeep }}>Fondée à <span style={{ color: COLORS.electric }}>Abidjan en 2022</span>, Kuble porte une conviction : l'Afrique mérite une technologie de classe mondiale, bâtie par ses propres talents.</strong>
          </p>

          <p style={{ fontFamily: FONTS.body, fontSize: '1.05rem', color: 'rgba(10,22,80,0.6)', lineHeight: 1.8, maxWidth: 600 }}>
            Situé en <strong style={{ color: COLORS.electric }}>Côte d'Ivoire</strong>, nous accompagnons entreprises, startups et institutions dans leur transformation numérique — avec des solutions ancrées dans les réalités du continent, au service de sa <strong style={{ color: COLORS.electric }}>souveraineté digitale</strong>.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
