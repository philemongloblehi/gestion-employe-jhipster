package io.github.jhipster.application.repository.search;

import io.github.jhipster.application.domain.EmploieHistory;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the EmploieHistory entity.
 */
public interface EmploieHistorySearchRepository extends ElasticsearchRepository<EmploieHistory, Long> {
}
