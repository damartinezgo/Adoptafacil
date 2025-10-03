// Ruta: utils/pdfReport.ts

import * as Print from "expo-print";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import * as MediaLibrary from "expo-media-library";
import { Platform } from "react-native";

/**
 * Interfaz que define la estructura de datos de una mascota para el reporte PDF
 */
export interface MascotaReporte {
  nombre: string;
  especie: string;
  raza: string;
  edad: string | number;
}

/**
 * Interfaz para las opciones de generación del reporte
 */
export interface OpcionesReporte {
  mascotas: MascotaReporte[];
  tituloReporte: string;
  subtitulo?: string;
  nombreArchivo?: string;
}

/**
 * Genera un reporte PDF con la lista de mascotas
 *
 * @param opciones - Opciones del reporte incluyendo mascotas, título y subtítulo
 * @returns URI del archivo PDF generado
 * @throws Error si no hay mascotas o si falla la generación del PDF
 */
export const generarReportePDF = async (
  opciones: OpcionesReporte
): Promise<string> => {
  const { mascotas, tituloReporte, subtitulo, nombreArchivo } = opciones;

  // Validar que haya mascotas
  if (!mascotas || mascotas.length === 0) {
    throw new Error("No hay mascotas para generar el reporte");
  }

  try {
    // Obtener fecha y hora actual
    const fechaActual = new Date();
    const fechaFormateada = fechaActual.toLocaleDateString("es-CO", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const horaFormateada = fechaActual.toLocaleTimeString("es-CO", {
      hour: "2-digit",
      minute: "2-digit",
    });

    // Generar filas de la tabla HTML
    const filasTabla = mascotas
      .map(
        (mascota, index) => `
        <tr style="${index % 2 === 0 ? "background-color: #f8f9fa;" : ""}">
          <td style="padding: 12px; border-bottom: 1px solid #dee2e6; text-align: center; font-weight: 500;">
            ${index + 1}
          </td>
          <td style="padding: 12px; border-bottom: 1px solid #dee2e6;">
            ${mascota.nombre}
          </td>
          <td style="padding: 12px; border-bottom: 1px solid #dee2e6;">
            ${mascota.especie}
          </td>
          <td style="padding: 12px; border-bottom: 1px solid #dee2e6;">
            ${mascota.raza}
          </td>
          <td style="padding: 12px; border-bottom: 1px solid #dee2e6; text-align: center;">
            ${mascota.edad}
          </td>
        </tr>
      `
      )
      .join("");

    // Plantilla HTML del reporte
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${tituloReporte}</title>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            font-family: 'Helvetica Neue', Arial, sans-serif;
            color: #333;
            padding: 30px;
            background-color: #fff;
          }
          
          .header {
            text-align: center;
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 3px solid #4f7c8a;
          }
          
          .header h1 {
            color: #0e0f11;
            font-size: 28px;
            margin-bottom: 10px;
            font-weight: 700;
          }
          
          .header .subtitle {
            color: #4f7c8a;
            font-size: 16px;
            margin-bottom: 8px;
            font-weight: 500;
          }
          
          .header .fecha {
            color: #666;
            font-size: 14px;
            font-style: italic;
          }
          
          .info-section {
            background-color: #f8f9fa;
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 25px;
            border-left: 4px solid #4f7c8a;
          }
          
          .info-section p {
            margin: 5px 0;
            color: #495057;
            font-size: 14px;
          }
          
          .info-section strong {
            color: #0e0f11;
          }
          
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
            background-color: #fff;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            border-radius: 8px;
            overflow: hidden;
          }
          
          thead {
            background-color: #4f7c8a;
            color: white;
          }
          
          th {
            padding: 15px 12px;
            text-align: left;
            font-weight: 600;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          
          th:first-child,
          td:first-child {
            text-align: center;
          }
          
          td {
            padding: 12px;
            border-bottom: 1px solid #dee2e6;
            font-size: 14px;
            color: #495057;
          }
          
          tbody tr:hover {
            background-color: #e9ecef !important;
          }
          
          tbody tr:last-child td {
            border-bottom: none;
          }
          
          .footer {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 2px solid #dee2e6;
            text-align: center;
            color: #6c757d;
            font-size: 12px;
          }
          
          .total-mascotas {
            background-color: #e7f3f5;
            padding: 12px;
            border-radius: 6px;
            text-align: center;
            margin-top: 20px;
            font-weight: 600;
            color: #0e0f11;
            font-size: 16px;
          }
          
          @media print {
            body {
              padding: 20px;
            }
            
            .header h1 {
              font-size: 24px;
            }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>🐾 ${tituloReporte}</h1>
          ${subtitulo ? `<p class="subtitle">${subtitulo}</p>` : ""}
          <p class="fecha">Generado el ${fechaFormateada} a las ${horaFormateada}</p>
        </div>
        
        <div class="info-section">
          <p><strong>Total de mascotas:</strong> ${mascotas.length}</p>
          <p><strong>Sistema:</strong> AdoptaFácil</p>
        </div>
        
        <table>
          <thead>
            <tr>
              <th style="width: 8%;">#</th>
              <th style="width: 28%;">Nombre</th>
              <th style="width: 22%;">Especie</th>
              <th style="width: 28%;">Raza</th>
              <th style="width: 14%; text-align: center;">Edad</th>
            </tr>
          </thead>
          <tbody>
            ${filasTabla}
          </tbody>
        </table>
        
        <div class="total-mascotas">
          Total de mascotas en el reporte: ${mascotas.length}
        </div>
        
        <div class="footer">
          <p>Este reporte fue generado automáticamente por AdoptaFácil</p>
          <p>© ${fechaActual.getFullYear()} AdoptaFácil - Sistema de Gestión de Mascotas</p>
        </div>
      </body>
      </html>
    `;

    // Generar el PDF usando expo-print
    const { uri } = await Print.printToFileAsync({
      html: htmlContent,
      base64: false,
    });

    // Crear nombre de archivo personalizado o usar uno por defecto
    const timestamp = fechaActual.getTime();
    const nombreArchivoFinal =
      nombreArchivo || `reporte_mascotas_${timestamp}.pdf`;

    // Obtener el directorio de documentos
    const { documentDirectory } = FileSystem;

    if (!documentDirectory) {
      throw new Error("No se pudo acceder al directorio de documentos");
    }

    // Mover el archivo a un directorio persistente
    const rutaFinal = `${documentDirectory}${nombreArchivoFinal}`;

    // Mover el archivo generado a la ruta final
    await FileSystem.moveAsync({
      from: uri,
      to: rutaFinal,
    });

    console.log("✅ PDF generado exitosamente en:", rutaFinal);

    return rutaFinal;
  } catch (error) {
    console.error("❌ Error al generar el reporte PDF:", error);
    throw new Error(
      `Error al generar el reporte PDF: ${
        error instanceof Error ? error.message : "Error desconocido"
      }`
    );
  }
};

/**
 * Comparte el archivo PDF generado usando el sistema de compartir del dispositivo
 *
 * @param uri - URI del archivo PDF a compartir
 * @throws Error si el dispositivo no soporta compartir archivos
 */
export const compartirPDF = async (uri: string): Promise<void> => {
  try {
    // Verificar si el dispositivo soporta compartir
    const isAvailable = await Sharing.isAvailableAsync();

    if (!isAvailable) {
      throw new Error(
        "La función de compartir no está disponible en este dispositivo"
      );
    }

    // Compartir el archivo
    await Sharing.shareAsync(uri, {
      mimeType: "application/pdf",
      dialogTitle: "Compartir Reporte de Mascotas",
      UTI: "com.adobe.pdf",
    });

    console.log("✅ PDF compartido exitosamente");
  } catch (error) {
    console.error("❌ Error al compartir el PDF:", error);
    throw new Error(
      `Error al compartir el PDF: ${
        error instanceof Error ? error.message : "Error desconocido"
      }`
    );
  }
};

/**
 * Guarda el archivo PDF directamente en la carpeta de Descargas del dispositivo
 * Esta función solicita permisos de almacenamiento y guarda el archivo en Descargas
 * 
 * @param uri - URI del archivo PDF a guardar
 * @param nombreArchivo - Nombre del archivo
 * @returns Mensaje con información sobre la ubicación del archivo
 */
export const guardarPDFEnDescargas = async (
  uri: string,
  nombreArchivo: string
): Promise<string> => {
  try {
    // Solicitar permisos de almacenamiento
    const { status } = await MediaLibrary.requestPermissionsAsync();
    
    if (status !== "granted") {
      throw new Error(
        "Se necesitan permisos de almacenamiento para guardar el archivo en Descargas"
      );
    }

    // Para Android 10+ (API 29+) y todas las versiones de iOS
    if (Platform.OS === "android" && Platform.Version >= 29) {
      // Android 10+ con Scoped Storage
      // Crear el asset desde el archivo temporal
      const asset = await MediaLibrary.createAssetAsync(uri);
      
      // Intentar obtener o crear el álbum "Download"
      let album = await MediaLibrary.getAlbumAsync("Download");
      
      if (album === null) {
        // Si no existe, crear el álbum
        await MediaLibrary.createAlbumAsync("Download", asset, false);
      } else {
        // Si existe, agregar el asset al álbum
        await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
      }
      
      console.log("✅ PDF guardado en Descargas (Android 10+)");
      return `Archivo guardado exitosamente en:\nDescargas/${nombreArchivo}\n\nPuedes encontrarlo en la carpeta de Descargas de tu dispositivo.`;
    } else if (Platform.OS === "android") {
      // Android 9 y anteriores
      const downloadDir = `${FileSystem.documentDirectory}Download/`;
      
      // Verificar si existe el directorio, si no, crearlo
      const dirInfo = await FileSystem.getInfoAsync(downloadDir);
      if (!dirInfo.exists) {
        await FileSystem.makeDirectoryAsync(downloadDir, { intermediates: true });
      }
      
      // Copiar el archivo al directorio de descargas
      const destino = `${downloadDir}${nombreArchivo}`;
      await FileSystem.copyAsync({
        from: uri,
        to: destino,
      });
      
      // Crear el asset para que aparezca en la galería/gestor de archivos
      await MediaLibrary.createAssetAsync(destino);
      
      console.log("✅ PDF guardado en Descargas (Android <10)");
      return `Archivo guardado exitosamente en:\nDescargas/${nombreArchivo}\n\nPuedes encontrarlo en la carpeta de Descargas de tu dispositivo.`;
    } else if (Platform.OS === "ios") {
      // Para iOS, guardamos en el álbum de la app
      const asset = await MediaLibrary.createAssetAsync(uri);
      
      // Intentar crear/obtener álbum personalizado
      const albumName = "AdoptaFácil";
      let album = await MediaLibrary.getAlbumAsync(albumName);
      
      if (album === null) {
        await MediaLibrary.createAlbumAsync(albumName, asset, false);
      } else {
        await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
      }
      
      console.log("✅ PDF guardado en iOS");
      return `Archivo guardado exitosamente en la app Archivos.\n\nNombre: ${nombreArchivo}\n\nPuedes encontrarlo en la app "Archivos" de iOS, en la carpeta "${albumName}".`;
    } else {
      // Web u otra plataforma - usar fallback con compartir
      const isAvailable = await Sharing.isAvailableAsync();
      
      if (!isAvailable) {
        return `Archivo generado: ${nombreArchivo}\n\nUbicación interna: ${uri}`;
      }
      
      await Sharing.shareAsync(uri, {
        mimeType: "application/pdf",
        dialogTitle: "Guardar Reporte PDF",
        UTI: "com.adobe.pdf",
      });
      
      return "Selecciona dónde deseas guardar el archivo desde el menú de compartir.";
    }
  } catch (error) {
    console.error("❌ Error al guardar PDF en Descargas:", error);
    
    // Si falla, intentar con el método de compartir como fallback
    try {
      const isAvailable = await Sharing.isAvailableAsync();
      
      if (isAvailable) {
        await Sharing.shareAsync(uri, {
          mimeType: "application/pdf",
          dialogTitle: "Guardar Reporte PDF",
          UTI: "com.adobe.pdf",
        });
        
        return "No se pudo guardar automáticamente. Por favor, selecciona 'Descargas' o tu gestor de archivos desde el menú.";
      }
    } catch (shareError) {
      console.error("❌ Error en fallback:", shareError);
    }
    
    throw new Error(
      `Error al guardar el PDF: ${
        error instanceof Error ? error.message : "Error desconocido"
      }`
    );
  }
};
