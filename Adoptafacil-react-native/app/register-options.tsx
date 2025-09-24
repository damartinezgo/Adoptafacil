import { BlurView } from "expo-blur";
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
import { ThemedView } from "@/components/themed-view";

export default function RegisterOptionsScreen() {
  const handleOptionSelect = (userType: "amigo" | "aliado") => {
    router.push({
      pathname: "/register",
      params: { userType },
    });
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#02d36bff", "#0000c5ff"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <BlurView intensity={50} style={styles.blurContainer}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <ThemedView style={styles.optionsContainer}>
              <Image
                source={require("@/assets/images/Logo.png")}
                style={styles.logo}
              />
              <ThemedText style={styles.title}>
                ¿Cómo quieres unirte?
              </ThemedText>
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
                      Para personas que buscan adoptar una mascota y darle un
                      hogar lleno de amor.
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
            </ThemedView>
          </ScrollView>
        </BlurView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  blurContainer: {
    borderRadius: 20,
    overflow: "hidden",
    width: "100%",
    maxWidth: 450,
    maxHeight: "95%",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    paddingVertical: 20,
  },
  optionsContainer: {
    backgroundColor: "transparent",
    borderRadius: 20,
    padding: 25,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
    alignItems: "center",
  },
  logo: {
    width: 70,
    height: 70,
    marginBottom: 15,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#0e0f11ff",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: "#2a3038ff",
    textAlign: "center",
    marginBottom: 25,
    paddingHorizontal: 10,
  },
  optionsWrapper: {
    width: "100%",
    gap: 15,
  },
  optionCard: {
    backgroundColor: "#ffffff",
    borderRadius: 15,
    padding: 20,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2d3748",
    textAlign: "center",
  },
  cardContent: {
    marginBottom: 18,
  },
  cardDescription: {
    fontSize: 14,
    color: "#4a5568",
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 15,
  },
  featuresList: {
    gap: 4,
  },
  featureItem: {
    fontSize: 13,
    color: "#718096",
    textAlign: "left",
  },
  buttonContainer: {
    alignItems: "center",
  },
  registerButton: {
    width: "100%",
    height: 45,
    backgroundColor: "#039a00ff",
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#68d391",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  aliadoButton: {
    backgroundColor: "#2634f7ff",
    shadowColor: "#63b3ed",
  },
  registerButtonText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 15,
  },
  backButton: {
    alignSelf: "center",
    marginTop: 20,
    paddingVertical: 10,
  },
  backButtonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "500",
    opacity: 0.8,
  },
});
