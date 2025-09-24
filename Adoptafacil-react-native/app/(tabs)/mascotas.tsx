import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { ScrollView, View, StyleSheet, Image } from "react-native";
import { useMascotas,Mascota } from "./settings";
import { LinearGradient } from "expo-linear-gradient";

export default function MascotasScreen() {
  const {mascotas} = useMascotas();
  return (
    <ScrollView style={styles.container}>
          <LinearGradient
            colors={["#00c161ff", "#0000c5ff"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.MascotasScreen}
          >
      <ThemedText type="title" style={styles.title}>
        Mascotas Disponibles
      </ThemedText>
      <ThemedText style={styles.subtitle}>
      Estos son nuestros animales en busca de un hogar, amor y mucho cariño!
      </ThemedText>
      <ScrollView contentContainerStyle={styles.cardsContainer}>
        { mascotas.map((mascota:Mascota) => (
          <View key={mascota.id} style={styles.card}>
            <Image source={{ uri: mascota.imagenes?.[0] }} style={styles.foto} /> {/* se tiene que usar imagen en formato png */}
            <View style={styles.info}>
              <ThemedText style={styles.nombre}>{mascota.nombre}</ThemedText>
              <ThemedText style={styles.detalle}>
                {mascota.especie} - {mascota.raza}
              </ThemedText>
              <ThemedText style={styles.detalle}>{mascota.edad}</ThemedText>
              
            </View>
          </View>
        ))}
      </ScrollView>
    </LinearGradient>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7fafc",
  },

  MascotasScreen: {
    padding: 20,
    alignItems: "center",
    minHeight: 400,
    justifyContent: "center",
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    textAlign: "center",
  },

  highlight: {
    color: "#4F8EF7",
  },

  subtitle: {
    fontSize: 16,
    color: "white",
    marginBottom: 20,
    textAlign: "center",
    lineHeight: 22,
  },

  cardsContainer: {
    width: "100%",
    flexWrap: "wrap",
    marginTop: 20,
    marginBottom: 30,
    flexDirection: "row",
    justifyContent: "space-around",
  },

  card: {
    marginBottom: 20,
    width: "45%",
    maxWidth: 220,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 24,
    paddingVertical: 25,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.25)",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
    alignItems: "center",
  },

  foto: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 12,
    backgroundColor: "#eee",
  },

  info: {
    alignItems: "center",
  },

  nombre: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 6,
  },

  detalle: {
    fontSize: 15,
    color: "#eee",
    textAlign: "center",
  },
});