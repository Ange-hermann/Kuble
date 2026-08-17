import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Globe, Smartphone, Code2, Layers, Zap, Rocket, ChevronDown } from 'lucide-react';
import { COLORS, FONTS } from '../theme/colors';

// Unsplash tech images
const IMG = {
  heroCode: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80',
  web: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80',
  mobile: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&q=80',
  platform: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80',
  api: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80',
  performance: 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=600&q=80',
  devops: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80',
  showcase1: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80',
  showcase2: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800&q=80',
  showcase3: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&q=80',
};

// ─── Aurora glow background ───
function AuroraBg() {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      <motion.div
        animate={{ x: [0, 80, 0], y: [0, -40, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute', top: '-10%', left: '5%', width: 500, height: 500,
          borderRadius: '50%', filter: 'blur(80px)',
          background: 'radial-gradient(circle, rgba(91,200,242,0.25) 0%, transparent 70%)',
        }}
      />
      <motion.div
        animate={{ x: [0, -60, 0], y: [0, 50, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute', top: '20%', right: '0%', width: 450, height: 450,
          borderRadius: '50%', filter: 'blur(90px)',
          background: 'radial-gradient(circle, rgba(27,111,224,0.18) 0%, transparent 70%)',
        }}
      />
      <motion.div
        animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute', bottom: '-5%', left: '30%', width: 380, height: 380,
          borderRadius: '50%', filter: 'blur(70px)',
          background: 'radial-gradient(circle, rgba(91,200,242,0.15) 0%, transparent 70%)',
        }}
      />
    </div>
  );
}

// ─── Node network SVG ───
function NodeNetwork({ mouseX, mouseY }: { mouseX: number; mouseY: number }) {
  const nodes = [
    { x: 80, y: 60 }, { x: 200, y: 120 }, { x: 340, y: 80 },
    { x: 150, y: 200 }, { x: 300, y: 220 }, { x: 420, y: 160 },
    { x: 100, y: 300 }, { x: 260, y: 340 }, { x: 400, y: 280 },
  ];
  return (
    <svg width="500" height="400" viewBox="0 0 500 400" style={{
      position: 'absolute', right: '2%', top: '50%',
      transform: `translateY(-50%) translateX(${mouseX * 15}px) translateY(${mouseY * 10}px)`,
      opacity: 0.5, pointerEvents: 'none',
    }}>
      {nodes.map((n, i) => nodes.slice(i + 1).map((m, j) => {
        const dist = Math.hypot(n.x - m.x, n.y - m.y);
        if (dist > 180) return null;
        return <line key={`${i}-${j}`} x1={n.x} y1={n.y} x2={m.x} y2={m.y} stroke={COLORS.cyan} strokeWidth="0.5" opacity={0.15} />;
      }))}
      {nodes.map((n, i) => (
        <g key={i}>
          <motion.circle cx={n.x} cy={n.y} r="4" fill={COLORS.cyan}
            animate={{ opacity: [0.3, 0.8, 0.3], r: [3, 5, 3] }}
            transition={{ duration: 3, repeat: Infinity, delay: i * 0.3 }}
          />
          <circle cx={n.x} cy={n.y} r="8" fill="none" stroke={COLORS.cyan} strokeWidth="0.5" opacity={0.2} />
        </g>
      ))}
    </svg>
  );
}

