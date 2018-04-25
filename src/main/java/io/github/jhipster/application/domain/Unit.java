package io.github.jhipster.application.domain;


import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Unit.
 */
@Entity
@Table(name = "unit")
public class Unit implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "unit_name", nullable = false)
    private String unitName;

    @NotNull
    @Column(name = "unit_city", nullable = false)
    private String unitCity;

    @NotNull
    @Column(name = "unit_street", nullable = false)
    private String unitStreet;

    @NotNull
    @Column(name = "unit_house", nullable = false)
    private String unitHouse;

    @OneToOne
    @JoinColumn(unique = true)
    private UnitDescription unitDescription;

    @OneToOne
    @JoinColumn(unique = true)
    private Image image;

    @OneToOne
    @JoinColumn(unique = true)
    private ResearchMethod researchMethod;

    @OneToOne
    @JoinColumn(unique = true)
    private TypesProblems typesProblems;

    @OneToOne
    @JoinColumn(unique = true)
    private RatingMethod ratingMethod;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUnitName() {
        return unitName;
    }

    public Unit unitName(String unitName) {
        this.unitName = unitName;
        return this;
    }

    public void setUnitName(String unitName) {
        this.unitName = unitName;
    }

    public String getUnitCity() {
        return unitCity;
    }

    public Unit unitCity(String unitCity) {
        this.unitCity = unitCity;
        return this;
    }

    public void setUnitCity(String unitCity) {
        this.unitCity = unitCity;
    }

    public String getUnitStreet() {
        return unitStreet;
    }

    public Unit unitStreet(String unitStreet) {
        this.unitStreet = unitStreet;
        return this;
    }

    public void setUnitStreet(String unitStreet) {
        this.unitStreet = unitStreet;
    }

    public String getUnitHouse() {
        return unitHouse;
    }

    public Unit unitHouse(String unitHouse) {
        this.unitHouse = unitHouse;
        return this;
    }

    public void setUnitHouse(String unitHouse) {
        this.unitHouse = unitHouse;
    }

    public UnitDescription getUnitDescription() {
        return unitDescription;
    }

    public Unit unitDescription(UnitDescription unitDescription) {
        this.unitDescription = unitDescription;
        return this;
    }

    public void setUnitDescription(UnitDescription unitDescription) {
        this.unitDescription = unitDescription;
    }

    public Image getImage() {
        return image;
    }

    public Unit image(Image image) {
        this.image = image;
        return this;
    }

    public void setImage(Image image) {
        this.image = image;
    }

    public ResearchMethod getResearchMethod() {
        return researchMethod;
    }

    public Unit researchMethod(ResearchMethod researchMethod) {
        this.researchMethod = researchMethod;
        return this;
    }

    public void setResearchMethod(ResearchMethod researchMethod) {
        this.researchMethod = researchMethod;
    }

    public TypesProblems getTypesProblems() {
        return typesProblems;
    }

    public Unit typesProblems(TypesProblems typesProblems) {
        this.typesProblems = typesProblems;
        return this;
    }

    public void setTypesProblems(TypesProblems typesProblems) {
        this.typesProblems = typesProblems;
    }

    public RatingMethod getRatingMethod() {
        return ratingMethod;
    }

    public Unit ratingMethod(RatingMethod ratingMethod) {
        this.ratingMethod = ratingMethod;
        return this;
    }

    public void setRatingMethod(RatingMethod ratingMethod) {
        this.ratingMethod = ratingMethod;
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
        Unit unit = (Unit) o;
        if (unit.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), unit.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Unit{" +
            "id=" + getId() +
            ", unitName='" + getUnitName() + "'" +
            ", unitCity='" + getUnitCity() + "'" +
            ", unitStreet='" + getUnitStreet() + "'" +
            ", unitHouse='" + getUnitHouse() + "'" +
            "}";
    }
}
