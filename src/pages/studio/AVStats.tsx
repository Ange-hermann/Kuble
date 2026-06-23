import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

const G = '#e8c84a';
const BLUE = '#4d9eff';

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
  { emoji: '🎥', value: 500,  suffix: '+', label: 'Vidéos produites' },
  { emoji: '📸', value: 2000, suffix: '+', label: 'Photos livrées' },
  { emoji: '📡', value: 80,   suffix: '+', label: 'Événements couverts' },
  { emoji: '📱', value: 50,   suffix: '+', label: 'Comptes gérés' },
];

export default function AVStats() {
  return (
    <section id="av-stats" style={{
      padding: '4rem 2rem',
      background: '#0f2155',
      borderTop: `2px solid ${BLUE}`,
      borderBottom: `2px solid ${BLUE}`,
    }}>
      <div style={{ maxWidth: 1000, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
        {stats.map((s, i) => (
          <motion.div key={s.label}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: i * 0.1 }}
            style={{ textAlign: 'center', padding: '1.5rem', position: 'relative' }}>
            {i < stats.length - 1 && (
              <div style={{ position: 'absolute', right: 0, top: '15%', bottom: '15%', width: 1, background: `linear-gradient(to bottom, transparent, ${G}, transparent)` }} />
            )}
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{s.emoji}</div>
            <div style={{
              fontFamily: 'Space Grotesk', fontWeight: 800,
              fontSize: 'clamp(2rem, 4vw, 3rem)', color: G, lineHeight: 1,
            }}>
              <CountUp to={s.value} />{s.suffix}
            </div>
            <div style={{ fontFamily: 'Inter', fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)', marginTop: 6 }}>{s.label}</div>
          </motion.div>
        ))}
      </div>
      <style>{`@media(max-width:600px){ #av-stats .av-grid-4{grid-template-columns:repeat(2,1fr)!important;} }`}</style>
    </section>
  );
}
