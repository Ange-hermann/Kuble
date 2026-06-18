import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Video, Camera, Share2, PlayCircle, TrendingUp, Play, Radio, ChevronRight, Eye, Film, Mic } from 'lucide-react';

/* ══ Data ══ */
const services = [
  { icon: Video,       title: 'Réalisation Vidéo',          desc: 'Spots corporate, pub, motion design, after-effects.', tags: ['Corporate', 'Motion', 'Pub'],        color: '#00C2FF' },
  { icon: Camera,      title: 'Couverture Médiatique',       desc: 'Photo & vidéo d\'événements, conférences, cérémonies.', tags: ['Photo', 'Reportage', 'Live'],      color: '#1A6BFF' },
  { icon: Share2,      title: 'Réseaux Sociaux',             desc: 'Contenu, calendrier éditorial, community management.', tags: ['Instagram', 'Facebook', 'LinkedIn'], color: '#D4AF37' },
  { icon: TrendingUp,  title: 'Stratégie Digitale',          desc: 'Audit, ligne éditoriale, KPIs et accompagnement.', tags: ['Audit', 'Stratégie', 'KPIs'],         color: '#00C2FF' },
  { icon: PlayCircle,  title: 'Production de Contenu',       desc: 'YouTube, podcasts vidéo, interviews, mini-docs.', tags: ['YouTube', 'Podcast', 'Montage'],       color: '#1A6BFF' },
  { icon: Radio,       title: 'Live & Streaming',            desc: 'Événements en direct, webinaires, streaming multi-plateformes.', tags: ['Live', 'Stream', 'Web'], color: '#D4AF37' },
];

const stats = [
  { value: '50+', label: 'Vidéos produites' },
  { value: '30+', label: 'Événements couverts' },
  { value: '20+', label: 'Clients accompagnés' },
  { value: '1M+', label: 'Vues générées' },
];

const gallery = [
  { bg: 'linear-gradient(135deg,#0a1a42,#001a2e)', icon: Film,       label: 'Spot Corporatif',      sub: 'Banque BNI · 2024',      accent: '#00C2FF' },
  { bg: 'linear-gradient(135deg,#1a1000,#2a1800)', icon: Camera,     label: 'Couverture Événement', sub: 'Forum Invest CI · 2024', accent: '#D4AF37' },
  { bg: 'linear-gradient(135deg,#0a2040,#001030)', icon: Mic,        label: 'Podcast Vidéo',        sub: 'AfriTech Talks · 2024',  accent: '#1A6BFF' },
  { bg: 'linear-gradient(135deg,#001a10,#002a18)', icon: TrendingUp, label: 'Campagne Social',      sub: 'MaMairie CI · 2024',     accent: '#00ff88' },
  { bg: 'linear-gradient(135deg,#1a0020,#2a0030)', icon: Radio,      label: 'Live Streaming',       sub: 'Conférence Tech · 2023', accent: '#cc44ff' },
  { bg: 'linear-gradient(135deg,#0a1a42,#0d1e50)', icon: Eye,        label: 'Brand Identity',       sub: 'Startup Hub · 2023',     accent: '#00C2FF' },
];

const process = [
  { n: '01', title: 'Brief & Concept',   desc: 'On analyse votre besoin, votre cible et on construit le concept créatif.' },
  { n: '02', title: 'Pré-production',    desc: 'Scénario, storyboard, casting, repérage des lieux et planning de tournage.' },
  { n: '03', title: 'Production',        desc: 'Tournage professionnel, prise de vue photo, captation live.' },
  { n: '04', title: 'Post-production',   desc: 'Montage, étalonnage, sound design, motion graphics et livraison.' },
];

