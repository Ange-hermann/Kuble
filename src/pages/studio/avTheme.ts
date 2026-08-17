// ═══════════════════════════════════════════════════════════
//  KUBLE STUDIO — Theme clair (indigo / corail / turquoise)
// ═══════════════════════════════════════════════════════════

export const AV = {
  // Fonds
  bg:          '#F0F0F8',
  bgAlt:       '#E8E8F5',
  bgTint:      '#EDE8FA',
  bgCoral:     '#FFF0F0',
  bgTurquoise: '#E8FAF8',
  white:       '#FFFFFF',

  // Primaire — indigo vibrant
  primary:     '#6C5CE7',
  primaryLt:   '#8B7FF0',
  primaryDk:   '#5A4BD1',

  // Accent — corail
  coral:       '#FF6B6B',
  coralLt:     '#FF8585',

  // Accent 2 — turquoise
  turquoise:   '#00D9C0',
  turquoiseLt: '#33E8D0',

  // Texte
  text:        '#1A1A2E',
  textSoft:    'rgba(26,26,46,0.7)',
  textDim:     'rgba(26,26,46,0.5)',
  textFaint:   'rgba(26,26,46,0.3)',

  // Dégradés
  gradient:    'linear-gradient(135deg, #6C5CE7 0%, #FF6B6B 100%)',
  gradientCool:'linear-gradient(135deg, #6C5CE7 0%, #00D9C0 100%)',
  gradientWarm:'linear-gradient(135deg, #FF6B6B 0%, #6C5CE7 100%)',
  gradientText:'linear-gradient(135deg, #6C5CE7 0%, #FF6B6B 50%, #00D9C0 100%)',

  // Ombres
  shadow:      '0 8px 30px rgba(108,92,231,0.08)',
  shadowHover: '0 16px 50px rgba(108,92,231,0.15)',
  shadowCoral: '0 8px 30px rgba(255,107,107,0.15)',

  // Glassmorphism clair
  glass:       'rgba(255,255,255,0.7)',
  glassBorder: 'rgba(108,92,231,0.12)',
} as const;

export const AV_FONTS = {
  display: "'Space Grotesk', sans-serif",
  body:    "'Inter', sans-serif",
  mono:    "'JetBrains Mono', monospace",
} as const;
