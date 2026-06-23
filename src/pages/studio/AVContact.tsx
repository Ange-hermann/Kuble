import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Mail, Clock, Send, CheckCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';

const EMAILJS_SERVICE  = 'service_310v7f6';
const EMAILJS_TEMPLATE = 'template_3peinso';
const EMAILJS_KEY      = 'XJf2StRSjxM5ILhxr';

const G = '#e8c84a';
const BLUE = '#4d9eff';

const inputStyle: React.CSSProperties = {
  width: '100%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)',
  borderRadius: 10, padding: '0.8rem 1rem', color: '#fff', fontFamily: 'Inter', fontSize: '0.9rem',
  outline: 'none', boxSizing: 'border-box',
};

export default function AVContact() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ nom: '', email: '', tel: '', service: '', date: '', budget: '', message: '' });

  const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError('');
    try {
      await emailjs.send(EMAILJS_SERVICE, EMAILJS_TEMPLATE, {
        nom:     form.nom,
        email:   form.email,
        telephone: form.tel || 'Non renseigné',
        service: form.service || 'Non précisé',
        date:    form.date || 'Non précisée',
        budget:  form.budget || 'Non précisé',
        message: form.message,
      }, EMAILJS_KEY);
      setSent(true);
    } catch {
      setError('Erreur lors de l\'envoi. Réessayez ou contactez-nous sur WhatsApp.');
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="av-contact" style={{ padding: '7rem 2rem', background: '#071228' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span style={{ fontFamily: 'JetBrains Mono', fontSize: '0.75rem', color: G, letterSpacing: '0.2em' }}>// CONTACT</span>
          <h2 style={{ fontFamily: 'Space Grotesk', fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#fff', marginTop: 12 }}>
            Parlons de votre projet
          </h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '4rem', alignItems: 'start' }} className="av-contact-grid">
          {/* Gauche */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {[
              { icon: MapPin, label: 'Adresse', value: 'Cocody, Abidjan, Côte d\'Ivoire', color: G },
              { icon: Mail,   label: 'Email',   value: 'kubleai@gmail.com',               color: '#00C2FF' },
              { icon: Clock,  label: 'Horaires', value: 'Lun–Ven 8h–18h  |  Sam 9h–13h', color: '#c084fc' },
            ].map(item => {
              const Icon = item.icon;
              return (
                <div key={item.label} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', background: 'rgba(80,160,255,0.07)', border: `1px solid ${BLUE}25`, borderRadius: 14, padding: '1.25rem' }}>
                  <div style={{ width: 42, height: 42, borderRadius: 10, background: `${item.color}18`, border: `1px solid ${item.color}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon size={18} color={item.color} />
                  </div>
                  <div>
                    <div style={{ fontFamily: 'Space Grotesk', fontWeight: 600, fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', marginBottom: 3 }}>{item.label}</div>
                    <div style={{ fontFamily: 'Inter', fontSize: '0.92rem', color: '#fff' }}>{item.value}</div>
                  </div>
                </div>
              );
            })}

            {/* WhatsApp */}
            <div style={{ background: 'rgba(37,211,102,0.08)', border: '1px solid rgba(37,211,102,0.25)', borderRadius: 14, padding: '1.25rem' }}>
              <div style={{ fontFamily: 'Space Grotesk', fontWeight: 600, fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', marginBottom: 10 }}>WhatsApp</div>
              {[{ label: '07 88 04 33 60', num: '2250788043360' }, { label: '01 41 46 42 68', num: '2250141464268' }].map(t => (
                <motion.a key={t.num} href={`https://wa.me/${t.num}`} target="_blank" rel="noopener noreferrer"
                  whileHover={{ x: 4 }}
                  style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#25D366', fontFamily: 'Inter', fontWeight: 600, fontSize: '0.95rem', textDecoration: 'none', marginBottom: 8 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  {t.label}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Droite : formulaire */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            {sent ? (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                style={{ textAlign: 'center', padding: '4rem 2rem', background: 'rgba(80,160,255,0.07)', border: `1px solid ${BLUE}33`, borderRadius: 20 }}>
                <CheckCircle size={60} color={G} style={{ margin: '0 auto 1.5rem' }} />
                <h3 style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: '1.4rem', color: '#fff', marginBottom: 12 }}>Demande envoyée ! 🎬</h3>
                <p style={{ fontFamily: 'Inter', color: 'rgba(255,255,255,0.6)' }}>Notre équipe vous contacte dans les 24h.</p>
                <button onClick={() => setSent(false)} style={{ marginTop: '1.5rem', background: `linear-gradient(135deg,${BLUE},${G})`, color: '#0c1a3e', border: 'none', borderRadius: 10, padding: '0.7rem 2rem', fontFamily: 'Space Grotesk', fontWeight: 700, cursor: 'pointer' }}>
                  Nouveau message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={submit} style={{ background: 'rgba(80,160,255,0.05)', border: `1px solid ${BLUE}20`, borderRadius: 20, padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <input name="nom" value={form.nom} onChange={handle} placeholder="Nom complet *" required style={inputStyle} />
                  <input name="email" type="email" value={form.email} onChange={handle} placeholder="Email *" required style={inputStyle} />
                </div>
                <input name="tel" value={form.tel} onChange={handle} placeholder="Téléphone / WhatsApp" style={inputStyle} />
                <select name="service" value={form.service} onChange={handle} style={{ ...inputStyle, cursor: 'pointer' }}>
                  <option value="" style={{ background: '#071228' }}>Type de service *</option>
                  <option value="video" style={{ background: '#071228' }}>Production vidéo</option>
                  <option value="event" style={{ background: '#071228' }}>Couverture événement</option>
                  <option value="social" style={{ background: '#071228' }}>Gestion réseaux</option>
                  <option value="pub" style={{ background: '#071228' }}>Publicité</option>
                  <option value="photo" style={{ background: '#071228' }}>Photographie</option>
                  <option value="autre" style={{ background: '#071228' }}>Autre</option>
                </select>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <input name="date" type="date" value={form.date} onChange={handle} style={{ ...inputStyle, colorScheme: 'dark' }} />
                  <select name="budget" value={form.budget} onChange={handle} style={{ ...inputStyle, cursor: 'pointer' }}>
                    <option value="" style={{ background: '#071228' }}>Budget estimé</option>
                    <option value="500k" style={{ background: '#071228' }}>{'< 500 000 FCFA'}</option>
                    <option value="2m" style={{ background: '#071228' }}>500k – 2M FCFA</option>
                    <option value="5m" style={{ background: '#071228' }}>2M – 5M FCFA</option>
                    <option value="plus" style={{ background: '#071228' }}>{'+ 5M FCFA'}</option>
                  </select>
                </div>
                <textarea name="message" value={form.message} onChange={handle} rows={4} placeholder="Décrivez votre projet *" required style={{ ...inputStyle, resize: 'vertical' }} />
                <button type="submit"
                  style={{ background: `linear-gradient(135deg,${BLUE},${G})`, color: '#0c1a3e', border: 'none', borderRadius: 12, padding: '1rem', fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: '1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                  <Send size={18} /> {sending ? 'Envoi en cours...' : 'Envoyer ma demande'}
                </button>
                {error && <p style={{ fontFamily: 'Inter', fontSize: '0.85rem', color: '#ff6b6b', textAlign: 'center', marginTop: 4 }}>{error}</p>}
              </form>
            )}
          </motion.div>
        </div>
      </div>
      <style>{`
        .av-contact-grid { grid-template-columns: 1fr 1.4fr !important; }
        @media (max-width: 850px) { .av-contact-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
