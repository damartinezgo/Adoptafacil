import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useMascotas } from "./(tabs)/settings";
import { Mascota } from "@/types";
import { useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
  View,
  Platform,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as ImagePicker from "expo-image-picker";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import axios, { isAxiosError } from "axios";
import { BASE_URL } from "@/config";
import { tokenStorage } from "@/api";
import { useAuth } from "@/contexts/AuthContext";
import {
  generarReportePDF,
  compartirPDF,
  type MascotaReporte,
} from "@/utils/pdfReport";
import DateTimePicker from "@react-native-community/datetimepicker";

// Datos de razas por especie
const RAZAS_PERROS = [
  "Labrador Retriever",
  "Golden Retriever",
  "Pastor Alemán",
  "Bulldog Francés",
  "Beagle",
  "Poodle",
  "Rottweiler",
  "Yorkshire Terrier",
  "Boxer",
  "Dachshund",
  "Siberian Husky",
  "Border Collie",
  "Chihuahua",
  "Shih Tzu",
  "Boston Terrier",
  "Pomeranian",
  "Cocker Spaniel",
  "Mastín",
  "Doberman",
  "Schnauzer",
  "Pitbull",
  "Jack Russell Terrier",
  "Maltes",
  "Bichón Frisé",
  "Akita",
  "San Bernardo",
  "Terranova",
  "Weimaraner",
  "Basset Hound",
  "Mestizo",
  "Criollo",
  "Otra",
];

const RAZAS_GATOS = [
  "Persa",
  "Maine Coon",
  "Siamés",
  "Ragdoll",
  "British Shorthair",
  "Abisinio",
  "Bengala",
  "Russian Blue",
  "Scottish Fold",
  "Sphynx",
  "Norwegian Forest",
  "Birman",
  "Oriental",
  "Burmese",
  "Tonkinese",
  "Manx",
  "Devon Rex",
  "Cornish Rex",
  "Angora Turco",
  "Chartreux",
  "Bombay",
  "Savannah",
  "Europeo",
  "Criollo",
  "Mestizo",
  "Callejero",
  "Otra",
];

// Ciudades principales de Colombia
const CIUDADES_COLOMBIA = [
  "Bogotá",
  "Medellín",
  "Cali",
  "Barranquilla",
  "Cartagena",
  "Cúcuta",
  "Soledad",
  "Ibagué",
  "Bucaramanga",
  "Soacha",
  "Santa Marta",
  "Villavicencio",
  "Valledupar",
  "Pereira",
  "Montería",
  "Pasto",
  "Manizales",
  "Neiva",
  "Palmira",
  "Popayán",
  "Buenaventura",
  "Floridablanca",
  "Sincelejo",
  "Tunja",
  "Armenia",
  "Girardot",
  "Riohacha",
  "Itagüí",
  "Envigado",
  "Cartago",
  "Bello",
  "Tuluá",
  "Facatativá",
  "Maicao",
  "Apartadó",
  "Zipaquirá",
  "Fusagasugá",
  "Chía",
  "Mosquera",
  "Duitama",
  "Sogamoso",
  "Girón",
  "Piedecuesta",
  "Magangué",
  "Quibdó",
  "Arauca",
  "Yopal",
  "Florencia",
  "Mocoa",
  "San Andrés",
  "Leticia",
  "Puerto Carreño",
  "Mitú",
  "Inírida",
].sort();

/**
 * Calcula la edad exacta desde una fecha de nacimiento
 * @param fechaNacimiento - Fecha de nacimiento en formato Date o string
 * @returns Texto formateado con años, meses y días
 */
const calcularEdadCompleta = (fechaNacimiento: Date | string): string => {
  if (!fechaNacimiento) return "";

  const fechaNac =
    typeof fechaNacimiento === "string"
      ? new Date(fechaNacimiento)
      : fechaNacimiento;
  const hoy = new Date();

  // Validar que la fecha no sea futura
  if (fechaNac > hoy) {
    return "Fecha inválida";
  }

  let años = hoy.getFullYear() - fechaNac.getFullYear();
  let meses = hoy.getMonth() - fechaNac.getMonth();
  let días = hoy.getDate() - fechaNac.getDate();

  // Ajustar si los días son negativos
  if (días < 0) {
    meses--;
    const diasEnMesAnterior = new Date(
      hoy.getFullYear(),
      hoy.getMonth(),
      0
    ).getDate();
    días += diasEnMesAnterior;
  }

  // Ajustar si los meses son negativos
  if (meses < 0) {
    años--;
    meses += 12;
  }

  // Formatear el resultado
  const partes = [];
  if (años > 0) partes.push(`${años} año${años !== 1 ? "s" : ""}`);
  if (meses > 0) partes.push(`${meses} mes${meses !== 1 ? "es" : ""}`);
  if (días > 0) partes.push(`${días} día${días !== 1 ? "s" : ""}`);

  return partes.length > 0 ? partes.join(", ") : "Recién nacido";
};

/**
 * Construye una URL completa para acceder a las imágenes del servidor
 * @param imagePath - Ruta de la imagen que puede ser relativa o absoluta
 * @returns URL completa para acceder a la imagen
 */
const construirURLImagen = (imagePath: string): string => {
  console.log(`🔍 BASE_URL configurado: ${BASE_URL}`);

  // Si ya es una URL completa (http/https), verificar y corregir la IP si es necesaria
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    console.log(`🌐 URL completa detectada: ${imagePath}`);

    // Corregir IPs problemáticas del backend
    let urlCorregida = imagePath;

    // Si la URL usa una IP/puerto diferente al BASE_URL configurado, corregir
    const baseIP = BASE_URL.replace("/api", "");

    // Extraer la parte de la URL después del puerto (ej: /uploads/imagen.jpg)
    const match = imagePath.match(/^https?:\/\/[^\/]+(\/.+)$/);
    if (match) {
      const pathPart = match[1];
      urlCorregida = `${baseIP}${pathPart}`;
      console.log(
        `🔧 URL corregida con IP correcta: ${imagePath} → ${urlCorregida}`
      );
    }

    return urlCorregida;
  }

  // Si es una URL de placeholder, devolverla tal como está
  if (imagePath.includes("placeholder")) {
    console.log(`🖼️ Placeholder detectado: ${imagePath}`);
    return imagePath;
  }

  // Si empieza con /uploads, construir URL completa
  if (imagePath.startsWith("/uploads/")) {
    const urlCompleta = `${BASE_URL.replace("/api", "")}${imagePath}`;
    console.log(`📁 /uploads/ detectado: ${imagePath} → ${urlCompleta}`);
    return urlCompleta;
  }

  // Si empieza con uploads/ (sin barra inicial), agregar la barra
  if (imagePath.startsWith("uploads/")) {
    const urlCompleta = `${BASE_URL.replace("/api", "")}/${imagePath}`;
    console.log(`📁 uploads/ detectado: ${imagePath} → ${urlCompleta}`);
    return urlCompleta;
  }

  // Si es solo el nombre del archivo, asumir que está en uploads
  if (!imagePath.startsWith("/") && !imagePath.includes("/")) {
    const urlCompleta = `${BASE_URL.replace("/api", "")}/uploads/${imagePath}`;
    console.log(
      `📄 Nombre de archivo detectado: ${imagePath} → ${urlCompleta}`
    );
    return urlCompleta;
  }

  // Caso por defecto: construir URL completa
  const cleanPath = imagePath.startsWith("/") ? imagePath : `/${imagePath}`;
  const urlCompleta = `${BASE_URL.replace("/api", "")}${cleanPath}`;
  console.log(`🔧 Caso por defecto: ${imagePath} → ${urlCompleta}`);
  return urlCompleta;
};

/**
 * Valida y formatea una fecha para enviar al backend
 * Acepta formatos: YYYY-MM-DD, YY-MM-DD, YYYY/MM/DD, etc.
 * Retorna formato: YYYY-MM-DD o null si es inválida
 */
