package com.example.AdoptaFacil.Entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "donaciones")
public class Donaciones {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Relación con la persona que dona
    @ManyToOne
    @JoinColumn(name = "person_id", nullable = false)
    private Person donante;

    @Column(nullable = false)
    private Double monto;

    @Column(length = 255)
    private String metodoPago; // Ej: Tarjeta, Nequi, PSE, etc.

    @Column(nullable = false)
    private LocalDateTime fechaDonacion;

    @Column(length = 500)
    private String comentario; // Opcional: mensaje del donante

    // Constructor vacío (requerido por JPA)
    public Donaciones() {}

    // Constructor con parámetros
    public Donaciones(Person donante, Double monto, String metodoPago, LocalDateTime fechaDonacion, String comentario) {
        this.donante = donante;
        this.monto = monto;
        this.metodoPago = metodoPago;
        this.fechaDonacion = fechaDonacion;
        this.comentario = comentario;
    }

    // Getters y Setters
    public Long getId() {
        return id;
    }

    public Person getDonante() {
        return donante;
    }

    public void setDonante(Person donante) {
        this.donante = donante;
    }

    public Double getMonto() {
        return monto;
    }

    public void setMonto(Double monto) {
        this.monto = monto;
    }

    public String getMetodoPago() {
        return metodoPago;
    }

    public void setMetodoPago(String metodoPago) {
        this.metodoPago = metodoPago;
    }

    public LocalDateTime getFechaDonacion() {
        return fechaDonacion;
    }

    public void setFechaDonacion(LocalDateTime fechaDonacion) {
        this.fechaDonacion = fechaDonacion;
    }

    public String getComentario() {
        return comentario;
    }

    public void setComentario(String comentario) {
        this.comentario = comentario;
    }
}

