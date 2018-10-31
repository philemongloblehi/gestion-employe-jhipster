package io.github.jhipster.application.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Emploie.
 */
@Entity
@Table(name = "emploie")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "emploie")
public class Emploie implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "libelle")
    private String libelle;

    @Column(name = "min_salaire")
    private Long minSalaire;

    @Column(name = "max_salaire")
    private Long maxSalaire;

    @ManyToOne
    @JsonIgnoreProperties("emploies")
    private Employe employe;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "emploie_tache",
               joinColumns = @JoinColumn(name = "emploies_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "taches_id", referencedColumnName = "id"))
    private Set<Tache> taches = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLibelle() {
        return libelle;
    }

    public Emploie libelle(String libelle) {
        this.libelle = libelle;
        return this;
    }

    public void setLibelle(String libelle) {
        this.libelle = libelle;
    }

    public Long getMinSalaire() {
        return minSalaire;
    }

    public Emploie minSalaire(Long minSalaire) {
        this.minSalaire = minSalaire;
        return this;
    }

    public void setMinSalaire(Long minSalaire) {
        this.minSalaire = minSalaire;
    }

    public Long getMaxSalaire() {
        return maxSalaire;
    }

    public Emploie maxSalaire(Long maxSalaire) {
        this.maxSalaire = maxSalaire;
        return this;
    }

    public void setMaxSalaire(Long maxSalaire) {
        this.maxSalaire = maxSalaire;
    }

    public Employe getEmploye() {
        return employe;
    }

    public Emploie employe(Employe employe) {
        this.employe = employe;
        return this;
    }

    public void setEmploye(Employe employe) {
        this.employe = employe;
    }

    public Set<Tache> getTaches() {
        return taches;
    }

    public Emploie taches(Set<Tache> taches) {
        this.taches = taches;
        return this;
    }

    public Emploie addTache(Tache tache) {
        this.taches.add(tache);
        tache.getEmploies().add(this);
        return this;
    }

    public Emploie removeTache(Tache tache) {
        this.taches.remove(tache);
        tache.getEmploies().remove(this);
        return this;
    }

    public void setTaches(Set<Tache> taches) {
        this.taches = taches;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Emploie emploie = (Emploie) o;
        if (emploie.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), emploie.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Emploie{" +
            "id=" + getId() +
            ", libelle='" + getLibelle() + "'" +
            ", minSalaire=" + getMinSalaire() +
            ", maxSalaire=" + getMaxSalaire() +
            "}";
    }
}
