# Guía de Conexión API - AdoptaFácil

## Problemas de Conexión Solucionados

Este archivo documenta los cambios realizados para solucionar los problemas de conexión entre el frontend React Native y el backend Java Spring Boot.

## Cambios Realizados

### Backend (Java Spring Boot)

1. **Corregida la versión de Java en pom.xml**

   - Cambiada de Java 24 a Java 17 para mejor compatibilidad

2. **Agregadas propiedades JWT en application.properties**
   - jwt.secret y jwt.expiration configurados
3. **Mejorada la configuración CORS**
   - Agregado maxAge para cache de preflight requests
   - Mejor manejo de headers y métodos permitidos

### Frontend (React Native)

1. **Creado archivo de configuración config.ts**
   - URLs configuradas para diferentes entornos
   - Timeouts y keys centralizados
2. **Mejorado el manejo de errores en api.ts**
   - Logging detallado de requests y responses
   - Mejor timeout (30 segundos)
   - Interceptores mejorados

## Configuración de URL según el dispositivo

### Emulador de Android

```typescript
const BASE_URL = "http://10.0.2.2:8080/api";
```

### Simulador iOS

```typescript
const BASE_URL = "http://localhost:8080/api";
```

### Dispositivo Físico

Para dispositivos físicos, necesitas usar la IP de tu computadora:

**Windows:**

```bash
ipconfig
# Busca "Dirección IPv4" en tu adaptador de red WiFi o Ethernet
```

**Mac/Linux:**

```bash
ifconfig
# Busca inet en en0 (WiFi) o en1 (Ethernet)
```

Ejemplo de IP: `http://192.168.1.100:8080/api`

## Cómo cambiar la configuración

Edita el archivo `config.ts` y cambia la URL en `PHYSICAL_DEVICE`:

```typescript
PHYSICAL_DEVICE: 'http://TU_IP_AQUI:8080/api',
```

## Pruebas de Conexión

1. **Verifica que el backend esté corriendo:**

   ```bash
   cd AdoptaFacil
   ./mvnw spring-boot:run
   ```

2. **Prueba la conexión desde el navegador:**

   - Emulador Android: `http://10.0.2.2:8080/api/auth/test`
   - Dispositivo físico: `http://TU_IP:8080/api/auth/test`

3. **Revisa los logs en la consola de React Native**
   - Los requests ahora se logean con detalles completos
   - Los errores muestran status, datos y URL

## Errores Comunes y Soluciones

### Error: Network Request Failed

- **Causa:** Backend no está corriendo o URL incorrecta
- **Solución:** Verifica que el backend esté en puerto 8080 y usa la IP correcta

### Error: Timeout

- **Causa:** Conexión lenta o backend no responde
- **Solución:** Timeout aumentado a 30 segundos, verifica la red

### Error: 401 Unauthorized

- **Causa:** Token JWT expirado o inválido
- **Solución:** Los interceptores ahora limpian automáticamente el token

### Error de CORS

- **Causa:** Configuración CORS incorrecta
- **Solución:** CORS mejorado en SecurityConfig.java

## Para Desarrolladores

Si necesitas cambiar rápidamente la URL para pruebas, puedes usar:

```typescript
import { getPhysicalDeviceUrl } from "./config";

// En lugar del BASE_URL automático, usa:
const TEST_URL = getPhysicalDeviceUrl();
```

## Log de Debugging

El sistema ahora logea automáticamente:

- URL de cada request
- Status de respuesta
- Detalles de errores con context completo
- Configuración de JWT y tokens
