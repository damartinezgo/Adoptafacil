import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { ScrollView, View, StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function RefugiosScreen() {

  const refugios = [
    { id: 1, nombre: "Refugio Huellitas", descripcion: "Rescatamos perros y gatos en situación de calle." },
    { id: 2, nombre: "Fundación Patitas", descripcion: "Cuidamos y damos en adopción a mascotas abandonadas." },
    { id: 3, nombre: "Adopta Amor", descripcion: "Tu apoyo nos permite alimentar y vacunar a cientos de animales." },
  ];

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={["#00c161ff", "#0000c5ff"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <ThemedText type="title" style={styles.title}>
          Apoya a los Refugios
        </ThemedText>
        <ThemedText style={styles.subtitle}>
          Tu donación ayuda a salvar vidas y mantener a los animales seguros
        </ThemedText>
      </LinearGradient>

      <View style={styles.cardsContainer}>
        {refugios.map((refugio) => (
          <ThemedView key={refugio.id} style={styles.card}>
            <ThemedText type="subtitle" style={styles.cardTitle}>
              {refugio.nombre}
            </ThemedText>
            <ThemedText style={styles.cardDesc}>{refugio.descripcion}</ThemedText>

            <TouchableOpacity style={styles.donateButton}>
              <ThemedText style={{ color: "white", fontWeight: "bold" }}>
                Donar
              </ThemedText>
            </TouchableOpacity>
          </ThemedView>
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
  header: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 200,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
    paddingHorizontal: 20,
  },
  cardsContainer: {
    padding: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  cardTitle: {
    fontWeight: "bold",
    marginBottom: 6,
  },
  cardDesc: {
    fontSize: 14,
    color: "#4b5563",
    marginBottom: 12,
  },
  donateButton: {
    backgroundColor: "#10b981",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
});
