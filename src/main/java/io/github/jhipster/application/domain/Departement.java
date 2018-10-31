package io.github.jhipster.application.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.annotations.ApiModelProperty;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Departement.
 */
@Entity
@Table(name = "departement")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "departement")
public class Departement implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "departement_libelle", nullable = false)
    private String departementLibelle;

    @OneToOne    @JoinColumn(unique = true)
    private Localisation localisation;

    /**
     * A relationship
     */
    @ApiModelProperty(value = "A relationship")
    @OneToMany(mappedBy = "departement")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Employe> employes = new HashSet<>();
    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDepartementLibelle() {
        return departementLibelle;
    }

    public Departement departementLibelle(String departementLibelle) {
        this.departementLibelle = departementLibelle;
        return this;
    }

    public void setDepartementLibelle(String departementLibelle) {
        this.departementLibelle = departementLibelle;
    }

    public Localisation getLocalisation() {
        return localisation;
    }

    public Departement localisation(Localisation localisation) {
        this.localisation = localisation;
        return this;
    }

    public void setLocalisation(Localisation localisation) {
        this.localisation = localisation;
    }

    public Set<Employe> getEmployes() {
        return employes;
    }

    public Departement employes(Set<Employe> employes) {
        this.employes = employes;
        return this;
    }

    public Departement addEmploye(Employe employe) {
        this.employes.add(employe);
        employe.setDepartement(this);
        return this;
    }

    public Departement removeEmploye(Employe employe) {
        this.employes.remove(employe);
        employe.setDepartement(null);
        return this;
    }

    public void setEmployes(Set<Employe> employes) {
        this.employes = employes;
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
        Departement departement = (Departement) o;
        if (departement.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), departement.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Departement{" +
            "id=" + getId() +
            ", departementLibelle='" + getDepartementLibelle() + "'" +
            "}";
    }
}
