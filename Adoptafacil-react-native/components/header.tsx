import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { authAPI } from "@/api";

export default function Header() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

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
      style={styles.header}
    >
      <Image
        source={require("@/assets/images/LogoWhite.png")}
        style={styles.logo}
      />
      <View style={styles.userInfo}>
        {user && (
          <ThemedText style={styles.userText}>
            {user.name} {user.lastName}
          </ThemedText>
        )}
      </View>
      <TouchableOpacity style={styles.loginButton} onPress={handleLogout}>
        <ThemedText style={styles.loginText}>Cerrar sesión</ThemedText>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  logo: {
    width: 60,
    height: 60,
  },
  userInfo: {
    flex: 1,
    alignItems: "center",
  },
  userText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  loginButton: {
    backgroundColor: "rgba(156, 0, 0, 1)",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
  },
  loginText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 14,
  },
});
