import { ThemedText } from "@/components/themed-text";
import { ScrollView, View, StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function RefugiosScreen() {
  const refugios = [
    {
      id: 1,
      nombre: "Refugio Huellitas",
      descripcion: "Rescatamos perros y gatos en situación de calle.",
    },
    {
      id: 2,
      nombre: "Fundación Patitas",
      descripcion: "Cuidamos y damos en adopción a mascotas abandonadas.",
    },
    {
      id: 3,
      nombre: "Adopta Amor",
      descripcion:
        "Tu apoyo nos permite alimentar y vacunar a cientos de animales.",
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Hero Section con gradiente solo para título y subtítulo */}
      <LinearGradient
        colors={["#02d36bff", "#0000c5ff"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.heroSection}
      >
        <ThemedText style={styles.heroTitle}>Apoya a los Refugios</ThemedText>
        <ThemedText style={styles.heroSubtitle}>
          Tu donación ayuda a salvar vidas y mantener a los animales seguros
        </ThemedText>
      </LinearGradient>

      {/* Sección de contenido */}
      <View style={styles.contentSection}>
        {refugios.map((refugio) => (
          <View key={refugio.id} style={styles.card}>
            <ThemedText style={styles.cardTitle}>{refugio.nombre}</ThemedText>
            <ThemedText style={styles.cardDesc}>
              {refugio.descripcion}
            </ThemedText>

            <TouchableOpacity style={styles.donateButton}>
              <ThemedText style={styles.donateButtonText}>Donar</ThemedText>
            </TouchableOpacity>
          </View>
        ))}
      </View>
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
    paddingHorizontal: 10,
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  contentSection: {
    padding: 20,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 15,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2d3748",
    marginBottom: 8,
  },
  cardDesc: {
    fontSize: 15,
    color: "#718096",
    marginBottom: 16,
    lineHeight: 20,
  },
  donateButton: {
    backgroundColor: "#68d391",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  donateButtonText: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 15,
  },
});
