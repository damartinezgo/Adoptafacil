package com.example.AdoptaFacil.Controller;

import com.example.AdoptaFacil.DTO.DonacionesDTO;
import com.example.AdoptaFacil.Service.DonacionesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/donaciones")
public class DonacionesController {

    @Autowired
    private DonacionesService donacionesService;

    // Crear nueva donación
    @PostMapping
    public ResponseEntity<DonacionesDTO> crearDonacion(@RequestBody DonacionesDTO donacionDTO) {
        DonacionesDTO nuevaDonacion = donacionesService.crearDonacion(donacionDTO);
        return ResponseEntity.ok(nuevaDonacion);
    }

    // Listar todas las donaciones
    @GetMapping
    public ResponseEntity<List<DonacionesDTO>> listarDonaciones() {
        return ResponseEntity.ok(donacionesService.listarDonaciones());
    }

    // Buscar donación por ID
    @GetMapping("/{id}")
    public ResponseEntity<DonacionesDTO> obtenerDonacionPorId(@PathVariable Long id) {
        return ResponseEntity.ok(donacionesService.obtenerDonacionPorId(id));
    }

    // Listar donaciones de un donante específico
    @GetMapping("/donante/{donanteId}")
    public ResponseEntity<List<DonacionesDTO>> obtenerDonacionesPorDonante(@PathVariable Long donanteId) {
        return ResponseEntity.ok(donacionesService.obtenerDonacionesPorDonante(donanteId));
    }

    // Eliminar donación
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarDonacion(@PathVariable Long id) {
        donacionesService.eliminarDonacion(id);
        return ResponseEntity.noContent().build();
    }
}
