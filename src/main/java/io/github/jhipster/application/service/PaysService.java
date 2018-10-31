package io.github.jhipster.application.service;

import io.github.jhipster.application.domain.Pays;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing Pays.
 */
public interface PaysService {

    /**
     * Save a pays.
     *
     * @param pays the entity to save
     * @return the persisted entity
     */
    Pays save(Pays pays);

    /**
     * Get all the pays.
     *
     * @return the list of entities
     */
    List<Pays> findAll();


    /**
     * Get the "id" pays.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<Pays> findOne(Long id);

    /**
     * Delete the "id" pays.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the pays corresponding to the query.
     *
     * @param query the query of the search
     * 
     * @return the list of entities
     */
    List<Pays> search(String query);
}
