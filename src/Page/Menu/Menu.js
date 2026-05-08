// screens/Menu/Menu.js
import { View, Text, TouchableOpacity, useWindowDimensions } from "react-native";
import { useMenuStyles } from "./styles";
import {
  House,
  CreditCard,
  ChartBar,
  Target,
  Bell,
  Wallet,
  User,
  SignOut,
} from "phosphor-react-native";

const NAV_ITEMS = [
  { label: "Dashboard",    icon: House,       route: "Dashboard" },
  { label: "Extrato",      icon: CreditCard,  route: "Extrato"   },
  { label: "Relatórios",   icon: ChartBar,    route: "Relatorios"},
  { label: "Perfil",       icon: User,        route: "Perfil"    },
];

// Itens que aparecem na bottom nav mobile (máx 5)
const MOBILE_ITEMS = [
  { label: "Início",     icon: House,      route: "Dashboard" },
  { label: "Extrato",    icon: CreditCard, route: "Extrato"   },
  { label: "Relatórios", icon: ChartBar,   route: "Relatorios"},
  { label: "Perfil",     icon: User,       route: "Perfil"    },
];

export function Menu({ navigation, activeRoute = "Dashboard", children }) {
  const styles = useMenuStyles();
  const { width } = useWindowDimensions();
  const isDesktop = width >= 768;

  // ── Desktop: sidebar lateral ──────────────────────────────
  if (isDesktop) {
    return (
      <View style={styles.desktopRoot}>

        {/* Sidebar */}
        <View style={styles.sidebar}>

          {/* Logo */}
          <View style={styles.sidebarLogo}>
            <Text style={styles.logoText}>
              Money<Text style={styles.logoTrack}>Track</Text>
            </Text>
          </View>

          {/* Saudação */}
          <View style={styles.sidebarGreeting}>
            <View style={styles.greetingAvatar}>
              <Text style={styles.greetingAvatarText}></Text>
            </View>
            <View>
              <Text style={styles.greetingName}></Text> 
              <Text style={styles.greetingPlan}></Text>
            </View>
          </View>

          {/* Nav items */}
          <View style={styles.sidebarNav}>
            {NAV_ITEMS.map((item) => {
              const isActive = activeRoute === item.route;
              const Icon = item.icon;
              return (
                <TouchableOpacity
                  key={item.route}
                  style={[styles.navItem, isActive && styles.navItemActive]}
                  onPress={() => navigation.navigate(item.route)}
                >
                  <Icon
                    size={20}
                    weight={isActive ? "fill" : "regular"}
                    color={isActive ? "#3ac97e" : "rgba(255,255,255,0.45)"}
                  />
                  <Text style={[styles.navLabel, isActive && styles.navLabelActive]}>
                    {item.label}
                  </Text>
                  {item.badge && (
                    <View style={styles.navBadge}>
                      <Text style={styles.navBadgeText}>{item.badge}</Text>
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Sair */}
          <TouchableOpacity
            style={styles.sidebarSignOut}
            onPress={() => navigation.navigate("Login")}
          >
            <SignOut size={18} color="rgba(232,85,85,0.7)" />
            <Text style={styles.signOutText}>Sair</Text>
          </TouchableOpacity>

        </View>

        {/* Conteúdo principal */}
        <View style={styles.desktopContent}>
          {children}
        </View>

      </View>
    );
  }

  // ── Mobile: bottom navigation bar ────────────────────────
  return (
    <View style={styles.mobileRoot}>

      {/* Conteúdo da tela */}
      <View style={styles.mobileContent}>
        {children}
      </View>

      {/* Bottom nav */}
      <View style={styles.bottomNav}>
        {MOBILE_ITEMS.map((item) => {
          const isActive = activeRoute === item.route;
          const Icon = item.icon;
          return (
            <TouchableOpacity
              key={item.route}
              style={styles.bottomNavItem}
              onPress={() => navigation.navigate(item.route)}
            >
              <Icon
                size={22}
                weight={isActive ? "fill" : "regular"}
                color={isActive ? "#3ac97e" : "rgba(255,255,255,0.35)"}
              />
              <Text style={[styles.bottomNavLabel, isActive && styles.bottomNavLabelActive]}>
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

    </View>
  );
}