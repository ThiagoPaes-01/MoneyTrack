import { StyleSheet, Dimensions, Platform } from "react-native";
import { color } from "../../Global/color";

const c = color.colors;
const { width } = Dimensions.get('window');

// Breakpoints
const BREAKPOINTS = {
  mobile: 0,
  tablet: 768,
  desktop: 1024,
  wide: 1440,
};

// Helper para determinar dispositivo
const isMobile = width < BREAKPOINTS.tablet;
const isTablet = width >= BREAKPOINTS.tablet && width < BREAKPOINTS.desktop;
const isDesktop = width >= BREAKPOINTS.desktop;

// Função para valores responsivos
const responsive = (mobile, tablet = mobile, desktop = tablet) => {
  if (isMobile) return mobile;
  if (isTablet) return tablet;
  return desktop;
};

export const styles = StyleSheet.create({
  // ─────────────────────────────────────────
  // HERO
  // ─────────────────────────────────────────

  containerMain: {
    flex: 1,
    backgroundColor: "#0a0d0f",
  },

  containerHero: {
    backgroundColor: "#0a0d0f",
    paddingHorizontal: responsive(24, 48, 80),
    paddingTop: responsive(64, 80, 120),
    paddingBottom: responsive(40, 56, 80),
    maxWidth: isDesktop ? 1440 : '100%',
    alignSelf: 'center',
    width: '100%',
  },

  badgeOpenFinance: {
    alignSelf: "center",
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "rgba(58,201,126,0.5)",
    borderRadius: 20,
    paddingHorizontal: responsive(14, 16, 18),
    paddingVertical: responsive(7, 8, 9),
    marginBottom: responsive(32, 40, 48),
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  badgeOpenFinanceText: {
    fontSize: responsive(12, 13, 14),
    fontWeight: "600",
    color: c.success,
    letterSpacing: 0.3,
  },

  heroTitle: {
    fontSize: responsive(44, 56, 72),
    fontWeight: "800",
    color: c.white,
    lineHeight: responsive(50, 64, 82),
    marginBottom: responsive(20, 28, 32),
    textAlign: responsive("center", "center", "left"),
    maxWidth: isDesktop ? '60%' : '100%',
  },

  heroTitleSem: {
    color: c.white,
    fontWeight: "800",
  },

  heroTitleSegredos: {
    color: c.success,
    fontWeight: "800",
  },

  heroSubtitle: {
    fontSize: responsive(15, 16, 18),
    color: "rgba(255,255,255,0.5)",
    lineHeight: responsive(24, 26, 30),
    marginBottom: responsive(36, 44, 52),
    textAlign: responsive("center", "center", "left"),
    maxWidth: isDesktop ? '55%' : '100%',
  },

  headerTop: {
    flexDirection: "row",
    justifyContent: responsive("center", "center", "flex-start"),
    alignItems: "center",
    marginBottom: responsive(32, 40, 48),
  },

  logo: {
    width: responsive(180, 200, 240),
    height: responsive(200, 220, 270),
    resizeMode: "contain",
  },

  // ─────────────────────────────────────────
  // BOTÕES
  // ─────────────────────────────────────────
  containerButtons: {
    backgroundColor: "#0a0d0f",
    flexDirection: responsive("column", "row", "row"),
    justifyContent: responsive("center", "flex-start", "flex-start"),
    alignItems: responsive("stretch", "center", "center"),
    gap: responsive(12, 16, 20),
    width: "100%",
    maxWidth: isDesktop ? 1440 : '100%',
    alignSelf: 'center',
    paddingHorizontal: responsive(24, 48, 80),
    marginTop: responsive(-20, -30, -30),
    marginBottom: responsive(38, 48, 56),
  },

  // ─────────────────────────────────────────
  // STATS 
  // ─────────────────────────────────────────

  containerStats: {
    backgroundColor: "#0a0d0f",
    paddingHorizontal: responsive(24, 48, 80),
    paddingBottom: responsive(56, 64, 80),
    paddingTop: responsive(8, 16, 24),
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.08)",
    flexDirection: responsive("column", "row", "row"),
    justifyContent: responsive("flex-start", "center", "flex-start"),
    gap: responsive(24, 40, 60),
    maxWidth: isDesktop ? 1440 : '100%',
    alignSelf: 'center',
    width: '100%',
  },

  statItem: {
    flexDirection: "column",
    gap: 4,
    alignItems: responsive("center", "center", "flex-start"),
  },

  statNumber: {
    fontSize: responsive(28, 32, 36),
    fontWeight: "700",
    color: c.white,
  },

  statNumberGreen: {
    color: c.white,
  },

  statNumberYellow: {
    color: c.white,
  },

  statNumberBlue: {
    color: c.white,
  },

  statLabel: {
    fontSize: responsive(12, 13, 14),
    color: "rgba(255,255,255,0.4)",
    fontWeight: "400",
    textAlign: responsive("center", "center", "left"),
  },

  // ─────────────────────────────────────────
  // SEÇÃO FUNCIONALIDADES — header
  // ─────────────────────────────────────────

  containerSectionHeader: {
    alignItems: "center",
    backgroundColor: "#0a0d0f",
    paddingHorizontal: responsive(24, 48, 80),
    paddingTop: responsive(64, 80, 100),
    paddingBottom: responsive(36, 44, 56),
    maxWidth: isDesktop ? 1440 : '100%',
    alignSelf: 'center',
    width: '100%',
  },

  sectionTag: {
    alignSelf: "center",
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "rgba(58,201,126,0.5)",
    borderRadius: 20,
    paddingHorizontal: responsive(14, 16, 18),
    paddingVertical: responsive(7, 8, 9),
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  sectionTagText: {
    fontSize: responsive(11, 12, 13),
    fontWeight: "700",
    color: c.success,
    letterSpacing: 1,
    textTransform: "uppercase",
  },

  sectionTitle: {
    fontSize: responsive(34, 42, 52),
    fontWeight: "800",
    color: c.white,
    marginBottom: 14,
    lineHeight: responsive(40, 50, 60),
    textAlign: "center",
    maxWidth: isDesktop ? 800 : '100%',
  },

  sectionTitleHighlight: {
    color: c.success,
    fontWeight: "800",
  },

  sectionSubtitle: {
    fontSize: responsive(14, 15, 16),
    color: "rgba(255, 255, 255, 0.94)",
    lineHeight: responsive(22, 24, 26),
    textAlign: "center",
    maxWidth: isDesktop ? 700 : '100%',
  },

  // ─────────────────────────────────────────
  // GRID FUNCIONALIDADES — 2 colunas mobile, 3-4 desktop
  // ─────────────────────────────────────────

  containerFuncionalidades: {
    backgroundColor: "#0a0d0f",
    paddingHorizontal: responsive(16, 32, 80),
    paddingBottom: responsive(64, 80, 100),
    flexDirection: isDesktop ? "row" : "column",
    flexWrap: "wrap",
    justifyContent: responsive("center", "center", "center"),
    gap: responsive(12, 16, 20),
    maxWidth: isDesktop ? 1440 : '100%',
    height: isDesktop ? 600 : 700,
  },

  // ─────────────────────────────────────────
  // SEÇÃO COMO FUNCIONA — header
  // ─────────────────────────────────────────

  containerComoFuncionaHeader: {
    backgroundColor: "#0a0d0f",
    alignItems: "center",
    paddingHorizontal: responsive(24, 48, 80),
    paddingTop: responsive(64, 80, 100),
    paddingBottom: responsive(36, 44, 56),
    maxWidth: isDesktop ? 1440 : '100%',
    alignSelf: 'center',
    width: '100%',
  },

  // ─────────────────────────────────────────
  // PASSOS — vertical mobile, horizontal desktop
  // ─────────────────────────────────────────

  containerPassos: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#0a0d0f",
    paddingHorizontal: responsive(24, 48, 80),
    paddingBottom: responsive(70, 80, 100),
    gap: responsive(14, 20, 24),
    alignItems: "center",
    marginLeft: isDesktop ? 50 : 10,
    flexDirection: responsive("column", "column", "row"),
    maxWidth: isDesktop ? 1440 : '100%',
    alignSelf: 'center',
    width: '100%',
  },

  cardPasso: {
    width: responsive(280, 300, 340),
    backgroundColor: "#141820",
    borderRadius: responsive(28, 32, 36),
    borderWidth: 1,
    borderColor: "#ffffff0f",
    padding: responsive(28, 32, 36),
    alignItems: "center",
    gap: 18,
  },

  passoBadge: {
    width: responsive(56, 64, 72),
    height: responsive(56, 64, 72),
    borderRadius: 999,
    backgroundColor: c.success,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: c.success,
    shadowOpacity: 0.35,
    shadowRadius: 18,
    elevation: 10,
  },

  passoBadgeText: {
    color: c.white,
    fontSize: responsive(22, 26, 30),
    fontWeight: "900",
  },

  passoContent: {
    alignItems: "center",
    gap: 8,
  },

  passoTitle: {
    color: c.white,
    fontSize: responsive(16, 18, 20),
    fontWeight: "700",
    textAlign: "center",
  },

  passoDesc: {
    color: "#ffffff73",
    fontSize: responsive(13, 14, 15),
    lineHeight: responsive(21, 23, 25),
    textAlign: "center",
  },

  // ─────────────────────────────────────────
  // SEÇÃO PLANOS — header centralizado
  // ─────────────────────────────────────────

  containerPlanosHeader: {
    backgroundColor: "#0a0d0f",
    paddingHorizontal: responsive(24, 48, 80),
    paddingTop: responsive(64, 80, 100),
    paddingBottom: responsive(32, 40, 48),
    alignItems: "center",
    maxWidth: isDesktop ? 1440 : '100%',
    alignSelf: 'center',
    width: '100%',
  },

  sectionTagCenter: {
    alignSelf: "center",
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "rgba(58,201,126,0.5)",
    borderRadius: 20,
    paddingHorizontal: responsive(14, 16, 18),
    paddingVertical: responsive(7, 8, 9),
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  sectionTitleCenter: {
    fontSize: responsive(36, 44, 56),
    fontWeight: "800",
    color: c.white,
    marginBottom: 12,
    textAlign: "center",
    lineHeight: responsive(42, 52, 64),
  },

  sectionSubtitleCenter: {
    fontSize: responsive(14, 15, 16),
    color: "rgba(255,255,255,0.45)",
    lineHeight: responsive(22, 24, 26),
    textAlign: "center",
    paddingHorizontal: 8,
    maxWidth: isDesktop ? 700 : '100%',
  },

  // ─────────────────────────────────────────
  // CARDS DE PLANOS — stack mobile, row desktop
  // ─────────────────────────────────────────
  containerPlanos: {
    backgroundColor: "#0a0d0f",
    paddingHorizontal: responsive(16, 32, 80),
    paddingBottom: responsive(64, 80, 100),
    paddingTop: 8,
    flexDirection: responsive("column", "column", "row"),
    justifyContent: "center",
    alignItems: responsive("center", "center", "stretch"),
    gap: responsive(16, 20, 24),
    width: responsive("100%", "90%", "85%"),
    maxWidth: isDesktop ? 1200 : '100%',
    alignSelf: "center",
  },

  cardPlano: {
    flex: isDesktop ? 1 : undefined,
    width: isMobile ? '100%' : isTablet ? '80%' : undefined,
    maxWidth: isMobile ? 400 : undefined,
    backgroundColor: "#141820",
    borderRadius: responsive(24, 28, 32),
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    padding: responsive(22, 26, 30),
  },

  cardPlanoDestaque: {
    flex: isDesktop ? 1 : undefined,
    width: isMobile ? '100%' : isTablet ? '80%' : undefined,
    maxWidth: isMobile ? 400 : undefined,
    backgroundColor: "#141820",
    borderRadius: responsive(24, 28, 32),
    borderWidth: 1.5,
    borderColor: c.success,
    padding: responsive(22, 26, 30),
    // Destaque visual extra no desktop
    ...(isDesktop && {
      transform: [{ scale: 1.05 }],
      shadowColor: c.success,
      shadowOpacity: 0.2,
      shadowRadius: 20,
      elevation: 8,
    }),
  },

  planoMaisPopular: {
    alignSelf: "center",
    backgroundColor: c.success,
    borderRadius: 20,
    paddingHorizontal: responsive(18, 20, 22),
    paddingVertical: responsive(6, 7, 8),
    marginBottom: 20,
  },

  planoMaisPopularText: {
    fontSize: responsive(12, 13, 14),
    fontWeight: "700",
    color: c.white,
    letterSpacing: 0.3,
  },

  planoNome: {
    fontSize: responsive(18, 20, 22),
    fontWeight: "700",
    color: c.white,
    marginBottom: 16,
    textAlign: "center",
  },

  planoPrecoRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
    gap: 4,
    marginBottom: 8,
  },

  planoPrecoSimbolo: {
    fontSize: responsive(18, 20, 22),
    fontWeight: "500",
    color: "rgba(255,255,255,0.6)",
    marginBottom: responsive(10, 12, 14),
  },

  planoPrecoValor: {
    fontSize: responsive(56, 64, 72),
    fontWeight: "700",
    color: c.white,
    lineHeight: responsive(60, 68, 76),
  },

  planoPrecoMes: {
    fontSize: responsive(18, 19, 20),
    color: "rgba(255,255,255,0.6)",
    marginBottom: responsive(10, 12, 14),
  },

  planoPeriodo: {
    fontSize: responsive(13, 14, 15),
    color: "rgba(255,255,255,0.4)",
    textAlign: "center",
    marginBottom: 24,
  },

  planoDivisor: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.08)",
    marginBottom: 24,
  },

  planoFeatures: {
    gap: responsive(14, 16, 18),
    marginBottom: responsive(28, 32, 36),
  },

  planoFeatureItem: {
    fontSize: responsive(14, 15, 16),
    color: "rgba(255,255,255,0.7)",
    lineHeight: responsive(20, 22, 24),
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  planoFeatureItemDestaque: {
    fontSize: responsive(14, 15, 16),
    color: c.white,
    lineHeight: responsive(20, 22, 24),
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  // ─────────────────────────────────────────
  // FOOTER
  // ─────────────────────────────────────────

  containerFooter: {
    backgroundColor: "#0a0d0f",
    paddingHorizontal: responsive(24, 48, 80),
    paddingTop: responsive(32, 40, 48),
    paddingBottom: responsive(44, 52, 60),
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.07)",
    gap: responsive(12, 14, 16),
    maxWidth: isDesktop ? 1440 : '100%',
    alignSelf: 'center',
    width: '100%',
    alignItems: responsive("center", "center", "flex-start"),
  },

  footerLogo: {
    fontSize: responsive(18, 20, 22),
    fontWeight: "800",
    color: c.white,
    letterSpacing: 1,
    textTransform: "uppercase",
  },

  footerLogoTrack: {
    color: c.warning,
  },

  footerCopyright: {
    fontSize: responsive(12, 13, 14),
    color: "rgba(255,255,255,0.35)",
    textAlign: responsive("center", "center", "left"),
  },

  footerLinks: {
    flexDirection: responsive("column", "row", "row"),
    gap: responsive(12, 24, 32),
    marginTop: 4,
    alignItems: responsive("center", "flex-start", "flex-start"),
  },

  footerLink: {
    fontSize: responsive(13, 14, 15),
    color: "rgba(255,255,255,0.45)",
    fontWeight: "500",
  },
});

// ─────────────────────────────────────────
// EXPORT DAS CONSTANTES ÚTEIS
// ─────────────────────────────────────────
export const layout = {
  isMobile,
  isTablet,
  isDesktop,
  responsive,
  BREAKPOINTS,
};