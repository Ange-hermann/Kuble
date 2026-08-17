import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { COLORS, FONTS, MOTION } from '../theme/colors';
import type { LucideIcon } from 'lucide-react';

export type ServiceFeature = {
  icon: LucideIcon;
  title: string;
  desc: string;
};

export type ServiceStep = {
  num: string;
  title: string;
  desc: string;
};

export type ServicePageConfig = {
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  icon: LucideIcon;
  features: ServiceFeature[];
  steps: ServiceStep[];
  stack: string[];
  stats: { value: string; label: string }[];
  accentColor?: string;
};

export default function ServicePageTemplate({ config }: { config: ServicePageConfig }) {
  const accent = config.accentColor || COLORS.cyan;
  const Icon = config.icon;

  return (
    <div style={{ background: COLORS.navyDeep, minHeight: '100vh' }}>
      {/* ═══ Hero ═══ */}
      <section style={{
        position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center',
        padding: '120px 2rem 4rem', overflow: 'hidden',
        background: `radial-gradient(ellipse at 30% 20%, ${COLORS.electric}15 0%, transparent 50%),
                     radial-gradient(ellipse at 70% 80%, ${accent}10 0%, transparent 50%),
                     ${COLORS.navyDeep}`,
      }}>
        {/* Grid overlay */}
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.03,
          backgroundImage: `linear-gradient(${COLORS.cyan} 1px, transparent 1px), linear-gradient(90deg, ${COLORS.cyan} 1px, transparent 1px)`,
          backgroundSize: '60px 60px', pointerEvents: 'none',
        }} />

        {/* Floating orbs */}
        <motion.div
          animate={{ y: [0, -30, 0], x: [0, 15, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute', top: '15%', right: '10%', width: 300, height: 300,
            borderRadius: '50%', background: `radial-gradient(circle, ${accent}20 0%, transparent 70%)`,
            pointerEvents: 'none',
          }}
        />
        <motion.div
          animate={{ y: [0, 40, 0], x: [0, -20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute', bottom: '10%', left: '5%', width: 250, height: 250,
            borderRadius: '50%', background: `radial-gradient(circle, ${COLORS.electric}15 0%, transparent 70%)`,
            pointerEvents: 'none',
          }}
        />

        <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 2, width: '100%' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ maxWidth: 720 }}
          >
            {/* Badge */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '0.5rem 1rem', borderRadius: 100,
              background: `${accent}15`, border: `1px solid ${accent}33`,
              marginBottom: '2rem',
            }}>
              <Icon size={16} color={accent} />
              <span style={{ fontFamily: FONTS.mono, fontSize: '0.75rem', color: accent, letterSpacing: '0.15em' }}>
                {config.badge}
              </span>
            </div>

            {/* Title */}
            <h1 style={{
              fontFamily: FONTS.display, fontWeight: 800,
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', lineHeight: 1.05,
              color: COLORS.white, marginBottom: '1.5rem',
            }}>
              {config.title}
            </h1>

            {/* Subtitle */}
            <p style={{
              fontFamily: FONTS.display, fontWeight: 400,
              fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)', lineHeight: 1.4,
              color: COLORS.cyan, marginBottom: '1.5rem',
            }}>
              {config.subtitle}
            </p>

            {/* Description */}
            <p style={{
              fontFamily: FONTS.body, fontSize: '1.05rem', lineHeight: 1.7,
              color: COLORS.whiteSoft, maxWidth: 600, marginBottom: '2.5rem',
            }}>
              {config.description}
            </p>

            {/* CTAs */}
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link to="/contact"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  background: COLORS.gradient, color: COLORS.white,
                  padding: '0.85rem 2rem', borderRadius: 10,
                  fontFamily: FONTS.display, fontWeight: 700, fontSize: '1rem',
                  textDecoration: 'none', boxShadow: COLORS.glowCyan,
                  transition: 'transform 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
                onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}>
                Démarrer un projet <ArrowRight size={18} />
              </Link>
              <Link to="/"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  color: COLORS.whiteSoft, border: `1px solid ${COLORS.electric}44`,
                  padding: '0.85rem 2rem', borderRadius: 10,
                  fontFamily: FONTS.display, fontWeight: 600, fontSize: '1rem',
                  textDecoration: 'none', transition: 'all 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = COLORS.cyan; e.currentTarget.style.color = COLORS.cyan; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = `${COLORS.electric}44`; e.currentTarget.style.color = COLORS.whiteSoft; }}>
                Retour à l'accueil
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ Stats ═══ */}
      <section style={{ padding: '4rem 2rem', background: COLORS.navyDark }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
          {config.stats.map((stat, i) => (
            <motion.div key={i} {...MOTION.fadeInUp} transition={{ ...MOTION.fadeInUp.transition, delay: i * 0.1 }}
              style={{ textAlign: 'center' }}>
              <div style={{
                fontFamily: FONTS.display, fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 3rem)',
                background: `linear-gradient(135deg, ${COLORS.cyan}, ${COLORS.electric})`,
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>
                {stat.value}
              </div>
              <div style={{ fontFamily: FONTS.body, fontSize: '0.9rem', color: COLORS.whiteDim, marginTop: 4 }}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══ Features ═══ */}
      <section style={{ padding: '6rem 2rem', background: COLORS.navyDeep }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <motion.div {...MOTION.fadeInUp} style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span style={{ fontFamily: FONTS.mono, fontSize: '0.8rem', color: accent, letterSpacing: '0.2em', display: 'block', marginBottom: 12 }}>
              // NOS CAPACITÉS
            </span>
            <h2 style={{ fontFamily: FONTS.display, fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 3rem)', color: COLORS.white }}>
              Ce que nous livrons
            </h2>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {config.features.map((feat, i) => {
              const FeatureIcon = feat.icon;
              return (
                <motion.div key={i} {...MOTION.scaleIn} transition={{ ...MOTION.scaleIn.transition, delay: i * 0.08 }}
                  style={{
                    background: `${COLORS.electric}08`, border: `1px solid ${COLORS.electric}20`,
                    borderRadius: 16, padding: '2rem', transition: 'all 0.3s',
                  }}
                  whileHover={{ y: -6, borderColor: `${accent}55`, boxShadow: `0 20px 40px ${accent}15` }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: 12,
                    background: `${accent}15`, border: `1px solid ${accent}33`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem',
                  }}>
                    <FeatureIcon size={22} color={accent} />
                  </div>
                  <h3 style={{ fontFamily: FONTS.display, fontWeight: 600, fontSize: '1.15rem', color: COLORS.white, marginBottom: '0.75rem' }}>
                    {feat.title}
                  </h3>
                  <p style={{ fontFamily: FONTS.body, fontSize: '0.92rem', lineHeight: 1.6, color: COLORS.whiteDim }}>
                    {feat.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ Process ═══ */}
      <section style={{ padding: '6rem 2rem', background: COLORS.navyDark }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <motion.div {...MOTION.fadeInUp} style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span style={{ fontFamily: FONTS.mono, fontSize: '0.8rem', color: accent, letterSpacing: '0.2em', display: 'block', marginBottom: 12 }}>
              // NOTRE MÉTHODE
            </span>
            <h2 style={{ fontFamily: FONTS.display, fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 3rem)', color: COLORS.white }}>
              Comment nous travaillons
            </h2>
          </motion.div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {config.steps.map((step, i) => (
              <motion.div key={i} {...MOTION.slideInLeft} transition={{ ...MOTION.slideInLeft.transition, delay: i * 0.1 }}
                style={{
                  display: 'flex', gap: '1.5rem', alignItems: 'flex-start',
                  padding: '1.75rem', borderRadius: 14,
                  background: `${COLORS.electric}06`, border: `1px solid ${COLORS.electric}15`,
                }}>
                <div style={{
                  flexShrink: 0, width: 52, height: 52, borderRadius: 12,
                  background: `linear-gradient(135deg, ${COLORS.electric}, ${accent})`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: FONTS.display, fontWeight: 800, fontSize: '1.2rem', color: COLORS.white,
                }}>
                  {step.num}
                </div>
                <div>
                  <h3 style={{ fontFamily: FONTS.display, fontWeight: 600, fontSize: '1.1rem', color: COLORS.white, marginBottom: '0.5rem' }}>
                    {step.title}
                  </h3>
                  <p style={{ fontFamily: FONTS.body, fontSize: '0.92rem', lineHeight: 1.6, color: COLORS.whiteDim }}>
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Tech Stack ═══ */}
      <section style={{ padding: '6rem 2rem', background: COLORS.navyDeep }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <motion.div {...MOTION.fadeInUp}>
            <span style={{ fontFamily: FONTS.mono, fontSize: '0.8rem', color: accent, letterSpacing: '0.2em', display: 'block', marginBottom: 12 }}>
              // STACK TECHNIQUE
            </span>
            <h2 style={{ fontFamily: FONTS.display, fontWeight: 800, fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', color: COLORS.white, marginBottom: '2rem' }}>
              Nos outils de prédilection
            </h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center' }}>
              {config.stack.map((tech, i) => (
                <motion.span key={i}
                  initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                  style={{
                    padding: '0.6rem 1.25rem', borderRadius: 100,
                    background: `${COLORS.electric}10`, border: `1px solid ${COLORS.electric}25`,
                    fontFamily: FONTS.mono, fontSize: '0.85rem', color: COLORS.cyan,
                  }}>
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section style={{ padding: '6rem 2rem', background: `linear-gradient(135deg, ${COLORS.navyDark}, ${COLORS.navyDeep})` }}>
        <motion.div {...MOTION.scaleIn}
          style={{
            maxWidth: 700, margin: '0 auto', textAlign: 'center',
            padding: '3.5rem 2rem', borderRadius: 24,
            background: `linear-gradient(135deg, ${COLORS.electric}12, ${accent}08)`,
            border: `1px solid ${COLORS.electric}25`,
          }}>
          <Sparkles size={40} color={accent} style={{ margin: '0 auto 1.5rem' }} />
          <h2 style={{ fontFamily: FONTS.display, fontWeight: 800, fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', color: COLORS.white, marginBottom: '1rem' }}>
            Prêt à transformer votre vision en réalité ?
          </h2>
          <p style={{ fontFamily: FONTS.body, fontSize: '1.05rem', color: COLORS.whiteSoft, marginBottom: '2rem', lineHeight: 1.6 }}>
            Discutons de votre projet. Notre équipe vous répond sous 24h.
          </p>
          <Link to="/contact"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: COLORS.gradient, color: COLORS.white,
              padding: '1rem 2.5rem', borderRadius: 12,
              fontFamily: FONTS.display, fontWeight: 700, fontSize: '1.1rem',
              textDecoration: 'none', boxShadow: COLORS.glowCyan,
              transition: 'transform 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
            onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}>
            Contactez-nous <ArrowRight size={20} />
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
