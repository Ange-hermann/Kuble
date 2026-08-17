// ═══════════════════════════════════════════════════════════
//  KUBLE — Charte graphique principale
//  Bleu marine profond · Bleu électrique · Cyan lumineux
// ═══════════════════════════════════════════════════════════

export const COLORS = {
  // Fonds sombres
  navyDeep:   '#0A1650',
  navyDark:   '#0D1B4C',
  navyDarker: '#060D2E',
  navyBlack:  '#030616',

  // Accents vifs
  electric:   '#1B6FE0',
  electricLt: '#2A7DE8',

  // Lueurs / dégradés
  cyan:       '#5BC8F2',
  cyanBright: '#7DD5F5',
  cyanGlow:   'rgba(91,200,242,0.35)',

  // Texte
  white:      '#FFFFFF',
  whiteSoft:  'rgba(255,255,255,0.85)',
  whiteDim:   'rgba(255,255,255,0.55)',
  whiteFaint: 'rgba(255,255,255,0.3)',

  // Fond clair (dégradé pale → blanc)
  bgLight:    'linear-gradient(180deg, #E8F0FE 0%, #F5F9FF 40%, #FFFFFF 100%)',
  bgPale:     '#E8F0FE',

  // Utilitaires
  gradient:   'linear-gradient(135deg, #1B6FE0 0%, #5BC8F2 100%)',
  gradientDeep:'linear-gradient(135deg, #0A1650 0%, #0D1B4C 50%, #1B6FE0 100%)',
  glowBlue:   '0 0 40px rgba(27,111,224,0.3)',
  glowCyan:   '0 0 30px rgba(91,200,242,0.4)',
} as const;

// ═══════════════════════════════════════════════════════════
//  KUBLE STUDIO — Charte AudioVisuel
//  Or · Bleu nuit · Néon cyan
// ═══════════════════════════════════════════════════════════

export const AV_COLORS = {
  gold:       '#e8c84a',
  goldGlow:   'rgba(232,200,74,0.35)',
  blue:       '#4d9eff',
  neon:       '#33d4ff',
  neonGlow:   'rgba(51,212,255,0.35)',
  dark:       '#0A0A0A',
  darkBlue:   '#071228',
  white:      '#FFFFFF',
  gradient:   'linear-gradient(135deg, #4d9eff 0%, #e8c84a 100%)',
  gradientNeon:'linear-gradient(135deg, #33d4ff 0%, #4d9eff 100%)',
} as const;

// ═══════════════════════════════════════════════════════════
//  Animations partagées (Framer Motion)
// ═══════════════════════════════════════════════════════════

export const MOTION = {
  fadeInUp: {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-80px' },
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
  fadeIn: {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true },
    transition: { duration: 0.6 },
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.9 },
    whileInView: { opacity: 1, scale: 1 },
    viewport: { once: true, margin: '-50px' },
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
  slideInLeft: {
    initial: { opacity: 0, x: -60 },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true, margin: '-80px' },
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
  slideInRight: {
    initial: { opacity: 0, x: 60 },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true, margin: '-80px' },
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
} as const;

// ═══════════════════════════════════════════════════════════
//  Polices
// ═══════════════════════════════════════════════════════════

export const FONTS = {
  display:  "'Space Grotesk', sans-serif",
  body:     "'Inter', sans-serif",
  mono:     "'JetBrains Mono', monospace",
} as const;
