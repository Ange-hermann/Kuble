import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  BarChart3, Database, Brain, FileSpreadsheet, Activity, GitBranch,
  ArrowRight, ChevronDown, LineChart, PieChart, TrendingUp, Zap,
} from 'lucide-react';
import { COLORS, FONTS } from '../theme/colors';
import { useCountUp } from '../hooks/useCountUp';

// ─── Data constellation particles ───
function DataParticles() {
  const particles = Array.from({ length: 28 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 2,
    delay: Math.random() * 4,
    duration: Math.random() * 6 + 8,
  }));
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1 }}>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          animate={{
            opacity: [0.15, 0.6, 0.15],
            scale: [0.8, 1.4, 0.8],
            x: [0, Math.random() * 40 - 20, 0],
            y: [0, Math.random() * 40 - 20, 0],
          }}
          transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }}
          style={{
            position: 'absolute', left: `${p.x}%`, top: `${p.y}%`,
            width: p.size, height: p.size, borderRadius: '50%',
            background: p.id % 3 === 0 ? COLORS.electric : COLORS.cyan,
            boxShadow: `0 0 8px ${COLORS.cyanGlow}`,
          }}
        />
      ))}
      {/* Connection lines */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        {particles.slice(0, 14).map((p, i) => {
          const next = particles[(i + 1) % 14];
          return (
            <motion.line
              key={`line-${i}`}
              x1={`${p.x}%`} y1={`${p.y}%`}
              x2={`${next.x}%`} y2={`${next.y}%`}
              stroke={COLORS.cyan}
              strokeWidth={0.5}
              animate={{ opacity: [0.05, 0.15, 0.05] }}
              transition={{ duration: 5, repeat: Infinity, delay: i * 0.3 }}
            />
          );
        })}
      </svg>
    </div>
  );
}

// ─── Animated data curve (SVG path that draws itself) ───
function DataCurve({ delay = 0 }: { delay?: number }) {
  return (
    <svg
      style={{ position: 'absolute', bottom: '15%', left: 0, width: '100%', height: 200, pointerEvents: 'none', zIndex: 1 }}
      viewBox="0 0 1200 200"
      preserveAspectRatio="none"
    >
      <motion.path
        d="M0,150 C200,80 350,170 500,100 C650,30 800,120 950,60 C1050,30 1150,80 1200,50"
        fill="none"
        stroke={COLORS.electric}
        strokeWidth={2}
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 0.4 }}
        viewport={{ once: true }}
        transition={{ duration: 3, delay, ease: 'easeInOut' }}
      />
      <motion.path
        d="M0,180 C150,120 300,160 450,110 C600,60 750,140 900,90 C1000,60 1100,110 1200,80"
        fill="none"
        stroke={COLORS.cyan}
        strokeWidth={1.5}
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 0.3 }}
        viewport={{ once: true }}
        transition={{ duration: 4, delay: delay + 0.5, ease: 'easeInOut' }}
      />
    </svg>
  );
}

// ─── Floating KPI card ───
function FloatingKPI({ value, label, x, y, delay }: { value: string; label: string; x: number; y: number; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'absolute', left: `${x}%`, top: `${y}%`,
        background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(12px)',
        border: `1px solid ${COLORS.electric}30`, borderRadius: 12,
        padding: '0.75rem 1.25rem', pointerEvents: 'none', zIndex: 2,
        boxShadow: `0 8px 24px rgba(27,111,224,0.12)`,
      }}
    >
      <div style={{ fontFamily: FONTS.mono, fontWeight: 700, fontSize: '1.4rem', color: COLORS.electric, lineHeight: 1 }}>
        {value}
      </div>
      <div style={{ fontFamily: FONTS.body, fontSize: '0.72rem', color: 'rgba(10,22,80,0.6)', marginTop: 4 }}>
        {label}
      </div>
    </motion.div>
  );
}

