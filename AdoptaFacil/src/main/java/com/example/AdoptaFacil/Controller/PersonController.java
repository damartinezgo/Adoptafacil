package com.example.AdoptaFacil.Controller;

import com.example.AdoptaFacil.DTO.PersonDTO;
import com.example.AdoptaFacil.Service.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/persons")
public class PersonController {

    @Autowired
    private PersonService personService;

    // 🔹 Listar todos
    @GetMapping
    public ResponseEntity<List<PersonDTO>> listPersons() {
        return ResponseEntity.ok(personService.listPersons());
    }

    // 🔹 Buscar por ID
    @GetMapping("/{id}")
    public ResponseEntity<PersonDTO> getPersonById(@PathVariable Long id) {
        PersonDTO dto = personService.getPersonById(id);
        return (dto != null) ? ResponseEntity.ok(dto) : ResponseEntity.notFound().build();
    }

    // 🔹 Buscar por email
    @GetMapping("/email/{email}")
    public ResponseEntity<PersonDTO> getPersonByEmail(@PathVariable String email) {
        PersonDTO dto = personService.getPersonByEmail(email);
        return (dto != null) ? ResponseEntity.ok(dto) : ResponseEntity.notFound().build();
    }

    // 🔹 Buscar por rol
    @GetMapping("/role/{roleType}")
    public ResponseEntity<List<PersonDTO>> listPersonByRole(@PathVariable String roleType) {
        return ResponseEntity.ok(personService.listPersonByRole(roleType));
    }

    // 🔹 Crear
    @PostMapping
    public ResponseEntity<PersonDTO> createPerson(@RequestBody PersonDTO personDTO) {
        return ResponseEntity.ok(personService.createPerson(personDTO));
    }

    // 🔹 Actualizar
    @PutMapping("/{id}")
    public ResponseEntity<PersonDTO> updatePerson(@PathVariable Long id, @RequestBody PersonDTO personDTO) {
        PersonDTO updated = personService.updatePerson(id, personDTO);
        return (updated != null) ? ResponseEntity.ok(updated) : ResponseEntity.notFound().build();
    }

    // 🔹 Eliminar
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePerson(@PathVariable Long id) {
        personService.deletePerson(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/personas")
    public String verPersonas(Model model) {
        List<PersonDTO> personas;
        personas = personService.listPersons();
        model.addAttribute("personas", personas);
        return "personas/listar-personas";
    }

}
