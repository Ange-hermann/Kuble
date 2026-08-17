import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  MessageSquare, Brain, Workflow, Eye, Sparkles, Bot,
  ArrowRight, ChevronDown, TrendingUp,
} from 'lucide-react';
import { COLORS, FONTS } from '../theme/colors';
import { useCountUp } from '../hooks/useCountUp';

// ─── Images Unsplash ───
const IA_IMG = {
  hero: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1600&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  chatbot: 'https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?w=600&q=80',
  ml: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=600&q=80&auto=format&fit=crop',
  automation: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=600&q=80&auto=format&fit=crop',
  vision: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&q=80&auto=format&fit=crop',
  recommendation: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80&auto=format&fit=crop',
  agents: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&q=80&auto=format&fit=crop',
  llm: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80',
};

// ─── Neural network background ───
function NeuralNetwork() {
  const nodes = Array.from({ length: 22 }, (_, i) => ({
    id: i,
    x: 5 + Math.random() * 90,
    y: 5 + Math.random() * 90,
    delay: Math.random() * 3,
  }));
  const connections: { a: number; b: number }[] = [];
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[i].x - nodes[j].x;
      const dy = nodes[i].y - nodes[j].y;
      if (Math.sqrt(dx * dx + dy * dy) < 25) connections.push({ a: i, b: j });
    }
  }
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1 }}>
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        {connections.map((c, i) => (
          <g key={`conn-${i}`}>
            <line
              x1={`${nodes[c.a].x}%`} y1={`${nodes[c.a].y}%`}
              x2={`${nodes[c.b].x}%`} y2={`${nodes[c.b].y}%`}
              stroke={COLORS.electric}
              strokeWidth={0.5}
              opacity={0.12}
            />
            <motion.circle
              r={2.5}
              fill={COLORS.cyan}
              animate={{
                cx: [`${nodes[c.a].x}%`, `${nodes[c.b].x}%`],
                cy: [`${nodes[c.a].y}%`, `${nodes[c.b].y}%`],
                opacity: [0, 0.8, 0],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: 'easeInOut',
              }}
            />
          </g>
        ))}
      </svg>
      {nodes.map((n) => (
        <motion.div
          key={n.id}
          animate={{ opacity: [0.2, 0.6, 0.2], scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: 3, repeat: Infinity, delay: n.delay, ease: 'easeInOut' }}
          style={{
            position: 'absolute', left: `${n.x}%`, top: `${n.y}%`,
            width: 6, height: 6, borderRadius: '50%',
            background: n.id % 3 === 0 ? COLORS.electric : COLORS.cyan,
            boxShadow: `0 0 10px ${COLORS.cyanGlow}`,
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

// ─── Glassmorphism stat card ───
function GlassStat({ value, suffix, label, delay }: { value: number; suffix: string; label: string; delay: number }) {
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
        fontFamily: FONTS.display, fontWeight: 800,
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

// ─── AI service card ───
type IAService = { icon: typeof Brain; title: string; desc: string; img: string };
function IAServiceCard({ svc, index }: { svc: IAService; index: number }) {
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
      {/* Service image */}
      <div style={{ position: 'relative', height: 160, overflow: 'hidden' }}>
        <img
          src={svc.img} alt={svc.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease', transform: hovered ? 'scale(1.08)' : 'scale(1)' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(244,248,255,0.3) 0%, rgba(255,255,255,0.85) 100%)' }} />
        {/* Icon badge on image */}
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
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', opacity: 0.3 }}>
          <motion.line
            x1="20%" y1="30%" x2="80%" y2="70%"
            stroke={COLORS.cyan} strokeWidth={1}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8 }}
          />
          <motion.circle cx="20%" cy="30%" r={3} fill={COLORS.electric}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <motion.circle cx="80%" cy="70%" r={3} fill={COLORS.cyan}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
          />
        </svg>
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

// ─── Chatbot showcase mockup ───
function ChatbotMockup() {
  const messages = [
    { side: 'user', text: 'Analyse les ventes du Q3 et donne-moi les tendances.', delay: 0.3 },
    { side: 'bot', text: 'Voici l\'analyse du Q3 :\n• Revenue : +18% vs Q2\n• Top produit : Module IA (+42%)\n• Churn : -3.2%\n\nVoulez-vous le détail par segment ?', delay: 0.8 },
    { side: 'user', text: 'Oui, par segment client.', delay: 1.6 },
    { side: 'bot', text: 'Segment Enterprise : +24%\nSegment SMB : +11%\nSegment Startup : +31%\n\nLe segment Startup est le plus dynamique. Je recommande d\'augmenter le budget marketing de 15% sur ce segment.', delay: 2.1 },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      style={{
        maxWidth: 480, margin: '0 auto',
        background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(20px)',
        borderRadius: 20, overflow: 'hidden',
        border: `1px solid ${COLORS.electric}20`,
        boxShadow: `0 30px 80px rgba(10,22,80,0.12), 0 0 60px rgba(91,200,242,0.1)`,
      }}
    >
      <div style={{
        display: 'flex', alignItems: 'center', gap: '0.75rem',
        padding: '1rem 1.5rem',
        borderBottom: `1px solid ${COLORS.electric}15`,
        background: 'rgba(244,248,255,0.8)',
      }}>
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            width: 36, height: 36, borderRadius: 10,
            background: `linear-gradient(135deg, ${COLORS.electric}, ${COLORS.cyan})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: `0 0 16px ${COLORS.cyanGlow}`,
          }}
        >
          <Bot size={20} color="#fff" />
        </motion.div>
        <div>
          <div style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: '0.9rem', color: COLORS.navyDeep }}>
            Kuble AI Assistant
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              style={{ width: 6, height: 6, borderRadius: '50%', background: '#28C840' }}
            />
            <span style={{ fontFamily: FONTS.body, fontSize: '0.72rem', color: 'rgba(10,22,80,0.5)' }}>En ligne</span>
          </div>
        </div>
      </div>

      <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', minHeight: 380 }}>
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: msg.delay, ease: [0.22, 1, 0.36, 1] }}
            style={{
              alignSelf: msg.side === 'user' ? 'flex-end' : 'flex-start',
              maxWidth: '80%',
              padding: '0.75rem 1.1rem', borderRadius: msg.side === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
              background: msg.side === 'user'
                ? `linear-gradient(135deg, ${COLORS.electric}, ${COLORS.electricLt})`
                : 'rgba(244,248,255,0.9)',
              border: msg.side === 'bot' ? `1px solid ${COLORS.electric}15` : 'none',
              fontFamily: FONTS.body, fontSize: '0.85rem', lineHeight: 1.6,
              color: msg.side === 'user' ? '#fff' : COLORS.navyDeep,
              whiteSpace: 'pre-wrap',
              boxShadow: msg.side === 'user' ? `0 4px 16px rgba(27,111,224,0.2)` : '0 2px 8px rgba(10,22,80,0.04)',
            }}
          >
            {msg.text}
          </motion.div>
        ))}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 3 }}
          style={{ alignSelf: 'flex-start', display: 'flex', gap: 4, padding: '0.75rem 1.1rem', borderRadius: '16px 16px 16px 4px', background: 'rgba(244,248,255,0.9)', border: `1px solid ${COLORS.electric}15` }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ opacity: [0.3, 1, 0.3], y: [0, -4, 0] }}
              transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
              style={{ width: 6, height: 6, borderRadius: '50%', background: COLORS.electric }}
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}

// ─── Methodology timeline step ───
function TimelineStep({ step, index }: { step: { num: string; title: string; desc: string }; index: number }) {
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
          color: 'rgba(10,22,80,0.55)',
        }}>
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
//  PAGE INTELLIGENCE ARTIFICIELLE — 100% clair
// ═══════════════════════════════════════════════════════════
export default function IA() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const mockupRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: mockProgress } = useScroll({ target: mockupRef, offset: ['start end', 'end start'] });
  const mockupY = useTransform(mockProgress, [0, 1], [40, -40]);
  const imgY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.25]);

  const services: IAService[] = [
    { icon: MessageSquare, title: 'Chatbots & Assistants IA', desc: 'Assistants conversationnels sur GPT/Claude, intégrés à vos outils, disponibles 24/7.', img: IA_IMG.chatbot },
    { icon: Brain, title: 'Machine Learning Sur Mesure', desc: 'Modèles prédictifs, classification, NLP, computer vision, entraînés sur vos données.', img: IA_IMG.ml },
    { icon: Workflow, title: 'Automatisation Intelligente', desc: 'RPA augmentée par l\'IA, workflows automatisés, élimination des tâches répétitives.', img: IA_IMG.automation },
    { icon: Eye, title: 'Computer Vision', desc: 'Reconnaissance d\'images, détection d\'objets, OCR, analyse vidéo en temps réel.', img: IA_IMG.vision },
    { icon: TrendingUp, title: 'Optimisation & Recommandation', desc: 'Moteurs de recommandation, optimisation de prix, routing intelligent, A/B testing automatisé.', img: IA_IMG.recommendation },
    { icon: Bot, title: 'Agents IA Autonomes', desc: 'Agents multi-tâches, planification, outils personnalisés, intégration API.', img: IA_IMG.agents },
    { icon: Sparkles, title: 'LLM & IA Générative sur mesure', desc: 'Fine-tuning, RAG (recherche augmentée), génération de texte/image/code adaptée à votre métier.', img: IA_IMG.llm },
  ];

  const steps = [
    { num: '01', title: 'Cadrage', desc: 'Identification des use cases, ROI attendu, faisabilité technique et éthique.' },
    { num: '02', title: 'Données', desc: 'Collecte, nettoyage, annotation, préparation des datasets d\'entraînement.' },
    { num: '03', title: 'Modèle', desc: 'Sélection, entraînement, fine-tuning, évaluation et validation des performances.' },
    { num: '04', title: 'Intégration', desc: 'Déploiement en production, API, monitoring, intégration dans vos workflows.' },
    { num: '05', title: 'Amélioration Continue', desc: 'Retraining, A/B testing, optimisation des coûts, montée en précision.' },
  ];

  const stack = ['OpenAI', 'Anthropic', 'TensorFlow', 'PyTorch', 'LangChain', 'Hugging Face', 'Pinecone', 'Whisper', 'Stable Diffusion', 'LlamaIndex', 'Vertex AI', 'Azure OpenAI'];

  return (
    <div style={{ background: `linear-gradient(180deg, #F4F8FF 0%, #FFFFFF 100%)` }}>
      {/* ══ 1. HERO ══ */}
      <section ref={heroRef} style={{
        position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center',
        padding: '120px 2rem 4rem', overflow: 'hidden',
        background: `linear-gradient(180deg, #F4F8FF 0%, #FFFFFF 60%, #FFFFFF 100%)`,
      }}>
        {/* Background image — subtle, light overlay */}
        <motion.div
          initial={{ scale: 1.15 }} animate={{ scale: 1.05 }}
          transition={{ duration: 12, ease: 'easeOut' }}
          style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden' }}
        >
          <motion.img
            src={IA_IMG.hero} alt=""
            style={{ width: '100%', height: '100%', objectFit: 'cover', willChange: 'transform', y: imgY, scale: imgScale }}
            initial={{ scale: 1.2 }}
            animate={{ scale: 1.08 }}
            transition={{ duration: 15, ease: 'easeOut' }}
          />
        </motion.div>
        {/* Light overlay — keeps the 100% clair theme */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 1,
          background: `linear-gradient(180deg, rgba(244,248,255,0.75) 0%, rgba(255,255,255,0.65) 50%, rgba(255,255,255,0.9) 100%)`,
        }} />

        <BreathingHalo x="10%" y="15%" size={500} color={COLORS.cyanGlow} delay={0} />
        <BreathingHalo x="60%" y="50%" size={450} color="rgba(27,111,224,0.12)" delay={3} />
        <BreathingHalo x="75%" y="10%" size={350} color={COLORS.cyanGlow} delay={5} />
        <NeuralNetwork />

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
              L'intelligence artificielle{' '}
              <span style={{
                background: `linear-gradient(135deg, ${COLORS.electric} 0%, ${COLORS.cyan} 100%)`,
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                filter: `drop-shadow(0 0 20px ${COLORS.cyanGlow})`,
              }}>
                au service de votre croissance
              </span>
            </h1>

            <p style={{
              fontFamily: FONTS.body, fontSize: 'clamp(1.05rem, 2vw, 1.3rem)', lineHeight: 1.6,
              color: 'rgba(10,22,80,0.6)', maxWidth: 580, marginBottom: '2.5rem',
            }}>
              Chatbots, machine learning, automatisation intelligente et IA générative. Nous concevons des solutions IA qui transforment votre efficacité et votre expérience client.
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
                  color: COLORS.navyDeep,
                  padding: '0.9rem 2.2rem', borderRadius: 12,
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
              L'IA qui{' '}
              <span style={{ color: COLORS.electric }}>transforme</span>
              {' '}votre entreprise
            </h2>
            <p style={{
              fontFamily: FONTS.body, fontSize: '1.1rem', color: 'rgba(10,22,80,0.6)',
              maxWidth: 600, margin: '0 auto',
            }}>
              Nous concevons des solutions d'intelligence artificielle qui automatisent, optimisent et créent de la valeur — sur mesure, pour votre métier.
            </p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
            <GlassStat value={70} suffix="%" label="Tâches automatisables par l'IA" delay={0} />
            <GlassStat value={3} suffix="x" label="Productivité des équipes augmentée" delay={0.15} />
            <GlassStat value={50} suffix="+" label="Modèles IA déployés en production" delay={0.3} />
            <GlassStat value={24} suffix="/7" label="Assistants IA disponibles" delay={0.45} />
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
              <span style={{ color: COLORS.electric }}>IA</span>
            </h2>
            <p style={{
              fontFamily: FONTS.body, fontSize: '1.1rem', color: 'rgba(10,22,80,0.6)',
              maxWidth: 600, margin: '0 auto',
            }}>
              Du chatbot à l'agent autonome, nous couvrons toute la chaîne de l'intelligence artificielle.
            </p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(280px, 100%), 1fr))', gap: '1.5rem' }}>
            {services.map((svc, i) => (
              <IAServiceCard key={svc.title} svc={svc} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ══ 4. Showcase — chatbot mockup ══ */}
      <section ref={mockupRef} style={{
        padding: '6rem 2rem',
        background: `linear-gradient(180deg, #F8FBFF 0%, #F4F8FF 100%)`,
        position: 'relative', overflow: 'hidden',
      }}>
        <BreathingHalo x="30%" y="20%" size={500} color={COLORS.cyanGlow} delay={1} />

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
              fontSize: 'clamp(2rem, 4vw, 3rem)', color: COLORS.navyDeep,
              marginBottom: '1rem',
            }}>
              Un assistant IA,{' '}
              <span style={{ color: COLORS.electric }}>vraiment intelligent</span>
            </h2>
            <p style={{
              fontFamily: FONTS.body, fontSize: '1.1rem', color: 'rgba(10,22,80,0.6)',
              maxWidth: 600, margin: '0 auto',
            }}>
              Connecté à vos données, il analyse, recommande et agit — en temps réel.
            </p>
          </motion.div>

          <motion.div style={{ y: mockupY }}>
            <ChatbotMockup />
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
              Un processus rigoureux pour des résultats IA fiables et mesurables.
            </p>
          </motion.div>

          <div style={{ position: 'relative' }}>
            <svg style={{ position: 'absolute', left: '50%', top: 0, width: 2, height: '100%', transform: 'translateX(-50%)' }}>
              <defs>
                <linearGradient id="timelineGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={COLORS.electric} />
                  <stop offset="100%" stopColor={COLORS.cyan} />
                </linearGradient>
              </defs>
              <motion.line
                x1={1} y1={0} x2={1} y2="100%"
                stroke="url(#timelineGrad)"
                strokeWidth={2}
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2, ease: 'easeInOut' }}
              />
            </svg>

            {steps.map((step, i) => (
              <TimelineStep key={step.num} step={step} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ══ 6. Stack IA ══ */}
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
              Notre stack IA
            </h2>
            <p style={{ fontFamily: FONTS.body, fontSize: '1rem', color: 'rgba(10,22,80,0.6)' }}>
              Les meilleurs frameworks et modèles du marché.
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
            Donnez une longueur d'avance{' '}
            <span style={{
              background: `linear-gradient(135deg, ${COLORS.electric} 0%, ${COLORS.cyan} 100%)`,
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>
              intelligente
            </span>
            {' '}à votre entreprise
          </h2>
          <p style={{
            fontFamily: FONTS.body, fontSize: '1.15rem', color: 'rgba(10,22,80,0.6)',
            marginBottom: '2.5rem', maxWidth: 560, margin: '0 auto 2.5rem',
          }}>
            Automatisez, optimisez et innovez avec des solutions d'IA conçues pour votre métier.
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
              Démarrer un projet IA <ArrowRight size={18} />
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
