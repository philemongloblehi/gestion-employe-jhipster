package io.github.jhipster.application.service;

import io.github.jhipster.application.domain.Localisation;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing Localisation.
 */
public interface LocalisationService {

    /**
     * Save a localisation.
     *
     * @param localisation the entity to save
     * @return the persisted entity
     */
    Localisation save(Localisation localisation);

    /**
     * Get all the localisations.
     *
     * @return the list of entities
     */
    List<Localisation> findAll();


    /**
     * Get the "id" localisation.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<Localisation> findOne(Long id);

    /**
     * Delete the "id" localisation.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the localisation corresponding to the query.
     *
     * @param query the query of the search
     * 
     * @return the list of entities
     */
    List<Localisation> search(String query);
}
