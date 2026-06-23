import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const G = '#e8c84a';

const articles = [
  {
    cat: 'Vidéo', catColor: '#00C2FF',
    title: '5 tendances vidéo à suivre en 2025 pour les marques africaines',
    excerpt: 'Le marché audiovisuel africain est en pleine ébullition. Voici les formats qui captent l\'attention et convertissent.',
    date: '12 Jan 2025', read: '5 min', emoji: '🎥',
    bg: 'linear-gradient(135deg, #0a1a2e, #1a2e4a)',
  },
  {
    cat: 'Social Media', catColor: G,
    title: 'Comment doubler votre engagement Instagram en 30 jours',
    excerpt: 'Stratégies concrètes, horaires de publication et types de contenus qui font exploser les métriques.',
    date: '28 Fév 2025', read: '7 min', emoji: '📱',
    bg: 'linear-gradient(135deg, #1a0a2e, #2e1a4a)',
  },
  {
    cat: 'Tendances', catColor: '#c084fc',
    title: 'Pourquoi investir dans une production vidéo professionnelle',
    excerpt: 'Les chiffres parlent d\'eux-mêmes : le ROI d\'une vidéo pro vs un contenu amateur en Côte d\'Ivoire.',
    date: '15 Mar 2025', read: '6 min', emoji: '📈',
    bg: 'linear-gradient(135deg, #0a1a0a, #1a3a1a)',
  },
];

export default function AVBlog() {
  return (
    <section id="av-blog" style={{ padding: '7rem 2rem', background: '#0c1a3e' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span style={{ fontFamily: 'JetBrains Mono', fontSize: '0.75rem', color: G, letterSpacing: '0.2em' }}>// BLOG</span>
          <h2 style={{ fontFamily: 'Space Grotesk', fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#fff', marginTop: 12 }}>
            Nos Conseils & Actualités
          </h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1.5rem' }} className="av-blog-grid">
          {articles.map((a, i) => (
            <motion.article key={a.title}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              style={{ background: 'rgba(80,160,255,0.06)', border: '1px solid rgba(80,160,255,0.18)', borderRadius: 18, overflow: 'hidden', cursor: 'pointer' }}>
              {/* Image/cover */}
              <div style={{ background: a.bg, height: 180, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '4rem', position: 'relative' }}>
                {a.emoji}
                <span style={{
                  position: 'absolute', top: 14, left: 14,
                  background: a.catColor, color: '#0A0A0A',
                  fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: '0.72rem',
                  padding: '3px 10px', borderRadius: 100,
                }}>{a.cat}</span>
              </div>
              {/* Contenu */}
              <div style={{ padding: '1.5rem' }}>
                <h3 style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: '1rem', color: '#fff', lineHeight: 1.5, marginBottom: 10 }}>
                  {a.title}
                </h3>
                <p style={{ fontFamily: 'Inter', fontSize: '0.85rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, marginBottom: '1.25rem' }}>
                  {a.excerpt}
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontFamily: 'JetBrains Mono', fontSize: '0.7rem', color: 'rgba(255,255,255,0.35)' }}>
                    {a.date} · {a.read}
                  </span>
                  <span style={{ fontFamily: 'Space Grotesk', fontWeight: 600, fontSize: '0.8rem', color: G, display: 'flex', alignItems: 'center', gap: 4 }}>
                    Lire <ArrowRight size={13} />
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
      <style>{`
        .av-blog-grid { grid-template-columns: repeat(3,1fr) !important; }
        @media (max-width: 900px) { .av-blog-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
