import { ThemedText } from "@/components/themed-text";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Picker } from "@react-native-picker/picker";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import {
  FlatList,
  Modal,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface FormData {
  nombre: string;
  especie: string;
  raza: string;
  fechaNacimiento: string;
  edad: string;
  sexo: string;
  ciudad: string;
  descripcion: string;
  imagenes: string[];
}

interface AgregarMascotaModalProps {
  visible: boolean;
  onClose: () => void;
  form: FormData;
  setForm: (form: FormData) => void;
  razasPerros: string[];
  razasGatos: string[];
  ciudadesColombia: string[];
  handleFechaChange: (fecha: string) => void;
  pickImage: () => void;
  handleSave: () => void;
}

export default function AgregarMascotaModal({
  visible,
  onClose,
  form,
  setForm,
  razasPerros,
  razasGatos,
  ciudadesColombia,
  handleFechaChange,
  pickImage,
  handleSave,
}: AgregarMascotaModalProps) {
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
          style={styles.header}
        >
          <ThemedText type="title" style={styles.modalTitle}>
            Agregar Mascota
          </ThemedText>
        </LinearGradient>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.fieldContainer}>
            <ThemedText style={styles.label}>Nombre</ThemedText>
            <View style={styles.inputContainer}>
              <IconSymbol
                name="tag.fill"
                size={20}
                color="#68d391"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.inputWithIcon}
                value={form.nombre}
                onChangeText={(text) => setForm({ ...form, nombre: text })}
                placeholder="Nombre de la mascota"
                placeholderTextColor="#718096"
              />
            </View>
          </View>

          <View style={styles.fieldContainer}>
            <ThemedText style={styles.label}>Especie</ThemedText>
            <View style={styles.pickerContainer}>
              <IconSymbol
                name="pawprint.fill"
                size={20}
                color="#68d391"
                style={styles.inputIcon}
              />
              <View style={styles.pickerWrapper}>
                <Picker
                  selectedValue={form.especie}
                  onValueChange={(itemValue) =>
                    setForm({ ...form, especie: itemValue, raza: "" })
                  }
                  style={styles.picker}
                >
                  <Picker.Item label="Selecciona especie" value="" />
                  <Picker.Item label="Perro" value="Perro" />
                  <Picker.Item label="Gato" value="Gato" />
                </Picker>
              </View>
              <IconSymbol
                name="chevron.down"
                size={20}
                color="#718096"
                style={styles.chevronIcon}
              />
            </View>
          </View>

          <View style={styles.fieldContainer}>
            <ThemedText style={styles.label}>Raza</ThemedText>
            <View style={styles.pickerContainer}>
              <IconSymbol
                name="star.fill"
                size={20}
                color="#a78bfa"
                style={styles.inputIcon}
              />
              <View style={styles.pickerWrapper}>
                <Picker
                  selectedValue={form.raza}
                  onValueChange={(itemValue) =>
                    setForm({ ...form, raza: itemValue })
                  }
                  style={styles.picker}
                  enabled={!!form.especie}
                >
                  <Picker.Item label="Selecciona raza" value="" />
                  {(form.especie === "Perro"
                    ? razasPerros
                    : form.especie === "Gato"
                    ? razasGatos
                    : []
                  ).map((raza) => (
                    <Picker.Item key={raza} label={raza} value={raza} />
                  ))}
                </Picker>
              </View>
              <IconSymbol
                name="chevron.down"
                size={20}
                color="#718096"
                style={styles.chevronIcon}
              />
            </View>
          </View>

          <View style={styles.fieldContainer}>
            <ThemedText style={styles.label}>
              Fecha de Nacimiento (YYYY-MM-DD)
            </ThemedText>
            <View style={styles.inputContainer}>
              <IconSymbol
                name="calendar"
                size={20}
                color="#63b3ed"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.inputWithIcon}
                value={form.fechaNacimiento}
                onChangeText={handleFechaChange}
                placeholder="2020-01-01"
                placeholderTextColor="#718096"
              />
            </View>
          </View>

          <View style={styles.fieldContainer}>
            <ThemedText style={styles.label}>Edad</ThemedText>
            <View style={styles.inputContainer}>
              <IconSymbol
                name="clock.fill"
                size={20}
                color="#a78bfa"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.inputWithIcon}
                value={form.edad}
                editable={false}
                placeholder="Se calcula automáticamente"
                placeholderTextColor="#718096"
              />
            </View>
          </View>

          <View style={styles.fieldContainer}>
            <ThemedText style={styles.label}>Sexo</ThemedText>
            <View style={styles.pickerContainer}>
              <IconSymbol
                name="person.fill"
                size={20}
                color="#63b3ed"
                style={styles.inputIcon}
              />
              <View style={styles.pickerWrapper}>
                <Picker
                  selectedValue={form.sexo}
                  onValueChange={(itemValue) =>
                    setForm({ ...form, sexo: itemValue })
                  }
                  style={styles.picker}
                >
                  <Picker.Item label="Selecciona sexo" value="" />
                  <Picker.Item label="Macho" value="Macho" />
                  <Picker.Item label="Hembra" value="Hembra" />
                </Picker>
              </View>
              <IconSymbol
                name="chevron.down"
                size={20}
                color="#718096"
                style={styles.chevronIcon}
              />
            </View>
          </View>

          <View style={styles.fieldContainer}>
            <ThemedText style={styles.label}>Ciudad</ThemedText>
            <View style={styles.pickerContainer}>
              <IconSymbol
                name="location.fill"
                size={20}
                color="#68d391"
                style={styles.inputIcon}
              />
              <View style={styles.pickerWrapper}>
                <Picker
                  selectedValue={form.ciudad}
                  onValueChange={(itemValue) =>
                    setForm({ ...form, ciudad: itemValue })
                  }
                  style={styles.picker}
                >
                  <Picker.Item label="Selecciona ciudad" value="" />
                  {ciudadesColombia.map((ciudad) => (
                    <Picker.Item key={ciudad} label={ciudad} value={ciudad} />
                  ))}
                </Picker>
              </View>
              <IconSymbol
                name="chevron.down"
                size={20}
                color="#718096"
                style={styles.chevronIcon}
              />
            </View>
          </View>

          <View style={styles.fieldContainer}>
            <ThemedText style={styles.label}>Descripción</ThemedText>
            <View style={styles.inputContainer}>
              <IconSymbol
                name="text.bubble.fill"
                size={20}
                color="#a78bfa"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.textAreaWithIcon}
                value={form.descripcion}
                onChangeText={(text) => setForm({ ...form, descripcion: text })}
                placeholder="Descripción de la mascota"
                placeholderTextColor="#718096"
                multiline
              />
            </View>
          </View>

          <View style={styles.fieldContainer}>
            <ThemedText style={styles.label}>
              Imágenes ({form.imagenes.length}/3)
            </ThemedText>
            <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
              <IconSymbol name="plus" size={20} color="#ffffff" />
              <ThemedText style={styles.imageButtonText}>
                Seleccionar Imagen
              </ThemedText>
            </TouchableOpacity>
            <FlatList
              horizontal
              data={form.imagenes}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <Image source={{ uri: item }} style={styles.thumbnail} />
              )}
              contentContainerStyle={styles.imageList}
            />
          </View>

          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <LinearGradient
              colors={["#68d391", "#63b3ed"]}
              style={styles.saveButtonGradient}
            >
              <IconSymbol name="checkmark" size={24} color="#ffffff" />
              <ThemedText style={styles.saveButtonText}>
                Guardar Mascota
              </ThemedText>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <ThemedText style={styles.closeButtonText}>Cerrar</ThemedText>
          </TouchableOpacity>
        </ScrollView>
      </LinearGradient>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
  },
  header: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginBottom: 20,
    alignItems: "center",
    borderRadius: 0,
    shadowColor: "#01a9aeff",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffffff",
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  fieldContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#2a3038ff",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 12,
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  inputIcon: {
    paddingLeft: 12,
  },
  inputWithIcon: {
    flex: 1,
    padding: 12,
    color: "#2d3748",
    fontSize: 16,
  },
  pickerWrapper: {
    flex: 1,
  },
  chevronIcon: {
    paddingRight: 12,
  },
  textAreaWithIcon: {
    flex: 1,
    padding: 12,
    color: "#2d3748",
    fontSize: 16,
    height: 80,
    textAlignVertical: "top",
  },
  input: {
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 12,
    padding: 12,
    backgroundColor: "#ffffff",
    color: "#2d3748",
    fontSize: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  pickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 12,
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  picker: {
    color: "#000000",
    fontSize: 16,
  },
  textArea: {
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 12,
    padding: 12,
    backgroundColor: "#ffffff",
    color: "#2d3748",
    height: 80,
    textAlignVertical: "top",
    fontSize: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  imageButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#63b3ed",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  imageButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
  imageList: {
    paddingVertical: 10,
  },
  thumbnail: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginRight: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  saveButton: {
    marginTop: 20,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  saveButtonGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  saveButtonText: {
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
    marginTop: 10,
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
