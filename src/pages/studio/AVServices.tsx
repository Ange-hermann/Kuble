import { useState } from 'react';
import { motion } from 'framer-motion';
import { Video, Camera, Share2, Mic, Tv, Palette, Users } from 'lucide-react';

const G = '#e8c84a';
const BLUE = '#4d9eff';

const services = [
  { icon: Video,   emoji: '🎥', title: 'Production Vidéo',          desc: 'Clips, documentaires, films institutionnels, reportages — du scénario au rendu final.' },
  { icon: Camera,  emoji: '📡', title: 'Couverture Médiatique',      desc: 'Événements live, conférences, cérémonies, galas — captation multi-caméras professionnelle.' },
  { icon: Camera,  emoji: '📸', title: 'Photographie',               desc: 'Shooting produit, portrait corporate, événementiel, reportage — retouche incluse.' },
  { icon: Share2,  emoji: '📱', title: 'Gestion Réseaux Sociaux',    desc: 'Stratégie éditoriale, création de contenu, publication, community management.' },
  { icon: Mic,     emoji: '🎙️', title: 'Production Audio',           desc: 'Podcast, jingle, voix-off, habillage sonore, mixage et mastering studio.' },
  { icon: Tv,      emoji: '📺', title: 'Publicité & Spots TV/Web',   desc: 'Conception, tournage et diffusion de spots publicitaires TV, YouTube, réseaux.' },
  { icon: Palette, emoji: '🎨', title: 'Identité Visuelle',          desc: 'Logo, charte graphique, motion design, identité de marque complète.' },
  { icon: Users,   emoji: '🎤', title: 'Événementiel',               desc: 'Organisation, scénographie, régie technique, animation et retransmission live.' },
];

export default function AVServices() {
  const [hov, setHov] = useState<number | null>(null);

  return (
    <section id="av-services" style={{ padding: '7rem 2rem', background: '#0c1a3e' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span style={{ fontFamily: 'JetBrains Mono', fontSize: '0.75rem', color: G, letterSpacing: '0.2em' }}>// NOS EXPERTISES</span>
          <h2 style={{ fontFamily: 'Space Grotesk', fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#fff', marginTop: 12, marginBottom: 12 }}>
            Nos Expertises
          </h2>
          <p style={{ fontFamily: 'Inter', color: 'rgba(255,255,255,0.6)', fontSize: '1rem' }}>
            De la captation à la diffusion, on gère tout.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.25rem' }} className="av-grid-services">
          {services.map((s, i) => {
            const Icon = s.icon;
            const isHov = hov === i;
            return (
              <motion.div key={s.title}
                initial={{ opacity: 0, y: 30, rotate: -5 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.07, type: 'spring', stiffness: 120 }}
                onHoverStart={() => setHov(i)} onHoverEnd={() => setHov(null)}
                style={{
                  padding: '2rem 1.5rem', borderRadius: 16, cursor: 'default',
                  background: isHov ? `linear-gradient(135deg, ${BLUE}33, ${G}22)` : 'rgba(80,160,255,0.07)',
                  border: `1px solid ${isHov ? BLUE : 'rgba(80,160,255,0.2)'}`,
                  boxShadow: isHov ? `0 0 20px ${BLUE}33` : 'none',
                  transition: 'all 0.3s ease',
                }}>
                <motion.div animate={{ rotate: isHov ? 360 : 0 }} transition={{ duration: 0.5 }}
                  style={{
                    width: 48, height: 48, borderRadius: 12, marginBottom: '1rem',
                    background: isHov ? `${BLUE}22` : `${G}12`,
                    border: `1px solid ${isHov ? BLUE : `${G}33`}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                  <Icon size={22} color={isHov ? '#fff' : G} />
                </motion.div>
                <div style={{ fontSize: '1.4rem', marginBottom: 8 }}>{s.emoji}</div>
                <h3 style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: '1rem', color: '#fff', marginBottom: 8 }}>
                  {s.title}
                </h3>
                <p style={{ fontFamily: 'Inter', fontSize: '0.85rem', color: isHov ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.55)', lineHeight: 1.7 }}>
                  {s.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
      <style>{`
        .av-grid-services { grid-template-columns: repeat(4, 1fr) !important; }
        @media (max-width: 1024px) { .av-grid-services { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 600px)  { .av-grid-services { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