// ─── Service card ───
type ServiceCard = { icon: typeof Globe; title: string; desc: string; img: string };
function ServiceCardItem({ svc, index }: { svc: ServiceCard; index: number }) {
  const Icon = svc.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8 }}
      style={{
        position: 'relative', background: '#fff',
        border: `1px solid rgba(27,111,224,0.12)`,
        borderRadius: 18, cursor: 'pointer',
        boxShadow: '0 2px 12px rgba(10,22,80,0.04)',
        overflow: 'hidden',
      }}
    >
      {/* Image */}
      <div style={{ position: 'relative', height: 200, overflow: 'hidden' }}>
        <motion.img
          src={svc.img} alt={svc.title}
          initial={false}
          whileHover={{ scale: 1.06 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
        {/* Overlay gradient */}
        <div style={{
          position: 'absolute', inset: 0,
          background: `linear-gradient(180deg, rgba(10,22,80,0.1) 0%, rgba(10,22,80,0.5) 100%)`,
        }} />
        {/* Icon badge on image */}
        <div style={{
          position: 'absolute', bottom: 12, left: 12,
          width: 44, height: 44, borderRadius: 12,
          background: `rgba(255,255,255,0.9)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        }}>
          <Icon size={22} color={COLORS.electric} />
        </div>
      </div>
      {/* Content */}
      <div style={{ padding: '1.75rem', position: 'relative' }}>
        <h3 style={{
          fontFamily: FONTS.display, fontWeight: 700, fontSize: '1.15rem',
          color: COLORS.navyDeep, marginBottom: '0.6rem',
        }}>
          {svc.title}
        </h3>
        <p style={{
          fontFamily: FONTS.body, fontSize: '0.9rem', lineHeight: 1.6,
          color: 'rgba(10,22,80,0.6)',
        }}>
          {svc.desc}
        </p>
      </div>
    </motion.div>
  );
}

// ─── Process timeline ───
const processSteps = [
  { num: '01', title: 'Discovery & Architecture', desc: "Analyse des besoins, architecture technique, choix de stack adapte a vos contraintes." },
  { num: '02', title: 'Design & Prototypage', desc: 'Maquettes Figma, prototypes interactifs, validation UX avant developpement.' },
  { num: '03', title: 'Developpement Agile', desc: 'Sprints de 2 semaines, demos regulieres, code review systematique.' },
  { num: '04', title: 'Deploiement & Support', desc: 'Mise en production, monitoring, maintenance evolutive et corrective.' },
];

function ProcessTimeline() {
  return (
    <div style={{ position: 'relative', maxWidth: 900, margin: '0 auto' }}>
      <motion.div
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 1.2, ease: 'easeInOut' }}
        style={{
          position: 'absolute', left: 28, top: 0, bottom: 0, width: 2,
          background: `linear-gradient(180deg, ${COLORS.cyan}, ${COLORS.electric}, transparent)`,
          transformOrigin: 'top',
        }}
      />
      {processSteps.map((step, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: i * 0.15 }}
          style={{ display: 'flex', gap: '1.75rem', marginBottom: '2.5rem', position: 'relative' }}
        >
          <div style={{
            flexShrink: 0, width: 58, height: 58, borderRadius: '50%',
            background: COLORS.navyDeep, border: `2px solid ${COLORS.cyan}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: FONTS.display, fontWeight: 800, fontSize: '1rem', color: COLORS.cyan,
            boxShadow: `0 0 20px ${COLORS.cyanGlow}`, zIndex: 2, position: 'relative',
          }}>
            {step.num}
          </div>
          <div style={{ paddingTop: '0.4rem' }}>
            <h3 style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: '1.25rem', color: COLORS.white, marginBottom: '0.5rem' }}>
              {step.title}
            </h3>
            <p style={{ fontFamily: FONTS.body, fontSize: '0.95rem', lineHeight: 1.65, color: 'rgba(255,255,255,0.6)', maxWidth: 500 }}>
              {step.desc}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// ─── Floating tech badge ───
function TechBadge({ tech, index }: { tech: string; index: number }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.04, duration: 0.4 }}
      whileHover={{ y: -4, scale: 1.05 }}
      style={{
        padding: '0.7rem 1.4rem', borderRadius: 100,
        background: '#fff', border: `1px solid ${COLORS.electric}20`,
        fontFamily: FONTS.mono, fontSize: '0.88rem', color: COLORS.electric,
        boxShadow: '0 4px 16px rgba(10,22,80,0.06)',
        display: 'inline-block', cursor: 'default',
      }}
    >
      {tech}
    </motion.span>
  );
}

