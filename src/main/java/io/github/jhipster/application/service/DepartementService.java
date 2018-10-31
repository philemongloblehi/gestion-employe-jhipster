package io.github.jhipster.application.service;

import io.github.jhipster.application.domain.Departement;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing Departement.
 */
public interface DepartementService {

    /**
     * Save a departement.
     *
     * @param departement the entity to save
     * @return the persisted entity
     */
    Departement save(Departement departement);

    /**
     * Get all the departements.
     *
     * @return the list of entities
     */
    List<Departement> findAll();


    /**
     * Get the "id" departement.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<Departement> findOne(Long id);

    /**
     * Delete the "id" departement.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the departement corresponding to the query.
     *
     * @param query the query of the search
     * 
     * @return the list of entities
     */
    List<Departement> search(String query);
}
