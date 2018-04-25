package io.github.jhipster.application.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A TypesProblems.
 */
@Entity
@Table(name = "types_problems")
public class TypesProblems implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Lob
    @Column(name = "types_method")
    private String typesMethod;

    @OneToOne(mappedBy = "typesProblems")
    @JsonIgnore
    private Unit unit;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTypesMethod() {
        return typesMethod;
    }

    public TypesProblems typesMethod(String typesMethod) {
        this.typesMethod = typesMethod;
        return this;
    }

    public void setTypesMethod(String typesMethod) {
        this.typesMethod = typesMethod;
    }

    public Unit getUnit() {
        return unit;
    }

    public TypesProblems unit(Unit unit) {
        this.unit = unit;
        return this;
    }

    public void setUnit(Unit unit) {
        this.unit = unit;
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
        TypesProblems typesProblems = (TypesProblems) o;
        if (typesProblems.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), typesProblems.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TypesProblems{" +
            "id=" + getId() +
            ", typesMethod='" + getTypesMethod() + "'" +
            "}";
    }
}
