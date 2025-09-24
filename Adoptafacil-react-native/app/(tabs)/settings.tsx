import {
  AgregarMascotaModal,
  GestionarMascotasModal,
} from "@/components/gestionar-mascotas";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Alert, ScrollView, StyleSheet, TouchableOpacity } from "react-native";

export default function ConfiguracionScreen() {
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [mascotas, setMascotas] = useState([
    {
      id: 1,
      nombre: "Firulais",
      especie: "Perro",
      raza: "Labrador",
      edad: "2 años",
    },
    { id: 2, nombre: "Michi", especie: "Gato", raza: "Siamés", edad: "1 año" },
  ]);

  const [form, setForm] = useState({
    nombre: "",
    especie: "",
    raza: "",
    fechaNacimiento: "",
    edad: "",
    sexo: "",
    ciudad: "",
    descripcion: "",
    imagenes: [] as string[],
  });

  const razasPerros = [
    "Labrador",
    "Bulldog",
    "Poodle",
    "Chihuahua",
    "Golden Retriever",
  ];
  const razasGatos = ["Siamés", "Persa", "Maine Coon", "Bengalí", "Ragdoll"];
  const ciudadesColombia = [
    "Bogotá",
    "Medellín",
    "Cali",
    "Barranquilla",
    "Cartagena",
    "Cúcuta",
    "Bucaramanga",
    "Pereira",
  ];

  const calcularEdad = (fecha: string) => {
    if (!fecha) return "";
    const nacimiento = new Date(fecha);
    const hoy = new Date();
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--;
    }
    return `${edad} años`;
  };

  const handleFechaChange = (fecha: string) => {
    setForm({ ...form, fechaNacimiento: fecha, edad: calcularEdad(fecha) });
  };

  const pickImage = async () => {
    if (form.imagenes.length >= 3) {
      Alert.alert("Máximo 3 imágenes");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setForm({ ...form, imagenes: [...form.imagenes, result.assets[0].uri] });
    }
  };

  const handleSave = () => {
    // Validar campos
    if (
      !form.nombre ||
      !form.especie ||
      !form.raza ||
      !form.fechaNacimiento ||
      !form.sexo ||
      !form.ciudad
    ) {
      Alert.alert("Error", "Por favor completa todos los campos obligatorios");
      return;
    }
    const newMascota = {
      id: mascotas.length + 1,
      nombre: form.nombre,
      especie: form.especie,
      raza: form.raza,
      edad: form.edad,
    };
    setMascotas([...mascotas, newMascota]);
    setForm({
      nombre: "",
      especie: "",
      raza: "",
      fechaNacimiento: "",
      edad: "",
      sexo: "",
      ciudad: "",
      descripcion: "",
      imagenes: [],
    });
    setShowAddModal(false);
  };

  const settingsOptions = [
    {
      title: "Gestionar Mascotas",
      description: "Agregar, editar, eliminar y ver mascotas",
      onPress: () => setShowModal(true),
    },
    {
      title: "Configuración de Cuenta",
      description: "Cambiar contraseña, email, etc.",
      onPress: () => {
        // TODO: Navigate to account settings
        console.log("Navigate to Configuración de Cuenta");
      },
    },
    {
      title: "Notificaciones",
      description: "Configurar preferencias de notificaciones",
      onPress: () => {
        // TODO: Navigate to notifications settings
        console.log("Navigate to Notificaciones");
      },
    },
    {
      title: "Ayuda y Soporte",
      description: "Centro de ayuda y contacto",
      onPress: () => {
        // TODO: Navigate to help screen
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

      <GestionarMascotasModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        mascotas={mascotas}
        onAddPress={() => setShowAddModal(true)}
      />

      <AgregarMascotaModal
        visible={showAddModal}
        onClose={() => setShowAddModal(false)}
        form={form}
        setForm={setForm}
        razasPerros={razasPerros}
        razasGatos={razasGatos}
        ciudadesColombia={ciudadesColombia}
        handleFechaChange={handleFechaChange}
        pickImage={pickImage}
        handleSave={handleSave}
      />
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
