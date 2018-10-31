package io.github.jhipster.application.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.application.domain.EmploieHistory;
import io.github.jhipster.application.service.EmploieHistoryService;
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
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing EmploieHistory.
 */
@RestController
@RequestMapping("/api")
public class EmploieHistoryResource {

    private final Logger log = LoggerFactory.getLogger(EmploieHistoryResource.class);

    private static final String ENTITY_NAME = "emploieHistory";

    private EmploieHistoryService emploieHistoryService;

    public EmploieHistoryResource(EmploieHistoryService emploieHistoryService) {
        this.emploieHistoryService = emploieHistoryService;
    }

    /**
     * POST  /emploie-histories : Create a new emploieHistory.
     *
     * @param emploieHistory the emploieHistory to create
     * @return the ResponseEntity with status 201 (Created) and with body the new emploieHistory, or with status 400 (Bad Request) if the emploieHistory has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/emploie-histories")
    @Timed
    public ResponseEntity<EmploieHistory> createEmploieHistory(@RequestBody EmploieHistory emploieHistory) throws URISyntaxException {
        log.debug("REST request to save EmploieHistory : {}", emploieHistory);
        if (emploieHistory.getId() != null) {
            throw new BadRequestAlertException("A new emploieHistory cannot already have an ID", ENTITY_NAME, "idexists");
        }
        EmploieHistory result = emploieHistoryService.save(emploieHistory);
        return ResponseEntity.created(new URI("/api/emploie-histories/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /emploie-histories : Updates an existing emploieHistory.
     *
     * @param emploieHistory the emploieHistory to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated emploieHistory,
     * or with status 400 (Bad Request) if the emploieHistory is not valid,
     * or with status 500 (Internal Server Error) if the emploieHistory couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/emploie-histories")
    @Timed
    public ResponseEntity<EmploieHistory> updateEmploieHistory(@RequestBody EmploieHistory emploieHistory) throws URISyntaxException {
        log.debug("REST request to update EmploieHistory : {}", emploieHistory);
        if (emploieHistory.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        EmploieHistory result = emploieHistoryService.save(emploieHistory);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, emploieHistory.getId().toString()))
            .body(result);
    }

    /**
     * GET  /emploie-histories : get all the emploieHistories.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of emploieHistories in body
     */
    @GetMapping("/emploie-histories")
    @Timed
    public ResponseEntity<List<EmploieHistory>> getAllEmploieHistories(Pageable pageable) {
        log.debug("REST request to get a page of EmploieHistories");
        Page<EmploieHistory> page = emploieHistoryService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/emploie-histories");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /emploie-histories/:id : get the "id" emploieHistory.
     *
     * @param id the id of the emploieHistory to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the emploieHistory, or with status 404 (Not Found)
     */
    @GetMapping("/emploie-histories/{id}")
    @Timed
    public ResponseEntity<EmploieHistory> getEmploieHistory(@PathVariable Long id) {
        log.debug("REST request to get EmploieHistory : {}", id);
        Optional<EmploieHistory> emploieHistory = emploieHistoryService.findOne(id);
        return ResponseUtil.wrapOrNotFound(emploieHistory);
    }

    /**
     * DELETE  /emploie-histories/:id : delete the "id" emploieHistory.
     *
     * @param id the id of the emploieHistory to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/emploie-histories/{id}")
    @Timed
    public ResponseEntity<Void> deleteEmploieHistory(@PathVariable Long id) {
        log.debug("REST request to delete EmploieHistory : {}", id);
        emploieHistoryService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/emploie-histories?query=:query : search for the emploieHistory corresponding
     * to the query.
     *
     * @param query the query of the emploieHistory search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/emploie-histories")
    @Timed
    public ResponseEntity<List<EmploieHistory>> searchEmploieHistories(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of EmploieHistories for query {}", query);
        Page<EmploieHistory> page = emploieHistoryService.search(query, pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/emploie-histories");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

}
