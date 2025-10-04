import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

import { ThemedText } from "@/components/themed-text";

export default function RegisterOptionsScreen() {
  const handleOptionSelect = (userType: "amigo" | "aliado") => {
    router.push({
      pathname: "/register",
      params: { userType },
    });
  };

  return (
    <LinearGradient
      colors={["#02d36bff", "#0000c5ff"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradient}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.contentContainer}>
          <Image
            source={require("@/assets/images/Logo.png")}
            style={styles.logo}
          />
          <ThemedText style={styles.title}>¿Cómo quieres unirte?</ThemedText>
          <ThemedText style={styles.subtitle}>
            Elige el tipo de cuenta que mejor se adapte a ti
          </ThemedText>

          <View style={styles.optionsWrapper}>
            {/* Opción Amigo AdoptaFácil */}
            <TouchableOpacity
              style={styles.optionCard}
              onPress={() => handleOptionSelect("amigo")}
              activeOpacity={0.8}
            >
              <View style={styles.cardHeader}>
                <ThemedText style={styles.cardTitle}>
                  🏠 Amigo AdoptaFácil
                </ThemedText>
              </View>
              <View style={styles.cardContent}>
                <ThemedText style={styles.cardDescription}>
                  Para personas que buscan adoptar una mascota y darle un hogar
                  lleno de amor.
                </ThemedText>
                <View style={styles.featuresList}>
                  <ThemedText style={styles.featureItem}>
                    • Buscar mascotas disponibles
                  </ThemedText>
                  <ThemedText style={styles.featureItem}>
                    • Conectar con refugios
                  </ThemedText>
                  <ThemedText style={styles.featureItem}>
                    • Seguimiento de adopciones
                  </ThemedText>
                  <ThemedText style={styles.featureItem}>
                    • Comunidad de adoptantes
                  </ThemedText>
                </View>
              </View>
              <View style={styles.buttonContainer}>
                <View style={styles.registerButton}>
                  <ThemedText style={styles.registerButtonText}>
                    Registrarme como Amigo
                  </ThemedText>
                </View>
              </View>
            </TouchableOpacity>

            {/* Opción Aliado AdoptaFácil */}
            <TouchableOpacity
              style={styles.optionCard}
              onPress={() => handleOptionSelect("aliado")}
              activeOpacity={0.8}
            >
              <View style={styles.cardHeader}>
                <ThemedText style={styles.cardTitle}>
                  🏢 Aliado AdoptaFácil
                </ThemedText>
              </View>
              <View style={styles.cardContent}>
                <ThemedText style={styles.cardDescription}>
                  Para refugios, fundaciones y organizaciones que rescatan y
                  cuidan mascotas.
                </ThemedText>
                <View style={styles.featuresList}>
                  <ThemedText style={styles.featureItem}>
                    • Gestionar mascotas en adopción
                  </ThemedText>
                  <ThemedText style={styles.featureItem}>
                    • Publicar historias de rescate
                  </ThemedText>
                  <ThemedText style={styles.featureItem}>
                    • Recibir donaciones
                  </ThemedText>
                  <ThemedText style={styles.featureItem}>
                    • Red de refugios
                  </ThemedText>
                </View>
              </View>
              <View style={styles.buttonContainer}>
                <View style={[styles.registerButton, styles.aliadoButton]}>
                  <ThemedText style={styles.registerButtonText}>
                    Registrarme como Aliado
                  </ThemedText>
                </View>
              </View>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.push("/login")}
          >
            <ThemedText style={styles.backButtonText}>
              ← Volver al inicio de sesión
            </ThemedText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  contentContainer: {
    alignItems: "center",
    width: "100%",
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 0,
    resizeMode: "contain",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 15,
    paddingHorizontal: 15,
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
    lineHeight: 34,
    paddingBottom: 5,
  },
  subtitle: {
    fontSize: 18,
    color: "#f0f0f0",
    textAlign: "center",
    marginBottom: 35,
    paddingHorizontal: 10,
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  optionsWrapper: {
    width: "100%",
    maxWidth: 380,
    gap: 20,
  },
  optionCard: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderRadius: 20,
    padding: 25,
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.3)",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  cardHeader: {
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2d3748",
    textAlign: "center",
  },
  cardContent: {
    marginBottom: 20,
  },
  cardDescription: {
    fontSize: 16,
    color: "#4a5568",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 18,
  },
  featuresList: {
    gap: 6,
  },
  featureItem: {
    fontSize: 14,
    color: "#718096",
    textAlign: "left",
    lineHeight: 20,
  },
  buttonContainer: {
    alignItems: "center",
  },
  registerButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#65c063ff",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  aliadoButton: {
    backgroundColor: "#2634f7ff",
  },
  registerButtonText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 16,
  },
  backButton: {
    alignSelf: "center",
    marginTop: 30,
    paddingVertical: 12,
  },
  backButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});
