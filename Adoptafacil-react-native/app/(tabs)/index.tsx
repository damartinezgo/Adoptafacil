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
      {/* Hero Section con gradiente solo para título y subtítulo */}
      <LinearGradient
        colors={["#02d36bff", "#0000c5ff"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.heroSection}
      >
        <ThemedText style={styles.heroTitle}>
          Bienvenido a AdoptaFácil
        </ThemedText>
        <ThemedText style={styles.heroSubtitle}>
          Encuentra a tu nuevo mejor amigo. Conectamos mascotas necesitadas con
          hogares amorosos desde 2025
        </ThemedText>
      </LinearGradient>

      {/* Sección de búsqueda con fondo verde */}
      <ThemedView style={styles.searchSection}>
        <View style={styles.searchContainer}>
          <ThemedText style={styles.searchTitle}>
            ✨ Encuentra tu compañero ideal
          </ThemedText>
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar por raza (Ej: Perro, Gato)"
            placeholderTextColor="#718096"
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Ciudad"
            placeholderTextColor="#718096"
          />
          <TouchableOpacity style={styles.searchButton}>
            <ThemedText style={styles.searchButtonText}>Buscar</ThemedText>
          </TouchableOpacity>
        </View>
      </ThemedView>

      {/* Sección de categorías */}
      <ThemedView style={styles.categoriesSection}>
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
          <ThemedText style={styles.featuredTitleBlue}>lleno </ThemedText>
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
  heroSection: {
    padding: 20,
    paddingVertical: 30,
    alignItems: "center",
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: "600",
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 10,
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  heroSubtitle: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.8)",
    textAlign: "center",
    lineHeight: 22,
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  searchSection: {
    padding: 20,
  },
  searchContainer: {
    backgroundColor: "#f0fff4",
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#c6f6d5",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    alignItems: "center",
  },
  searchTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2d3748",
    marginBottom: 15,
    textAlign: "center",
  },
  searchInput: {
    width: "100%",
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#68d391",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 10,
    color: "#2d3748",
    fontSize: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  searchButton: {
    width: "100%",
    height: 40,
    backgroundColor: "#68d391",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  searchButtonText: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 15,
  },
  categoriesSection: {
    backgroundColor: "#f8f9fa",
    padding: 18,
    alignItems: "center",
  },
  categoriesTitle: {
    fontSize: 24,
    color: "#2d3748",
    textAlign: "center",
    marginBottom: 10,
    fontWeight: "600",
  },
  highlightedText: {
    fontSize: 24,
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
    padding: 18,
    borderRadius: 15,
    alignItems: "center",
    width: "40%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  cardEmoji: {
    fontSize: 36,
    marginBottom: 8,
  },
  cardText: {
    color: "#2d3748",
    fontWeight: "600",
  },
  // Nuevos estilos para la sección featured
  featuredSection: {
    backgroundColor: "#f0fff4",
    padding: 18,
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
    fontSize: 28,
    fontWeight: "bold",
    color: "#2d3748",
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 40,
  },
  featuredTitleGreen: {
    color: "#68d391",
    fontSize: 20,
  },
  featuredTitleBlue: {
    color: "#63b3ed",
    fontSize: 20,
  },
  featuredTitlePurple: {
    color: "#a78bfa",
    fontSize: 20,
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
