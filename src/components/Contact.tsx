import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Send, MapPin, Mail, Phone, CheckCircle } from 'lucide-react';

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
    color: ['#1A6BFF', '#00A3FF', '#D4AF37', '#fff', '#00ff88'][Math.floor(Math.random() * 5)],
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

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [confetti, setConfetti] = useState(false);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>();

  const onSubmit = async (_data: FormData) => {
    await new Promise((r) => setTimeout(r, 1000));
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
    <section id="contact" className="section-padding adinkra-bg" style={{ background: '#020818' }}>
      <Confetti active={confetti} />
      <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <span style={{ fontFamily: 'JetBrains Mono', fontSize: '0.8rem', color: '#00A3FF', letterSpacing: '0.2em', display: 'block', marginBottom: 12 }}>
            // CONTACT
          </span>
          <h2 className="section-title">Démarrons votre projet</h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Décrivez votre projet et nous vous répondons sous 24h.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'start' }}>
          {/* Form */}
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
                    background: 'rgba(26,107,255,0.08)',
                    border: '1px solid rgba(0,163,255,0.3)',
                    borderRadius: 20,
                  }}
                >
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.6 }}
                    style={{ marginBottom: '1.5rem' }}
                  >
                    <CheckCircle size={64} color="#00A3FF" style={{ margin: '0 auto' }} />
                  </motion.div>
                  <h3 style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: '1.5rem', color: '#E8F4FF', marginBottom: '1rem' }}>
                    Message envoyé ! 🎉
                  </h3>
                  <p style={{ fontFamily: 'Inter', color: 'rgba(232,244,255,0.7)', lineHeight: 1.7 }}>
                    Merci pour votre message. Notre équipe vous contactera dans les 24 heures.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    onClick={() => setSubmitted(false)}
                    className="btn-primary"
                    style={{ marginTop: '2rem' }}
                  >
                    Envoyer un autre message
                  </motion.button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onSubmit={handleSubmit(onSubmit)}
                  style={{
                    background: 'rgba(26,107,255,0.06)',
                    border: '1px solid rgba(26,107,255,0.2)',
                    borderRadius: 20, padding: '2.5rem',
                    display: 'flex', flexDirection: 'column', gap: '1.25rem',
                  }}
                >
                  {/* Nom */}
                  <div>
                    <input
                      {...register('nom', { required: 'Le nom est requis' })}
                      placeholder="Votre nom complet"
                      className={`form-input ${errors.nom ? 'error' : ''}`}
                    />
                    <AnimatePresence>
                      {errors.nom && (
                        <motion.span
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          style={{ fontFamily: 'Inter', fontSize: '0.78rem', color: '#ff4d4d', marginTop: 4, display: 'block' }}
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
                      className={`form-input ${errors.email ? 'error' : ''}`}
                    />
                    <AnimatePresence>
                      {errors.email && (
                        <motion.span
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          style={{ fontFamily: 'Inter', fontSize: '0.78rem', color: '#ff4d4d', marginTop: 4, display: 'block' }}
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
                    className="form-input"
                  />

                  {/* Type de projet */}
                  <select
                    {...register('typeProjet', { required: true })}
                    className="form-input"
                    style={{ cursor: 'pointer' }}
                  >
                    <option value="" style={{ background: '#020818' }}>Type de projet</option>
                    <option value="web" style={{ background: '#020818' }}>Développement Web</option>
                    <option value="mobile" style={{ background: '#020818' }}>Application Mobile</option>
                    <option value="secu" style={{ background: '#020818' }}>Cybersécurité</option>
                    <option value="ia" style={{ background: '#020818' }}>Intelligence Artificielle</option>
                    <option value="cloud" style={{ background: '#020818' }}>Cloud & Infrastructure</option>
                    <option value="autre" style={{ background: '#020818' }}>Autre</option>
                  </select>

                  {/* Message */}
                  <div>
                    <textarea
                      {...register('message', { required: 'Le message est requis', minLength: { value: 20, message: 'Minimum 20 caractères' } })}
                      placeholder="Décrivez votre projet..."
                      rows={5}
                      className={`form-input ${errors.message ? 'error' : ''}`}
                      style={{ resize: 'vertical' }}
                    />
                    <AnimatePresence>
                      {errors.message && (
                        <motion.span
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          style={{ fontFamily: 'Inter', fontSize: '0.78rem', color: '#ff4d4d', marginTop: 4, display: 'block' }}
                        >
                          {errors.message.message}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: isSubmitting ? 1 : 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="btn-primary"
                    style={{ justifyContent: 'center', opacity: isSubmitting ? 0.7 : 1, cursor: isSubmitting ? 'wait' : 'pointer' }}
                  >
                    {isSubmitting ? 'Envoi en cours...' : <>Envoyer le message <Send size={17} /></>}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Infos */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
          >
            <div>
              <h3 style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: '1.3rem', color: '#E8F4FF', marginBottom: '0.75rem' }}>
                Parlons de votre vision
              </h3>
              <p style={{ fontFamily: 'Inter', color: 'rgba(232,244,255,0.65)', lineHeight: 1.7 }}>
                Que vous ayez un projet défini ou une simple idée, notre équipe est là pour vous guider vers la meilleure solution technologique.
              </p>
            </div>

            {[
              { icon: MapPin, label: 'Adresse', value: 'Plateau, Abidjan, Côte d\'Ivoire', color: '#D4AF37', href: null },
              { icon: Mail,   label: 'Email',   value: 'contact@kuble.ci',                 color: '#00A3FF', href: 'mailto:contact@kuble.ci' },
            ].map((info) => {
              const Icon = info.icon;
              return (
                <div key={info.label} style={{
                  display: 'flex', alignItems: 'flex-start', gap: '1rem',
                  padding: '1.25rem',
                  background: 'rgba(26,107,255,0.06)',
                  border: '1px solid rgba(26,107,255,0.15)',
                  borderRadius: 12,
                }}>
                  <div style={{
                    width: 42, height: 42, borderRadius: 10,
                    background: `${info.color}22`,
                    border: `1px solid ${info.color}44`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <Icon size={18} color={info.color} />
                  </div>
                  <div>
                    <div style={{ fontFamily: 'Space Grotesk', fontWeight: 600, fontSize: '0.85rem', color: 'rgba(232,244,255,0.5)', marginBottom: 2 }}>
                      {info.label}
                    </div>
                    {info.href ? (
                      <a href={info.href} style={{ fontFamily: 'Inter', fontSize: '0.95rem', color: '#E8F4FF', textDecoration: 'none' }}>
                        {info.value}
                      </a>
                    ) : (
                      <div style={{ fontFamily: 'Inter', fontSize: '0.95rem', color: '#E8F4FF' }}>{info.value}</div>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Téléphone / WhatsApp */}
            <div style={{
              display: 'flex', alignItems: 'flex-start', gap: '1rem',
              padding: '1.25rem',
              background: 'rgba(26,107,255,0.06)',
              border: '1px solid rgba(26,107,255,0.15)',
              borderRadius: 12,
            }}>
              <div style={{
                width: 42, height: 42, borderRadius: 10,
                background: 'rgba(37,211,102,0.15)',
                border: '1px solid rgba(37,211,102,0.35)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                <Phone size={18} color="#25D366" />
              </div>
              <div>
                <div style={{ fontFamily: 'Space Grotesk', fontWeight: 600, fontSize: '0.85rem', color: 'rgba(232,244,255,0.5)', marginBottom: 6 }}>
                  WhatsApp
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
                        fontFamily: 'Inter', fontSize: '0.95rem',
                        color: '#25D366', textDecoration: 'none',
                        fontWeight: 600,
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
            </div>

            {/* Map placeholder */}
            <div style={{
              height: 160, borderRadius: 14,
              background: 'linear-gradient(135deg, rgba(26,107,255,0.1), rgba(0,163,255,0.05))',
              border: '1px solid rgba(26,107,255,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexDirection: 'column', gap: 8, position: 'relative', overflow: 'hidden',
            }}>
              <div style={{ fontSize: '2.5rem' }}>🗺️</div>
              <span style={{ fontFamily: 'JetBrains Mono', fontSize: '0.75rem', color: 'rgba(232,244,255,0.4)' }}>
                Abidjan, Côte d'Ivoire
              </span>
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0, height: 3,
                background: 'linear-gradient(90deg, #1A6BFF, #00A3FF, #D4AF37)',
              }} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
