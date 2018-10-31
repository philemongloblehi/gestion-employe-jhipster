package io.github.jhipster.application.service.impl;

import io.github.jhipster.application.service.LocalisationService;
import io.github.jhipster.application.domain.Localisation;
import io.github.jhipster.application.repository.LocalisationRepository;
import io.github.jhipster.application.repository.search.LocalisationSearchRepository;
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
 * Service Implementation for managing Localisation.
 */
@Service
@Transactional
public class LocalisationServiceImpl implements LocalisationService {

    private final Logger log = LoggerFactory.getLogger(LocalisationServiceImpl.class);

    private LocalisationRepository localisationRepository;

    private LocalisationSearchRepository localisationSearchRepository;

    public LocalisationServiceImpl(LocalisationRepository localisationRepository, LocalisationSearchRepository localisationSearchRepository) {
        this.localisationRepository = localisationRepository;
        this.localisationSearchRepository = localisationSearchRepository;
    }

    /**
     * Save a localisation.
     *
     * @param localisation the entity to save
     * @return the persisted entity
     */
    @Override
    public Localisation save(Localisation localisation) {
        log.debug("Request to save Localisation : {}", localisation);
        Localisation result = localisationRepository.save(localisation);
        localisationSearchRepository.save(result);
        return result;
    }

    /**
     * Get all the localisations.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<Localisation> findAll() {
        log.debug("Request to get all Localisations");
        return localisationRepository.findAll();
    }


    /**
     * Get one localisation by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Localisation> findOne(Long id) {
        log.debug("Request to get Localisation : {}", id);
        return localisationRepository.findById(id);
    }

    /**
     * Delete the localisation by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Localisation : {}", id);
        localisationRepository.deleteById(id);
        localisationSearchRepository.deleteById(id);
    }

    /**
     * Search for the localisation corresponding to the query.
     *
     * @param query the query of the search
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<Localisation> search(String query) {
        log.debug("Request to search Localisations for query {}", query);
        return StreamSupport
            .stream(localisationSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }
}
