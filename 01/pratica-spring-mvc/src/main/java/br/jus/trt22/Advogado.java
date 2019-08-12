package br.jus.trt22;

import java.util.Objects;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

/**
 * Advogado
 */
@Entity
public class Advogado {

    @Id
    @GeneratedValue
    private Integer id;
    private String nome;
    private String oab;


    public Advogado() {
    }

    public Advogado(Integer id, String nome, String oab) {
        this.id = id;
        this.nome = nome;
        this.oab = oab;
    }

    public Integer getId() {
        return this.id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNome() {
        return this.nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getOab() {
        return this.oab;
    }

    public void setOab(String oab) {
        this.oab = oab;
    }

    public Advogado id(Integer id) {
        this.id = id;
        return this;
    }

    public Advogado nome(String nome) {
        this.nome = nome;
        return this;
    }

    public Advogado oab(String oab) {
        this.oab = oab;
        return this;
    }

    @Override
    public boolean equals(Object o) {
        if (o == this)
            return true;
        if (!(o instanceof Advogado)) {
            return false;
        }
        Advogado advogado = (Advogado) o;
        return Objects.equals(id, advogado.id) && Objects.equals(nome, advogado.nome) && Objects.equals(oab, advogado.oab);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, nome, oab);
    }

    @Override
    public String toString() {
        return "{" +
            " id='" + getId() + "'" +
            ", nome='" + getNome() + "'" +
            ", oab='" + getOab() + "'" +
            "}";
    }


}