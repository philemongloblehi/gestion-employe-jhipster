package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.GestionEmployeAkilApp;

import io.github.jhipster.application.domain.EmploieHistory;
import io.github.jhipster.application.repository.EmploieHistoryRepository;
import io.github.jhipster.application.repository.search.EmploieHistorySearchRepository;
import io.github.jhipster.application.service.EmploieHistoryService;
import io.github.jhipster.application.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Collections;
import java.util.List;


import static io.github.jhipster.application.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import io.github.jhipster.application.domain.enumeration.Langue;
/**
 * Test class for the EmploieHistoryResource REST controller.
 *
 * @see EmploieHistoryResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GestionEmployeAkilApp.class)
public class EmploieHistoryResourceIntTest {

    private static final Instant DEFAULT_DATE_DEBUT = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATE_DEBUT = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_DATE_FIN = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATE_FIN = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Langue DEFAULT_LANGUE = Langue.FRANCAIS;
    private static final Langue UPDATED_LANGUE = Langue.ANGLAIS;

    @Autowired
    private EmploieHistoryRepository emploieHistoryRepository;
    
    @Autowired
    private EmploieHistoryService emploieHistoryService;

    /**
     * This repository is mocked in the io.github.jhipster.application.repository.search test package.
     *
     * @see io.github.jhipster.application.repository.search.EmploieHistorySearchRepositoryMockConfiguration
     */
    @Autowired
    private EmploieHistorySearchRepository mockEmploieHistorySearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restEmploieHistoryMockMvc;

    private EmploieHistory emploieHistory;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EmploieHistoryResource emploieHistoryResource = new EmploieHistoryResource(emploieHistoryService);
        this.restEmploieHistoryMockMvc = MockMvcBuilders.standaloneSetup(emploieHistoryResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static EmploieHistory createEntity(EntityManager em) {
        EmploieHistory emploieHistory = new EmploieHistory()
            .dateDebut(DEFAULT_DATE_DEBUT)
            .dateFin(DEFAULT_DATE_FIN)
            .langue(DEFAULT_LANGUE);
        return emploieHistory;
    }

    @Before
    public void initTest() {
        emploieHistory = createEntity(em);
    }

    @Test
    @Transactional
    public void createEmploieHistory() throws Exception {
        int databaseSizeBeforeCreate = emploieHistoryRepository.findAll().size();

        // Create the EmploieHistory
        restEmploieHistoryMockMvc.perform(post("/api/emploie-histories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(emploieHistory)))
            .andExpect(status().isCreated());

        // Validate the EmploieHistory in the database
        List<EmploieHistory> emploieHistoryList = emploieHistoryRepository.findAll();
        assertThat(emploieHistoryList).hasSize(databaseSizeBeforeCreate + 1);
        EmploieHistory testEmploieHistory = emploieHistoryList.get(emploieHistoryList.size() - 1);
        assertThat(testEmploieHistory.getDateDebut()).isEqualTo(DEFAULT_DATE_DEBUT);
        assertThat(testEmploieHistory.getDateFin()).isEqualTo(DEFAULT_DATE_FIN);
        assertThat(testEmploieHistory.getLangue()).isEqualTo(DEFAULT_LANGUE);

        // Validate the EmploieHistory in Elasticsearch
        verify(mockEmploieHistorySearchRepository, times(1)).save(testEmploieHistory);
    }

    @Test
    @Transactional
    public void createEmploieHistoryWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = emploieHistoryRepository.findAll().size();

        // Create the EmploieHistory with an existing ID
        emploieHistory.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEmploieHistoryMockMvc.perform(post("/api/emploie-histories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(emploieHistory)))
            .andExpect(status().isBadRequest());

        // Validate the EmploieHistory in the database
        List<EmploieHistory> emploieHistoryList = emploieHistoryRepository.findAll();
        assertThat(emploieHistoryList).hasSize(databaseSizeBeforeCreate);

        // Validate the EmploieHistory in Elasticsearch
        verify(mockEmploieHistorySearchRepository, times(0)).save(emploieHistory);
    }

    @Test
    @Transactional
    public void getAllEmploieHistories() throws Exception {
        // Initialize the database
        emploieHistoryRepository.saveAndFlush(emploieHistory);

        // Get all the emploieHistoryList
        restEmploieHistoryMockMvc.perform(get("/api/emploie-histories?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(emploieHistory.getId().intValue())))
            .andExpect(jsonPath("$.[*].dateDebut").value(hasItem(DEFAULT_DATE_DEBUT.toString())))
            .andExpect(jsonPath("$.[*].dateFin").value(hasItem(DEFAULT_DATE_FIN.toString())))
            .andExpect(jsonPath("$.[*].langue").value(hasItem(DEFAULT_LANGUE.toString())));
    }
    
    @Test
    @Transactional
    public void getEmploieHistory() throws Exception {
        // Initialize the database
        emploieHistoryRepository.saveAndFlush(emploieHistory);

        // Get the emploieHistory
        restEmploieHistoryMockMvc.perform(get("/api/emploie-histories/{id}", emploieHistory.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(emploieHistory.getId().intValue()))
            .andExpect(jsonPath("$.dateDebut").value(DEFAULT_DATE_DEBUT.toString()))
            .andExpect(jsonPath("$.dateFin").value(DEFAULT_DATE_FIN.toString()))
            .andExpect(jsonPath("$.langue").value(DEFAULT_LANGUE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingEmploieHistory() throws Exception {
        // Get the emploieHistory
        restEmploieHistoryMockMvc.perform(get("/api/emploie-histories/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEmploieHistory() throws Exception {
        // Initialize the database
        emploieHistoryService.save(emploieHistory);
        // As the test used the service layer, reset the Elasticsearch mock repository
        reset(mockEmploieHistorySearchRepository);

        int databaseSizeBeforeUpdate = emploieHistoryRepository.findAll().size();

        // Update the emploieHistory
        EmploieHistory updatedEmploieHistory = emploieHistoryRepository.findById(emploieHistory.getId()).get();
        // Disconnect from session so that the updates on updatedEmploieHistory are not directly saved in db
        em.detach(updatedEmploieHistory);
        updatedEmploieHistory
            .dateDebut(UPDATED_DATE_DEBUT)
            .dateFin(UPDATED_DATE_FIN)
            .langue(UPDATED_LANGUE);

        restEmploieHistoryMockMvc.perform(put("/api/emploie-histories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedEmploieHistory)))
            .andExpect(status().isOk());

        // Validate the EmploieHistory in the database
        List<EmploieHistory> emploieHistoryList = emploieHistoryRepository.findAll();
        assertThat(emploieHistoryList).hasSize(databaseSizeBeforeUpdate);
        EmploieHistory testEmploieHistory = emploieHistoryList.get(emploieHistoryList.size() - 1);
        assertThat(testEmploieHistory.getDateDebut()).isEqualTo(UPDATED_DATE_DEBUT);
        assertThat(testEmploieHistory.getDateFin()).isEqualTo(UPDATED_DATE_FIN);
        assertThat(testEmploieHistory.getLangue()).isEqualTo(UPDATED_LANGUE);

        // Validate the EmploieHistory in Elasticsearch
        verify(mockEmploieHistorySearchRepository, times(1)).save(testEmploieHistory);
    }

    @Test
    @Transactional
    public void updateNonExistingEmploieHistory() throws Exception {
        int databaseSizeBeforeUpdate = emploieHistoryRepository.findAll().size();

        // Create the EmploieHistory

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEmploieHistoryMockMvc.perform(put("/api/emploie-histories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(emploieHistory)))
            .andExpect(status().isBadRequest());

        // Validate the EmploieHistory in the database
        List<EmploieHistory> emploieHistoryList = emploieHistoryRepository.findAll();
        assertThat(emploieHistoryList).hasSize(databaseSizeBeforeUpdate);

        // Validate the EmploieHistory in Elasticsearch
        verify(mockEmploieHistorySearchRepository, times(0)).save(emploieHistory);
    }

    @Test
    @Transactional
    public void deleteEmploieHistory() throws Exception {
        // Initialize the database
        emploieHistoryService.save(emploieHistory);

        int databaseSizeBeforeDelete = emploieHistoryRepository.findAll().size();

        // Get the emploieHistory
        restEmploieHistoryMockMvc.perform(delete("/api/emploie-histories/{id}", emploieHistory.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<EmploieHistory> emploieHistoryList = emploieHistoryRepository.findAll();
        assertThat(emploieHistoryList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the EmploieHistory in Elasticsearch
        verify(mockEmploieHistorySearchRepository, times(1)).deleteById(emploieHistory.getId());
    }

    @Test
    @Transactional
    public void searchEmploieHistory() throws Exception {
        // Initialize the database
        emploieHistoryService.save(emploieHistory);
        when(mockEmploieHistorySearchRepository.search(queryStringQuery("id:" + emploieHistory.getId()), PageRequest.of(0, 20)))
            .thenReturn(new PageImpl<>(Collections.singletonList(emploieHistory), PageRequest.of(0, 1), 1));
        // Search the emploieHistory
        restEmploieHistoryMockMvc.perform(get("/api/_search/emploie-histories?query=id:" + emploieHistory.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(emploieHistory.getId().intValue())))
            .andExpect(jsonPath("$.[*].dateDebut").value(hasItem(DEFAULT_DATE_DEBUT.toString())))
            .andExpect(jsonPath("$.[*].dateFin").value(hasItem(DEFAULT_DATE_FIN.toString())))
            .andExpect(jsonPath("$.[*].langue").value(hasItem(DEFAULT_LANGUE.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(EmploieHistory.class);
        EmploieHistory emploieHistory1 = new EmploieHistory();
        emploieHistory1.setId(1L);
        EmploieHistory emploieHistory2 = new EmploieHistory();
        emploieHistory2.setId(emploieHistory1.getId());
        assertThat(emploieHistory1).isEqualTo(emploieHistory2);
        emploieHistory2.setId(2L);
        assertThat(emploieHistory1).isNotEqualTo(emploieHistory2);
        emploieHistory1.setId(null);
        assertThat(emploieHistory1).isNotEqualTo(emploieHistory2);
    }
}
