package io.github.jhipster.application.repository.search;

import io.github.jhipster.application.domain.Departement;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Departement entity.
 */
public interface DepartementSearchRepository extends ElasticsearchRepository<Departement, Long> {
}
