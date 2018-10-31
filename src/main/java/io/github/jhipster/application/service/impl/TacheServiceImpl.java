package io.github.jhipster.application.service.impl;

import io.github.jhipster.application.service.TacheService;
import io.github.jhipster.application.domain.Tache;
import io.github.jhipster.application.repository.TacheRepository;
import io.github.jhipster.application.repository.search.TacheSearchRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing Tache.
 */
@Service
@Transactional
public class TacheServiceImpl implements TacheService {

    private final Logger log = LoggerFactory.getLogger(TacheServiceImpl.class);

    private TacheRepository tacheRepository;

    private TacheSearchRepository tacheSearchRepository;

    public TacheServiceImpl(TacheRepository tacheRepository, TacheSearchRepository tacheSearchRepository) {
        this.tacheRepository = tacheRepository;
        this.tacheSearchRepository = tacheSearchRepository;
    }

    /**
     * Save a tache.
     *
     * @param tache the entity to save
     * @return the persisted entity
     */
    @Override
    public Tache save(Tache tache) {
        log.debug("Request to save Tache : {}", tache);
        Tache result = tacheRepository.save(tache);
        tacheSearchRepository.save(result);
        return result;
    }

    /**
     * Get all the taches.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<Tache> findAll() {
        log.debug("Request to get all Taches");
        return tacheRepository.findAll();
    }


    /**
     * Get one tache by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Tache> findOne(Long id) {
        log.debug("Request to get Tache : {}", id);
        return tacheRepository.findById(id);
    }

    /**
     * Delete the tache by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Tache : {}", id);
        tacheRepository.deleteById(id);
        tacheSearchRepository.deleteById(id);
    }

    /**
     * Search for the tache corresponding to the query.
     *
     * @param query the query of the search
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<Tache> search(String query) {
        log.debug("Request to search Taches for query {}", query);
        return StreamSupport
            .stream(tacheSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }
}
