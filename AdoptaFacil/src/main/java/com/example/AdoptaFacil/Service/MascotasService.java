package com.example.AdoptaFacil.Service;

import com.example.AdoptaFacil.DTO.MascotasDTO;
import com.example.AdoptaFacil.Entity.Mascotas;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface MascotasService {
    MascotasDTO crearMascota(Mascotas mascota, List<MultipartFile> imagenes);
    MascotasDTO obtenerMascota(Long id);
    List<MascotasDTO> listarMascotas();
    List<MascotasDTO> buscarPorNombre(String nombre);
    MascotasDTO actualizarMascota(Long id, Mascotas mascota, List<MultipartFile> imagenes);
    void eliminarMascota(Long id);
    void eliminarMascotaPorUsuario(Long id, Long idUsuario);
}
