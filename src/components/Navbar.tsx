import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Video } from 'lucide-react';
import { Link } from 'react-router-dom';
import HoloCube from './HoloCube';

const navLinks = [
  { label: 'Accueil', href: '#hero' },
  { label: 'Services', href: '#services' },
  { label: 'Projets', href: '#projets' },
  { label: 'À propos', href: '#apropos' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (href: string) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
          padding: '0 2rem',
          height: '70px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          transition: 'all 0.4s ease',
          background: scrolled ? 'rgba(12,26,62,0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(77,158,255,0.25)' : 'none',
        }}
      >
        {/* Logo */}
        <motion.a
          href="#hero"
          onClick={(e) => { e.preventDefault(); handleNav('#hero'); }}
          style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}
          whileHover={{ scale: 1.04 }}
        >
          <HoloCube size={48} />
          <span style={{
            fontFamily: 'Space Grotesk',
            fontWeight: 700,
            fontSize: '1.5rem',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            background: 'linear-gradient(135deg, #ffffff 0%, #00BFFF 50%, #1A6BFF 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            filter: 'drop-shadow(0 0 8px rgba(0,191,255,0.5))',
          }}>
            Kuble
          </span>
        </motion.a>

        {/* Desktop links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }} className="hidden-mobile">
          {navLinks.map((link) => (
            <motion.a
              key={link.href}
              href={link.href}
              onClick={(e) => { e.preventDefault(); handleNav(link.href); }}
              whileHover={{ color: '#00A3FF' }}
              style={{
                color: 'rgba(232,244,255,0.8)', textDecoration: 'none',
                fontFamily: 'Inter', fontWeight: 500, fontSize: '0.9rem',
                transition: 'color 0.2s',
              }}
            >
              {link.label}
            </motion.a>
          ))}
          <Link
            to="/audiovisuel"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              color: '#00C2FF', textDecoration: 'none',
              fontFamily: 'Inter', fontWeight: 600, fontSize: '0.9rem',
              border: '1px solid rgba(0,194,255,0.35)',
              borderRadius: 8, padding: '0.4rem 1rem',
              transition: 'all 0.2s',
            }}
          >
            <Video size={15} /> Studio
          </Link>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleNav('#contact')}
            className="btn-cta"
          >
            Démarrer un projet
          </motion.button>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: 'none', border: 'none', color: '#E8F4FF',
            cursor: 'pointer', display: 'none', padding: 4,
          }}
          className="show-mobile"
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            style={{
              position: 'fixed', top: 70, right: 0, bottom: 0,
              width: '280px', zIndex: 999,
              background: 'rgba(2,8,24,0.97)',
              backdropFilter: 'blur(20px)',
              borderLeft: '1px solid rgba(26,107,255,0.2)',
              padding: '2rem 1.5rem',
              display: 'flex', flexDirection: 'column', gap: '1.5rem',
            }}
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNav(link.href); }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
                style={{
                  color: 'rgba(232,244,255,0.85)', textDecoration: 'none',
                  fontFamily: 'Space Grotesk', fontWeight: 600, fontSize: '1.1rem',
                  padding: '0.5rem 0',
                  borderBottom: '1px solid rgba(26,107,255,0.1)',
                }}
              >
                {link.label}
              </motion.a>
            ))}
            <Link
              to="/audiovisuel"
              onClick={() => setMenuOpen(false)}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                color: '#00C2FF', textDecoration: 'none',
                fontFamily: 'Space Grotesk', fontWeight: 600, fontSize: '1.1rem',
                padding: '0.5rem 0',
                borderBottom: '1px solid rgba(0,194,255,0.2)',
              }}
            >
              <Video size={18} /> Studio Audiovisuel
            </Link>
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              onClick={() => handleNav('#contact')}
              className="btn-cta"
              style={{ marginTop: '1rem' }}
            >
              Démarrer un projet
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (min-width: 769px) { .show-mobile { display: none !important; } }
        @media (max-width: 768px) { .hidden-mobile { display: none !important; } .show-mobile { display: block !important; } }
      `}</style>
    </>
  );
}
