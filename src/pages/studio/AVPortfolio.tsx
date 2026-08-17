import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play } from 'lucide-react';
import { AV, AV_FONTS } from './avTheme';

const filters = ['Tous', 'Vidéo', 'Photo', 'Événements', 'Publicité', 'Social Media'];

const projects = [
  { id: 1, cat: 'Événements',   title: 'Gala d\'Excellence 2024',        desc: 'Couverture complète d\'une cérémonie de remise de prix', badge: 'Événement',    img: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=600&auto=format&fit=crop', type: 'photo' },
  { id: 2, cat: 'Social Media', title: 'Campagne Social Media – Brand X', desc: '6 mois de gestion, +300% d\'engagement',               badge: 'Social Media', img: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?q=80&w=600&auto=format&fit=crop', type: 'photo' },
  { id: 3, cat: 'Publicité',    title: 'Spot TV – Lancement Produit',     desc: '30 secondes, diffusé sur 3 chaînes nationales',         badge: 'Publicité',    img: 'https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?q=80&w=600&auto=format&fit=crop', type: 'video' },
  { id: 4, cat: 'Vidéo',        title: 'Podcast "Voix d\'Afrique"',       desc: 'Production hebdomadaire, 10 000 écoutes/épisode',       badge: 'Audio/Vidéo',  img: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=600&auto=format&fit=crop', type: 'video' },
  { id: 5, cat: 'Photo',        title: 'Shooting Corporate – Tech',        desc: '200 photos livrées, studio + extérieur',                badge: 'Photo',        img: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?q=80&w=600&auto=format&fit=crop', type: 'photo' },
  { id: 6, cat: 'Vidéo',        title: 'Mini-documentaire ONG',            desc: '15 minutes, primé au festival local',                   badge: 'Vidéo',        img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=600&auto=format&fit=crop', type: 'video' },
  { id: 7, cat: 'Social Media', title: 'Rebranding – Restaurant',          desc: 'Logo + charte + motion design + réseaux',               badge: 'Branding',     img: 'https://images.unsplash.com/photo-1626785774573-4b7782358072?q=80&w=600&auto=format&fit=crop', type: 'photo' },
  { id: 8, cat: 'Événements',   title: 'Conférence de Presse Live',        desc: 'Retransmission en direct sur YouTube + Facebook',       badge: 'Live Stream',  img: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=600&auto=format&fit=crop', type: 'video' },
];

export default function AVPortfolio() {
  const [active, setActive] = useState('Tous');
  const [lightbox, setLightbox] = useState<typeof projects[0] | null>(null);

  const filtered = active === 'Tous' ? projects : projects.filter(p => p.cat === active);

  return (
    <section id="av-portfolio" style={{ padding: '7rem 2rem', background: AV.bgCoral }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span style={{ fontFamily: AV_FONTS.mono, fontSize: '0.75rem', color: AV.primary, letterSpacing: '0.2em' }}>// PORTFOLIO</span>
          <h2 style={{ fontFamily: AV_FONTS.display, fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 3rem)', color: AV.text, marginTop: 12, marginBottom: 12 }}>
            Nos Réalisations
          </h2>
        </motion.div>

        {/* Filtres */}
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '3rem' }}>
          {filters.map(f => (
            <motion.button key={f} whileHover={{ scale: 1.04 }} onClick={() => setActive(f)}
              style={{
                background: active === f ? AV.gradient : AV.white,
                color: active === f ? '#fff' : AV.textSoft,
                border: `1px solid ${active === f ? 'transparent' : AV.glassBorder}`,
                padding: '0.45rem 1.2rem', borderRadius: 100, fontFamily: AV_FONTS.body,
                fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer',
                boxShadow: active === f ? `0 4px 16px ${AV.primary}25` : 'none',
                transition: 'all 0.3s',
              }}>
              {f}
            </motion.button>
          ))}
        </div>

        {/* Grille masonry */}
        <div style={{ columns: '3 280px', gap: '1.25rem' }}>
          {filtered.map((p, i) => (
            <motion.div key={p.id}
              layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
              onClick={() => setLightbox(p)}
              whileHover={{ y: -6, boxShadow: AV.shadowHover }}
              style={{
                breakInside: 'avoid', marginBottom: '1.25rem',
                background: AV.white, borderRadius: 20, overflow: 'hidden',
                border: `1px solid ${AV.glassBorder}`, cursor: 'pointer',
                position: 'relative', boxShadow: AV.shadow, transition: 'all 0.3s ease',
              }}>
              {/* Image avec overlay */}
              <div style={{ position: 'relative', minHeight: 240, overflow: 'hidden' }}>
                <img src={p.img} alt={p.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0, transition: 'transform 0.4s ease', transform: 'scale(1)' }} />
                <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(180deg, transparent 30%, rgba(26,26,46,0.85) 100%)` }} />
                {/* Contenu sur l'image */}
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1.75rem', zIndex: 2 }}>
                  <span style={{
                    fontFamily: AV_FONTS.mono, fontSize: '0.7rem', color: '#fff',
                    background: `${AV.primary}99`, border: `1px solid ${AV.primary}`,
                    borderRadius: 6, padding: '3px 10px', display: 'inline-block', marginBottom: 10, width: 'fit-content',
                  }}>{p.badge}</span>
                  <h3 style={{ fontFamily: AV_FONTS.display, fontWeight: 700, fontSize: '1rem', color: '#fff', marginBottom: 6 }}>{p.title}</h3>
                  <p style={{ fontFamily: AV_FONTS.body, fontSize: '0.82rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>{p.desc}</p>
                </div>
              </div>
              {/* Hover overlay */}
              <motion.div
                initial={{ opacity: 0 }} whileHover={{ opacity: 1 }}
                style={{
                  position: 'absolute', inset: 0, background: `${AV.white}E6`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                <div style={{
                  width: 48, height: 48, borderRadius: '50%', background: AV.gradient,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: `0 8px 24px ${AV.primary}33`,
                }}>
                  {p.type === 'video' ? <Play size={20} color="#fff" fill="#fff" style={{ marginLeft: 2 }} /> : <span style={{ fontSize: '1.2rem' }}>👁</span>}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            style={{ position: 'fixed', inset: 0, zIndex: 300, background: 'rgba(26,26,46,0.5)', backdropFilter: 'blur(12px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
            <motion.div initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.85, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              style={{ background: AV.white, border: `1px solid ${AV.glassBorder}`, borderRadius: 24, maxWidth: 600, width: '100%', overflow: 'hidden', position: 'relative', boxShadow: AV.shadowHover }}>
              <div style={{ height: 280, position: 'relative', overflow: 'hidden' }}>
                <img src={lightbox.img} alt={lightbox.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 50%, rgba(26,26,46,0.6) 100%)' }} />
                {lightbox.type === 'video' && (
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: 64, height: 64, borderRadius: '50%', background: AV.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 8px 24px ${AV.primary}33` }}>
                      <Play size={28} color="#fff" fill="#fff" style={{ marginLeft: 4 }} />
                    </div>
                  </div>
                )}
              </div>
              <div style={{ padding: '1.75rem' }}>
                <span style={{ fontFamily: AV_FONTS.mono, fontSize: '0.7rem', color: AV.primary }}>{lightbox.badge}</span>
                <h3 style={{ fontFamily: AV_FONTS.display, fontWeight: 700, fontSize: '1.3rem', color: AV.text, margin: '8px 0' }}>{lightbox.title}</h3>
                <p style={{ fontFamily: AV_FONTS.body, fontSize: '0.9rem', color: AV.textDim, lineHeight: 1.7 }}>{lightbox.desc}</p>
                <button onClick={() => setLightbox(null)}
                  style={{ marginTop: '1.5rem', background: AV.gradient, color: '#fff', border: 'none', borderRadius: 10, padding: '0.6rem 1.5rem', fontFamily: AV_FONTS.display, fontWeight: 700, cursor: 'pointer', boxShadow: `0 4px 16px ${AV.primary}25` }}>
                  Fermer
                </button>
              </div>
              <button onClick={() => setLightbox(null)} style={{ position: 'absolute', top: 16, right: 16, background: 'rgba(255,255,255,0.9)', border: `1px solid ${AV.glassBorder}`, borderRadius: '50%', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: AV.text }}>
                <X size={18} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
