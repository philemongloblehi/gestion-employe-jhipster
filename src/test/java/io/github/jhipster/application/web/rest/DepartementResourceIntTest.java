package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.GestionEmployeAkilApp;

import io.github.jhipster.application.domain.Departement;
import io.github.jhipster.application.repository.DepartementRepository;
import io.github.jhipster.application.repository.search.DepartementSearchRepository;
import io.github.jhipster.application.service.DepartementService;
import io.github.jhipster.application.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
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
 * Test class for the DepartementResource REST controller.
 *
 * @see DepartementResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GestionEmployeAkilApp.class)
public class DepartementResourceIntTest {

    private static final String DEFAULT_DEPARTEMENT_LIBELLE = "AAAAAAAAAA";
    private static final String UPDATED_DEPARTEMENT_LIBELLE = "BBBBBBBBBB";

    @Autowired
    private DepartementRepository departementRepository;
    
    @Autowired
    private DepartementService departementService;

    /**
     * This repository is mocked in the io.github.jhipster.application.repository.search test package.
     *
     * @see io.github.jhipster.application.repository.search.DepartementSearchRepositoryMockConfiguration
     */
    @Autowired
    private DepartementSearchRepository mockDepartementSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restDepartementMockMvc;

    private Departement departement;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final DepartementResource departementResource = new DepartementResource(departementService);
        this.restDepartementMockMvc = MockMvcBuilders.standaloneSetup(departementResource)
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
    public static Departement createEntity(EntityManager em) {
        Departement departement = new Departement()
            .departementLibelle(DEFAULT_DEPARTEMENT_LIBELLE);
        return departement;
    }

    @Before
    public void initTest() {
        departement = createEntity(em);
    }

    @Test
    @Transactional
    public void createDepartement() throws Exception {
        int databaseSizeBeforeCreate = departementRepository.findAll().size();

        // Create the Departement
        restDepartementMockMvc.perform(post("/api/departements")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(departement)))
            .andExpect(status().isCreated());

        // Validate the Departement in the database
        List<Departement> departementList = departementRepository.findAll();
        assertThat(departementList).hasSize(databaseSizeBeforeCreate + 1);
        Departement testDepartement = departementList.get(departementList.size() - 1);
        assertThat(testDepartement.getDepartementLibelle()).isEqualTo(DEFAULT_DEPARTEMENT_LIBELLE);

        // Validate the Departement in Elasticsearch
        verify(mockDepartementSearchRepository, times(1)).save(testDepartement);
    }

    @Test
    @Transactional
    public void createDepartementWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = departementRepository.findAll().size();

        // Create the Departement with an existing ID
        departement.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDepartementMockMvc.perform(post("/api/departements")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(departement)))
            .andExpect(status().isBadRequest());

        // Validate the Departement in the database
        List<Departement> departementList = departementRepository.findAll();
        assertThat(departementList).hasSize(databaseSizeBeforeCreate);

        // Validate the Departement in Elasticsearch
        verify(mockDepartementSearchRepository, times(0)).save(departement);
    }

    @Test
    @Transactional
    public void checkDepartementLibelleIsRequired() throws Exception {
        int databaseSizeBeforeTest = departementRepository.findAll().size();
        // set the field null
        departement.setDepartementLibelle(null);

        // Create the Departement, which fails.

        restDepartementMockMvc.perform(post("/api/departements")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(departement)))
            .andExpect(status().isBadRequest());

        List<Departement> departementList = departementRepository.findAll();
        assertThat(departementList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllDepartements() throws Exception {
        // Initialize the database
        departementRepository.saveAndFlush(departement);

        // Get all the departementList
        restDepartementMockMvc.perform(get("/api/departements?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(departement.getId().intValue())))
            .andExpect(jsonPath("$.[*].departementLibelle").value(hasItem(DEFAULT_DEPARTEMENT_LIBELLE.toString())));
    }
    
    @Test
    @Transactional
    public void getDepartement() throws Exception {
        // Initialize the database
        departementRepository.saveAndFlush(departement);

        // Get the departement
        restDepartementMockMvc.perform(get("/api/departements/{id}", departement.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(departement.getId().intValue()))
            .andExpect(jsonPath("$.departementLibelle").value(DEFAULT_DEPARTEMENT_LIBELLE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingDepartement() throws Exception {
        // Get the departement
        restDepartementMockMvc.perform(get("/api/departements/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDepartement() throws Exception {
        // Initialize the database
        departementService.save(departement);
        // As the test used the service layer, reset the Elasticsearch mock repository
        reset(mockDepartementSearchRepository);

        int databaseSizeBeforeUpdate = departementRepository.findAll().size();

        // Update the departement
        Departement updatedDepartement = departementRepository.findById(departement.getId()).get();
        // Disconnect from session so that the updates on updatedDepartement are not directly saved in db
        em.detach(updatedDepartement);
        updatedDepartement
            .departementLibelle(UPDATED_DEPARTEMENT_LIBELLE);

        restDepartementMockMvc.perform(put("/api/departements")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedDepartement)))
            .andExpect(status().isOk());

        // Validate the Departement in the database
        List<Departement> departementList = departementRepository.findAll();
        assertThat(departementList).hasSize(databaseSizeBeforeUpdate);
        Departement testDepartement = departementList.get(departementList.size() - 1);
        assertThat(testDepartement.getDepartementLibelle()).isEqualTo(UPDATED_DEPARTEMENT_LIBELLE);

        // Validate the Departement in Elasticsearch
        verify(mockDepartementSearchRepository, times(1)).save(testDepartement);
    }

    @Test
    @Transactional
    public void updateNonExistingDepartement() throws Exception {
        int databaseSizeBeforeUpdate = departementRepository.findAll().size();

        // Create the Departement

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDepartementMockMvc.perform(put("/api/departements")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(departement)))
            .andExpect(status().isBadRequest());

        // Validate the Departement in the database
        List<Departement> departementList = departementRepository.findAll();
        assertThat(departementList).hasSize(databaseSizeBeforeUpdate);

        // Validate the Departement in Elasticsearch
        verify(mockDepartementSearchRepository, times(0)).save(departement);
    }

    @Test
    @Transactional
    public void deleteDepartement() throws Exception {
        // Initialize the database
        departementService.save(departement);

        int databaseSizeBeforeDelete = departementRepository.findAll().size();

        // Get the departement
        restDepartementMockMvc.perform(delete("/api/departements/{id}", departement.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Departement> departementList = departementRepository.findAll();
        assertThat(departementList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the Departement in Elasticsearch
        verify(mockDepartementSearchRepository, times(1)).deleteById(departement.getId());
    }

    @Test
    @Transactional
    public void searchDepartement() throws Exception {
        // Initialize the database
        departementService.save(departement);
        when(mockDepartementSearchRepository.search(queryStringQuery("id:" + departement.getId())))
            .thenReturn(Collections.singletonList(departement));
        // Search the departement
        restDepartementMockMvc.perform(get("/api/_search/departements?query=id:" + departement.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(departement.getId().intValue())))
            .andExpect(jsonPath("$.[*].departementLibelle").value(hasItem(DEFAULT_DEPARTEMENT_LIBELLE.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Departement.class);
        Departement departement1 = new Departement();
        departement1.setId(1L);
        Departement departement2 = new Departement();
        departement2.setId(departement1.getId());
        assertThat(departement1).isEqualTo(departement2);
        departement2.setId(2L);
        assertThat(departement1).isNotEqualTo(departement2);
        departement1.setId(null);
        assertThat(departement1).isNotEqualTo(departement2);
    }
}
