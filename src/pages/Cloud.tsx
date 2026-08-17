import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Cloud as CloudIcon, Server, Container, Shield, Gauge,
  ArrowRight, ChevronDown, HardDrive, DollarSign, Activity,
} from 'lucide-react';
import { COLORS, FONTS } from '../theme/colors';
import { useCountUp } from '../hooks/useCountUp';

// ─── Images Unsplash ───
const CLOUD_IMG = {
  hero: 'https://images.unsplash.com/photo-1469365556835-3da3db4c253b?q=80&w=1600&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  hosting: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=600&q=80',
  migration: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=600&q=80',
  security: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&q=80',
  container: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80',
  monitoring: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80',
  backup: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=600&q=80',
  finops: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80',
};

// ─── Iso architecture background ───
function IsoArchitecture() {
  const blocks = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    x: 10 + (i % 4) * 25,
    y: 20 + Math.floor(i / 4) * 25,
    delay: Math.random() * 3,
  }));
  const flows: { from: number; to: number }[] = [
    { from: 0, to: 1 }, { from: 1, to: 5 }, { from: 2, to: 6 },
    { from: 3, to: 7 }, { from: 4, to: 8 }, { from: 5, to: 9 },
    { from: 6, to: 10 }, { from: 7, to: 11 },
  ];
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1 }}>
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        {flows.map((f, i) => {
          const a = blocks[f.from], b = blocks[f.to];
          return (
            <g key={`flow-${i}`}>
              <line x1={`${a.x}%`} y1={`${a.y}%`} x2={`${b.x}%`} y2={`${b.y}%`}
                stroke={COLORS.electric} strokeWidth={0.5} opacity={0.15} />
              <motion.circle r={2.5} fill={COLORS.cyan}
                animate={{
                  cx: [`${a.x}%`, `${b.x}%`],
                  cy: [`${a.y}%`, `${b.y}%`],
                  opacity: [0, 0.7, 0],
                }}
                transition={{ duration: Math.random() * 2 + 2, repeat: Infinity, delay: Math.random() * 4, ease: 'easeInOut' }}
              />
            </g>
          );
        })}
      </svg>
      {blocks.map((b) => (
        <motion.div
          key={b.id}
          animate={{ opacity: [0.15, 0.35, 0.15], scale: [0.9, 1.05, 0.9] }}
          transition={{ duration: 4, repeat: Infinity, delay: b.delay, ease: 'easeInOut' }}
          style={{
            position: 'absolute', left: `${b.x}%`, top: `${b.y}%`,
            width: 40, height: 40, borderRadius: 8,
            border: `1px solid ${COLORS.electric}40`,
            background: `${COLORS.electric}08`,
            boxShadow: `0 0 12px ${COLORS.cyanGlow}`,
          }}
        />
      ))}
    </div>
  );
}

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

// ─── Uptime badge ───
function UptimeBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1 }}
      style={{
        position: 'absolute', top: '30%', right: '8%',
        display: 'inline-flex', alignItems: 'center', gap: 8,
        padding: '0.6rem 1.25rem', borderRadius: 100,
        background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(12px)',
        border: `1px solid ${COLORS.electric}30`,
        zIndex: 2,
      }}
    >
      <motion.div
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        style={{ width: 8, height: 8, borderRadius: '50%', background: '#28C840', boxShadow: '0 0 8px rgba(40,200,64,0.5)' }}
      />
      <span style={{ fontFamily: FONTS.mono, fontWeight: 700, fontSize: '0.85rem', color: COLORS.navyDeep }}>
        99.9% uptime
      </span>
    </motion.div>
  );
}

