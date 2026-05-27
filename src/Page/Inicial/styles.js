import { StyleSheet, Dimensions, Platform } from "react-native";
import { color } from "../../Global/color";

const c = color.colors;
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

export const styles = StyleSheet.create({

  containerMain: { flex: 1, backgroundColor: "#0a0d0f" },

  // ── Hero ──────────────────────────────────
  containerHero: {
    backgroundColor: "#0a0d0f",
    paddingHorizontal: responsive(24, 48, 80),
    paddingTop: responsive(64, 80, 100),
    paddingBottom: responsive(40, 56, 80),
    maxWidth: isDesktop ? 1440 : '100%',
    alignSelf: 'center',
    width: '100%',
  },

  badgeOpenFinance: {
    alignSelf: "flex-start",
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "rgba(58,201,126,0.5)",
    borderRadius: 20,
    paddingHorizontal: responsive(14, 16, 18),
    paddingVertical: responsive(7, 8, 9),
    marginBottom: responsive(24, 28, 32),
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
    textAlign: "left",
  },

  heroTitleSegredos: { color: c.success, fontWeight: "800" },

  heroSubtitle: {
    fontSize: responsive(15, 16, 18),
    color: "rgba(255,255,255,0.5)",
    lineHeight: responsive(24, 26, 30),
    marginBottom: responsive(36, 44, 52),
    textAlign: "left",
  },

  headerTop: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 16,
    marginBottom: responsive(24, 32, 40),
    flexWrap: "wrap",
  },

  logo: {
    width: responsive(200, 220, 260),
    height: responsive(80, 90, 110),
    resizeMode: "contain",
  },

  // ── Botões ────────────────────────────────
  containerButtons: {
    backgroundColor: "transparent",
    flexDirection: responsive("column", "row", "row"),
    justifyContent: "flex-start",
    alignItems: responsive("stretch", "center", "center"),
    gap: responsive(12, 16, 20),
    width: "100%",
  },

  // ── Stats ─────────────────────────────────
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

  statItem: { flexDirection: "column", gap: 4, alignItems: "flex-start" },

  statNumber: {
    fontSize: responsive(28, 32, 36),
    fontWeight: "700",
    color: c.white,
  },

  statLabel: {
    fontSize: responsive(12, 13, 14),
    color: "rgba(255,255,255,0.4)",
    fontWeight: "400",
  },

  // ── Funcionalidades header ─────────────────
  containerSectionHeader: {
    alignItems: "center",
    backgroundColor: "#0a0d0f",
    paddingHorizontal: responsive(24, 48, 80),
    paddingTop: responsive(48, 56, 64),   // ← reduzido (era 64/80/10)
    paddingBottom: responsive(28, 36, 44),
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

  sectionTitleHighlight: { color: c.success, fontWeight: "800" },

  sectionSubtitle: {
    fontSize: responsive(14, 15, 16),
    color: "rgba(255, 255, 255, 0.94)",
    lineHeight: responsive(22, 24, 26),
    textAlign: "center",
    maxWidth: isDesktop ? 700 : '100%',
  },

  // ── Grid Funcionalidades ───────────────────
  containerFuncionalidades: {
    backgroundColor: "#0a0d0f",
    paddingHorizontal: responsive(16, 32, 20),
    paddingBottom: responsive(16, 24, 32),  // ← mínimo
    flexDirection: isDesktop ? "row" : "column",
    flexWrap: isDesktop ? "wrap" : "nowrap",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: responsive(12, 16, 20),
    maxWidth: isDesktop ? 1440 : "100%",
    alignSelf: "center",
    width: "100%",
  },

  // ── Como Funciona header ───────────────────
  containerComoFuncionaHeader: {
    backgroundColor: "#0a0d0f",
    alignItems: "center",
    paddingHorizontal: responsive(24, 48, 80),
    paddingTop: responsive(16, 24, 32),    // ← mínimo
    paddingBottom: responsive(36, 44, 56),
    maxWidth: isDesktop ? 1440 : '100%',
    alignSelf: 'center',
    width: '100%',
  },

  // ── Passos em linha ───────────────────────
  containerPassos: {
    backgroundColor: "#0a0d0f",
    paddingHorizontal: responsive(24, 48, 80),
    paddingBottom: responsive(56, 64, 80),
    gap: responsive(14, 20, 24),
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
    backgroundColor: "#141820",
    borderRadius: responsive(20, 24, 28),
    borderWidth: 1,
    borderColor: "#ffffff0f",
    padding: responsive(20, 24, 28),
    alignItems: "center",
    gap: 14,
  },

  passoBadge: {
    width: responsive(48, 56, 64),
    height: responsive(48, 56, 64),
    borderRadius: 999,
    backgroundColor: c.success,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: c.success,
    shadowOpacity: 0.35,
    shadowRadius: 18,
    elevation: 10,
  },

  passoText: {
    color: c.white,
    fontSize: responsive(20, 24, 28),
    fontWeight: "900",
  },

  passoContent: { alignItems: "center", gap: 8 },

  passoTitle: {
    color: c.white,
    fontSize: responsive(14, 16, 18),
    fontWeight: "700",
    textAlign: "center",
  },

  passoDesc: {
    color: "#ffffff73",
    fontSize: responsive(12, 13, 14),
    lineHeight: responsive(19, 21, 23),
    textAlign: "center",
  },

  // ── Planos header ─────────────────────────
  containerPlanosHeader: {
    backgroundColor: "#0a0d0f",
    paddingHorizontal: responsive(24, 48, 80),
    paddingTop: responsive(56, 64, 80),
    paddingBottom: responsive(28, 36, 44),
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

  // ── Cards Planos ──────────────────────────
  containerPlanos: {
    backgroundColor: "#0a0d0f",
    paddingHorizontal: responsive(16, 32, 60),
    paddingBottom: responsive(64, 80, 100),
    paddingTop: 8,
    flexDirection: responsive("column", "column", "row"),
    justifyContent: "center",
    alignItems: responsive("center", "center", "stretch"),
    gap: responsive(14, 18, 20),
    width: responsive("100%", "90%", "80%"),  // ← menor (era 85%)
    maxWidth: isDesktop ? 1000 : '100%',       // ← menor (era 1200)
    alignSelf: "center",
  },

  cardPlano: {
    flex: isDesktop ? 1 : undefined,
    width: isMobile ? '100%' : isTablet ? '80%' : undefined,
    maxWidth: isMobile ? 380 : undefined,
    backgroundColor: "#141820",
    borderRadius: responsive(20, 24, 28),      // ← menor (era 24/28/32)
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    padding: responsive(18, 22, 24),           // ← menor (era 22/26/30)
  },

  cardPlanoDestaque: {
    flex: isDesktop ? 1 : undefined,
    width: isMobile ? '100%' : isTablet ? '80%' : undefined,
    maxWidth: isMobile ? 380 : undefined,
    backgroundColor: "#141820",
    borderRadius: responsive(20, 24, 28),
    borderWidth: 1.5,
    borderColor: c.success,
    padding: responsive(18, 22, 24),
    ...(isDesktop && {
      transform: [{ scale: 1.04 }],
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
    paddingHorizontal: responsive(16, 18, 20),
    paddingVertical: responsive(5, 6, 7),
    marginBottom: 16,
  },

  planoMaisPopularText: {
    fontSize: responsive(11, 12, 13),
    fontWeight: "700",
    color: c.white,
    letterSpacing: 0.3,
  },

  planoNome: {
    fontSize: responsive(16, 18, 20),
    fontWeight: "700",
    color: c.white,
    marginBottom: 12,
    textAlign: "center",
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
    color: "rgba(255,255,255,0.6)",
    marginBottom: responsive(8, 10, 12),
  },

  planoPrecoValor: {
    fontSize: responsive(48, 56, 64),        // ← menor (era 56/64/72)
    fontWeight: "700",
    color: c.white,
    lineHeight: responsive(52, 60, 68),
  },

  planoPrecoMes: {
    fontSize: responsive(16, 17, 18),
    color: "rgba(255,255,255,0.6)",
    marginBottom: responsive(8, 10, 12),
  },

  planoPeriodo: {
    fontSize: responsive(12, 13, 14),
    color: "rgba(255,255,255,0.4)",
    textAlign: "center",
    marginBottom: 20,
  },

  planoDivisor: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.08)",
    marginBottom: 20,
  },

  planoFeatures: {
    gap: responsive(12, 14, 16),
    marginBottom: responsive(24, 28, 32),
  },

  planoFeatureItem: {
    fontSize: responsive(13, 14, 15),
    color: "rgba(255,255,255,0.7)",
    lineHeight: responsive(19, 21, 23),
  },

  planoFeatureItemDestaque: {
    fontSize: responsive(13, 14, 15),
    color: c.white,
    lineHeight: responsive(19, 21, 23),
  },

  // ── Footer ────────────────────────────────
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

  footerLogoTrack: { color: c.warning },

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

export const layout = { isMobile, isTablet, isDesktop, responsive, BREAKPOINTS };