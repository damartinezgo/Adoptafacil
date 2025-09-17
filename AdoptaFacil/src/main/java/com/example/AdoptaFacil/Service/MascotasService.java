package com.example.AdoptaFacil.Service;

import com.example.AdoptaFacil.entity.Mascotas;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface MascotasService {
    Mascotas crearMascota(Mascotas mascota, List<MultipartFile> imagenes);
    Mascotas obtenerMascota(Long id);
    List<Mascotas> listarMascotas();
    List<Mascotas> buscarPorNombre(String nombre);
    void eliminarMascota(Long id);
}
