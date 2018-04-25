package io.github.jhipster.application.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.application.domain.UnitDescription;

import io.github.jhipster.application.repository.UnitDescriptionRepository;
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
 * REST controller for managing UnitDescription.
 */
@RestController
@RequestMapping("/api")
public class UnitDescriptionResource {

    private final Logger log = LoggerFactory.getLogger(UnitDescriptionResource.class);

    private static final String ENTITY_NAME = "unitDescription";

    private final UnitDescriptionRepository unitDescriptionRepository;

    public UnitDescriptionResource(UnitDescriptionRepository unitDescriptionRepository) {
        this.unitDescriptionRepository = unitDescriptionRepository;
    }

    /**
     * POST  /unit-descriptions : Create a new unitDescription.
     *
     * @param unitDescription the unitDescription to create
     * @return the ResponseEntity with status 201 (Created) and with body the new unitDescription, or with status 400 (Bad Request) if the unitDescription has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/unit-descriptions")
    @Timed
    public ResponseEntity<UnitDescription> createUnitDescription(@RequestBody UnitDescription unitDescription) throws URISyntaxException {
        log.debug("REST request to save UnitDescription : {}", unitDescription);
        if (unitDescription.getId() != null) {
            throw new BadRequestAlertException("A new unitDescription cannot already have an ID", ENTITY_NAME, "idexists");
        }
        UnitDescription result = unitDescriptionRepository.save(unitDescription);
        return ResponseEntity.created(new URI("/api/unit-descriptions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /unit-descriptions : Updates an existing unitDescription.
     *
     * @param unitDescription the unitDescription to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated unitDescription,
     * or with status 400 (Bad Request) if the unitDescription is not valid,
     * or with status 500 (Internal Server Error) if the unitDescription couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/unit-descriptions")
    @Timed
    public ResponseEntity<UnitDescription> updateUnitDescription(@RequestBody UnitDescription unitDescription) throws URISyntaxException {
        log.debug("REST request to update UnitDescription : {}", unitDescription);
        if (unitDescription.getId() == null) {
            return createUnitDescription(unitDescription);
        }
        UnitDescription result = unitDescriptionRepository.save(unitDescription);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, unitDescription.getId().toString()))
            .body(result);
    }

    /**
     * GET  /unit-descriptions : get all the unitDescriptions.
     *
     * @param filter the filter of the request
     * @return the ResponseEntity with status 200 (OK) and the list of unitDescriptions in body
     */
    @GetMapping("/unit-descriptions")
    @Timed
    public List<UnitDescription> getAllUnitDescriptions(@RequestParam(required = false) String filter) {
        if ("unit-is-null".equals(filter)) {
            log.debug("REST request to get all UnitDescriptions where unit is null");
            return StreamSupport
                .stream(unitDescriptionRepository.findAll().spliterator(), false)
                .filter(unitDescription -> unitDescription.getUnit() == null)
                .collect(Collectors.toList());
        }
        log.debug("REST request to get all UnitDescriptions");
        return unitDescriptionRepository.findAll();
        }

    /**
     * GET  /unit-descriptions/:id : get the "id" unitDescription.
     *
     * @param id the id of the unitDescription to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the unitDescription, or with status 404 (Not Found)
     */
    @GetMapping("/unit-descriptions/{id}")
    @Timed
    public ResponseEntity<UnitDescription> getUnitDescription(@PathVariable Long id) {
        log.debug("REST request to get UnitDescription : {}", id);
        UnitDescription unitDescription = unitDescriptionRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(unitDescription));
    }

    /**
     * DELETE  /unit-descriptions/:id : delete the "id" unitDescription.
     *
     * @param id the id of the unitDescription to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/unit-descriptions/{id}")
    @Timed
    public ResponseEntity<Void> deleteUnitDescription(@PathVariable Long id) {
        log.debug("REST request to delete UnitDescription : {}", id);
        unitDescriptionRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