// ─── Data service card with mini visualization ───
type DataService = { icon: typeof BarChart3; title: string; desc: string; viz: 'bars' | 'curve' | 'pie' | 'pulse' | 'flow' | 'grid' | 'brain' };
function DataServiceCard({ svc, index }: { svc: DataService; index: number }) {
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
        position: 'relative', background: 'rgba(255,255,255,0.9)',
        border: `1px solid ${hovered ? COLORS.electric + '60' : 'rgba(27,111,224,0.12)'}`,
        borderRadius: 16, cursor: 'pointer',
        transition: 'all 0.3s ease',
        overflow: 'hidden',
        boxShadow: hovered ? `0 12px 40px rgba(27,111,224,0.15), 0 0 24px ${COLORS.cyanGlow}` : '0 4px 12px rgba(10,22,80,0.06)',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
      }}
    >
      {/* Mini visualization area */}
      <div style={{ position: 'relative', height: 120, background: `linear-gradient(135deg, ${COLORS.bgPale} 0%, rgba(232,240,254,0.5) 100%)`, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <MiniViz type={svc.viz} active={hovered} />
        {/* Icon badge */}
        <div style={{
          position: 'absolute', top: 10, left: 10,
          width: 36, height: 36, borderRadius: 10,
          background: `linear-gradient(135deg, ${COLORS.electric}20, ${COLORS.cyan}20)`,
          border: `1px solid ${COLORS.electric}30`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Icon size={18} color={COLORS.electric} />
        </div>
      </div>

      {/* Glow line on hover */}
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

      <div style={{ padding: '1.5rem' }}>
        <h3 style={{
          fontFamily: FONTS.display, fontWeight: 700, fontSize: '1.05rem',
          color: COLORS.navyDeep, marginBottom: '0.5rem',
        }}>
          {svc.title}
        </h3>
        <p style={{
          fontFamily: FONTS.body, fontSize: '0.85rem', lineHeight: 1.6,
          color: 'rgba(10,22,80,0.6)',
        }}>
          {svc.desc}
        </p>
      </div>
    </motion.div>
  );
}

// ─── Mini visualizations for service cards ───
function MiniViz({ type, active }: { type: DataService['viz']; active: boolean }) {
  if (type === 'bars') {
    return (
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 70 }}>
        {[40, 65, 35, 80, 55, 90, 70].map((h, i) => (
          <motion.div
            key={i}
            animate={active ? { height: [h * 0.5, h, h * 0.7] } : { height: h * 0.6 }}
            transition={{ duration: 1.5, repeat: active ? Infinity : 0, delay: i * 0.1 }}
            style={{
              width: 12, borderRadius: 4,
              background: `linear-gradient(180deg, ${COLORS.cyan}, ${COLORS.electric})`,
              opacity: active ? 1 : 0.5,
            }}
          />
        ))}
      </div>
    );
  }
  if (type === 'curve') {
    return (
      <svg width={140} height={70} viewBox="0 0 140 70">
        <motion.path
          d="M0,60 C30,20 50,50 70,25 C90,5 110,40 140,15"
          fill="none" stroke={COLORS.electric} strokeWidth={2.5}
          initial={{ pathLength: active ? 0 : 1 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
        />
        <motion.circle cx={70} cy={25} r={4} fill={COLORS.cyan}
          animate={active ? { scale: [1, 1.5, 1], opacity: [1, 0.5, 1] } : {}}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </svg>
    );
  }
  if (type === 'pie') {
    return (
      <svg width={70} height={70} viewBox="0 0 70 70">
        <circle cx={35} cy={35} r={28} fill="none" stroke={COLORS.bgPale} strokeWidth={8} />
        <motion.circle
          cx={35} cy={35} r={28} fill="none" stroke={COLORS.electric} strokeWidth={8}
          strokeDasharray={176} strokeLinecap="round"
          initial={{ strokeDashoffset: 176 }}
          animate={{ strokeDashoffset: active ? 44 : 88 }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
          transform="rotate(-90 35 35)"
        />
        <motion.circle
          cx={35} cy={35} r={28} fill="none" stroke={COLORS.cyan} strokeWidth={8}
          strokeDasharray={176} strokeLinecap="round"
          initial={{ strokeDashoffset: 176 }}
          animate={{ strokeDashoffset: active ? 100 : 132 }}
          transition={{ duration: 1.5, delay: 0.3, ease: 'easeInOut' }}
          transform="rotate(-90 35 35)"
        />
      </svg>
    );
  }
  if (type === 'pulse') {
    return (
      <svg width={140} height={60} viewBox="0 0 140 60">
        <motion.path
          d="M0,30 L30,30 L40,10 L50,50 L60,30 L90,30 L100,15 L110,45 L120,30 L140,30"
          fill="none" stroke={COLORS.cyan} strokeWidth={2}
          animate={active ? { pathLength: [0, 1] } : {}}
          transition={{ duration: 2, repeat: active ? Infinity : 0, ease: 'linear' }}
        />
      </svg>
    );
  }
  if (type === 'flow') {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            animate={active ? { opacity: [0.3, 1, 0.3], x: [0, 8, 0] } : { opacity: 0.4 }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
            style={{
              width: 16, height: 16, borderRadius: 4,
              background: i < 3 ? COLORS.electric : COLORS.cyan,
              boxShadow: active ? `0 0 8px ${COLORS.cyanGlow}` : 'none',
            }}
          />
        ))}
      </div>
    );
  }
  if (type === 'grid') {
    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 4, width: 80 }}>
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            animate={active ? { opacity: [0.2, 0.8, 0.2] } : { opacity: 0.3 }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
            style={{
              width: 12, height: 12, borderRadius: 2,
              background: Math.random() > 0.5 ? COLORS.electric : COLORS.cyan,
            }}
          />
        ))}
      </div>
    );
  }
  // brain
  return (
    <motion.div
      animate={active ? { scale: [1, 1.1, 1] } : {}}
      transition={{ duration: 2, repeat: Infinity }}
      style={{ position: 'relative' }}
    >
      <Brain size={48} color={COLORS.electric} strokeWidth={1.5} />
      <motion.div
        animate={active ? { opacity: [0.3, 0.8, 0.3] } : { opacity: 0.4 }}
        transition={{ duration: 1.5, repeat: Infinity }}
        style={{
          position: 'absolute', inset: -8, borderRadius: '50%',
          border: `1px solid ${COLORS.cyan}40`,
        }}
      />
    </motion.div>
  );
}

