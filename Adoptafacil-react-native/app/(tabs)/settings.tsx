import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useState, createContext, useContext } from "react";
import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";

// se define la estructura de una mascota
export interface Mascota {
  id: number;
  nombre: string;
  especie: string;
  raza: string;
  edad: string;
  imagenes: string[];
}

// Creamos un contexto para compartir el estado de mascotas en toda la app
const MascotasContext = createContext<{
  mascotas: Mascota[];
  setMascotas: React.Dispatch<React.SetStateAction<Mascota[]>>;
} | null>(null);

// Hook personalizado para acceder fácilmente al contexto de mascotas
export function useMascotas() {
  const ctx = useContext(MascotasContext);
  if (!ctx)
    throw new Error("useMascotas debe usarse dentro de MascotasProvider");
  return ctx;
}

export function MascotasProvider({ children }: { children: React.ReactNode }) {
  const [mascotas, setMascotas] = useState<Mascota[]>([
    {
      id: 1,
      nombre: "Firulais",
      especie: "Perro",
      raza: "Labrador",
      edad: "2 años",
      imagenes: ["https://placedog.net/500/500?id=1"],
    },
    {
      id: 2,
      nombre: "Michi",
      especie: "Gato",
      raza: "Siamés",
      edad: "1 año",
      imagenes: ["https://cdn2.thecatapi.com/images/9j5.jpg"],
    },
    {
      id: 3,
      nombre: "Max",
      especie: "Perro",
      raza: "Bulldog",
      edad: "3 años",
      imagenes: ["https://placedog.net/500/500?id=2"],
    },
    {
      id: 4,
      nombre: "Luna",
      especie: "Gato",
      raza: "Persa",
      edad: "4 años",
      imagenes: ["https://cdn2.thecatapi.com/images/MTY3ODIyMQ.jpg"],
    },
  ]);

  // El Provider permite que cualquier componente hijo acceda a "mascotas" y "setMascotas"
  return (
    <MascotasContext.Provider value={{ mascotas, setMascotas }}>
      {children}
    </MascotasContext.Provider>
  );
}

export default function ConfiguracionScreen() {
  const settingsOptions = [
    {
      title: "Configuración de Cuenta",
      description: "Cambiar contraseña, email, etc.",
      onPress: () => {
        console.log("Navigate to Configuración de Cuenta");
      },
    },
    {
      title: "Notificaciones",
      description: "Configurar preferencias de notificaciones",
      onPress: () => {
        console.log("Navigate to Notificaciones");
      },
    },
    {
      title: "Ayuda y Soporte",
      description: "Centro de ayuda y contacto",
      onPress: () => {
        console.log("Navigate to Ayuda y Soporte");
      },
    },
  ];

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <ThemedText type="title" style={styles.title}>
          Configuración
        </ThemedText>
        {settingsOptions.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={styles.optionContainer}
            onPress={option.onPress}
          >
            <ThemedText type="subtitle" style={styles.optionTitle}>
              {option.title}
            </ThemedText>
            <ThemedText style={styles.optionDescription}>
              {option.description}
            </ThemedText>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  scrollContainer: {
    padding: 20,
  },
  title: {
    marginBottom: 20,
    textAlign: "center",
    color: "#0e0f11ff",
  },
  optionContainer: {
    backgroundColor: "#ffffff",
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#2a3038ff",
  },
  optionDescription: {
    fontSize: 14,
    color: "#718096",
  },
});
