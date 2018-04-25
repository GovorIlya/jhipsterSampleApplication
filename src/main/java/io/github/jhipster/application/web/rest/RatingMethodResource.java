package io.github.jhipster.application.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.application.domain.RatingMethod;

import io.github.jhipster.application.repository.RatingMethodRepository;
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
 * REST controller for managing RatingMethod.
 */
@RestController
@RequestMapping("/api")
public class RatingMethodResource {

    private final Logger log = LoggerFactory.getLogger(RatingMethodResource.class);

    private static final String ENTITY_NAME = "ratingMethod";

    private final RatingMethodRepository ratingMethodRepository;

    public RatingMethodResource(RatingMethodRepository ratingMethodRepository) {
        this.ratingMethodRepository = ratingMethodRepository;
    }

    /**
     * POST  /rating-methods : Create a new ratingMethod.
     *
     * @param ratingMethod the ratingMethod to create
     * @return the ResponseEntity with status 201 (Created) and with body the new ratingMethod, or with status 400 (Bad Request) if the ratingMethod has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/rating-methods")
    @Timed
    public ResponseEntity<RatingMethod> createRatingMethod(@RequestBody RatingMethod ratingMethod) throws URISyntaxException {
        log.debug("REST request to save RatingMethod : {}", ratingMethod);
        if (ratingMethod.getId() != null) {
            throw new BadRequestAlertException("A new ratingMethod cannot already have an ID", ENTITY_NAME, "idexists");
        }
        RatingMethod result = ratingMethodRepository.save(ratingMethod);
        return ResponseEntity.created(new URI("/api/rating-methods/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /rating-methods : Updates an existing ratingMethod.
     *
     * @param ratingMethod the ratingMethod to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated ratingMethod,
     * or with status 400 (Bad Request) if the ratingMethod is not valid,
     * or with status 500 (Internal Server Error) if the ratingMethod couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/rating-methods")
    @Timed
    public ResponseEntity<RatingMethod> updateRatingMethod(@RequestBody RatingMethod ratingMethod) throws URISyntaxException {
        log.debug("REST request to update RatingMethod : {}", ratingMethod);
        if (ratingMethod.getId() == null) {
            return createRatingMethod(ratingMethod);
        }
        RatingMethod result = ratingMethodRepository.save(ratingMethod);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, ratingMethod.getId().toString()))
            .body(result);
    }

    /**
     * GET  /rating-methods : get all the ratingMethods.
     *
     * @param filter the filter of the request
     * @return the ResponseEntity with status 200 (OK) and the list of ratingMethods in body
     */
    @GetMapping("/rating-methods")
    @Timed
    public List<RatingMethod> getAllRatingMethods(@RequestParam(required = false) String filter) {
        if ("unit-is-null".equals(filter)) {
            log.debug("REST request to get all RatingMethods where unit is null");
            return StreamSupport
                .stream(ratingMethodRepository.findAll().spliterator(), false)
                .filter(ratingMethod -> ratingMethod.getUnit() == null)
                .collect(Collectors.toList());
        }
        log.debug("REST request to get all RatingMethods");
        return ratingMethodRepository.findAll();
        }

    /**
     * GET  /rating-methods/:id : get the "id" ratingMethod.
     *
     * @param id the id of the ratingMethod to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the ratingMethod, or with status 404 (Not Found)
     */
    @GetMapping("/rating-methods/{id}")
    @Timed
    public ResponseEntity<RatingMethod> getRatingMethod(@PathVariable Long id) {
        log.debug("REST request to get RatingMethod : {}", id);
        RatingMethod ratingMethod = ratingMethodRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(ratingMethod));
    }

    /**
     * DELETE  /rating-methods/:id : delete the "id" ratingMethod.
     *
     * @param id the id of the ratingMethod to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/rating-methods/{id}")
    @Timed
    public ResponseEntity<Void> deleteRatingMethod(@PathVariable Long id) {
        log.debug("REST request to delete RatingMethod : {}", id);
        ratingMethodRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
