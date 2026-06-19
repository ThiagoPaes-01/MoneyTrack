import { StyleSheet, Dimensions, Platform } from "react-native";

const { width } = Dimensions.get('window');

const BREAKPOINTS = { mobile: 0, tablet: 768, desktop: 1024, wide: 1440 };
const isMobile = width < BREAKPOINTS.tablet;
const isTablet = width >= BREAKPOINTS.tablet && width < BREAKPOINTS.desktop;
const isDesktop = width >= BREAKPOINTS.desktop;

const responsive = (mobile, tablet = mobile, desktop = tablet) => {
  if (isMobile) return mobile;
  if (isTablet) return tablet;
  return desktop;
};

// ── Tokens ────────────────────────────────────────────────────────
const t = {
  bg:        "#07090f",       // azul-noite profundo
  bgCard:    "#0e1118",       // card levemente mais claro
  bgCardHov: "#131720",
  green:     "#1db06a",       // verde mais maduro, menos néon
  greenDim:  "#155e3d",       // verde escuro para bordas
  greenGlow: "rgba(29,176,106,0.18)",
  gold:      "#c4943a",       // dourado para números/dinheiro
  goldDim:   "rgba(196,148,58,0.15)",
  white:     "#f0f4ff",       // branco levemente azulado
  muted:     "rgba(220,228,255,0.82)",
  mutedLow:  "rgba(220,228,255,0.55)",
  border:    "rgba(200,210,240,0.07)",
  borderGreen: "rgba(29,176,106,0.35)",
};

