// screens/Menu/styles.js
import { StyleSheet, useWindowDimensions } from "react-native";
import { color } from "../../Global/color";

const c = color.colors;

export function useMenuStyles() {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 768;

  return StyleSheet.create({

    // ════════════════════════════════════════
    // DESKTOP
    // ════════════════════════════════════════

    desktopRoot: {
      flex: 1,
      flexDirection: "row",
      backgroundColor: "#0a0d0f",
    },

    // ─── Sidebar ─────────────────────────────
    sidebar: {
      width: 240,
      backgroundColor: "#111318",
      borderRightWidth: 1,
      borderRightColor: "rgba(255,255,255,0.06)",
      paddingTop: 28,
      paddingBottom: 24,
      flexDirection: "column",
    },

    sidebarLogo: {
      paddingHorizontal: 24,
      paddingBottom: 24,
      borderBottomWidth: 1,
      borderBottomColor: "rgba(255,255,255,0.06)",
      marginBottom: 20,
    },

    logoText: {
      fontSize: 20,
      fontWeight: "800",
      color: "#ffffff",
      letterSpacing: 2,
      textTransform: "uppercase",
    },

    logoTrack: {
      color: c.warning,   // #F0B429
    },

    // ─── Saudação ────────────────────────────
    sidebarGreeting: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      paddingHorizontal: 20,
      paddingVertical: 14,
      marginHorizontal: 12,
      marginBottom: 16,
      backgroundColor: "#1a1f2e",
      borderRadius: 14,
      borderWidth: 1,
      borderColor: "rgba(255,255,255,0.06)",
    },

    greetingAvatar: {
      width: 38,
      height: 38,
      borderRadius: 12,
      backgroundColor: c.success,
      alignItems: "center",
      justifyContent: "center",
    },

    greetingAvatarText: {
      fontSize: 16,
      fontWeight: "800",
      color: "#ffffff",
    },

    greetingName: {
      fontSize: 13,
      fontWeight: "700",
      color: "#ffffff",
    },

    greetingPlan: {
      fontSize: 11,
      color: c.warning,
      marginTop: 1,
    },

    // ─── Nav items ───────────────────────────
    sidebarNav: {
      flex: 1,
      paddingHorizontal: 12,
      gap: 2,
    },

    navItem: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      paddingHorizontal: 14,
      paddingVertical: 11,
      borderRadius: 12,
      borderLeftWidth: 2,
      borderLeftColor: "transparent",
    },

    navItemActive: {
      backgroundColor: "rgba(58,201,126,0.08)",
      borderLeftColor: c.success,
    },

    navLabel: {
      flex: 1,
      fontSize: 13,
      fontWeight: "500",
      color: "rgba(255,255,255,0.45)",
    },

    navLabelActive: {
      color: c.success,
      fontWeight: "700",
    },

    navBadge: {
      backgroundColor: c.success,
      borderRadius: 10,
      paddingHorizontal: 7,
      paddingVertical: 2,
    },

    navBadgeText: {
      fontSize: 10,
      fontWeight: "800",
      color: "#000000",
    },

    // ─── Sair ────────────────────────────────
    sidebarSignOut: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      paddingHorizontal: 26,
      paddingVertical: 14,
      marginTop: 8,
      borderTopWidth: 1,
      borderTopColor: "rgba(255,255,255,0.06)",
    },

    signOutText: {
      fontSize: 13,
      fontWeight: "600",
      color: "rgba(232,85,85,0.7)",
    },

    // ─── Conteúdo ────────────────────────────
    desktopContent: {
      flex: 1,
      backgroundColor: "#0a0d0f",
    },

    // ════════════════════════════════════════
    // MOBILE
    // ════════════════════════════════════════

    mobileRoot: {
      flex: 1,
      backgroundColor: "#0a0d0f",
    },

    mobileContent: {
      flex: 1,
    },

    // ─── Bottom nav ──────────────────────────
    bottomNav: {
      flexDirection: "row",
      backgroundColor: "#111318",
      borderTopWidth: 1,
      borderTopColor: "rgba(255,255,255,0.07)",
      paddingBottom: 20,   // espaço para home indicator do iPhone
      paddingTop: 10,
    },

    bottomNavItem: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      gap: 4,
    },

    bottomNavLabel: {
      fontSize: 10,
      fontWeight: "500",
      color: "rgba(255,255,255,0.35)",
    },

    bottomNavLabelActive: {
      color: c.success,
      fontWeight: "700",
    },
  });
}