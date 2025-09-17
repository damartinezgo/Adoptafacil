package com.example.AdoptaFacil.Repository;

import com.example.AdoptaFacil.entity.Mascotas;
import com.example.AdoptaFacil.entity.Person;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MascotasRepository extends JpaRepository<Mascotas, Long> {
    List<Mascotas> findByNombreContainingIgnoreCase(String nombre);
    List<Mascotas> findByEspecie(String especie);
    List<Mascotas> findByUsuario(Person usuario);
}
