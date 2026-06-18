import { useState } from 'react';
import { motion } from 'framer-motion';
import { Globe, Smartphone, Shield, Bot, Cloud, GitMerge } from 'lucide-react';
import HoloCube from './HoloCube';

const services = [
  {
    icon: Globe, color: '#1A6BFF',
    title: 'Développement Web',
    desc: 'Sites vitrine, e-commerce, portails métiers.',
    stack: 'React · Next.js · Laravel',
  },
  {
    icon: Smartphone, color: '#00A3FF',
    title: 'Applications Mobiles',
    desc: "iOS & Android — UX pensée pour l'Afrique.",
    stack: 'React Native · Flutter',
  },
  {
    icon: Shield, color: '#D4AF37',
    title: 'Cybersécurité',
    desc: 'Audit, pentest, protection — certifiés ISO 27001.',
    stack: 'SIEM · Pentest · ISO 27001',
  },
  {
    icon: Bot, color: '#00A3FF',
    title: 'Intelligence Artificielle',
    desc: 'Chatbots, automatisation, ML sur mesure.',
    stack: 'OpenAI · TensorFlow · Python',
  },
  {
    icon: Cloud, color: '#1A6BFF',
    title: 'Cloud & Infrastructure',
    desc: 'AWS, Azure, hébergement local africain.',
    stack: 'AWS · Azure · Docker · K8s',
  },
  {
    icon: GitMerge, color: '#D4AF37',
    title: 'Intégration Systèmes',
    desc: 'APIs, ERP, connecteurs de données métiers.',
    stack: 'REST · GraphQL · ERP',
  },
];


export default function Services() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="services" className="section-padding adinkra-bg" style={{ background: '#0e1f4a' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <span style={{
            fontFamily: 'JetBrains Mono', fontSize: '0.8rem', color: '#00A3FF',
            letterSpacing: '0.2em', display: 'block', marginBottom: 12,
          }}>
            // NOS EXPERTISES
          </span>
          <h2 className="section-title">Ce que nous construisons</h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Des solutions technologiques sur mesure, adaptées aux réalités et aux ambitions de l'Afrique.
          </p>
        </motion.div>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
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
                    ? `linear-gradient(135deg, ${service.color}15, rgba(5,15,44,0.9))`
                    : 'rgba(26,107,255,0.06)',
                  border: `1px solid ${isHovered ? service.color : 'rgba(26,107,255,0.2)'}`,
                  borderRadius: 16,
                  padding: '2rem',
                  cursor: 'pointer',
                  transition: 'all 0.4s ease',
                  transform: isHovered ? 'translateY(-6px) rotateX(2deg)' : 'none',
                  boxShadow: isHovered ? `0 20px 40px ${service.color}22, 0 0 24px ${service.color}15` : 'none',
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
                        fontFamily: 'Space Grotesk', fontWeight: 600, fontSize: '1.05rem',
                        color: '#E8F4FF', margin: 0,
                      }}>
                        {service.title}
                      </h3>
                    </div>
                    <p style={{
                      fontFamily: 'Inter', fontSize: '0.9rem',
                      color: 'rgba(232,244,255,0.65)', marginBottom: 12, lineHeight: 1.6,
                    }}>
                      {service.desc}
                    </p>
                    <span style={{
                      fontFamily: 'JetBrains Mono', fontSize: '0.75rem',
                      color: service.color, opacity: 0.8,
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
