import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Menu, X, Phone, ArrowLeft } from 'lucide-react';

const navLinks = [
  { label: 'Accueil', href: '#av-hero' },
  { label: 'Services', href: '#av-services' },
  { label: 'Réalisations', href: '#av-portfolio' },
  { label: 'À propos', href: '#av-process' },
  { label: 'Contact', href: '#av-contact' },
];

const G = '#e8c84a';
const BLUE = '#4d9eff';

export default function AVNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const go = (href: string) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80 }} animate={{ y: 0 }} transition={{ duration: 0.6 }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
          height: 70, padding: '0 2.5rem',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          background: scrolled ? 'rgba(12,26,62,0.97)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? `1px solid ${BLUE}44` : 'none',
          transition: 'all 0.4s ease',
        }}
      >
        {/* Logo + LIVE */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <a href="#av-hero" onClick={e => { e.preventDefault(); go('#av-hero'); }}
            style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontFamily: 'Space Grotesk', fontWeight: 800, fontSize: '1.4rem', display: 'flex', alignItems: 'baseline', gap: 0 }}>
              <span style={{ color: '#fff' }}>KU</span><span style={{ color: BLUE }}>BLE</span><span style={{ color: G }}> Studio</span>
            </span>
          </a>
          {/* LIVE indicator */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <motion.div animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 1.2, repeat: Infinity }}
              style={{ width: 8, height: 8, borderRadius: '50%', background: '#ff3b3b', boxShadow: '0 0 8px #ff3b3b' }} />
            <span style={{ fontFamily: 'JetBrains Mono', fontSize: '0.65rem', color: '#ff3b3b', letterSpacing: '0.15em', fontWeight: 700 }}>LIVE</span>
          </div>
        </div>

        {/* Desktop links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }} className="av-desktop-nav">
          {navLinks.map(l => (
            <a key={l.label} href={l.href} onClick={e => { e.preventDefault(); go(l.href); }}
              style={{ fontFamily: 'Inter', fontSize: '0.9rem', color: 'rgba(255,255,255,0.8)', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = G)}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.8)')}
            >{l.label}</a>
          ))}
        </div>

        {/* CTA + Hamburger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Link to="/" className="av-desktop-nav"
            style={{
              display: 'flex', alignItems: 'center', gap: 5,
              color: 'rgba(255,255,255,0.6)', textDecoration: 'none',
              fontFamily: 'Inter', fontSize: '0.82rem', border: '1px solid rgba(255,255,255,0.18)',
              borderRadius: 8, padding: '0.45rem 0.9rem', transition: 'all 0.2s',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#fff'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.4)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.6)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.18)'; }}>
            <ArrowLeft size={13} /> Retour au site
          </Link>
          <motion.a href="#av-contact" onClick={e => { e.preventDefault(); go('#av-contact'); }}
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}
            style={{
              background: `linear-gradient(135deg, ${BLUE}, ${G})`, color: '#0c1a3e', padding: '0.5rem 1.3rem',
              borderRadius: 8, fontFamily: 'Space Grotesk', fontWeight: 700,
              fontSize: '0.85rem', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6,
            }} className="av-desktop-nav">
            <Phone size={14} /> Démarrer un projet
          </motion.a>
          <button onClick={() => setOpen(!open)} className="av-mobile-only"
            style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#fff', padding: 4 }}>
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
              background: 'rgba(12,26,62,0.98)', backdropFilter: 'blur(20px)', border: `1px solid ${BLUE}22`,
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '2rem',
            }}>
            {navLinks.map((l, i) => (
              <motion.a key={l.label} href={l.href}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
                onClick={e => { e.preventDefault(); go(l.href); }}
                style={{ fontFamily: 'Space Grotesk', fontSize: '1.8rem', fontWeight: 700, color: '#fff', textDecoration: 'none' }}
                onMouseEnter={e => (e.currentTarget.style.color = G)}
                onMouseLeave={e => (e.currentTarget.style.color = '#fff')}
              >{l.label}</motion.a>
            ))}
            <motion.a href="#av-contact" onClick={e => { e.preventDefault(); go('#av-contact'); }}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
              style={{ background: `linear-gradient(135deg, ${BLUE}, ${G})`, color: '#0c1a3e', padding: '0.75rem 2rem', borderRadius: 10, fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: '1rem', textDecoration: 'none', marginTop: 8 }}>
              Démarrer un projet
            </motion.a>
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
