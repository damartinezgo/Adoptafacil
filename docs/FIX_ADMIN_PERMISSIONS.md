# Fix: Permisos de ADMIN para editar y eliminar mascotas

## 🔴 Problema Original

Los usuarios con rol **ADMIN** no podían editar ni eliminar mascotas creadas por usuarios **ALIADO**, a pesar de que deberían tener permisos completos sobre todas las mascotas del sistema.

### Error observado

```
ERROR: Request failed with status code 403 (Forbidden)
```

Al intentar editar o eliminar una mascota como ADMIN, el sistema validaba únicamente si el usuario era el propietario de la mascota, rechazando cualquier operación de un ADMIN sobre mascotas ajenas.

## 🔍 Causa raíz

En `MascotasServiceImpl.java`, las validaciones de los métodos `actualizarMascota` y `eliminarMascotaPorUsuario` **solo verificaban si el usuario era el dueño** de la mascota, sin considerar si el usuario tenía rol ADMIN.

### Código problemático (ANTES)

```java
// ❌ Solo verifica si es el dueño
if (!idDueno.equals(idUsuarioActual)) {
    throw new SecurityException("No tienes permisos para actualizar esta mascota");
}
```

## ✅ Solución Implementada

Se modificó la lógica de validación para aplicar las siguientes reglas:

1. **ADMIN**: Puede editar y eliminar **TODAS** las mascotas del sistema
2. **ALIADO**: Solo puede editar y eliminar **sus propias** mascotas

### Cambios realizados

#### 1. Import de la entidad `Role`

Se agregó el import necesario para verificar el tipo de rol:

```java
import com.example.AdoptaFacil.Entity.Role;
import com.example.AdoptaFacil.Entity.Person;
```

#### 2. Modificación en `actualizarMascota()`

**Archivo**: `MascotasServiceImpl.java`

```java
// ✅ Verifica si es ADMIN o dueño
if (mascotaActualizada.getALIADO() != null) {
    Long idUsuarioActual = mascotaActualizada.getALIADO().getIdPerson();
    Long idDueno = mascotaExistente.getALIADO().getIdPerson();

    // Verificar si el usuario es ADMIN
    boolean esAdmin = mascotaActualizada.getALIADO().getRole() != null &&
                    mascotaActualizada.getALIADO().getRole().getRoleType() == Role.RoleType.ADMIN;

    // Solo denegar si NO es ADMIN Y NO es el dueño
    if (!esAdmin && !idDueno.equals(idUsuarioActual)) {
        System.err.println("❌ Usuario " + idUsuarioActual + " no es el dueño de la mascota (dueño: " + idDueno + ")");
        throw new SecurityException("No tienes permisos para actualizar esta mascota");
    }
    System.out.println("✅ Usuario autorizado" + (esAdmin ? " (ADMIN)" : " (dueño)"));
}
```

#### 3. Modificación en `eliminarMascotaPorUsuario()`

**Cambio en la firma del método** para recibir el objeto `Person` completo en lugar del ID:

**Interfaz** (`MascotasService.java`):

```java
// Antes: void eliminarMascotaPorUsuario(Long id, Long idUsuario);
// Después:
void eliminarMascotaPorUsuario(Long id, Person usuario);
```

**Implementación** (`MascotasServiceImpl.java`):

```java
@Override
@Transactional
public void eliminarMascotaPorUsuario(Long id, Person usuario) {
    // Buscar la mascota
    Mascotas mascota = mascotasRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Mascota no encontrada con ID: " + id));

    // Verificar permisos: ADMIN puede eliminar todas, ALIADO solo las suyas
    boolean esAdmin = usuario.getRole() != null &&
                    usuario.getRole().getRoleType() == Role.RoleType.ADMIN;

    Long idDueno = mascota.getALIADO().getIdPerson();
    Long idUsuarioActual = usuario.getIdPerson();

    // Solo denegar si NO es ADMIN Y NO es el dueño
    if (!esAdmin && !idDueno.equals(idUsuarioActual)) {
        throw new SecurityException("No tienes permisos para eliminar esta mascota");
    }

    System.out.println("✅ Usuario autorizado para eliminar" + (esAdmin ? " (ADMIN)" : " (dueño)"));

    eliminarMascota(id);
}
```

#### 4. Actualización en el Controller

**Archivo**: `MascotasController.java`

```java
Person person = (Person) authentication.getPrincipal();
System.out.println("Usuario autenticado: " + person.getEmail() + " (ID: " + person.getIdPerson() + ")");
System.out.println("Rol: " + (person.getRole() != null ? person.getRole().getRoleType() : "sin rol"));

// Pasar el objeto Person completo en lugar del ID
mascotasService.eliminarMascotaPorUsuario(id, person);
```

