import { useState } from 'react';
import { motion } from 'framer-motion';
import { Video, Camera, Share2, Mic, Tv, Palette, Users } from 'lucide-react';
import { AV, AV_FONTS } from './avTheme';

const services = [
  { icon: Video,   emoji: '🎥', title: 'Production Vidéo',          desc: 'Clips, documentaires, films institutionnels, reportages — du scénario au rendu final.', img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=600&auto=format&fit=crop' },
  { icon: Camera,  emoji: '📡', title: 'Couverture Médiatique',      desc: 'Événements live, conférences, cérémonies, galas — captation multi-caméras professionnelle.', img: 'https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?q=80&w=600&auto=format&fit=crop' },
  { icon: Camera,  emoji: '📸', title: 'Photographie',               desc: 'Shooting produit, portrait corporate, événementiel, reportage — retouche incluse.', img: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?q=80&w=600&auto=format&fit=crop' },
  { icon: Share2,  emoji: '📱', title: 'Gestion Réseaux Sociaux',    desc: 'Stratégie éditoriale, création de contenu, publication, community management.', img: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=600&auto=format&fit=crop' },
  { icon: Mic,     emoji: '🎙️', title: 'Production Audio',           desc: 'Podcast, jingle, voix-off, habillage sonore, mixage et mastering studio.', img: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=600&auto=format&fit=crop' },
  { icon: Tv,      emoji: '📺', title: 'Publicité & Spots TV/Web',   desc: 'Conception, tournage et diffusion de spots publicitaires TV, YouTube, réseaux.', img: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=600&auto=format&fit=crop' },
  { icon: Palette, emoji: '🎨', title: 'Identité Visuelle',          desc: 'Logo, charte graphique, motion design, identité de marque complète.', img: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=600&auto=format&fit=crop' },
  { icon: Users,   emoji: '🎤', title: 'Événementiel',               desc: 'Organisation, scénographie, régie technique, animation et retransmission live.', img: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=600&auto=format&fit=crop' },
];

export default function AVServices() {
  const [hov, setHov] = useState<number | null>(null);

  return (
    <section id="av-services" style={{ padding: '7rem 2rem', background: AV.bg }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span style={{ fontFamily: AV_FONTS.mono, fontSize: '0.75rem', color: AV.primary, letterSpacing: '0.2em' }}>// NOS EXPERTISES</span>
          <h2 style={{ fontFamily: AV_FONTS.display, fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 3rem)', color: AV.text, marginTop: 12, marginBottom: 12 }}>
            Nos Expertises
          </h2>
          <p style={{ fontFamily: AV_FONTS.body, color: AV.textDim, fontSize: '1rem' }}>
            De la captation à la diffusion, on gère tout.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.25rem' }} className="av-grid-services">
          {services.map((s, i) => {
            const Icon = s.icon;
            const isHov = hov === i;
            return (
              <motion.div key={s.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                onHoverStart={() => setHov(i)} onHoverEnd={() => setHov(null)}
                whileHover={{ y: -8, boxShadow: AV.shadowHover }}
                style={{
                  borderRadius: 20, cursor: 'default', overflow: 'hidden',
                  background: AV.white, border: `1px solid ${isHov ? AV.primary + '30' : AV.glassBorder}`,
                  boxShadow: AV.shadow, transition: 'all 0.3s ease',
                }}>
                {/* Image avec overlay */}
                <div style={{ position: 'relative', height: 160, overflow: 'hidden' }}>
                  <img src={s.img} alt={s.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease', transform: isHov ? 'scale(1.08)' : 'scale(1)' }} />
                  <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(180deg, transparent 30%, rgba(255,255,255,0.95) 100%)` }} />
                  {/* Icône flottante */}
                  <motion.div animate={{ rotate: isHov ? 360 : 0 }} transition={{ duration: 0.5 }}
                    style={{
                      position: 'absolute', bottom: -20, left: '1.5rem',
                      width: 52, height: 52, borderRadius: 14,
                      background: isHov ? AV.gradient : AV.white,
                      border: `1px solid ${isHov ? 'transparent' : AV.glassBorder}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      boxShadow: AV.shadow, zIndex: 2,
                    }}>
                    <Icon size={24} color={isHov ? '#fff' : AV.primary} />
                  </motion.div>
                </div>
                {/* Contenu */}
                <div style={{ padding: '2rem 1.5rem 1.5rem' }}>
                  <h3 style={{ fontFamily: AV_FONTS.display, fontWeight: 700, fontSize: '1rem', color: AV.text, marginBottom: 8 }}>
                    {s.title}
                  </h3>
                  <p style={{ fontFamily: AV_FONTS.body, fontSize: '0.85rem', color: AV.textDim, lineHeight: 1.7 }}>
                    {s.desc}
                  </p>
                </div>
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
