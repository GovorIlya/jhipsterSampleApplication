package io.github.jhipster.application.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A RatingMethod.
 */
@Entity
@Table(name = "rating_method")
public class RatingMethod implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Lob
    @Column(name = "rating_method")
    private String ratingMethod;

    @OneToOne(mappedBy = "ratingMethod")
    @JsonIgnore
    private Unit unit;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRatingMethod() {
        return ratingMethod;
    }

    public RatingMethod ratingMethod(String ratingMethod) {
        this.ratingMethod = ratingMethod;
        return this;
    }

    public void setRatingMethod(String ratingMethod) {
        this.ratingMethod = ratingMethod;
    }

    public Unit getUnit() {
        return unit;
    }

    public RatingMethod unit(Unit unit) {
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
        RatingMethod ratingMethod = (RatingMethod) o;
        if (ratingMethod.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), ratingMethod.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "RatingMethod{" +
            "id=" + getId() +
            ", ratingMethod='" + getRatingMethod() + "'" +
            "}";
    }
}
