import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { AV, AV_FONTS } from './avTheme';

const testimonials = [
  { stars: 5, quote: 'Leur couverture de notre gala était parfaite. Les vidéos livrées ont été partagées des milliers de fois.', name: 'Directrice Communication', company: 'Groupe Industriel CI', initials: 'DC', color: AV.primary },
  { stars: 5, quote: 'En 3 mois de gestion de nos réseaux, notre communauté a doublé et nos ventes ont augmenté de 35%.', name: 'CEO', company: 'Startup FinTech Abidjan', initials: 'CF', color: AV.coral },
  { stars: 5, quote: 'Le spot publicitaire réalisé pour notre lancement a été diffusé sur RTI et a surpassé toutes nos attentes.', name: 'Responsable Marketing', company: 'Marque FMCG', initials: 'RM', color: AV.turquoise },
  { stars: 5, quote: 'Professionnalisme, créativité et réactivité. Nous travaillons ensemble depuis 2 ans.', name: 'Organisatrice d\'Événements', company: 'Event Pro Africa', initials: 'OE', color: AV.primary },
];

export default function AVTestimonials() {
  const [idx, setIdx] = useState(0);
  const prev = () => setIdx(i => (i - 1 + testimonials.length) % testimonials.length);
  const next = () => setIdx(i => (i + 1) % testimonials.length);
  const t = testimonials[idx];

  return (
    <section id="av-testimonials" style={{ padding: '7rem 2rem', background: AV.bgTurquoise }}>
      <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ marginBottom: '3.5rem' }}>
          <span style={{ fontFamily: AV_FONTS.mono, fontSize: '0.75rem', color: AV.primary, letterSpacing: '0.2em' }}>// TÉMOIGNAGES</span>
          <h2 style={{ fontFamily: AV_FONTS.display, fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 3rem)', color: AV.text, marginTop: 12 }}>
            Ils nous font confiance
          </h2>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div key={idx}
            initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.4 }}
            style={{
              background: AV.white, border: `1px solid ${AV.glassBorder}`,
              borderRadius: 24, padding: '3rem 3.5rem', position: 'relative',
              boxShadow: AV.shadow,
            }}>
            {/* Étoiles */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: 4, marginBottom: '1.5rem' }}>
              {Array.from({ length: t.stars }).map((_, i) => (
                <Star key={i} size={18} color={AV.coral} fill={AV.coral} />
              ))}
            </div>

            {/* Citation */}
            <p style={{
              fontFamily: AV_FONTS.display, fontStyle: 'italic',
              fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)', color: AV.text,
              lineHeight: 1.7, marginBottom: '2rem',
            }}>
              "{t.quote}"
            </p>

            {/* Auteur */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14 }}>
              <div style={{
                width: 48, height: 48, borderRadius: '50%',
                background: `${t.color}15`, border: `2px solid ${t.color}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: AV_FONTS.display, fontWeight: 700, fontSize: '0.9rem', color: t.color,
              }}>{t.initials}</div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontFamily: AV_FONTS.display, fontWeight: 700, fontSize: '0.95rem', color: AV.text }}>{t.name}</div>
                <div style={{ fontFamily: AV_FONTS.body, fontSize: '0.8rem', color: AV.textDim }}>{t.company}</div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1.5rem', marginTop: '2rem' }}>
          <motion.button whileHover={{ scale: 1.1 }} onClick={prev}
            style={{ width: 44, height: 44, borderRadius: '50%', background: AV.white, border: `1px solid ${AV.glassBorder}`, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: AV.text, boxShadow: AV.shadow }}>
            <ChevronLeft size={20} />
          </motion.button>
          {testimonials.map((_, i) => (
            <motion.div key={i} onClick={() => setIdx(i)} style={{ width: i === idx ? 24 : 8, height: 8, borderRadius: 4, background: i === idx ? AV.gradient : `${AV.primary}20`, cursor: 'pointer', transition: 'all 0.3s' }} />
          ))}
          <motion.button whileHover={{ scale: 1.1 }} onClick={next}
            style={{ width: 44, height: 44, borderRadius: '50%', background: AV.white, border: `1px solid ${AV.glassBorder}`, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: AV.text, boxShadow: AV.shadow }}>
            <ChevronRight size={20} />
          </motion.button>
        </div>
      </div>
    </section>
  );
}
