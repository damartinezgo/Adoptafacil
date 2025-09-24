import { ThemedText } from "@/components/themed-text";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { LinearGradient } from "expo-linear-gradient";
import {
  FlatList,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

interface Mascota {
  id: number;
  nombre: string;
  especie: string;
  raza: string;
  edad: string;
}

interface GestionarMascotasModalProps {
  visible: boolean;
  onClose: () => void;
  mascotas: Mascota[];
  onAddPress: () => void;
}

export default function GestionarMascotasModal({
  visible,
  onClose,
  mascotas,
  onAddPress,
}: GestionarMascotasModalProps) {
  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <LinearGradient
        colors={["#f7fafc", "#ffffff"]}
        style={styles.modalContainer}
      >
        <LinearGradient
          colors={["#02d36bff", "#0000c5ff"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.headerGradient}
        >
          <ThemedText type="title" style={styles.modalTitle}>
            Mis Mascotas
          </ThemedText>
        </LinearGradient>
        <FlatList
          data={mascotas}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <LinearGradient
              colors={["#ffffff", "#f8f9fa"]}
              style={styles.mascotaItem}
            >
              <View style={styles.mascotaInfo}>
                <IconSymbol name="pawprint.fill" size={24} color="#68d391" />
                <View style={styles.textContainer}>
                  <ThemedText style={styles.mascotaName}>
                    {item.nombre}
                  </ThemedText>
                  <ThemedText style={styles.mascotaDetails}>
                    {item.especie} - {item.raza} - {item.edad}
                  </ThemedText>
                </View>
              </View>
              <View style={styles.actions}>
                <TouchableOpacity style={styles.actionButton}>
                  <IconSymbol name="pencil" size={20} color="#ffffff" />
                  <ThemedText style={styles.actionText}>Editar</ThemedText>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButtonDelete}>
                  <IconSymbol name="trash.fill" size={20} color="#ffffff" />
                  <ThemedText style={styles.actionText}>Eliminar</ThemedText>
                </TouchableOpacity>
              </View>
            </LinearGradient>
          )}
          contentContainerStyle={styles.listContainer}
        />
        <TouchableOpacity style={styles.addButton} onPress={onAddPress}>
          <LinearGradient
            colors={["#68d391", "#63b3ed"]}
            style={styles.addButtonGradient}
          >
            <IconSymbol name="plus" size={24} color="#ffffff" />
            <ThemedText style={styles.addButtonText}>
              Agregar Mascota
            </ThemedText>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <ThemedText style={styles.closeButtonText}>Cerrar</ThemedText>
        </TouchableOpacity>
      </LinearGradient>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    padding: 20,
  },
  headerGradient: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 15,
    marginBottom: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  modalTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#ffffffff",
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  listContainer: {
    paddingBottom: 20,
  },
  mascotaItem: {
    padding: 20,
    marginBottom: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  mascotaInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  textContainer: {
    marginLeft: 15,
    flex: 1,
  },
  mascotaName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0e0f11ff",
  },
  mascotaDetails: {
    fontSize: 14,
    color: "#2a3038ff",
    marginTop: 2,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#68d391",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  actionButtonDelete: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e53e3e",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  actionText: {
    color: "#ffffffff",
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 5,
  },
  addButton: {
    marginBottom: 20,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  addButtonGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  addButtonText: {
    color: "#ffffffff",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
  closeButton: {
    backgroundColor: "#63b3ed",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  closeButtonText: {
    color: "#ffffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
