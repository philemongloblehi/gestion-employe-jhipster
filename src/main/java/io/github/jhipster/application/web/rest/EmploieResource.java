package io.github.jhipster.application.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.application.domain.Emploie;
import io.github.jhipster.application.repository.EmploieRepository;
import io.github.jhipster.application.repository.search.EmploieSearchRepository;
import io.github.jhipster.application.web.rest.errors.BadRequestAlertException;
import io.github.jhipster.application.web.rest.util.HeaderUtil;
import io.github.jhipster.application.web.rest.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing Emploie.
 */
@RestController
@RequestMapping("/api")
public class EmploieResource {

    private final Logger log = LoggerFactory.getLogger(EmploieResource.class);

    private static final String ENTITY_NAME = "emploie";

    private EmploieRepository emploieRepository;

    private EmploieSearchRepository emploieSearchRepository;

    public EmploieResource(EmploieRepository emploieRepository, EmploieSearchRepository emploieSearchRepository) {
        this.emploieRepository = emploieRepository;
        this.emploieSearchRepository = emploieSearchRepository;
    }

    /**
     * POST  /emploies : Create a new emploie.
     *
     * @param emploie the emploie to create
     * @return the ResponseEntity with status 201 (Created) and with body the new emploie, or with status 400 (Bad Request) if the emploie has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/emploies")
    @Timed
    public ResponseEntity<Emploie> createEmploie(@RequestBody Emploie emploie) throws URISyntaxException {
        log.debug("REST request to save Emploie : {}", emploie);
        if (emploie.getId() != null) {
            throw new BadRequestAlertException("A new emploie cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Emploie result = emploieRepository.save(emploie);
        emploieSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/emploies/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /emploies : Updates an existing emploie.
     *
     * @param emploie the emploie to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated emploie,
     * or with status 400 (Bad Request) if the emploie is not valid,
     * or with status 500 (Internal Server Error) if the emploie couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/emploies")
    @Timed
    public ResponseEntity<Emploie> updateEmploie(@RequestBody Emploie emploie) throws URISyntaxException {
        log.debug("REST request to update Emploie : {}", emploie);
        if (emploie.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Emploie result = emploieRepository.save(emploie);
        emploieSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, emploie.getId().toString()))
            .body(result);
    }

    /**
     * GET  /emploies : get all the emploies.
     *
     * @param pageable the pagination information
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many)
     * @return the ResponseEntity with status 200 (OK) and the list of emploies in body
     */
    @GetMapping("/emploies")
    @Timed
    public ResponseEntity<List<Emploie>> getAllEmploies(Pageable pageable, @RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get a page of Emploies");
        Page<Emploie> page;
        if (eagerload) {
            page = emploieRepository.findAllWithEagerRelationships(pageable);
        } else {
            page = emploieRepository.findAll(pageable);
        }
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, String.format("/api/emploies?eagerload=%b", eagerload));
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /emploies/:id : get the "id" emploie.
     *
     * @param id the id of the emploie to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the emploie, or with status 404 (Not Found)
     */
    @GetMapping("/emploies/{id}")
    @Timed
    public ResponseEntity<Emploie> getEmploie(@PathVariable Long id) {
        log.debug("REST request to get Emploie : {}", id);
        Optional<Emploie> emploie = emploieRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(emploie);
    }

    /**
     * DELETE  /emploies/:id : delete the "id" emploie.
     *
     * @param id the id of the emploie to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/emploies/{id}")
    @Timed
    public ResponseEntity<Void> deleteEmploie(@PathVariable Long id) {
        log.debug("REST request to delete Emploie : {}", id);

        emploieRepository.deleteById(id);
        emploieSearchRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/emploies?query=:query : search for the emploie corresponding
     * to the query.
     *
     * @param query the query of the emploie search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/emploies")
    @Timed
    public ResponseEntity<List<Emploie>> searchEmploies(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of Emploies for query {}", query);
        Page<Emploie> page = emploieSearchRepository.search(queryStringQuery(query), pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/emploies");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

}
