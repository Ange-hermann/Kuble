import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { COLORS, FONTS } from '../theme/colors';

const testimonials = [
  {
    quote: "Kuble a transformé notre processus de commande en ligne. Résultat : +40% de ventes en 3 mois.",
    name: 'Kofi Mensah',
    role: 'DG AfriTraders',
    country: 'Ghana',
    initials: 'KM',
    color: '#1B6FE0',
  },
  {
    quote: "Leur audit de sécurité a révélé 12 vulnérabilités critiques que nous n'aurions jamais trouvées seuls.",
    name: 'Aminata Diallo',
    role: 'DSI BanqueCI',
    country: "Côte d'Ivoire",
    initials: 'AD',
    color: '#5BC8F2',
  },
  {
    quote: "L'app mobile livrée en 6 semaines, parfaitement adaptée à nos utilisateurs d'Afrique de l'Ouest.",
    name: 'Jean-Marc Atta',
    role: 'CEO MobiService',
    country: 'Abidjan',
    initials: 'JA',
    color: '#5BC8F2',
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((c) => (c + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const go = (dir: number) => {
    setDirection(dir);
    setCurrent((c) => (c + dir + testimonials.length) % testimonials.length);
  };

  const t = testimonials[current];

  return (
    <section style={{ padding: '7rem 2rem', position: 'relative', overflow: 'hidden', background: `linear-gradient(180deg, ${COLORS.navyDark} 0%, ${COLORS.navyDeep} 100%)` }}>
      {/* Aurora glow */}
      <motion.div
        animate={{ x: [0, -60, 0], y: [0, 40, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        style={{ position: 'absolute', top: '15%', left: '10%', width: 400, height: 400, borderRadius: '50%', filter: 'blur(100px)', background: `radial-gradient(circle, ${COLORS.cyanGlow} 0%, transparent 70%)`, pointerEvents: 'none' }}
      />
      <motion.div
        animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        style={{ position: 'absolute', bottom: '10%', right: '8%', width: 350, height: 350, borderRadius: '50%', filter: 'blur(90px)', background: 'radial-gradient(circle, rgba(27,111,224,0.18) 0%, transparent 70%)', pointerEvents: 'none' }}
      />
      {/* Grid overlay */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.04,
        backgroundImage: `linear-gradient(${COLORS.cyan} 1px, transparent 1px), linear-gradient(90deg, ${COLORS.cyan} 1px, transparent 1px)`,
        backgroundSize: '40px 40px', pointerEvents: 'none',
      }} />
      <div style={{ maxWidth: 800, margin: '0 auto', position: 'relative', zIndex: 2 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '3rem' }}
        >
          <span style={{ fontFamily: FONTS.mono, fontSize: '0.78rem', color: COLORS.cyan, letterSpacing: '0.2em', display: 'block', marginBottom: 12 }}>
            // TÉMOIGNAGES
          </span>
          <h2 style={{ fontFamily: FONTS.display, fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 3rem)', color: COLORS.white, letterSpacing: '-0.02em' }}>Ce que disent nos clients</h2>
        </motion.div>

        {/* Slider */}
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              initial={{ opacity: 0, x: direction * 80 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -direction * 80 }}
              transition={{ duration: 0.45, ease: 'easeInOut' }}
              style={{
                background: 'rgba(27,111,224,0.07)',
                border: '1px solid rgba(27,111,224,0.2)',
                borderRadius: 20,
                padding: '3rem',
                backdropFilter: 'blur(12px)',
                textAlign: 'center',
              }}
            >
              {/* Stars */}
              <div style={{ display: 'flex', gap: 4, justifyContent: 'center', marginBottom: '1.5rem' }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} fill="#5BC8F2" color="#5BC8F2" />
                ))}
              </div>

              {/* Quote */}
              <blockquote style={{
                fontFamily: FONTS.display, fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
                color: COLORS.white, lineHeight: 1.7, fontWeight: 400,
                fontStyle: 'italic', marginBottom: '2rem',
              }}>
                "{t.quote}"
              </blockquote>

              {/* Author */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
                <div style={{
                  width: 52, height: 52, borderRadius: '50%',
                  background: `linear-gradient(135deg, ${t.color}, ${t.color}88)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: FONTS.display, fontWeight: 700, fontSize: '1rem', color: '#fff',
                  boxShadow: `0 0 16px ${t.color}55`,
                  flexShrink: 0,
                }}>
                  {t.initials}
                </div>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontFamily: FONTS.display, fontWeight: 700, color: COLORS.white, fontSize: '1rem' }}>
                    {t.name}
                  </div>
                  <div style={{ fontFamily: FONTS.body, fontSize: '0.85rem', color: 'rgba(255,255,255,0.55)' }}>
                    {t.role} · {t.country}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginTop: '2rem' }}>
          <button
            onClick={() => go(-1)}
            style={{
              background: 'rgba(27,111,224,0.1)', border: '1px solid rgba(27,111,224,0.3)',
              borderRadius: '50%', width: 40, height: 40,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: '#FFFFFF', transition: 'all 0.2s',
            }}
          >
            <ChevronLeft size={18} />
          </button>

          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
              style={{
                width: i === current ? 28 : 8, height: 8,
                borderRadius: 4, border: 'none', cursor: 'pointer',
                background: i === current ? '#5BC8F2' : 'rgba(27,111,224,0.3)',
                transition: 'all 0.3s ease',
                boxShadow: i === current ? '0 0 8px rgba(91,200,242,0.5)' : 'none',
              }}
            />
          ))}

          <button
            onClick={() => go(1)}
            style={{
              background: 'rgba(27,111,224,0.1)', border: '1px solid rgba(27,111,224,0.3)',
              borderRadius: '50%', width: 40, height: 40,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: '#FFFFFF', transition: 'all 0.2s',
            }}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
