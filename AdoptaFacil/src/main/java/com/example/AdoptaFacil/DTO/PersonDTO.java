package com.example.AdoptaFacil.DTO;

import com.example.AdoptaFacil.Entity.Role;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data

public class PersonDTO {

    private Long idPerson;
    private String name;
    private String lastName;
    private String email;
    private String password;
    private Role role;

}
