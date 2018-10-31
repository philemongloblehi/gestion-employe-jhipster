package io.github.jhipster.application.repository.search;

import io.github.jhipster.application.domain.Localisation;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Localisation entity.
 */
public interface LocalisationSearchRepository extends ElasticsearchRepository<Localisation, Long> {
}