// ─── Animated stat ───
function CloudStat({ value, suffix, label, delay }: { value: number; suffix: string; label: string; delay: number }) {
  const { count, ref } = useCountUp(value, 2500);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      style={{
        background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(16px)',
        border: `1px solid ${COLORS.cyan}30`, borderRadius: 16,
        padding: '1.5rem 1.25rem', textAlign: 'center',
        boxShadow: `0 8px 30px rgba(27,111,224,0.08)`,
      }}
    >
      <div style={{
        fontFamily: FONTS.mono, fontWeight: 800,
        fontSize: 'clamp(2rem, 4vw, 2.8rem)',
        color: COLORS.electric, lineHeight: 1,
        textShadow: `0 0 20px ${COLORS.cyanGlow}`,
      }}>
        {count}{suffix}
      </div>
      <div style={{
        fontFamily: FONTS.body, fontSize: '0.82rem',
        color: 'rgba(10,22,80,0.55)', marginTop: '0.5rem',
      }}>
        {label}
      </div>
    </motion.div>
  );
}

// ─── Cloud service card ───
type CloudService = { icon: typeof Server; title: string; desc: string; img: string };
function CloudServiceCard({ svc, index }: { svc: CloudService; index: number }) {
  const [hovered, setHovered] = useState(false);
  const Icon = svc.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative', background: 'rgba(255,255,255,0.85)',
        backdropFilter: 'blur(12px)',
        border: `1px solid ${hovered ? COLORS.electric + '50' : 'rgba(27,111,224,0.08)'}`,
        borderRadius: 16, cursor: 'pointer',
        transition: 'all 0.3s ease',
        overflow: 'hidden',
        boxShadow: hovered
          ? `0 16px 50px rgba(27,111,224,0.15), 0 0 30px ${COLORS.cyanGlow}`
          : '0 4px 16px rgba(10,22,80,0.05)',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
      }}
    >
      <div style={{ position: 'relative', height: 160, overflow: 'hidden' }}>
        <img src={svc.img} alt={svc.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease', transform: hovered ? 'scale(1.08)' : 'scale(1)' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(244,248,255,0.2) 0%, rgba(255,255,255,0.8) 100%)' }} />
        <div style={{
          position: 'absolute', bottom: 10, left: 10,
          width: 40, height: 40, borderRadius: 10,
          background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(8px)',
          border: `1px solid ${COLORS.electric}30`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Icon size={20} color={COLORS.electric} />
        </div>
      </div>

      {hovered && (
        <motion.div
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{ duration: 1.2, ease: 'linear', repeat: Infinity }}
          style={{
            position: 'absolute', top: 0, bottom: 0, width: 3,
            background: `linear-gradient(180deg, transparent, ${COLORS.cyan}, transparent)`,
            boxShadow: `0 0 12px ${COLORS.cyanGlow}`,
            pointerEvents: 'none',
          }}
        />
      )}

      <div style={{ padding: '1.5rem 1.75rem', position: 'relative', zIndex: 2 }}>
        <h3 style={{
          fontFamily: FONTS.display, fontWeight: 700, fontSize: '1.1rem',
          color: COLORS.navyDeep, marginBottom: '0.6rem',
        }}>
          {svc.title}
        </h3>
        <p style={{
          fontFamily: FONTS.body, fontSize: '0.88rem', lineHeight: 1.65,
          color: 'rgba(10,22,80,0.55)',
        }}>
          {svc.desc}
        </p>
      </div>
    </motion.div>
  );
}

