package io.github.jhipster.application.service;

import io.github.jhipster.application.domain.EmploieHistory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing EmploieHistory.
 */
public interface EmploieHistoryService {

    /**
     * Save a emploieHistory.
     *
     * @param emploieHistory the entity to save
     * @return the persisted entity
     */
    EmploieHistory save(EmploieHistory emploieHistory);

    /**
     * Get all the emploieHistories.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<EmploieHistory> findAll(Pageable pageable);


    /**
     * Get the "id" emploieHistory.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<EmploieHistory> findOne(Long id);

    /**
     * Delete the "id" emploieHistory.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the emploieHistory corresponding to the query.
     *
     * @param query the query of the search
     * 
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<EmploieHistory> search(String query, Pageable pageable);
}