## 🎯 Resultado Final

### Matriz de permisos

| Acción          | ADMIN | ALIADO (dueño)  | ALIADO (no dueño) |
| --------------- | ----- | --------------- | ----------------- |
| Crear mascota   | ✅    | ✅              | ✅                |
| Editar propia   | ✅    | ✅              | ❌                |
| Editar ajena    | ✅    | ❌              | ❌                |
| Eliminar propia | ✅    | ✅              | ❌                |
| Eliminar ajena  | ✅    | ❌              | ❌                |
| Ver todas       | ✅    | ❌ (solo suyas) | ❌ (solo suyas)   |

### Logs mejorados

Ahora los logs muestran claramente el motivo de autorización:

```
✅ Usuario autorizado (ADMIN)
✅ Usuario autorizado (dueño)
```

## 🧪 Cómo probar

### Como ADMIN

1. Inicia sesión con usuario ADMIN
2. Navega a "Gestionar Mascotas"
3. Intenta **editar** una mascota creada por un ALIADO → ✅ Debería funcionar
4. Intenta **eliminar** una mascota creada por un ALIADO → ✅ Debería funcionar

### Como ALIADO

1. Inicia sesión con usuario ALIADO
2. Navega a "Gestionar Mascotas"
3. Intenta **editar** tu propia mascota → ✅ Debería funcionar
4. Intenta **eliminar** tu propia mascota → ✅ Debería funcionar

### Verificación de logs

En el backend de Spring Boot, deberías ver:

**Para ADMIN editando mascota ajena:**

```
=== SERVICE: Actualizando mascota ID 1 ===
✅ Mascota encontrada: Nicolas
✅ Usuario autorizado (ADMIN)
```

**Para ALIADO editando su mascota:**

```
=== SERVICE: Actualizando mascota ID 2 ===
✅ Mascota encontrada: T
✅ Usuario autorizado (dueño)
```

**Para ALIADO intentando editar mascota ajena:**

```
=== SERVICE: Actualizando mascota ID 1 ===
✅ Mascota encontrada: Nicolas
❌ Usuario 2 no es el dueño de la mascota (dueño: 1)
ERROR: No tienes permisos para actualizar esta mascota
```

## 📚 Conceptos clave aplicados

### Verificación de roles con ENUM

```java
boolean esAdmin = usuario.getRole() != null &&
                usuario.getRole().getRoleType() == Role.RoleType.ADMIN;
```

- Se compara el ENUM directamente, no con strings
- Se verifica que el rol no sea null antes de acceder a sus propiedades
- Uso de `Role.RoleType.ADMIN` en lugar de `"ADMIN"`

### Lógica de permisos con operador lógico

```java
if (!esAdmin && !idDueno.equals(idUsuarioActual)) {
    // Denegar acceso
}
```

Esta condición se lee como:

- **SI NO** es ADMIN **Y NO** es el dueño → Denegar
- En otras palabras: Solo permite si es ADMIN **O** es el dueño

## ✨ Ventajas de esta solución

1. ✅ **No rompe funcionalidad existente** - Los ALIADO siguen pudiendo gestionar sus mascotas
2. ✅ **ADMIN tiene control total** - Puede gestionar todas las mascotas del sistema
3. ✅ **Logs descriptivos** - Fácil debugging y auditoría
4. ✅ **Código limpio** - Lógica clara y fácil de mantener
5. ✅ **Seguridad mejorada** - Validación robusta de permisos

## 🔒 Consideraciones de seguridad

- La verificación de roles se hace en la capa de **Service**, no solo en el Controller
- Se valida que el objeto `Role` no sea null antes de acceder a sus propiedades
- Los logs muestran información útil sin exponer datos sensibles
- La autenticación sigue siendo manejada por Spring Security

## 🐛 Problemas conocidos resueltos

### Error 403 (Forbidden) para ADMIN

✅ **Resuelto** - ADMIN ahora puede editar y eliminar todas las mascotas

### Validación incorrecta de permisos

✅ **Resuelto** - La lógica ahora considera el rol ADMIN

### Logs confusos

✅ **Resuelto** - Los logs ahora muestran claramente si el usuario es ADMIN o dueño

## 📝 Notas adicionales

- Este cambio es **compatible con versiones anteriores** del API
- No se requieren cambios en el frontend (React Native)
- Los endpoints mantienen la misma estructura de request/response
- La base de datos no requiere migraciones
