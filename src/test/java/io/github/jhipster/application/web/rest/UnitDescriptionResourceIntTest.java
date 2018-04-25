package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.JhipsterSampleApplicationApp;

import io.github.jhipster.application.domain.UnitDescription;
import io.github.jhipster.application.repository.UnitDescriptionRepository;
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
import org.springframework.util.Base64Utils;

import javax.persistence.EntityManager;
import java.util.List;

import static io.github.jhipster.application.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the UnitDescriptionResource REST controller.
 *
 * @see UnitDescriptionResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipsterSampleApplicationApp.class)
public class UnitDescriptionResourceIntTest {

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    @Autowired
    private UnitDescriptionRepository unitDescriptionRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restUnitDescriptionMockMvc;

    private UnitDescription unitDescription;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final UnitDescriptionResource unitDescriptionResource = new UnitDescriptionResource(unitDescriptionRepository);
        this.restUnitDescriptionMockMvc = MockMvcBuilders.standaloneSetup(unitDescriptionResource)
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
    public static UnitDescription createEntity(EntityManager em) {
        UnitDescription unitDescription = new UnitDescription()
            .description(DEFAULT_DESCRIPTION);
        return unitDescription;
    }

    @Before
    public void initTest() {
        unitDescription = createEntity(em);
    }

    @Test
    @Transactional
    public void createUnitDescription() throws Exception {
        int databaseSizeBeforeCreate = unitDescriptionRepository.findAll().size();

        // Create the UnitDescription
        restUnitDescriptionMockMvc.perform(post("/api/unit-descriptions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(unitDescription)))
            .andExpect(status().isCreated());

        // Validate the UnitDescription in the database
        List<UnitDescription> unitDescriptionList = unitDescriptionRepository.findAll();
        assertThat(unitDescriptionList).hasSize(databaseSizeBeforeCreate + 1);
        UnitDescription testUnitDescription = unitDescriptionList.get(unitDescriptionList.size() - 1);
        assertThat(testUnitDescription.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
    }

    @Test
    @Transactional
    public void createUnitDescriptionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = unitDescriptionRepository.findAll().size();

        // Create the UnitDescription with an existing ID
        unitDescription.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restUnitDescriptionMockMvc.perform(post("/api/unit-descriptions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(unitDescription)))
            .andExpect(status().isBadRequest());

        // Validate the UnitDescription in the database
        List<UnitDescription> unitDescriptionList = unitDescriptionRepository.findAll();
        assertThat(unitDescriptionList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllUnitDescriptions() throws Exception {
        // Initialize the database
        unitDescriptionRepository.saveAndFlush(unitDescription);

        // Get all the unitDescriptionList
        restUnitDescriptionMockMvc.perform(get("/api/unit-descriptions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(unitDescription.getId().intValue())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())));
    }

    @Test
    @Transactional
    public void getUnitDescription() throws Exception {
        // Initialize the database
        unitDescriptionRepository.saveAndFlush(unitDescription);

        // Get the unitDescription
        restUnitDescriptionMockMvc.perform(get("/api/unit-descriptions/{id}", unitDescription.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(unitDescription.getId().intValue()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingUnitDescription() throws Exception {
        // Get the unitDescription
        restUnitDescriptionMockMvc.perform(get("/api/unit-descriptions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateUnitDescription() throws Exception {
        // Initialize the database
        unitDescriptionRepository.saveAndFlush(unitDescription);
        int databaseSizeBeforeUpdate = unitDescriptionRepository.findAll().size();

        // Update the unitDescription
        UnitDescription updatedUnitDescription = unitDescriptionRepository.findOne(unitDescription.getId());
        // Disconnect from session so that the updates on updatedUnitDescription are not directly saved in db
        em.detach(updatedUnitDescription);
        updatedUnitDescription
            .description(UPDATED_DESCRIPTION);

        restUnitDescriptionMockMvc.perform(put("/api/unit-descriptions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedUnitDescription)))
            .andExpect(status().isOk());

        // Validate the UnitDescription in the database
        List<UnitDescription> unitDescriptionList = unitDescriptionRepository.findAll();
        assertThat(unitDescriptionList).hasSize(databaseSizeBeforeUpdate);
        UnitDescription testUnitDescription = unitDescriptionList.get(unitDescriptionList.size() - 1);
        assertThat(testUnitDescription.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    public void updateNonExistingUnitDescription() throws Exception {
        int databaseSizeBeforeUpdate = unitDescriptionRepository.findAll().size();

        // Create the UnitDescription

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restUnitDescriptionMockMvc.perform(put("/api/unit-descriptions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(unitDescription)))
            .andExpect(status().isCreated());

        // Validate the UnitDescription in the database
        List<UnitDescription> unitDescriptionList = unitDescriptionRepository.findAll();
        assertThat(unitDescriptionList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteUnitDescription() throws Exception {
        // Initialize the database
        unitDescriptionRepository.saveAndFlush(unitDescription);
        int databaseSizeBeforeDelete = unitDescriptionRepository.findAll().size();

        // Get the unitDescription
        restUnitDescriptionMockMvc.perform(delete("/api/unit-descriptions/{id}", unitDescription.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<UnitDescription> unitDescriptionList = unitDescriptionRepository.findAll();
        assertThat(unitDescriptionList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(UnitDescription.class);
        UnitDescription unitDescription1 = new UnitDescription();
        unitDescription1.setId(1L);
        UnitDescription unitDescription2 = new UnitDescription();
        unitDescription2.setId(unitDescription1.getId());
        assertThat(unitDescription1).isEqualTo(unitDescription2);
        unitDescription2.setId(2L);
        assertThat(unitDescription1).isNotEqualTo(unitDescription2);
        unitDescription1.setId(null);
        assertThat(unitDescription1).isNotEqualTo(unitDescription2);
    }
}