/* ══ Showreel placeholder ══ */
function ShowreelBlock() {
  const [playing, setPlaying] = useState(false);
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      onClick={() => setPlaying(true)}
      style={{
        position: 'relative', width: '100%', aspectRatio: '16/9',
        borderRadius: 20, overflow: 'hidden', cursor: 'pointer',
        background: 'linear-gradient(135deg, #07122e 0%, #0d1e50 50%, #001a2e 100%)',
        border: '1px solid rgba(0,194,255,0.25)',
        boxShadow: '0 0 60px rgba(0,194,255,0.15)',
      }}
    >
      <AnimatePresence>
        {!playing && (
          <motion.div
            initial={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{
              position: 'absolute', inset: 0,
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', gap: 20,
              background: 'linear-gradient(135deg,rgba(7,18,46,0.85),rgba(0,26,46,0.9))',
              zIndex: 2,
            }}
          >
            {/* Animated rings */}
            {[80, 110, 140].map((r, i) => (
              <motion.div key={i} animate={{ scale: [1, 1.08, 1], opacity: [0.3, 0.1, 0.3] }}
                transition={{ duration: 2.5, delay: i * 0.4, repeat: Infinity }}
                style={{ position: 'absolute', width: r, height: r, borderRadius: '50%', border: '1px solid rgba(0,194,255,0.4)' }} />
            ))}
            <motion.div
              whileHover={{ scale: 1.12 }}
              style={{
                width: 72, height: 72, borderRadius: '50%',
                background: 'linear-gradient(135deg,#00C2FF,#1A6BFF)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 0 30px rgba(0,194,255,0.5)',
                zIndex: 3,
              }}
            >
              <Play size={28} color="#fff" fill="#fff" style={{ marginLeft: 4 }} />
            </motion.div>
            <span style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: '1.4rem', color: '#f0f8ff', zIndex: 3 }}>
              Showreel Kuble Studio
            </span>
            <span style={{ fontFamily: 'JetBrains Mono', fontSize: '0.8rem', color: 'rgba(0,194,255,0.8)', letterSpacing: '0.1em', zIndex: 3 }}>
              2022 — 2024
            </span>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Background film-strip decorations */}
      <div style={{ position: 'absolute', inset: 0, display: 'grid', gridTemplateColumns: 'repeat(8,1fr)', gap: 2, opacity: 0.06, pointerEvents: 'none' }}>
        {Array.from({ length: 32 }).map((_, i) => (
          <div key={i} style={{ background: 'rgba(0,194,255,0.4)', borderRadius: 2 }} />
        ))}
      </div>
    </motion.div>
  );
}

