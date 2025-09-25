package com.example.AdoptaFacil.Controller.auth;

import com.example.AdoptaFacil.DTO.*;
import com.example.AdoptaFacil.DTO.auth.AuthResponseDTO;
import com.example.AdoptaFacil.DTO.auth.LoginRequestDTO;
import com.example.AdoptaFacil.DTO.auth.RegisterRequestDTO;
import com.example.AdoptaFacil.Entity.Person;
import com.example.AdoptaFacil.Entity.Role;
import com.example.AdoptaFacil.Repository.PersonRepository;
import com.example.AdoptaFacil.Repository.RoleRepository;
import com.example.AdoptaFacil.Util.JwtUtil;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private PersonRepository personRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequestDTO loginRequest) {
        try {
            // Buscar usuario por email
            Optional<Person> personOpt = personRepository.findByEmail(loginRequest.getEmail());
            
            if (personOpt.isEmpty()) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Credenciales inválidas");
            }

            Person person = personOpt.get();
            
            // Verificar contraseña
            if (!passwordEncoder.matches(loginRequest.getPassword(), person.getPassword())) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Credenciales inválidas");
            }

            // Generar token JWT
            String token = jwtUtil.generateToken(
                person.getEmail(), 
                person.getRole().getRoleType().name()
            );

            // Crear PersonDTO para la respuesta
            PersonDTO personDTO = new PersonDTO();
            personDTO.setIdPerson(person.getIdPerson());
            personDTO.setName(person.getName());
            personDTO.setLastName(person.getLastName());
            personDTO.setEmail(person.getEmail());
            personDTO.setRole(person.getRole());

            // Crear respuesta de autenticación
            AuthResponseDTO authResponse = new AuthResponseDTO(token, personDTO);
            
            return ResponseEntity.ok(authResponse);
            
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Error interno del servidor");
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequestDTO registerRequest) {
        try {
            // Verificar si el email ya existe
            if (personRepository.findByEmail(registerRequest.getEmail()).isPresent()) {
                return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("El email ya está registrado");
            }

            // Buscar el rol
            Optional<Role> roleOpt = roleRepository.findByRoleType(registerRequest.getRole());
            if (roleOpt.isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Rol inválido");
            }

            Role role = roleOpt.get();

            // Crear nueva persona
            Person newPerson = new Person();
            newPerson.setName(registerRequest.getName());
            newPerson.setLastName(registerRequest.getLastName());
            newPerson.setEmail(registerRequest.getEmail());
            newPerson.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
            newPerson.setRole(role);

            // Guardar persona
            Person savedPerson = personRepository.save(newPerson);

            // Generar token JWT
            String token = jwtUtil.generateToken(
                savedPerson.getEmail(), 
                savedPerson.getRole().getRoleType().name()
            );

            // Crear PersonDTO para la respuesta
            PersonDTO personDTO = new PersonDTO();
            personDTO.setIdPerson(savedPerson.getIdPerson());
            personDTO.setName(savedPerson.getName());
            personDTO.setLastName(savedPerson.getLastName());
            personDTO.setEmail(savedPerson.getEmail());
            personDTO.setRole(savedPerson.getRole());

            // Crear respuesta de autenticación
            AuthResponseDTO authResponse = new AuthResponseDTO(token, personDTO);
            
            return ResponseEntity.status(HttpStatus.CREATED).body(authResponse);
            
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Error interno del servidor");
        }
    }
    
    // Endpoint de prueba para verificar conectividad
    @GetMapping("/test")
    public ResponseEntity<?> testConnection() {
        return ResponseEntity.ok("API funcionando correctamente - " + java.time.LocalDateTime.now());
    }
}