import { motion } from 'framer-motion';
import { ExternalLink, MessageCircle } from 'lucide-react';

const LinkedInSvg = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
  </svg>
);
const TikTokSvg = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"/>
  </svg>
);
const FacebookSvg = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const links = {
  Services: ['Développement Web', 'Applications Mobiles', 'Cybersécurité', 'Intelligence Artificielle', 'Cloud & Infrastructure'],
  Entreprise: ['À propos', 'Nos projets', 'Notre équipe', 'Partenaires', 'Carrières'],
  Légal: ['Mentions légales', 'Politique de confidentialité', 'CGU', 'Cookies'],
};

const socials = [
  { icon: TikTokSvg,    label: 'TikTok',    href: 'https://www.tiktok.com/@kuble.ai?_r=1&_t=ZN-97S9Daj4eIg', color: '#E8F4FF' },
  { icon: FacebookSvg,  label: 'Facebook',  href: 'https://www.facebook.com/share/17cHPhvkhS/?mibextid=wwXIfr', color: '#1877F2' },
  { icon: LinkedInSvg,  label: 'LinkedIn',  href: '#', color: '#0A66C2' },
  { icon: MessageCircle,label: 'WhatsApp',  href: 'https://wa.me/2250788043360', color: '#25D366' },
];

export default function Footer() {
  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer style={{
      background: '#020818',
      borderTop: '1px solid rgba(26,107,255,0.15)',
      padding: '4rem 2rem 2rem',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Top row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '3rem',
          marginBottom: '3rem',
        }}>
          {/* Brand */}
          <div style={{ gridColumn: 'span 1' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '1rem' }}>
              <motion.div
                animate={{ rotateY: [0, 360] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                style={{
                  width: 36, height: 36,
                  background: 'linear-gradient(135deg, #1A6BFF, #00A3FF)',
                  borderRadius: 6,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 0 16px rgba(0,163,255,0.4)',
                }}
              >
                <span style={{ color: '#fff', fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: 14 }}>K</span>
              </motion.div>
              <span style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: '1.4rem', color: '#E8F4FF' }}>
                Kuble
              </span>
            </div>
            <p style={{ fontFamily: 'JetBrains Mono', fontSize: '0.72rem', color: '#00A3FF', letterSpacing: '0.12em', marginBottom: '1rem' }}>
              CONNECTER · ORCHESTRER · PROPULSER
            </p>
            <p style={{ fontFamily: 'Inter', fontSize: '0.85rem', color: 'rgba(232,244,255,0.55)', lineHeight: 1.7, maxWidth: 240 }}>
              Technologie Made in Africa — au service de la transformation numérique du continent.
            </p>

            {/* Socials */}
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
              {socials.map((s) => {
                const Icon = s.icon;
                return (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    whileHover={{ scale: 1.15, color: s.color }}
                    style={{
                      width: 38, height: 38, borderRadius: 8,
                      background: 'rgba(26,107,255,0.08)',
                      border: '1px solid rgba(26,107,255,0.2)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: 'rgba(232,244,255,0.6)',
                      transition: 'all 0.25s',
                      cursor: 'pointer', textDecoration: 'none',
                    }}
                  >
                    <Icon size={17} />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <h4 style={{
                fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: '0.9rem',
                color: '#E8F4FF', marginBottom: '1rem',
                paddingBottom: '0.5rem',
                borderBottom: '1px solid rgba(26,107,255,0.2)',
              }}>
                {category}
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      onClick={(e) => { e.preventDefault(); scrollTo('#hero'); }}
                      style={{
                        fontFamily: 'Inter', fontSize: '0.85rem',
                        color: 'rgba(232,244,255,0.55)',
                        textDecoration: 'none',
                        transition: 'color 0.2s',
                        display: 'inline-flex', alignItems: 'center', gap: 4,
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = '#00A3FF')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(232,244,255,0.55)')}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(26,107,255,0.3), rgba(212,175,55,0.3), transparent)', marginBottom: '2rem' }} />

        {/* Bottom row */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: '1rem',
        }}>
          <span style={{ fontFamily: 'Inter', fontSize: '0.82rem', color: 'rgba(232,244,255,0.4)' }}>
            © 2025 Kuble — Tous droits réservés
          </span>
          <span style={{ fontFamily: 'JetBrains Mono', fontSize: '0.78rem', color: 'rgba(232,244,255,0.4)' }}>
            Made with <span style={{ color: '#1A6BFF' }}>💙</span> in Abidjan
          </span>
          <div style={{ display: 'flex', gap: '1rem' }}>
            {['Mentions légales', 'Confidentialité'].map((item) => (
              <a
                key={item}
                href="#"
                style={{
                  fontFamily: 'Inter', fontSize: '0.78rem',
                  color: 'rgba(232,244,255,0.4)',
                  textDecoration: 'none',
                  display: 'flex', alignItems: 'center', gap: 4,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#00A3FF')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(232,244,255,0.4)')}
              >
                {item} <ExternalLink size={10} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
