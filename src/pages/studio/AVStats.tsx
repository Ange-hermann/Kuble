import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { AV, AV_FONTS } from './avTheme';

function CountUp({ to, duration = 2 }: { to: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = to / (duration * 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= to) { setCount(to); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [inView, to, duration]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
}

const stats = [
  { emoji: '🎥', value: 500,  suffix: '+', label: 'Vidéos produites', color: AV.primary },
  { emoji: '📸', value: 2000, suffix: '+', label: 'Photos livrées',   color: AV.coral },
  { emoji: '📡', value: 80,   suffix: '+', label: 'Événements couverts', color: AV.turquoise },
  { emoji: '📱', value: 50,   suffix: '+', label: 'Comptes gérés',    color: AV.primary },
];

export default function AVStats() {
  return (
    <section id="av-stats" style={{
      padding: '5rem 2rem', background: AV.bgTint,
    }}>
      <div style={{ maxWidth: 1000, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }} className="av-grid-stats">
        {stats.map((s, i) => (
          <motion.div key={s.label}
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: i * 0.1 }}
            whileHover={{ y: -6, boxShadow: AV.shadowHover }}
            style={{
              textAlign: 'center', padding: '2rem 1.5rem', position: 'relative',
              background: AV.white, borderRadius: 20, border: `1px solid ${AV.glassBorder}`,
              boxShadow: AV.shadow, transition: 'all 0.3s ease',
            }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{s.emoji}</div>
            <div style={{
              fontFamily: AV_FONTS.display, fontWeight: 800,
              fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1,
              background: `linear-gradient(135deg, ${s.color}, ${AV.coral})`,
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>
              <CountUp to={s.value} />{s.suffix}
            </div>
            <div style={{ fontFamily: AV_FONTS.body, fontSize: '0.9rem', color: AV.textDim, marginTop: 6 }}>{s.label}</div>
          </motion.div>
        ))}
      </div>
      <style>{`
        .av-grid-stats { grid-template-columns: repeat(4, 1fr) !important; }
        @media (max-width: 768px) { .av-grid-stats { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 480px) { .av-grid-stats { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