export const styles = StyleSheet.create({

  containerMain: { flex: 1, backgroundColor: t.bg },

  // ── Hero ──────────────────────────────────────────────────────
  containerHero: {
    backgroundColor: t.bg,
    paddingHorizontal: responsive(24, 48, 88),
    paddingTop: responsive(72, 88, 112),
    paddingBottom: responsive(48, 64, 88),
    maxWidth: isDesktop ? 1440 : '100%',
    alignSelf: 'center',
    width: '100%',
  },

  badgeOpenFinance: {
    alignSelf: "flex-start",
    backgroundColor: t.greenDim + "33",
    borderWidth: 1,
    borderColor: t.borderGreen,
    borderRadius: 6,
    paddingHorizontal: responsive(12, 14, 16),
    paddingVertical: responsive(5, 6, 7),
    marginBottom: responsive(28, 36, 44),
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  badgeOpenFinanceText: {
    fontSize: responsive(11, 12, 12),
    fontWeight: "600",
    color: t.green,
    letterSpacing: 1.2,
    textTransform: "uppercase",
  },

  heroTitle: {
    fontSize: responsive(52, 68, 88),
    fontWeight: "900",
    color: t.white,
    lineHeight: responsive(56, 74, 94),
    marginBottom: responsive(24, 32, 36),
    letterSpacing: -2,
    textAlign: "left",
  },

  heroTitleSegredos: {
    color: t.green,
    fontWeight: "900",
  },

  heroSubtitle: {
    fontSize: responsive(16, 17, 19),
    color: t.muted,
    lineHeight: responsive(26, 28, 32),
    marginBottom: responsive(40, 48, 56),
    textAlign: "left",
    maxWidth: 540,
  },

  headerTop: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 20,
    marginBottom: responsive(32, 40, 52),
    flexWrap: "wrap",
  },

  logo: {
    width: responsive(180, 210, 240),
    height: responsive(72, 84, 96),
    resizeMode: "contain",
  },

  containerButtons: {
    backgroundColor: "transparent",
    flexDirection: responsive("column", "row", "row"),
    justifyContent: "flex-start",
    alignItems: responsive("stretch", "center", "center"),
    gap: responsive(12, 16, 16),
    width: "100%",
  },

  // ── Stats ─────────────────────────────────────────────────────
  containerStats: {
    backgroundColor: t.bg,
    paddingHorizontal: responsive(24, 48, 88),
    paddingBottom: responsive(64, 72, 88),
    paddingTop: responsive(16, 24, 32),
    borderTopWidth: 1,
    borderTopColor: t.border,
    flexDirection: responsive("column", "row", "row"),
    justifyContent: responsive("flex-start", "flex-start", "flex-start"),
    gap: responsive(32, 56, 80),
    maxWidth: isDesktop ? 1440 : '100%',
    alignSelf: 'center',
    width: '100%',
  },

  statItem: { flexDirection: "column", gap: 4, alignItems: "flex-start" },

  statNumber: {
    fontSize: responsive(36, 44, 52),
    fontWeight: "800",
    color: t.gold,       // dourado — números de dinheiro/valor
    letterSpacing: -1,
  },

  statLabel: {
    fontSize: responsive(12, 13, 14),
    color: t.mutedLow,
    fontWeight: "500",
    letterSpacing: 0.3,
  },

  // ── Section header genérico ────────────────────────────────────
  containerSectionHeader: {
    alignItems: "center",
    backgroundColor: t.bg,
    paddingHorizontal: responsive(24, 48, 88),
    paddingTop: responsive(56, 64, 80),
    paddingBottom: responsive(32, 40, 48),
    maxWidth: isDesktop ? 1440 : '100%',
    alignSelf: 'center',
    width: '100%',
  },

  sectionTag: {
    alignSelf: "center",
    backgroundColor: t.greenDim + "22",
    borderWidth: 1,
    borderColor: t.borderGreen,
    borderRadius: 6,
    paddingHorizontal: responsive(12, 14, 16),
    paddingVertical: responsive(5, 6, 7),
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  sectionTagText: {
    fontSize: responsive(10, 11, 11),
    fontWeight: "700",
    color: t.green,
    letterSpacing: 1.5,
    textTransform: "uppercase",
  },

  sectionTitle: {
    fontSize: responsive(36, 46, 56),
    fontWeight: "800",
    color: t.white,
    marginBottom: 16,
    lineHeight: responsive(42, 54, 64),
    textAlign: "center",
    letterSpacing: -1,
    maxWidth: isDesktop ? 800 : '100%',
  },

  sectionTitleHighlight: { color: t.green, fontWeight: "800" },

  sectionSubtitle: {
    fontSize: responsive(14, 15, 16),
    color: t.muted,
    lineHeight: responsive(22, 25, 28),
    textAlign: "center",
    maxWidth: isDesktop ? 640 : '100%',
  },

  // ── Grid Funcionalidades ───────────────────────────────────────
  containerFuncionalidades: {
    backgroundColor: t.bg,
    paddingHorizontal: responsive(16, 32, 88),
    paddingBottom: responsive(16, 24, 32),
    flexDirection: isDesktop ? "row" : "column",
    flexWrap: isDesktop ? "wrap" : "nowrap",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: responsive(12, 16, 16),
    maxWidth: isDesktop ? 1440 : "100%",
    alignSelf: "center",
    width: "100%",
  },

  // ── Como Funciona header ───────────────────────────────────────
  containerComoFuncionaHeader: {
    backgroundColor: t.bg,
    alignItems: "center",
    paddingHorizontal: responsive(24, 48, 88),
    paddingTop: responsive(24, 32, 48),
    paddingBottom: responsive(40, 48, 60),
    maxWidth: isDesktop ? 1440 : '100%',
    alignSelf: 'center',
    width: '100%',
  },

  // ── Passos ────────────────────────────────────────────────────
  containerPassos: {
    backgroundColor: t.bg,
    paddingHorizontal: responsive(24, 48, 88),
    paddingBottom: responsive(64, 72, 96),
    gap: responsive(12, 16, 20),
    flexDirection: responsive("column", "row", "row"),
    flexWrap: "nowrap",
    justifyContent: "center",
    alignItems: "stretch",
    maxWidth: isDesktop ? 1440 : "100%",
    alignSelf: "center",
    width: "100%",
  },

  cardPasso: {
    flex: isDesktop ? 1 : undefined,
    width: isMobile ? "100%" : undefined,
    backgroundColor: t.bgCard,
    borderRadius: responsive(16, 20, 20),
    borderWidth: 1,
    borderColor: t.border,
    padding: responsive(20, 24, 28),
    alignItems: "center",
    gap: 14,
  },

  passoBadge: {
    width: responsive(44, 52, 56),
    height: responsive(44, 52, 56),
    borderRadius: 12,              // quadrado arredondado, não círculo
    backgroundColor: t.greenDim,
    borderWidth: 1,
    borderColor: t.borderGreen,
    alignItems: "center",
    justifyContent: "center",
  },

  passoText: {
    color: t.green,
    fontSize: responsive(18, 22, 24),
    fontWeight: "800",
    letterSpacing: -0.5,
  },

  passoContent: { alignItems: "center", gap: 8 },

  passoTitle: {
    color: t.white,
    fontSize: responsive(14, 15, 16),
    fontWeight: "700",
    textAlign: "center",
    letterSpacing: -0.2,
  },

  passoDesc: {
    color: t.muted,
    fontSize: responsive(12, 13, 14),
    lineHeight: responsive(19, 21, 22),
    textAlign: "center",
  },

  // ── Planos header ─────────────────────────────────────────────
  containerPlanosHeader: {
    backgroundColor: t.bg,
    paddingHorizontal: responsive(24, 48, 88),
    paddingTop: responsive(64, 72, 88),
    paddingBottom: responsive(32, 40, 48),
    alignItems: "center",
    maxWidth: isDesktop ? 1440 : '100%',
    alignSelf: 'center',
    width: '100%',
  },

  sectionTagCenter: {
    alignSelf: "center",
    backgroundColor: t.greenDim + "22",
    borderWidth: 1,
    borderColor: t.borderGreen,
    borderRadius: 6,
    paddingHorizontal: responsive(12, 14, 16),
    paddingVertical: responsive(5, 6, 7),
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  sectionTitleCenter: {
    fontSize: responsive(36, 46, 56),
    fontWeight: "800",
    color: t.white,
    marginBottom: 12,
    textAlign: "center",
    lineHeight: responsive(42, 52, 62),
    letterSpacing: -1,
  },

  sectionSubtitleCenter: {
    fontSize: responsive(14, 15, 16),
    color: t.muted,
    lineHeight: responsive(22, 24, 28),
    textAlign: "center",
    paddingHorizontal: 8,
    maxWidth: isDesktop ? 600 : '100%',
  },

  // ── Cards Planos ──────────────────────────────────────────────
  containerPlanos: {
    backgroundColor: t.bg,
    paddingHorizontal: responsive(16, 32, 60),
    paddingBottom: responsive(72, 88, 112),
    paddingTop: 8,
    flexDirection: responsive("column", "column", "row"),
    justifyContent: "center",
    alignItems: responsive("center", "center", "stretch"),
    gap: responsive(14, 18, 16),
    width: responsive("100%", "90%", "80%"),
    maxWidth: isDesktop ? 960 : '100%',
    alignSelf: "center",
  },

  cardPlano: {
    flex: isDesktop ? 1 : undefined,
    width: isMobile ? '100%' : isTablet ? '80%' : undefined,
    maxWidth: isMobile ? 400 : undefined,
    backgroundColor: t.bgCard,
    borderRadius: responsive(16, 18, 20),
    borderWidth: 1,
    borderColor: t.border,
    padding: responsive(20, 24, 28),
  },

  cardPlanoDestaque: {
    flex: isDesktop ? 1 : undefined,
    width: isMobile ? '100%' : isTablet ? '80%' : undefined,
    maxWidth: isMobile ? 400 : undefined,
    backgroundColor: t.bgCard,
    borderRadius: responsive(16, 18, 20),
    borderWidth: 1,
    borderColor: t.green,          // borda verde sólida no destaque
    padding: responsive(20, 24, 28),
    ...(isDesktop && {
      transform: [{ scale: 1.03 }],
      shadowColor: t.green,
      shadowOpacity: 0.25,
      shadowRadius: 24,
      elevation: 10,
    }),
  },

  planoMaisPopular: {
    alignSelf: "center",
    backgroundColor: t.green,
    borderRadius: 6,
    paddingHorizontal: responsive(14, 16, 18),
    paddingVertical: responsive(4, 5, 6),
    marginBottom: 18,
  },

  planoMaisPopularText: {
    fontSize: responsive(10, 11, 11),
    fontWeight: "700",
    color: "#07090f",              // texto escuro sobre verde
    letterSpacing: 1,
    textTransform: "uppercase",
  },

  planoNome: {
    fontSize: responsive(14, 16, 17),
    fontWeight: "600",
    color: t.muted,
    marginBottom: 12,
    textAlign: "center",
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },

  planoPrecoRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
    gap: 4,
    marginBottom: 6,
  },

  planoPrecoSimbolo: {
    fontSize: responsive(16, 18, 20),
    fontWeight: "500",
    color: t.gold,
    marginBottom: responsive(10, 12, 14),
  },

  planoPrecoValor: {
    fontSize: responsive(52, 60, 68),
    fontWeight: "800",
    color: t.white,
    lineHeight: responsive(56, 64, 72),
    letterSpacing: -2,
  },

  planoPrecoMes: {
    fontSize: responsive(14, 15, 16),
    color: t.mutedLow,
    marginBottom: responsive(10, 12, 14),
  },

  planoPeriodo: {
    fontSize: responsive(11, 12, 13),
    color: t.mutedLow,
    textAlign: "center",
    marginBottom: 20,
    letterSpacing: 0.3,
  },

  planoDivisor: {
    height: 1,
    backgroundColor: t.border,
    marginBottom: 20,
  },

  planoFeatures: {
    gap: responsive(12, 14, 14),
    marginBottom: responsive(24, 28, 32),
  },

  planoFeatureItem: {
    fontSize: responsive(13, 14, 14),
    color: t.muted,
    lineHeight: responsive(20, 22, 22),
  },

  planoFeatureItemDestaque: {
    fontSize: responsive(13, 14, 14),
    color: t.white,
    lineHeight: responsive(20, 22, 22),
  },

  // ── Footer ────────────────────────────────────────────────────
  containerFooter: {
    backgroundColor: t.bg,
    paddingHorizontal: responsive(24, 48, 88),
    paddingTop: responsive(36, 44, 52),
    paddingBottom: responsive(48, 56, 64),
    borderTopWidth: 1,
    borderTopColor: t.border,
    gap: responsive(12, 14, 14),
    maxWidth: isDesktop ? 1440 : '100%',
    alignSelf: 'center',
    width: '100%',
    alignItems: responsive("center", "center", "flex-start"),
  },

  footerLogo: {
    fontSize: responsive(16, 18, 20),
    fontWeight: "800",
    color: t.white,
    letterSpacing: 2,
    textTransform: "uppercase",
  },

  footerLogoTrack: { color: t.gold },

  footerCopyright: {
    fontSize: responsive(11, 12, 13),
    color: t.mutedLow,
    textAlign: responsive("center", "center", "left"),
  },

  footerLinks: {
    flexDirection: responsive("column", "row", "row"),
    gap: responsive(12, 24, 32),
    marginTop: 4,
    alignItems: responsive("center", "flex-start", "flex-start"),
  },

  footerLink: {
    fontSize: responsive(12, 13, 14),
    color: t.mutedLow,
    fontWeight: "500",
  },
});

export const layout = { isMobile, isTablet, isDesktop, responsive, BREAKPOINTS };