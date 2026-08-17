import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Shield, Bug, Eye, FileCheck, AlertTriangle, Radar, Fingerprint,
  ArrowRight, ChevronDown, Server, Activity,
} from 'lucide-react';
import { COLORS, FONTS } from '../theme/colors';
import { useCountUp } from '../hooks/useCountUp';

// ─── Scan line effect ───
function ScanLine({ delay = 0, duration = 8, horizontal = false }: { delay?: number; duration?: number; horizontal?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 1, 0], [horizontal ? 'x' : 'y']: ['0%', '0%', '100%', '100%'] }}
      transition={{ duration, delay, repeat: Infinity, ease: 'linear', times: [0, 0.1, 0.9, 1] }}
      style={{
        position: 'absolute',
        [horizontal ? 'top' : 'left']: 0,
        [horizontal ? 'width' : 'height']: '100%',
        [horizontal ? 'height' : 'width']: 2,
        background: `linear-gradient(${horizontal ? '90deg' : '180deg'}, transparent, ${COLORS.cyan}, transparent)`,
        boxShadow: `0 0 20px ${COLORS.cyanGlow}`,
        pointerEvents: 'none',
        zIndex: 1,
      }}
    />
  );
}

// ─── Grid background ───
function CyberGrid() {
  return (
    <div style={{
      position: 'absolute', inset: 0, opacity: 0.06, pointerEvents: 'none',
      backgroundImage: `linear-gradient(${COLORS.cyan} 1px, transparent 1px), linear-gradient(90deg, ${COLORS.cyan} 1px, transparent 1px)`,
      backgroundSize: '40px 40px',
    }} />
  );
}

// ─── Pulsing data point ───
function DataPoint({ x, y, delay }: { x: number; y: number; delay: number }) {
  return (
    <motion.div
      animate={{ opacity: [0.2, 0.8, 0.2], scale: [0.8, 1.3, 0.8] }}
      transition={{ duration: 3, repeat: Infinity, delay, ease: 'easeInOut' }}
      style={{
        position: 'absolute', left: `${x}%`, top: `${y}%`,
        width: 6, height: 6, borderRadius: '50%',
        background: COLORS.cyan,
        boxShadow: `0 0 12px ${COLORS.cyanGlow}`,
        pointerEvents: 'none',
      }}
    />
  );
}

// ─── Terminal log effect ───
const LOG_LINES = [
  '[SECURE] Firewall rules updated — 247 entries',
  '[SCAN] Port scan completed — 0 open vulnerabilities',
  '[ALERT] Intrusion attempt blocked — IP 192.168.x.x',
  '[AUDIT] ISO 27001 compliance check — PASSED',
  '[MONITOR] Traffic anomaly detected — mitigated',
  '[ENCRYPT] Data at rest — AES-256 active',
  '[PATCH] Security updates applied — 12 packages',
  '[SOC] Threat level: NORMAL — all systems green',
];

function TerminalLog() {
  const [lines, setLines] = useState<string[]>([]);
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setLines((prev) => [...prev.slice(-5), LOG_LINES[i % LOG_LINES.length]]);
      i++;
    }, 2000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div style={{
      position: 'absolute', bottom: '3rem', right: '2rem', width: 360,
      background: 'rgba(6,13,46,0.7)', borderRadius: 12,
      border: `1px solid rgba(91,200,242,0.15)`,
      padding: '1rem 1.25rem', backdropFilter: 'blur(10px)',
      fontFamily: FONTS.mono, fontSize: '0.72rem', color: 'rgba(91,200,242,0.6)',
      pointerEvents: 'none', zIndex: 2, lineHeight: 1.8,
      display: 'flex', flexDirection: 'column', gap: 2,
    }}>
      {lines.map((line, i) => (
        <motion.div
          key={`${line}-${i}`}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
        >
          <span style={{ color: COLORS.cyan }}>›</span> {line}
        </motion.div>
      ))}
    </div>
  );
}

