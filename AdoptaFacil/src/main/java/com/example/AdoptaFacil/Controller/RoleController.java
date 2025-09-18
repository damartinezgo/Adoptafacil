package com.example.AdoptaFacil.Controller;

import com.example.AdoptaFacil.DTO.RoleDTO;
import com.example.AdoptaFacil.Entity.Role;
import com.example.AdoptaFacil.Service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/roles")
public class RoleController {

    @Autowired
    private RoleService roleService;

    // 🔹 Listar roles
    @GetMapping
    public ResponseEntity<List<RoleDTO>> listRoles() {
        return ResponseEntity.ok(roleService.listRoles());
    }

    // 🔹 Buscar por ID
    @GetMapping("/{id}")
    public ResponseEntity<RoleDTO> getRoleById(@PathVariable Long id) {
        RoleDTO dto = roleService.getRoleById(id);
        return (dto != null) ? ResponseEntity.ok(dto) : ResponseEntity.notFound().build();
    }

    // 🔹 Buscar por tipo
    @GetMapping("/type/{roleType}")
    public ResponseEntity<RoleDTO> getRoleByType(@PathVariable Role.RoleType roleType) {
        RoleDTO dto = roleService.getRoleByType(roleType);
        return (dto != null) ? ResponseEntity.ok(dto) : ResponseEntity.notFound().build();
    }

    // 🔹 Crear rol
    @PostMapping
    public ResponseEntity<RoleDTO> createRole(@RequestBody RoleDTO roleDTO) {
        return ResponseEntity.ok(roleService.createRole(roleDTO));
    }

    // 🔹 Actualizar rol
    @PutMapping("/{id}")
    public ResponseEntity<RoleDTO> updateRole(@PathVariable Long id, @RequestBody RoleDTO roleDTO) {
        RoleDTO updated = roleService.updateRole(id, roleDTO);
        return (updated != null) ? ResponseEntity.ok(updated) : ResponseEntity.notFound().build();
    }
}
