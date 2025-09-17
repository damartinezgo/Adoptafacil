package com.example.AdoptaFacil.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "mascotas")
@Data
public class Mascotas {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String nombre;

    @NotBlank
    private String especie;  //perro gato o otro

    private String raza;

    private Integer edad;

    @Column(name = "fecha_nacimiento")
    private LocalDate fechaNacimiento;

    @NotBlank
    private String sexo; // macho o hembra

    @NotBlank
    private String ciudad;

    @Column(columnDefinition = "TEXT")
    private String descripcion;

    private String imagen;//imagen principal

    // Relación con usuario
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)  // FK user_id
    private Person usuario;

    // Relación con mascotaImage
    @OneToMany(mappedBy = "mascota", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<MascotaImage> imagenes = new ArrayList<>();
}

