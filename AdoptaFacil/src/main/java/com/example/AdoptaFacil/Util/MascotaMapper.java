package com.example.AdoptaFacil.Util;

import com.example.AdoptaFacil.DTO.MascotaImageDTO;
import com.example.AdoptaFacil.DTO.MascotasDTO;
import com.example.AdoptaFacil.Entity.MascotaImage;
import com.example.AdoptaFacil.Entity.Mascotas;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Mapper para convertir entre entidades Mascotas y DTOs
 * Evita problemas de serialización de lazy loading de Hibernate
 */
@Component
public class MascotaMapper {

    /**
     * Convierte una entidad Mascotas a MascotasDTO
     * @param mascota Entidad de mascota
     * @return DTO de mascota sin relaciones lazy
     */
    public MascotasDTO toDTO(Mascotas mascota) {
        if (mascota == null) {
            return null;
        }

        MascotasDTO dto = new MascotasDTO();
        dto.setId(mascota.getId());
        dto.setNombre(mascota.getNombre());
        dto.setEspecie(mascota.getEspecie());
        dto.setRaza(mascota.getRaza());
        dto.setEdad(mascota.getEdad());
        dto.setFechaNacimiento(mascota.getFechaNacimiento());
        dto.setSexo(mascota.getSexo());
        dto.setCiudad(mascota.getCiudad());
        dto.setDescripcion(mascota.getDescripcion());
        dto.setImagen(mascota.getImagen());

        // Convertir las imágenes a DTOs
        if (mascota.getImagenes() != null && !mascota.getImagenes().isEmpty()) {
            List<MascotaImageDTO> imageDTOs = mascota.getImagenes().stream()
                    .map(this::toImageDTO)
                    .collect(Collectors.toList());
            dto.setImagenes(imageDTOs);
        }

        return dto;
    }

    /**
     * Convierte una lista de entidades Mascotas a DTOs
     * @param mascotas Lista de entidades
     * @return Lista de DTOs
     */
    public List<MascotasDTO> toDTOList(List<Mascotas> mascotas) {
        if (mascotas == null) {
            return null;
        }
        return mascotas.stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    /**
     * Convierte una imagen de entidad a DTO
     * @param imagen Entidad de imagen
     * @return DTO de imagen
     */
    public MascotaImageDTO toImageDTO(MascotaImage imagen) {
        if (imagen == null) {
            return null;
        }
        return new MascotaImageDTO(
                imagen.getId(),
                imagen.getImagenPath(),
                imagen.getOrden()
        );
    }
}
