package com.example.AdoptaFacil.Entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;


@Entity
@Table(name = "donaciones")
@Data
public class Donaciones {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Relación con la persona que dona
    @ManyToOne
    @JoinColumn(name = "id_person")
    private Person CLIENTE;

    @Column(name="monto",nullable = false)
    private Double monto;

    @Column(name="metodoPago",length = 50, nullable = false)
    private String metodoPago;

    @Column(name="fechaDonacion",nullable = false)
    private LocalDateTime fechaDonacion;

    @Column(name ="comentario", length = 1000)
    private String comentario; // comentario opcional
}

