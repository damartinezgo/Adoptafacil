import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

export default function RegisterScreen() {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    contrasena: "",
    confirmarContrasena: "",
  });

  const [errors, setErrors] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    contrasena: "",
    confirmarContrasena: "",
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      nombre: "",
      apellido: "",
      correo: "",
      contrasena: "",
      confirmarContrasena: "",
    };

    // Validar nombre
    if (!formData.nombre.trim()) {
      newErrors.nombre = "El nombre es requerido";
      isValid = false;
    }

    // Validar apellido
    if (!formData.apellido.trim()) {
      newErrors.apellido = "El apellido es requerido";
      isValid = false;
    }

    // Validar correo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.correo.trim()) {
      newErrors.correo = "El correo es requerido";
      isValid = false;
    } else if (!emailRegex.test(formData.correo)) {
      newErrors.correo = "Ingresa un correo válido";
      isValid = false;
    }

    // Validar contraseña
    if (!formData.contrasena) {
      newErrors.contrasena = "La contraseña es requerida";
      isValid = false;
    } else if (formData.contrasena.length < 6) {
      newErrors.contrasena = "La contraseña debe tener al menos 6 caracteres";
      isValid = false;
    }

    // Validar confirmación
    if (!formData.confirmarContrasena) {
      newErrors.confirmarContrasena = "Confirma tu contraseña";
      isValid = false;
    } else if (formData.contrasena !== formData.confirmarContrasena) {
      newErrors.confirmarContrasena = "Las contraseñas no coinciden";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleRegister = () => {
    if (validateForm()) {
      // Aquí iría la lógica de registro (API call, etc.)
      Alert.alert(
        "Registro Exitoso",
        "¡Tu cuenta ha sido creada exitosamente!",
        [
          {
            text: "OK",
            onPress: () => router.push("/login"),
          },
        ]
      );
    }
  };

  const updateField = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    // Limpiar error cuando el usuario empiece a escribir
    if (errors[field as keyof typeof errors]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#02d36bff", "#0000c5ff"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <BlurView intensity={50} style={styles.blurContainer}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <ThemedView style={styles.registerContainer}>
              <Image
                source={require("@/assets/images/Logo.png")}
                style={styles.logo}
              />
              <ThemedText style={styles.title}>Crear Cuenta</ThemedText>
              <ThemedText style={styles.subtitle}>
                Únete a AdoptaFácil y encuentra tu compañero perfecto
              </ThemedText>

              <View style={styles.formContainer}>
                <TextInput
                  style={[
                    styles.input,
                    errors.nombre ? styles.inputError : null,
                  ]}
                  placeholder="Nombre"
                  placeholderTextColor="#718096"
                  value={formData.nombre}
                  onChangeText={(value) => updateField("nombre", value)}
                />
                {errors.nombre ? (
                  <ThemedText style={styles.errorText}>
                    {errors.nombre}
                  </ThemedText>
                ) : null}

                <TextInput
                  style={[
                    styles.input,
                    errors.apellido ? styles.inputError : null,
                  ]}
                  placeholder="Apellido"
                  placeholderTextColor="#718096"
                  value={formData.apellido}
                  onChangeText={(value) => updateField("apellido", value)}
                />
                {errors.apellido ? (
                  <ThemedText style={styles.errorText}>
                    {errors.apellido}
                  </ThemedText>
                ) : null}

                <TextInput
                  style={[
                    styles.input,
                    errors.correo ? styles.inputError : null,
                  ]}
                  placeholder="Correo electrónico"
                  placeholderTextColor="#718096"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={formData.correo}
                  onChangeText={(value) => updateField("correo", value)}
                />
                {errors.correo ? (
                  <ThemedText style={styles.errorText}>
                    {errors.correo}
                  </ThemedText>
                ) : null}

                <TextInput
                  style={[
                    styles.input,
                    errors.contrasena ? styles.inputError : null,
                  ]}
                  placeholder="Contraseña"
                  placeholderTextColor="#718096"
                  secureTextEntry
                  value={formData.contrasena}
                  onChangeText={(value) => updateField("contrasena", value)}
                />
                {errors.contrasena ? (
                  <ThemedText style={styles.errorText}>
                    {errors.contrasena}
                  </ThemedText>
                ) : null}

                <TextInput
                  style={[
                    styles.input,
                    errors.confirmarContrasena ? styles.inputError : null,
                  ]}
                  placeholder="Confirmar contraseña"
                  placeholderTextColor="#718096"
                  secureTextEntry
                  value={formData.confirmarContrasena}
                  onChangeText={(value) =>
                    updateField("confirmarContrasena", value)
                  }
                />
                {errors.confirmarContrasena ? (
                  <ThemedText style={styles.errorText}>
                    {errors.confirmarContrasena}
                  </ThemedText>
                ) : null}

                <TouchableOpacity
                  style={styles.registerButton}
                  onPress={handleRegister}
                >
                  <ThemedText style={styles.registerButtonText}>
                    Crear Cuenta
                  </ThemedText>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.loginButton}
                  onPress={() => router.push("/login")}
                >
                  <ThemedText style={styles.loginButtonText}>
                    ¿Ya tienes cuenta? Inicia Sesión
                  </ThemedText>
                </TouchableOpacity>
              </View>
            </ThemedView>
          </ScrollView>
        </BlurView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  blurContainer: {
    borderRadius: 20,
    overflow: "hidden",
    width: "100%",
    maxWidth: 400,
    maxHeight: "90%",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  registerContainer: {
    backgroundColor: "transparent",
    borderRadius: 20,
    padding: 30,
    width: "100%",
    maxWidth: 400,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
    alignItems: "center",
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0e0f11ff",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#2a3038ff",
    textAlign: "center",
    marginBottom: 25,
  },
  formContainer: {
    width: "100%",
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 25,
    paddingHorizontal: 20,
    marginBottom: 5,
    backgroundColor: "#f8f9fa",
    color: "#2d3748",
    fontSize: 16,
  },
  inputError: {
    borderColor: "#e53e3e",
  },
  errorText: {
    color: "#e53e3e",
    fontSize: 12,
    marginBottom: 10,
    alignSelf: "flex-start",
  },
  registerButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#039a00ff",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
    shadowColor: "#a8e6cf",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  registerButtonText: {
    color: "#ffffffff",
    fontWeight: "bold",
    fontSize: 16,
  },
  loginButton: {
    alignSelf: "center",
    marginTop: 20,
  },
  loginButtonText: {
    color: "#01e157ff",
    fontSize: 14,
    fontWeight: "bold",
  },
});
