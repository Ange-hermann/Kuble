import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Send, MapPin, Mail, Phone, CheckCircle, ChevronDown, ArrowRight, MessageSquare, Clock, Zap } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { COLORS, FONTS } from '../theme/colors';

const EMAILJS_SERVICE  = 'service_310v7f6';
const EMAILJS_TEMPLATE = 'template_3peinso';
const EMAILJS_KEY      = 'XJf2StRSjxM5ILhxr';

type FormData = {
  nom: string;
  email: string;
  telephone: string;
  typeProjet: string;
  message: string;
};

function Confetti({ active }: { active: boolean }) {
  if (!active) return null;
  const pieces = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}vw`,
    color: ['#1B6FE0', '#5BC8F2', '#5BC8F2', '#fff', '#00ff88'][Math.floor(Math.random() * 5)],
    delay: `${Math.random() * 1.5}s`,
    size: Math.random() * 8 + 4,
    shape: Math.random() > 0.5 ? '50%' : '2px',
  }));
  return (
    <>
      {pieces.map((p) => (
        <div
          key={p.id}
          className="confetti-piece"
          style={{
            left: p.left,
            top: '-20px',
            background: p.color,
            animationDelay: p.delay,
            width: p.size,
            height: p.size,
            borderRadius: p.shape,
          }}
        />
      ))}
    </>
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

// ─── Light connections ───
function LightConnections() {
  const nodes = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    x: 15 + Math.random() * 70,
    y: 15 + Math.random() * 70,
  }));
  const connections: { a: number; b: number }[] = [
    { a: 0, b: 1 }, { a: 1, b: 2 }, { a: 2, b: 3 }, { a: 3, b: 4 }, { a: 4, b: 5 },
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

// ─── Info card ───
function ContactInfoCard({ icon: Icon, label, value, color, href, index, children }: {
  icon: typeof MapPin; label: string; value: string; color: string; href?: string; index: number; children?: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      style={{
        display: 'flex', alignItems: 'flex-start', gap: '1rem',
        padding: '1.5rem',
        background: 'rgba(27,111,224,0.08)',
        border: '1px solid rgba(91,200,242,0.2)',
        borderRadius: 14,
        transition: 'all 0.3s ease',
      }}
    >
      <div style={{
        width: 46, height: 46, borderRadius: 12,
        background: `${color}22`,
        border: `1px solid ${color}44`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
      }}>
        <Icon size={20} color={color} />
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: FONTS.mono, fontWeight: 600, fontSize: '0.78rem', color: 'rgba(255,255,255,0.45)', marginBottom: 4, letterSpacing: '0.1em' }}>
          {label}
        </div>
        {href ? (
          <a href={href} style={{ fontFamily: FONTS.body, fontSize: '0.95rem', color: COLORS.white, textDecoration: 'none' }}>
            {value}
          </a>
        ) : (
          <div style={{ fontFamily: FONTS.body, fontSize: '0.95rem', color: COLORS.white }}>{value}</div>
        )}
        {children}
      </div>
    </motion.div>
  );
}

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [confetti, setConfetti] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    await emailjs.send(EMAILJS_SERVICE, EMAILJS_TEMPLATE, {
      nom:        data.nom,
      email:      data.email,
      telephone:  data.telephone || 'Non renseigné',
      typeProjet: data.typeProjet || 'Non précisé',
      message:    data.message,
    }, EMAILJS_KEY);
    setSubmitted(true);
    setConfetti(true);
  };

  useEffect(() => {
    if (confetti) {
      const t = setTimeout(() => setConfetti(false), 4000);
      return () => clearTimeout(t);
    }
  }, [confetti]);

  return (
    <div style={{ background: `linear-gradient(180deg, #F4F8FF 0%, #FFFFFF 100%)` }}>
      <Confetti active={confetti} />

      {/* ══ 1. HERO ══ */}
      <section ref={heroRef} style={{
        position: 'relative', minHeight: '70vh', display: 'flex', alignItems: 'center',
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
              // CONTACT
            </span>
            <h1 style={{
              fontFamily: FONTS.display, fontWeight: 800,
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', lineHeight: 1.05,
              color: COLORS.navyDeep, marginBottom: '1.5rem', letterSpacing: '-0.02em',
            }}>
              Démarrons{' '}
              <span style={{
                background: `linear-gradient(135deg, ${COLORS.electric} 0%, ${COLORS.cyan} 100%)`,
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                filter: `drop-shadow(0 0 20px ${COLORS.cyanGlow})`,
              }}>
                votre projet
              </span>
            </h1>
            <p style={{
              fontFamily: FONTS.body, fontSize: 'clamp(1.05rem, 2vw, 1.25rem)', lineHeight: 1.7,
              color: 'rgba(10,22,80,0.6)', maxWidth: 580, margin: '0 auto',
            }}>
              Décrivez votre projet et nous vous répondons sous 24h. Une idée, une vision, un besoin — parlons-en.
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

      {/* ══ 2. Formulaire + Infos ══ */}
      <section style={{
        padding: '4rem 2rem 6rem',
        background: `linear-gradient(180deg, #FFFFFF 0%, #F8FBFF 100%)`,
        position: 'relative', overflow: 'hidden',
      }}>
        <BreathingHalo x="80%" y="20%" size={400} color={COLORS.cyanGlow} delay={2} />

        <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem', alignItems: 'start' }}>

            {/* Form — light glassmorphism */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    style={{
                      textAlign: 'center', padding: '4rem 2rem',
                      background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(16px)',
                      border: `1px solid ${COLORS.cyan}30`,
                      borderRadius: 20,
                      boxShadow: `0 12px 40px rgba(27,111,224,0.1), 0 0 30px ${COLORS.cyanGlow}`,
                    }}
                  >
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.6 }}
                      style={{ marginBottom: '1.5rem' }}
                    >
                      <CheckCircle size={64} color={COLORS.electric} style={{ margin: '0 auto' }} />
                    </motion.div>
                    <h3 style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: '1.5rem', color: COLORS.navyDeep, marginBottom: '1rem' }}>
                      Message envoyé ! 🎉
                    </h3>
                    <p style={{ fontFamily: FONTS.body, color: 'rgba(10,22,80,0.6)', lineHeight: 1.7 }}>
                      Merci pour votre message. Notre équipe vous contactera dans les 24 heures.
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.04 }}
                      onClick={() => setSubmitted(false)}
                      style={{
                        marginTop: '2rem', padding: '0.75rem 2rem', borderRadius: 10,
                        background: `linear-gradient(135deg, ${COLORS.electric}, ${COLORS.cyan})`,
                        color: '#fff', border: 'none', cursor: 'pointer',
                        fontFamily: FONTS.display, fontWeight: 700, fontSize: '0.95rem',
                        display: 'inline-flex', alignItems: 'center', gap: 8,
                        boxShadow: `0 8px 24px rgba(27,111,224,0.25)`,
                      }}
                    >
                      Envoyer un autre message <ArrowRight size={16} />
                    </motion.button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onSubmit={handleSubmit(onSubmit)}
                    style={{
                      background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(16px)',
                      border: `1px solid ${COLORS.electric}15`,
                      borderRadius: 20, padding: '2.5rem',
                      display: 'flex', flexDirection: 'column', gap: '1.25rem',
                      boxShadow: '0 12px 40px rgba(10,22,80,0.08)',
                    }}
                  >
                    {/* Nom */}
                    <div>
                      <input
                        {...register('nom', { required: 'Le nom est requis' })}
                        placeholder="Votre nom complet"
                        style={{
                          width: '100%',
                          background: 'rgba(244,248,255,0.8)',
                          border: `1px solid ${errors.nom ? '#ff4d4d' : COLORS.electric + '20'}`,
                          borderRadius: 10, padding: '0.875rem 1rem',
                          color: COLORS.navyDeep, fontFamily: FONTS.body, fontSize: '0.95rem',
                          outline: 'none', transition: 'all 0.3s',
                        }}
                        onFocus={(e) => e.currentTarget.style.borderColor = COLORS.cyan}
                        onBlur={(e) => e.currentTarget.style.borderColor = `${COLORS.electric}20`}
                      />
                      <AnimatePresence>
                        {errors.nom && (
                          <motion.span
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            style={{ fontFamily: FONTS.body, fontSize: '0.78rem', color: '#ff4d4d', marginTop: 4, display: 'block' }}
                          >
                            {errors.nom.message}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Email */}
                    <div>
                      <input
                        {...register('email', {
                          required: "L'email est requis",
                          pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Email invalide' },
                        })}
                        placeholder="votre@email.com"
                        type="email"
                        style={{
                          width: '100%',
                          background: 'rgba(244,248,255,0.8)',
                          border: `1px solid ${errors.email ? '#ff4d4d' : COLORS.electric + '20'}`,
                          borderRadius: 10, padding: '0.875rem 1rem',
                          color: COLORS.navyDeep, fontFamily: FONTS.body, fontSize: '0.95rem',
                          outline: 'none', transition: 'all 0.3s',
                        }}
                        onFocus={(e) => e.currentTarget.style.borderColor = COLORS.cyan}
                        onBlur={(e) => e.currentTarget.style.borderColor = `${COLORS.electric}20`}
                      />
                      <AnimatePresence>
                        {errors.email && (
                          <motion.span
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            style={{ fontFamily: FONTS.body, fontSize: '0.78rem', color: '#ff4d4d', marginTop: 4, display: 'block' }}
                          >
                            {errors.email.message}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Téléphone */}
                    <input
                      {...register('telephone')}
                      placeholder="+225 XX XX XX XX XX"
                      style={{
                        width: '100%',
                        background: 'rgba(244,248,255,0.8)',
                        border: `1px solid ${COLORS.electric}20`,
                        borderRadius: 10, padding: '0.875rem 1rem',
                        color: COLORS.navyDeep, fontFamily: FONTS.body, fontSize: '0.95rem',
                        outline: 'none', transition: 'all 0.3s',
                      }}
                      onFocus={(e) => e.currentTarget.style.borderColor = COLORS.cyan}
                      onBlur={(e) => e.currentTarget.style.borderColor = `${COLORS.electric}20`}
                    />

                    {/* Type de projet */}
                    <select
                      {...register('typeProjet')}
                      style={{
                        width: '100%',
                        background: 'rgba(244,248,255,0.8)',
                        border: `1px solid ${COLORS.electric}20`,
                        borderRadius: 10, padding: '0.875rem 1rem',
                        color: COLORS.navyDeep, fontFamily: FONTS.body, fontSize: '0.95rem',
                        outline: 'none', cursor: 'pointer', transition: 'all 0.3s',
                      }}
                      onFocus={(e) => e.currentTarget.style.borderColor = COLORS.cyan}
                      onBlur={(e) => e.currentTarget.style.borderColor = `${COLORS.electric}20`}
                    >
                      <option value="">Type de projet</option>
                      <option value="web">Développement Web</option>
                      <option value="mobile">Application Mobile</option>
                      <option value="secu">Cybersécurité</option>
                      <option value="ia">Intelligence Artificielle</option>
                      <option value="cloud">Cloud & Infrastructure</option>
                      <option value="data">Data & Analytique</option>
                      <option value="autre">Autre</option>
                    </select>

                    {/* Message */}
                    <div>
                      <textarea
                        {...register('message', { required: 'Le message est requis', minLength: { value: 5, message: 'Minimum 5 caractères' } })}
                        placeholder="Décrivez votre projet..."
                        rows={5}
                        style={{
                          width: '100%',
                          background: 'rgba(244,248,255,0.8)',
                          border: `1px solid ${errors.message ? '#ff4d4d' : COLORS.electric + '20'}`,
                          borderRadius: 10, padding: '0.875rem 1rem',
                          color: COLORS.navyDeep, fontFamily: FONTS.body, fontSize: '0.95rem',
                          outline: 'none', resize: 'vertical', transition: 'all 0.3s',
                        }}
                        onFocus={(e) => e.currentTarget.style.borderColor = COLORS.cyan}
                        onBlur={(e) => e.currentTarget.style.borderColor = `${COLORS.electric}20`}
                      />
                      <AnimatePresence>
                        {errors.message && (
                          <motion.span
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            style={{ fontFamily: FONTS.body, fontSize: '0.78rem', color: '#ff4d4d', marginTop: 4, display: 'block' }}
                          >
                            {errors.message.message}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </div>

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      style={{
                        justifyContent: 'center', opacity: isSubmitting ? 0.7 : 1,
                        cursor: isSubmitting ? 'wait' : 'pointer',
                        padding: '0.9rem 2rem', borderRadius: 12,
                        background: `linear-gradient(135deg, ${COLORS.electric}, ${COLORS.cyan})`,
                        color: '#fff', border: 'none',
                        fontFamily: FONTS.display, fontWeight: 700, fontSize: '1rem',
                        display: 'inline-flex', alignItems: 'center', gap: 8,
                        boxShadow: `0 8px 30px rgba(27,111,224,0.25)`,
                        transition: 'all 0.3s',
                      }}
                    >
                      {isSubmitting ? 'Envoi en cours...' : <>Envoyer le message <Send size={17} /></>}
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Infos — section sombre */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              style={{
                display: 'flex', flexDirection: 'column', gap: '1.25rem',
                background: `linear-gradient(180deg, ${COLORS.navyDeep} 0%, ${COLORS.navyDark} 100%)`,
                borderRadius: 20, padding: '2.5rem',
                position: 'relative', overflow: 'hidden',
              }}
            >
              {/* Grid background */}
              <div style={{
                position: 'absolute', inset: 0, opacity: 0.04, pointerEvents: 'none',
                backgroundImage: `linear-gradient(${COLORS.cyan} 1px, transparent 1px), linear-gradient(90deg, ${COLORS.cyan} 1px, transparent 1px)`,
                backgroundSize: '40px 40px',
              }} />
              <BreathingHalo x="50%" y="10%" size={400} color={COLORS.cyanGlow} delay={1} />

              <div style={{ position: 'relative', zIndex: 2 }}>
                <h3 style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: '1.3rem', color: COLORS.white, marginBottom: '0.75rem' }}>
                  Parlons de votre vision
                </h3>
                <p style={{ fontFamily: FONTS.body, color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                  Que vous ayez un projet défini ou une simple idée, notre équipe est là pour vous guider vers la meilleure solution technologique.
                </p>
              </div>

              <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <ContactInfoCard icon={MapPin} label="ADRESSE" value="Cocody, Abidjan, Côte d'Ivoire" color={COLORS.cyan} index={0} />

                <ContactInfoCard icon={Mail} label="EMAIL" value="kubleai@gmail.com" color={COLORS.cyan} href="mailto:kubleai@gmail.com" index={1} />

                {/* WhatsApp */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  whileHover={{ y: -4 }}
                  style={{
                    display: 'flex', alignItems: 'flex-start', gap: '1rem',
                    padding: '1.5rem',
                    background: 'rgba(27,111,224,0.08)',
                    border: '1px solid rgba(91,200,242,0.2)',
                    borderRadius: 14,
                    transition: 'all 0.3s ease',
                  }}
                >
                  <div style={{
                    width: 46, height: 46, borderRadius: 12,
                    background: 'rgba(37,211,102,0.15)',
                    border: '1px solid rgba(37,211,102,0.35)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <Phone size={20} color="#25D366" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: FONTS.mono, fontWeight: 600, fontSize: '0.78rem', color: 'rgba(255,255,255,0.45)', marginBottom: 6, letterSpacing: '0.1em' }}>
                      WHATSAPP
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      {[
                        { label: '07 88 04 33 60', number: '2250788043360' },
                        { label: '01 41 46 42 68', number: '2250141464268' },
                      ].map((tel) => (
                        <motion.a
                          key={tel.number}
                          href={`https://wa.me/${tel.number}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ x: 4 }}
                          style={{
                            display: 'inline-flex', alignItems: 'center', gap: 8,
                            fontFamily: FONTS.body, fontSize: '0.95rem',
                            color: '#25D366', textDecoration: 'none', fontWeight: 600,
                          }}
                        >
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="#25D366">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                          </svg>
                          {tel.label}
                        </motion.a>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Response time badge */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '0.75rem',
                    padding: '1rem 1.25rem',
                    background: `linear-gradient(135deg, ${COLORS.electric}15, ${COLORS.cyan}10)`,
                    border: `1px solid ${COLORS.cyan}25`,
                    borderRadius: 12,
                  }}
                >
                  <motion.div
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Zap size={18} color={COLORS.cyan} />
                  </motion.div>
                  <span style={{ fontFamily: FONTS.body, fontSize: '0.88rem', color: 'rgba(255,255,255,0.8)' }}>
                    Réponse garantie sous <strong style={{ color: COLORS.cyan }}>24h</strong>
                  </span>
                </motion.div>
              </div>

              {/* Map placeholder */}
              <div style={{
                position: 'relative', zIndex: 2,
                height: 140, borderRadius: 14,
                background: 'linear-gradient(135deg, rgba(27,111,224,0.12), rgba(91,200,242,0.06))',
                border: '1px solid rgba(91,200,242,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexDirection: 'column', gap: 8, overflow: 'hidden',
              }}>
                <MapPin size={32} color={COLORS.cyan} style={{ opacity: 0.6 }} />
                <span style={{ fontFamily: FONTS.mono, fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)' }}>
                  Abidjan, Côte d'Ivoire
                </span>
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0, height: 3,
                  background: `linear-gradient(90deg, ${COLORS.electric}, ${COLORS.cyan})`,
                }} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══ 3. CTA final (clair, spotlight) ══ */}
      <section style={{
        padding: '5rem 2rem',
        background: `linear-gradient(180deg, #F8FBFF 0%, #F4F8FF 100%)`,
        position: 'relative', overflow: 'hidden',
      }}>
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.35, 0.2] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)',
            width: 500, height: 500, borderRadius: '50%', filter: 'blur(120px)',
            background: `radial-gradient(circle, ${COLORS.cyanGlow} 0%, transparent 70%)`,
            pointerEvents: 'none', zIndex: 0,
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 2 }}
        >
          <MessageSquare size={28} color={COLORS.cyan} style={{ marginBottom: '1rem', opacity: 0.6 }} />
          <h2 style={{
            fontFamily: FONTS.display, fontWeight: 800,
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: COLORS.navyDeep,
            marginBottom: '1rem', lineHeight: 1.1,
          }}>
            Une question ?{' '}
            <span style={{
              background: `linear-gradient(135deg, ${COLORS.electric} 0%, ${COLORS.cyan} 100%)`,
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>
              Parlons-en
            </span>
          </h2>
          <p style={{
            fontFamily: FONTS.body, fontSize: '1.1rem', color: 'rgba(10,22,80,0.6)',
            marginBottom: '2rem', maxWidth: 480, margin: '0 auto 2rem',
          }}>
            Nous sommes à un message de transformer votre idée en réalité.
          </p>
          <motion.a
            href="https://wa.me/2250788043360"
            target="_blank"
            rel="noopener noreferrer"
            animate={{ boxShadow: [
              `0 8px 30px rgba(27,111,224,0.25)`,
              `0 8px 50px rgba(91,200,242,0.5)`,
              `0 8px 30px rgba(27,111,224,0.25)`,
            ] }}
            transition={{ duration: 3, repeat: Infinity }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: `linear-gradient(135deg, ${COLORS.electric}, ${COLORS.cyan})`,
              color: '#fff', padding: '1rem 2.5rem', borderRadius: 12,
              fontFamily: FONTS.display, fontWeight: 700, fontSize: '1.1rem',
              textDecoration: 'none', transition: 'all 0.3s',
            }}
          >
            <Phone size={18} /> WhatsApp direct
          </motion.a>
        </motion.div>
      </section>
    </div>
  );
}
