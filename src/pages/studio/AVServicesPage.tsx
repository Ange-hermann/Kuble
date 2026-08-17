import { motion } from 'framer-motion';
import { Video, Camera, Share2, Mic, Tv, Palette, Users, ArrowRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AV, AV_FONTS } from './avTheme';

const services = [
  {
    icon: Video, emoji: '🎥', title: 'Production Vidéo',
    desc: 'Clips, documentaires, films institutionnels, reportages — du scénario au rendu final.',
    features: ['Scénario et storyboard', 'Tournage multi-caméras', 'Montage et étalonnage', 'Motion design et VFX', 'Livraison 4K'],
    img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=800&auto=format&fit=crop',
  },
  {
    icon: Camera, emoji: '📡', title: 'Couverture Médiatique',
    desc: 'Événements live, conférences, cérémonies, galas — captation multi-caméras professionnelle.',
    features: ['Captation live', 'Retransmission streaming', 'Switcher professionnel', 'Son multi-pistes', 'Livraison express'],
    img: 'https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?q=80&w=800&auto=format&fit=crop',
  },
  {
    icon: Camera, emoji: '📸', title: 'Photographie',
    desc: 'Shooting produit, portrait corporate, événementiel, reportage — retouche incluse.',
    features: ['Studio et extérieur', 'Retouche professionnelle', 'Shooting produit', 'Portrait corporate', 'Reportage événementiel'],
    img: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?q=80&w=800&auto=format&fit=crop',
  },
  {
    icon: Share2, emoji: '📱', title: 'Marketing Digital',
    desc: 'Stratégie éditoriale, création de contenu, publication, community management.',
    features: ['Stratégie de contenu', 'Création de visuels', 'Community management', 'Campagnes publicitaires', 'Reporting mensuel'],
    img: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=800&auto=format&fit=crop',
  },
  {
    icon: Mic, emoji: '🎙️', title: 'Production Audio',
    desc: 'Podcast, jingle, voix-off, habillage sonore, mixage et mastering studio.',
    features: ['Enregistrement studio', 'Mixage et mastering', 'Voix-off', 'Jingles et habillage', 'Podcast complet'],
    img: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=800&auto=format&fit=crop',
  },
  {
    icon: Tv, emoji: '📺', title: 'Publicité & Spots',
    desc: 'Conception, tournage et diffusion de spots publicitaires TV, YouTube, réseaux.',
    features: ['Conception créative', 'Tournage professionnel', 'Post-production', 'Versions multi-formats', 'Stratégie de diffusion'],
    img: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=800&auto=format&fit=crop',
  },
  {
    icon: Palette, emoji: '🎨', title: 'Branding & Identité',
    desc: 'Logo, charte graphique, motion design, identité de marque complète.',
    features: ['Logo et identité', 'Charte graphique', 'Motion design', 'Déclinaisons supports', 'Brand guidelines'],
    img: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=800&auto=format&fit=crop',
  },
  {
    icon: Users, emoji: '🎤', title: 'Événementiel',
    desc: 'Organisation, scénographie, régie technique, animation et retransmission live.',
    features: ['Scénographie', 'Régie technique', 'Animation', 'Retransmission live', 'Coordination complète'],
    img: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=800&auto=format&fit=crop',
  },
];