// ═══════════════════════════════════════════════════════════
//  PAGE TECHNOLOGIE
// ═══════════════════════════════════════════════════════════
export default function Technologie() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      setMouseX((e.clientX - rect.left) / rect.width - 0.5);
      setMouseY((e.clientY - rect.top) / rect.height - 0.5);
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  const services: ServiceCard[] = [
    { icon: Globe, title: 'Sites Web & E-commerce', desc: 'Sites vitrine, boutiques en ligne, portails corporate — optimises SEO, rapides et responsive.', img: IMG.web },
    { icon: Smartphone, title: 'Applications Mobiles', desc: 'Apps iOS & Android natives ou cross-platform, UX pensee pour les marches africains.', img: IMG.mobile },
    { icon: Code2, title: 'Plateformes Metiers', desc: 'ERP, CRM, dashboards — des outils sur mesure qui automatisent vos processus.', img: IMG.platform },
    { icon: Layers, title: 'APIs & Integrations', desc: 'Connecteurs REST/GraphQL, synchronisation de donnees, interoperabilite systeme.', img: IMG.api },
    { icon: Zap, title: 'Performance & SEO', desc: 'Core Web Vitals, SSR/SSG, optimisation Lighthouse — vitesse et visibilite.', img: IMG.performance },
    { icon: Rocket, title: 'DevOps & CI/CD', desc: 'Pipelines automatises, deploiement continu, monitoring — du commit a la prod.', img: IMG.devops },
  ];

  const stackCategories = [
    { label: 'Frontend', tools: ['React', 'Next.js', 'Vue.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Three.js', 'Svelte'] },
    { label: 'Mobile', tools: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Expo'] },
    { label: 'Backend', tools: ['Node.js', 'Laravel', 'Python', 'Django', 'GraphQL', 'REST API', 'WebSocket', 'tRPC'] },
    { label: 'Base de donnees', tools: ['PostgreSQL', 'MongoDB', 'MySQL', 'Redis', 'Supabase', 'Firebase', 'Prisma'] },
    { label: 'DevOps & Cloud', tools: ['Docker', 'Kubernetes', 'Vercel', 'AWS', 'Google Cloud', 'GitHub Actions', 'Cloudflare', 'Nginx'] },
    { label: 'Design & UX', tools: ['Figma', 'Adobe XD', 'Lottie', 'Storybook'] },
  ];

  return (
    <div style={{ background: '#E8F0FE' }}>
      {/* ══ 1. HERO IMMERSIF ══ */}
      <section ref={heroRef} style={{
        position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center',
        padding: '120px 2rem 4rem', overflow: 'hidden',
      }}>
        {/* Full-screen background image */}
        <motion.div
          initial={{ scale: 1.1 }} animate={{ scale: 1 }}
          transition={{ duration: 8, ease: 'easeOut' }}
          style={{ position: 'absolute', inset: 0, zIndex: 0 }}
        >
          <img src={IMG.heroCode} alt="Technology background"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </motion.div>

        {/* Dark overlay gradient for readability */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 1,
          background: `linear-gradient(135deg, rgba(10,22,80,0.85) 0%, rgba(13,27,76,0.7) 40%, rgba(27,111,224,0.3) 100%)`,
        }} />
        <div style={{
          position: 'absolute', inset: 0, zIndex: 1,
          background: 'linear-gradient(180deg, rgba(10,22,80,0.4) 0%, transparent 30%, transparent 70%, rgba(10,22,80,0.6) 100%)',
        }} />

        {/* Aurora glows on top of image */}
        <AuroraBg />

        {/* Grid overlay */}
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.04, zIndex: 1,
          backgroundImage: `linear-gradient(${COLORS.cyan} 1px, transparent 1px), linear-gradient(90deg, ${COLORS.cyan} 1px, transparent 1px)`,
          backgroundSize: '50px 50px', pointerEvents: 'none',
        }} />

        <motion.div style={{ y: heroY, opacity: heroOpacity, maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 3, width: '100%' }}>
          <motion.div
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            style={{ maxWidth: 720 }}
          >
            <h1 style={{
              fontFamily: FONTS.display, fontWeight: 800,
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', lineHeight: 1.02,
              color: COLORS.white, marginBottom: '1.5rem', letterSpacing: '-0.02em',
            }}>
              Nous construisons votre{' '}
              <span style={{
                background: `linear-gradient(135deg, ${COLORS.cyan} 0%, ${COLORS.electricLt} 100%)`,
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                filter: `drop-shadow(0 0 20px ${COLORS.cyanGlow})`,
              }}>
                monde digital
              </span>
            </h1>

            <p style={{
              fontFamily: FONTS.body, fontSize: 'clamp(1.05rem, 2vw, 1.3rem)', lineHeight: 1.6,
              color: 'rgba(255,255,255,0.8)', maxWidth: 560, marginBottom: '2.5rem',
            }}>
              Du site vitrine a la plateforme complexe, notre code est rapide, scalable et elegant. Pense pour les realites africaines, concu pour durer.
            </p>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link to="/contact"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  background: `linear-gradient(135deg, ${COLORS.electric}, ${COLORS.cyan})`,
                  color: '#fff', padding: '0.9rem 2.2rem', borderRadius: 12,
                  fontFamily: FONTS.display, fontWeight: 700, fontSize: '1.05rem',
                  textDecoration: 'none', boxShadow: `0 8px 30px rgba(91,200,242,0.4)`,
                  transition: 'all 0.3s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.boxShadow = `0 12px 40px rgba(91,200,242,0.6)`;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = `0 8px 30px rgba(91,200,242,0.4)`;
                }}>
                Demarrer un projet <ArrowRight size={18} />
              </Link>
              <Link to="/"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  color: COLORS.whiteSoft, border: `1px solid rgba(255,255,255,0.25)`,
                  padding: '0.9rem 2.2rem', borderRadius: 12,
                  fontFamily: FONTS.display, fontWeight: 600, fontSize: '1.05rem',
                  textDecoration: 'none', transition: 'all 0.3s', backdropFilter: 'blur(10px)',
                  background: 'rgba(255,255,255,0.05)',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = COLORS.cyan; e.currentTarget.style.color = COLORS.cyan; e.currentTarget.style.background = 'rgba(91,200,242,0.1)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'; e.currentTarget.style.color = COLORS.whiteSoft; e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}>
                Retour a l'accueil
              </Link>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ position: 'absolute', bottom: 30, left: '50%', transform: 'translateX(-50%)', textAlign: 'center' }}
        >
          <ChevronDown size={28} color={COLORS.electric} style={{ opacity: 0.4 }} />
        </motion.div>
      </section>

      {/* ══ 2. SERVICES — cards premium ══ */}
      <section style={{ padding: '6rem 2rem', background: 'linear-gradient(180deg, #E8F0FE 0%, #F0F5FF 100%)', position: 'relative' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7 }}
            style={{ textAlign: 'center', marginBottom: '4rem' }}
          >
            <span style={{ fontFamily: FONTS.mono, fontSize: '0.78rem', color: COLORS.electric, letterSpacing: '0.2em', display: 'block', marginBottom: 12 }}>
              // NOS EXPERTISES
            </span>
            <h2 style={{ fontFamily: FONTS.display, fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 3rem)', color: COLORS.navyDeep, letterSpacing: '-0.02em' }}>
              Ce que nous construisons
            </h2>
            <p style={{ fontFamily: FONTS.body, fontSize: '1.05rem', color: 'rgba(10,22,80,0.55)', maxWidth: 500, margin: '1rem auto 0' }}>
              Six expertises, un seul objectif : transformer vos idees en produits digitaux exceptionnels.
            </p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {services.map((svc, i) => (
              <ServiceCardItem key={i} svc={svc} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ══ 3. PROCESS — timeline sur fond bleu marine ══ */}
      <section style={{
        padding: '7rem 2rem', position: 'relative', overflow: 'hidden',
        background: `linear-gradient(180deg, ${COLORS.navyDeep} 0%, ${COLORS.navyDark} 100%)`,
      }}>
        <motion.div
          animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          style={{ position: 'absolute', top: '10%', right: '5%', width: 400, height: 400, borderRadius: '50%', filter: 'blur(100px)', background: `radial-gradient(circle, ${COLORS.cyanGlow} 0%, transparent 70%)`, pointerEvents: 'none' }}
        />
        <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7 }}
            style={{ textAlign: 'center', marginBottom: '4rem' }}
          >
            <span style={{ fontFamily: FONTS.mono, fontSize: '0.78rem', color: COLORS.cyan, letterSpacing: '0.2em', display: 'block', marginBottom: 12 }}>
              // NOTRE METHODE
            </span>
            <h2 style={{ fontFamily: FONTS.display, fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 3rem)', color: COLORS.white, letterSpacing: '-0.02em' }}>
              Comment nous travaillons
            </h2>
          </motion.div>
          <ProcessTimeline />
        </div>
      </section>

      {/* ══ 3.5 SHOWCASE — nos realisations ══ */}
      <section style={{ padding: '6rem 2rem', background: 'linear-gradient(180deg, #E8F0FE 0%, #F0F5FF 100%)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7 }}
            style={{ textAlign: 'center', marginBottom: '3.5rem' }}
          >
            <span style={{ fontFamily: FONTS.mono, fontSize: '0.78rem', color: COLORS.electric, letterSpacing: '0.2em', display: 'block', marginBottom: 12 }}>
              // NOS REALISATIONS
            </span>
            <h2 style={{ fontFamily: FONTS.display, fontWeight: 800, fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', color: COLORS.navyDeep, letterSpacing: '-0.02em' }}>
              Des projets qui parlent d'eux-memes
            </h2>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {[
              { img: '/mairie.jpeg', title: 'MaMairie', tag: 'React · Mobile · Services publics', link: 'https://mamairieci.netlify.app/' },
              { img: '/app.png', title: 'Eglise CTF', tag: 'Web · Mobile · Gestion', link: 'https://eglisectf.org/' },
            ].map((project, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                style={{
                  position: 'relative', borderRadius: 18, overflow: 'hidden',
                  cursor: project.link ? 'pointer' : 'default', height: 280,
                  boxShadow: '0 8px 30px rgba(10,22,80,0.08)',
                }}
                whileHover={{ y: -6 }}
                onClick={() => project.link && window.open(project.link, '_blank')}
              >
                <img src={project.img} alt={project.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s' }}
                  className="showcase-img"
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 40%, rgba(10,22,80,0.75) 100%)' }} />
                {project.link && (
                  <div style={{
                    position: 'absolute', top: 12, right: 12,
                    background: `linear-gradient(135deg, ${COLORS.electric}, ${COLORS.cyan})`,
                    borderRadius: 8, padding: '4px 10px',
                    fontFamily: FONTS.mono, fontSize: '0.65rem', color: '#fff',
                    letterSpacing: '0.1em', fontWeight: 700,
                    boxShadow: `0 4px 12px ${COLORS.cyanGlow}`,
                  }}>
                    LIVE
                  </div>
                )}
                <div style={{ position: 'absolute', bottom: 20, left: 20, right: 20 }}>
                  <span style={{ fontFamily: FONTS.mono, fontSize: '0.7rem', color: COLORS.cyan, letterSpacing: '0.1em' }}>
                    {project.tag}
                  </span>
                  <h3 style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: '1.15rem', color: '#fff', marginTop: 4 }}>
                    {project.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 4. STACK TECHNIQUE — badges par categorie ══ */}
      <section style={{ padding: '6rem 2rem', background: 'linear-gradient(180deg, #F0F5FF 0%, #E8F0FE 100%)' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7 }}
            style={{ textAlign: 'center', marginBottom: '3.5rem' }}
          >
            <span style={{ fontFamily: FONTS.mono, fontSize: '0.78rem', color: COLORS.electric, letterSpacing: '0.2em', display: 'block', marginBottom: 12 }}>
              // STACK TECHNIQUE
            </span>
            <h2 style={{ fontFamily: FONTS.display, fontWeight: 800, fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', color: COLORS.navyDeep, marginBottom: '1rem', letterSpacing: '-0.02em' }}>
              Nos outils de predilection
            </h2>
            <p style={{ fontFamily: FONTS.body, fontSize: '1rem', color: 'rgba(10,22,80,0.5)', maxWidth: 500, margin: '0 auto' }}>
              Les meilleures technologies, choisies pour leur fiabilite et leur performance.
            </p>
          </motion.div>

          {stackCategories.map((cat, ci) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: ci * 0.1 }}
              style={{ marginBottom: '2.5rem' }}
            >
              <div style={{
                display: 'flex', alignItems: 'center', gap: '0.75rem',
                marginBottom: '1.25rem',
              }}>
                <div style={{
                  width: 8, height: 8, borderRadius: '50%',
                  background: `linear-gradient(135deg, ${COLORS.electric}, ${COLORS.cyan})`,
                  boxShadow: `0 0 10px ${COLORS.cyanGlow}`,
                }} />
                <h3 style={{
                  fontFamily: FONTS.display, fontWeight: 700, fontSize: '1.05rem',
                  color: COLORS.navyDeep,
                }}>
                  {cat.label}
                </h3>
                <div style={{
                  flex: 1, height: 1,
                  background: `linear-gradient(90deg, ${COLORS.electric}20, transparent)`,
                }} />
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                {cat.tools.map((tech, ti) => (
                  <TechBadge key={tech} tech={tech} index={ci * 10 + ti} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══ 5. CTA FINAL — bloc bleu marine avec grille lumineuse ══ */}
      <section style={{
        padding: '6rem 2rem', position: 'relative', overflow: 'hidden',
        background: `linear-gradient(135deg, ${COLORS.navyDeep} 0%, ${COLORS.navyDark} 100%)`,
      }}>
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.04,
          backgroundImage: `linear-gradient(${COLORS.cyan} 1px, transparent 1px), linear-gradient(90deg, ${COLORS.cyan} 1px, transparent 1px)`,
          backgroundSize: '40px 40px', pointerEvents: 'none',
        }} />
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          style={{ position: 'absolute', top: '20%', left: '15%', width: 300, height: 300, borderRadius: '50%', filter: 'blur(80px)', background: `radial-gradient(circle, ${COLORS.cyanGlow} 0%, transparent 70%)`, pointerEvents: 'none' }}
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          style={{ position: 'absolute', bottom: '10%', right: '10%', width: 350, height: 350, borderRadius: '50%', filter: 'blur(90px)', background: 'radial-gradient(circle, rgba(27,111,224,0.2) 0%, transparent 70%)', pointerEvents: 'none' }}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 2 }}
        >
          <h2 style={{
            fontFamily: FONTS.display, fontWeight: 800,
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: COLORS.white,
            marginBottom: '1.25rem', letterSpacing: '-0.02em',
          }}>
            Pret a transformer votre vision en realite ?
          </h2>
          <p style={{
            fontFamily: FONTS.body, fontSize: '1.1rem', color: 'rgba(255,255,255,0.6)',
            marginBottom: '2.5rem', maxWidth: 480, margin: '0 auto 2.5rem',
          }}>
            Discutons de votre projet. Notre equipe vous repond sous 24h.
          </p>
          <Link to="/contact"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              background: `linear-gradient(135deg, ${COLORS.electric}, ${COLORS.cyan})`,
              color: '#fff', padding: '1.1rem 2.8rem', borderRadius: 14,
              fontFamily: FONTS.display, fontWeight: 700, fontSize: '1.15rem',
              textDecoration: 'none', boxShadow: `0 10px 40px rgba(91,200,242,0.35)`,
              transition: 'all 0.3s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = `0 15px 50px rgba(91,200,242,0.5)`;
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = `0 10px 40px rgba(91,200,242,0.35)`;
            }}>
            Contactez-nous <ArrowRight size={22} />
          </Link>
        </motion.div>
      </section>

      <style>{`
        .showcase-img:hover { transform: scale(1.08) !important; }
      `}</style>
    </div>
  );
}
