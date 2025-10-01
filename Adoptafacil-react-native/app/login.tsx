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
import { authAPI } from "@/api";
import { useAuth } from "@/contexts/AuthContext";

export default function LoginScreen() {
  const { signIn } = useAuth();
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
      // Usar el contexto de autenticación para guardar el token y usuario
      await signIn(response.token, response.user);
      // El AuthContext se encargará de redirigir automáticamente
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
    <LinearGradient
      colors={["#02d36bff", "#0000c5ff"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradient}
    >
      <View style={styles.contentContainer}>
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
            style={[styles.input, errors.password ? styles.inputError : null]}
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
            <ThemedText style={styles.errorText}>{errors.password}</ThemedText>
          ) : null}

          <TouchableOpacity
            style={[styles.loginButton, loading ? styles.buttonDisabled : null]}
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
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    width: "100%",
    paddingHorizontal: 30,
    paddingVertical: 50,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 15,
    resizeMode: "contain",
  },
  title: {
    fontSize: 33,
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 12,
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 18,
    color: "#f0f0f0",
    textAlign: "center",
    marginBottom: 50,
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  formContainer: {
    width: "100%",
    maxWidth: 350,
  },
  input: {
    width: "100%",
    height: 60,
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.3)",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 30,
    paddingHorizontal: 25,
    marginBottom: 20,
    color: "#2d3748",
    fontSize: 16,
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  loginButton: {
    width: "100%",
    height: 60,
    backgroundColor: "#65c063ff",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  loginButtonText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 18,
  },
  forgotPassword: {
    alignSelf: "center",
    marginTop: 25,
    paddingVertical: 12,
  },
  forgotPasswordText: {
    color: "#ffffff",
    fontSize: 16,
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  registerButton: {
    alignSelf: "center",
    marginTop: 20,
    paddingVertical: 12,
  },
  registerButtonText: {
    color: "#a7eeeaff",
    fontSize: 16,
    fontWeight: "bold",
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  inputError: {
    borderColor: "#ff6b6b",
    borderWidth: 3,
    backgroundColor: "rgba(255, 255, 255, 0.95)",
  },
  errorText: {
    color: "#ff4757",
    fontSize: 14,
    marginTop: -15,
    marginBottom: 15,
    marginLeft: 25,
    fontWeight: "600",
    textShadowColor: "rgba(255, 255, 255, 0.8)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
  buttonDisabled: {
    backgroundColor: "#a0aec0",
    opacity: 0.7,
  },
});
