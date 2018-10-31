package io.github.jhipster.application.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

import io.github.jhipster.application.domain.enumeration.Langue;

/**
 * A EmploieHistory.
 */
@Entity
@Table(name = "emploie_history")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "emploiehistory")
public class EmploieHistory implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "date_debut")
    private Instant dateDebut;

    @Column(name = "date_fin")
    private Instant dateFin;

    @Enumerated(EnumType.STRING)
    @Column(name = "langue")
    private Langue langue;

    @OneToOne    @JoinColumn(unique = true)
    private Emploie emploie;

    @OneToOne    @JoinColumn(unique = true)
    private Departement departement;

    @OneToOne    @JoinColumn(unique = true)
    private Employe employe;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getDateDebut() {
        return dateDebut;
    }

    public EmploieHistory dateDebut(Instant dateDebut) {
        this.dateDebut = dateDebut;
        return this;
    }

    public void setDateDebut(Instant dateDebut) {
        this.dateDebut = dateDebut;
    }

    public Instant getDateFin() {
        return dateFin;
    }

    public EmploieHistory dateFin(Instant dateFin) {
        this.dateFin = dateFin;
        return this;
    }

    public void setDateFin(Instant dateFin) {
        this.dateFin = dateFin;
    }

    public Langue getLangue() {
        return langue;
    }

    public EmploieHistory langue(Langue langue) {
        this.langue = langue;
        return this;
    }

    public void setLangue(Langue langue) {
        this.langue = langue;
    }

    public Emploie getEmploie() {
        return emploie;
    }

    public EmploieHistory emploie(Emploie emploie) {
        this.emploie = emploie;
        return this;
    }

    public void setEmploie(Emploie emploie) {
        this.emploie = emploie;
    }

    public Departement getDepartement() {
        return departement;
    }

    public EmploieHistory departement(Departement departement) {
        this.departement = departement;
        return this;
    }

    public void setDepartement(Departement departement) {
        this.departement = departement;
    }

    public Employe getEmploye() {
        return employe;
    }

    public EmploieHistory employe(Employe employe) {
        this.employe = employe;
        return this;
    }

    public void setEmploye(Employe employe) {
        this.employe = employe;
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
        EmploieHistory emploieHistory = (EmploieHistory) o;
        if (emploieHistory.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), emploieHistory.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "EmploieHistory{" +
            "id=" + getId() +
            ", dateDebut='" + getDateDebut() + "'" +
            ", dateFin='" + getDateFin() + "'" +
            ", langue='" + getLangue() + "'" +
            "}";
    }
}
