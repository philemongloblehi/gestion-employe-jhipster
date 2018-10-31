package io.github.jhipster.application.repository.search;

import io.github.jhipster.application.domain.Emploie;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Emploie entity.
 */
public interface EmploieSearchRepository extends ElasticsearchRepository<Emploie, Long> {
}
