import { useState } from 'react';
import { motion } from 'framer-motion';
const G = '#e8c84a';
const BLUE = '#4d9eff';

const socials = [
  { svg: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>, href: '#', label: 'Instagram' },
  { svg: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>, href: 'https://www.facebook.com/share/17cHPhvkhS/?mibextid=wwXIfr', label: 'Facebook' },
  { svg: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"/></svg>, href: 'https://www.tiktok.com/@kuble.ai?_r=1&_t=ZN-97S9Daj4eIg', label: 'TikTok' },
  { svg: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>, href: '#', label: 'LinkedIn' },
];

export default function AVFooter() {
  const [email, setEmail] = useState('');
  const [subbed, setSubbed] = useState(false);

  return (
    <footer style={{ background: '#06102a', borderTop: `2px solid ${BLUE}44` }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '4rem 2rem 2rem' }}>
        {/* 4 colonnes */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '3rem', marginBottom: '3rem' }} className="av-footer-grid">
          {/* Logo + slogan */}
          <div>
            <div style={{ fontFamily: 'Space Grotesk', fontWeight: 800, fontSize: '1.5rem', marginBottom: 10 }}>
              <span style={{ background: `linear-gradient(135deg, #fff, ${BLUE}, ${G})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>KUBLE</span>
              <span style={{ color: G }}> Studio</span>
            </div>
            <p style={{ fontFamily: 'Inter', fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              Votre agence audiovisuelle de référence en Côte d'Ivoire.
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              {socials.map(s => (
                <motion.a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  whileHover={{ scale: 1.15 }}
                  style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(80,160,255,0.1)', border: `1px solid ${BLUE}25`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>
                  {s.svg}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 style={{ fontFamily: 'Space Grotesk', fontWeight: 700, color: '#fff', marginBottom: '1rem', fontSize: '0.95rem' }}>Services</h4>
            {['Production Vidéo', 'Couverture Médiatique', 'Photographie', 'Gestion Réseaux', 'Production Audio', 'Publicité & Spots'].map(s => (
              <a key={s} href="#av-services" onClick={e => { e.preventDefault(); document.querySelector('#av-services')?.scrollIntoView({ behavior: 'smooth' }); }}
                style={{ display: 'block', fontFamily: 'Inter', fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', textDecoration: 'none', marginBottom: 8, transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = G)}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}>{s}</a>
            ))}
          </div>

          {/* Liens rapides */}
          <div>
            <h4 style={{ fontFamily: 'Space Grotesk', fontWeight: 700, color: '#fff', marginBottom: '1rem', fontSize: '0.95rem' }}>Liens rapides</h4>
            {[['À propos', '#av-process'], ['Portfolio', '#av-portfolio'], ['Blog', '#av-blog'], ['Contact', '#av-contact']].map(([label, href]) => (
              <a key={label} href={href} onClick={e => { e.preventDefault(); document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' }); }}
                style={{ display: 'block', fontFamily: 'Inter', fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', textDecoration: 'none', marginBottom: 8, transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = G)}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}>{label}</a>
            ))}
          </div>

          {/* Newsletter */}
          <div>
            <h4 style={{ fontFamily: 'Space Grotesk', fontWeight: 700, color: '#fff', marginBottom: '1rem', fontSize: '0.95rem' }}>Newsletter</h4>
            <p style={{ fontFamily: 'Inter', fontSize: '0.82rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, marginBottom: '1rem' }}>
              Recevez nos conseils et actualités chaque semaine.
            </p>
            {subbed ? (
              <p style={{ fontFamily: 'Inter', fontSize: '0.85rem', color: G }}>✓ Vous êtes abonné !</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <input value={email} onChange={e => setEmail(e.target.value)} placeholder="votre@email.com"
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 8, padding: '0.6rem 0.9rem', color: '#fff', fontFamily: 'Inter', fontSize: '0.85rem', outline: 'none' }} />
                <motion.button whileHover={{ scale: 1.03 }} onClick={() => email && setSubbed(true)}
                  style={{ background: `linear-gradient(135deg,${BLUE},${G})`, color: '#0c1a3e', border: 'none', borderRadius: 8, padding: '0.6rem', fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer' }}>
                  S'abonner
                </motion.button>
              </div>
            )}
          </div>
        </div>

        {/* Bas */}
        <div style={{ borderTop: `1px solid ${BLUE}22`, paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <span style={{ fontFamily: 'Inter', fontSize: '0.8rem', color: 'rgba(255,255,255,0.35)' }}>
            © 2025 Kuble Studio — Tous droits réservés · Made with 🎬 in Abidjan
          </span>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            {['Mentions légales', 'Politique de confidentialité'].map(l => (
              <a key={l} href="#" style={{ fontFamily: 'Inter', fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)', textDecoration: 'none' }}
                onMouseEnter={e => (e.currentTarget.style.color = G)}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.3)')}>{l}</a>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        .av-footer-grid { grid-template-columns: repeat(4,1fr) !important; }
        @media (max-width: 900px) { .av-footer-grid { grid-template-columns: repeat(2,1fr) !important; } }
        @media (max-width: 560px)  { .av-footer-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </footer>
  );
}
