import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { View, TextInput, TouchableOpacity, ScrollView, Image } from "react-native";

export default function ComunidadScreen() {
  return (
    <View style={{ flex: 1, flexDirection: "column", backgroundColor: "#f3f4f6" }}>
      {/* BARRA SUPERIOR */}
      <View
        style={{
          height: 70,
          backgroundColor: "#d3e8d6ff",
          borderRadius: 25,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 16,
          marginHorizontal: 16,
        }}
      >
        {["🐶", "🐱", "🐰", "🦜"].map((emoji, idx) => (
          <TouchableOpacity
            key={idx}
            style={{
              width: 50,
              height: 50,
              borderRadius: 25,
              backgroundColor: "#d5e1e1ff",
              justifyContent: "center",
              alignItems: "center",
              marginHorizontal: 8,
            }}
          >
            <ThemedText style={{ fontSize: 24 }}>{emoji}</ThemedText>
          </TouchableOpacity>
        ))}
      </View>

      {/* CONTENIDO PRINCIPAL */}
      <ScrollView
        style={{ flex: 1, padding: 16 }}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Filtro Publicaciones */}
        <ThemedView
          style={{
            backgroundColor: "white",
            borderRadius: 12,
            padding: 16,
            marginBottom: 16,
            shadowColor: "#000",
            shadowOpacity: 0.05,
            shadowRadius: 6,
          }}
        >
          <ThemedText type="subtitle">Filtrar Publicaciones</ThemedText>
          <TextInput
            placeholder="Buscar por palabra clave..."
            style={{
              backgroundColor: "#f1f5f9",
              padding: 10,
              borderRadius: 8,
              marginTop: 8,
              marginBottom: 12,
            }}
          />
        </ThemedView>

        {/* Invitación */}
        <ThemedView
          style={{
            backgroundColor: "#ecfdf5",
            borderRadius: 12,
            padding: 16,
            marginBottom: 16,
          }}
        >
          <ThemedText type="title">¡Únete a nuestra comunidad!</ThemedText>
          <ThemedText>
            Comparte experiencias, consejos y ayuda a otros amantes de los animales.
          </ThemedText>
          <View style={{ flexDirection: "row", marginTop: 12 }}>
            <TouchableOpacity
              style={{
                backgroundColor: "#10b981",
                padding: 10,
                borderRadius: 8,
                marginRight: 8,
              }}
            >
              <ThemedText style={{ color: "white" }}>Crear Cuenta Gratis</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                borderColor: "#10b981",
                borderWidth: 1,
                padding: 10,
                borderRadius: 8,
              }}
            >
              <ThemedText style={{ color: "#10b981" }}>Ya tengo cuenta</ThemedText>
            </TouchableOpacity>
          </View>
        </ThemedView>

        {/* Publicación ejemplo */}
        <ThemedView
          style={{
            backgroundColor: "white",
            borderRadius: 12,
            padding: 16,
            marginBottom: 16,
          }}
        >
          <ThemedText type="subtitle">Danna <Martinez></Martinez></ThemedText>
          <ThemedText style={{ color: "#6b7280" }}>Hace 1 mes</ThemedText>
          <ThemedText>📢 Mañana jornada de esterilización.</ThemedText>
          <Image
            source={{ uri: "https://via.placeholder.com/150" }}
            style={{ height: 150, borderRadius: 8, marginTop: 8 }}
          />
        </ThemedView>
      </ScrollView>
    </View>
  );
}
