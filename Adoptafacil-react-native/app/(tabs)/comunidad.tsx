import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

export default function ComunidadScreen() {
  return (
    <ThemedView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <ThemedText type="title">Comunidad</ThemedText>
      <ThemedText>
        Próximamente: Foro y comunidad de amantes de las mascotas.
      </ThemedText>
    </ThemedView>
  );
}
