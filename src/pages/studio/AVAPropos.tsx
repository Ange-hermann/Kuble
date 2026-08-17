import { motion } from 'framer-motion';
import { Target, Heart, Lightbulb, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AV, AV_FONTS } from './avTheme';

const values = [
  { icon: Target, title: 'Excellence', desc: "Le meilleur rendu, la meilleure qualité, sans compromis." },
  { icon: Heart, title: 'Passion', desc: "Chaque projet est une nouvelle histoire à raconter." },
  { icon: Lightbulb, title: 'Créativité', desc: "Repousser les limites, explorer, innover sans cesse." },
  { icon: Users, title: 'Proximité', desc: "Accompagner nos clients comme des partenaires de confiance." },
];

export default function AVAPropos() {
  return (
    <div style={{ background: AV.bg }}>
      {/* Hero */}
      <section style={{
        padding: '140px 2rem 5rem', position: 'relative', overflow: 'hidden',
        background: `linear-gradient(180deg, ${AV.bgAlt} 0%, ${AV.bg} 100%)`,
      }}>
        <motion.div
          animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          style={{ position: 'absolute', top: '10%', left: '5%', width: 350, height: 350, borderRadius: '50%', background: `radial-gradient(circle, ${AV.primary}12 0%, transparent 70%)`, pointerEvents: 'none' }}
        />
        <motion.div
          animate={{ x: [0, -30, 0], y: [0, 40, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          style={{ position: 'absolute', bottom: '10%', right: '8%', width: 300, height: 300, borderRadius: '50%', background: `radial-gradient(circle, ${AV.coral}10 0%, transparent 70%)`, pointerEvents: 'none' }}
        />
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 2 }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span style={{ fontFamily: AV_FONTS.mono, fontSize: '0.75rem', color: AV.primary, letterSpacing: '0.2em' }}>// À PROPOS</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
            style={{
              fontFamily: AV_FONTS.display, fontWeight: 800,
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', color: AV.text,
              lineHeight: 1.05, marginTop: 12, marginBottom: '1.5rem', letterSpacing: '-0.02em',
            }}>
            L'histoire derrière{' '}
            <span style={{ background: AV.gradientText, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Kuble Studio
            </span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            style={{ fontFamily: AV_FONTS.body, fontSize: '1.15rem', color: AV.textSoft, lineHeight: 1.8, maxWidth: 600, margin: '0 auto' }}>
            Né à Abidjan en 2022, Kuble Studio est une agence de communication spécialisée en production audiovisuelle et marketing digital. Nous donnons voix aux marques qui veulent marquer les esprits.
          </motion.p>
        </div>
      </section>

      {/* Mission */}
      <section style={{ padding: '5rem 2rem', background: AV.bg }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }} className="av-about-grid">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <span style={{ fontFamily: AV_FONTS.mono, fontSize: '0.75rem', color: AV.primary, letterSpacing: '0.2em' }}>// NOTRE MISSION</span>
            <h2 style={{ fontFamily: AV_FONTS.display, fontWeight: 800, fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', color: AV.text, marginTop: 12, marginBottom: '1.5rem', lineHeight: 1.2 }}>
              Raconter l'Afrique avec ses propres codes
            </h2>
            <p style={{ fontFamily: AV_FONTS.body, fontSize: '1rem', color: AV.textSoft, lineHeight: 1.8, marginBottom: '1rem' }}>
              Nous croyons que chaque marque a une histoire unique. Notre rôle est de la capturer, la sublimer et la diffuser au bon public, au bon moment, sur le bon canal.
            </p>
            <p style={{ fontFamily: AV_FONTS.body, fontSize: '1rem', color: AV.textSoft, lineHeight: 1.8 }}>
              De la stratégie de contenu au tournage, du montage à la diffusion, nous maîtrisons toute la chaîne de création audiovisuelle.
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            style={{ position: 'relative' }}>
            <div style={{
              borderRadius: 24, overflow: 'hidden', position: 'relative',
              boxShadow: AV.shadowHover, height: 320,
            }}>
              <img src="https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?q=80&w=800&auto=format&fit=crop" alt="Production audiovisuelle"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(180deg, transparent 30%, rgba(26,26,46,0.8) 100%)` }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '2rem' }}>
                <div style={{ fontFamily: AV_FONTS.display, fontWeight: 800, fontSize: '3rem', color: '#fff', lineHeight: 1 }}>
                  500+
                </div>
                <div style={{ fontFamily: AV_FONTS.body, fontSize: '1rem', color: 'rgba(255,255,255,0.8)', marginTop: 8 }}>
                  projets livrés depuis 2022
                </div>
              </div>
            </div>
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                position: 'absolute', top: -20, right: -20, width: 80, height: 80,
                borderRadius: '50%', background: AV.coral, opacity: 0.2,
              }}
            />
          </motion.div>
        </div>
      </section>

      {/* Valeurs */}
      <section style={{ padding: '5rem 2rem', background: AV.bgAlt }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span style={{ fontFamily: AV_FONTS.mono, fontSize: '0.75rem', color: AV.primary, letterSpacing: '0.2em' }}>// NOS VALEURS</span>
            <h2 style={{ fontFamily: AV_FONTS.display, fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 3rem)', color: AV.text, marginTop: 12 }}>
              Ce qui nous anime
            </h2>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }} className="av-values-grid">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <motion.div key={v.title}
                  initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -8, boxShadow: AV.shadowHover }}
                  style={{
                    background: AV.white, borderRadius: 20, padding: '2rem 1.5rem',
                    border: `1px solid ${AV.glassBorder}`, boxShadow: AV.shadow, transition: 'all 0.3s ease',
                  }}>
                  <div style={{
                    width: 52, height: 52, borderRadius: 14, marginBottom: '1rem',
                    background: `${AV.primary}10`, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Icon size={24} color={AV.primary} />
                  </div>
                  <h3 style={{ fontFamily: AV_FONTS.display, fontWeight: 700, fontSize: '1.1rem', color: AV.text, marginBottom: 8 }}>{v.title}</h3>
                  <p style={{ fontFamily: AV_FONTS.body, fontSize: '0.88rem', color: AV.textDim, lineHeight: 1.7 }}>{v.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '5rem 2rem', background: AV.bgAlt, textAlign: 'center' }}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 style={{ fontFamily: AV_FONTS.display, fontWeight: 800, fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', color: AV.text, marginBottom: '1.5rem' }}>
            Travaillons ensemble
          </h2>
          <Link to="/audiovisuel/contact"
            style={{
              background: AV.gradient, color: '#fff', padding: '0.9rem 2.2rem', borderRadius: 12,
              fontFamily: AV_FONTS.display, fontWeight: 700, fontSize: '0.95rem',
              textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8,
              boxShadow: `0 8px 30px ${AV.primary}25`,
            }}>
            Nous contacter <ArrowRight size={17} />
          </Link>
        </motion.div>
      </section>

      <style>{`
        .av-about-grid { grid-template-columns: 1fr 1fr !important; }
        .av-values-grid { grid-template-columns: repeat(4, 1fr) !important; }
        @media (max-width: 768px) {
          .av-about-grid { grid-template-columns: 1fr !important; }
          .av-values-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 480px) {
          .av-values-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
