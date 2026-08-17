import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight, ChevronDown, Target, Heart, Lightbulb, Users,
  Quote, Sparkles,
} from 'lucide-react';
import { COLORS, FONTS } from '../theme/colors';
import { useCountUp } from '../hooks/useCountUp';

// ─── Images ───
const ABOUT_IMG = {
  hero: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1600&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  founder: '/pdg.jpg',
  team1: '/pdg.jpg',
  team2: '/N2.jpeg',
};

// ─── Breathing halo ───
function BreathingHalo({ x, y, size, color, delay }: { x: string; y: string; size: number; color: string; delay: number }) {
  return (
    <motion.div
      animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.3, 0.15] }}
      transition={{ duration: 8, repeat: Infinity, delay, ease: 'easeInOut' }}
      style={{
        position: 'absolute', left: x, top: y, width: size, height: size,
        borderRadius: '50%', filter: 'blur(80px)',
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        pointerEvents: 'none', zIndex: 0,
      }}
    />
  );
}

// ─── Light connection lines (hero) ───
function LightConnections() {
  const nodes = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    x: 10 + Math.random() * 80,
    y: 10 + Math.random() * 80,
    delay: Math.random() * 3,
  }));
  const connections: { a: number; b: number }[] = [
    { a: 0, b: 1 }, { a: 1, b: 2 }, { a: 2, b: 3 },
    { a: 3, b: 4 }, { a: 4, b: 5 }, { a: 5, b: 6 }, { a: 6, b: 7 },
  ];
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1 }}>
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        {connections.map((c, i) => {
          const na = nodes[c.a], nb = nodes[c.b];
          return (
            <g key={`conn-${i}`}>
              <line x1={`${na.x}%`} y1={`${na.y}%`} x2={`${nb.x}%`} y2={`${nb.y}%`}
                stroke={COLORS.electric} strokeWidth={0.4} opacity={0.08} />
              <motion.circle r={2} fill={COLORS.cyan}
                animate={{
                  cx: [`${na.x}%`, `${nb.x}%`],
                  cy: [`${na.y}%`, `${nb.y}%`],
                  opacity: [0, 0.5, 0],
                }}
                transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, delay: c.a * 0.5, ease: 'easeInOut' }}
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
}

// ─── Value card ───
function ValueCard({ icon: Icon, title, desc, index }: { icon: typeof Target; title: string; desc: string; index: number }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(12px)',
        border: `1px solid ${hovered ? COLORS.electric + '40' : COLORS.cyan + '20'}`,
        borderRadius: 16, padding: '2rem 1.75rem', textAlign: 'center',
        transition: 'all 0.3s ease',
        boxShadow: hovered ? `0 12px 40px rgba(27,111,224,0.12), 0 0 24px ${COLORS.cyanGlow}` : '0 4px 16px rgba(10,22,80,0.05)',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
      }}
    >
      <motion.div
        animate={hovered ? { scale: [1, 1.1, 1] } : { scale: 1 }}
        transition={{ duration: 1.5, repeat: hovered ? Infinity : 0 }}
        style={{
          width: 56, height: 56, borderRadius: 14,
          background: `linear-gradient(135deg, ${COLORS.electric}12, ${COLORS.cyan}12)`,
          border: `1px solid ${COLORS.electric}25`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 1.25rem',
          boxShadow: hovered ? `0 0 20px ${COLORS.cyanGlow}` : 'none',
        }}
      >
        <Icon size={24} color={COLORS.electric} />
      </motion.div>
      <h3 style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: '1.2rem', color: COLORS.navyDeep, marginBottom: '0.6rem' }}>
        {title}
      </h3>
      <p style={{ fontFamily: FONTS.body, fontSize: '0.9rem', color: 'rgba(10,22,80,0.55)', lineHeight: 1.6 }}>
        {desc}
      </p>
    </motion.div>
  );
}

