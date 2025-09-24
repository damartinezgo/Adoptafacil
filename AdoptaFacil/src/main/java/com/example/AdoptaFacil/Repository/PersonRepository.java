package com.example.AdoptaFacil.Repository;

import com.example.AdoptaFacil.Entity.Person;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PersonRepository extends JpaRepository<Person, Long> {

    // Buscar persona por email
    Optional<Person> findByEmail(String email);

    // Buscar personas por rol (usando el tipo del rol)
    List<Person> findByRole_RoleTypeIgnoreCase(String roleType);
}
    