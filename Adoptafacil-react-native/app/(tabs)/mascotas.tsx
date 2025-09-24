import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

export default function MascotasScreen() {
  return (
    <ThemedView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <ThemedText type="title">Mascotas</ThemedText>
      <ThemedText>
        Próximamente: Lista de mascotas disponibles para adopción.
      </ThemedText>
    </ThemedView>
  );
}
