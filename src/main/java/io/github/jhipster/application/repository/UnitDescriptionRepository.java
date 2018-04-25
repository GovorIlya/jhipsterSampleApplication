package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.UnitDescription;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the UnitDescription entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UnitDescriptionRepository extends JpaRepository<UnitDescription, Long> {

}
