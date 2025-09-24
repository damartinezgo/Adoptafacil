import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

export default function RefugiosScreen() {
  return (
    <ThemedView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <ThemedText type="title">Refugios</ThemedText>
      <ThemedText>
        Próximamente: Información sobre refugios y centros de adopción.
      </ThemedText>
    </ThemedView>
  );
}