// ─── Cyber service card ───
type CyberService = { icon: typeof Shield; title: string; desc: string; img: string };
function CyberServiceCard({ svc, index }: { svc: CyberService; index: number }) {
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
        position: 'relative', background: 'rgba(13,27,76,0.6)',
        border: `1px solid ${hovered ? COLORS.cyan + '60' : 'rgba(91,200,242,0.12)'}`,
        borderRadius: 16, cursor: 'pointer',
        transition: 'all 0.3s ease',
        backdropFilter: 'blur(12px)',
        overflow: 'hidden',
        boxShadow: hovered ? `0 12px 40px rgba(91,200,242,0.15), 0 0 24px ${COLORS.cyanGlow}` : 'none',
      }}
    >
      {/* Service image */}
      <div style={{ position: 'relative', height: 160, overflow: 'hidden' }}>
        <img src={svc.img} alt={svc.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease', transform: hovered ? 'scale(1.08)' : 'scale(1)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(10,22,80,0.2) 0%, rgba(10,22,80,0.7) 100%)' }} />
        {/* Icon badge on image */}
        <div style={{
          position: 'absolute', bottom: 10, left: 10,
          width: 40, height: 40, borderRadius: 10,
          background: 'rgba(91,200,242,0.15)', backdropFilter: 'blur(8px)',
          border: `1px solid ${COLORS.cyan}40`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Icon size={20} color={COLORS.cyan} />
        </div>
      </div>

      {/* Scan effect on hover */}
      {hovered && (
        <motion.div
          initial={{ y: '-100%' }}
          animate={{ y: '100%' }}
          transition={{ duration: 1, ease: 'linear', repeat: Infinity }}
          style={{
            position: 'absolute', left: 0, right: 0, height: 2,
            background: `linear-gradient(90deg, transparent, ${COLORS.cyan}, transparent)`,
            boxShadow: `0 0 12px ${COLORS.cyanGlow}`,
            pointerEvents: 'none',
          }}
        />
      )}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.25rem', position: 'relative', zIndex: 2, padding: '1.5rem' }}>
        <div>
          <h3 style={{
            fontFamily: FONTS.display, fontWeight: 700, fontSize: '1.05rem',
            color: COLORS.white, marginBottom: '0.5rem',
          }}>
            {svc.title}
          </h3>
          <p style={{
            fontFamily: FONTS.body, fontSize: '0.85rem', lineHeight: 1.6,
            color: 'rgba(255,255,255,0.55)',
          }}>
            {svc.desc}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Animated stat ───
function CyberStat({ value, suffix, label, delay }: { value: number; suffix: string; label: string; delay: number }) {
  const { count, ref } = useCountUp(value, 2500);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      style={{ textAlign: 'center' }}
    >
      <div style={{
        fontFamily: FONTS.display, fontWeight: 800,
        fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
        color: COLORS.cyan, lineHeight: 1,
        textShadow: `0 0 24px ${COLORS.cyanGlow}`,
      }}>
        {count}{suffix}
      </div>
      <div style={{
        fontFamily: FONTS.body, fontSize: '0.9rem',
        color: 'rgba(255,255,255,0.55)', marginTop: '0.5rem',
      }}>
        {label}
      </div>
    </motion.div>
  );
}

// ─── Methodology timeline ───
const methodSteps = [
  { num: '01', title: 'Audit & Diagnostic', desc: 'Cartographie des vulnérabilités, analyse de risques, scoring de maturité cyber.', icon: Radar },
  { num: '02', title: 'Détection', desc: 'Mise en place du SOC, monitoring 24/7, détection d\'intrusion en temps réel.', icon: Eye },
  { num: '03', title: 'Protection', desc: 'Durcissement des serveurs, chiffrement, gestion des accès, pare-feu.', icon: Shield },
  { num: '04', title: 'Réponse', desc: 'Plan de réponse aux incidents, forensics, containment, reprise d\'activité.', icon: AlertTriangle },
  { num: '05', title: 'Amélioration Continue', desc: 'Audits réguliers, formation des équipes, mise à jour des politiques.', icon: Activity },
];

function MethodTimeline() {
  return (
    <div style={{ position: 'relative', maxWidth: 900, margin: '0 auto' }}>
      <motion.div
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 1.5, ease: 'easeInOut' }}
        style={{
          position: 'absolute', left: 28, top: 0, bottom: 0, width: 2,
          background: `linear-gradient(180deg, ${COLORS.electric}, ${COLORS.cyan}, transparent)`,
          transformOrigin: 'top',
        }}
      />
      {methodSteps.map((step, i) => {
        const Icon = step.icon;
        return (
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
              background: COLORS.navyDeep, border: `2px solid ${COLORS.electric}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: `0 0 20px rgba(27,111,224,0.3)`, zIndex: 2, position: 'relative',
            }}>
              <Icon size={22} color={COLORS.cyan} />
            </div>
            <div style={{ paddingTop: '0.4rem' }}>
              <span style={{ fontFamily: FONTS.mono, fontSize: '0.75rem', color: COLORS.electric, letterSpacing: '0.1em' }}>
                {step.num}
              </span>
              <h3 style={{
                fontFamily: FONTS.display, fontWeight: 700, fontSize: '1.25rem',
                color: COLORS.navyDeep, marginBottom: '0.5rem',
              }}>
                {step.title}
              </h3>
              <p style={{
                fontFamily: FONTS.body, fontSize: '0.95rem', lineHeight: 1.65,
                color: 'rgba(10,22,80,0.6)', maxWidth: 500,
              }}>
                {step.desc}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

// ─── Radar sweep component ───
function RadarSweep() {
  return (
    <div style={{ position: 'absolute', top: '50%', right: '5%', transform: 'translateY(-50%)', width: 320, height: 320, pointerEvents: 'none', zIndex: 2, opacity: 0.7 }}>
      <svg width="320" height="320" viewBox="0 0 320 320">
        {/* Concentric circles */}
        {[40, 80, 120, 160].map((r, i) => (
          <circle key={i} cx="160" cy="160" r={r} fill="none" stroke={COLORS.cyan} strokeWidth="1" opacity={0.15 - i * 0.02} />
        ))}
        {/* Cross lines */}
        <line x1="160" y1="0" x2="160" y2="320" stroke={COLORS.cyan} strokeWidth="0.5" opacity={0.1} />
        <line x1="0" y1="160" x2="320" y2="160" stroke={COLORS.cyan} strokeWidth="0.5" opacity={0.1} />
        {/* Diagonal lines */}
        <line x1="46" y1="46" x2="274" y2="274" stroke={COLORS.cyan} strokeWidth="0.5" opacity={0.06} />
        <line x1="274" y1="46" x2="46" y2="274" stroke={COLORS.cyan} strokeWidth="0.5" opacity={0.06} />
        {/* Center dot */}
        <circle cx="160" cy="160" r="4" fill={COLORS.cyan} opacity={0.6} />
        {/* Sweep beam */}
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          style={{ transformOrigin: '160px 160px' }}
        >
          <defs>
            <linearGradient id="sweepGrad" x1="0%" y1="50%" x2="100%" y2="50%">
              <stop offset="0%" stopColor={COLORS.cyan} stopOpacity="0" />
              <stop offset="100%" stopColor={COLORS.cyan} stopOpacity="0.4" />
            </linearGradient>
          </defs>
          <path d="M 160 160 L 160 0 A 160 160 0 0 1 273 47 Z" fill="url(#sweepGrad)" />
        </motion.g>
        {/* Detected threats (pulsing dots) */}
        {[
          { x: 220, y: 90, delay: 0 },
          { x: 100, y: 200, delay: 1.5 },
          { x: 240, y: 220, delay: 3 },
        ].map((pt, i) => (
          <motion.circle
            key={i}
            cx={pt.x} cy={pt.y} r="3"
            animate={{ opacity: [0, 1, 0], scale: [0.5, 1.5, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, delay: pt.delay, ease: 'easeInOut' }}
            fill={COLORS.electric}
          />
        ))}
        {/* Protected nodes (steady cyan dots) */}
        {[
          { x: 120, y: 100 },
          { x: 200, y: 180 },
          { x: 80, y: 160 },
          { x: 250, y: 130 },
        ].map((pt, i) => (
          <motion.circle
            key={`p-${i}`}
            cx={pt.x} cy={pt.y} r="2.5"
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
            fill={COLORS.cyan}
          />
        ))}
      </svg>
    </div>
  );
}

// ─── Threat network visualization ───
function ThreatMap() {
  const nodes = [
    { x: 50, y: 40, threat: false }, { x: 150, y: 25, threat: false },
    { x: 250, y: 50, threat: true }, { x: 350, y: 35, threat: false },
    { x: 80, y: 100, threat: false }, { x: 180, y: 90, threat: false },
    { x: 280, y: 110, threat: false }, { x: 380, y: 95, threat: true },
    { x: 50, y: 170, threat: false }, { x: 150, y: 160, threat: false },
    { x: 250, y: 180, threat: false }, { x: 350, y: 165, threat: false },
    { x: 100, y: 240, threat: false }, { x: 200, y: 230, threat: true },
    { x: 300, y: 250, threat: false }, { x: 400, y: 235, threat: false },
  ];
  return (
    <svg width="100%" height="300" viewBox="0 0 450 290" style={{ width: '100%', maxWidth: 500, margin: '0 auto', display: 'block' }}>
      {/* Connection lines */}
      {nodes.map((n, i) => nodes.slice(i + 1).map((m, j) => {
        const dist = Math.hypot(n.x - m.x, n.y - m.y);
        if (dist > 130) return null;
        const isThreat = n.threat || m.threat;
        return (
          <motion.line
            key={`${i}-${j}`}
            x1={n.x} y1={n.y} x2={m.x} y2={m.y}
            stroke={isThreat ? COLORS.electric : COLORS.cyan}
            strokeWidth="0.5"
            animate={{ opacity: [0.08, 0.2, 0.08] }}
            transition={{ duration: 3, repeat: Infinity, delay: (i + j) * 0.1 }}
          />
        );
      }))}
      {/* Nodes */}
      {nodes.map((n, i) => (
        <g key={i}>
          {n.threat ? (
            <>
              <motion.circle
                cx={n.x} cy={n.y} r="8" fill="none" stroke={COLORS.electric} strokeWidth="1"
                animate={{ r: [6, 14, 6], opacity: [0.6, 0, 0.6] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
              />
              <circle cx={n.x} cy={n.y} r="4" fill={COLORS.electric} opacity={0.8} />
            </>
          ) : (
            <>
              <motion.circle
                cx={n.x} cy={n.y} r="5" fill="none" stroke={COLORS.cyan} strokeWidth="0.8"
                animate={{ opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 0.15 }}
              />
              <circle cx={n.x} cy={n.y} r="2.5" fill={COLORS.cyan} opacity={0.5} />
            </>
          )}
        </g>
      ))}
      {/* Scan line */}
      <motion.line
        x1="0" y1="0" x2="450" y2="0"
        stroke={COLORS.cyan} strokeWidth="1.5"
        animate={{ y1: [0, 290, 0], y2: [0, 290, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
        style={{ filter: `drop-shadow(0 0 6px ${COLORS.cyanGlow})` }}
      />
    </svg>
  );
}

// ─── Images cybersécurité ───
const CYBER_IMG = {
  hero: 'https://images.unsplash.com/photo-1547190027-9156686aa2f0?q=80&w=1600&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  audit: 'https://images.unsplash.com/photo-1534137667199-675a46e143f3?w=600&q=80',
  pentest: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=80',
  soc: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=600&q=80',
  cloud: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80',
  compliance: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&q=80',
  incident: 'https://images.unsplash.com/photo-1614064548237-096f735f344f?w=600&q=80',
  training: 'https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?w=600&q=80',
  showcase1: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80',
  showcase2: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&q=80',
  showcase3: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
};

// ═══════════════════════════════════════════════════════════
//  PAGE CYBERSÉCURITÉ
// ═══════════════════════════════════════════════════════════
export default function Cybersecurite() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const imgY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.25]);

  const services: CyberService[] = [
    { icon: Radar, title: 'Audit & Diagnostic', desc: 'Cartographie des vulnérabilités, analyse des risques, scoring de maturité cyber.', img: CYBER_IMG.audit },
    { icon: Bug, title: 'Tests d\'intrusion (Pentest)', desc: 'Simulation d\'attaques réelles sur vos systèmes, web, mobile, réseau.', img: CYBER_IMG.pentest },
    { icon: Eye, title: 'SOC & Monitoring 24/7', desc: 'Surveillance continue, détection d\'intrusion, réponse aux incidents en temps réel.', img: CYBER_IMG.soc },
    { icon: Server, title: 'Sécurisation Cloud & Infrastructure', desc: 'Durcissement des serveurs, gestion des accès, chiffrement des données.', img: CYBER_IMG.cloud },
    { icon: FileCheck, title: 'Conformité & RGPD', desc: 'Mise en conformité réglementaire, politiques de sécurité, gouvernance des données.', img: CYBER_IMG.compliance },
    { icon: AlertTriangle, title: 'Réponse à Incident & Forensic', desc: 'Investigation post-attaque, containment, plan de reprise d\'activité.', img: CYBER_IMG.incident },
    { icon: Fingerprint, title: 'Formation & Sensibilisation', desc: 'Formation des équipes, simulations de phishing, culture cyber en interne.', img: CYBER_IMG.training },
  ];

  const certifications = [
    { name: 'ISO 27001', desc: 'Système de management de la sécurité de l\'information' },
    { name: 'RGPD', desc: 'Protection des données personnelles' },
    { name: 'OWASP Top 10', desc: 'Prévention des vulnérabilités web critiques' },
    { name: 'NIST Framework', desc: 'Framework de cybersécurité de référence' },
    { name: 'SOC 2', desc: 'Contrôles de sécurité organisationnels' },
    { name: 'PCI-DSS', desc: 'Sécurité des transactions de paiement' },
  ];

  return (
    <div style={{ background: COLORS.navyDeep }}>
      {/* ══ 1. HERO — "entrée dans le monde cyber" ══ */}
      <section ref={heroRef} style={{
        position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center',
        padding: '120px 2rem 4rem', overflow: 'hidden',
      }}>
        {/* Background image — immersive parallax */}
        <motion.div
          initial={{ scale: 1.15 }} animate={{ scale: 1.05 }}
          transition={{ duration: 12, ease: 'easeOut' }}
          style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden' }}
        >
          <motion.img
            src={CYBER_IMG.hero} alt=""
            style={{ width: '100%', height: '100%', objectFit: 'cover', willChange: 'transform', y: imgY, scale: imgScale }}
            initial={{ scale: 1.2 }}
            animate={{ scale: 1.08 }}
            transition={{ duration: 15, ease: 'easeOut' }}
          />
        </motion.div>
        {/* Immersive overlays — left-to-right darkening for text legibility */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 1,
          background: `linear-gradient(90deg, rgba(10,22,80,0.88) 0%, rgba(10,22,80,0.6) 35%, rgba(10,22,80,0.25) 70%, rgba(10,22,80,0.5) 100%)`,
        }} />
        <div style={{
          position: 'absolute', inset: 0, zIndex: 1,
          background: `linear-gradient(180deg, rgba(10,22,80,0.4) 0%, transparent 25%, transparent 65%, rgba(10,22,80,0.85) 100%)`,
        }} />
        {/* Vignette for depth */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 1,
          background: `radial-gradient(ellipse at center, transparent 30%, rgba(10,22,80,0.5) 100%)`,
        }} />
        <CyberGrid />
        <ScanLine delay={0} duration={6} />
        <ScanLine delay={3} duration={8} horizontal />

        {/* Pulsing data points */}
        <DataPoint x={15} y={20} delay={0} />
        <DataPoint x={75} y={30} delay={0.5} />
        <DataPoint x={40} y={60} delay={1} />
        <DataPoint x={85} y={70} delay={1.5} />
        <DataPoint x={25} y={80} delay={2} />
        <DataPoint x={60} y={15} delay={2.5} />

        {/* Aurora glow */}
        <motion.div
          animate={{ x: [0, 60, 0], y: [0, -30, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute', top: '10%', left: '10%', width: 450, height: 450,
            borderRadius: '50%', filter: 'blur(100px)',
            background: `radial-gradient(circle, rgba(91,200,242,0.15) 0%, transparent 70%)`,
            pointerEvents: 'none',
          }}
        />
        <motion.div
          animate={{ x: [0, -50, 0], y: [0, 40, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute', bottom: '10%', right: '5%', width: 400, height: 400,
            borderRadius: '50%', filter: 'blur(90px)',
            background: 'radial-gradient(circle, rgba(27,111,224,0.12) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        {/* Terminal log */}
        <TerminalLog />

        {/* Radar sweep */}
        <RadarSweep />

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
              Protégez ce qui{' '}
              <span style={{
                background: `linear-gradient(135deg, ${COLORS.cyan} 0%, ${COLORS.electricLt} 100%)`,
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                filter: `drop-shadow(0 0 20px ${COLORS.cyanGlow})`,
              }}>
                compte le plus
              </span>
            </h1>

            <p style={{
              fontFamily: FONTS.body, fontSize: 'clamp(1.05rem, 2vw, 1.3rem)', lineHeight: 1.6,
              color: 'rgba(255,255,255,0.7)', maxWidth: 560, marginBottom: '2.5rem',
            }}>
              Audit, pentest, monitoring 24/7 et réponse aux incidents. Nous sécurisons vos systèmes avec des méthodes éprouvées et certifiées ISO 27001.
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
                Démarrer un audit <ArrowRight size={18} />
              </Link>
              <Link to="/"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  color: COLORS.whiteSoft, border: '1px solid rgba(255,255,255,0.25)',
                  padding: '0.9rem 2.2rem', borderRadius: 12,
                  fontFamily: FONTS.display, fontWeight: 600, fontSize: '1.05rem',
                  textDecoration: 'none', transition: 'all 0.3s', backdropFilter: 'blur(10px)',
                  background: 'rgba(255,255,255,0.05)',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = COLORS.cyan; e.currentTarget.style.color = COLORS.cyan; e.currentTarget.style.background = 'rgba(91,200,242,0.1)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'; e.currentTarget.style.color = COLORS.whiteSoft; e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}>
                Retour à l'accueil
              </Link>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ position: 'absolute', bottom: 30, left: '50%', transform: 'translateX(-50%)', textAlign: 'center', zIndex: 3 }}
        >
          <ChevronDown size={28} color={COLORS.cyan} style={{ opacity: 0.4 }} />
        </motion.div>
      </section>

      {/* ══ 2. ENJEU — statistiques de menace ══ */}
      <section style={{
        padding: '5rem 2rem', position: 'relative', overflow: 'hidden',
        background: `linear-gradient(180deg, ${COLORS.navyDark} 0%, ${COLORS.navyDeep} 100%)`,
      }}>
        <CyberGrid />
        <ScanLine delay={1} duration={10} />

        <div style={{ maxWidth: 1000, margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7 }}
            style={{ textAlign: 'center', marginBottom: '4rem' }}
          >
            <span style={{ fontFamily: FONTS.mono, fontSize: '0.78rem', color: COLORS.cyan, letterSpacing: '0.2em', display: 'block', marginBottom: 12 }}>
              // L'ENJU CYBER
            </span>
            <h2 style={{ fontFamily: FONTS.display, fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 3rem)', color: COLORS.white, letterSpacing: '-0.02em' }}>
              La menace est réelle
            </h2>
            <p style={{ fontFamily: FONTS.body, fontSize: '1.05rem', color: 'rgba(255,255,255,0.55)', maxWidth: 500, margin: '1rem auto 0' }}>
              Chaque jour, des milliers d'attaques ciblent les entreprises africaines. La vigilance n'est plus une option.
            </p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem', alignItems: 'center', marginBottom: '4rem' }}>
            <CyberStat value={2400} suffix="+" label="Attaques bloquées / jour" delay={0} />
            <CyberStat value={60} suffix="%" label="PME touchées par une cyberattaque" delay={0.15} />
            <CyberStat value={0} suffix="" label="Breach sur nos clients" delay={0.3} />
            <CyberStat value={15} suffix="min" label="Temps de réponse moyen" delay={0.45} />
          </div>

          {/* Threat network visualization */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}
          >
            <div style={{ position: 'relative', maxWidth: 500, width: '100%' }}>
              <ThreatMap />
              <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginTop: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: COLORS.cyan, boxShadow: `0 0 8px ${COLORS.cyanGlow}` }} />
                  <span style={{ fontFamily: FONTS.mono, fontSize: '0.72rem', color: 'rgba(91,200,242,0.6)' }}>PROTÉGÉ</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: COLORS.electric, boxShadow: '0 0 8px rgba(27,111,224,0.5)' }} />
                  <span style={{ fontFamily: FONTS.mono, fontSize: '0.72rem', color: 'rgba(27,111,224,0.6)' }}>MENACE DÉTECTÉE</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══ 3. SERVICES — cards immersives ══ */}
      <section style={{
        padding: '6rem 2rem', position: 'relative', overflow: 'hidden',
        background: `linear-gradient(180deg, ${COLORS.navyDeep} 0%, ${COLORS.navyDark} 100%)`,
      }}>
        <CyberGrid />
        <motion.div
          animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          style={{ position: 'absolute', top: '15%', right: '5%', width: 400, height: 400, borderRadius: '50%', filter: 'blur(100px)', background: `radial-gradient(circle, ${COLORS.cyanGlow} 0%, transparent 70%)`, pointerEvents: 'none' }}
        />

        <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7 }}
            style={{ textAlign: 'center', marginBottom: '4rem' }}
          >
            <span style={{ fontFamily: FONTS.mono, fontSize: '0.78rem', color: COLORS.cyan, letterSpacing: '0.2em', display: 'block', marginBottom: 12 }}>
              // NOS MODULES SÉCURITÉ
            </span>
            <h2 style={{ fontFamily: FONTS.display, fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 3rem)', color: COLORS.white, letterSpacing: '-0.02em' }}>
              Sept couches de protection
            </h2>
            <p style={{ fontFamily: FONTS.body, fontSize: '1.05rem', color: 'rgba(255,255,255,0.55)', maxWidth: 500, margin: '1rem auto 0' }}>
              Du diagnostic à la formation, une approche complète pour sécuriser votre écosystème digital.
            </p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {services.map((svc, i) => (
              <CyberServiceCard key={i} svc={svc} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ══ 4. MÉTHODOLOGIE — timeline sur fond clair ══ */}
      <section style={{ padding: '7rem 2rem', background: 'linear-gradient(180deg, #E8F0FE 0%, #F0F5FF 100%)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7 }}
            style={{ textAlign: 'center', marginBottom: '4rem' }}
          >
            <span style={{ fontFamily: FONTS.mono, fontSize: '0.78rem', color: COLORS.electric, letterSpacing: '0.2em', display: 'block', marginBottom: 12 }}>
              // NOTRE MÉTHODE
            </span>
            <h2 style={{ fontFamily: FONTS.display, fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 3rem)', color: COLORS.navyDeep, letterSpacing: '-0.02em' }}>
              Comment on sécurise
            </h2>
            <p style={{ fontFamily: FONTS.body, fontSize: '1.05rem', color: 'rgba(10,22,80,0.55)', maxWidth: 500, margin: '1rem auto 0' }}>
              Une méthodologie rigoureuse en 5 étapes, de l'audit à l'amélioration continue.
            </p>
          </motion.div>
          <MethodTimeline />
        </div>
      </section>

      {/* ══ 4.5 SHOWCASE — visuels cyber ══ */}
      <section style={{
        padding: '6rem 2rem', position: 'relative', overflow: 'hidden',
        background: `linear-gradient(180deg, ${COLORS.navyDark} 0%, ${COLORS.navyDeep} 100%)`,
      }}>
        <CyberGrid />
        <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7 }}
            style={{ textAlign: 'center', marginBottom: '3.5rem' }}
          >
            <span style={{ fontFamily: FONTS.mono, fontSize: '0.78rem', color: COLORS.cyan, letterSpacing: '0.2em', display: 'block', marginBottom: 12 }}>
              // EN ACTION
            </span>
            <h2 style={{ fontFamily: FONTS.display, fontWeight: 800, fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', color: COLORS.white, letterSpacing: '-0.02em' }}>
              Notre expertise en images
            </h2>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {[
              { img: CYBER_IMG.showcase1, title: 'SOC & Monitoring', tag: 'Détection · SIEM · Temps réel' },
              { img: CYBER_IMG.showcase2, title: 'Audit & Pentest', tag: 'Code review · SAST · DAST' },
              { img: CYBER_IMG.showcase3, title: 'Infrastructure Sécurisée', tag: 'Chiffrement · Hardening · Cloud' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                style={{
                  position: 'relative', borderRadius: 18, overflow: 'hidden',
                  height: 300, cursor: 'pointer',
                  boxShadow: '0 8px 30px rgba(10,22,80,0.3)',
                  border: `1px solid rgba(91,200,242,0.15)`,
                }}
              >
                <img src={item.img} alt={item.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s' }}
                  className="cyber-showcase-img"
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 40%, rgba(10,22,80,0.85) 100%)' }} />
                <div style={{ position: 'absolute', bottom: 20, left: 20, right: 20 }}>
                  <span style={{ fontFamily: FONTS.mono, fontSize: '0.7rem', color: COLORS.cyan, letterSpacing: '0.1em' }}>
                    {item.tag}
                  </span>
                  <h3 style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: '1.15rem', color: '#fff', marginTop: 4 }}>
                    {item.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        <style>{`
          .cyber-showcase-img:hover { transform: scale(1.08) !important; }
        `}</style>
      </section>

      {/* ══ 5. CONFIANCE / CERTIFICATIONS ══ */}
      <section style={{
        padding: '6rem 2rem', position: 'relative', overflow: 'hidden',
        background: `linear-gradient(180deg, ${COLORS.navyDark} 0%, ${COLORS.navyDeep} 100%)`,
      }}>
        <CyberGrid />
        <div style={{ maxWidth: 1000, margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7 }}
            style={{ textAlign: 'center', marginBottom: '3.5rem' }}
          >
            <span style={{ fontFamily: FONTS.mono, fontSize: '0.78rem', color: COLORS.cyan, letterSpacing: '0.2em', display: 'block', marginBottom: 12 }}>
              // CERTIFICATIONS & NORMES
            </span>
            <h2 style={{ fontFamily: FONTS.display, fontWeight: 800, fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', color: COLORS.white, letterSpacing: '-0.02em' }}>
              Conformes aux standards internationaux
            </h2>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
            {certifications.map((cert, i) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                whileHover={{ y: -4 }}
                style={{
                  padding: '1.5rem', borderRadius: 14,
                  background: 'rgba(13,27,76,0.6)', border: `1px solid rgba(91,200,242,0.2)`,
                  backdropFilter: 'blur(10px)',
                  display: 'flex', flexDirection: 'column', gap: '0.5rem',
                  transition: 'all 0.3s ease',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: 10,
                    background: 'rgba(91,200,242,0.1)', border: `1px solid ${COLORS.cyan}30`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Shield size={18} color={COLORS.electric} />
                  </div>
                  <span style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: '1rem', color: COLORS.cyan, letterSpacing: '0.03em' }}>
                    {cert.name}
                  </span>
                </div>
                <p style={{ fontFamily: FONTS.body, fontSize: '0.82rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.5 }}>
                  {cert.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 6. CTA FINAL — bloc sombre signature ══ */}
      <section style={{
        padding: '6rem 2rem', position: 'relative', overflow: 'hidden',
        background: `linear-gradient(135deg, ${COLORS.navyDeep} 0%, ${COLORS.navyDark} 100%)`,
      }}>
        <CyberGrid />
        <ScanLine delay={0} duration={8} />

        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          style={{ position: 'absolute', top: '20%', left: '15%', width: 300, height: 300, borderRadius: '50%', filter: 'blur(80px)', background: `radial-gradient(circle, ${COLORS.cyanGlow} 0%, transparent 70%)`, pointerEvents: 'none' }}
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
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
            Ne laissez pas une faille décider de votre avenir
          </h2>
          <p style={{
            fontFamily: FONTS.body, fontSize: '1.1rem', color: 'rgba(255,255,255,0.6)',
            marginBottom: '2.5rem', maxWidth: 480, margin: '0 auto 2.5rem',
          }}>
            Discutons de votre sécurité. Notre équipe vous répond sous 24h.
          </p>
          <motion.div
            animate={{ boxShadow: [
              `0 10px 40px rgba(91,200,242,0.35)`,
              `0 10px 50px rgba(91,200,242,0.55)`,
              `0 10px 40px rgba(91,200,242,0.35)`,
            ] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            style={{ display: 'inline-block', borderRadius: 14 }}
          >
            <Link to="/contact"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                background: `linear-gradient(135deg, ${COLORS.electric}, ${COLORS.cyan})`,
                color: '#fff', padding: '1.1rem 2.8rem', borderRadius: 14,
                fontFamily: FONTS.display, fontWeight: 700, fontSize: '1.15rem',
                textDecoration: 'none', transition: 'all 0.3s',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}>
              Contactez-nous <ArrowRight size={22} />
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
