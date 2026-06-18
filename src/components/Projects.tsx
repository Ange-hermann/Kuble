import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

const filters = ['Tous', 'Web', 'Mobile', 'IA', 'Sécurité'];

const projects: {
  id: number; categories: string[]; title: string; desc: string;
  stack: string[]; color: string; emoji: string; bg: string;
  image?: string; link?: string;
}[] = [
  {
    id: 1, categories: ['Web', 'Mobile'],
    title: 'MaMairie',
    desc: 'Application web & mobile de services municipaux en ligne pour les mairies ivoiriennes.',
    stack: ['React', 'Mobile', 'Services publics'],
    color: '#00C2FF',
    emoji: '🏛️',
    bg: 'linear-gradient(135deg, #020818 0%, #001a2e 100%)',
    image: '/mairie.jpeg',
    link: 'https://mamairieci.netlify.app/',
  },
];

function ProjectMockup({ project }: { project: typeof projects[0] }) {
  if (project.image) {
    return (
      <div style={{
        width: '100%', height: 180,
        borderRadius: '12px 12px 0 0',
        overflow: 'hidden',
        border: `1px solid ${project.color}33`,
        borderBottom: 'none',
        position: 'relative',
      }}>
        <img src={project.image} alt={project.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: `linear-gradient(to top, ${project.color}44 0%, transparent 60%)`,
        }} />
      </div>
    );
  }
  return (
    <div style={{
      width: '100%', height: 180,
      background: project.bg,
      borderRadius: '12px 12px 0 0',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      position: 'relative', overflow: 'hidden',
      border: `1px solid ${project.color}33`,
      borderBottom: 'none',
    }}>
      <div style={{ position: 'absolute', inset: 0, padding: '1.5rem' }}>
        <div style={{ height: 8, width: '60%', background: `${project.color}44`, borderRadius: 4, marginBottom: 8 }} />
        <div style={{ height: 6, width: '40%', background: `${project.color}22`, borderRadius: 4, marginBottom: 20 }} />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {[80, 60, 90, 70].map((_w, i) => (
            <div key={i} style={{ height: 32, background: `${project.color}18`, borderRadius: 6, border: `1px solid ${project.color}22` }} />
          ))}
        </div>
        <div style={{ height: 6, width: '80%', background: `${project.color}15`, borderRadius: 4, marginTop: 12 }} />
        <div style={{ height: 6, width: '55%', background: `${project.color}10`, borderRadius: 4, marginTop: 6 }} />
      </div>
      <span style={{ fontSize: '2.5rem', position: 'relative', zIndex: 1, filter: 'drop-shadow(0 0 12px rgba(0,163,255,0.5))' }}>
        {project.emoji}
      </span>
    </div>
  );
}

export default function Projects() {
  const [active, setActive] = useState('Tous');

  const filtered = active === 'Tous' ? projects : projects.filter((p) => p.categories.includes(active));

  return (
    <section id="projets" className="section-padding" style={{ background: '#050F2C' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '3rem' }}
        >
          <span style={{ fontFamily: 'JetBrains Mono', fontSize: '0.8rem', color: '#00A3FF', letterSpacing: '0.2em', display: 'block', marginBottom: 12 }}>
            // RÉALISATIONS
          </span>
          <h2 className="section-title">Nos Réalisations</h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Des produits concrets qui transforment les entreprises africaines.
          </p>
        </motion.div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', marginBottom: '3rem', flexWrap: 'wrap' }}>
          {filters.map((f) => (
            <motion.button
              key={f}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActive(f)}
              style={{
                padding: '0.5rem 1.25rem',
                borderRadius: 100,
                fontFamily: 'Space Grotesk', fontWeight: 600, fontSize: '0.85rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                border: active === f ? 'none' : '1px solid rgba(26,107,255,0.3)',
                background: active === f ? 'linear-gradient(135deg, #1A6BFF, #00A3FF)' : 'transparent',
                color: active === f ? '#fff' : 'rgba(232,244,255,0.7)',
                boxShadow: active === f ? '0 0 16px rgba(0,163,255,0.4)' : 'none',
              }}
            >
              {f}
            </motion.button>
          ))}
        </div>

        {/* Grid */}
        <motion.div layout style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                whileHover={{ y: -6 }}
                onClick={() => project.link && window.open(project.link, '_blank')}
                style={{
                  borderRadius: 14,
                  overflow: 'hidden',
                  border: '1px solid rgba(26,107,255,0.2)',
                  position: 'relative', cursor: project.link ? 'pointer' : 'default',
                }}
                className="project-card"
              >
                {/* Mockup */}
                <ProjectMockup project={project} />

                {/* Info */}
                <div style={{
                  padding: '1.25rem',
                  background: 'rgba(5,15,44,0.95)',
                  borderTop: `1px solid ${project.color}33`,
                }}>
                  <h3 style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: '1.05rem', color: '#E8F4FF', marginBottom: 6 }}>
                    {project.title}
                  </h3>
                  <p style={{ fontFamily: 'Inter', fontSize: '0.85rem', color: 'rgba(232,244,255,0.6)', marginBottom: 12, lineHeight: 1.5 }}>
                    {project.desc}
                  </p>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {project.stack.map((tech) => (
                      <span key={tech} style={{
                        fontFamily: 'JetBrains Mono', fontSize: '0.7rem',
                        color: project.color,
                        background: `${project.color}15`,
                        border: `1px solid ${project.color}33`,
                        borderRadius: 4, padding: '2px 8px',
                      }}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Hover overlay */}
                <div className="project-overlay" style={{
                  position: 'absolute', inset: 0,
                  background: `linear-gradient(135deg, ${project.color}dd, rgba(0,163,255,0.9))`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  opacity: 0, transition: 'opacity 0.3s ease',
                }}>
                  <button style={{
                    background: '#fff', color: project.color,
                    padding: '0.75rem 1.5rem', borderRadius: 8,
                    fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: '0.9rem',
                    border: 'none', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: 8,
                  }}>
                    Voir le projet <ExternalLink size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <style>{`
        .project-card:hover .project-overlay { opacity: 1 !important; }
      `}</style>
    </section>
  );
}