// ─── Timeline step ───
function AboutTimelineStep({ step, index }: { step: { year: string; title: string; desc: string }; index: number }) {
  return (
    <motion.div
      className="about-timeline-step"
      initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      style={{
        display: 'flex', alignItems: 'center',
        justifyContent: index % 2 === 0 ? 'flex-end' : 'flex-start',
        marginBottom: '2.5rem', position: 'relative',
      }}
    >
      <div style={{
        width: '45%', textAlign: index % 2 === 0 ? 'right' : 'left',
        padding: index % 2 === 0 ? '0 2rem 0 0' : '0 0 0 2rem',
      }}>
        <div style={{ fontFamily: FONTS.mono, fontWeight: 700, fontSize: '0.85rem', color: COLORS.electric, marginBottom: '0.25rem' }}>
          {step.year}
        </div>
        <h3 style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: '1.2rem', color: COLORS.navyDeep, marginBottom: '0.5rem' }}>
          {step.title}
        </h3>
        <p style={{ fontFamily: FONTS.body, fontSize: '0.9rem', lineHeight: 1.6, color: 'rgba(10,22,80,0.55)' }}>
          {step.desc}
        </p>
      </div>
      <motion.div
        animate={{ scale: [1, 1.15, 1], boxShadow: [`0 0 12px ${COLORS.cyanGlow}`, `0 0 24px ${COLORS.cyanGlow}`, `0 0 12px ${COLORS.cyanGlow}`] }}
        transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
        style={{
          position: 'absolute', left: '50%', top: '50%',
          transform: 'translate(-50%, -50%)',
          width: 16, height: 16, borderRadius: '50%',
          background: `linear-gradient(135deg, ${COLORS.electric}, ${COLORS.cyan})`,
          border: `3px solid #fff`,
        }}
      />
    </motion.div>
  );
}

// ─── Team card ───
function TeamCard({ name, role, img, index }: { name: string; role: string; img: string; index: number }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(12px)',
        border: `1px solid ${hovered ? COLORS.cyan + '50' : 'rgba(27,111,224,0.08)'}`,
        borderRadius: 16, overflow: 'hidden',
        transition: 'all 0.3s ease',
        boxShadow: hovered ? `0 16px 40px rgba(27,111,224,0.12), 0 0 24px ${COLORS.cyanGlow}` : '0 4px 16px rgba(10,22,80,0.05)',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
      }}
    >
      <div style={{
        position: 'relative', display: 'flex', justifyContent: 'center',
        padding: '2rem 2rem 0',
      }}>
        <div style={{
          position: 'relative', width: 280, height: 280, borderRadius: 20,
          overflow: 'hidden',
          border: `2px solid ${hovered ? COLORS.cyan + '60' : COLORS.cyan + '30'}`,
          boxShadow: hovered ? `0 0 30px ${COLORS.cyanGlow}` : '0 6px 20px rgba(10,22,80,0.1)',
          transition: 'all 0.4s ease',
        }}>
          <img src={img} alt={name}
            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease', transform: hovered ? 'scale(1.05)' : 'scale(1)' }}
          />
        </div>
      </div>
      <div style={{ padding: '1.25rem 1.5rem 1.5rem', textAlign: 'center' }}>
        <h3 style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: '1.15rem', color: COLORS.navyDeep, marginBottom: '0.3rem' }}>
          {name}
        </h3>
        <div style={{ width: 28, height: 2, background: `linear-gradient(90deg, ${COLORS.electric}, ${COLORS.cyan})`, margin: '0 auto 0.5rem', borderRadius: 2 }} />
        <p style={{ fontFamily: FONTS.body, fontSize: '0.88rem', color: COLORS.electric, fontWeight: 600 }}>
          {role}
        </p>
      </div>
    </motion.div>
  );
}

