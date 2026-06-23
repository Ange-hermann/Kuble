import { motion } from 'framer-motion';
import { CheckCircle, TrendingUp } from 'lucide-react';

const G = '#e8c84a';
const BLUE = '#4d9eff';

const features = [
  'Stratégie éditoriale mensuelle',
  'Création de visuels et vidéos Reels/Stories',
  'Planification et publication automatisée',
  'Community management (réponses, engagement)',
  'Rapports de performance mensuels',
  'Veille concurrentielle',
  'Campagnes publicitaires Meta/Google Ads',
];

const packs = [
  { name: 'Starter',  desc: '1 réseau · 8 posts/mois', price: 'À partir de 75 000 FCFA', popular: false },
  { name: 'Pro',      desc: '3 réseaux · 20 posts/mois', price: 'À partir de 180 000 FCFA', popular: true  },
  { name: 'Premium',  desc: 'Tous réseaux · Illimité', price: 'Sur devis', popular: false },
];

const platforms = ['Instagram', 'Facebook', 'TikTok', 'LinkedIn', 'YouTube', 'X'];

export default function AVSocial() {
  return (
    <section id="av-social" style={{ padding: '7rem 2rem', background: '#071228' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span style={{ fontFamily: 'JetBrains Mono', fontSize: '0.75rem', color: G, letterSpacing: '0.2em' }}>// RÉSEAUX SOCIAUX</span>
          <h2 style={{ fontFamily: 'Space Grotesk', fontWeight: 800, fontSize: 'clamp(1.8rem, 4vw, 3rem)', color: '#fff', marginTop: 12, marginBottom: 12 }}>
            Votre Présence Digitale,<br />Notre Priorité
          </h2>
          <p style={{ fontFamily: 'Inter', color: 'rgba(255,255,255,0.6)', fontSize: '1rem' }}>
            On gère vos comptes comme s'ils étaient les nôtres.
          </p>
        </motion.div>

        {/* 2 colonnes */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'start', marginBottom: '5rem' }} className="av-grid-2">
          {/* Gauche : Dashboard mockup */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            style={{ background: 'rgba(80,160,255,0.06)', border: `1px solid ${BLUE}25`, borderRadius: 20, padding: '2rem', overflow: 'hidden' }}>
            {/* Header dashboard */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <span style={{ fontFamily: 'Space Grotesk', fontWeight: 700, color: '#fff', fontSize: '0.95rem' }}>Analytics Dashboard</span>
              <span style={{ fontFamily: 'JetBrains Mono', fontSize: '0.7rem', color: '#00ff88' }}>● En ligne</span>
            </div>
            {/* Plateformes */}
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: '1.5rem' }}>
              {platforms.map(p => (
                <span key={p} style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 6, padding: '3px 10px', fontFamily: 'Inter', fontSize: '0.75rem', color: 'rgba(255,255,255,0.7)' }}>{p}</span>
              ))}
            </div>
            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginBottom: '1.5rem' }}>
              {[{ l: 'Abonnés', v: '12.4K', up: '+8.2%' }, { l: 'Reach', v: '89K', up: '+22%' }, { l: 'Engagement', v: '6.8%', up: '+3.1%' }].map(s => (
                <div key={s.l} style={{ background: `rgba(80,160,255,0.1)`, border: `1px solid ${BLUE}22`, borderRadius: 10, padding: '0.85rem', textAlign: 'center' }}>
                  <div style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: '1.1rem', color: G }}>{s.v}</div>
                  <div style={{ fontFamily: 'Inter', fontSize: '0.7rem', color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>{s.l}</div>
                  <div style={{ fontFamily: 'JetBrains Mono', fontSize: '0.65rem', color: '#00ff88', marginTop: 2 }}>{s.up}</div>
                </div>
              ))}
            </div>
            {/* Barres animées */}
            <div style={{ marginBottom: '1.5rem' }}>
              {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map((d, i) => {
                const h = [40, 70, 55, 85, 65, 90, 75][i];
                return (
                  <div key={d} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                    <span style={{ fontFamily: 'JetBrains Mono', fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)', width: 28 }}>{d}</span>
                    <div style={{ flex: 1, height: 8, background: 'rgba(255,255,255,0.08)', borderRadius: 4, overflow: 'hidden' }}>
                      <motion.div initial={{ width: 0 }} whileInView={{ width: `${h}%` }} viewport={{ once: true }} transition={{ delay: i * 0.07, duration: 0.8 }}
                        style={{ height: '100%', background: `linear-gradient(90deg, ${G}, ${G}88)`, borderRadius: 4 }} />
                    </div>
                    <span style={{ fontFamily: 'JetBrains Mono', fontSize: '0.65rem', color: G, width: 32 }}>{h}%</span>
                  </div>
                );
              })}
            </div>
            {/* Notification */}
            <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 2.5, repeat: Infinity }}
              style={{ background: `${G}18`, border: `1px solid ${G}44`, borderRadius: 10, padding: '0.75rem 1rem', display: 'flex', alignItems: 'center', gap: 10 }}>
              <TrendingUp size={16} color={G} />
              <span style={{ fontFamily: 'Inter', fontSize: '0.8rem', color: '#fff' }}>
                <strong style={{ color: G }}>+1 240</strong> nouveaux abonnés ce mois
              </span>
            </motion.div>
          </motion.div>

          {/* Droite : features */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h3 style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: '1.2rem', color: '#fff', marginBottom: '1.5rem' }}>
              Ce qui est inclus dans nos offres
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {features.map(f => (
                <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                  <CheckCircle size={18} color={G} style={{ flexShrink: 0, marginTop: 2 }} />
                  <span style={{ fontFamily: 'Inter', fontSize: '0.95rem', color: 'rgba(255,255,255,0.8)', lineHeight: 1.6 }}>{f}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Packs tarifaires */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1.5rem' }} className="av-grid-3">
          {packs.map((p, i) => (
            <motion.div key={p.name}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              style={{
                background: p.popular ? `${BLUE}18` : 'rgba(80,160,255,0.05)',
                border: `2px solid ${p.popular ? BLUE : 'rgba(80,160,255,0.18)'}`,
                boxShadow: p.popular ? `0 0 30px ${BLUE}33` : 'none',
                borderRadius: 20, padding: '2rem', position: 'relative', textAlign: 'center',
              }}>
              {p.popular && (
                <div style={{ position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)', background: G, color: '#0A0A0A', fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: '0.75rem', padding: '3px 14px', borderRadius: 100 }}>
                  POPULAIRE
                </div>
              )}
              <h3 style={{ fontFamily: 'Space Grotesk', fontWeight: 800, fontSize: '1.4rem', color: p.popular ? G : '#fff', marginBottom: 8 }}>{p.name}</h3>
              <p style={{ fontFamily: 'Inter', fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)', marginBottom: '1.5rem', lineHeight: 1.6 }}>{p.desc}</p>
              <div style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: '1.1rem', color: '#fff', marginBottom: '1.5rem' }}>{p.price}</div>
              <motion.a href="#av-contact" onClick={e => { e.preventDefault(); document.querySelector('#av-contact')?.scrollIntoView({ behavior: 'smooth' }); }}
                whileHover={{ scale: 1.04 }}
                style={{
                  display: 'block', background: p.popular ? `linear-gradient(135deg,${BLUE},${G})` : 'transparent',
                  color: p.popular ? '#0c1a3e' : '#fff',
                  border: `1px solid ${p.popular ? BLUE : 'rgba(80,160,255,0.3)'}`,
                  borderRadius: 10, padding: '0.7rem', fontFamily: 'Space Grotesk',
                  fontWeight: 700, fontSize: '0.9rem', textDecoration: 'none', cursor: 'pointer',
                }}>
                Choisir ce pack
              </motion.a>
            </motion.div>
          ))}
        </div>
      </div>
      <style>{`
        .av-grid-2 { grid-template-columns: 1fr 1fr !important; }
        .av-grid-3 { grid-template-columns: repeat(3,1fr) !important; }
        @media (max-width: 900px) {
          .av-grid-2 { grid-template-columns: 1fr !important; }
          .av-grid-3 { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
