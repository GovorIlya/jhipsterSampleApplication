package io.github.jhipster.application.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A ResearchMethod.
 */
@Entity
@Table(name = "research_method")
public class ResearchMethod implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Lob
    @Column(name = "research_method")
    private String researchMethod;

    @OneToOne(mappedBy = "researchMethod")
    @JsonIgnore
    private Unit unit;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getResearchMethod() {
        return researchMethod;
    }

    public ResearchMethod researchMethod(String researchMethod) {
        this.researchMethod = researchMethod;
        return this;
    }

    public void setResearchMethod(String researchMethod) {
        this.researchMethod = researchMethod;
    }

    public Unit getUnit() {
        return unit;
    }

    public ResearchMethod unit(Unit unit) {
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
        ResearchMethod researchMethod = (ResearchMethod) o;
        if (researchMethod.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), researchMethod.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ResearchMethod{" +
            "id=" + getId() +
            ", researchMethod='" + getResearchMethod() + "'" +
            "}";
    }
}