// ─── Animated stat ───
function AboutStat({ value, suffix, label, delay }: { value: number; suffix: string; label: string; delay: number }) {
  const { count, ref } = useCountUp(value, 2500);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      style={{ textAlign: 'center' }}
    >
      <div style={{
        fontFamily: FONTS.mono, fontWeight: 800,
        fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
        color: COLORS.navyDeep, lineHeight: 1,
        textShadow: `0 0 24px ${COLORS.cyanGlow}`,
      }}>
        {count}{suffix}
      </div>
      <div style={{
        fontFamily: FONTS.body, fontSize: '0.9rem',
        color: 'rgba(10,22,80,0.55)', marginTop: '0.5rem',
      }}>
        {label}
      </div>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════
//  PAGE À PROPOS
// ═══════════════════════════════════════════════════════════
export default function APropos() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const values = [
    { icon: Target, title: 'Excellence', desc: "Le meilleur code, la meilleure UX, sans compromis." },
    { icon: Heart, title: 'Impact', desc: "Chaque projet doit créer de la valeur pour l'Afrique." },
    { icon: Lightbulb, title: 'Innovation', desc: "Repousser les limites, explorer, ne jamais s'installer." },
    { icon: Users, title: 'Communauté', desc: "Former, partager, grandir ensemble avec nos clients." },
  ];

  const timeline = [
    { year: '2022', title: 'La genèse', desc: 'Kuble naît à Abidjan d\'une conviction : l\'Afrique mérite des solutions tech à la hauteur de son ambition.' },
    { year: '2023', title: 'Premiers projets', desc: 'Sites web, applications mobiles, premiers clients satisfaits. La preuve de concept est faite.' },
    { year: '2024', title: 'Croissance', desc: 'Équipe renforcée, expertise élargie (cloud, cybersécurité, data). Lancement du studio audiovisuel.' },
    { year: '2025', title: 'Expansion', desc: 'Plus de 50 projets livrés, présence dans 5 pays. Positionnement comme acteur tech de référence.' },
    { year: '2026', title: 'Aujourd\'hui', desc: 'Une équipe pluridisciplinaire, des clients sur tout le continent, et une mission qui ne change pas.' },
  ];

  const team = [
    { name: 'Ange Hermann Boua', role: 'PDG & Fondateur', img: ABOUT_IMG.team1 },
    { name: 'Essegnimbo Norbert Sossou', role: 'DG & Co-fondateur', img: ABOUT_IMG.team2 },
  ];

  return (
    <div style={{ background: `linear-gradient(180deg, #F4F8FF 0%, #FFFFFF 100%)` }}>
      {/* ══ 1. HERO ══ */}
      <section ref={heroRef} style={{
        position: 'relative', minHeight: '90vh', display: 'flex', alignItems: 'center',
        padding: '120px 2rem 4rem', overflow: 'hidden',
        background: `linear-gradient(180deg, #F4F8FF 0%, #FFFFFF 70%, #FFFFFF 100%)`,
      }}>
        <BreathingHalo x="15%" y="20%" size={500} color={COLORS.cyanGlow} delay={0} />
        <BreathingHalo x="65%" y="40%" size={400} color="rgba(27,111,224,0.1)" delay={3} />
        <LightConnections />

        <motion.div style={{ y: heroY, opacity: heroOpacity, maxWidth: 900, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 3, width: '100%' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <span style={{
              fontFamily: FONTS.mono, fontSize: '0.8rem', color: COLORS.electric,
              letterSpacing: '0.2em', display: 'block', marginBottom: 16,
            }}>
              // À PROPOS DE KUBLE
            </span>
            <h1 style={{
              fontFamily: FONTS.display, fontWeight: 800,
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', lineHeight: 1.05,
              color: COLORS.navyDeep, marginBottom: '1.5rem', letterSpacing: '-0.02em',
            }}>
              Ceux qui construisent{' '}
              <span style={{
                background: `linear-gradient(135deg, ${COLORS.electric} 0%, ${COLORS.cyan} 100%)`,
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                filter: `drop-shadow(0 0 20px ${COLORS.cyanGlow})`,
              }}>
                votre transformation
              </span>
              {' '}digitale
            </h1>
            <p style={{
              fontFamily: FONTS.body, fontSize: 'clamp(1.05rem, 2vw, 1.25rem)', lineHeight: 1.7,
              color: 'rgba(10,22,80,0.6)', maxWidth: 620, margin: '0 auto',
            }}>
              Kuble est née d'une conviction simple : l'Afrique possède les talents, les idées et l'ambition pour être un leader technologique mondial. Nous construisons les outils qui rendent cela possible.
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 8, 0], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', zIndex: 3 }}
        >
          <ChevronDown size={24} color={COLORS.electric} />
        </motion.div>
      </section>

      {/* ══ 2. Mission / Valeurs ══ */}
      <section style={{ padding: '6rem 2rem', background: `linear-gradient(180deg, #FFFFFF 0%, #F8FBFF 100%)` }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{ textAlign: 'center', marginBottom: '4rem' }}
          >
            <h2 style={{
              fontFamily: FONTS.display, fontWeight: 700,
              fontSize: 'clamp(2rem, 4vw, 3rem)', color: COLORS.navyDeep,
              marginBottom: '1rem',
            }}>
              Notre mission, nos{' '}
              <span style={{ color: COLORS.electric }}>valeurs</span>
            </h2>
            <p style={{
              fontFamily: FONTS.body, fontSize: '1.1rem', color: 'rgba(10,22,80,0.6)',
              maxWidth: 600, margin: '0 auto',
            }}>
              Rendre la technologie accessible, fiable et transformative — pour chaque entreprise africaine qui veut aller plus loin.
            </p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
            {values.map((val, i) => (
              <ValueCard key={val.title} icon={val.icon} title={val.title} desc={val.desc} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ══ 3. Histoire / Timeline ══ */}
      <section style={{ padding: '6rem 2rem', background: `linear-gradient(180deg, #F8FBFF 0%, #FFFFFF 50%, #F8FBFF 100%)` }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{ textAlign: 'center', marginBottom: '4rem' }}
          >
            <h2 style={{
              fontFamily: FONTS.display, fontWeight: 700,
              fontSize: 'clamp(2rem, 4vw, 3rem)', color: COLORS.navyDeep,
              marginBottom: '1rem',
            }}>
              Notre{' '}
              <span style={{ color: COLORS.electric }}>histoire</span>
            </h2>
            <p style={{
              fontFamily: FONTS.body, fontSize: '1.1rem', color: 'rgba(10,22,80,0.6)',
              maxWidth: 600, margin: '0 auto',
            }}>
              D'une idée à une équipe. D'un projet à une mission.
            </p>
          </motion.div>

          <div style={{ position: 'relative' }}>
            <svg style={{ position: 'absolute', left: '50%', top: 0, width: 2, height: '100%', transform: 'translateX(-50%)' }}>
              <defs>
                <linearGradient id="aboutTimelineGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={COLORS.electric} />
                  <stop offset="100%" stopColor={COLORS.cyan} />
                </linearGradient>
              </defs>
              <motion.line
                x1={1} y1={0} x2={1} y2="100%"
                stroke="url(#aboutTimelineGrad)"
                strokeWidth={2}
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2, ease: 'easeInOut' }}
              />
            </svg>

            {timeline.map((step, i) => (
              <AboutTimelineStep key={step.year} step={step} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ══ 4. Fondateur — bloc sombre signature ══ */}
      <section style={{
        padding: '6rem 2rem',
        background: `linear-gradient(180deg, ${COLORS.navyDeep} 0%, ${COLORS.navyDark} 100%)`,
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Subtle particles */}
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.04, pointerEvents: 'none',
          backgroundImage: `linear-gradient(${COLORS.cyan} 1px, transparent 1px), linear-gradient(90deg, ${COLORS.cyan} 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }} />
        <BreathingHalo x="70%" y="30%" size={500} color={COLORS.cyanGlow} delay={1} />

        {/* Light lines crossing */}
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', opacity: 0.15 }}>
          {[0, 1, 2].map(i => (
            <motion.line key={`light-line-${i}`}
              x1="0" y1={`${20 + i * 30}%`} x2="100%" y2={`${30 + i * 30}%`}
              stroke={COLORS.cyan} strokeWidth={0.5}
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.15 }}
              viewport={{ once: true }}
              transition={{ duration: 3, delay: i * 0.5 }}
            />
          ))}
        </svg>

        <div style={{ maxWidth: 1000, margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <div className="founder-grid" style={{
            display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '3rem',
            alignItems: 'center',
          }}>
            {/* Founder photo */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              style={{ position: 'relative' }}
            >
              <motion.div
                animate={{ boxShadow: [
                  `0 0 30px ${COLORS.cyanGlow}`,
                  `0 0 60px ${COLORS.cyanGlow}`,
                  `0 0 30px ${COLORS.cyanGlow}`,
                ] }}
                transition={{ duration: 4, repeat: Infinity }}
                style={{
                  width: 220, height: 220, borderRadius: 20,
                  overflow: 'hidden',
                  border: `2px solid ${COLORS.cyan}40`,
                }}
              >
                <img src={ABOUT_IMG.founder} alt="Ange Hermann Boua"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </motion.div>
            </motion.div>

            {/* Quote */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Quote size={40} color={COLORS.cyan} style={{ opacity: 0.4, marginBottom: '1rem' }} />
              <p style={{
                fontFamily: FONTS.display, fontWeight: 500,
                fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)', lineHeight: 1.5,
                color: COLORS.white, marginBottom: '1.5rem', fontStyle: 'italic',
              }}>
                "L'Afrique n'a pas besoin de copier personne. Elle a besoin d'outils à la hauteur de son génie. C'est exactement ce que nous construisons, chaque jour."
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ width: 40, height: 2, background: COLORS.electric }} />
                <div>
                  <div style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: '1rem', color: COLORS.electric }}>
                    Ange Hermann Boua
                  </div>
                  <div style={{ fontFamily: FONTS.body, fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)' }}>
                    PDG & Fondateur, Kuble
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══ 5. Équipe ══ */}
      <section style={{ padding: '6rem 2rem', background: `linear-gradient(180deg, #F8FBFF 0%, #FFFFFF 50%, #F8FBFF 100%)` }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{ textAlign: 'center', marginBottom: '4rem' }}
          >
            <h2 style={{
              fontFamily: FONTS.display, fontWeight: 700,
              fontSize: 'clamp(2rem, 4vw, 3rem)', color: COLORS.navyDeep,
              marginBottom: '1rem',
            }}>
              Les{' '}
              <span style={{ color: COLORS.electric }}>fondateurs</span>
            </h2>
            <p style={{
              fontFamily: FONTS.body, fontSize: '1.1rem', color: 'rgba(10,22,80,0.6)',
              maxWidth: 600, margin: '0 auto',
            }}>
              Les fondateurs qui pilotent Kuble au quotidien, animés par une même ambition : bâtir l'avenir numérique africain.
            </p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
            {team.map((member, i) => (
              <TeamCard key={member.name} name={member.name} role={member.role} img={member.img} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ══ 6. Chiffres clés ══ */}
      <section style={{ padding: '5rem 2rem', background: `linear-gradient(180deg, #F8FBFF 0%, #F4F8FF 100%)` }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{ textAlign: 'center', marginBottom: '3rem' }}
          >
            <h2 style={{
              fontFamily: FONTS.display, fontWeight: 700,
              fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', color: COLORS.navyDeep,
              marginBottom: '1rem',
            }}>
              Notre impact en{' '}
              <span style={{ color: COLORS.electric }}>chiffres</span>
            </h2>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '2rem' }}>
            <AboutStat value={50} suffix="+" label="Projets livrés" delay={0} />
            <AboutStat value={5} suffix="" label="Pays couverts" delay={0.15} />
            <AboutStat value={4} suffix=" ans" label="D'expertise" delay={0.3} />
            <AboutStat value={98} suffix="%" label="Clients satisfaits" delay={0.45} />
          </div>
        </div>
      </section>

      {/* ══ 7. CTA final (clair, spotlight) ══ */}
      <section style={{
        padding: '6rem 2rem',
        background: `linear-gradient(180deg, #F4F8FF 0%, #F8FBFF 100%)`,
        position: 'relative', overflow: 'hidden',
      }}>
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.35, 0.2] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)',
            width: 600, height: 600, borderRadius: '50%', filter: 'blur(120px)',
            background: `radial-gradient(circle, ${COLORS.cyanGlow} 0%, transparent 70%)`,
            pointerEvents: 'none', zIndex: 0,
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 2 }}
        >
          <Sparkles size={28} color={COLORS.cyan} style={{ marginBottom: '1rem', opacity: 0.6 }} />
          <h2 style={{
            fontFamily: FONTS.display, fontWeight: 800,
            fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: COLORS.navyDeep,
            marginBottom: '1.5rem', lineHeight: 1.1,
          }}>
            Envie d'écrire la suite de{' '}
            <span style={{
              background: `linear-gradient(135deg, ${COLORS.electric} 0%, ${COLORS.cyan} 100%)`,
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>
              cette histoire
            </span>
            {' '}avec nous ?
          </h2>
          <p style={{
            fontFamily: FONTS.body, fontSize: '1.15rem', color: 'rgba(10,22,80,0.6)',
            marginBottom: '2.5rem', maxWidth: 560, margin: '0 auto 2.5rem',
          }}>
            Une idée, un projet, une collaboration ? Parlons-en.
          </p>
          <motion.div
            animate={{ boxShadow: [
              `0 8px 30px rgba(27,111,224,0.25)`,
              `0 8px 50px rgba(91,200,242,0.5)`,
              `0 8px 30px rgba(27,111,224,0.25)`,
            ] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Link to="/contact"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: `linear-gradient(135deg, ${COLORS.electric}, ${COLORS.cyan})`,
                color: '#fff', padding: '1rem 2.5rem', borderRadius: 12,
                fontFamily: FONTS.display, fontWeight: 700, fontSize: '1.1rem',
                textDecoration: 'none',
                transition: 'all 0.3s',
              }}
            >
              Nous contacter <ArrowRight size={18} />
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
