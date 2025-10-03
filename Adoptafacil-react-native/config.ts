// config.ts
import { Platform } from "react-native";

const API_CONFIG = {
  // Android Emulator (10.0.2.2 redirige al host)
  ANDROID_EMULATOR: "http://10.0.2.2:8080/api",

  // iOS Simulator y Web usan localhost
  IOS_SIMULATOR: "http://localhost:8080/api",
  WEB: "http://localhost:8080/api",

  // Dispositivo físico en la misma red Wi-Fi: USA LA IP LAN DEL HOST
  // ⚠️ Reemplaza <LAN_IP> por la IP que muestra Metro (ej. 192.168.20.85)
  PHYSICAL_DEVICE: "http://192.168.0.12:8080/api",

  // Producción (no tocar)
  PRODUCTION: "https://tu-api-produccion.com/api",
};

type Mode = "EMULATOR" | "SIMULATOR" | "PHYSICAL" | "WEB";

const SELECT_MODE = (): Mode => {
  if (__DEV__) {
    if (Platform.OS === "web") return "WEB";

    // === MODO SIMPLE (sin expo-device) ===
    // Cambia manualmente según estés probando:
    // - Emulador Android: "EMULATOR"
    // - Simulador iOS:    "SIMULATOR"
    // - Dispositivo físico (Android/iOS): "PHYSICAL"

    // ←←← ELIGE UNO SEGÚN LO QUE ESTÉS USANDO HOY
    return "PHYSICAL"; // "EMULATOR" | "SIMULATOR" | "PHYSICAL" | "WEB"
  }
  // Producción
  return "PHYSICAL";
};

const getApiUrl = (): string => {
  const mode = SELECT_MODE();

  if (__DEV__) {
    switch (mode) {
      case "EMULATOR":
        return API_CONFIG.ANDROID_EMULATOR;
      case "SIMULATOR":
        return API_CONFIG.IOS_SIMULATOR;
      case "WEB":
        return API_CONFIG.WEB;
      case "PHYSICAL":
      default:
        return API_CONFIG.PHYSICAL_DEVICE;
    }
  }

  // Producción
  return API_CONFIG.PRODUCTION;
};

export const BASE_URL = getApiUrl();
export const API_TIMEOUT = 15000;

export const APP_CONFIG = {
  JWT_TOKEN_KEY: "@adoptafacil_token",
  USER_DATA_KEY: "@adoptafacil_user",
  API_TIMEOUT,
};

if (__DEV__) {
  // Logs de diagnóstico
  console.log("Platform detected:", Platform.OS);
  console.log("API URL configurada:", BASE_URL);
  console.log("=== API CONFIGURATION ===");
  console.log("BASE_URL:", BASE_URL);
  console.log("API_TIMEOUT:", API_TIMEOUT);
  console.log("========================");
}
