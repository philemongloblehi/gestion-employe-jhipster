package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.EmploieHistory;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the EmploieHistory entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EmploieHistoryRepository extends JpaRepository<EmploieHistory, Long> {

}
