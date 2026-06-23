import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const G = '#e8c84a';
const BLUE = '#4d9eff';

const steps = [
  { n: '01', emoji: '📋', title: 'Brief & Découverte',       desc: 'On écoute votre vision, vos objectifs, votre budget et vos contraintes.', side: 'left' },
  { n: '02', emoji: '🎯', title: 'Stratégie & Concept',      desc: 'On propose un concept créatif, un moodboard et un planning de production.', side: 'right' },
  { n: '03', emoji: '🎬', title: 'Production',               desc: 'Tournage, shooting, captation live — équipe technique pro sur le terrain.', side: 'left' },
  { n: '04', emoji: '✂️', title: 'Post-Production',          desc: 'Montage, étalonnage, retouche, motion design, mixage — rendu en 48-72h.', side: 'right' },
  { n: '05', emoji: '📤', title: 'Livraison & Diffusion',    desc: 'Formats adaptés à chaque plateforme, accompagnement à la publication.', side: 'left' },
  { n: '06', emoji: '📊', title: 'Suivi & Optimisation',     desc: 'Analyse des performances, rapports mensuels, ajustements stratégiques.', side: 'right' },
];

export default function AVProcess() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section id="av-process" ref={ref} style={{ padding: '7rem 2rem', background: '#0c1a3e', position: 'relative' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <span style={{ fontFamily: 'JetBrains Mono', fontSize: '0.75rem', color: G, letterSpacing: '0.2em' }}>// NOTRE MÉTHODE</span>
          <h2 style={{ fontFamily: 'Space Grotesk', fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#fff', marginTop: 12 }}>
            Comment on crée ensemble
          </h2>
        </motion.div>

        <div style={{ position: 'relative' }}>
          {/* Ligne centrale statique */}
          <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 2, background: 'rgba(212,175,55,0.15)', transform: 'translateX(-50%)' }} className="av-timeline-line" />
          {/* Ligne animée */}
          <motion.div style={{ position: 'absolute', left: '50%', top: 0, height: lineHeight, width: 2, background: `linear-gradient(to bottom, ${G}, ${G}88)`, transform: 'translateX(-50%)', transformOrigin: 'top', zIndex: 2 }} className="av-timeline-line" />

          {steps.map((s) => (
            <motion.div key={s.n}
              initial={{ opacity: 0, x: s.side === 'left' ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ delay: 0.1, type: 'spring', stiffness: 100 }}
              style={{
                display: 'flex',
                flexDirection: s.side === 'left' ? 'row' : 'row-reverse',
                alignItems: 'center', gap: '3rem', marginBottom: '3rem', position: 'relative',
              }} className="av-process-row">
              {/* Carte */}
              <div style={{ flex: 1, textAlign: s.side === 'left' ? 'right' : 'left' }} className="av-process-card">
                <div style={{
                  background: 'rgba(80,160,255,0.07)', border: `1px solid ${BLUE}25`,
                  borderRadius: 16, padding: '1.75rem', display: 'inline-block', width: '100%',
                }}>
                  <div style={{ fontSize: '2rem', marginBottom: 8 }}>{s.emoji}</div>
                  <h3 style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: '1.05rem', color: G, marginBottom: 8 }}>{s.title}</h3>
                  <p style={{ fontFamily: 'Inter', fontSize: '0.88rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.7 }}>{s.desc}</p>
                </div>
              </div>

              {/* Nœud central */}
              <div style={{ position: 'relative', zIndex: 3, flexShrink: 0 }} className="av-timeline-node">
                <div style={{
                  width: 52, height: 52, borderRadius: '50%',
                  background: G, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'Space Grotesk', fontWeight: 800, fontSize: '0.85rem', color: '#0A0A0A',
                  boxShadow: `0 0 20px ${G}66`,
                }}>{s.n}</div>
              </div>

              {/* Espace vide côté opposé */}
              <div style={{ flex: 1 }} className="av-process-card" />
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 700px) {
          .av-timeline-line { display: none !important; }
          .av-process-row { flex-direction: column !important; gap: 1rem !important; }
          .av-timeline-node { display: none; }
          .av-process-card { text-align: left !important; }
        }
      `}</style>
    </section>
  );
}
