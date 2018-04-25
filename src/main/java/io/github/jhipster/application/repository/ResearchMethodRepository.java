package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.ResearchMethod;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the ResearchMethod entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ResearchMethodRepository extends JpaRepository<ResearchMethod, Long> {

}
