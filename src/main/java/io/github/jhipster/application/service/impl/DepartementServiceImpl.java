package io.github.jhipster.application.service.impl;

import io.github.jhipster.application.service.DepartementService;
import io.github.jhipster.application.domain.Departement;
import io.github.jhipster.application.repository.DepartementRepository;
import io.github.jhipster.application.repository.search.DepartementSearchRepository;
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
 * Service Implementation for managing Departement.
 */
@Service
@Transactional
public class DepartementServiceImpl implements DepartementService {

    private final Logger log = LoggerFactory.getLogger(DepartementServiceImpl.class);

    private DepartementRepository departementRepository;

    private DepartementSearchRepository departementSearchRepository;

    public DepartementServiceImpl(DepartementRepository departementRepository, DepartementSearchRepository departementSearchRepository) {
        this.departementRepository = departementRepository;
        this.departementSearchRepository = departementSearchRepository;
    }

    /**
     * Save a departement.
     *
     * @param departement the entity to save
     * @return the persisted entity
     */
    @Override
    public Departement save(Departement departement) {
        log.debug("Request to save Departement : {}", departement);
        Departement result = departementRepository.save(departement);
        departementSearchRepository.save(result);
        return result;
    }

    /**
     * Get all the departements.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<Departement> findAll() {
        log.debug("Request to get all Departements");
        return departementRepository.findAll();
    }


    /**
     * Get one departement by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Departement> findOne(Long id) {
        log.debug("Request to get Departement : {}", id);
        return departementRepository.findById(id);
    }

    /**
     * Delete the departement by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Departement : {}", id);
        departementRepository.deleteById(id);
        departementSearchRepository.deleteById(id);
    }

    /**
     * Search for the departement corresponding to the query.
     *
     * @param query the query of the search
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<Departement> search(String query) {
        log.debug("Request to search Departements for query {}", query);
        return StreamSupport
            .stream(departementSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }
}
