package com.example.AdoptaFacil.Repository;

import com.example.AdoptaFacil.Entity.Donaciones;
import com.example.AdoptaFacil.Entity.Person;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DonacionesRepository extends JpaRepository<Donaciones, Long> {

    // Buscar donaciones por persona (donante)
    List<Donaciones> findByDonante(Person donante);

    // Buscar donaciones mayores a un monto específico
    List<Donaciones> findByMontoGreaterThan(Double monto);

    // Buscar donaciones por método de pago
    List<Donaciones> findByMetodoPago(String metodoPago);
}
