import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, ArrowLeft } from 'lucide-react';
import { AV, AV_FONTS } from './avTheme';

const navLinks = [
  { label: 'Accueil', to: '/audiovisuel' },
  { label: 'À propos', to: '/audiovisuel/a-propos' },
  { label: 'Services', to: '/audiovisuel/services' },
  { label: 'Portfolio', to: '/audiovisuel/portfolio' },
  { label: 'Blog', to: '/audiovisuel/blog' },
  { label: 'Contact', to: '/audiovisuel/contact' },
];

export default function AVNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const { pathname } = useLocation();
  const isActive = (to: string) => pathname === to;

  return (
    <>
      <motion.nav
        initial={{ y: -80 }} animate={{ y: 0 }} transition={{ duration: 0.6 }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
          height: 70, padding: '0 2.5rem',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          background: scrolled ? 'rgba(255,255,255,0.9)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? `1px solid ${AV.glassBorder}` : 'none',
          transition: 'all 0.4s ease',
        }}
      >
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <Link to="/audiovisuel"
            style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontFamily: AV_FONTS.display, fontWeight: 800, fontSize: '1.4rem', display: 'flex', alignItems: 'baseline', gap: 0 }}>
              <span style={{ color: AV.text }}>KU</span><span style={{ color: AV.primary }}>BLE</span><span style={{ color: AV.coral, fontSize: '1rem' }}> Studio</span>
            </span>
          </Link>
        </div>

        {/* Desktop links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.75rem' }} className="av-desktop-nav">
          {navLinks.map(l => (
            <Link key={l.label} to={l.to}
              style={{
                fontFamily: AV_FONTS.body, fontSize: '0.88rem', fontWeight: 500,
                color: isActive(l.to) ? AV.primary : AV.textSoft,
                textDecoration: 'none', transition: 'color 0.2s',
                position: 'relative',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = AV.primary)}
              onMouseLeave={e => { if (!isActive(l.to)) e.currentTarget.style.color = AV.textSoft; }}
            >{l.label}</Link>
          ))}
        </div>

        {/* CTA + Hamburger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Link to="/" className="av-desktop-nav"
            style={{
              display: 'flex', alignItems: 'center', gap: 5,
              color: AV.textDim, textDecoration: 'none',
              fontFamily: AV_FONTS.body, fontSize: '0.82rem',
              border: `1px solid ${AV.glassBorder}`, borderRadius: 8,
              padding: '0.45rem 0.9rem', transition: 'all 0.2s',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = AV.text; (e.currentTarget as HTMLElement).style.borderColor = AV.primary + '40'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = AV.textDim; (e.currentTarget as HTMLElement).style.borderColor = AV.glassBorder; }}>
            <ArrowLeft size={13} /> Retour
          </Link>
          <Link to="/audiovisuel/contact" className="av-desktop-nav"
            style={{
              background: AV.gradient, color: '#fff',
              padding: '0.5rem 1.3rem', borderRadius: 10,
              fontFamily: AV_FONTS.display, fontWeight: 700, fontSize: '0.85rem',
              textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6,
              boxShadow: `0 4px 16px ${AV.primary}33`,
              transition: 'all 0.3s',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 24px ${AV.primary}44`; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 16px ${AV.primary}33`; }}>
            <Phone size={14} /> Démarrer un projet
          </Link>
          <button onClick={() => setOpen(!open)} className="av-mobile-only"
            style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: AV.text, padding: 4 }}>
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{
              position: 'fixed', inset: 0, zIndex: 199,
              background: 'rgba(255,255,255,0.98)', backdropFilter: 'blur(20px)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1.75rem',
            }}>
            {navLinks.map((l, i) => (
              <motion.div key={l.label}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
                <Link to={l.to} onClick={() => setOpen(false)}
                  style={{
                    fontFamily: AV_FONTS.display, fontSize: '1.6rem', fontWeight: 700,
                    color: isActive(l.to) ? AV.primary : AV.text, textDecoration: 'none',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = AV.primary)}
                  onMouseLeave={e => { if (!isActive(l.to)) e.currentTarget.style.color = AV.text; }}
                >{l.label}</Link>
              </motion.div>
            ))}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
              <Link to="/audiovisuel/contact" onClick={() => setOpen(false)}
                style={{
                  background: AV.gradient, color: '#fff', padding: '0.75rem 2rem',
                  borderRadius: 12, fontFamily: AV_FONTS.display, fontWeight: 700, fontSize: '1rem',
                  textDecoration: 'none', marginTop: 8, display: 'inline-flex', alignItems: 'center', gap: 6,
                  boxShadow: `0 8px 24px ${AV.primary}33`,
                }}>
                <Phone size={16} /> Démarrer un projet
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .av-desktop-nav { display: flex !important; }
        .av-mobile-only { display: none !important; }
        @media (max-width: 768px) {
          .av-desktop-nav { display: none !important; }
          .av-mobile-only { display: block !important; }
        }
      `}</style>
    </>
  );
}
