package com.example.AdoptaFacil.Controller;


import com.example.AdoptaFacil.Entity.Mascotas;
import com.example.AdoptaFacil.Service.MascotasService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/mascotas")
@RequiredArgsConstructor

public class MascotasController {
    private final MascotasService mascotasService;

    @PostMapping
    public ResponseEntity<Mascotas> crearMascota(
            @ModelAttribute Mascotas mascota,
            @RequestParam(value = "imagenes", required = false) List<MultipartFile> imagenes) {
        return ResponseEntity.ok(mascotasService.crearMascota(mascota, imagenes));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Mascotas> obtenerMascota(@PathVariable Long id) {
        return ResponseEntity.ok(mascotasService.obtenerMascota(id));
    }

    @GetMapping
    public ResponseEntity<List<Mascotas>> listarMascotas(@RequestParam(required = false) String nombre) {
        if (nombre != null) {
            return ResponseEntity.ok(mascotasService.buscarPorNombre(nombre));
        }
        return ResponseEntity.ok(mascotasService.listarMascotas());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarMascota(@PathVariable Long id) {
        mascotasService.eliminarMascota(id);
        return ResponseEntity.noContent().build();
    }
}
