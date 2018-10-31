package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.Emploie;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Emploie entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EmploieRepository extends JpaRepository<Emploie, Long> {

    @Query(value = "select distinct emploie from Emploie emploie left join fetch emploie.taches",
        countQuery = "select count(distinct emploie) from Emploie emploie")
    Page<Emploie> findAllWithEagerRelationships(Pageable pageable);

    @Query(value = "select distinct emploie from Emploie emploie left join fetch emploie.taches")
    List<Emploie> findAllWithEagerRelationships();

    @Query("select emploie from Emploie emploie left join fetch emploie.taches where emploie.id =:id")
    Optional<Emploie> findOneWithEagerRelationships(@Param("id") Long id);

}
