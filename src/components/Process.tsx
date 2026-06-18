import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Search, PenTool, Code2, ShieldCheck, Rocket } from 'lucide-react';

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
    <section className="section-padding adinkra-bg" style={{ background: '#020818' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '5rem' }}
        >
          <span style={{ fontFamily: 'JetBrains Mono', fontSize: '0.8rem', color: '#00A3FF', letterSpacing: '0.2em', display: 'block', marginBottom: 12 }}>
            // MÉTHODE
          </span>
          <h2 className="section-title">Comment on travaille</h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Une approche structurée pour des projets livrés dans les délais, sans mauvaises surprises.
          </p>
        </motion.div>

        {/* Desktop timeline */}
        <div className="process-desktop" style={{ position: 'relative' }}>
          {/* Connecting line */}
          <div ref={lineRef} style={{ position: 'absolute', top: 36, left: '10%', right: '10%', height: 2, background: 'rgba(26,107,255,0.15)', borderRadius: 2 }}>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 2, ease: 'easeInOut' }}
              style={{
                height: '100%', width: '100%',
                background: 'linear-gradient(90deg, #1A6BFF, #00A3FF)',
                boxShadow: '0 0 10px rgba(0,163,255,0.5)',
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
                    background: 'linear-gradient(135deg, rgba(26,107,255,0.2), rgba(0,163,255,0.1))',
                    border: '2px solid #1A6BFF',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: '1.5rem', position: 'relative', zIndex: 1,
                    boxShadow: '0 0 20px rgba(26,107,255,0.3)',
                  }}>
                    <Icon size={24} color="#00A3FF" />
                  </div>

                  <span style={{ fontFamily: 'JetBrains Mono', fontSize: '0.75rem', color: '#D4AF37', marginBottom: 8 }}>
                    {step.num}
                  </span>
                  <h4 style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: '1rem', color: '#E8F4FF', marginBottom: 8 }}>
                    {step.title}
                  </h4>
                  <p style={{ fontFamily: 'Inter', fontSize: '0.82rem', color: 'rgba(232,244,255,0.6)', lineHeight: 1.6 }}>
                    {step.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Mobile: vertical */}
        <div className="process-mobile" style={{ display: 'none', flexDirection: 'column', gap: '2rem', paddingLeft: '2rem', borderLeft: '2px solid rgba(26,107,255,0.3)' }}>
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
                  background: 'linear-gradient(135deg, #1A6BFF, #00A3FF)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <Icon size={16} color="#fff" />
                </div>
                <div>
                  <span style={{ fontFamily: 'JetBrains Mono', fontSize: '0.7rem', color: '#D4AF37' }}>{step.num}</span>
                  <h4 style={{ fontFamily: 'Space Grotesk', fontWeight: 700, color: '#E8F4FF', margin: '4px 0' }}>{step.title}</h4>
                  <p style={{ fontFamily: 'Inter', fontSize: '0.85rem', color: 'rgba(232,244,255,0.6)', lineHeight: 1.6 }}>{step.desc}</p>
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
