package com.example.AdoptaFacil.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Generated;

import java.time.LocalDate;

@Data
@Entity
@Table(
        name= "mascotas"
)

public class Mascotas {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_mascota;
    private String nombre;
    private String especie;
    private String raza;
    private Long edad;
    private LocalDate fecha_nacimiento;
    private String sexo;
    private String ciudad;
    private String descripcion;

    /*@ManyToOne
    @JoinColumn(name="id_user")
    private User user;*/

}
