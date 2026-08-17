import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { AV, AV_FONTS } from './avTheme';

const articles = [
  {
    cat: 'Vidéo', catColor: AV.primary,
    title: '5 tendances vidéo à suivre en 2025 pour les marques africaines',
    excerpt: 'Le marché audiovisuel africain est en pleine ébullition. Voici les formats qui captent l\'attention et convertissent.',
    date: '12 Jan 2025', read: '5 min', img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=600&auto=format&fit=crop',
  },
  {
    cat: 'Social Media', catColor: AV.coral,
    title: 'Comment doubler votre engagement Instagram en 30 jours',
    excerpt: 'Stratégies concrètes, horaires de publication et types de contenus qui font exploser les métriques.',
    date: '28 Fév 2025', read: '7 min', img: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?q=80&w=600&auto=format&fit=crop',
  },
  {
    cat: 'Tendances', catColor: AV.turquoise,
    title: 'Pourquoi investir dans une production vidéo professionnelle',
    excerpt: 'Les chiffres parlent d\'eux-mêmes : le ROI d\'une vidéo pro vs un contenu amateur en Côte d\'Ivoire.',
    date: '15 Mar 2025', read: '6 min', img: 'https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?q=80&w=600&auto=format&fit=crop',
  },
  {
    cat: 'Branding', catColor: AV.primary,
    title: 'Créer une identité visuelle mémorable en 2025',
    excerpt: 'Les principes de design qui font la différence entre une marque oubliable et une marque iconique.',
    date: '02 Avr 2025', read: '8 min', img: 'https://images.unsplash.com/photo-1626785774573-4b7782358072?q=80&w=600&auto=format&fit=crop',
  },
  {
    cat: 'Audio', catColor: AV.coral,
    title: 'Le podcast, le format qui monte en Afrique de l\'Ouest',
    excerpt: 'Pourquoi le podcast devient un canal incontournable pour les marques et comment s\'y lancer.',
    date: '18 Avr 2025', read: '5 min', img: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=600&auto=format&fit=crop',
  },
  {
    cat: 'Événementiel', catColor: AV.turquoise,
    title: 'Réussir la couverture médiatique de votre événement',
    excerpt: 'Checklist complète pour une captation live sans faille, du repérage à la livraison.',
    date: '05 Mai 2025', read: '6 min', img: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=600&auto=format&fit=crop',
  },
];

export default function AVBlog() {
  return (
    <div style={{ background: AV.bg }}>
      {/* Hero avec image immersive */}
      <section style={{
        padding: '140px 2rem 3rem', position: 'relative', overflow: 'hidden',
        minHeight: 400,
      }}>
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: [1.1, 1, 1.1] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'url(https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?q=80&w=1920&auto=format&fit=crop)',
            backgroundSize: 'cover', backgroundPosition: 'center', zIndex: 0,
          }}
        />
        <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'linear-gradient(180deg, rgba(26,26,46,0.6) 0%, rgba(26,26,46,0.4) 50%, rgba(26,26,46,0.7) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: `linear-gradient(135deg, ${AV.primary}30 0%, transparent 50%, ${AV.turquoise}25 100%)` }} />
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 2 }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span style={{ fontFamily: AV_FONTS.mono, fontSize: '0.75rem', color: 'rgba(255,255,255,0.8)', letterSpacing: '0.2em' }}>// BLOG</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
            style={{
              fontFamily: AV_FONTS.display, fontWeight: 800,
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', color: '#fff',
              lineHeight: 1.05, marginTop: 12, marginBottom: '1.5rem', letterSpacing: '-0.02em',
            }}>
            Conseils &{' '}
            <span style={{ background: AV.gradientText, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              actualités
            </span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            style={{ fontFamily: AV_FONTS.body, fontSize: '1.15rem', color: 'rgba(255,255,255,0.8)', lineHeight: 1.8, maxWidth: 600, margin: '0 auto' }}>
            Nos analyses, conseils et tendances sur la production audiovisuelle et le marketing digital.
          </motion.p>
        </div>
      </section>

      {/* Articles */}
      <section id="av-blog" style={{ padding: '3rem 2rem 7rem' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1.5rem' }} className="av-blog-grid">
            {articles.map((a, i) => (
              <motion.article key={a.title}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                whileHover={{ y: -8, boxShadow: AV.shadowHover }}
                style={{
                  background: AV.white, border: `1px solid ${AV.glassBorder}`,
                  borderRadius: 20, overflow: 'hidden', cursor: 'pointer',
                  boxShadow: AV.shadow, transition: 'all 0.3s ease',
                }}>
                <div style={{ position: 'relative', height: 180, overflow: 'hidden' }}>
                  <img src={a.img} alt={a.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 50%, rgba(26,26,46,0.4) 100%)' }} />
                  <span style={{
                    position: 'absolute', top: 14, left: 14,
                    background: a.catColor, color: '#fff',
                    fontFamily: AV_FONTS.display, fontWeight: 700, fontSize: '0.72rem',
                    padding: '3px 10px', borderRadius: 100,
                  }}>{a.cat}</span>
                </div>
                <div style={{ padding: '1.5rem' }}>
                  <h3 style={{ fontFamily: AV_FONTS.display, fontWeight: 700, fontSize: '1rem', color: AV.text, lineHeight: 1.5, marginBottom: 10 }}>
                    {a.title}
                  </h3>
                  <p style={{ fontFamily: AV_FONTS.body, fontSize: '0.85rem', color: AV.textDim, lineHeight: 1.7, marginBottom: '1.25rem' }}>
                    {a.excerpt}
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontFamily: AV_FONTS.mono, fontSize: '0.7rem', color: AV.textFaint }}>
                      {a.date} · {a.read}
                    </span>
                    <span style={{ fontFamily: AV_FONTS.display, fontWeight: 600, fontSize: '0.8rem', color: AV.primary, display: 'flex', alignItems: 'center', gap: 4 }}>
                      Lire <ArrowRight size={13} />
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        .av-blog-grid { grid-template-columns: repeat(3,1fr) !important; }
        @media (max-width: 900px) { .av-blog-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
}
