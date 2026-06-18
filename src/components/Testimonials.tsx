import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const testimonials = [
  {
    quote: "Kuble a transformé notre processus de commande en ligne. Résultat : +40% de ventes en 3 mois.",
    name: 'Kofi Mensah',
    role: 'DG AfriTraders',
    country: 'Ghana',
    initials: 'KM',
    color: '#1A6BFF',
  },
  {
    quote: "Leur audit de sécurité a révélé 12 vulnérabilités critiques que nous n'aurions jamais trouvées seuls.",
    name: 'Aminata Diallo',
    role: 'DSI BanqueCI',
    country: "Côte d'Ivoire",
    initials: 'AD',
    color: '#D4AF37',
  },
  {
    quote: "L'app mobile livrée en 6 semaines, parfaitement adaptée à nos utilisateurs d'Afrique de l'Ouest.",
    name: 'Jean-Marc Atta',
    role: 'CEO MobiService',
    country: 'Abidjan',
    initials: 'JA',
    color: '#00A3FF',
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
    <section className="section-padding adinkra-bg" style={{ background: '#020818' }}>
      <div style={{ maxWidth: 800, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '3rem' }}
        >
          <span style={{ fontFamily: 'JetBrains Mono', fontSize: '0.8rem', color: '#00A3FF', letterSpacing: '0.2em', display: 'block', marginBottom: 12 }}>
            // TÉMOIGNAGES
          </span>
          <h2 className="section-title">Ce que disent nos clients</h2>
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
                background: 'rgba(26,107,255,0.07)',
                border: '1px solid rgba(26,107,255,0.2)',
                borderRadius: 20,
                padding: '3rem',
                backdropFilter: 'blur(12px)',
                textAlign: 'center',
              }}
            >
              {/* Stars */}
              <div style={{ display: 'flex', gap: 4, justifyContent: 'center', marginBottom: '1.5rem' }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} fill="#D4AF37" color="#D4AF37" />
                ))}
              </div>

              {/* Quote */}
              <blockquote style={{
                fontFamily: 'Space Grotesk', fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
                color: '#E8F4FF', lineHeight: 1.7, fontWeight: 400,
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
                  fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: '1rem', color: '#fff',
                  boxShadow: `0 0 16px ${t.color}55`,
                  flexShrink: 0,
                }}>
                  {t.initials}
                </div>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontFamily: 'Space Grotesk', fontWeight: 700, color: '#E8F4FF', fontSize: '1rem' }}>
                    {t.name}
                  </div>
                  <div style={{ fontFamily: 'Inter', fontSize: '0.85rem', color: 'rgba(232,244,255,0.55)' }}>
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
              background: 'rgba(26,107,255,0.1)', border: '1px solid rgba(26,107,255,0.3)',
              borderRadius: '50%', width: 40, height: 40,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: '#E8F4FF', transition: 'all 0.2s',
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
                background: i === current ? '#00A3FF' : 'rgba(26,107,255,0.3)',
                transition: 'all 0.3s ease',
                boxShadow: i === current ? '0 0 8px rgba(0,163,255,0.5)' : 'none',
              }}
            />
          ))}

          <button
            onClick={() => go(1)}
            style={{
              background: 'rgba(26,107,255,0.1)', border: '1px solid rgba(26,107,255,0.3)',
              borderRadius: '50%', width: 40, height: 40,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: '#E8F4FF', transition: 'all 0.2s',
            }}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
