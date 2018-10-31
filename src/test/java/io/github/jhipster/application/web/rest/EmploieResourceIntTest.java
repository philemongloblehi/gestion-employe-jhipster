package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.GestionEmployeAkilApp;

import io.github.jhipster.application.domain.Emploie;
import io.github.jhipster.application.repository.EmploieRepository;
import io.github.jhipster.application.repository.search.EmploieSearchRepository;
import io.github.jhipster.application.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
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
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;


import static io.github.jhipster.application.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the EmploieResource REST controller.
 *
 * @see EmploieResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GestionEmployeAkilApp.class)
public class EmploieResourceIntTest {

    private static final String DEFAULT_LIBELLE = "AAAAAAAAAA";
    private static final String UPDATED_LIBELLE = "BBBBBBBBBB";

    private static final Long DEFAULT_MIN_SALAIRE = 1L;
    private static final Long UPDATED_MIN_SALAIRE = 2L;

    private static final Long DEFAULT_MAX_SALAIRE = 1L;
    private static final Long UPDATED_MAX_SALAIRE = 2L;

    @Autowired
    private EmploieRepository emploieRepository;

    @Mock
    private EmploieRepository emploieRepositoryMock;

    /**
     * This repository is mocked in the io.github.jhipster.application.repository.search test package.
     *
     * @see io.github.jhipster.application.repository.search.EmploieSearchRepositoryMockConfiguration
     */
    @Autowired
    private EmploieSearchRepository mockEmploieSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restEmploieMockMvc;

    private Emploie emploie;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EmploieResource emploieResource = new EmploieResource(emploieRepository, mockEmploieSearchRepository);
        this.restEmploieMockMvc = MockMvcBuilders.standaloneSetup(emploieResource)
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
    public static Emploie createEntity(EntityManager em) {
        Emploie emploie = new Emploie()
            .libelle(DEFAULT_LIBELLE)
            .minSalaire(DEFAULT_MIN_SALAIRE)
            .maxSalaire(DEFAULT_MAX_SALAIRE);
        return emploie;
    }

    @Before
    public void initTest() {
        emploie = createEntity(em);
    }

    @Test
    @Transactional
    public void createEmploie() throws Exception {
        int databaseSizeBeforeCreate = emploieRepository.findAll().size();

        // Create the Emploie
        restEmploieMockMvc.perform(post("/api/emploies")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(emploie)))
            .andExpect(status().isCreated());

        // Validate the Emploie in the database
        List<Emploie> emploieList = emploieRepository.findAll();
        assertThat(emploieList).hasSize(databaseSizeBeforeCreate + 1);
        Emploie testEmploie = emploieList.get(emploieList.size() - 1);
        assertThat(testEmploie.getLibelle()).isEqualTo(DEFAULT_LIBELLE);
        assertThat(testEmploie.getMinSalaire()).isEqualTo(DEFAULT_MIN_SALAIRE);
        assertThat(testEmploie.getMaxSalaire()).isEqualTo(DEFAULT_MAX_SALAIRE);

