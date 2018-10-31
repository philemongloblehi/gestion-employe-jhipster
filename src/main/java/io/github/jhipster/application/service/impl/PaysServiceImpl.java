package io.github.jhipster.application.service.impl;

import io.github.jhipster.application.service.PaysService;
import io.github.jhipster.application.domain.Pays;
import io.github.jhipster.application.repository.PaysRepository;
import io.github.jhipster.application.repository.search.PaysSearchRepository;
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
 * Service Implementation for managing Pays.
 */
@Service
@Transactional
public class PaysServiceImpl implements PaysService {

    private final Logger log = LoggerFactory.getLogger(PaysServiceImpl.class);

    private PaysRepository paysRepository;

    private PaysSearchRepository paysSearchRepository;

    public PaysServiceImpl(PaysRepository paysRepository, PaysSearchRepository paysSearchRepository) {
        this.paysRepository = paysRepository;
        this.paysSearchRepository = paysSearchRepository;
    }

    /**
     * Save a pays.
     *
     * @param pays the entity to save
     * @return the persisted entity
     */
    @Override
    public Pays save(Pays pays) {
        log.debug("Request to save Pays : {}", pays);
        Pays result = paysRepository.save(pays);
        paysSearchRepository.save(result);
        return result;
    }

    /**
     * Get all the pays.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<Pays> findAll() {
        log.debug("Request to get all Pays");
        return paysRepository.findAll();
    }


    /**
     * Get one pays by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Pays> findOne(Long id) {
        log.debug("Request to get Pays : {}", id);
        return paysRepository.findById(id);
    }

    /**
     * Delete the pays by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Pays : {}", id);
        paysRepository.deleteById(id);
        paysSearchRepository.deleteById(id);
    }

    /**
     * Search for the pays corresponding to the query.
     *
     * @param query the query of the search
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<Pays> search(String query) {
        log.debug("Request to search Pays for query {}", query);
        return StreamSupport
            .stream(paysSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }
}
