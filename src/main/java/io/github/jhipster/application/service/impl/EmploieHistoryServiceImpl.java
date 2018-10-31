package io.github.jhipster.application.service.impl;

import io.github.jhipster.application.service.EmploieHistoryService;
import io.github.jhipster.application.domain.EmploieHistory;
import io.github.jhipster.application.repository.EmploieHistoryRepository;
import io.github.jhipster.application.repository.search.EmploieHistorySearchRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing EmploieHistory.
 */
@Service
@Transactional
public class EmploieHistoryServiceImpl implements EmploieHistoryService {

    private final Logger log = LoggerFactory.getLogger(EmploieHistoryServiceImpl.class);

    private EmploieHistoryRepository emploieHistoryRepository;

    private EmploieHistorySearchRepository emploieHistorySearchRepository;

    public EmploieHistoryServiceImpl(EmploieHistoryRepository emploieHistoryRepository, EmploieHistorySearchRepository emploieHistorySearchRepository) {
        this.emploieHistoryRepository = emploieHistoryRepository;
        this.emploieHistorySearchRepository = emploieHistorySearchRepository;
    }

    /**
     * Save a emploieHistory.
     *
     * @param emploieHistory the entity to save
     * @return the persisted entity
     */
    @Override
    public EmploieHistory save(EmploieHistory emploieHistory) {
        log.debug("Request to save EmploieHistory : {}", emploieHistory);
        EmploieHistory result = emploieHistoryRepository.save(emploieHistory);
        emploieHistorySearchRepository.save(result);
        return result;
    }

    /**
     * Get all the emploieHistories.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<EmploieHistory> findAll(Pageable pageable) {
        log.debug("Request to get all EmploieHistories");
        return emploieHistoryRepository.findAll(pageable);
    }


    /**
     * Get one emploieHistory by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<EmploieHistory> findOne(Long id) {
        log.debug("Request to get EmploieHistory : {}", id);
        return emploieHistoryRepository.findById(id);
    }

    /**
     * Delete the emploieHistory by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete EmploieHistory : {}", id);
        emploieHistoryRepository.deleteById(id);
        emploieHistorySearchRepository.deleteById(id);
    }

    /**
     * Search for the emploieHistory corresponding to the query.
     *
     * @param query the query of the search
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<EmploieHistory> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of EmploieHistories for query {}", query);
        return emploieHistorySearchRepository.search(queryStringQuery(query), pageable);    }
}
