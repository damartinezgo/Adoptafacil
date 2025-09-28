package com.example.AdoptaFacil.Controller;

import com.example.AdoptaFacil.Entity.Mascotas;
import com.example.AdoptaFacil.Service.MascotasService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

/**
 * Controlador REST para la gestión de mascotas
 * 
 * Endpoints disponibles (requieren autenticación):
 * - POST /api/mascotas - Crear nueva mascota con imágenes opcionales
 * - GET /api/mascotas/{id} - Obtener mascota por ID
 * - GET /api/mascotas - Listar todas las mascotas o buscar por nombre
 * - DELETE /api/mascotas/{id} - Eliminar mascota
 */
@RestController
@RequestMapping("/api/mascotas")
@RequiredArgsConstructor
public class MascotasController {
    
    private final MascotasService mascotasService;

    /**
     * Crea una nueva mascota en el sistema
     * Permite adjuntar imágenes opcionales
     * 
     * @param mascota Datos de la mascota a crear
     * @param imagenes Lista opcional de imágenes de la mascota
     * @return Mascota creada con su ID asignado
     */
    @PostMapping
    public ResponseEntity<?> crearMascota(
            @ModelAttribute Mascotas mascota,
            @RequestParam(value = "imagenes", required = false) List<MultipartFile> imagenes) {
        try {
            Mascotas mascotaCreada = mascotasService.crearMascota(mascota, imagenes);
            return ResponseEntity.status(HttpStatus.CREATED).body(mascotaCreada);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Datos de mascota inválidos: " + e.getMessage());
        } catch (Exception e) {
            System.err.println("Error creando mascota: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Error interno del servidor");
        }
    }

    /**
     * Obtiene una mascota específica por su ID
     * 
     * @param id ID único de la mascota
     * @return Datos completos de la mascota incluyendo imágenes
     */
    @GetMapping("/{id}")
    public ResponseEntity<?> obtenerMascota(@PathVariable Long id) {
        try {
            Mascotas mascota = mascotasService.obtenerMascota(id);
            if (mascota == null) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.ok(mascota);
        } catch (Exception e) {
            System.err.println("Error obteniendo mascota: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Error interno del servidor");
        }
    }

    /**
     * Lista todas las mascotas o busca por nombre
     * Si se proporciona el parámetro 'nombre', filtra los resultados
     * 
     * @param nombre Nombre opcional para filtrar mascotas
     * @return Lista de mascotas que coinciden con el criterio
     */
    @GetMapping
    public ResponseEntity<?> listarMascotas(@RequestParam(required = false) String nombre) {
        try {
            List<Mascotas> mascotas;
            
            if (nombre != null && !nombre.trim().isEmpty()) {
                // Buscar mascotas por nombre
                mascotas = mascotasService.buscarPorNombre(nombre.trim());
            } else {
                // Listar todas las mascotas
                mascotas = mascotasService.listarMascotas();
            }
            
            return ResponseEntity.ok(mascotas);
        } catch (Exception e) {
            System.err.println("Error listando mascotas: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Error interno del servidor");
        }
    }

    /**
     * Elimina una mascota del sistema
     * También elimina todas las imágenes asociadas
     * 
     * @param id ID único de la mascota a eliminar
     * @return Status 204 (No Content) si la eliminación es exitosa
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminarMascota(@PathVariable Long id) {
        try {
            mascotasService.eliminarMascota(id);
            return ResponseEntity.noContent().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            System.err.println("Error eliminando mascota: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Error interno del servidor");
        }
    }
}