// ─── Architecture showcase mockup ───
function ArchMockup() {
  const nodes = [
    { label: 'Load Balancer', x: 50, y: 10, icon: Activity },
    { label: 'Server 1', x: 20, y: 40, icon: Server },
    { label: 'Server 2', x: 50, y: 40, icon: Server },
    { label: 'Server 3', x: 80, y: 40, icon: Server },
    { label: 'Database', x: 35, y: 72, icon: HardDrive },
    { label: 'CDN', x: 65, y: 72, icon: CloudIcon },
  ];
  const flows: { from: number; to: number }[] = [
    { from: 0, to: 1 }, { from: 0, to: 2 }, { from: 0, to: 3 },
    { from: 1, to: 4 }, { from: 2, to: 4 }, { from: 3, to: 5 },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      style={{
        maxWidth: 700, margin: '0 auto',
        background: 'rgba(10,22,80,0.9)', backdropFilter: 'blur(20px)',
        borderRadius: 20, overflow: 'hidden',
        border: `1px solid ${COLORS.electric}30`,
        boxShadow: `0 30px 80px rgba(10,22,80,0.3), 0 0 60px rgba(91,200,242,0.1)`,
        padding: '2rem',
        position: 'relative', minHeight: 420,
      }}
    >
      {/* Grid background */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.05, pointerEvents: 'none',
        backgroundImage: `linear-gradient(${COLORS.cyan} 1px, transparent 1px), linear-gradient(90deg, ${COLORS.cyan} 1px, transparent 1px)`,
        backgroundSize: '30px 30px',
      }} />

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', position: 'relative', zIndex: 2 }}>
        <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.5, repeat: Infinity }}
          style={{ width: 8, height: 8, borderRadius: '50%', background: '#28C840' }} />
        <span style={{ fontFamily: FONTS.mono, fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)' }}>
          infrastructure.kuble.cloud — live topology
        </span>
      </div>

      {/* Architecture diagram */}
      <div style={{ position: 'relative', width: '100%', height: 340 }}>
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
          {flows.map((f, i) => {
            const a = nodes[f.from], b = nodes[f.to];
            return (
              <g key={`arch-flow-${i}`}>
                <line x1={`${a.x}%`} y1={`${a.y}%`} x2={`${b.x}%`} y2={`${b.y}%`}
                  stroke={COLORS.electric} strokeWidth={1} opacity={0.3} strokeDasharray="4 4" />
                <motion.circle r={3} fill={COLORS.cyan}
                  animate={{
                    cx: [`${a.x}%`, `${b.x}%`],
                    cy: [`${a.y}%`, `${b.y}%`],
                    opacity: [0, 1, 0],
                  }}
                  transition={{ duration: 1.5 + Math.random(), repeat: Infinity, delay: i * 0.3, ease: 'easeInOut' }}
                />
              </g>
            );
          })}
        </svg>

        {nodes.map((n, i) => {
          const NIcon = n.icon;
          return (
            <motion.div
              key={n.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
              style={{
                position: 'absolute', left: `${n.x}%`, top: `${n.y}%`,
                transform: 'translate(-50%, -50%)',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
              }}
            >
              <motion.div
                animate={{ boxShadow: [`0 0 8px ${COLORS.cyanGlow}`, `0 0 20px ${COLORS.cyanGlow}`, `0 0 8px ${COLORS.cyanGlow}`] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                style={{
                  width: 44, height: 44, borderRadius: 10,
                  background: 'rgba(27,111,224,0.15)',
                  border: `1px solid ${COLORS.electric}50`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                <NIcon size={20} color={COLORS.cyan} />
              </motion.div>
              <span style={{ fontFamily: FONTS.mono, fontSize: '0.65rem', color: 'rgba(255,255,255,0.6)', whiteSpace: 'nowrap' }}>
                {n.label}
              </span>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

// ─── Timeline step ───
function CloudTimelineStep({ step, index }: { step: { num: string; title: string; desc: string }; index: number }) {
  return (
    <motion.div
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
        <div style={{ fontFamily: FONTS.mono, fontWeight: 700, fontSize: '0.8rem', color: COLORS.electric, marginBottom: '0.25rem' }}>
          {step.num}
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

// ═══════════════════════════════════════════════════════════
//  PAGE CLOUD & INFRASTRUCTURE
// ═══════════════════════════════════════════════════════════
export default function Cloud() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const imgY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.25]);
  const mockupRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: mockProgress } = useScroll({ target: mockupRef, offset: ['start end', 'end start'] });
  const mockupY = useTransform(mockProgress, [0, 1], [40, -40]);

  const services: CloudService[] = [
    { icon: CloudIcon, title: 'Hébergement Cloud & Scalabilité', desc: 'Infrastructures cloud (AWS, Azure, GCP, OVH), scalables selon votre trafic, haute disponibilité.', img: CLOUD_IMG.hosting },
    { icon: Server, title: 'Architecture & Migration Cloud', desc: 'Conception d\'architecture cloud, migration de vos systèmes existants sans interruption de service.', img: CLOUD_IMG.migration },
    { icon: Shield, title: 'Sécurisation & Gestion des Accès', desc: 'Durcissement des serveurs, gestion des identités (IAM), chiffrement des données, conformité.', img: CLOUD_IMG.security },
    { icon: Container, title: 'Conteneurisation & Orchestration', desc: 'Docker, Kubernetes, microservices, déploiements isolés et portables.', img: CLOUD_IMG.container },
    { icon: Gauge, title: 'Monitoring & Supervision', desc: 'Surveillance en temps réel, alertes proactives, tableaux de bord de performance infrastructure.', img: CLOUD_IMG.monitoring },
    { icon: HardDrive, title: 'Sauvegarde & Reprise d\'activité (DRP/PRA)', desc: 'Plans de continuité, sauvegardes automatisées, restauration rapide en cas d\'incident.', img: CLOUD_IMG.backup },
    { icon: DollarSign, title: 'Optimisation des coûts Cloud (FinOps)', desc: 'Audit des ressources, réduction des coûts, dimensionnement intelligent.', img: CLOUD_IMG.finops },
  ];

  const steps = [
    { num: '01', title: 'Audit', desc: 'Évaluation de l\'existant, stratégie de migration, cloud readiness assessment.' },
    { num: '02', title: 'Architecture', desc: 'Conception cloud-native, Terraform, modules réutilisables, security by design.' },
    { num: '03', title: 'Déploiement', desc: 'Mise en place des pipelines CI/CD, blue/green, canary, rollback automatique.' },
    { num: '04', title: 'Monitoring', desc: 'Surveillance temps réel, alertes, dashboards, observabilité complète.' },
    { num: '05', title: 'Optimisation Continue', desc: 'Réduction des coûts, right-sizing, reserved instances, FinOps.' },
  ];

  const stack = ['AWS', 'Azure', 'Google Cloud', 'Docker', 'Kubernetes', 'Terraform', 'Ansible', 'Prometheus', 'Grafana', 'ArgoCD', 'Nginx', 'CloudFlare'];

  return (
    <div style={{ background: COLORS.bgLight }}>
      {/* ══ 1. HERO ══ */}
      <section ref={heroRef} style={{
        position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center',
        padding: '120px 2rem 4rem', overflow: 'hidden',
        background: `linear-gradient(180deg, #F4F8FF 0%, #FFFFFF 60%, #FFFFFF 100%)`,
      }}>
        {/* Background image */}
        <motion.div
          initial={{ scale: 1.15 }} animate={{ scale: 1.05 }}
          transition={{ duration: 12, ease: 'easeOut' }}
          style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden' }}
        >
          <motion.img
            src={CLOUD_IMG.hero} alt=""
            style={{ width: '100%', height: '100%', objectFit: 'cover', willChange: 'transform', y: imgY, scale: imgScale }}
            initial={{ scale: 1.2 }} animate={{ scale: 1.08 }}
            transition={{ duration: 15, ease: 'easeOut' }}
          />
        </motion.div>
        {/* Light overlay */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 1,
          background: `linear-gradient(180deg, rgba(244,248,255,0.35) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0.65) 100%)`,
        }} />

        <BreathingHalo x="10%" y="15%" size={500} color={COLORS.cyanGlow} delay={0} />
        <BreathingHalo x="60%" y="50%" size={450} color="rgba(27,111,224,0.12)" delay={3} />
        <IsoArchitecture />
        <UptimeBadge />

        <motion.div style={{ y: heroY, opacity: heroOpacity, maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 3, width: '100%' }}>
          <motion.div
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            style={{ maxWidth: 760 }}
          >
            <h1 style={{
              fontFamily: FONTS.display, fontWeight: 800,
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', lineHeight: 1.02,
              color: COLORS.navyDeep, marginBottom: '1.5rem', letterSpacing: '-0.02em',
            }}>
              Une infrastructure{' '}
              <span style={{
                background: `linear-gradient(135deg, ${COLORS.electric} 0%, ${COLORS.cyan} 100%)`,
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                filter: `drop-shadow(0 0 20px ${COLORS.cyanGlow})`,
              }}>
                solide, invisible
              </span>
              {' '}et toujours prête
            </h1>

            <p style={{
              fontFamily: FONTS.body, fontSize: 'clamp(1.05rem, 2vw, 1.3rem)', lineHeight: 1.6,
              color: 'rgba(10,22,80,0.6)', maxWidth: 580, marginBottom: '2.5rem',
            }}>
              Cloud, conteneurisation, monitoring et sauvegarde. Nous concevons des infrastructures qui scalent avec votre croissance, sans jamais faiblir.
            </p>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link to="/contact"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  background: `linear-gradient(135deg, ${COLORS.electric}, ${COLORS.cyan})`,
                  color: '#fff', padding: '0.9rem 2.2rem', borderRadius: 12,
                  fontFamily: FONTS.display, fontWeight: 700, fontSize: '1.05rem',
                  textDecoration: 'none', boxShadow: `0 8px 30px rgba(27,111,224,0.3)`,
                  transition: 'all 0.3s',
                }}
              >
                Démarrer un projet <ArrowRight size={18} />
              </Link>
              <Link to="/contact"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(10px)',
                  color: COLORS.navyDeep, padding: '0.9rem 2.2rem', borderRadius: 12,
                  fontFamily: FONTS.display, fontWeight: 700, fontSize: '1.05rem',
                  textDecoration: 'none', border: `1px solid ${COLORS.electric}30`,
                  transition: 'all 0.3s',
                }}
              >
                Voir nos réalisations
              </Link>
            </div>
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

      {/* ══ 2. Section valeur ══ */}
      <section style={{ padding: '6rem 2rem', background: `linear-gradient(180deg, #FFFFFF 0%, #F8FBFF 100%)` }}>
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
              Fiabilité et{' '}
              <span style={{ color: COLORS.electric }}>scalabilité</span>
              {' '}par conception
            </h2>
            <p style={{
              fontFamily: FONTS.body, fontSize: '1.1rem', color: 'rgba(10,22,80,0.6)',
              maxWidth: 600, margin: '0 auto',
            }}>
              Une infrastructure bien conçue est invisible. Elle tourne, elle scale, elle ne tombe pas. C'est notre métier.
            </p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
            <CloudStat value={99} suffix=".9%" label="Disponibilité garantie" delay={0} />
            <CloudStat value={50} suffix="ms" label="Latence p99" delay={0.15} />
            <CloudStat value={40} suffix="%" label="Réduction des coûts cloud" delay={0.3} />
            <CloudStat value={24} suffix="/7" label="Monitoring & alertes" delay={0.45} />
          </div>
        </div>
      </section>

      {/* ══ 3. Grille des services ══ */}
      <section style={{ padding: '6rem 2rem', background: `linear-gradient(180deg, #F8FBFF 0%, #FFFFFF 50%, #F8FBFF 100%)` }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
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
              Nos services{' '}
              <span style={{ color: COLORS.electric }}>Cloud</span>
            </h2>
            <p style={{
              fontFamily: FONTS.body, fontSize: '1.1rem', color: 'rgba(10,22,80,0.6)',
              maxWidth: 600, margin: '0 auto',
            }}>
              De l'hébergement à l'optimisation FinOps, nous couvrons toute la chaîne d'infrastructure cloud.
            </p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {services.map((svc, i) => (
              <CloudServiceCard key={svc.title} svc={svc} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ══ 4. Showcase — architecture vivante (section sombre) ══ */}
      <section ref={mockupRef} style={{
        padding: '6rem 2rem',
        background: `linear-gradient(180deg, ${COLORS.navyDeep} 0%, ${COLORS.navyDark} 100%)`,
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.05, pointerEvents: 'none',
          backgroundImage: `linear-gradient(${COLORS.cyan} 1px, transparent 1px), linear-gradient(90deg, ${COLORS.cyan} 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }} />
        <BreathingHalo x="20%" y="20%" size={500} color={COLORS.cyanGlow} delay={1} />

        <div style={{ maxWidth: 1000, margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{ textAlign: 'center', marginBottom: '3rem' }}
          >
            <h2 style={{
              fontFamily: FONTS.display, fontWeight: 700,
              fontSize: 'clamp(2rem, 4vw, 3rem)', color: COLORS.white,
              marginBottom: '1rem',
            }}>
              Votre infrastructure,{' '}
              <span style={{
                background: `linear-gradient(135deg, ${COLORS.cyan} 0%, ${COLORS.electricLt} 100%)`,
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>
                en temps réel
              </span>
            </h2>
            <p style={{
              fontFamily: FONTS.body, fontSize: '1.1rem', color: 'rgba(255,255,255,0.6)',
              maxWidth: 600, margin: '0 auto',
            }}>
              Une topology vivante où le trafic circule, les serveurs répondent et la base de données synchronise — sous surveillance permanente.
            </p>
          </motion.div>

          <motion.div style={{ y: mockupY }}>
            <ArchMockup />
          </motion.div>
        </div>
      </section>

      {/* ══ 5. Méthodologie ══ */}
      <section style={{ padding: '6rem 2rem', background: `linear-gradient(180deg, #F4F8FF 0%, #FFFFFF 100%)` }}>
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
              Notre méthodologie
            </h2>
            <p style={{
              fontFamily: FONTS.body, fontSize: '1.1rem', color: 'rgba(10,22,80,0.6)',
              maxWidth: 600, margin: '0 auto',
            }}>
              Un processus structuré pour une infrastructure fiable, scalable et économique.
            </p>
          </motion.div>

          <div style={{ position: 'relative' }}>
            <svg style={{ position: 'absolute', left: '50%', top: 0, width: 2, height: '100%', transform: 'translateX(-50%)' }}>
              <defs>
                <linearGradient id="cloudTimelineGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={COLORS.electric} />
                  <stop offset="100%" stopColor={COLORS.cyan} />
                </linearGradient>
              </defs>
              <motion.line
                x1={1} y1={0} x2={1} y2="100%"
                stroke="url(#cloudTimelineGrad)"
                strokeWidth={2}
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2, ease: 'easeInOut' }}
              />
            </svg>

            {steps.map((step, i) => (
              <CloudTimelineStep key={step.num} step={step} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ══ 6. Stack cloud ══ */}
      <section style={{ padding: '5rem 2rem', background: `linear-gradient(180deg, #FFFFFF 0%, #F8FBFF 100%)` }}>
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
              Notre stack Cloud
            </h2>
            <p style={{ fontFamily: FONTS.body, fontSize: '1rem', color: 'rgba(10,22,80,0.6)' }}>
              Les meilleures plateformes et outils du marché.
            </p>
          </motion.div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
            {stack.map((tech, i) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                whileHover={{ y: -4, scale: 1.05, boxShadow: `0 8px 24px ${COLORS.cyanGlow}` }}
                style={{
                  padding: '0.75rem 1.5rem', borderRadius: 12,
                  background: 'rgba(255,255,255,0.9)',
                  border: `1px solid ${COLORS.electric}20`,
                  fontFamily: FONTS.display, fontWeight: 600, fontSize: '0.95rem',
                  color: COLORS.navyDeep,
                  boxShadow: '0 4px 12px rgba(10,22,80,0.05)',
                  transition: 'all 0.3s ease',
                }}
              >
                {tech}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 7. CTA final (clair, spotlight) ══ */}
      <section style={{
        padding: '6rem 2rem',
        background: `linear-gradient(180deg, #F8FBFF 0%, #F4F8FF 100%)`,
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
          <h2 style={{
            fontFamily: FONTS.display, fontWeight: 800,
            fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: COLORS.navyDeep,
            marginBottom: '1.5rem', lineHeight: 1.1,
          }}>
            Votre croissance mérite une infrastructure{' '}
            <span style={{
              background: `linear-gradient(135deg, ${COLORS.electric} 0%, ${COLORS.cyan} 100%)`,
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>
              qui suit le rythme
            </span>
          </h2>
          <p style={{
            fontFamily: FONTS.body, fontSize: '1.15rem', color: 'rgba(10,22,80,0.6)',
            marginBottom: '2.5rem', maxWidth: 560, margin: '0 auto 2.5rem',
          }}>
            Scalabilité, fiabilité, économies. Construisons l'infrastructure qui portera votre croissance.
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
              Démarrer un projet <ArrowRight size={18} />
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