/* ══ Gallery card ══ */
function GalleryCard({ item, i }: { item: typeof gallery[0]; i: number }) {
  const [hov, setHov] = useState(false);
  const Icon = item.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
      onHoverStart={() => setHov(true)} onHoverEnd={() => setHov(false)}
      style={{
        background: item.bg, borderRadius: 16,
        border: `1px solid ${item.accent}33`,
        overflow: 'hidden', position: 'relative',
        aspectRatio: i === 0 ? '16/9' : '4/3',
        gridColumn: i === 0 ? 'span 2' : 'span 1',
        cursor: 'pointer',
        boxShadow: hov ? `0 0 30px ${item.accent}33` : 'none',
        transition: 'box-shadow 0.3s',
      }}
    >
      <motion.div animate={{ scale: hov ? 1.06 : 1 }} transition={{ duration: 0.4 }} style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 12, padding: '2rem' }}>
        <div style={{ width: 56, height: 56, borderRadius: 14, background: `${item.accent}20`, border: `1px solid ${item.accent}55`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon size={24} color={item.accent} />
        </div>
        <span style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: '1rem', color: '#f0f8ff', textAlign: 'center' }}>{item.label}</span>
        <span style={{ fontFamily: 'JetBrains Mono', fontSize: '0.72rem', color: `${item.accent}cc`, letterSpacing: '0.08em' }}>{item.sub}</span>
      </motion.div>
      <AnimatePresence>
        {hov && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg,${item.accent}22,transparent)`, display: 'flex', alignItems: 'flex-end', padding: '1.5rem' }}>
            <span style={{ fontFamily: 'Space Grotesk', fontWeight: 600, fontSize: '0.85rem', color: item.accent, display: 'flex', alignItems: 'center', gap: 6 }}>
              Voir le projet <ChevronRight size={14} />
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ══ Page ══ */
export default function AudioVisuel() {
  return (
    <div style={{ minHeight: '100vh', background: '#06102a', color: '#f0f8ff', fontFamily: 'Inter, sans-serif' }}>

      {/* ── Navbar ── */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        padding: '0 2.5rem', height: 70,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: 'rgba(6,16,42,0.92)', backdropFilter: 'blur(24px)',
        borderBottom: '1px solid rgba(0,194,255,0.15)',
      }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#00C2FF', textDecoration: 'none', fontFamily: 'Space Grotesk', fontWeight: 600, fontSize: '0.95rem' }}>
          <ArrowLeft size={16} /> Retour
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#00C2FF', boxShadow: '0 0 8px #00C2FF', animation: 'pulse 2s infinite' }} />
          <span style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: '1.1rem' }}>
            Kuble <span style={{ color: '#00C2FF' }}>Studio</span>
          </span>
        </div>
        <motion.a href="mailto:contact@kuble.ci" whileHover={{ scale: 1.05 }}
          style={{ background: 'linear-gradient(135deg,#00C2FF,#1A6BFF)', color: '#fff', padding: '0.45rem 1.2rem', borderRadius: 8, fontFamily: 'Space Grotesk', fontWeight: 600, fontSize: '0.85rem', textDecoration: 'none' }}>
          Devis gratuit
        </motion.a>
      </nav>

      {/* ── Hero ── */}
      <section style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center',
        padding: '7rem 2.5rem 4rem', position: 'relative', overflow: 'hidden',
        background: 'linear-gradient(135deg, #07122e 0%, #0d1e50 50%, #001a2e 100%)',
      }}>
        <div style={{ position: 'absolute', top: '10%', left: '5%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle,rgba(0,194,255,0.12) 0%,transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '10%', right: '5%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle,rgba(212,175,55,0.08) 0%,transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
          {/* Left text */}
          <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9 }}>
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(0,194,255,0.1)', border: '1px solid rgba(0,194,255,0.3)', borderRadius: 100, padding: '5px 16px', marginBottom: '1.5rem' }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#00C2FF', boxShadow: '0 0 6px #00C2FF' }} />
              <span style={{ fontFamily: 'JetBrains Mono', fontSize: '0.75rem', color: '#00C2FF', letterSpacing: '0.15em' }}>KUBLE STUDIO — AUDIOVISUEL</span>
            </motion.div>

            <h1 style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: 'clamp(2.4rem,5vw,4rem)', lineHeight: 1.1, marginBottom: '1.5rem' }}>
              Votre Image,<br />
              <span style={{ background: 'linear-gradient(135deg,#00C2FF 0%,#D4AF37 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Notre Création
              </span>
            </h1>

            <p style={{ fontSize: '1.05rem', color: 'rgba(240,248,255,0.75)', lineHeight: 1.85, marginBottom: '2.5rem', maxWidth: 460 }}>
              Réalisation vidéo, couverture médiatique, gestion de comptes — <strong style={{ color: '#f0f8ff' }}>Kuble Studio</strong> propulse la visibilité des entreprises et institutions africaines.
            </p>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <motion.a href="mailto:contact@kuble.ci" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'linear-gradient(135deg,#00C2FF,#1A6BFF)', color: '#fff', padding: '0.85rem 2rem', borderRadius: 10, fontFamily: 'Space Grotesk', fontWeight: 600, fontSize: '0.95rem', textDecoration: 'none', boxShadow: '0 0 28px rgba(0,194,255,0.35)' }}>
                <Video size={18} /> Demander un devis
              </motion.a>
              <motion.a href="#gallery" whileHover={{ scale: 1.04 }}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'transparent', color: '#f0f8ff', padding: '0.85rem 2rem', borderRadius: 10, fontFamily: 'Space Grotesk', fontWeight: 600, fontSize: '0.95rem', textDecoration: 'none', border: '1px solid rgba(240,248,255,0.25)' }}>
                <Eye size={18} /> Voir nos réalisations
              </motion.a>
            </div>
          </motion.div>

          {/* Right: showreel */}
          <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, delay: 0.2 }}>
            <ShowreelBlock />
          </motion.div>
        </div>
      </section>

      {/* ── Stats bar ── */}
      <section style={{ padding: '3rem 2.5rem', background: 'rgba(0,194,255,0.05)', borderTop: '1px solid rgba(0,194,255,0.12)', borderBottom: '1px solid rgba(0,194,255,0.12)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '2rem', textAlign: 'center' }}>
          {stats.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <div style={{ fontFamily: 'Space Grotesk', fontWeight: 800, fontSize: '2.2rem', background: 'linear-gradient(135deg,#00C2FF,#D4AF37)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{s.value}</div>
              <div style={{ fontSize: '0.85rem', color: 'rgba(240,248,255,0.6)', marginTop: 4 }}>{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Gallery ── */}
      <section id="gallery" style={{ padding: '7rem 2.5rem' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ marginBottom: '3.5rem' }}>
            <span style={{ fontFamily: 'JetBrains Mono', fontSize: '0.78rem', color: '#00C2FF', letterSpacing: '0.2em' }}>// RÉALISATIONS</span>
            <h2 style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: 'clamp(1.8rem,3.5vw,2.8rem)', marginTop: 12 }}>
              Nos Productions
            </h2>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1.2rem' }}>
            {gallery.map((item, i) => <GalleryCard key={item.label} item={item} i={i} />)}
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section style={{ padding: '7rem 2.5rem', background: 'rgba(10,26,66,0.6)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span style={{ fontFamily: 'JetBrains Mono', fontSize: '0.78rem', color: '#00C2FF', letterSpacing: '0.2em' }}>// PRESTATIONS</span>
            <h2 style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: 'clamp(1.8rem,3.5vw,2.8rem)', marginTop: 12, marginBottom: 12 }}>Ce que nous créons</h2>
            <p style={{ color: 'rgba(240,248,255,0.65)', fontSize: '1rem', maxWidth: 500, margin: '0 auto' }}>Du brief à la diffusion, nous gérons l'intégralité de votre production.</p>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '1.25rem' }}>
            {services.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div key={s.title}
                  initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                  whileHover={{ y: -5, boxShadow: `0 16px 36px ${s.color}1a` }}
                  style={{ background: 'rgba(40,120,255,0.07)', border: `1px solid rgba(40,120,255,0.22)`, borderRadius: 14, padding: '1.75rem', transition: 'all 0.3s' }}
                >
                  <div style={{ width: 46, height: 46, borderRadius: 12, background: `${s.color}18`, border: `1px solid ${s.color}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.1rem' }}>
                    <Icon size={20} color={s.color} />
                  </div>
                  <h3 style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: '1rem', color: '#f0f8ff', marginBottom: 6 }}>{s.title}</h3>
                  <p style={{ fontSize: '0.875rem', color: 'rgba(240,248,255,0.62)', lineHeight: 1.7, marginBottom: '1rem' }}>{s.desc}</p>
                  <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                    {s.tags.map(t => (
                      <span key={t} style={{ fontFamily: 'JetBrains Mono', fontSize: '0.68rem', color: s.color, background: `${s.color}14`, border: `1px solid ${s.color}30`, borderRadius: 4, padding: '2px 7px' }}>{t}</span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Process ── */}
      <section style={{ padding: '7rem 2.5rem' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span style={{ fontFamily: 'JetBrains Mono', fontSize: '0.78rem', color: '#00C2FF', letterSpacing: '0.2em' }}>// NOTRE MÉTHODE</span>
            <h2 style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: 'clamp(1.8rem,3.5vw,2.8rem)', marginTop: 12 }}>De l'idée à l'écran</h2>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: '2rem' }}>
            {process.map((p, i) => (
              <motion.div key={p.n} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                style={{ textAlign: 'center', position: 'relative' }}>
                <div style={{ fontFamily: 'Space Grotesk', fontWeight: 800, fontSize: '3rem', color: 'rgba(0,194,255,0.15)', lineHeight: 1, marginBottom: 8 }}>{p.n}</div>
                <div style={{ width: 40, height: 2, background: 'linear-gradient(90deg,#00C2FF,#1A6BFF)', margin: '0 auto 1rem', borderRadius: 2 }} />
                <h3 style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: '1rem', color: '#f0f8ff', marginBottom: 8 }}>{p.title}</h3>
                <p style={{ fontSize: '0.85rem', color: 'rgba(240,248,255,0.6)', lineHeight: 1.7 }}>{p.desc}</p>
                {i < process.length - 1 && (
                  <div style={{ position: 'absolute', top: '3.5rem', right: '-1rem', color: 'rgba(0,194,255,0.3)', fontSize: '1.5rem', display: 'none' }}>→</div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{
        padding: '6rem 2.5rem', textAlign: 'center',
        background: 'linear-gradient(135deg,rgba(0,194,255,0.08),rgba(26,107,255,0.10))',
        borderTop: '1px solid rgba(0,194,255,0.15)',
      }}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: 'clamp(1.8rem,4vw,2.8rem)', marginBottom: '1rem' }}>
            Prêt à donner vie à votre projet ?
          </h2>
          <p style={{ color: 'rgba(240,248,255,0.68)', fontSize: '1rem', marginBottom: '2.5rem', maxWidth: 440, margin: '0 auto 2.5rem' }}>
            Contactez Kuble Studio pour un devis gratuit et personnalisé.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <motion.a href="mailto:contact@kuble.ci" whileHover={{ scale: 1.04 }}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'linear-gradient(135deg,#00C2FF,#1A6BFF)', color: '#fff', padding: '0.85rem 2.2rem', borderRadius: 10, fontFamily: 'Space Grotesk', fontWeight: 600, fontSize: '0.95rem', textDecoration: 'none', boxShadow: '0 0 28px rgba(0,194,255,0.3)' }}>
              Nous écrire
            </motion.a>
            <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'transparent', color: '#f0f8ff', padding: '0.85rem 2.2rem', borderRadius: 10, fontFamily: 'Space Grotesk', fontWeight: 600, fontSize: '0.95rem', textDecoration: 'none', border: '1px solid rgba(240,248,255,0.2)' }}>
              <ArrowLeft size={16} /> Retour au site
            </Link>
          </div>
        </motion.div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .av-hero-grid { grid-template-columns: 1fr !important; }
          .av-gallery-grid { grid-template-columns: 1fr !important; }
          .av-gallery-grid > *:first-child { grid-column: span 1 !important; }
          .av-stats { grid-template-columns: repeat(2,1fr) !important; }
        }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
      `}</style>
    </div>
  );
}
