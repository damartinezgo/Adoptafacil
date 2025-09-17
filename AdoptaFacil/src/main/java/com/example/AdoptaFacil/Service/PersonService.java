package com.example.AdoptaFacil.Service;

import com.example.AdoptaFacil.DTO.PersonDTO;
import com.example.AdoptaFacil.Entity.Person;

import java.util.List;

public interface PersonService {

    List<PersonDTO> listPersons();

    List<PersonDTO> listPersonByRole(String roleName);

    PersonDTO getPersonByEmail(String email);

    PersonDTO getPersonById(Long personId);

    PersonDTO createPerson(PersonDTO personDTO);

    PersonDTO updatePerson(Long personId, PersonDTO personDTO);

    void deletePerson(Long personId);

}
