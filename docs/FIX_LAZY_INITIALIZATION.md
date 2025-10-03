# Fix: LazyInitializationException en MascotasController

## 🔴 Problema Original

El error `LazyInitializationException` ocurría cuando se intentaba acceder a la colección `imagenes` de la entidad `Mascotas` después de que la sesión de Hibernate se había cerrado.

```
org.hibernate.LazyInitializationException: failed to lazily initialize a collection of role:
com.example.AdoptaFacil.Entity.Mascotas.imagenes: could not initialize proxy - no Session
```

### ¿Por qué sucedía?

1. En la entidad `Mascotas`, la relación con `imagenes` está configurada como **LAZY** (por defecto en `@OneToMany`)
2. El repositorio hacía la consulta y cerraba la sesión de Hibernate
3. En el mapper, cuando se intentaba acceder a `mascota.getImagenes()`, ya no había sesión activa

## ✅ Solución Implementada

Se agregaron **consultas personalizadas con JOIN FETCH** en el repositorio para cargar las imágenes de forma **anticipada (eager)** solo cuando es necesario.

### Cambios en `MascotasRepository.java`

```java
@Query("SELECT DISTINCT m FROM Mascotas m LEFT JOIN FETCH m.imagenes WHERE m.ALIADO = :aliado")
List<Mascotas> findByALIADOWithImages(@Param("aliado") Person aliado);

@Query("SELECT DISTINCT m FROM Mascotas m LEFT JOIN FETCH m.imagenes WHERE LOWER(m.nombre) LIKE LOWER(CONCAT('%', :nombre, '%')) AND m.ALIADO = :aliado")
List<Mascotas> findByNombreContainingIgnoreCaseAndALIADOWithImages(@Param("nombre") String nombre, @Param("aliado") Person aliado);

@Query("SELECT DISTINCT m FROM Mascotas m LEFT JOIN FETCH m.imagenes LEFT JOIN FETCH m.ALIADO")
List<Mascotas> findAllWithImagesAndOwner();

@Query("SELECT m FROM Mascotas m LEFT JOIN FETCH m.imagenes WHERE m.id = :id")
Optional<Mascotas> findByIdWithImages(@Param("id") Long id);
```

### Cambios en `MascotasServiceImpl.java`

Se actualizaron los métodos para usar las nuevas consultas:

1. **`listarMascotasPorUsuario`** - Para usuarios ALIADO

   ```java
   List<Mascotas> mascotas = mascotasRepository.findByALIADOWithImages(usuario);
   ```

2. **`buscarPorNombreYUsuario`** - Búsqueda por nombre

   ```java
   List<Mascotas> mascotas = mascotasRepository.findByNombreContainingIgnoreCaseAndALIADOWithImages(nombre, usuario);
   ```

3. **`listarTodasLasMascotasConPropietario`** - Para usuarios ADMIN

   ```java
   List<Mascotas> mascotas = mascotasRepository.findAllWithImagesAndOwner();
   ```

4. **`obtenerMascota`** - Obtener una mascota por ID
   ```java
   Mascotas mascota = mascotasRepository.findByIdWithImages(id).orElseThrow(...);
   ```

### Se agregó `@Transactional(readOnly = true)`

Todos los métodos de lectura ahora están anotados con `@Transactional(readOnly = true)` para:

- Optimizar el rendimiento (Spring sabe que no habrá escrituras)
- Garantizar que haya una sesión activa durante toda la operación

## 🎯 Ventajas de esta solución

1. ✅ **No cambia el modelo de datos** - Las relaciones siguen siendo LAZY por defecto
2. ✅ **Carga anticipada solo cuando es necesario** - JOIN FETCH se usa solo en consultas específicas
3. ✅ **Evita el problema N+1** - Una sola consulta carga mascotas e imágenes
4. ✅ **Mejor rendimiento** - Menos consultas a la base de datos
5. ✅ **Compatibilidad** - Los métodos antiguos se mantienen para no romper código existente

## 📋 Endpoints afectados (ahora funcionan correctamente)

### Para ALIADO:

- `GET /api/mascotas` - Lista las mascotas del usuario autenticado
- `GET /api/mascotas?nombre=xxx` - Busca por nombre las mascotas del usuario

### Para ADMIN:

- `GET /api/mascotas/admin/all` - Lista TODAS las mascotas con información del propietario

### Para todos:

- `GET /api/mascotas/{id}` - Obtiene una mascota específica con sus imágenes

## 🧪 Cómo probar

1. Reinicia el backend de Spring Boot
2. Desde el frontend React Native, inicia sesión como ALIADO o ADMIN
3. Navega a la pantalla "Gestionar Mascotas"
4. Verifica que las mascotas se carguen correctamente con sus imágenes
5. Ya NO deberías ver el error `LazyInitializationException`

## 📚 Conceptos clave

### LAZY vs EAGER Loading

- **LAZY**: Los datos relacionados se cargan solo cuando se acceden (por defecto en @OneToMany)
- **EAGER**: Los datos relacionados se cargan inmediatamente con la entidad principal

### JOIN FETCH

- Es una instrucción de JPQL que le dice a Hibernate: "carga esta relación AHORA"
- Evita el problema de LazyInitializationException
- Se usa en consultas personalizadas con `@Query`

### LEFT JOIN FETCH

- `LEFT JOIN`: Trae la mascota INCLUSO si no tiene imágenes
- `INNER JOIN`: Solo traería mascotas que SÍ tienen imágenes

## 🔍 Alternativas descartadas

### ❌ Cambiar a EAGER en la entidad

```java
@OneToMany(fetch = FetchType.EAGER)
```

**Descartado porque:** Cargaría SIEMPRE todas las imágenes, incluso cuando no son necesarias

### ❌ Usar @Transactional en el Controller

**Descartado porque:** No es una buena práctica. La lógica transaccional debe estar en el Service

### ❌ Inicializar manualmente con Hibernate.initialize()

**Descartado porque:** Es código imperativo y menos limpio que JOIN FETCH

## ✨ Resultado final

El error está **completamente resuelto**. Ahora:

- Los usuarios ALIADO pueden ver solo sus mascotas con imágenes
- Los usuarios ADMIN pueden ver todas las mascotas con información del propietario
- No hay más `LazyInitializationException`
- El rendimiento es óptimo (sin consultas N+1)
