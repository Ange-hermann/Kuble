import { motion } from 'framer-motion';
import { Lightbulb, Shield, Award, Globe } from 'lucide-react';
import HoloCube from './HoloCube';

const values = [
  { icon: Lightbulb, label: 'Innovation', color: '#1A6BFF' },
  { icon: Shield, label: 'Sécurité', color: '#D4AF37' },
  { icon: Award, label: 'Excellence', color: '#00A3FF' },
  { icon: Globe, label: 'Impact Local', color: '#1A6BFF' },
];

const team = [
  { name: 'Hermann Ange Boua', role: 'PDG & Fondateur', initials: 'HA', color: '#1A6BFF', flag: '🇨🇮', photo: '/pdg.jpg' },
  { name: 'Essegnimbo Norbert Sossou', role: 'DG & Co-fondateur', initials: 'EN', color: '#00A3FF', flag: '🇧🇯', photo: '/N2.jpeg' },
];

export default function About() {
  return (
    <section id="apropos" className="section-padding" style={{ background: '#0a1a42' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <span style={{ fontFamily: 'JetBrains Mono', fontSize: '0.8rem', color: '#00A3FF', letterSpacing: '0.2em', display: 'block', marginBottom: 12 }}>
            // À PROPOS
          </span>
          <h2 className="section-title">Nés en Afrique, pensés pour l'Afrique</h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'start' }}>
          {/* Left: Story */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            {/* Cube holographique */}
            <div style={{ marginBottom: '1rem' }}>
              <HoloCube size={72} color="#1A6BFF" />
            </div>

            <p style={{ fontFamily: 'Inter', fontSize: '1rem', color: 'rgba(232,244,255,0.85)', lineHeight: 1.8, marginBottom: '1.5rem' }}>
              <strong style={{ color: '#E8F4FF' }}>Fondée à <span style={{ color: '#D4AF37' }}>Abidjan en 2022</span>, Kuble porte une conviction : l'Afrique mérite une technologie de classe mondiale, bâtie par ses propres talents.</strong>
            </p>
            <p style={{ fontFamily: 'Inter', fontSize: '1rem', color: 'rgba(232,244,255,0.72)', lineHeight: 1.8, marginBottom: '2.5rem' }}>
              Situé en <strong style={{ color: '#00A3FF' }}>Côte d'Ivoire</strong>, nous accompagnons entreprises, startups et institutions dans leur transformation numérique — avec des solutions ancrées dans les réalités du continent, au service de sa <strong style={{ color: '#00A3FF' }}>souveraineté digitale</strong>.
            </p>

            {/* Values */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {values.map((v, i) => {
                const Icon = v.icon;
                return (
                  <motion.div
                    key={v.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 10,
                      padding: '0.75rem 1rem',
                      background: 'rgba(26,107,255,0.07)',
                      border: `1px solid ${v.color}33`,
                      borderRadius: 10,
                    }}
                  >
                    <Icon size={18} color={v.color} />
                    <span style={{ fontFamily: 'Space Grotesk', fontWeight: 600, fontSize: '0.85rem', color: '#E8F4FF' }}>
                      {v.label}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Right: Team */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h3 style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: '1.4rem', color: '#E8F4FF', marginBottom: '1.5rem' }}>
              Notre équipe
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.25rem', maxWidth: 360 }}>
              {team.map((member, i) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -4, boxShadow: `0 12px 28px ${member.color}22` }}
                  style={{
                    background: 'rgba(26,107,255,0.06)',
                    border: '1px solid rgba(26,107,255,0.2)',
                    borderRadius: 14,
                    padding: '1.5rem 1rem',
                    textAlign: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                >
                  {/* Avatar */}
                  <div style={{
                    width: 80, height: 80, borderRadius: '50%',
                    background: member.photo ? 'transparent' : `linear-gradient(135deg, ${member.color}, ${member.color}88)`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 0.75rem',
                    fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: '1.1rem', color: '#fff',
                    boxShadow: `0 0 20px ${member.color}55`,
                    position: 'relative',
                    overflow: 'hidden',
                    border: `2px solid ${member.color}88`,
                  }}>
                    {member.photo
                      ? <img src={member.photo} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
                      : member.initials
                    }
                    <span style={{ position: 'absolute', bottom: -2, right: -2, fontSize: '1rem' }}>
                      {member.flag}
                    </span>
                  </div>
                  <div style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: '0.9rem', color: '#E8F4FF', marginBottom: 4 }}>
                    {member.name}
                  </div>
                  <div style={{ fontFamily: 'Inter', fontSize: '0.78rem', color: 'rgba(232,244,255,0.55)' }}>
                    {member.role}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
