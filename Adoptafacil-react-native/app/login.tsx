import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import {
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { router } from "expo-router";

export default function LoginScreen() {
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
                style={styles.input}
                placeholder="Correo electrónico"
                placeholderTextColor="#718096"
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <TextInput
                style={styles.input}
                placeholder="Contraseña"
                placeholderTextColor="#718096"
                secureTextEntry
              />

              <TouchableOpacity style={styles.loginButton}>
                <ThemedText style={styles.loginButtonText}>
                  Iniciar Sesión
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
});
