package io.github.jhipster.application.service;

import io.github.jhipster.application.domain.Tache;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing Tache.
 */
public interface TacheService {

    /**
     * Save a tache.
     *
     * @param tache the entity to save
     * @return the persisted entity
     */
    Tache save(Tache tache);

    /**
     * Get all the taches.
     *
     * @return the list of entities
     */
    List<Tache> findAll();


    /**
     * Get the "id" tache.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<Tache> findOne(Long id);

    /**
     * Delete the "id" tache.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the tache corresponding to the query.
     *
     * @param query the query of the search
     * 
     * @return the list of entities
     */
    List<Tache> search(String query);
}
