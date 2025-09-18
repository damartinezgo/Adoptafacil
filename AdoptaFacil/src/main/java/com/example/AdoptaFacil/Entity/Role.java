package com.example.AdoptaFacil.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.util.Set;

@Entity
@Table(name = "role")
@Data
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_role")
    private Long idRole;

    public enum RoleType {
        ADMIN,
        CLIENTE,
        ALIADO
    }
    @Enumerated(EnumType.STRING)
    @Column(name = "role_type", unique = true, nullable = false)
    private RoleType roleType;

    @OneToMany(mappedBy = "role", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private Set<Person> person;

}