const formatearFecha = (fechaStr: string): string | null => {
  if (!fechaStr || fechaStr.trim() === "") {
    return null;
  }

  try {
    // Limpiar y separar la fecha
    const limpia = fechaStr.trim().replace(/\//g, "-");
    const partes = limpia.split("-");

    if (partes.length !== 3) {
      return null;
    }

    let [año, mes, dia] = partes;

    // Si el año tiene 2 dígitos, convertir a 4 dígitos
    if (año.length === 2) {
      const añoNum = parseInt(año);
      // Si es mayor a 30, asumir 19XX, sino 20XX
      año = añoNum > 30 ? `19${año}` : `20${año}`;
    }

    // Validar que sean números
    const añoNum = parseInt(año);
    const mesNum = parseInt(mes);
    const diaNum = parseInt(dia);

    if (isNaN(añoNum) || isNaN(mesNum) || isNaN(diaNum)) {
      return null;
    }

    // Validar rangos
    if (añoNum < 1900 || añoNum > 2100) {
      return null;
    }
    if (mesNum < 1 || mesNum > 12) {
      return null;
    }
    if (diaNum < 1 || diaNum > 31) {
      return null;
    }

    // Formatear con padding
    return `${añoNum.toString().padStart(4, "0")}-${mesNum
      .toString()
      .padStart(2, "0")}-${diaNum.toString().padStart(2, "0")}`;
  } catch (error) {
    console.error("Error formateando fecha:", error);
    return null;
  }
};

export default function GestionarMascotasScreen() {
  const router = useRouter();
  const { mascotas, setMascotas } = useMascotas();
  const { user } = useAuth();

  // Verificar si el usuario tiene permisos para gestionar mascotas
  const tienePermisos =
    user?.role?.roleType === "ADMIN" || user?.role?.roleType === "ALIADO";

  // Estado para el formulario
  const [modoEdicion, setModoEdicion] = useState(false);
  const [mascotaEditando, setMascotaEditando] = useState<Mascota | null>(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  // Estados de carga y error
  const [cargando, setCargando] = useState(false);
  const [cargandoInicial, setCargandoInicial] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Campos del formulario
  const [nombre, setNombre] = useState("");
  const [especie, setEspecie] = useState("Perro");
  const [raza, setRaza] = useState("");
  const [edad, setEdad] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [sexo, setSexo] = useState("Macho");
  const [ciudad, setCiudad] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagenes, setImagenes] = useState<string[]>([]);
  const [imagenesConId, setImagenesConId] = useState<Map<string, number>>(
    new Map()
  );

  // Estado para las razas dinámicas según la especie
  const [razasDisponibles, setRazasDisponibles] =
    useState<string[]>(RAZAS_PERROS);

  // Estados para el DateTimePicker
  const [mostrarDatePicker, setMostrarDatePicker] = useState(false);
  const [fechaSeleccionada, setFechaSeleccionada] = useState<Date>(new Date());

  // Efecto para actualizar razas cuando cambia la especie
  useEffect(() => {
    const nuevasRazas = especie === "Perro" ? RAZAS_PERROS : RAZAS_GATOS;
    setRazasDisponibles(nuevasRazas);
    setRaza(""); // Limpiar raza al cambiar especie
  }, [especie]);

  // Efecto para calcular edad automáticamente cuando cambia la fecha de nacimiento
  useEffect(() => {
    if (fechaNacimiento && fechaNacimiento.trim() !== "") {
      try {
        const fechaFormateada = formatearFecha(fechaNacimiento);
        if (fechaFormateada) {
          const edadCalculada = calcularEdadCompleta(fechaFormateada);
          setEdad(edadCalculada);
        } else {
          setEdad("");
        }
      } catch (error) {
        console.error("Error calculando edad:", error);
        setEdad("");
      }
    } else {
      setEdad("");
    }
  }, [fechaNacimiento]);

  // Verificar permisos y cargar mascotas al montar el componente
  useEffect(() => {
    // Verificar permisos de acceso
    if (user && !tienePermisos) {
      Alert.alert(
        "Acceso denegado",
        "No tienes permisos para gestionar mascotas. Esta funcionalidad está disponible solo para administradores y aliados.",
        [
          {
            text: "OK",
            onPress: () => router.back(),
          },
        ]
      );
      return;
    }

    if (tienePermisos) {
      fetchMascotas(3);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, tienePermisos]);

  /**
   * Obtiene las mascotas según el rol del usuario:
   * - ADMIN: Todas las mascotas de todos los aliados (endpoint: /mascotas/admin/all)
   * - ALIADO: Solo sus propias mascotas (endpoint: /mascotas)
   *
   * Incluye reintentos automáticos en caso de errores de red
   */
  const fetchMascotas = async (reintentos = 3) => {
    try {
      setCargandoInicial(true);
      setError(null);

      const token = await tokenStorage.getToken();

      // Verificar si hay token (usuario autenticado)
      if (!token) {
        setError("No has iniciado sesión");
        Alert.alert(
          "Autenticación requerida",
          "Debes iniciar sesión para gestionar mascotas",
          [
            {
              text: "OK",
              onPress: () => router.back(),
            },
          ]
        );
        setCargandoInicial(false);
        return;
      }

      // Determinar el endpoint según el rol del usuario
      let endpoint = `${BASE_URL}/mascotas`;

      if (user?.role?.roleType === "ADMIN") {
        // ADMIN ve todas las mascotas de todos los aliados con información del propietario
        endpoint = `${BASE_URL}/mascotas/admin/all`;
        console.log("Usuario ADMIN: usando endpoint", endpoint);
      } else {
        // ALIADO ve solo sus propias mascotas (el backend debe filtrar por usuario autenticado)
        endpoint = `${BASE_URL}/mascotas`;
        console.log(
          "Usuario ALIADO: usando endpoint",
          endpoint,
          "para usuario:",
          user?.idPerson
        );
        console.log(
          "🔍 Debug usuario completo:",
          JSON.stringify(user, null, 2)
        );
        console.log("🔍 Propiedades disponibles:", Object.keys(user || {}));
      }

      // Realizar petición al backend
      const response = await axios.get(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        timeout: 15000,
      });

      // Mapear los datos del backend al formato de la interfaz
      console.log(`📊 Respuesta del backend (${user?.role?.roleType}):`, {
        endpoint,
        totalMascotas: response.data.length,
        primerasMascotas: response.data.slice(0, 2).map((m: any) => ({
          id: m.id,
          nombre: m.nombre,
          propietarioId:
            m.person?.idPerson ||
            m.aliado?.idPerson ||
            m.owner?.id ||
            m.userId ||
            "Sin propietario",
          estructuraCompleta: m,
        })),
      });

      const mascotasFormateadas = response.data.map((m: any) => {
        let imagenes: string[] = [];

        console.log(`🔍 Procesando mascota ${m.nombre}:`, {
          tieneImagenes: !!m.imagenes,
          cantidadImagenes: m.imagenes?.length || 0,
          primeraImagen: m.imagenes?.[0],
          imagenSimple: m.imagen,
        });

        if (m.imagenes && Array.isArray(m.imagenes) && m.imagenes.length > 0) {
          // Extraer y construir URLs completas de los objetos MascotaImageDTO
          imagenes = m.imagenes.slice(0, 3).map((img: any) => {
            const imagePath = img.imagenPath || img;
            console.log(`🖼️ Procesando imagen: ${imagePath}`);
            return construirURLImagen(imagePath);
          });
        } else if (m.imagen) {
          imagenes = [construirURLImagen(m.imagen)];
        } else {
          imagenes = [
            "https://via.placeholder.com/300x300.png?text=Sin+Imagen",
          ];
        }

        // Para ADMIN, incluir información del propietario si está disponible
        const mascotaFormateada: any = {
          id: m.id,
          nombre: m.nombre,
          especie: m.especie,
          raza: m.raza,
          edad: `${m.edad} años`,
          imagenes: imagenes,
        };

        // Si es ADMIN, intentar agregar información del propietario
        if (user?.role?.roleType === "ADMIN") {
          if (m.person) {
            // Información del propietario disponible desde el endpoint /admin/all
            mascotaFormateada.propietario = {
              nombre:
                `${m.person.name || ""} ${m.person.lastName || ""}`.trim() ||
                "Nombre no disponible",
              email: m.person.email || "Email no disponible",
            };
          } else {
            // Fallback si no hay información del propietario
            mascotaFormateada.propietario = {
              nombre: "Información no disponible",
              email: "No disponible",
            };
          }
        }

        return mascotaFormateada;
      });

      setMascotas(mascotasFormateadas);
      console.log(`✅ Mascotas cargadas para ${user?.role?.roleType}:`, {
        cantidad: mascotasFormateadas.length,
        nombres: mascotasFormateadas.map((m: any) => m.nombre),
      });
    } catch (error: any) {
      // Obtener variables necesarias para manejo de errores
      const token = await tokenStorage.getToken();
      const esEndpointAdmin = user?.role?.roleType === "ADMIN";

      // Reintentar si aún quedan intentos y es un error de red
      if (
        reintentos > 0 &&
        (error.code === "ERR_NETWORK" ||
          error.code === "ECONNABORTED" ||
          error.code === "ERR_INCOMPLETE_CHUNKED_ENCODING" ||
          error.message?.includes("Network Error") ||
          error.message?.includes("timeout"))
      ) {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        return fetchMascotas(reintentos - 1);
      }

      // Mensajes de error más específicos
      if (isAxiosError(error)) {
        if (error.response?.status === 403) {
          setError("No tienes permisos para acceder a esta sección");
          Alert.alert(
            "Acceso denegado",
            "No tienes permisos para gestionar mascotas. Verifica que hayas iniciado sesión correctamente.",
            [{ text: "OK", onPress: () => router.back() }]
          );
        } else if (error.response?.status === 401) {
          setError("Sesión expirada. Inicia sesión nuevamente");
          Alert.alert(
            "Sesión expirada",
            "Tu sesión ha expirado. Por favor, inicia sesión nuevamente.",
            [{ text: "OK", onPress: () => router.back() }]
          );
        } else if (error.response?.status === 404 && esEndpointAdmin && token) {
          // Si es ADMIN y el endpoint no existe, hacer fallback al endpoint general
          console.log(
            "Endpoint admin no disponible, usando endpoint general como fallback"
          );
          console.warn(
            "⚠️ El backend no tiene implementado el endpoint /mascotas/admin/all"
          );
          try {
            const response = await axios.get(`${BASE_URL}/mascotas`, {
              headers: { Authorization: `Bearer ${token}` },
            });

            const mascotasFormateadas = response.data.map((mascota: any) => ({
              ...mascota,
              propietario: {
                nombre: "No disponible - Endpoint faltante",
                email: "Implementar /mascotas/admin/all",
              },
            }));

            setMascotas(mascotasFormateadas);
            console.log(
              "✅ Fallback exitoso, cargadas",
              mascotasFormateadas.length,
              "mascotas"
            );
            return;
          } catch (fallbackError: any) {
            console.error("❌ Error en fallback:", fallbackError);
            setError("Error al cargar mascotas - Backend no disponible");
          }
        } else if (error.code === "ECONNABORTED") {
          setError("Tiempo de espera agotado. Verifica tu conexión.");
        } else if (error.response) {
          setError(`Error del servidor: ${error.response.status}`);
        } else if (error.request) {
          setError(
            "No se pudo conectar con el servidor. Verifica que el backend esté corriendo."
          );
        } else {
          setError("Error al cargar las mascotas");
        }
      } else {
        setError("Error inesperado al cargar las mascotas");
      }

      // Mostrar alerta más informativa
      Alert.alert(
        "Error de Conexión",
        `No se pudo conectar con el servidor.${
          reintentos === 0 ? " Se agotaron los reintentos." : ""
        }\n\nURL: ${BASE_URL}\nError: ${
          error.code || "Desconocido"
        }\n\n¿Deseas reintentar?`,
        [
          { text: "Volver", style: "cancel", onPress: () => router.back() },
          { text: "Reintentar", onPress: () => fetchMascotas(3) },
        ]
      );
    } finally {
      setCargandoInicial(false);
    }
  };

  /**
   * Crea una nueva mascota en el backend
   * Envía FormData con multipart/form-data para soportar imágenes
   */
  const createMascota = async (nuevaMascota: Omit<Mascota, "id">) => {
    try {
      setCargando(true);

      const token = await tokenStorage.getToken();

      if (!token) {
        Alert.alert(
          "Error",
          "Usuario no autenticado. Por favor, inicia sesión."
        );
        return null;
      }

      console.log(
        "Creando mascota como usuario:",
        user?.role?.roleType,
        "ID:",
        user?.idPerson
      );
      console.log(
        "🔍 Debug usuario completo al crear:",
        JSON.stringify(user, null, 2)
      );

      // Preparar FormData para envío multipart
      const formData = new FormData();

      // Agregar campos de la mascota
      formData.append("nombre", nuevaMascota.nombre);
      formData.append("especie", nuevaMascota.especie);
      formData.append("raza", nuevaMascota.raza);

      // Convertir edad de string a number
      const edadNumber = parseInt(nuevaMascota.edad);

      if (isNaN(edadNumber) || edadNumber < 0) {
        Alert.alert("Error", "La edad no es válida");
        return null;
      }

      formData.append("edad", edadNumber.toString());

      // Campos adicionales requeridos por el backend
      formData.append("sexo", sexo);
      formData.append("ciudad", ciudad || "Ciudad por defecto");
      formData.append(
        "descripcion",
        descripcion || `${nuevaMascota.especie} ${nuevaMascota.raza}`
      );

      // Fecha de nacimiento (formato YYYY-MM-DD)
      let fechaFinal: string;
      if (fechaNacimiento && fechaNacimiento.trim() !== "") {
        const fechaFormateada = formatearFecha(fechaNacimiento);
        if (fechaFormateada) {
          fechaFinal = fechaFormateada;
        } else {
          Alert.alert(
            "Error de formato",
            `La fecha '${fechaNacimiento}' no es válida. Use formato YYYY-MM-DD (Ej: 2020-01-15)`
          );
          return null;
        }
      } else {
        // Calcular fecha de nacimiento aproximada basada en la edad
        const hoy = new Date();
        const anioNacimiento = hoy.getFullYear() - edadNumber;
        fechaFinal = `${anioNacimiento.toString().padStart(4, "0")}-01-01`;
      }

      formData.append("fechaNacimiento", fechaFinal);

      // Procesar y agregar imágenes
      for (let i = 0; i < nuevaMascota.imagenes.length; i++) {
        const uri = nuevaMascota.imagenes[i];

        // Si la imagen es una URL remota, no la subimos (ya está en el servidor)
        if (uri.startsWith("http://") || uri.startsWith("https://")) {
          continue;
        }

        // Si es una imagen local (de la galería), agregarla directamente
        if (uri.startsWith("file://") || uri.startsWith("content://")) {
          try {
            const filename = uri.split("/").pop() || `imagen_${i}.jpg`;
            const match = /\.(\w+)$/.exec(filename);
            const type = match ? `image/${match[1]}` : `image/jpeg`;

            formData.append("imagenes", {
              uri: uri,
              name: filename,
              type: type,
            } as any);
          } catch (fileError) {
            console.error(`Error procesando imagen ${i}:`, fileError);
          }
        }
      }

      // Realizar petición POST
      const response = await axios.post(`${BASE_URL}/mascotas`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
        timeout: 30000,
      });

      // Formatear respuesta del backend
      const imagenes =
        response.data.imagenes && response.data.imagenes.length > 0
          ? response.data.imagenes
              .map((img: any) => construirURLImagen(img.imagenPath))
              .slice(0, 3)
          : response.data.imagen
          ? [construirURLImagen(response.data.imagen)].slice(0, 3)
          : nuevaMascota.imagenes.slice(0, 3);

      const mascotaCreada = {
        id: response.data.id,
        nombre: response.data.nombre,
        especie: response.data.especie,
        raza: response.data.raza,
        edad: `${response.data.edad} años`,
        imagenes: imagenes,
      };

      // Actualizar contexto global
      setMascotas([...mascotas, mascotaCreada]);

      return mascotaCreada;
    } catch (error: any) {
      console.error("Error al crear mascota:", error);

      if (isAxiosError(error)) {
        if (error.response?.status === 400) {
          Alert.alert("Error", "Datos inválidos. Verifica todos los campos.");
        } else if (error.response?.status === 401) {
          Alert.alert(
            "Error",
            "Sesión expirada. Por favor, inicia sesión nuevamente."
          );
        } else {
          Alert.alert(
            "Error",
            "No se pudo crear la mascota. Intenta de nuevo."
          );
        }
      } else {
        Alert.alert("Error", "No se pudo crear la mascota");
      }

      throw error;
    } finally {
      setCargando(false);
    }
  };

  /**
   * Actualiza una mascota existente
   * Solo procesa imágenes nuevas, las existentes permanecen en el servidor
   */
  const updateMascota = async (mascota: Mascota) => {
    try {
      setCargando(true);

      const token = await tokenStorage.getToken();

      if (!token) {
        Alert.alert("Error", "Usuario no autenticado.");
        return null;
      }

      // Validar que todos los campos requeridos estén completos
      if (!sexo || !ciudad || !fechaNacimiento) {
        Alert.alert(
          "Error",
          "Faltan datos obligatorios. Asegúrate de completar: sexo, ciudad y fecha de nacimiento."
        );
        return null;
      }

      // Preparar FormData
      const formData = new FormData();
      formData.append("nombre", mascota.nombre);
      formData.append("especie", mascota.especie);
      formData.append("raza", mascota.raza);

      const edadNumber = parseInt(mascota.edad);

      if (isNaN(edadNumber) || edadNumber < 0) {
        Alert.alert("Error", "La edad no es válida");
        return null;
      }

      formData.append("edad", edadNumber.toString());
      formData.append("sexo", sexo);
      formData.append("ciudad", ciudad);
      formData.append(
        "descripcion",
        descripcion || `${mascota.especie} ${mascota.raza}`
      );

      // Fecha de nacimiento
      let fechaFinal: string;
      if (fechaNacimiento && fechaNacimiento.trim() !== "") {
        const fechaFormateada = formatearFecha(fechaNacimiento);
        if (fechaFormateada) {
          fechaFinal = fechaFormateada;
        } else {
          Alert.alert(
            "Error de formato",
            `La fecha '${fechaNacimiento}' no es válida. Use formato YYYY-MM-DD (Ej: 2020-01-15)`
          );
          return null;
        }
      } else {
        Alert.alert(
          "Error",
          "La fecha de nacimiento es obligatoria al actualizar"
        );
        return null;
      }

      formData.append("fechaNacimiento", fechaFinal);

      // Procesar imágenes nuevas
      for (let i = 0; i < mascota.imagenes.length; i++) {
        const uri = mascota.imagenes[i];

        // Si es una URL remota, omitir (ya está en el servidor)
        if (uri.startsWith("http://") || uri.startsWith("https://")) {
          continue;
        }

        // Si es una imagen local nueva
        if (uri.startsWith("file://") || uri.startsWith("content://")) {
          try {
            const filename = uri.split("/").pop() || `imagen_${i}.jpg`;
            const match = /\.(\w+)$/.exec(filename);
            const type = match ? `image/${match[1]}` : `image/jpeg`;

            formData.append("imagenes", {
              uri: uri,
              name: filename,
              type: type,
            } as any);
          } catch (error) {
            console.error(`Error procesando imagen ${i}:`, error);
          }
        }
      }

      // Realizar petición PUT al backend
      const response = await axios.put(
        `${BASE_URL}/mascotas/${mascota.id}`,
        formData,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
            "Content-Type": "multipart/form-data",
          },
          timeout: 30000,
        }
      );

      // Formatear respuesta del backend
      const imagenes =
        response.data.imagenes && response.data.imagenes.length > 0
          ? response.data.imagenes
              .map((img: any) => construirURLImagen(img.imagenPath))
              .slice(0, 3)
          : response.data.imagen
          ? [construirURLImagen(response.data.imagen)].slice(0, 3)
          : mascota.imagenes.slice(0, 3);

      const mascotaActualizada = {
        id: response.data.id,
        nombre: response.data.nombre,
        especie: response.data.especie,
        raza: response.data.raza,
        edad: `${response.data.edad} años`,
        imagenes: imagenes,
      };

      // Actualizar contexto global
      setMascotas(
        mascotas.map((m) => (m.id === mascota.id ? mascotaActualizada : m))
      );

      return mascotaActualizada;
    } catch (error: any) {
      console.error("Error al actualizar mascota:", error);
      Alert.alert("Error", "No se pudo actualizar la mascota");
      throw error;
    } finally {
      setCargando(false);
    }
  };

  /**
   * Elimina una mascota del sistema
   */
  const deleteMascota = async (id: number) => {
    try {
      setCargando(true);

      const token = await tokenStorage.getToken();

      // Realizar petición DELETE
      await axios.delete(`${BASE_URL}/mascotas/${id}`, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
        timeout: 10000,
      });

      // Actualizar contexto global
      setMascotas(mascotas.filter((m) => m.id !== id));

      Alert.alert("Éxito", "Mascota eliminada correctamente");
    } catch (error: any) {
      console.error("Error al eliminar mascota:", error);

      if (isAxiosError(error)) {
        if (error.response?.status === 404) {
          Alert.alert("Error", "La mascota no existe");
        } else if (error.response?.status === 401) {
          Alert.alert("Error", "No tienes permisos para eliminar esta mascota");
        } else {
          Alert.alert("Error", "No se pudo eliminar la mascota");
        }
      } else {
        Alert.alert("Error", "No se pudo eliminar la mascota");
      }
    } finally {
      setCargando(false);
    }
  };

  const seleccionarImagenes = async () => {
    if (imagenes.length >= 3) {
      Alert.alert(
        "Límite alcanzado",
        "Solo puedes seleccionar un máximo de 3 imágenes"
      );
      return;
    }

    try {
      const resultado = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true,
        quality: 0.8,
        selectionLimit: 3 - imagenes.length,
      });

      if (!resultado.canceled) {
        const nuevasImagenes = resultado.assets.map((asset) => asset.uri);
        const imagenesActualizadas = [...imagenes, ...nuevasImagenes].slice(
          0,
          3
        );
        setImagenes(imagenesActualizadas);
      }
    } catch (_error) {
      console.error("Error al seleccionar imágenes:", _error);
      Alert.alert("Error", "No se pudieron seleccionar las imágenes");
    }
  };

  /**
   * Elimina una imagen específica
   * Si la imagen existe en el servidor, la elimina primero del backend
   */
  const eliminarImagen = async (index: number) => {
    const urlImagen = imagenes[index];
    const imagenId = imagenesConId.get(urlImagen);

    // Si la imagen tiene ID, significa que existe en el servidor y debemos eliminarla
    if (imagenId && mascotaEditando) {
      try {
        const token = await tokenStorage.getToken();
        await axios.delete(
          `${BASE_URL}/mascotas/${mascotaEditando.id}/imagenes/${imagenId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Eliminar del mapa de IDs
        const nuevoMapa = new Map(imagenesConId);
        nuevoMapa.delete(urlImagen);
        setImagenesConId(nuevoMapa);
      } catch (error) {
        console.error("Error al eliminar imagen del servidor:", error);
        Alert.alert(
          "Error",
          "No se pudo eliminar la imagen. Por favor, intenta de nuevo."
        );
        return; // No eliminar del estado local si falla la eliminación en el servidor
      }
    }

    // Eliminar del estado local
    setImagenes(imagenes.filter((_, i) => i !== index));
  };

  const limpiarFormulario = () => {
    setNombre("");
    setEspecie("Perro");
    setRaza("");
    setEdad("");
    setFechaNacimiento("");
    setSexo("Macho");
    setCiudad("");
    setDescripcion("");
    setImagenes([]);
    setImagenesConId(new Map()); // Limpiar el mapa de IDs
    setRazasDisponibles(RAZAS_PERROS); // Resetear a razas de perro por defecto
    setMostrarDatePicker(false); // Cerrar picker si está abierto
    setFechaSeleccionada(new Date()); // Resetear fecha seleccionada
    setModoEdicion(false);
    setMascotaEditando(null);
    setMostrarFormulario(false);
  };

  /**
   * Inicia el modo de edición de una mascota
   * Carga todos los datos incluyendo mapa de IDs de imágenes para permitir eliminación
   */
  const iniciarEdicion = async (mascota: Mascota) => {
    setModoEdicion(true);
    setMascotaEditando(mascota);
    setNombre(mascota.nombre);
    setEspecie(mascota.especie);

    // Actualizar razas disponibles según la especie
    const nuevasRazas =
      mascota.especie === "Perro" ? RAZAS_PERROS : RAZAS_GATOS;
    setRazasDisponibles(nuevasRazas);

    setRaza(mascota.raza);
    setEdad(mascota.edad);
    // Filtrar solo las imágenes que ya existen en el servidor (máximo 3)
    const imagenesExistentes = mascota.imagenes
      .filter((img) => img.startsWith("http"))
      .slice(0, 3);
    setImagenes(imagenesExistentes);

    // Cargar datos completos del backend
    try {
      const token = await tokenStorage.getToken();
      const response = await axios.get(`${BASE_URL}/mascotas/${mascota.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Cargar TODOS los datos del backend
      const mascotaCompleta = response.data;
      setSexo(mascotaCompleta.sexo || "Macho");
      setCiudad(mascotaCompleta.ciudad || "");
      setDescripcion(mascotaCompleta.descripcion || "");

      // Guardar el mapa de URL → ID para las imágenes existentes
      if (mascotaCompleta.imagenes && Array.isArray(mascotaCompleta.imagenes)) {
        const nuevoMapa = new Map<string, number>();
        const urls: string[] = [];

        mascotaCompleta.imagenes.slice(0, 3).forEach((img: any) => {
          if (img.imagenPath && img.id) {
            const urlCompleta = construirURLImagen(img.imagenPath);
            nuevoMapa.set(urlCompleta, img.id);
            urls.push(urlCompleta);
          }
        });

        setImagenesConId(nuevoMapa);
        setImagenes(urls);
      }

      // Formatear la fecha de nacimiento si existe
      if (mascotaCompleta.fechaNacimiento) {
        const fecha = new Date(mascotaCompleta.fechaNacimiento);
        const año = fecha.getFullYear();
        const mes = String(fecha.getMonth() + 1).padStart(2, "0");
        const dia = String(fecha.getDate()).padStart(2, "0");
        setFechaNacimiento(`${año}-${mes}-${dia}`);
        setFechaSeleccionada(fecha); // Configurar fecha en el picker
      } else {
        setFechaNacimiento("");
        setFechaSeleccionada(new Date()); // Fecha actual por defecto
      }
    } catch (error) {
      console.error("Error al cargar datos completos de la mascota:", error);
      // Usar valores por defecto si falla
      setSexo("Macho");
      setCiudad("");
      setDescripcion("");
      setFechaNacimiento("");
      setFechaSeleccionada(new Date()); // Fecha actual por defecto
      setImagenesConId(new Map());
    }
    setMostrarFormulario(true);
  };

  /**
   * Guarda la mascota (crea nueva o actualiza existente según el modo)
   */
  const guardarMascota = async () => {
    // Validaciones básicas
    if (!nombre.trim()) {
      Alert.alert("Error", "El nombre es obligatorio");
      return;
    }
    if (!especie.trim()) {
      Alert.alert("Error", "La especie es obligatoria");
      return;
    }
    if (!raza.trim()) {
      Alert.alert("Error", "La raza es obligatoria");
      return;
    }
    if (!fechaNacimiento.trim()) {
      Alert.alert("Error", "La fecha de nacimiento es obligatoria");
      return;
    }
    if (!sexo.trim()) {
      Alert.alert("Error", "El sexo es obligatorio");
      return;
    }
    if (!ciudad.trim()) {
      Alert.alert("Error", "La ciudad es obligatoria");
      return;
    }

    // Validar que la edad haya sido calculada correctamente
    if (!edad.trim() || edad === "Fecha inválida") {
      Alert.alert(
        "Error",
        "La fecha de nacimiento no es válida o la edad no se pudo calcular"
      );
      return;
    }

    if (imagenes.length === 0) {
      Alert.alert("Error", "Debes agregar al menos una imagen");
      return;
    }

    try {
      if (modoEdicion && mascotaEditando) {
        // Actualizar mascota existente
        const mascotaActualizada: Mascota = {
          id: mascotaEditando.id,
          nombre: nombre.trim(),
          especie,
          raza: raza.trim(),
          edad: edad.trim(),
          imagenes,
        };
        await updateMascota(mascotaActualizada);
        Alert.alert("Éxito", "Mascota actualizada correctamente");
      } else {
        // Crear nueva mascota
        const nuevaMascota = {
          nombre: nombre.trim(),
          especie,
          raza: raza.trim(),
          edad: edad.trim(),
          imagenes,
        };

        await createMascota(nuevaMascota);
        Alert.alert("Éxito", "Mascota agregada correctamente");
      }
      limpiarFormulario();
    } catch {
      // El error ya se maneja en las funciones create/update
    }
  };

  const confirmarEliminacion = (mascota: Mascota) => {
    Alert.alert(
      "Confirmar eliminación",
      `¿Estás seguro de que deseas eliminar a ${mascota.nombre}?`,
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: () => deleteMascota(mascota.id),
        },
      ]
    );
  };

  /**
   * Genera y descarga un reporte PDF de las mascotas
   * - ALIADO: Reporte de sus propias mascotas
   * - ADMIN: Reporte de todas las mascotas del sistema
   */
  const descargarReportePDF = async () => {
    try {
      // Validar que haya mascotas para el reporte
      if (!mascotas || mascotas.length === 0) {
        Alert.alert("Sin mascotas", "No hay mascotas para generar el reporte");
        return;
      }

      // Mostrar indicador de carga
      setCargando(true);

      // Preparar datos para el reporte
      const mascotasReporte: MascotaReporte[] = mascotas.map((mascota) => ({
        nombre: mascota.nombre,
        especie: mascota.especie,
        raza: mascota.raza,
        edad: mascota.edad,
      }));

      // Determinar título y subtítulo según el rol
      const esAdmin = user?.role?.roleType === "ADMIN";
      const tituloReporte = esAdmin
        ? "Reporte General de Mascotas"
        : "Mis Mascotas Registradas";
      const subtitulo = esAdmin
        ? "Sistema AdoptaFácil - Vista Administrador"
        : `Aliado: ${user?.name || "Usuario"}`;

      // Generar timestamp para nombre único del archivo
      const timestamp = new Date().getTime();
      const tipoReporte = esAdmin ? "admin" : "aliado";
      const nombreArchivo = `reporte_${tipoReporte}_${timestamp}.pdf`;

      // Generar el PDF
      const rutaPDF = await generarReportePDF({
        mascotas: mascotasReporte,
        tituloReporte,
        subtitulo,
        nombreArchivo,
      });

      // Mostrar diálogo de éxito con opción de compartir
      Alert.alert(
        "✅ Reporte generado",
        `El reporte PDF se ha generado exitosamente.\n\nNombre: ${nombreArchivo}\n\n¿Deseas compartir el archivo?`,
        [
          {
            text: "Compartir",
            onPress: async () => {
              try {
                await compartirPDF(rutaPDF);
                console.log("✅ PDF compartido exitosamente");
              } catch (error) {
                console.error("Error al compartir PDF:", error);
                Alert.alert(
                  "Error",
                  "No se pudo compartir el PDF. Intenta de nuevo."
                );
              }
            },
          },
          {
            text: "Cerrar",
            style: "cancel",
          },
        ]
      );

      console.log("✅ Reporte PDF generado:", rutaPDF);
    } catch (error) {
      console.error("❌ Error al generar reporte PDF:", error);
      Alert.alert(
        "Error",
        `No se pudo generar el reporte PDF: ${
          error instanceof Error ? error.message : "Error desconocido"
        }`
      );
    } finally {
      setCargando(false);
    }
  };

  // Si el usuario no tiene permisos, mostrar mensaje de acceso denegado
  if (user && !tienePermisos) {
    return (
      <ThemedView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()}>
              <ThemedText style={styles.backButton}>← Volver</ThemedText>
            </TouchableOpacity>
            <ThemedText type="title" style={styles.title}>
              Acceso Denegado
            </ThemedText>
          </View>
          <View style={styles.errorContainer}>
            <ThemedText style={styles.errorText}>
              🚫 No tienes permisos para acceder a esta sección
            </ThemedText>
            <ThemedText style={styles.emptySubtext}>
              La gestión de mascotas está disponible solo para administradores y
              aliados.
            </ThemedText>
            <TouchableOpacity
              style={styles.retryButton}
              onPress={() => router.back()}
            >
              <ThemedText style={styles.retryButtonText}>Volver</ThemedText>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      {/* Gradiente de fondo sutil */}
      <LinearGradient
        colors={["rgba(2, 211, 107, 0.03)", "rgba(0, 0, 197, 0.03)"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.backgroundGradient}
      />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Encabezado */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <ThemedText style={styles.backButton}>← Volver</ThemedText>
          </TouchableOpacity>
          <ThemedText type="title" style={styles.title}>
            {user?.role?.roleType === "ADMIN"
              ? "Administrar Todas las Mascotas"
              : "Gestionar Mis Mascotas"}
          </ThemedText>
        </View>

        {/* Indicador de carga inicial */}
        {cargandoInicial ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#4f7c8a" />
            <ThemedText style={styles.loadingText}>
              Cargando mascotas...
            </ThemedText>
          </View>
        ) : (
          <>
            {/* Mensaje de error si existe */}
            {error && (
              <View style={styles.errorContainer}>
                <ThemedText style={styles.errorText}>⚠️ {error}</ThemedText>
                <TouchableOpacity
                  style={styles.retryButton}
                  onPress={() => fetchMascotas(3)}
                >
                  <ThemedText style={styles.retryButtonText}>
                    Reintentar
                  </ThemedText>
                </TouchableOpacity>
              </View>
            )}

            {/* Botón para mostrar/ocultar formulario - Para ALIADOs y ADMINs */}
            {!mostrarFormulario &&
              (user?.role?.roleType === "ALIADO" ||
                user?.role?.roleType === "ADMIN") && (
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={() => setMostrarFormulario(true)}
                  disabled={cargando}
                >
                  <LinearGradient
                    colors={["#02d36b", "#0000c5"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.addButtonGradient}
                  >
                    <ThemedText style={styles.addButtonText}>
                      🐾 Agregar Nueva Mascota
                    </ThemedText>
                  </LinearGradient>
                </TouchableOpacity>
              )}

            {/* Botón para descargar reporte PDF */}
            <TouchableOpacity
              style={[
                styles.pdfButton,
                (cargando || mascotas.length === 0) && styles.pdfButtonDisabled,
              ]}
              onPress={descargarReportePDF}
              disabled={cargando || mascotas.length === 0}
            >
              {!(cargando || mascotas.length === 0) ? (
                <LinearGradient
                  colors={["#a78bfa", "#63b3ed"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.pdfButtonGradient}
                >
                  <ThemedText style={styles.pdfButtonText}>
                    � Descargar Reporte PDF
                  </ThemedText>
                  {mascotas.length > 0 && (
                    <ThemedText style={styles.pdfButtonSubtext}>
                      {mascotas.length}{" "}
                      {mascotas.length === 1 ? "mascota" : "mascotas"}
                    </ThemedText>
                  )}
                </LinearGradient>
              ) : (
                <View
                  style={[styles.pdfButtonGradient, styles.pdfButtonDisabled]}
                >
                  <ThemedText style={styles.pdfButtonText}>
                    📊 Descargar Reporte PDF
                  </ThemedText>
                </View>
              )}
            </TouchableOpacity>

            {/* Formulario para agregar/editar mascota */}
            {mostrarFormulario && (
              <View style={styles.formContainer}>
                {/* Header del formulario con gradiente */}
                <LinearGradient
                  colors={["#68d391", "#63b3ed"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.formHeader}
                >
                  <ThemedText style={styles.formTitle}>
                    {modoEdicion ? "✏️ Editar Mascota" : "🐾 Nueva Mascota"}
                  </ThemedText>
                </LinearGradient>

                {/* Contenido del formulario */}
                <View style={styles.formContent}>
                  {/* Campo Nombre */}
                  <ThemedText style={styles.label}>Nombre *</ThemedText>
                  <TextInput
                    style={styles.input}
                    placeholder="Ej: Firulais"
                    placeholderTextColor="#999"
                    value={nombre}
                    onChangeText={setNombre}
                  />

                  {/* Campo Especie */}
                  <ThemedText style={styles.label}>Especie *</ThemedText>
                  <View style={styles.pickerContainer}>
                    <Picker
                      selectedValue={especie}
                      onValueChange={(value) => setEspecie(value)}
                      style={styles.picker}
                    >
                      <Picker.Item label="Perro" value="Perro" />
                      <Picker.Item label="Gato" value="Gato" />
                    </Picker>
                  </View>

                  {/* Campo Raza */}
                  <ThemedText style={styles.label}>Raza *</ThemedText>
                  <View style={styles.pickerContainer}>
                    <Picker
                      selectedValue={raza}
                      onValueChange={(value) => setRaza(value)}
                      style={styles.picker}
                      enabled={especie !== ""}
                    >
                      <Picker.Item
                        label={`Selecciona una raza de ${especie.toLowerCase()}`}
                        value=""
                      />
                      {razasDisponibles.map((razaItem) => (
                        <Picker.Item
                          key={razaItem}
                          label={razaItem}
                          value={razaItem}
                        />
                      ))}
                    </Picker>
                  </View>

                  {/* Campo Fecha de Nacimiento */}
                  <ThemedText style={styles.label}>
                    Fecha de Nacimiento *
                  </ThemedText>
                  <TouchableOpacity
                    style={[styles.input, styles.datePickerButton]}
                    onPress={() => {
                      // Si no hay fecha seleccionada, inicializar con una fecha razonable (2 años atrás)
                      if (!fechaNacimiento) {
                        const fechaInicial = new Date();
                        fechaInicial.setFullYear(
                          fechaInicial.getFullYear() - 2
                        );
                        setFechaSeleccionada(fechaInicial);
                      }
                      setMostrarDatePicker(true);
                    }}
                  >
                    <ThemedText
                      style={{
                        color: fechaNacimiento ? "#2d3748" : "#999",
                        fontSize: 15,
                      }}
                    >
                      {fechaNacimiento || "Selecciona una fecha"}
                    </ThemedText>
                    <ThemedText style={styles.datePickerIcon}>📅</ThemedText>
                  </TouchableOpacity>

                  {/* DateTimePicker Modal */}
                  {mostrarDatePicker && (
                    <>
                      {Platform.OS === "ios" && (
                        <View style={styles.datePickerModal}>
                          <View style={styles.datePickerHeader}>
                            <TouchableOpacity
                              onPress={() => setMostrarDatePicker(false)}
                              style={styles.datePickerCloseButton}
                            >
                              <ThemedText style={styles.datePickerCloseText}>
                                Cerrar
                              </ThemedText>
                            </TouchableOpacity>
                          </View>
                          <DateTimePicker
                            value={fechaSeleccionada}
                            mode="date"
                            display="spinner"
                            maximumDate={new Date()}
                            minimumDate={new Date(1900, 0, 1)}
                            onChange={(event, selectedDate) => {
                              if (selectedDate) {
                                setFechaSeleccionada(selectedDate);
                                const año = selectedDate.getFullYear();
                                const mes = String(
                                  selectedDate.getMonth() + 1
                                ).padStart(2, "0");
                                const dia = String(
                                  selectedDate.getDate()
                                ).padStart(2, "0");
                                setFechaNacimiento(`${año}-${mes}-${dia}`);
                              }
                            }}
                          />
                        </View>
                      )}
                      {Platform.OS === "android" && (
                        <DateTimePicker
                          value={fechaSeleccionada}
                          mode="date"
                          display="default"
                          maximumDate={new Date()}
                          minimumDate={new Date(1900, 0, 1)}
                          onChange={(event, selectedDate) => {
                            setMostrarDatePicker(false);
                            if (selectedDate) {
                              setFechaSeleccionada(selectedDate);
                              const año = selectedDate.getFullYear();
                              const mes = String(
                                selectedDate.getMonth() + 1
                              ).padStart(2, "0");
                              const dia = String(
                                selectedDate.getDate()
                              ).padStart(2, "0");
                              setFechaNacimiento(`${año}-${mes}-${dia}`);
                            }
                          }}
                        />
                      )}
                    </>
                  )}

                  {/* Campo Edad (calculado automáticamente) */}
                  <ThemedText style={styles.label}>
                    Edad (calculada automáticamente)
                  </ThemedText>
                  <TextInput
                    style={[styles.input, styles.inputDisabled]}
                    placeholder="Se calcula automáticamente desde la fecha de nacimiento"
                    placeholderTextColor="#999"
                    value={edad}
                    editable={false}
                  />

                  {/* Campo Sexo */}
                  <ThemedText style={styles.label}>Sexo *</ThemedText>
                  <View style={styles.pickerContainer}>
                    <Picker
                      selectedValue={sexo}
                      onValueChange={(value) => setSexo(value)}
                      style={styles.picker}
                    >
                      <Picker.Item label="Macho" value="Macho" />
                      <Picker.Item label="Hembra" value="Hembra" />
                      <Picker.Item label="Desconocido" value="Desconocido" />
                    </Picker>
                  </View>

                  {/* Campo Ciudad */}
                  <ThemedText style={styles.label}>Ciudad *</ThemedText>
                  <View style={styles.pickerContainer}>
                    <Picker
                      selectedValue={ciudad}
                      onValueChange={(value) => setCiudad(value)}
                      style={styles.picker}
                    >
                      <Picker.Item label="Selecciona una ciudad" value="" />
                      {CIUDADES_COLOMBIA.map((ciudadItem) => (
                        <Picker.Item
                          key={ciudadItem}
                          label={ciudadItem}
                          value={ciudadItem}
                        />
                      ))}
                    </Picker>
                  </View>

                  {/* Campo Descripción */}
                  <ThemedText style={styles.label}>
                    Descripción (opcional)
                  </ThemedText>
                  <TextInput
                    style={[styles.input, styles.textArea]}
                    placeholder="Descripción de la mascota..."
                    placeholderTextColor="#999"
                    value={descripcion}
                    onChangeText={setDescripcion}
                    multiline
                    numberOfLines={4}
                  />

                  {/* Selector de Imágenes */}
                  <ThemedText style={styles.label}>
                    Imágenes * (máximo 3)
                  </ThemedText>
                  <TouchableOpacity
                    style={[
                      styles.imageButton,
                      imagenes.length >= 3 && styles.imageButtonDisabled,
                    ]}
                    onPress={seleccionarImagenes}
                    disabled={imagenes.length >= 3}
                  >
                    {imagenes.length < 3 ? (
                      <LinearGradient
                        colors={["#63b3ed", "#68d391"]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.imageButtonGradient}
                      >
                        <ThemedText style={styles.imageButtonText}>
                          {imagenes.length === 0
                            ? "📷 Seleccionar Imágenes (0/3)"
                            : `📷 Añadir más (${imagenes.length}/3)`}
                        </ThemedText>
                      </LinearGradient>
                    ) : (
                      <View
                        style={[
                          styles.imageButtonGradient,
                          styles.imageButtonDisabled,
                        ]}
                      >
                        <ThemedText style={styles.imageButtonText}>
                          🚫 Límite de imágenes alcanzado
                        </ThemedText>
                      </View>
                    )}
                  </TouchableOpacity>

                  {/* Miniaturas de imágenes seleccionadas */}
                  {imagenes.length > 0 && (
                    <View style={styles.imagenesContainer}>
                      {imagenes.map((uri, index) => {
                        console.log(`🖼️ Miniatura ${index}: ${uri}`);
                        return (
                          <View key={index} style={styles.imagenWrapper}>
                            <Image
                              source={{ uri }}
                              style={styles.imagenMiniatura}
                              onError={(error) => {
                                console.error(
                                  `❌ Error cargando miniatura ${index}:`,
                                  error.nativeEvent
                                );
                                console.error(
                                  `❌ URL problemática miniatura: ${uri}`
                                );
                              }}
                              onLoad={() => {
                                console.log(
                                  `✅ Miniatura ${index} cargada: ${uri}`
                                );
                              }}
                            />
                            <TouchableOpacity
                              style={styles.eliminarImagenButton}
                              onPress={() => eliminarImagen(index)}
                            >
                              <ThemedText style={styles.eliminarImagenText}>
                                ✕
                              </ThemedText>
                            </TouchableOpacity>
                          </View>
                        );
                      })}
                    </View>
                  )}

                  {/* Botones de acción */}
                  <View style={styles.formActions}>
                    <TouchableOpacity
                      style={[styles.actionButton, styles.cancelButton]}
                      onPress={limpiarFormulario}
                    >
                      <View style={styles.actionButtonContent}>
                        <ThemedText style={styles.cancelButtonText}>
                          ❌ Cancelar
                        </ThemedText>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.actionButton}
                      onPress={guardarMascota}
                    >
                      <LinearGradient
                        colors={["#02d36b", "#0000c5"]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.actionButtonContent}
                      >
                        <ThemedText style={styles.saveButtonText}>
                          {modoEdicion ? "⚙️ Actualizar" : "✓ Guardar"}
                        </ThemedText>
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}

            {/* Lista de mascotas */}
            <ThemedText type="subtitle" style={styles.listTitle}>
              {user?.role?.roleType === "ADMIN"
                ? `Todas las Mascotas del Sistema (${mascotas.length})`
                : `Mis Mascotas (${mascotas.length})`}
            </ThemedText>

            {mascotas.length === 0 ? (
              <View style={styles.emptyContainer}>
                <ThemedText style={styles.emptyText}>
                  {user?.role?.roleType === "ADMIN"
                    ? "No hay mascotas registradas en el sistema"
                    : "No hay mascotas registradas"}
                </ThemedText>
                <ThemedText style={styles.emptySubtext}>
                  {user?.role?.roleType === "ADMIN"
                    ? "No hay mascotas registradas por ningún aliado"
                    : "Agrega tu primera mascota usando el botón de arriba"}
                </ThemedText>
              </View>
            ) : (
              mascotas.map((mascota) => {
                console.log(
                  `🏷️ Card ${mascota.nombre} - URL de imagen: ${mascota.imagenes[0]}`
                );
                return (
                  <View key={mascota.id} style={styles.mascotaCard}>
                    {/* Imagen principal */}
                    <Image
                      source={{ uri: mascota.imagenes[0] }}
                      style={styles.mascotaImagen}
                      onError={(error) => {
                        console.error(
                          `❌ Error cargando imagen en card ${mascota.nombre}:`,
                          error.nativeEvent
                        );
                        console.error(
                          `❌ URL problemática: ${mascota.imagenes[0]}`
                        );
                      }}
                      onLoad={() => {
                        console.log(
                          `✅ Imagen cargada exitosamente en card ${mascota.nombre}: ${mascota.imagenes[0]}`
                        );
                      }}
                    />

                    {/* Información de la mascota */}
                    <View style={styles.mascotaInfo}>
                      <ThemedText type="subtitle" style={styles.mascotaNombre}>
                        {mascota.nombre}
                      </ThemedText>

                      {/* Mostrar información del propietario solo para ADMIN */}
                      {user?.role?.roleType === "ADMIN" &&
                        mascota.propietario && (
                          <View style={styles.propietarioContainer}>
                            <ThemedText style={styles.propietarioLabel}>
                              👤 Propietario:
                            </ThemedText>
                            <ThemedText style={styles.propietarioNombre}>
                              {mascota.propietario.nombre}
                            </ThemedText>
                            <ThemedText style={styles.propietarioEmail}>
                              {mascota.propietario.email}
                            </ThemedText>
                          </View>
                        )}

                      <ThemedText style={styles.mascotaDetalle}>
                        <ThemedText style={styles.mascotaLabel}>
                          Especie:{" "}
                        </ThemedText>
                        {mascota.especie}
                      </ThemedText>
                      <ThemedText style={styles.mascotaDetalle}>
                        <ThemedText style={styles.mascotaLabel}>
                          Raza:{" "}
                        </ThemedText>
                        {mascota.raza}
                      </ThemedText>
                      <ThemedText style={styles.mascotaDetalle}>
                        <ThemedText style={styles.mascotaLabel}>
                          Edad:{" "}
                        </ThemedText>
                        {mascota.edad}
                      </ThemedText>
                      <ThemedText style={styles.mascotaDetalle}>
                        <ThemedText style={styles.mascotaLabel}>
                          Imágenes:{" "}
                        </ThemedText>
                        {mascota.imagenes.length}
                      </ThemedText>
                    </View>

                    {/* Botones de acción - ALIADOs pueden editar sus mascotas, ADMINs pueden editar/eliminar todas */}
                    {(user?.role?.roleType === "ALIADO" ||
                      user?.role?.roleType === "ADMIN") && (
                      <View style={styles.mascotaActions}>
                        <TouchableOpacity
                          style={[styles.actionButton, styles.editButton]}
                          onPress={() => iniciarEdicion(mascota)}
                          disabled={cargando}
                        >
                          <ThemedText style={styles.editButtonText}>
                            Editar
                          </ThemedText>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={[styles.actionButton, styles.deleteButton]}
                          onPress={() => confirmarEliminacion(mascota)}
                          disabled={cargando}
                        >
                          <ThemedText style={styles.deleteButtonText}>
                            Eliminar
                          </ThemedText>
                        </TouchableOpacity>
                      </View>
                    )}

                    {/* Mensaje informativo para ADMIN */}
                    {user?.role?.roleType === "ADMIN" && (
                      <View style={styles.adminInfoContainer}>
                        <ThemedText style={styles.adminInfoText}>
                          �️ Modo Administrador - Puedes editar/eliminar todas
                          las mascotas
                        </ThemedText>
                      </View>
                    )}
                  </View>
                );
              })
            )}
          </>
        )}

        {/* Indicador de carga para operaciones */}
        {cargando && (
          <View style={styles.overlayLoading}>
            <View style={styles.overlayLoadingContent}>
              <ActivityIndicator size="large" color="#4f7c8a" />
              <ThemedText style={styles.overlayLoadingText}>
                Procesando...
              </ThemedText>
            </View>
          </View>
        )}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7fafc", // bg-main de la paleta
    position: "relative",
  },
  backgroundGradient: {
    position: "absolute",
  },
  scrollContainer: {
    padding: 12,
    paddingTop: Platform.OS === "ios" ? 50 : 12,
    zIndex: 1,
  },
  header: {
    backgroundColor: "#ffffff",
    marginHorizontal: -12,
    marginTop: -12,
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingTop: Platform.OS === "ios" ? 50 : 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  backButton: {
    fontSize: 16,
    color: "#63b3ed", // azul principal de la paleta
    marginBottom: 8,
    fontWeight: "500",
  },
  title: {
    textAlign: "center",
    color: "#2d3748", // textPrimary
    marginBottom: 0,
    fontSize: 18,
    fontWeight: "700",
  },
  addButton: {
    backgroundColor: "transparent",
    padding: 0,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  addButtonGradient: {
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  addButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
    textShadowColor: "rgba(0,0,0,0.3)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  formContainer: {
    backgroundColor: "rgba(255,255,255,0.95)",
    marginHorizontal: 4,
    marginBottom: 16,
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  formHeader: {
    padding: 16,
    paddingBottom: 12,
  },
  formContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  formTitle: {
    marginBottom: 0,
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    textShadowColor: "rgba(0,0,0,0.3)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 12,
    marginBottom: 6,
    color: "#2d3748",
  },
  input: {
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 10,
    padding: 12,
    fontSize: 15,
    backgroundColor: "#ffffff",
    color: "#2d3748",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  inputDisabled: {
    backgroundColor: "#f7fafc",
    color: "#718096",
    borderColor: "#e2e8f0",
  },
  datePickerButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  datePickerIcon: {
    fontSize: 18,
    color: "#63b3ed",
  },
  datePickerModal: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    margin: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  datePickerHeader: {
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
  },
  datePickerCloseButton: {
    backgroundColor: "#63b3ed",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  datePickerCloseText: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 14,
  },
  textArea: {
    height: 80,
    textAlignVertical: "top",
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 10,
    backgroundColor: "#ffffff",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  picker: {
    height: 50,
    color: "#2d3748",
  },
  imageButton: {
    backgroundColor: "transparent",
    borderRadius: 10,
    marginTop: 8,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  imageButtonGradient: {
    padding: 12,
    alignItems: "center",
  },
  imageButtonDisabled: {
    backgroundColor: "#a0aec0",
    opacity: 0.6,
  },
  imageButtonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "600",
  },
  imagenesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 12,
    gap: 12,
  },
  imagenWrapper: {
    position: "relative",
    width: 100,
    height: 100,
  },
  imagenMiniatura: {
    width: 100,
    height: 100,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0", // borderCard
    backgroundColor: "#f8f9fa",
  },
  eliminarImagenButton: {
    position: "absolute",
    top: -6,
    right: -6,
    backgroundColor: "#ff4757", // rojo error texto
    borderRadius: 14,
    width: 28,
    height: 28,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  eliminarImagenText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  formActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    gap: 10,
  },
  actionButton: {
    flex: 1,
    borderRadius: 10,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  actionButtonContent: {
    padding: 14,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  cancelButtonText: {
    color: "#718096",
    fontWeight: "600",
  },
  saveButton: {
    backgroundColor: "transparent",
  },
  saveButtonText: {
    color: "#ffffff",
    fontWeight: "600",
  },
  listTitle: {
    marginBottom: 16,
    color: "#2d3748", // textPrimary
    fontSize: 18,
    fontWeight: "600",
  },
  emptyContainer: {
    alignItems: "center",
    padding: 32,
    backgroundColor: "#ffffff", // bg-white
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0", // borderCard
    marginTop: 16,
  },
  emptyText: {
    fontSize: 16,
    color: "#2d3748", // textPrimary
    marginBottom: 6,
    fontWeight: "500",
  },
  emptySubtext: {
    fontSize: 14,
    color: "#718096", // placeholder
    textAlign: "center",
    lineHeight: 20,
  },
  mascotaCard: {
    backgroundColor: "#ffffff", // bg-white
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#e2e8f0", // borderCard
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: "hidden",
  },
  mascotaImagen: {
    width: "100%",
    height: 180,
    resizeMode: "cover",
    backgroundColor: "#f8f9fa", // bgSection como fallback
  },
  mascotaInfo: {
    padding: 16,
  },
  mascotaNombre: {
    marginBottom: 8,
    color: "#2d3748", // textPrimary
    fontSize: 18,
    fontWeight: "600",
  },
  mascotaDetalle: {
    fontSize: 14,
    color: "#718096", // placeholder
    marginBottom: 4,
    lineHeight: 18,
  },
  mascotaLabel: {
    fontWeight: "600",
    color: "#2d3748", // textPrimary
  },
  mascotaActions: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#e2e8f0", // borderCard
    padding: 12,
    gap: 10,
  },
  editButton: {
    backgroundColor: "#63b3ed", // azul principal
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    flex: 1,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  editButtonText: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 14,
  },
  deleteButton: {
    backgroundColor: "#ff4757", // rojo error texto
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    flex: 1,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  deleteButtonText: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 14,
  },
  // Estilos para indicadores de carga y errores
  loadingContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
    backgroundColor: "#ffffff", // bg-white
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#e2e8f0", // borderCard
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: "#63b3ed", // azul principal
    fontWeight: "500",
  },
  errorContainer: {
    backgroundColor: "#fed7d7", // rosa peligro suave
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#fed7d7", // rosa peligro suave
  },
  errorText: {
    color: "#e53e3e", // rojo peligro
    fontSize: 14,
    marginBottom: 12,
    fontWeight: "500",
  },
  retryButton: {
    backgroundColor: "#e53e3e", // rojo peligro
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  retryButtonText: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 14,
  },
  overlayLoading: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  overlayLoadingContent: {
    backgroundColor: "#ffffff", // bg-white
    padding: 32,
    borderRadius: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    minWidth: 200,
  },
  overlayLoadingText: {
    marginTop: 16,
    fontSize: 16,
    color: "#2d3748", // textPrimary
    fontWeight: "600",
    textAlign: "center",
  },
  // Estilos para información del propietario (visible para ADMIN)
  propietarioContainer: {
    backgroundColor: "#f0fff4", // fondo verde claro suave personalizado
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    borderLeftWidth: 3,
    borderLeftColor: "#68d391", // verde principal
  },
  propietarioLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#2d3748", // textPrimary
    marginBottom: 4,
  },
  propietarioNombre: {
    fontSize: 14,
    fontWeight: "500",
    color: "#2d3748", // textPrimary
    marginBottom: 2,
  },
  propietarioEmail: {
    fontSize: 12,
    color: "#718096", // placeholder
    fontStyle: "italic",
  },
  // Estilo para mensaje informativo de ADMIN
  adminInfoContainer: {
    backgroundColor: "#f0fff4", // fondo verde claro suave
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: "#68d391", // verde principal
    alignItems: "center",
  },
  adminInfoText: {
    fontSize: 12,
    color: "#2d3748", // textPrimary
    fontStyle: "italic",
    textAlign: "center",
  },
  // Estilos para el botón de descarga de PDF
  pdfButton: {
    backgroundColor: "transparent",
    borderRadius: 12,
    marginBottom: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  pdfButtonGradient: {
    padding: 16,
    alignItems: "center",
  },
  pdfButtonDisabled: {
    backgroundColor: "#a0aec0",
    opacity: 0.6,
  },
  pdfButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
    textShadowColor: "rgba(0,0,0,0.3)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  pdfButtonSubtext: {
    color: "rgba(255,255,255,0.9)",
    fontSize: 12,
    marginTop: 4,
    fontWeight: "500",
  },
});
