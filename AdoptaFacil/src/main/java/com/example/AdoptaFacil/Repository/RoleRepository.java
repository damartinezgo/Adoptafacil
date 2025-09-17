package com.example.AdoptaFacil.Repository;

import com.example.AdoptaFacil.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {

    // Buscar un rol por su nombre
    Optional<Role> findByRoleNameIgnoreCase(String roleName);
}