// ─── Animated stat ───
function DataStat({ value, suffix, label, delay }: { value: number; suffix: string; label: string; delay: number }) {
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
        color: COLORS.electric, lineHeight: 1,
        textShadow: `0 0 24px rgba(27,111,224,0.25)`,
      }}>
        {count}{suffix}
      </div>
      <div style={{
        fontFamily: FONTS.body, fontSize: '0.85rem',
        color: 'rgba(10,22,80,0.6)', marginTop: '0.5rem',
      }}>
        {label}
      </div>
    </motion.div>
  );
}

// ─── Dashboard mockup component ───
function DashboardMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60, rotateX: 10 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'relative', borderRadius: 20, overflow: 'hidden',
        background: 'rgba(10,22,80,0.85)', backdropFilter: 'blur(20px)',
        border: `1px solid ${COLORS.electric}30`,
        boxShadow: `0 30px 80px rgba(10,22,80,0.4), 0 0 60px rgba(27,111,224,0.15)`,
      }}
    >
      {/* Dashboard header */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '0.5rem',
        padding: '0.75rem 1.5rem',
        borderBottom: `1px solid ${COLORS.electric}20`,
        background: 'rgba(6,13,46,0.6)',
      }}>
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#FF5F57' }} />
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#FEBC2E' }} />
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#28C840' }} />
        <span style={{ fontFamily: FONTS.mono, fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)', marginLeft: '0.5rem' }}>
          kuble-analytics — live dashboard
        </span>
      </div>

      {/* Dashboard content */}
      <div style={{ padding: '1.5rem', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
        {/* KPI cards row */}
        {[
          { label: 'Revenue', value: '€2.4M', change: '+18%', icon: TrendingUp },
          { label: 'Active Users', value: '48.2K', change: '+12%', icon: Activity },
          { label: 'Conversion', value: '6.8%', change: '+2.1%', icon: Zap },
          { label: 'Data Points', value: '1.2B', change: '+340M', icon: Database },
        ].map((kpi, i) => {
          const KIcon = kpi.icon;
          return (
            <motion.div
              key={kpi.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
              style={{
                background: 'rgba(27,111,224,0.08)', borderRadius: 12,
                border: `1px solid ${COLORS.electric}20`, padding: '1rem',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span style={{ fontFamily: FONTS.body, fontSize: '0.7rem', color: 'rgba(255,255,255,0.5)' }}>{kpi.label}</span>
                <KIcon size={14} color={COLORS.cyan} />
              </div>
              <div style={{ fontFamily: FONTS.mono, fontWeight: 700, fontSize: '1.5rem', color: COLORS.white, lineHeight: 1 }}>
                {kpi.value}
              </div>
              <div style={{ fontFamily: FONTS.mono, fontSize: '0.7rem', color: '#28C840', marginTop: 4 }}>
                {kpi.change}
              </div>
            </motion.div>
          );
        })}

        {/* Main chart — animated bars */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          style={{ gridColumn: 'span 2', background: 'rgba(27,111,224,0.06)', borderRadius: 12, border: `1px solid ${COLORS.electric}20`, padding: '1.25rem' }}
        >
          <div style={{ fontFamily: FONTS.display, fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)', marginBottom: '1rem' }}>
            Revenue by Quarter
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 140 }}>
            {[45, 62, 38, 78, 55, 88, 72, 95].map((h, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                whileInView={{ height: `${h}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.6 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  flex: 1, borderRadius: '4px 4px 0 0',
                  background: `linear-gradient(180deg, ${COLORS.cyan}, ${COLORS.electric})`,
                  boxShadow: `0 0 12px ${COLORS.cyanGlow}`,
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Pie / donut chart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          style={{ background: 'rgba(27,111,224,0.06)', borderRadius: 12, border: `1px solid ${COLORS.electric}20`, padding: '1.25rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        >
          <div style={{ fontFamily: FONTS.display, fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)', marginBottom: '0.75rem', alignSelf: 'flex-start' }}>
            Traffic Sources
          </div>
          <svg width={100} height={100} viewBox="0 0 100 100">
            <circle cx={50} cy={50} r={36} fill="none" stroke="rgba(27,111,224,0.15)" strokeWidth={10} />
            <motion.circle cx={50} cy={50} r={36} fill="none" stroke={COLORS.electric} strokeWidth={10}
              strokeDasharray={226} strokeLinecap="round"
              initial={{ strokeDashoffset: 226 }}
              whileInView={{ strokeDashoffset: 68 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.8, ease: 'easeInOut' }}
              transform="rotate(-90 50 50)"
            />
            <motion.circle cx={50} cy={50} r={36} fill="none" stroke={COLORS.cyan} strokeWidth={10}
              strokeDasharray={226} strokeLinecap="round"
              initial={{ strokeDashoffset: 226 }}
              whileInView={{ strokeDashoffset: 158 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 1, ease: 'easeInOut' }}
              transform="rotate(70 50 50)"
            />
          </svg>
        </motion.div>

        {/* Heatmap */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.7 }}
          style={{ background: 'rgba(27,111,224,0.06)', borderRadius: 12, border: `1px solid ${COLORS.electric}20`, padding: '1.25rem' }}
        >
          <div style={{ fontFamily: FONTS.display, fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)', marginBottom: '0.75rem' }}>
            Activity Heatmap
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 3 }}>
            {Array.from({ length: 35 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.8 + i * 0.02 }}
                style={{
                  width: '100%', aspectRatio: '1', borderRadius: 3,
                  background: Math.random() > 0.6
                    ? COLORS.electric
                    : Math.random() > 0.3
                      ? `${COLORS.electric}60`
                      : `${COLORS.electric}20`,
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Line chart — animated curve */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          style={{ gridColumn: 'span 4', background: 'rgba(27,111,224,0.06)', borderRadius: 12, border: `1px solid ${COLORS.electric}20`, padding: '1.25rem' }}
        >
          <div style={{ fontFamily: FONTS.display, fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)', marginBottom: '0.75rem' }}>
            Real-time Data Flow
          </div>
          <svg width="100%" height={80} viewBox="0 0 800 80" preserveAspectRatio="none">
            <motion.path
              d="M0,60 C80,30 120,50 200,20 C280,-10 320,55 400,30 C480,5 540,45 600,25 C680,10 740,40 800,15"
              fill="none" stroke={COLORS.cyan} strokeWidth={2}
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2.5, delay: 1, ease: 'easeInOut' }}
            />
            <motion.path
              d="M0,70 C80,55 140,65 200,45 C280,25 320,60 400,50 C480,40 540,55 600,45 C680,35 740,55 800,40"
              fill="none" stroke={COLORS.electric} strokeWidth={1.5}
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 3, delay: 1.2, ease: 'easeInOut' }}
            />
          </svg>
        </motion.div>
      </div>
    </motion.div>
  );
}

// ─── Raw → Organized data morphing ───
function DataMorph() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '3rem', flexWrap: 'wrap', justifyContent: 'center' }}>
      {/* Raw data — scattered points */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        style={{ position: 'relative', width: 220, height: 220 }}
      >
        <div style={{ textAlign: 'center', marginBottom: '0.5rem', fontFamily: FONTS.body, fontSize: '0.85rem', color: 'rgba(10,22,80,0.5)' }}>
          Données brutes
        </div>
        <div style={{ position: 'relative', width: 220, height: 200, borderRadius: 12, background: 'rgba(232,240,254,0.5)', border: '1px solid rgba(27,111,224,0.1)' }}>
          {Array.from({ length: 30 }).map((_, i) => (
            <motion.div
              key={i}
              animate={{ x: [0, Math.random() * 20 - 10, 0], y: [0, Math.random() * 20 - 10, 0] }}
              transition={{ duration: Math.random() * 3 + 2, repeat: Infinity, delay: i * 0.05 }}
              style={{
                position: 'absolute',
                left: `${Math.random() * 90}%`, top: `${Math.random() * 90}%`,
                width: 6, height: 6, borderRadius: '50%',
                background: 'rgba(10,22,80,0.2)',
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Arrow */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <ArrowRight size={32} color={COLORS.electric} />
      </motion.div>

      {/* Organized data — chart */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        style={{ position: 'relative', width: 220, height: 220 }}
      >
        <div style={{ textAlign: 'center', marginBottom: '0.5rem', fontFamily: FONTS.body, fontSize: '0.85rem', color: COLORS.electric, fontWeight: 600 }}>
          Données exploitables
        </div>
        <div style={{ position: 'relative', width: 220, height: 200, borderRadius: 12, background: 'rgba(255,255,255,0.8)', border: `1px solid ${COLORS.electric}20`, padding: '1rem', display: 'flex', alignItems: 'flex-end', gap: 6 }}>
          {[30, 55, 40, 75, 50, 85, 65, 95].map((h, i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              whileInView={{ height: `${h}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              style={{
                flex: 1, borderRadius: '4px 4px 0 0',
                background: `linear-gradient(180deg, ${COLORS.cyan}, ${COLORS.electric})`,
                boxShadow: `0 0 8px ${COLORS.cyanGlow}`,
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
//  PAGE DATA ANALYTIQUE
// ═══════════════════════════════════════════════════════════
export default function DataAnalytique() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const services: DataService[] = [
    { icon: BarChart3, title: 'Business Intelligence & Dashboards', desc: 'Tableaux de bord sur mesure, visualisation de données en temps réel, KPIs pilotables.', viz: 'bars' },
    { icon: GitBranch, title: 'Data Engineering & Pipelines', desc: 'Collecte, nettoyage, structuration et automatisation des flux de données.', viz: 'flow' },
    { icon: Database, title: 'Data Warehousing', desc: 'Centralisation des données dans un entrepôt unique, fiable et scalable.', viz: 'grid' },
    { icon: Brain, title: 'Analyse Prédictive & Machine Learning', desc: 'Modèles prédictifs, détection de tendances, aide à la décision.', viz: 'brain' },
    { icon: FileSpreadsheet, title: 'Reporting & Automatisation', desc: 'Rapports automatisés, alertes intelligentes, gain de temps sur le suivi.', viz: 'pulse' },
    { icon: PieChart, title: 'Data Visualisation', desc: 'Graphiques interactifs, storytelling par la donnée, dashboards accessibles.', viz: 'pie' },
    { icon: LineChart, title: 'Conseil & Stratégie Data', desc: 'Audit de la maturité data, définition d\'une stratégie de valorisation.', viz: 'curve' },
  ];

  const steps = [
    { num: '01', title: 'Collecte', desc: 'Inventaire des sources, ingestion multi-systèmes, capture en temps réel.' },
    { num: '02', title: 'Structuration', desc: 'Nettoyage, modélisation, stockage dans le data warehouse.' },
    { num: '03', title: 'Analyse', desc: 'Exploration, statistiques, modèles prédictifs, segmentation.' },
    { num: '04', title: 'Visualisation', desc: 'Dashboards interactifs, KPIs métier, accès self-service.' },
    { num: '05', title: 'Décision', desc: 'Alertes intelligentes, recommandations, automatisation des actions.' },
  ];

  const stack = ['Power BI', 'Tableau', 'Python', 'SQL', 'Snowflake', 'BigQuery', 'Apache Spark', 'Airflow', 'dbt', 'Kafka', 'PostgreSQL', 'Metabase'];

  return (
    <div style={{ background: COLORS.bgLight }}>
      {/* ══ 1. HERO — "entrée dans le flux de données" ══ */}
      <section ref={heroRef} style={{
        position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center',
        padding: '120px 2rem 4rem', overflow: 'hidden',
        background: `linear-gradient(180deg, ${COLORS.bgPale} 0%, #F5F9FF 50%, #FFFFFF 100%)`,
      }}>
        {/* Animated particles */}
        <DataParticles />
        {/* Animated data curve */}
        <DataCurve delay={0.5} />

        {/* Aurora glow */}
        <motion.div
          animate={{ x: [0, 60, 0], y: [0, -30, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute', top: '10%', left: '5%', width: 450, height: 450,
            borderRadius: '50%', filter: 'blur(100px)',
            background: `radial-gradient(circle, ${COLORS.cyanGlow} 0%, transparent 70%)`,
            pointerEvents: 'none', zIndex: 0,
          }}
        />
        <motion.div
          animate={{ x: [0, -50, 0], y: [0, 40, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute', bottom: '5%', right: '5%', width: 400, height: 400,
            borderRadius: '50%', filter: 'blur(90px)',
            background: 'radial-gradient(circle, rgba(27,111,224,0.12) 0%, transparent 70%)',
            pointerEvents: 'none', zIndex: 0,
          }}
        />

        {/* Floating KPIs */}
        <FloatingKPI value="+40%" label="Gain de temps" x={72} y={22} delay={1} />
        <FloatingKPI value="2.5B" label="Data points/jour" x={80} y={55} delay={1.5} />
        <FloatingKPI value="99.9%" label="Data accuracy" x={12} y={65} delay={2} />

        <motion.div style={{ y: heroY, opacity: heroOpacity, maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 3, width: '100%' }}>
          <motion.div
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            style={{ maxWidth: 720 }}
          >
            <h1 style={{
              fontFamily: FONTS.display, fontWeight: 800,
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', lineHeight: 1.02,
              color: COLORS.navyDeep, marginBottom: '1.5rem', letterSpacing: '-0.02em',
            }}>
              Transformez vos{' '}
              <span style={{
                background: `linear-gradient(135deg, ${COLORS.electric} 0%, ${COLORS.cyan} 100%)`,
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                filter: `drop-shadow(0 0 20px ${COLORS.cyanGlow})`,
              }}>
                données
              </span>
              {' '}en décisions
            </h1>

            <p style={{
              fontFamily: FONTS.body, fontSize: 'clamp(1.05rem, 2vw, 1.3rem)', lineHeight: 1.6,
              color: 'rgba(10,22,80,0.6)', maxWidth: 560, marginBottom: '2.5rem',
            }}>
              Pipelines, data warehouses, dashboards et modèles prédictifs. Nous transformons vos données brutes en insights actionnables, en temps réel.
            </p>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link to="/contact"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  background: `linear-gradient(135deg, ${COLORS.electric}, ${COLORS.cyan})`,
                  color: '#fff', padding: '0.9rem 2.2rem', borderRadius: 12,
                  fontFamily: FONTS.display, fontWeight: 700, fontSize: '1.05rem',
                  textDecoration: 'none', boxShadow: `0 8px 30px rgba(27,111,224,0.35)`,
                  transition: 'all 0.3s',
                }}
              >
                Démarrer un projet <ArrowRight size={18} />
              </Link>
              <Link to="/contact"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  background: 'transparent', color: COLORS.navyDeep,
                  padding: '0.9rem 2.2rem', borderRadius: 12,
                  fontFamily: FONTS.display, fontWeight: 700, fontSize: '1.05rem',
                  textDecoration: 'none', border: `1px solid ${COLORS.electric}40`,
                  transition: 'all 0.3s',
                }}
              >
                Voir nos réalisations
              </Link>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', zIndex: 3 }}
        >
          <ChevronDown size={24} color={COLORS.electric} />
        </motion.div>
      </section>

      {/* ══ 2. Section "le problème / la valeur" — données brutes → exploitables ══ */}
      <section style={{
        padding: '6rem 2rem',
        background: `linear-gradient(180deg, #FFFFFF 0%, ${COLORS.bgPale} 100%)`,
      }}>
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
              De la donnée brute à{' '}
              <span style={{ color: COLORS.electric }}>l'insight</span>
            </h2>
            <p style={{
              fontFamily: FONTS.body, fontSize: '1.1rem', color: 'rgba(10,22,80,0.6)',
              maxWidth: 600, margin: '0 auto',
            }}>
              Vos données sont partout. Nous les collectons, les structurons et les transformons en visualisations claires pour des décisions rapides et fiables.
            </p>
          </motion.div>

          <DataMorph />

          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '2rem', marginTop: '5rem' }}>
            <DataStat value={40} suffix="%" label="Gain de temps sur le reporting" delay={0} />
            <DataStat value={2} suffix="B+" label="Data points traités / jour" delay={0.15} />
            <DataStat value={99} suffix=".9%" label="Précision des données" delay={0.3} />
            <DataStat value={250} suffix="+" label="Dashboards déployés" delay={0.45} />
          </div>
        </div>
      </section>

      {/* ══ 3. Grille des services (cards immersives) ══ */}
      <section style={{
        padding: '6rem 2rem',
        background: `linear-gradient(180deg, ${COLORS.bgPale} 0%, #FFFFFF 50%, ${COLORS.bgPale} 100%)`,
      }}>
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
              <span style={{ color: COLORS.electric }}>Data</span>
            </h2>
            <p style={{
              fontFamily: FONTS.body, fontSize: '1.1rem', color: 'rgba(10,22,80,0.6)',
              maxWidth: 600, margin: '0 auto',
            }}>
              De la collecte à la décision, nous couvrons toute la chaîne de valeur de la donnée.
            </p>
          </motion.div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(280px, 100%), 1fr))',
            gap: '1.5rem',
          }}>
            {services.map((svc, i) => (
              <DataServiceCard key={svc.title} svc={svc} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ══ 4. Section "dashboard showcase" (moment wahou) ══ */}
      <section style={{
        padding: '6rem 2rem',
        background: `linear-gradient(180deg, ${COLORS.navyDeep} 0%, ${COLORS.navyDark} 100%)`,
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Subtle data grid */}
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.05, pointerEvents: 'none',
          backgroundImage: `linear-gradient(${COLORS.cyan} 1px, transparent 1px), linear-gradient(90deg, ${COLORS.cyan} 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }} />
        {/* Aurora glow */}
        <motion.div
          animate={{ x: [0, 40, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute', top: '20%', left: '10%', width: 400, height: 400,
            borderRadius: '50%', filter: 'blur(100px)',
            background: `radial-gradient(circle, ${COLORS.cyanGlow} 0%, transparent 70%)`,
            pointerEvents: 'none',
          }}
        />

        <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 2 }}>
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
              Vos données,{' '}
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
              Des dashboards vivants qui s'animent et vous donnent une vision claire de votre activité, à chaque instant.
            </p>
          </motion.div>

          <DashboardMockup />
        </div>
      </section>

      {/* ══ 5. Section méthodologie ══ */}
      <section style={{
        padding: '6rem 2rem',
        background: `linear-gradient(180deg, ${COLORS.bgPale} 0%, #FFFFFF 100%)`,
      }}>
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
              Un processus structuré pour transformer vos données en décisions actionnables.
            </p>
          </motion.div>

          {/* Timeline */}
          <div style={{ position: 'relative' }}>
            {/* Connecting line */}
            <svg style={{ position: 'absolute', left: '50%', top: 0, width: 2, height: '100%', transform: 'translateX(-50%)' }}>
              <motion.line
                x1={1} y1={0} x2={1} y2="100%"
                stroke={COLORS.electric}
                strokeWidth={2}
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2, ease: 'easeInOut' }}
              />
            </svg>

            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                style={{
                  display: 'flex', alignItems: 'center',
                  justifyContent: i % 2 === 0 ? 'flex-end' : 'flex-start',
                  marginBottom: '2.5rem', position: 'relative',
                }}
              >
                <div style={{
                  width: '45%', textAlign: i % 2 === 0 ? 'right' : 'left',
                  padding: i % 2 === 0 ? '0 2rem 0 0' : '0 0 0 2rem',
                }}>
                  <div style={{
                    fontFamily: FONTS.mono, fontWeight: 700, fontSize: '0.8rem',
                    color: COLORS.electric, marginBottom: '0.25rem',
                  }}>
                    {step.num}
                  </div>
                  <h3 style={{
                    fontFamily: FONTS.display, fontWeight: 700, fontSize: '1.2rem',
                    color: COLORS.navyDeep, marginBottom: '0.5rem',
                  }}>
                    {step.title}
                  </h3>
                  <p style={{
                    fontFamily: FONTS.body, fontSize: '0.9rem', lineHeight: 1.6,
                    color: 'rgba(10,22,80,0.6)',
                  }}>
                    {step.desc}
                  </p>
                </div>
                {/* Dot on line */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 + 0.3 }}
                  style={{
                    position: 'absolute', left: '50%', top: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 16, height: 16, borderRadius: '50%',
                    background: COLORS.electric,
                    boxShadow: `0 0 16px ${COLORS.cyanGlow}`,
                    border: `3px solid ${COLORS.bgPale}`,
                  }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 6. Section outils / stack data ══ */}
      <section style={{
        padding: '5rem 2rem',
        background: `linear-gradient(180deg, #FFFFFF 0%, ${COLORS.bgPale} 100%)`,
      }}>
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
              Notre stack Data
            </h2>
            <p style={{
              fontFamily: FONTS.body, fontSize: '1rem', color: 'rgba(10,22,80,0.6)',
            }}>
              Les meilleurs outils pour des données performantes.
            </p>
          </motion.div>

          <div style={{
            display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center',
          }}>
            {stack.map((tech, i) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                whileHover={{ y: -4, scale: 1.05 }}
                style={{
                  padding: '0.75rem 1.5rem', borderRadius: 12,
                  background: 'rgba(255,255,255,0.9)',
                  border: `1px solid ${COLORS.electric}20`,
                  fontFamily: FONTS.display, fontWeight: 600, fontSize: '0.95rem',
                  color: COLORS.navyDeep,
                  boxShadow: '0 4px 12px rgba(10,22,80,0.06)',
                  transition: 'all 0.3s ease',
                }}
              >
                {tech}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 7. Bandeau CTA final ══ */}
      <section style={{
        padding: '6rem 2rem',
        background: COLORS.navyDeep,
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Subtle data points */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
          {Array.from({ length: 15 }).map((_, i) => (
            <motion.div
              key={i}
              animate={{ opacity: [0.1, 0.4, 0.1], scale: [0.8, 1.2, 0.8] }}
              transition={{ duration: Math.random() * 4 + 3, repeat: Infinity, delay: i * 0.2 }}
              style={{
                position: 'absolute',
                left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`,
                width: 4, height: 4, borderRadius: '50%',
                background: COLORS.cyan,
                boxShadow: `0 0 8px ${COLORS.cyanGlow}`,
              }}
            />
          ))}
        </div>
        {/* Data curve */}
        <svg style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: 100, pointerEvents: 'none', zIndex: 0 }} viewBox="0 0 1200 100" preserveAspectRatio="none">
          <motion.path
            d="M0,80 C200,40 400,60 600,30 C800,10 1000,50 1200,20"
            fill="none" stroke={COLORS.cyan} strokeWidth={1}
            animate={{ opacity: [0.1, 0.25, 0.1] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
        </svg>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 2 }}
        >
          <h2 style={{
            fontFamily: FONTS.display, fontWeight: 800,
            fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: COLORS.white,
            marginBottom: '1.5rem', lineHeight: 1.1,
          }}>
            Vos données ont des choses à dire.{' '}
            <span style={{
              background: `linear-gradient(135deg, ${COLORS.cyan} 0%, ${COLORS.electricLt} 100%)`,
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>
              Écoutons-les ensemble.
            </span>
          </h2>
          <p style={{
            fontFamily: FONTS.body, fontSize: '1.15rem', color: 'rgba(255,255,255,0.6)',
            marginBottom: '2.5rem', maxWidth: 560, margin: '0 auto 2.5rem',
          }}>
            Construisons ensemble votre stratégie data. Du premier pipeline au dashboard final.
          </p>
          <motion.div
            animate={{ boxShadow: [`0 8px 30px rgba(27,111,224,0.3)`, `0 8px 40px rgba(91,200,242,0.5)`, `0 8px 30px rgba(27,111,224,0.3)`] }}
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
              Démarrer un projet data <ArrowRight size={18} />
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
