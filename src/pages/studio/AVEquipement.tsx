import { motion } from 'framer-motion';

const G = '#e8c84a';
const BLUE = '#4d9eff';

const gear = [
  { emoji: '🎥', title: 'Caméras 4K Sony/Canon',          desc: 'Captation cinématique ultra-haute définition pour tous vos projets.' },
  { emoji: '💡', title: 'Éclairage Studio Pro',            desc: 'Softbox, LED panneau, lumière continue pour des résultats parfaits.' },
  { emoji: '🎙️', title: 'Micros & Audio HD',              desc: 'Enregistrement studio qualité broadcast, boom, lavalier sans fil.' },
  { emoji: '🚁', title: 'Drone DJI Aérien',               desc: 'Prises de vue aériennes spectaculaires pour événements et pubs.' },
  { emoji: '📡', title: 'Régie Live Multi-Caméras',        desc: 'Switcher vidéo pro pour retransmission en direct sur plusieurs flux.' },
  { emoji: '🖥️', title: 'Station Montage Haute Perf.',    desc: 'Apple Mac Pro + DaVinci Resolve — étalonnage et montage 4K/8K.' },
];

export default function AVEquipement() {
  return (
    <section id="av-equipement" style={{ padding: '7rem 2rem', background: '#0c1a3e', position: 'relative', overflow: 'hidden' }}>
      {/* Fond studio flou */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `radial-gradient(ellipse at 50% 50%, ${BLUE}12 0%, transparent 70%)`,
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span style={{ fontFamily: 'JetBrains Mono', fontSize: '0.75rem', color: G, letterSpacing: '0.2em' }}>// STUDIO & ÉQUIPEMENTS</span>
          <h2 style={{ fontFamily: 'Space Grotesk', fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#fff', marginTop: 12, marginBottom: 12 }}>
            Un Studio Équipé, Une Équipe Pro
          </h2>
          <p style={{ fontFamily: 'Inter', color: 'rgba(255,255,255,0.55)', fontSize: '1rem' }}>
            Du matériel professionnel pour des résultats exceptionnels.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1.5rem' }} className="av-gear-grid">
          {gear.map((g, i) => (
            <motion.div key={g.title}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              whileHover={{ y: -6, borderColor: G }}
              style={{
                background: 'rgba(80,160,255,0.07)', border: '1px solid rgba(80,160,255,0.2)',
                borderRadius: 16, padding: '2rem', textAlign: 'center', transition: 'border-color 0.3s',
              }}>
              <motion.div whileHover={{ scale: 1.2, rotate: 10 }} style={{ fontSize: '2.8rem', marginBottom: '1rem', display: 'inline-block' }}>
                {g.emoji}
              </motion.div>
              <h3 style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: '1rem', color: '#fff', marginBottom: 8 }}>{g.title}</h3>
              <p style={{ fontFamily: 'Inter', fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>{g.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
      <style>{`
        .av-gear-grid { grid-template-columns: repeat(3,1fr) !important; }
        @media (max-width: 900px) { .av-gear-grid { grid-template-columns: repeat(2,1fr) !important; } }
        @media (max-width: 560px)  { .av-gear-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
