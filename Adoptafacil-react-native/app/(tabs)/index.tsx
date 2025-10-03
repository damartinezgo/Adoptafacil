import { LinearGradient } from "expo-linear-gradient";
import {
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import Footer from "@/components/footer";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* Sección de bienvenida */}
      <LinearGradient
        colors={["#02d36bff", "#0000c5ff"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.welcomeSection}
      >
        <ThemedText style={styles.mainTitle}>
          Bienvenido a AdoptaFácil: Encuentra a tu nuevo mejor amigo
        </ThemedText>
        <ThemedText style={styles.subtitle}>
          Conectamos a mascotas necesitadas con hogares amorosos desde 2025
        </ThemedText>

        {/* Formulario de búsqueda directo en el hero */}
        <TextInput
          style={styles.heroInput}
          placeholder="Buscar por raza (Ej: Perro, Gato)"
          placeholderTextColor="rgba(255, 255, 255, 0.7)"
        />
        <TextInput
          style={styles.heroInput}
          placeholder="Ciudad"
          placeholderTextColor="rgba(255, 255, 255, 0.7)"
        />
        <TouchableOpacity style={styles.heroSearchButton}>
          <ThemedText style={styles.heroSearchButtonText}>Buscar</ThemedText>
        </TouchableOpacity>
      </LinearGradient>

      {/* Sección de categorías */}
      <ThemedView style={styles.categoriesSection}>
        <TouchableOpacity style={styles.magicButton}>
          <ThemedText style={styles.magicButtonText}>
            ✨ Encuentra tu compañero ideal
          </ThemedText>
        </TouchableOpacity>
        <ThemedText style={styles.categoriesTitle}>
          Explora por{" "}
          <ThemedText style={styles.highlightedText}>categoría</ThemedText>
        </ThemedText>
        <ThemedText style={styles.categoriesSubtitle}>
          Descubre mascotas increíbles esperando un hogar lleno de amor
        </ThemedText>
        <View style={styles.cardsContainer}>
          <TouchableOpacity style={styles.card}>
            <ThemedText style={styles.cardEmoji}>🐶</ThemedText>
            <ThemedText style={styles.cardText}>Perros</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.card}>
            <ThemedText style={styles.cardEmoji}>🐱</ThemedText>
            <ThemedText style={styles.cardText}>Gatos</ThemedText>
          </TouchableOpacity>
        </View>
      </ThemedView>

      {/* Sección de destacados */}
      <ThemedView style={styles.featuredSection}>
        <TouchableOpacity style={styles.featuredBadge}>
          <ThemedText style={styles.featuredBadgeText}>
            ⭐ Destacados de la semana ⭐
          </ThemedText>
        </TouchableOpacity>

        <ThemedText style={styles.featuredTitle}>
          Mascotas que buscan{"\n"}
          <ThemedText style={styles.featuredTitleGreen}>un hogar </ThemedText>
          <ThemedText style={styles.featuredTitleBlue}>lleno{"\n"}</ThemedText>
          <ThemedText style={styles.featuredTitlePurple}>de amor</ThemedText>
        </ThemedText>

        <ThemedText style={styles.featuredSubtitle}>
          Aquí tienes una muestra de nuestras mascotas más recientes que buscan
          un hogar lleno de amor.{" "}
          <ThemedText style={styles.featuredHighlight}>
            ¿Serás tú su nueva familia?
          </ThemedText>
        </ThemedText>

        {/* Estadísticas */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <ThemedText style={styles.statNumber}>150+</ThemedText>
            <ThemedText style={styles.statLabel}>
              Mascotas{"\n"}disponibles
            </ThemedText>
          </View>
          <View style={styles.statItem}>
            <ThemedText style={styles.statNumberBlue}>100%</ThemedText>
            <ThemedText style={styles.statLabel}>
              Verificadas{"\n"}y sanas
            </ThemedText>
          </View>
          <View style={styles.statItem}>
            <ThemedText style={styles.statNumberPurple}>24/7</ThemedText>
            <ThemedText style={styles.statLabel}>
              Soporte{"\n"}post-adopción
            </ThemedText>
          </View>
        </View>
      </ThemedView>

      {/* Footer */}
      <Footer />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7fafc",
  },
  welcomeSection: {
    padding: 20,
    alignItems: "center",
    minHeight: 400,
    justifyContent: "center",
  },
  mainTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 10,
    paddingBottom: 12,
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.8)",
    textAlign: "center",
    marginBottom: 30,
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  heroInput: {
    width: "90%",
    maxWidth: 350,
    height: 50,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.4)",
    borderRadius: 25,
    paddingHorizontal: 20,
    marginBottom: 15,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "500",
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  heroSearchButton: {
    width: "90%",
    maxWidth: 350,
    height: 50,
    backgroundColor: "#00b746bf",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  heroSearchButtonText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 16,
  },
  categoriesSection: {
    backgroundColor: "#f8f9fa",
    padding: 20,
    alignItems: "center",
  },
  magicButton: {
    backgroundColor: "#bee3f8",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  magicButtonText: {
    color: "#2b6cb0",
    fontWeight: "bold",
    fontSize: 14,
  },
  categoriesTitle: {
    fontSize: 24,
    color: "#2d3748",
    textAlign: "center",
    marginBottom: 10,
    fontWeight: "600",
  },
  highlightedText: {
    color: "#68d391",
  },
  categoriesSubtitle: {
    fontSize: 16,
    color: "#718096",
    textAlign: "center",
    marginBottom: 20,
  },
  cardsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  card: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
    width: "40%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  cardEmoji: {
    fontSize: 40,
    marginBottom: 10,
  },
  cardText: {
    color: "#2d3748",
    fontWeight: "600",
  },
  // Nuevos estilos para la sección featured
  featuredSection: {
    backgroundColor: "#f0fff4",
    padding: 20,
    alignItems: "center",
  },
  featuredBadge: {
    backgroundColor: "#bee3f8",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    marginBottom: 30,
    shadowColor: "#bee3f8",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  featuredBadgeText: {
    color: "#2b6cb0",
    fontWeight: "bold",
    fontSize: 14,
  },
  featuredTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#2d3748",
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 40,
  },
  featuredTitleGreen: {
    color: "#68d391",
  },
  featuredTitleBlue: {
    color: "#63b3ed",
  },
  featuredTitlePurple: {
    color: "#a78bfa",
  },
  featuredSubtitle: {
    fontSize: 16,
    color: "#718096",
    textAlign: "center",
    marginBottom: 30,
    lineHeight: 24,
    paddingHorizontal: 10,
  },
  featuredHighlight: {
    color: "#68d391",
    fontWeight: "bold",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 20,
  },
  statItem: {
    alignItems: "center",
    flex: 1,
    paddingHorizontal: 10,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#68d391",
    marginBottom: 3,
  },
  statNumberBlue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#63b3ed",
    marginBottom: 3,
  },
  statNumberPurple: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#a78bfa",
    marginBottom: 3,
  },
  statLabel: {
    fontSize: 12,
    color: "#718096",
    textAlign: "center",
    lineHeight: 16,
  },
});
