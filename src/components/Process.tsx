import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Search, PenTool, Code2, ShieldCheck, Rocket } from 'lucide-react';
import { COLORS, FONTS } from '../theme/colors';

const steps = [
  { icon: Search, num: '01', title: 'Découverte', desc: 'Analyse approfondie de vos besoins métiers et de votre contexte.' },
  { icon: PenTool, num: '02', title: 'Architecture', desc: 'Conception technique rigoureuse et maquettes UX validées.' },
  { icon: Code2, num: '03', title: 'Développement', desc: 'Sprints agiles avec livraisons régulières et démos client.' },
  { icon: ShieldCheck, num: '04', title: 'Sécurisation', desc: 'Tests exhaustifs, audit qualité et validation sécurité.' },
  { icon: Rocket, num: '05', title: 'Lancement', desc: 'Déploiement maîtrisé et support continu post-livraison.' },
];

export default function Process() {
  const lineRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(lineRef, { once: true, margin: '-100px' });

  return (
    <section style={{ padding: '7rem 2rem', position: 'relative', overflow: 'hidden', background: `linear-gradient(180deg, ${COLORS.navyDeep} 0%, ${COLORS.navyDark} 100%)` }}>
      {/* Aurora glow */}
      <motion.div
        animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        style={{ position: 'absolute', top: '10%', right: '5%', width: 400, height: 400, borderRadius: '50%', filter: 'blur(100px)', background: `radial-gradient(circle, ${COLORS.cyanGlow} 0%, transparent 70%)`, pointerEvents: 'none' }}
      />
      {/* Grid overlay */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.04,
        backgroundImage: `linear-gradient(${COLORS.cyan} 1px, transparent 1px), linear-gradient(90deg, ${COLORS.cyan} 1px, transparent 1px)`,
        backgroundSize: '40px 40px', pointerEvents: 'none',
      }} />
      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 2 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '5rem' }}
        >
          <span style={{ fontFamily: FONTS.mono, fontSize: '0.78rem', color: COLORS.cyan, letterSpacing: '0.2em', display: 'block', marginBottom: 12 }}>
            // MÉTHODE
          </span>
          <h2 style={{ fontFamily: FONTS.display, fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 3rem)', color: COLORS.white, letterSpacing: '-0.02em' }}>Comment on travaille</h2>
          <p style={{ fontFamily: FONTS.body, fontSize: '1.05rem', color: 'rgba(255,255,255,0.55)', maxWidth: 500, margin: '1rem auto 0' }}>
            Une approche structurée pour des projets livrés dans les délais, sans mauvaises surprises.
          </p>
        </motion.div>

        {/* Desktop timeline */}
        <div className="process-desktop" style={{ position: 'relative' }}>
          {/* Connecting line */}
          <div ref={lineRef} style={{ position: 'absolute', top: 36, left: '10%', right: '10%', height: 2, background: 'rgba(27,111,224,0.15)', borderRadius: 2 }}>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 2, ease: 'easeInOut' }}
              style={{
                height: '100%', width: '100%',
                background: 'linear-gradient(90deg, #1B6FE0, #5BC8F2)',
                boxShadow: '0 0 10px rgba(91,200,242,0.5)',
                transformOrigin: 'left',
              }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1rem' }}>
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}
                >
                  {/* Icon circle */}
                  <div style={{
                    width: 72, height: 72, borderRadius: '50%',
                    background: 'linear-gradient(135deg, rgba(27,111,224,0.2), rgba(91,200,242,0.1))',
                    border: '2px solid #1B6FE0',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: '1.5rem', position: 'relative', zIndex: 1,
                    boxShadow: '0 0 20px rgba(27,111,224,0.3)',
                  }}>
                    <Icon size={24} color="#5BC8F2" />
                  </div>

                  <span style={{ fontFamily: FONTS.mono, fontSize: '0.75rem', color: COLORS.cyan, marginBottom: 8 }}>
                    {step.num}
                  </span>
                  <h4 style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: '1rem', color: COLORS.white, marginBottom: 8 }}>
                    {step.title}
                  </h4>
                  <p style={{ fontFamily: FONTS.body, fontSize: '0.82rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>
                    {step.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Mobile: vertical */}
        <div className="process-mobile" style={{ display: 'none', flexDirection: 'column', gap: '2rem', paddingLeft: '2rem', borderLeft: '2px solid rgba(27,111,224,0.3)' }}>
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', position: 'relative' }}
              >
                <div style={{
                  position: 'absolute', left: -42, top: 0,
                  width: 36, height: 36, borderRadius: '50%',
                  background: 'linear-gradient(135deg, #1B6FE0, #5BC8F2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <Icon size={16} color="#fff" />
                </div>
                <div>
                  <span style={{ fontFamily: FONTS.mono, fontSize: '0.7rem', color: COLORS.cyan }}>{step.num}</span>
                  <h4 style={{ fontFamily: FONTS.display, fontWeight: 700, color: COLORS.white, margin: '4px 0' }}>{step.title}</h4>
                  <p style={{ fontFamily: FONTS.body, fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>{step.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .process-desktop { display: none !important; }
          .process-mobile { display: flex !important; }
        }
      `}</style>
    </section>
  );
}
