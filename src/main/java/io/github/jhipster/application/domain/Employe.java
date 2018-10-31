package io.github.jhipster.application.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * The Employee entity.
 */
@ApiModel(description = "The Employee entity.")
@Entity
@Table(name = "employe")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "employe")
public class Employe implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * The firstname attribute.
     */
    @ApiModelProperty(value = "The firstname attribute.")
    @Column(name = "nom")
    private String nom;

    @Column(name = "prenom")
    private String prenom;

    @Column(name = "email")
    private String email;

    @Column(name = "contact")
    private String contact;

    @Column(name = "date_creation")
    private Instant dateCreation;

    @Column(name = "salaire")
    private Long salaire;

    @Column(name = "commission")
    private Long commission;

    @ManyToOne
    @JsonIgnoreProperties("employes")
    private Departement departement;

    @OneToMany(mappedBy = "employe")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Emploie> emploies = new HashSet<>();
    @ManyToOne
    @JsonIgnoreProperties("")
    private Employe manager;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public Employe nom(String nom) {
        this.nom = nom;
        return this;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPrenom() {
        return prenom;
    }

    public Employe prenom(String prenom) {
        this.prenom = prenom;
        return this;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public String getEmail() {
        return email;
    }

    public Employe email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getContact() {
        return contact;
    }

    public Employe contact(String contact) {
        this.contact = contact;
        return this;
    }

    public void setContact(String contact) {
        this.contact = contact;
    }

    public Instant getDateCreation() {
        return dateCreation;
    }

    public Employe dateCreation(Instant dateCreation) {
        this.dateCreation = dateCreation;
        return this;
    }

    public void setDateCreation(Instant dateCreation) {
        this.dateCreation = dateCreation;
    }

    public Long getSalaire() {
        return salaire;
    }

    public Employe salaire(Long salaire) {
        this.salaire = salaire;
        return this;
    }

    public void setSalaire(Long salaire) {
        this.salaire = salaire;
    }

    public Long getCommission() {
        return commission;
    }

    public Employe commission(Long commission) {
        this.commission = commission;
        return this;
    }

    public void setCommission(Long commission) {
        this.commission = commission;
    }

    public Departement getDepartement() {
        return departement;
    }

    public Employe departement(Departement departement) {
        this.departement = departement;
        return this;
    }

    public void setDepartement(Departement departement) {
        this.departement = departement;
    }

    public Set<Emploie> getEmploies() {
        return emploies;
    }

    public Employe emploies(Set<Emploie> emploies) {
        this.emploies = emploies;
        return this;
    }

    public Employe addEmploie(Emploie emploie) {
        this.emploies.add(emploie);
        emploie.setEmploye(this);
        return this;
    }

    public Employe removeEmploie(Emploie emploie) {
        this.emploies.remove(emploie);
        emploie.setEmploye(null);
        return this;
    }

    public void setEmploies(Set<Emploie> emploies) {
        this.emploies = emploies;
    }

    public Employe getManager() {
        return manager;
    }

    public Employe manager(Employe employe) {
        this.manager = employe;
        return this;
    }

    public void setManager(Employe employe) {
        this.manager = employe;
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
        Employe employe = (Employe) o;
        if (employe.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), employe.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Employe{" +
            "id=" + getId() +
            ", nom='" + getNom() + "'" +
            ", prenom='" + getPrenom() + "'" +
            ", email='" + getEmail() + "'" +
            ", contact='" + getContact() + "'" +
            ", dateCreation='" + getDateCreation() + "'" +
            ", salaire=" + getSalaire() +
            ", commission=" + getCommission() +
            "}";
    }
}
