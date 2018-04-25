package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.JhipsterSampleApplicationApp;

import io.github.jhipster.application.domain.TypesProblems;
import io.github.jhipster.application.repository.TypesProblemsRepository;
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
 * Test class for the TypesProblemsResource REST controller.
 *
 * @see TypesProblemsResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipsterSampleApplicationApp.class)
public class TypesProblemsResourceIntTest {

    private static final String DEFAULT_TYPES_METHOD = "AAAAAAAAAA";
    private static final String UPDATED_TYPES_METHOD = "BBBBBBBBBB";

    @Autowired
    private TypesProblemsRepository typesProblemsRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTypesProblemsMockMvc;

    private TypesProblems typesProblems;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TypesProblemsResource typesProblemsResource = new TypesProblemsResource(typesProblemsRepository);
        this.restTypesProblemsMockMvc = MockMvcBuilders.standaloneSetup(typesProblemsResource)
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
    public static TypesProblems createEntity(EntityManager em) {
        TypesProblems typesProblems = new TypesProblems()
            .typesMethod(DEFAULT_TYPES_METHOD);
        return typesProblems;
    }

    @Before
    public void initTest() {
        typesProblems = createEntity(em);
    }

    @Test
    @Transactional
    public void createTypesProblems() throws Exception {
        int databaseSizeBeforeCreate = typesProblemsRepository.findAll().size();

        // Create the TypesProblems
        restTypesProblemsMockMvc.perform(post("/api/types-problems")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(typesProblems)))
            .andExpect(status().isCreated());

        // Validate the TypesProblems in the database
        List<TypesProblems> typesProblemsList = typesProblemsRepository.findAll();
        assertThat(typesProblemsList).hasSize(databaseSizeBeforeCreate + 1);
        TypesProblems testTypesProblems = typesProblemsList.get(typesProblemsList.size() - 1);
        assertThat(testTypesProblems.getTypesMethod()).isEqualTo(DEFAULT_TYPES_METHOD);
    }

    @Test
    @Transactional
    public void createTypesProblemsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = typesProblemsRepository.findAll().size();

        // Create the TypesProblems with an existing ID
        typesProblems.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTypesProblemsMockMvc.perform(post("/api/types-problems")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(typesProblems)))
            .andExpect(status().isBadRequest());

        // Validate the TypesProblems in the database
        List<TypesProblems> typesProblemsList = typesProblemsRepository.findAll();
        assertThat(typesProblemsList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllTypesProblems() throws Exception {
        // Initialize the database
        typesProblemsRepository.saveAndFlush(typesProblems);

        // Get all the typesProblemsList
        restTypesProblemsMockMvc.perform(get("/api/types-problems?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(typesProblems.getId().intValue())))
            .andExpect(jsonPath("$.[*].typesMethod").value(hasItem(DEFAULT_TYPES_METHOD.toString())));
    }

    @Test
    @Transactional
    public void getTypesProblems() throws Exception {
        // Initialize the database
        typesProblemsRepository.saveAndFlush(typesProblems);

        // Get the typesProblems
        restTypesProblemsMockMvc.perform(get("/api/types-problems/{id}", typesProblems.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(typesProblems.getId().intValue()))
            .andExpect(jsonPath("$.typesMethod").value(DEFAULT_TYPES_METHOD.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingTypesProblems() throws Exception {
        // Get the typesProblems
        restTypesProblemsMockMvc.perform(get("/api/types-problems/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTypesProblems() throws Exception {
        // Initialize the database
        typesProblemsRepository.saveAndFlush(typesProblems);
        int databaseSizeBeforeUpdate = typesProblemsRepository.findAll().size();

        // Update the typesProblems
        TypesProblems updatedTypesProblems = typesProblemsRepository.findOne(typesProblems.getId());
        // Disconnect from session so that the updates on updatedTypesProblems are not directly saved in db
        em.detach(updatedTypesProblems);
        updatedTypesProblems
            .typesMethod(UPDATED_TYPES_METHOD);

        restTypesProblemsMockMvc.perform(put("/api/types-problems")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTypesProblems)))
            .andExpect(status().isOk());

        // Validate the TypesProblems in the database
        List<TypesProblems> typesProblemsList = typesProblemsRepository.findAll();
        assertThat(typesProblemsList).hasSize(databaseSizeBeforeUpdate);
        TypesProblems testTypesProblems = typesProblemsList.get(typesProblemsList.size() - 1);
        assertThat(testTypesProblems.getTypesMethod()).isEqualTo(UPDATED_TYPES_METHOD);
    }

    @Test
    @Transactional
    public void updateNonExistingTypesProblems() throws Exception {
        int databaseSizeBeforeUpdate = typesProblemsRepository.findAll().size();

        // Create the TypesProblems

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restTypesProblemsMockMvc.perform(put("/api/types-problems")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(typesProblems)))
            .andExpect(status().isCreated());

        // Validate the TypesProblems in the database
        List<TypesProblems> typesProblemsList = typesProblemsRepository.findAll();
        assertThat(typesProblemsList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteTypesProblems() throws Exception {
        // Initialize the database
        typesProblemsRepository.saveAndFlush(typesProblems);
        int databaseSizeBeforeDelete = typesProblemsRepository.findAll().size();

        // Get the typesProblems
        restTypesProblemsMockMvc.perform(delete("/api/types-problems/{id}", typesProblems.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<TypesProblems> typesProblemsList = typesProblemsRepository.findAll();
        assertThat(typesProblemsList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TypesProblems.class);
        TypesProblems typesProblems1 = new TypesProblems();
        typesProblems1.setId(1L);
        TypesProblems typesProblems2 = new TypesProblems();
        typesProblems2.setId(typesProblems1.getId());
        assertThat(typesProblems1).isEqualTo(typesProblems2);
        typesProblems2.setId(2L);
        assertThat(typesProblems1).isNotEqualTo(typesProblems2);
        typesProblems1.setId(null);
        assertThat(typesProblems1).isNotEqualTo(typesProblems2);
    }
}
