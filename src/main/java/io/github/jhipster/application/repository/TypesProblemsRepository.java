package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.TypesProblems;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the TypesProblems entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TypesProblemsRepository extends JpaRepository<TypesProblems, Long> {

}