export default function AVServicesPage() {
  return (
    <div style={{ background: AV.bg }}>
      {/* Hero avec image immersive */}
      <section style={{
        padding: '140px 2rem 5rem', position: 'relative', overflow: 'hidden',
        minHeight: 420,
      }}>
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: [1.1, 1, 1.1] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'url(https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1920&auto=format&fit=crop)',
            backgroundSize: 'cover', backgroundPosition: 'center', zIndex: 0,
          }}
        />
        <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'linear-gradient(180deg, rgba(26,26,46,0.6) 0%, rgba(26,26,46,0.4) 50%, rgba(26,26,46,0.7) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: `linear-gradient(135deg, ${AV.primary}30 0%, transparent 50%, ${AV.coral}25 100%)` }} />
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 2 }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span style={{ fontFamily: AV_FONTS.mono, fontSize: '0.75rem', color: 'rgba(255,255,255,0.8)', letterSpacing: '0.2em' }}>// SERVICES</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
            style={{
              fontFamily: AV_FONTS.display, fontWeight: 800,
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', color: '#fff',
              lineHeight: 1.05, marginTop: 12, marginBottom: '1.5rem', letterSpacing: '-0.02em',
            }}>
            Nos{' '}
            <span style={{ background: AV.gradientText, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              prestations
            </span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            style={{ fontFamily: AV_FONTS.body, fontSize: '1.15rem', color: 'rgba(255,255,255,0.8)', lineHeight: 1.8, maxWidth: 600, margin: '0 auto' }}>
            Une offre complète, de la production au marketing. Tout ce dont votre marque a besoin pour briller.
          </motion.p>
        </div>
      </section>

      {/* Services détaillés */}
      <section style={{ padding: '3rem 2rem 7rem' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '3rem' }}>
          {services.map((s, i) => {
            const Icon = s.icon;
            const reversed = i % 2 === 1;
            return (
              <motion.div key={s.title}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                style={{
                  display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center',
                  direction: reversed ? 'rtl' : 'ltr',
                }} className="av-service-detail">
                <div style={{ direction: 'ltr' }}>
                  <div style={{
                    width: 64, height: 64, borderRadius: 16, marginBottom: '1.5rem',
                    background: AV.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: `0 8px 24px ${AV.primary}25`,
                  }}>
                    <Icon size={32} color="#fff" />
                  </div>
                  <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{s.emoji}</div>
                  <h2 style={{ fontFamily: AV_FONTS.display, fontWeight: 800, fontSize: 'clamp(1.5rem, 3vw, 2rem)', color: AV.text, marginBottom: '1rem' }}>
                    {s.title}
                  </h2>
                  <p style={{ fontFamily: AV_FONTS.body, fontSize: '1rem', color: AV.textSoft, lineHeight: 1.8, marginBottom: '1.5rem' }}>
                    {s.desc}
                  </p>
                  <Link to="/audiovisuel/contact"
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: 8,
                      background: AV.white, color: AV.primary, padding: '0.7rem 1.5rem', borderRadius: 10,
                      border: `1px solid ${AV.primary}30`, fontFamily: AV_FONTS.display, fontWeight: 600,
                      fontSize: '0.9rem', textDecoration: 'none', boxShadow: AV.shadow,
                    }}>
                    Demander un devis <ArrowRight size={16} />
                  </Link>
                </div>
                <div style={{ direction: 'ltr' }}>
                  <div style={{
                    borderRadius: 20, overflow: 'hidden', position: 'relative',
                    boxShadow: AV.shadow, height: 320,
                  }}>
                    <img src={s.img} alt={s.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 30%, rgba(26,26,46,0.9) 100%)' }} />
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1.75rem' }}>
                      <h3 style={{ fontFamily: AV_FONTS.display, fontWeight: 700, fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', marginBottom: '1rem', letterSpacing: '0.05em' }}>
                        CE QUI EST INCLUS
                      </h3>
                      {s.features.map(f => (
                        <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                          <div style={{
                            width: 22, height: 22, borderRadius: '50%', background: 'rgba(255,255,255,0.15)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                          }}>
                            <Check size={13} color="#fff" />
                          </div>
                          <span style={{ fontFamily: AV_FONTS.body, fontSize: '0.9rem', color: 'rgba(255,255,255,0.9)' }}>{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '5rem 2rem', background: AV.bgAlt, textAlign: 'center' }}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 style={{ fontFamily: AV_FONTS.display, fontWeight: 800, fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', color: AV.text, marginBottom: '1.5rem' }}>
            Besoin d'un service sur mesure ?
          </h2>
          <p style={{ fontFamily: AV_FONTS.body, fontSize: '1rem', color: AV.textDim, marginBottom: '2rem' }}>
            Parlons-en. Nous adaptons nos prestations à vos besoins.
          </p>
          <Link to="/audiovisuel/contact"
            style={{
              background: AV.gradient, color: '#fff', padding: '0.9rem 2.2rem', borderRadius: 12,
              fontFamily: AV_FONTS.display, fontWeight: 700, fontSize: '0.95rem',
              textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8,
              boxShadow: `0 8px 30px ${AV.primary}25`,
            }}>
            Nous contacter <ArrowRight size={17} />
          </Link>
        </motion.div>
      </section>

      <style>{`
        .av-service-detail { grid-template-columns: 1fr 1fr !important; }
        @media (max-width: 768px) {
          .av-service-detail { grid-template-columns: 1fr !important; direction: ltr !important; }
        }
      `}</style>
    </div>
  );
}
