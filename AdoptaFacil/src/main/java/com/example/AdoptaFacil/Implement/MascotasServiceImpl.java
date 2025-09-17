package com.example.AdoptaFacil.Implement;

import com.example.AdoptaFacil.Entity.MascotaImage;
import com.example.AdoptaFacil.Entity.Mascotas;
import com.example.AdoptaFacil.Repository.MascotasRepository;
import com.example.AdoptaFacil.Service.MascotasService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class MascotasServiceImpl implements MascotasService {

    private final MascotasRepository mascotasRepository;
    private final String UPLOAD_DIR = "uploads/";

    @Override
    public Mascotas crearMascota(Mascotas mascota, List<MultipartFile> imagenes) {
        if (imagenes != null && imagenes.size() > 3) {
            throw new RuntimeException("Máximo 3 imágenes permitidas");
        }

        Mascotas nuevaMascota = mascotasRepository.save(mascota);

        if (imagenes != null) {
            int orden = 1;
            for (MultipartFile file : imagenes) {
                try {
                    String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
                    File destino = new File(UPLOAD_DIR + fileName);
                    file.transferTo(destino);

                    MascotaImage img = new MascotaImage();
                    img.setImagenPath(destino.getPath());
                    img.setOrden(orden++);
                    img.setMascota(nuevaMascota);
                    nuevaMascota.getImagenes().add(img);

                } catch (IOException e) {
                    throw new RuntimeException("Error al guardar imagen: " + e.getMessage());
                }
            }
        }

        return mascotasRepository.save(nuevaMascota);
    }

    @Override
    public Mascotas obtenerMascota(Long id) {
        return mascotasRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Mascota no encontrada"));
    }

    @Override
    public List<Mascotas> listarMascotas() {
        return mascotasRepository.findAll();
    }

    @Override
    public List<Mascotas> buscarPorNombre(String nombre) {
        return mascotasRepository.findByNombreContainingIgnoreCase(nombre);
    }

    @Override
    public void eliminarMascota(Long id) {
        mascotasRepository.deleteById(id);
    }

}


