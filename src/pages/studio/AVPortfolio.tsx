import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play } from 'lucide-react';

const G = '#e8c84a';
const BLUE = '#4d9eff';

const filters = ['Tous', 'Vidéo', 'Photo', 'Événements', 'Publicité', 'Social Media'];

const projects = [
  { id: 1, cat: 'Événements',  title: 'Gala d\'Excellence 2024',        desc: 'Couverture complète d\'une cérémonie de remise de prix', badge: 'Événement',    bg: 'linear-gradient(135deg,#1a0a2e,#2d1b4e)', emoji: '🏆', type: 'photo' },
  { id: 2, cat: 'Social Media',title: 'Campagne Social Media – Brand X', desc: '6 mois de gestion, +300% d\'engagement',               badge: 'Social Media', bg: 'linear-gradient(135deg,#0a1a2e,#1a3a5e)', emoji: '📱', type: 'photo' },
  { id: 3, cat: 'Publicité',   title: 'Spot TV – Lancement Produit',     desc: '30 secondes, diffusé sur 3 chaînes nationales',         badge: 'Publicité',    bg: 'linear-gradient(135deg,#1a0a0a,#3a1a0a)', emoji: '📺', type: 'video' },
  { id: 4, cat: 'Vidéo',       title: 'Podcast "Voix d\'Afrique"',       desc: 'Production hebdomadaire, 10 000 écoutes/épisode',       badge: 'Audio/Vidéo',  bg: 'linear-gradient(135deg,#0a1a0a,#1a3a1a)', emoji: '🎙️', type: 'video' },
  { id: 5, cat: 'Photo',       title: 'Shooting Corporate – Tech',        desc: '200 photos livrées, studio + extérieur',                badge: 'Photo',        bg: 'linear-gradient(135deg,#1a1a0a,#3a3a0a)', emoji: '📸', type: 'photo' },
  { id: 6, cat: 'Vidéo',       title: 'Mini-documentaire ONG',            desc: '15 minutes, primé au festival local',                   badge: 'Vidéo',        bg: 'linear-gradient(135deg,#0a0a1a,#1a1a3a)', emoji: '🎥', type: 'video' },
  { id: 7, cat: 'Social Media',title: 'Rebranding – Restaurant',          desc: 'Logo + charte + motion design + réseaux',               badge: 'Branding',     bg: 'linear-gradient(135deg,#1a0a1a,#3a1a2e)', emoji: '🎨', type: 'photo' },
  { id: 8, cat: 'Événements',  title: 'Conférence de Presse Live',        desc: 'Retransmission en direct sur YouTube + Facebook',       badge: 'Live Stream',  bg: 'linear-gradient(135deg,#0a1a1a,#0a3a3a)', emoji: '📡', type: 'video' },
];

export default function AVPortfolio() {
  const [active, setActive] = useState('Tous');
  const [lightbox, setLightbox] = useState<typeof projects[0] | null>(null);

  const filtered = active === 'Tous' ? projects : projects.filter(p => p.cat === active);

  return (
    <section id="av-portfolio" style={{ padding: '7rem 2rem', background: '#071228' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span style={{ fontFamily: 'JetBrains Mono', fontSize: '0.75rem', color: G, letterSpacing: '0.2em' }}>// PORTFOLIO</span>
          <h2 style={{ fontFamily: 'Space Grotesk', fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#fff', marginTop: 12, marginBottom: 12 }}>
            Nos Réalisations
          </h2>
        </motion.div>

        {/* Filtres */}
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '3rem' }}>
          {filters.map(f => (
            <motion.button key={f} whileHover={{ scale: 1.04 }} onClick={() => setActive(f)}
              style={{
                background: active === f ? `linear-gradient(135deg,${BLUE},${G})` : 'rgba(80,160,255,0.07)',
                color: active === f ? '#0c1a3e' : 'rgba(255,255,255,0.7)',
                border: `1px solid ${active === f ? BLUE : 'rgba(80,160,255,0.2)'}`,
                padding: '0.45rem 1.2rem', borderRadius: 100, fontFamily: 'Inter',
                fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer',
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
              style={{
                breakInside: 'avoid', marginBottom: '1.25rem',
                background: p.bg, borderRadius: 16, overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.08)', cursor: 'pointer',
                position: 'relative',
              }}>
              {/* Contenu card */}
              <div style={{ padding: '2.5rem 1.75rem', minHeight: 200, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{p.emoji}</div>
                <span style={{
                  fontFamily: 'JetBrains Mono', fontSize: '0.7rem', color: G,
                  background: `${G}18`, border: `1px solid ${G}33`,
                  borderRadius: 4, padding: '2px 8px', display: 'inline-block', marginBottom: 10,
                }}>{p.badge}</span>
                <h3 style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: '1rem', color: '#fff', marginBottom: 6 }}>{p.title}</h3>
                <p style={{ fontFamily: 'Inter', fontSize: '0.82rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.6 }}>{p.desc}</p>
              </div>
              {/* Hover overlay */}
              <motion.div
                initial={{ opacity: 0, y: 20 }} whileHover={{ opacity: 1, y: 0 }}
                style={{
                  position: 'absolute', inset: 0, background: `linear-gradient(to top, ${G}ee, ${G}55, transparent)`,
                  display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '1.5rem',
                }}>
                <span style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: '0.9rem', color: '#0A0A0A' }}>{p.title}</span>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#0A0A0A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {p.type === 'video' ? <Play size={16} color={G} fill={G} style={{ marginLeft: 2 }} /> : <span style={{ fontSize: '1rem' }}>👁</span>}
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
            style={{ position: 'fixed', inset: 0, zIndex: 300, background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(12px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
            <motion.div initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.85, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              style={{ background: '#1a1a1a', border: `1px solid ${G}44`, borderRadius: 20, maxWidth: 600, width: '100%', overflow: 'hidden' }}>
              <div style={{ background: lightbox.bg, height: 260, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '5rem', position: 'relative' }}>
                {lightbox.emoji}
                {lightbox.type === 'video' && (
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: 64, height: 64, borderRadius: '50%', background: `${G}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Play size={28} color="#0A0A0A" fill="#0A0A0A" style={{ marginLeft: 4 }} />
                    </div>
                  </div>
                )}
              </div>
              <div style={{ padding: '1.75rem' }}>
                <span style={{ fontFamily: 'JetBrains Mono', fontSize: '0.7rem', color: G }}>{lightbox.badge}</span>
                <h3 style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: '1.3rem', color: '#fff', margin: '8px 0' }}>{lightbox.title}</h3>
                <p style={{ fontFamily: 'Inter', fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.7 }}>{lightbox.desc}</p>
                <button onClick={() => setLightbox(null)}
                  style={{ marginTop: '1.5rem', background: G, color: '#0A0A0A', border: 'none', borderRadius: 8, padding: '0.6rem 1.5rem', fontFamily: 'Space Grotesk', fontWeight: 700, cursor: 'pointer' }}>
                  Fermer
                </button>
              </div>
              <button onClick={() => setLightbox(null)} style={{ position: 'absolute', top: 16, right: 16, background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#fff' }}>
                <X size={18} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
