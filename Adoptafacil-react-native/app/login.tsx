import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { authAPI } from "@/api";

export default function LoginScreen() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      email: "",
      password: "",
    };

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "El correo es requerido";
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Ingresa un correo válido";
      isValid = false;
    }

    // Validar contraseña
    if (!formData.password) {
      newErrors.password = "La contraseña es requerida";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleLogin = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      const response = await authAPI.login(formData.email, formData.password);

      Alert.alert("Login Exitoso", `Bienvenido ${response.user.name}!`, [
        {
          text: "OK",
          onPress: () => router.replace("/(tabs)"),
        },
      ]);
    } catch (error) {
      Alert.alert(
        "Error",
        error instanceof Error ? error.message : "Error al iniciar sesión"
      );
    } finally {
      setLoading(false);
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
          <ThemedView style={styles.loginContainer}>
            <Image
              source={require("@/assets/images/Logo.png")}
              style={styles.logo}
            />
            <ThemedText style={styles.title}>Iniciar Sesión</ThemedText>
            <ThemedText style={styles.subtitle}>
              Bienvenido de vuelta a AdoptaFácil
            </ThemedText>

            <View style={styles.formContainer}>
              <TextInput
                style={[styles.input, errors.email ? styles.inputError : null]}
                placeholder="Correo electrónico"
                placeholderTextColor="#718096"
                keyboardType="email-address"
                autoCapitalize="none"
                value={formData.email}
                onChangeText={(text) => {
                  setFormData({ ...formData, email: text });
                  if (errors.email) {
                    setErrors({ ...errors, email: "" });
                  }
                }}
              />
              {errors.email ? (
                <ThemedText style={styles.errorText}>{errors.email}</ThemedText>
              ) : null}

              <TextInput
                style={[
                  styles.input,
                  errors.password ? styles.inputError : null,
                ]}
                placeholder="Contraseña"
                placeholderTextColor="#718096"
                secureTextEntry
                value={formData.password}
                onChangeText={(text) => {
                  setFormData({ ...formData, password: text });
                  if (errors.password) {
                    setErrors({ ...errors, password: "" });
                  }
                }}
              />
              {errors.password ? (
                <ThemedText style={styles.errorText}>
                  {errors.password}
                </ThemedText>
              ) : null}

              <TouchableOpacity
                style={[
                  styles.loginButton,
                  loading ? styles.buttonDisabled : null,
                ]}
                onPress={handleLogin}
                disabled={loading}
              >
                <ThemedText style={styles.loginButtonText}>
                  {loading ? "Iniciando..." : "Iniciar Sesión"}
                </ThemedText>
              </TouchableOpacity>

              <TouchableOpacity style={styles.forgotPassword}>
                <ThemedText style={styles.forgotPasswordText}>
                  ¿Olvidaste tu contraseña?
                </ThemedText>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.registerButton}
                onPress={() => router.push("/register-options")}
              >
                <ThemedText style={styles.registerButtonText}>
                  ¿No tienes cuenta? Regístrate
                </ThemedText>
              </TouchableOpacity>
            </View>
          </ThemedView>
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
  },
  logo: {
    width: 100,
    height: 100,
  },
  loginContainer: {
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
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#0e0f11ff",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#2a3038ff",
    textAlign: "center",
    marginBottom: 30,
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
    marginBottom: 15,
    backgroundColor: "#f8f9fa",
    color: "#2d3748",
    fontSize: 16,
  },
  loginButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#039a00ff",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#a8e6cf",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  loginButtonText: {
    color: "#ffffffff",
    fontWeight: "bold",
    fontSize: 16,
  },
  forgotPassword: {
    alignSelf: "center",
    marginTop: 15,
  },
  forgotPasswordText: {
    color: "#0013bfff",
    fontSize: 14,
  },
  registerButton: {
    alignSelf: "center",
    marginTop: 20,
  },
  registerButtonText: {
    color: "#01e157ff",
    fontSize: 14,
    fontWeight: "bold",
  },
  inputError: {
    borderColor: "#e53e3e",
    borderWidth: 2,
  },
  errorText: {
    color: "#e53e3e",
    fontSize: 12,
    marginTop: -10,
    marginBottom: 10,
    marginLeft: 20,
  },
  buttonDisabled: {
    backgroundColor: "#a0aec0",
    opacity: 0.6,
  },
});
