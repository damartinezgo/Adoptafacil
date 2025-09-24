import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
// import { useRouter } from "expo-router";
import { StyleSheet, TouchableOpacity } from "react-native";

import { ThemedText } from "@/components/themed-text";

export default function Header() {
  // Función de logout simple
  const handleLogout = () => {
    // Aquí va la lógica de cierre de sesión, por ejemplo limpiar tokens y redirigir
    alert("Sesión cerrada");
    // Puedes agregar navegación si lo necesitas
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
