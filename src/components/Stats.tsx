import { motion } from 'framer-motion';
import { useCountUp } from '../hooks/useCountUp';
import { COLORS, FONTS } from '../theme/colors';

const stats = [
  { value: 50, suffix: '+', label: 'Projets livrés' },
  { value: 12, suffix: '', label: "Pays d'Afrique servis" },
  { value: 98, suffix: '%', label: 'Clients satisfaits' },
  { value: 5, suffix: '', label: "Années d'expertise" },
];

function StatItem({ value, suffix, label, delay }: { value: number; suffix: string; label: string; delay: number }) {
  const { count, ref } = useCountUp(value, 2000);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        gap: '0.5rem', flex: 1, minWidth: 120,
      }}
    >
      <span style={{
        fontFamily: FONTS.display, fontWeight: 700,
        fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
        color: COLORS.cyan,
        textShadow: `0 0 20px ${COLORS.cyanGlow}`,
        lineHeight: 1,
      }}>
        {count}{suffix}
      </span>
      <span style={{
        fontFamily: FONTS.body, fontSize: '0.95rem',
        color: COLORS.whiteDim, textAlign: 'center',
      }}>
        {label}
      </span>
    </motion.div>
  );
}

export default function Stats() {
  return (
    <section id="stats" style={{
      background: `linear-gradient(180deg, ${COLORS.navyDeep} 0%, ${COLORS.navyDark} 100%)`,
      padding: '4rem 2rem',
      borderTop: `1px solid rgba(27,111,224,0.15)`,
      borderBottom: `1px solid rgba(27,111,224,0.15)`,
    }}>
      <div style={{
        maxWidth: 1100, margin: '0 auto',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        gap: '0', flexWrap: 'wrap',
      }}>
        {stats.map((stat, i) => (
          <div key={stat.label} style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
            <StatItem {...stat} delay={i * 0.15} />
            {i < stats.length - 1 && (
              <div style={{
                width: 1, height: 60,
                background: `linear-gradient(180deg, transparent, ${COLORS.cyan}, transparent)`,
                margin: '0 1rem',
                flexShrink: 0,
              }} className="stat-divider" />
            )}
          </div>
        ))}
      </div>
      <style>{`
        @media (max-width: 600px) { .stat-divider { display: none; } }
      `}</style>
    </section>
  );
}
