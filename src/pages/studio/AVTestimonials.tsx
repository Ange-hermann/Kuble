import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const G = '#e8c84a';
const BLUE = '#4d9eff';

const testimonials = [
  { stars: 5, quote: 'Leur couverture de notre gala était parfaite. Les vidéos livrées ont été partagées des milliers de fois.', name: 'Directrice Communication', company: 'Groupe Industriel CI', initials: 'DC', color: '#1A6BFF' },
  { stars: 5, quote: 'En 3 mois de gestion de nos réseaux, notre communauté a doublé et nos ventes ont augmenté de 35%.', name: 'CEO', company: 'Startup FinTech Abidjan', initials: 'CF', color: '#D4AF37' },
  { stars: 5, quote: 'Le spot publicitaire réalisé pour notre lancement a été diffusé sur RTI et a surpassé toutes nos attentes.', name: 'Responsable Marketing', company: 'Marque FMCG', initials: 'RM', color: '#00C2FF' },
  { stars: 5, quote: 'Professionnalisme, créativité et réactivité. Nous travaillons ensemble depuis 2 ans.', name: 'Organisatrice d\'Événements', company: 'Event Pro Africa', initials: 'OE', color: '#c084fc' },
];

export default function AVTestimonials() {
  const [idx, setIdx] = useState(0);
  const prev = () => setIdx(i => (i - 1 + testimonials.length) % testimonials.length);
  const next = () => setIdx(i => (i + 1) % testimonials.length);
  const t = testimonials[idx];

  return (
    <section id="av-testimonials" style={{ padding: '7rem 2rem', background: '#071228' }}>
      <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ marginBottom: '3.5rem' }}>
          <span style={{ fontFamily: 'JetBrains Mono', fontSize: '0.75rem', color: G, letterSpacing: '0.2em' }}>// TÉMOIGNAGES</span>
          <h2 style={{ fontFamily: 'Space Grotesk', fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#fff', marginTop: 12 }}>
            Ils nous font confiance
          </h2>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div key={idx}
            initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.4 }}
            style={{
              background: 'rgba(80,160,255,0.06)', border: `1px solid ${BLUE}25`,
              borderRadius: 24, padding: '3rem 3.5rem', position: 'relative',
            }}>
            {/* Étoiles */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: 4, marginBottom: '1.5rem' }}>
              {Array.from({ length: t.stars }).map((_, i) => (
                <Star key={i} size={18} color={G} fill={G} />
              ))}
            </div>

            {/* Citation */}
            <p style={{
              fontFamily: 'Space Grotesk', fontStyle: 'italic',
              fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)', color: G,
              lineHeight: 1.7, marginBottom: '2rem',
            }}>
              "{t.quote}"
            </p>

            {/* Auteur */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14 }}>
              <div style={{
                width: 48, height: 48, borderRadius: '50%',
                background: `${t.color}33`, border: `2px solid ${t.color}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: '0.9rem', color: t.color,
              }}>{t.initials}</div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: '0.95rem', color: '#fff' }}>{t.name}</div>
                <div style={{ fontFamily: 'Inter', fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)' }}>{t.company}</div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1.5rem', marginTop: '2rem' }}>
          <motion.button whileHover={{ scale: 1.1 }} onClick={prev}
            style={{ width: 44, height: 44, borderRadius: '50%', background: 'rgba(80,160,255,0.1)', border: `1px solid ${BLUE}33`, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
            <ChevronLeft size={20} />
          </motion.button>
          {testimonials.map((_, i) => (
            <motion.div key={i} onClick={() => setIdx(i)} style={{ width: i === idx ? 24 : 8, height: 8, borderRadius: 4, background: i === idx ? G : 'rgba(255,255,255,0.2)', cursor: 'pointer', transition: 'all 0.3s' }} />
          ))}
          <motion.button whileHover={{ scale: 1.1 }} onClick={next}
            style={{ width: 44, height: 44, borderRadius: '50%', background: 'rgba(80,160,255,0.1)', border: `1px solid ${BLUE}33`, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
            <ChevronRight size={20} />
          </motion.button>
        </div>
      </div>
    </section>
  );
}
