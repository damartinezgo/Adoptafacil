import React, { useState, useMemo } from "react";
import {
  View,
  StyleSheet,
  Image,
  TextInput,
  FlatList,
  Text,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { LinearGradient } from "expo-linear-gradient";
import { ThemedText } from "@/components/themed-text";
import { useMascotas, Mascota } from "./settings";

export default function MascotasScreen() {
  const { mascotas } = useMascotas();

  const [filters, setFilters] = useState({
    searchTerm: "",
    selectedEspecie: "all",
    selectedEdad: "all",
  });

  // Detectar si las edades parecen estar en meses
  const datasetSeemsInMonths = useMemo(() => {
    if (!mascotas || mascotas.length === 0) return true;
    const countGreaterThan24 = mascotas.reduce((acc, m) => {
      const n = Number(m.edad) || 0;
      return acc + (n > 24 ? 1 : 0);
    }, 0);
    return countGreaterThan24 >= mascotas.length / 2;
  }, [mascotas]);

  // Normalizar a meses
  const ageToMonths = (ageRaw: number | string) => {
    const n = Number(ageRaw) || 0;
    return datasetSeemsInMonths ? n : n * 12;
  };

  // Listas únicas
  const availableEspecies = useMemo(
    () => Array.from(new Set(mascotas.map((m) => m.especie))).filter(Boolean),
    [mascotas]
  );

  // Filtrado
const filteredPets = useMemo(() => {
  return mascotas.filter((pet) => {
    const term = filters.searchTerm.trim().toLowerCase();

    const searchTermMatch =
      !term ||
      pet.nombre?.toLowerCase().includes(term) ||
      pet.descripcion?.toLowerCase().includes(term) ||
      pet.raza?.toLowerCase().includes(term) ||
      pet.especie?.toLowerCase().includes(term); // 👈 aquí estaba el error

    const especieMatch =
      filters.selectedEspecie === "all" ||
      pet.especie === filters.selectedEspecie;

    const edadMeses = ageToMonths(pet.edad);
    const edadMatch =
      filters.selectedEdad === "all" ||
      (filters.selectedEdad === "joven" && edadMeses <= 24) ||
      (filters.selectedEdad === "adulto" && edadMeses > 24 && edadMeses <= 84) ||
      (filters.selectedEdad === "senior" && edadMeses > 84);

    return searchTermMatch && especieMatch && edadMatch;
  });
}, [filters, mascotas]);

  return (
    <LinearGradient
      colors={["#00c161ff", "#0000c5ff"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <ThemedText type="title" style={styles.title}>
        Mascotas Disponibles
      </ThemedText>
      <ThemedText style={styles.subtitle}>
        Estos son nuestros animales en busca de un hogar, amor y mucho cariño!
      </ThemedText>

      {/* Filtros */}
      <View style={styles.filtros}>
        <TextInput
          style={styles.input}
          placeholder="Buscar por nombre, raza o descripción..."
          placeholderTextColor="#666"
          value={filters.searchTerm}
          onChangeText={(t) => setFilters((p) => ({ ...p, searchTerm: t }))}
        />

        <Picker
          selectedValue={filters.selectedEspecie}
          style={styles.picker}
          onValueChange={(v) => setFilters((p) => ({ ...p, selectedEspecie: v }))}
        >
          <Picker.Item label="Todas las especies" value="all" />
          {availableEspecies.map((e) => (
            <Picker.Item key={e} label={e} value={e} />
          ))}
        </Picker>

        <Picker
          selectedValue={filters.selectedEdad}
          style={styles.picker}
          onValueChange={(v) => setFilters((p) => ({ ...p, selectedEdad: v }))}
        >
          <Picker.Item label="Todas las edades" value="all" />
          <Picker.Item label="Joven (0-2 años)" value="joven" />
          <Picker.Item label="Adulto (2-7 años)" value="adulto" />
          <Picker.Item label="Senior (7+ años)" value="senior" />
        </Picker>
      </View>

      {/* Lista */}
      <FlatList
        data={filteredPets}
        keyExtractor={(item) => String(item.id)}
        numColumns={2}
        contentContainerStyle={styles.cardsContainer}
        ListEmptyComponent={
          <View style={{ padding: 30 }}>
            <Text style={{ color: "#fff", textAlign: "center" }}>
              No se encontraron mascotas con esos filtros.
            </Text>
          </View>
        }
        renderItem={({ item: mascota }) => (
          <View style={styles.card}>
            <Image source={{ uri: mascota.imagenes?.[0] }} style={styles.foto} />
            <View style={styles.info}>
              <ThemedText style={styles.nombre}>{mascota.nombre}</ThemedText>
              <ThemedText style={styles.detalle}>
                {mascota.especie} - {mascota.raza}
              </ThemedText>
              <ThemedText style={styles.detalle}>
                {edadToFriendlyString(ageToMonths(mascota.edad))}
              </ThemedText>
            </View>
          </View>
        )}
      />
    </LinearGradient>
  );
}

function edadToFriendlyString(meses: number) {
  if (meses <= 1) return `${meses} mes`;
  if (meses < 12) return `${meses} meses`;
  const años = Math.floor(meses / 12);
  return años === 1 ? `${años} año` : `${años} años`;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    textAlign: "center",
    color: "#fff",
  },
  subtitle: {
    fontSize: 16,
    color: "white",
    marginBottom: 20,
    textAlign: "center",
    lineHeight: 22,
  },
  filtros: {
    width: "100%",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    color: "#000",
  },
  picker: {
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 10,
    marginBottom: 10,
  },
  cardsContainer: {
    paddingBottom: 30,
    paddingHorizontal: 2,
  },
  card: {
    flex: 1,
    margin: 8,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 24,
    paddingVertical: 18,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.25)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 6,
    alignItems: "center",
    minWidth: 140,
    maxWidth: 220,
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
    textAlign: "center",
  },
  detalle: {
    fontSize: 15,
    color: "#eee",
    textAlign: "center",
  },
});
