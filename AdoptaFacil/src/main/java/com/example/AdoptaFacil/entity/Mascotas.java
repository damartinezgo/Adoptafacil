package com.example.AdoptaFacil.Entity;

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
    @Column(name = "id_mascota")
    private Long id;

    @NotBlank
    @Column(name="nombre",length = 100, nullable = false)
    private String nombre;

    @NotBlank
    @Column(name="especie",length = 50, nullable = false)
    private String especie;  //perro gato o otro

    @NotBlank
    @Column(name="raza",length = 50, nullable = false)
    private String raza;

    @NotBlank
    @Column(name = "edad", nullable = false)
    private Integer edad;

    @NotBlank
    @Column(name = "fecha_nacimiento")
    private LocalDate fechaNacimiento;

    @NotBlank
    @Column(name="sexo")
    private String sexo; // macho o hembra

    @NotBlank
    @Column(name="ciudad")
    private String ciudad;

    @Column(columnDefinition = "TEXT")
    private String descripcion;

    private String imagen;//imagen principal

    // Relación con person
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_person", nullable = false)  // FK person_id
    private Person ALIADO;

    // Relación con mascotaImage
    @OneToMany(mappedBy = "mascota", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<MascotaImage> imagenes = new ArrayList<>();
}