        // Validate the Emploie in Elasticsearch
        verify(mockEmploieSearchRepository, times(1)).save(testEmploie);
    }

    @Test
    @Transactional
    public void createEmploieWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = emploieRepository.findAll().size();

        // Create the Emploie with an existing ID
        emploie.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEmploieMockMvc.perform(post("/api/emploies")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(emploie)))
            .andExpect(status().isBadRequest());

        // Validate the Emploie in the database
        List<Emploie> emploieList = emploieRepository.findAll();
        assertThat(emploieList).hasSize(databaseSizeBeforeCreate);

        // Validate the Emploie in Elasticsearch
        verify(mockEmploieSearchRepository, times(0)).save(emploie);
    }

    @Test
    @Transactional
    public void getAllEmploies() throws Exception {
        // Initialize the database
        emploieRepository.saveAndFlush(emploie);

        // Get all the emploieList
        restEmploieMockMvc.perform(get("/api/emploies?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(emploie.getId().intValue())))
            .andExpect(jsonPath("$.[*].libelle").value(hasItem(DEFAULT_LIBELLE.toString())))
            .andExpect(jsonPath("$.[*].minSalaire").value(hasItem(DEFAULT_MIN_SALAIRE.intValue())))
            .andExpect(jsonPath("$.[*].maxSalaire").value(hasItem(DEFAULT_MAX_SALAIRE.intValue())));
    }
    
    public void getAllEmploiesWithEagerRelationshipsIsEnabled() throws Exception {
        EmploieResource emploieResource = new EmploieResource(emploieRepositoryMock, mockEmploieSearchRepository);
        when(emploieRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        MockMvc restEmploieMockMvc = MockMvcBuilders.standaloneSetup(emploieResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restEmploieMockMvc.perform(get("/api/emploies?eagerload=true"))
        .andExpect(status().isOk());

        verify(emploieRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    public void getAllEmploiesWithEagerRelationshipsIsNotEnabled() throws Exception {
        EmploieResource emploieResource = new EmploieResource(emploieRepositoryMock, mockEmploieSearchRepository);
            when(emploieRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));
            MockMvc restEmploieMockMvc = MockMvcBuilders.standaloneSetup(emploieResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restEmploieMockMvc.perform(get("/api/emploies?eagerload=true"))
        .andExpect(status().isOk());

            verify(emploieRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getEmploie() throws Exception {
        // Initialize the database
        emploieRepository.saveAndFlush(emploie);

        // Get the emploie
        restEmploieMockMvc.perform(get("/api/emploies/{id}", emploie.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(emploie.getId().intValue()))
            .andExpect(jsonPath("$.libelle").value(DEFAULT_LIBELLE.toString()))
            .andExpect(jsonPath("$.minSalaire").value(DEFAULT_MIN_SALAIRE.intValue()))
            .andExpect(jsonPath("$.maxSalaire").value(DEFAULT_MAX_SALAIRE.intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingEmploie() throws Exception {
        // Get the emploie
        restEmploieMockMvc.perform(get("/api/emploies/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEmploie() throws Exception {
        // Initialize the database
        emploieRepository.saveAndFlush(emploie);

        int databaseSizeBeforeUpdate = emploieRepository.findAll().size();

        // Update the emploie
        Emploie updatedEmploie = emploieRepository.findById(emploie.getId()).get();
        // Disconnect from session so that the updates on updatedEmploie are not directly saved in db
        em.detach(updatedEmploie);
        updatedEmploie
            .libelle(UPDATED_LIBELLE)
            .minSalaire(UPDATED_MIN_SALAIRE)
            .maxSalaire(UPDATED_MAX_SALAIRE);

        restEmploieMockMvc.perform(put("/api/emploies")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedEmploie)))
            .andExpect(status().isOk());

        // Validate the Emploie in the database
        List<Emploie> emploieList = emploieRepository.findAll();
        assertThat(emploieList).hasSize(databaseSizeBeforeUpdate);
        Emploie testEmploie = emploieList.get(emploieList.size() - 1);
        assertThat(testEmploie.getLibelle()).isEqualTo(UPDATED_LIBELLE);
        assertThat(testEmploie.getMinSalaire()).isEqualTo(UPDATED_MIN_SALAIRE);
        assertThat(testEmploie.getMaxSalaire()).isEqualTo(UPDATED_MAX_SALAIRE);

        // Validate the Emploie in Elasticsearch
        verify(mockEmploieSearchRepository, times(1)).save(testEmploie);
    }

    @Test
    @Transactional
    public void updateNonExistingEmploie() throws Exception {
        int databaseSizeBeforeUpdate = emploieRepository.findAll().size();

        // Create the Emploie

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEmploieMockMvc.perform(put("/api/emploies")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(emploie)))
            .andExpect(status().isBadRequest());

        // Validate the Emploie in the database
        List<Emploie> emploieList = emploieRepository.findAll();
        assertThat(emploieList).hasSize(databaseSizeBeforeUpdate);

        // Validate the Emploie in Elasticsearch
        verify(mockEmploieSearchRepository, times(0)).save(emploie);
    }

    @Test
    @Transactional
    public void deleteEmploie() throws Exception {
        // Initialize the database
        emploieRepository.saveAndFlush(emploie);

        int databaseSizeBeforeDelete = emploieRepository.findAll().size();

        // Get the emploie
        restEmploieMockMvc.perform(delete("/api/emploies/{id}", emploie.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Emploie> emploieList = emploieRepository.findAll();
        assertThat(emploieList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the Emploie in Elasticsearch
        verify(mockEmploieSearchRepository, times(1)).deleteById(emploie.getId());
    }

    @Test
    @Transactional
    public void searchEmploie() throws Exception {
        // Initialize the database
        emploieRepository.saveAndFlush(emploie);
        when(mockEmploieSearchRepository.search(queryStringQuery("id:" + emploie.getId()), PageRequest.of(0, 20)))
            .thenReturn(new PageImpl<>(Collections.singletonList(emploie), PageRequest.of(0, 1), 1));
        // Search the emploie
        restEmploieMockMvc.perform(get("/api/_search/emploies?query=id:" + emploie.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(emploie.getId().intValue())))
            .andExpect(jsonPath("$.[*].libelle").value(hasItem(DEFAULT_LIBELLE.toString())))
            .andExpect(jsonPath("$.[*].minSalaire").value(hasItem(DEFAULT_MIN_SALAIRE.intValue())))
            .andExpect(jsonPath("$.[*].maxSalaire").value(hasItem(DEFAULT_MAX_SALAIRE.intValue())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Emploie.class);
        Emploie emploie1 = new Emploie();
        emploie1.setId(1L);
        Emploie emploie2 = new Emploie();
        emploie2.setId(emploie1.getId());
        assertThat(emploie1).isEqualTo(emploie2);
        emploie2.setId(2L);
        assertThat(emploie1).isNotEqualTo(emploie2);
        emploie1.setId(null);
        assertThat(emploie1).isNotEqualTo(emploie2);
    }
}
