package com.example.AdoptaFacil.Service;

import com.example.AdoptaFacil.DTO.RoleDTO;

import java.util.List;

public interface RoleService {

    List<RoleDTO> listRoles();

    RoleDTO getRoleById(Long idRole);

    RoleDTO createRole(RoleDTO roleDTO);

    RoleDTO updateRole(Long idRole, RoleDTO roleDTO);

    RoleDTO getRoleByName(String roleName);

}
