import { Platform } from "react-native";

// Configuración del API
const API_CONFIG = {
  // Para emulador de Android
  ANDROID_EMULATOR: "http://10.0.2.2:8080/api",

  // Para simulador de iOS
  IOS_SIMULATOR: "http://localhost:8080/api",

  // Para dispositivo físico
  PHYSICAL_DEVICE: "http://192.168.0.12:8080/api",

  // Para producción
  PRODUCTION: "https://tu-api-produccion.com/api",
};

// Función para obtener la URL correcta según el entorno
const getApiUrl = (): string => {
  if (__DEV__) {
    console.log("Platform detected:", Platform.OS);

    // Configuración específica por plataforma
    if (Platform.OS === "web") {
      // Para navegador web usar localhost
      return "http://localhost:8080/api";
    } else if (Platform.OS === "android") {
      // Para Android Emulator
      return API_CONFIG.ANDROID_EMULATOR;
    } else if (Platform.OS === "ios") {
      // Para iOS Simulator
      return API_CONFIG.IOS_SIMULATOR;
    } else {
      // Fallback - usar localhost por defecto
      return "http://localhost:8080/api";
    }
  } else {
    // En producción
    return API_CONFIG.PRODUCTION;
  }
};

export const BASE_URL = getApiUrl();

export const API_TIMEOUT = 3000; // 3 segundos - respuesta más rápida

// Configuraciones adicionales
export const APP_CONFIG = {
  JWT_TOKEN_KEY: "@adoptafacil_token",
  USER_DATA_KEY: "@adoptafacil_user",
  API_TIMEOUT: API_TIMEOUT,
};

// Para pruebas en dispositivo físico, puedes usar esta función
export const getPhysicalDeviceUrl = (): string => {
  return API_CONFIG.PHYSICAL_DEVICE;
};

console.log("API URL configurada:", BASE_URL);
