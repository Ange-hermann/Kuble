import { useState } from 'react';
import { motion } from 'framer-motion';
import { COLORS, FONTS } from '../theme/colors';

const row1 = [
  { name: 'React', emoji: '⚛️' },
  { name: 'Next.js', emoji: '▲' },
  { name: 'Node.js', emoji: '🟢' },
  { name: 'Python', emoji: '🐍' },
  { name: 'Flutter', emoji: '💙' },
  { name: 'React Native', emoji: '📱' },
  { name: 'AWS', emoji: '☁️' },
  { name: 'Docker', emoji: '🐳' },
  { name: 'Kubernetes', emoji: '⎈' },
];

const row2 = [
  { name: 'PostgreSQL', emoji: '🐘' },
  { name: 'MongoDB', emoji: '🍃' },
  { name: 'TensorFlow', emoji: '🧠' },
  { name: 'OpenAI', emoji: '✨' },
  { name: 'Laravel', emoji: '🔴' },
  { name: 'Vue.js', emoji: '💚' },
  { name: 'Figma', emoji: '🎨' },
  { name: 'Nginx', emoji: '⚙️' },
  { name: 'Linux', emoji: '🐧' },
];

function TechBadge({ name, emoji }: { name: string; emoji: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ scale: 1.08 }}
      style={{
        display: 'flex', alignItems: 'center', gap: '0.6rem',
        padding: '0.6rem 1.2rem',
        borderRadius: 10,
        background: hovered ? 'rgba(91,200,242,0.12)' : 'rgba(27,111,224,0.04)',
        border: `1px solid ${hovered ? 'rgba(91,200,242,0.5)' : 'rgba(10,22,80,0.08)'}`,
        backdropFilter: 'blur(8px)',
        cursor: 'default',
        transition: 'all 0.25s',
        whiteSpace: 'nowrap',
        margin: '0 0.4rem',
        boxShadow: hovered ? '0 0 16px rgba(91,200,242,0.25)' : 'none',
      }}
    >
      <span style={{ fontSize: '1.1rem' }}>{emoji}</span>
      <span style={{
        fontFamily: 'Space Grotesk', fontWeight: 600, fontSize: '0.85rem',
        color: hovered ? '#5BC8F2' : 'rgba(10,22,80,0.7)',
        transition: 'color 0.25s',
      }}>
        {name}
      </span>
    </motion.div>
  );
}

export default function TechStack() {
  const doubledRow1 = [...row1, ...row1];
  const doubledRow2 = [...row2, ...row2];

  return (
    <section style={{ padding: '6rem 0', background: 'linear-gradient(180deg, #F0F5FF 0%, #E8F0FE 100%)', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '3rem', padding: '0 2rem' }}
        >
          <span style={{ fontFamily: FONTS.mono, fontSize: '0.78rem', color: COLORS.electric, letterSpacing: '0.2em', display: 'block', marginBottom: 12 }}>
            // TECHNOLOGIES
          </span>
          <h2 style={{ fontFamily: FONTS.display, fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 3rem)', color: COLORS.navyDeep, letterSpacing: '-0.02em' }}>Notre Stack Technologique</h2>
          <p style={{ fontFamily: FONTS.body, fontSize: '1.05rem', color: 'rgba(10,22,80,0.55)', maxWidth: 500, margin: '1rem auto 0' }}>
            Les meilleurs outils du marché, maîtrisés par nos experts.
          </p>
        </motion.div>
      </div>

      {/* Row 1 — left scroll */}
      <div style={{ overflow: 'hidden', marginBottom: '1rem' }}>
        <div className="carousel-track-left" style={{ display: 'flex', padding: '0.5rem 0' }}>
          {doubledRow1.map((tech, i) => (
            <TechBadge key={`r1-${i}`} name={tech.name} emoji={tech.emoji} />
          ))}
        </div>
      </div>

      {/* Row 2 — right scroll */}
      <div style={{ overflow: 'hidden' }}>
        <div className="carousel-track-right" style={{ display: 'flex', padding: '0.5rem 0' }}>
          {doubledRow2.map((tech, i) => (
            <TechBadge key={`r2-${i}`} name={tech.name} emoji={tech.emoji} />
          ))}
        </div>
      </div>
    </section>
  );
}
