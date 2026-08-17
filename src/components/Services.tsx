import { useState } from 'react';
import { motion } from 'framer-motion';
import { Globe, Smartphone, Shield, Bot, Cloud, GitMerge } from 'lucide-react';
import HoloCube from './HoloCube';
import { COLORS, FONTS } from '../theme/colors';

const services = [
  {
    icon: Globe, color: '#1B6FE0',
    title: 'Développement Web',
    desc: 'Sites vitrine, e-commerce, portails métiers.',
    stack: 'React · Next.js · Laravel',
  },
  {
    icon: Smartphone, color: '#5BC8F2',
    title: 'Applications Mobiles',
    desc: "iOS & Android — UX pensée pour l'Afrique.",
    stack: 'React Native · Flutter',
  },
  {
    icon: Shield, color: '#5BC8F2',
    title: 'Cybersécurité',
    desc: 'Audit, pentest, protection — certifiés ISO 27001.',
    stack: 'SIEM · Pentest · ISO 27001',
  },
  {
    icon: Bot, color: '#5BC8F2',
    title: 'Intelligence Artificielle',
    desc: 'Chatbots, automatisation, ML sur mesure.',
    stack: 'OpenAI · TensorFlow · Python',
  },
  {
    icon: Cloud, color: '#1B6FE0',
    title: 'Cloud & Infrastructure',
    desc: 'AWS, Azure, hébergement local africain.',
    stack: 'AWS · Azure · Docker · K8s',
  },
  {
    icon: GitMerge, color: '#5BC8F2',
    title: 'Intégration Systèmes',
    desc: 'APIs, ERP, connecteurs de données métiers.',
    stack: 'REST · GraphQL · ERP',
  },
];


export default function Services() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="services" style={{ padding: '6rem 2rem', background: 'linear-gradient(180deg, #E8F0FE 0%, #F0F5FF 100%)', position: 'relative' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <span style={{
            fontFamily: FONTS.mono, fontSize: '0.78rem', color: COLORS.electric,
            letterSpacing: '0.2em', display: 'block', marginBottom: 12,
          }}>
            // NOS EXPERTISES
          </span>
          <h2 style={{ fontFamily: FONTS.display, fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 3rem)', color: COLORS.navyDeep, letterSpacing: '-0.02em' }}>Ce que nous construisons</h2>
          <p style={{ fontFamily: FONTS.body, fontSize: '1.05rem', color: 'rgba(10,22,80,0.55)', maxWidth: 500, margin: '1rem auto 0' }}>
            Des solutions technologiques sur mesure, adaptées aux réalités et aux ambitions de l'Afrique.
          </p>
        </motion.div>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))',
          gap: '1.5rem',
        }}>
          {services.map((service, i) => {
            const Icon = service.icon;
            const isHovered = hovered === i;
            return (
              <motion.div
                key={service.title}
                className="service-card"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  background: isHovered
                    ? `linear-gradient(135deg, ${service.color}15, rgba(240,245,255,0.95))`
                    : 'rgba(255,255,255,0.6)',
                  border: `1px solid ${isHovered ? service.color : 'rgba(10,22,80,0.08)'}`,
                  borderRadius: 16,
                  padding: '2rem',
                  cursor: 'pointer',
                  transition: 'all 0.4s ease',
                  transform: isHovered ? 'translateY(-6px) rotateX(2deg)' : 'none',
                  boxShadow: isHovered ? `0 20px 40px rgba(10,22,80,0.08), 0 0 24px ${service.color}15` : '0 4px 20px rgba(10,22,80,0.04)',
                  backdropFilter: 'blur(10px)',
                  position: 'relative', overflow: 'hidden',
                }}
              >
                {/* Top glow line */}
                {isHovered && (
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    style={{
                      position: 'absolute', top: 0, left: 0, right: 0, height: 2,
                      background: `linear-gradient(90deg, transparent, ${service.color}, transparent)`,
                      transformOrigin: 'left',
                    }}
                  />
                )}

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.25rem' }}>
                  <HoloCube size={52} color={service.color} />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                      <Icon size={18} color={service.color} />
                      <h3 style={{
                        fontFamily: FONTS.display, fontWeight: 600, fontSize: '1.05rem',
                        color: COLORS.navyDeep, margin: 0,
                      }}>
                        {service.title}
                      </h3>
                    </div>
                    <p style={{
                      fontFamily: FONTS.body, fontSize: '0.9rem',
                      color: 'rgba(10,22,80,0.6)', marginBottom: 12, lineHeight: 1.6,
                    }}>
                      {service.desc}
                    </p>
                    <span style={{
                      fontFamily: FONTS.mono, fontSize: '0.75rem',
                      color: service.color, opacity: 0.9,
                    }}>
                      {service.stack}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
