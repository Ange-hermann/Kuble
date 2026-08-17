import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Video, ChevronDown, Globe, Shield, Bot, Cloud, Database } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import HoloCube from './HoloCube';
import { COLORS, FONTS } from '../theme/colors';

const serviceLinks = [
  { to: '/technologie',  label: 'Technologie',         icon: Globe,  desc: 'Web & Mobile' },
  { to: '/cybersecurite', label: 'Cybersécurité',       icon: Shield, desc: 'Audit & Protection' },
  { to: '/data',          label: 'Data & Analytics',    icon: Database, desc: 'Big Data & BI' },
  { to: '/ia',            label: 'Intelligence Artificielle', icon: Bot, desc: 'ML & Automatisation' },
  { to: '/cloud',         label: 'Cloud & Infrastructure', icon: Cloud, desc: 'AWS · Azure · K8s' },
];

const mainLinks = [
  { to: '/',          label: 'Accueil' },
  { to: '/a-propos',  label: 'À propos' },
  { to: '/contact',   label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [svcOpen, setSvcOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (to: string) => pathname === to;

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
          padding: '0 2rem', height: '70px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          transition: 'all 0.4s ease',
          background: scrolled ? 'rgba(10,22,80,0.92)' : 'rgba(10,22,80,0.4)',
          backdropFilter: 'blur(20px)',
          borderBottom: scrolled ? `1px solid ${COLORS.electric}44` : '1px solid transparent',
        }}
      >
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
          <HoloCube size={48} />
          <span style={{
            fontFamily: FONTS.display, fontWeight: 700, fontSize: '1.5rem',
            letterSpacing: '0.08em', textTransform: 'uppercase',
            background: `linear-gradient(135deg, ${COLORS.white} 0%, ${COLORS.cyan} 50%, ${COLORS.electric} 100%)`,
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            filter: `drop-shadow(0 0 8px ${COLORS.cyanGlow})`,
          }}>
            Kuble
          </span>
        </Link>

        {/* Desktop links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }} className="hidden-mobile">
          {mainLinks.map(link => (
            <Link key={link.to} to={link.to}
              style={{
                color: isActive(link.to) ? COLORS.cyan : COLORS.whiteSoft,
                textDecoration: 'none', fontFamily: FONTS.body, fontWeight: 500, fontSize: '0.9rem',
                transition: 'color 0.2s',
              }}>
              {link.label}
            </Link>
          ))}

          {/* Services dropdown */}
          <div
            onMouseEnter={() => setSvcOpen(true)}
            onMouseLeave={() => setSvcOpen(false)}
            style={{ position: 'relative' }}>
            <button style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: svcOpen ? COLORS.cyan : COLORS.whiteSoft,
              fontFamily: FONTS.body, fontWeight: 500, fontSize: '0.9rem',
              display: 'flex', alignItems: 'center', gap: 4, transition: 'color 0.2s',
            }}>
              Services <ChevronDown size={14} style={{ transform: svcOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
            </button>

            <AnimatePresence>
              {svcOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)',
                    marginTop: 12, minWidth: 320, padding: '0.5rem',
                    background: 'rgba(10,22,80,0.97)',
                    backdropFilter: 'blur(20px)',
                    border: `1px solid ${COLORS.electric}44`,
                    borderRadius: 14, boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
                  }}>
                  {serviceLinks.map(svc => {
                    const Icon = svc.icon;
                    return (
                      <Link key={svc.to} to={svc.to}
                        style={{
                          display: 'flex', alignItems: 'center', gap: 12,
                          padding: '0.75rem 1rem', borderRadius: 10, textDecoration: 'none',
                          transition: 'background 0.2s',
                        }}
                        onMouseEnter={e => (e.currentTarget.style.background = `${COLORS.electric}15`)}
                        onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                        <div style={{
                          width: 36, height: 36, borderRadius: 8,
                          background: `${COLORS.electric}18`, border: `1px solid ${COLORS.electric}33`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                        }}>
                          <Icon size={16} color={COLORS.cyan} />
                        </div>
                        <div>
                          <div style={{ fontFamily: FONTS.display, fontWeight: 600, fontSize: '0.88rem', color: COLORS.white }}>
                            {svc.label}
                          </div>
                          <div style={{ fontFamily: FONTS.body, fontSize: '0.75rem', color: COLORS.whiteDim }}>
                            {svc.desc}
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link to="/audiovisuel"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              color: COLORS.cyan, textDecoration: 'none',
              fontFamily: FONTS.body, fontWeight: 600, fontSize: '0.9rem',
              border: `1px solid ${COLORS.cyan}55`, borderRadius: 8, padding: '0.4rem 1rem',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = `${COLORS.cyan}15`; e.currentTarget.style.borderColor = COLORS.cyan; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = `${COLORS.cyan}55`; }}>
            <Video size={15} /> Studio
          </Link>

          <Link to="/contact"
            style={{
              background: COLORS.gradient, color: COLORS.white,
              padding: '0.5rem 1.3rem', borderRadius: 8,
              fontFamily: FONTS.display, fontWeight: 700, fontSize: '0.85rem',
              textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6,
              boxShadow: COLORS.glowCyan, transition: 'transform 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
            onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}>
            Démarrer un projet
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button onClick={() => setMenuOpen(!menuOpen)}
          style={{ background: 'none', border: 'none', color: COLORS.white, cursor: 'pointer', display: 'none', padding: 4 }}
          className="show-mobile">
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
              position: 'fixed', top: 70, right: 0, bottom: 0, width: '300px', zIndex: 999,
              background: 'rgba(6,13,46,0.97)', backdropFilter: 'blur(20px)',
              borderLeft: `1px solid ${COLORS.electric}33`,
              padding: '2rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem',
              overflowY: 'auto',
            }}>
            {mainLinks.map(link => (
              <Link key={link.to} to={link.to} onClick={() => setMenuOpen(false)}
                style={{
                  color: isActive(link.to) ? COLORS.cyan : COLORS.whiteSoft, textDecoration: 'none',
                  fontFamily: FONTS.display, fontWeight: 600, fontSize: '1.1rem', padding: '0.5rem 0',
                  borderBottom: `1px solid ${COLORS.electric}15`,
                }}>
                {link.label}
              </Link>
            ))}
            <div style={{ fontFamily: FONTS.mono, fontSize: '0.7rem', color: COLORS.cyan, letterSpacing: '0.15em', marginTop: 4 }}>
              SERVICES
            </div>
            {serviceLinks.map(svc => (
              <Link key={svc.to} to={svc.to} onClick={() => setMenuOpen(false)}
                style={{
                  color: COLORS.whiteSoft, textDecoration: 'none',
                  fontFamily: FONTS.body, fontWeight: 500, fontSize: '0.95rem', padding: '0.4rem 0',
                  display: 'flex', alignItems: 'center', gap: 10,
                }}>
                <svc.icon size={16} color={COLORS.cyan} /> {svc.label}
              </Link>
            ))}
            <Link to="/audiovisuel" onClick={() => setMenuOpen(false)}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                color: COLORS.cyan, textDecoration: 'none',
                fontFamily: FONTS.display, fontWeight: 600, fontSize: '1.1rem', padding: '0.5rem 0',
                borderBottom: `1px solid ${COLORS.cyan}22`,
              }}>
              <Video size={18} /> Studio Audiovisuel
            </Link>
            <Link to="/contact" onClick={() => setMenuOpen(false)}
              style={{
                background: COLORS.gradient, color: COLORS.white, padding: '0.75rem 2rem',
                borderRadius: 10, fontFamily: FONTS.display, fontWeight: 700, fontSize: '1rem',
                textDecoration: 'none', textAlign: 'center', marginTop: 8,
              }}>
              Démarrer un projet
            </Link>
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
