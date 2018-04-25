package io.github.jhipster.application.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.application.domain.ResearchMethod;

import io.github.jhipster.application.repository.ResearchMethodRepository;
import io.github.jhipster.application.web.rest.errors.BadRequestAlertException;
import io.github.jhipster.application.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * REST controller for managing ResearchMethod.
 */
@RestController
@RequestMapping("/api")
public class ResearchMethodResource {

    private final Logger log = LoggerFactory.getLogger(ResearchMethodResource.class);

    private static final String ENTITY_NAME = "researchMethod";

    private final ResearchMethodRepository researchMethodRepository;

    public ResearchMethodResource(ResearchMethodRepository researchMethodRepository) {
        this.researchMethodRepository = researchMethodRepository;
    }

    /**
     * POST  /research-methods : Create a new researchMethod.
     *
     * @param researchMethod the researchMethod to create
     * @return the ResponseEntity with status 201 (Created) and with body the new researchMethod, or with status 400 (Bad Request) if the researchMethod has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/research-methods")
    @Timed
    public ResponseEntity<ResearchMethod> createResearchMethod(@RequestBody ResearchMethod researchMethod) throws URISyntaxException {
        log.debug("REST request to save ResearchMethod : {}", researchMethod);
        if (researchMethod.getId() != null) {
            throw new BadRequestAlertException("A new researchMethod cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ResearchMethod result = researchMethodRepository.save(researchMethod);
        return ResponseEntity.created(new URI("/api/research-methods/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /research-methods : Updates an existing researchMethod.
     *
     * @param researchMethod the researchMethod to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated researchMethod,
     * or with status 400 (Bad Request) if the researchMethod is not valid,
     * or with status 500 (Internal Server Error) if the researchMethod couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/research-methods")
    @Timed
    public ResponseEntity<ResearchMethod> updateResearchMethod(@RequestBody ResearchMethod researchMethod) throws URISyntaxException {
        log.debug("REST request to update ResearchMethod : {}", researchMethod);
        if (researchMethod.getId() == null) {
            return createResearchMethod(researchMethod);
        }
        ResearchMethod result = researchMethodRepository.save(researchMethod);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, researchMethod.getId().toString()))
            .body(result);
    }

    /**
     * GET  /research-methods : get all the researchMethods.
     *
     * @param filter the filter of the request
     * @return the ResponseEntity with status 200 (OK) and the list of researchMethods in body
     */
    @GetMapping("/research-methods")
    @Timed
    public List<ResearchMethod> getAllResearchMethods(@RequestParam(required = false) String filter) {
        if ("unit-is-null".equals(filter)) {
            log.debug("REST request to get all ResearchMethods where unit is null");
            return StreamSupport
                .stream(researchMethodRepository.findAll().spliterator(), false)
                .filter(researchMethod -> researchMethod.getUnit() == null)
                .collect(Collectors.toList());
        }
        log.debug("REST request to get all ResearchMethods");
        return researchMethodRepository.findAll();
        }

    /**
     * GET  /research-methods/:id : get the "id" researchMethod.
     *
     * @param id the id of the researchMethod to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the researchMethod, or with status 404 (Not Found)
     */
    @GetMapping("/research-methods/{id}")
    @Timed
    public ResponseEntity<ResearchMethod> getResearchMethod(@PathVariable Long id) {
        log.debug("REST request to get ResearchMethod : {}", id);
        ResearchMethod researchMethod = researchMethodRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(researchMethod));
    }

    /**
     * DELETE  /research-methods/:id : delete the "id" researchMethod.
     *
     * @param id the id of the researchMethod to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/research-methods/{id}")
    @Timed
    public ResponseEntity<Void> deleteResearchMethod(@PathVariable Long id) {
        log.debug("REST request to delete ResearchMethod : {}", id);
        researchMethodRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
