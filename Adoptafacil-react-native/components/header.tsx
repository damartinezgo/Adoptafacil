import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context"; //Area segura

import { ThemedText } from "@/components/themed-text";
import { authAPI } from "@/api";

export default function Header() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    const loadUser = async () => {
      const currentUser = await authAPI.getCurrentUser();
      setUser(currentUser);
    };
    loadUser();
  }, []);

  // Función para cerrar sesión
  const handleLogout = async () => {
    try {
      await authAPI.logout();
      router.replace("/login");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      // En caso de error, aún redirigir al login
      router.replace("/login");
    }
  };

  return (
    <LinearGradient
      colors={["#02d36bff", "#0000c5ff"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.header, { paddingTop: insets.top }]}
    >
      <View style={styles.leftSection}>
        <Image
          source={require("@/assets/images/LogoWhite.png")}
          style={styles.logo}
        />
      </View>

      <View style={styles.centerSection}>
        {user && (
          <View style={styles.userInfo}>
            <ThemedText style={styles.userText} numberOfLines={1}>
              {user.name} {user.lastName}
            </ThemedText>
            {user.role && (
              <ThemedText style={styles.roleText} numberOfLines={1}>
                {user.role.roleType || user.role.name || "Usuario"}
              </ThemedText>
            )}
          </View>
        )}
      </View>

      <View style={styles.rightSection}>
        <TouchableOpacity style={styles.loginButton} onPress={handleLogout}>
          <ThemedText style={styles.loginText}>Salir</ThemedText>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 15,
    minHeight: 80,
  },
  leftSection: {
    flex: 0.2,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  centerSection: {
    flex: 0.6,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  rightSection: {
    flex: 0.2,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  logo: {
    width: 50,
    height: 50,
  },
  userInfo: {
    alignItems: "center",
    justifyContent: "center",
  },
  userText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  roleText: {
    color: "#b0b0b0",
    fontSize: 11,
    fontWeight: "400",
    textAlign: "center",
  },
  loginButton: {
    backgroundColor: "rgba(156, 0, 0, 1)",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    minWidth: 60,
  },
  loginText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 12,
    textAlign: "center",
  },
});
