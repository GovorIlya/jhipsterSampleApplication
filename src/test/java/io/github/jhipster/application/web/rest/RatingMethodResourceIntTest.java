package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.JhipsterSampleApplicationApp;

import io.github.jhipster.application.domain.RatingMethod;
import io.github.jhipster.application.repository.RatingMethodRepository;
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
 * Test class for the RatingMethodResource REST controller.
 *
 * @see RatingMethodResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipsterSampleApplicationApp.class)
public class RatingMethodResourceIntTest {

    private static final String DEFAULT_RATING_METHOD = "AAAAAAAAAA";
    private static final String UPDATED_RATING_METHOD = "BBBBBBBBBB";

    @Autowired
    private RatingMethodRepository ratingMethodRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restRatingMethodMockMvc;

    private RatingMethod ratingMethod;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final RatingMethodResource ratingMethodResource = new RatingMethodResource(ratingMethodRepository);
        this.restRatingMethodMockMvc = MockMvcBuilders.standaloneSetup(ratingMethodResource)
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
    public static RatingMethod createEntity(EntityManager em) {
        RatingMethod ratingMethod = new RatingMethod()
            .ratingMethod(DEFAULT_RATING_METHOD);
        return ratingMethod;
    }

    @Before
    public void initTest() {
        ratingMethod = createEntity(em);
    }

    @Test
    @Transactional
    public void createRatingMethod() throws Exception {
        int databaseSizeBeforeCreate = ratingMethodRepository.findAll().size();

        // Create the RatingMethod
        restRatingMethodMockMvc.perform(post("/api/rating-methods")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ratingMethod)))
            .andExpect(status().isCreated());

        // Validate the RatingMethod in the database
        List<RatingMethod> ratingMethodList = ratingMethodRepository.findAll();
        assertThat(ratingMethodList).hasSize(databaseSizeBeforeCreate + 1);
        RatingMethod testRatingMethod = ratingMethodList.get(ratingMethodList.size() - 1);
        assertThat(testRatingMethod.getRatingMethod()).isEqualTo(DEFAULT_RATING_METHOD);
    }

    @Test
    @Transactional
    public void createRatingMethodWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = ratingMethodRepository.findAll().size();

        // Create the RatingMethod with an existing ID
        ratingMethod.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRatingMethodMockMvc.perform(post("/api/rating-methods")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ratingMethod)))
            .andExpect(status().isBadRequest());

        // Validate the RatingMethod in the database
        List<RatingMethod> ratingMethodList = ratingMethodRepository.findAll();
        assertThat(ratingMethodList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllRatingMethods() throws Exception {
        // Initialize the database
        ratingMethodRepository.saveAndFlush(ratingMethod);

        // Get all the ratingMethodList
        restRatingMethodMockMvc.perform(get("/api/rating-methods?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(ratingMethod.getId().intValue())))
            .andExpect(jsonPath("$.[*].ratingMethod").value(hasItem(DEFAULT_RATING_METHOD.toString())));
    }

    @Test
    @Transactional
    public void getRatingMethod() throws Exception {
        // Initialize the database
        ratingMethodRepository.saveAndFlush(ratingMethod);

        // Get the ratingMethod
        restRatingMethodMockMvc.perform(get("/api/rating-methods/{id}", ratingMethod.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(ratingMethod.getId().intValue()))
            .andExpect(jsonPath("$.ratingMethod").value(DEFAULT_RATING_METHOD.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingRatingMethod() throws Exception {
        // Get the ratingMethod
        restRatingMethodMockMvc.perform(get("/api/rating-methods/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRatingMethod() throws Exception {
        // Initialize the database
        ratingMethodRepository.saveAndFlush(ratingMethod);
        int databaseSizeBeforeUpdate = ratingMethodRepository.findAll().size();

        // Update the ratingMethod
        RatingMethod updatedRatingMethod = ratingMethodRepository.findOne(ratingMethod.getId());
        // Disconnect from session so that the updates on updatedRatingMethod are not directly saved in db
        em.detach(updatedRatingMethod);
        updatedRatingMethod
            .ratingMethod(UPDATED_RATING_METHOD);

        restRatingMethodMockMvc.perform(put("/api/rating-methods")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedRatingMethod)))
            .andExpect(status().isOk());

        // Validate the RatingMethod in the database
        List<RatingMethod> ratingMethodList = ratingMethodRepository.findAll();
        assertThat(ratingMethodList).hasSize(databaseSizeBeforeUpdate);
        RatingMethod testRatingMethod = ratingMethodList.get(ratingMethodList.size() - 1);
        assertThat(testRatingMethod.getRatingMethod()).isEqualTo(UPDATED_RATING_METHOD);
    }

    @Test
    @Transactional
    public void updateNonExistingRatingMethod() throws Exception {
        int databaseSizeBeforeUpdate = ratingMethodRepository.findAll().size();

        // Create the RatingMethod

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restRatingMethodMockMvc.perform(put("/api/rating-methods")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ratingMethod)))
            .andExpect(status().isCreated());

        // Validate the RatingMethod in the database
        List<RatingMethod> ratingMethodList = ratingMethodRepository.findAll();
        assertThat(ratingMethodList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteRatingMethod() throws Exception {
        // Initialize the database
        ratingMethodRepository.saveAndFlush(ratingMethod);
        int databaseSizeBeforeDelete = ratingMethodRepository.findAll().size();

        // Get the ratingMethod
        restRatingMethodMockMvc.perform(delete("/api/rating-methods/{id}", ratingMethod.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<RatingMethod> ratingMethodList = ratingMethodRepository.findAll();
        assertThat(ratingMethodList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(RatingMethod.class);
        RatingMethod ratingMethod1 = new RatingMethod();
        ratingMethod1.setId(1L);
        RatingMethod ratingMethod2 = new RatingMethod();
        ratingMethod2.setId(ratingMethod1.getId());
        assertThat(ratingMethod1).isEqualTo(ratingMethod2);
        ratingMethod2.setId(2L);
        assertThat(ratingMethod1).isNotEqualTo(ratingMethod2);
        ratingMethod1.setId(null);
        assertThat(ratingMethod1).isNotEqualTo(ratingMethod2);
    }
}
