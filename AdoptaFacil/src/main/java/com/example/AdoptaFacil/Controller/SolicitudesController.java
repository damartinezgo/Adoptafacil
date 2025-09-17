package com.example.AdoptaFacil.Controller;

import com.example.AdoptaFacil.Entity.Solicitudes;
import com.example.AdoptaFacil.Service.SolicitudesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/solicitudes")
public class SolicitudesController {

    @Autowired
    private SolicitudesService solicitudesService;

    @PostMapping
    public Solicitudes crearSolicitud(@RequestBody Solicitudes solicitud) {
        return solicitudesService.crearSolicitud(solicitud);
    }

    @GetMapping
    public List<Solicitudes> listarSolicitudes() {
        return solicitudesService.listarSolicitudes();
    }

    @PutMapping("/{id}/estado")
    public Solicitudes cambiarEstado(@PathVariable Long id, @RequestParam String estado, @RequestParam(required = false) String comentario) {
        return solicitudesService.cambiarEstado(id, estado, comentario);
    }
}
