package com.example.AdoptaFacil.DTO;

import com.example.AdoptaFacil.Entity.Person;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.FetchType;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.util.Set;

@Data

public class RoleDTO {

    private Long idRole;
    private String roleName;

}
