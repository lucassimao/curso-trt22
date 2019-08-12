package br.jus.trt22;

import java.util.Objects;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.validation.constraints.NotEmpty;


/**
 * Processo
 */
@Entity
public class Processo {

    @NotEmpty
    private String numero;
    @Id
    @GeneratedValue
    private Integer id;
    @NotEmpty
    private String advogado;

    public Processo() {
    }

    public Processo(String numero, Integer id, String advogado) {
        this.numero = numero;
        this.id = id;
        this.advogado = advogado;
    }

    public String getNumero() {
        return this.numero;
    }

    public void setNumero(String numero) {
        this.numero = numero;
    }

    public Integer getId() {
        return this.id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getAdvogado() {
        return this.advogado;
    }

    public void setAdvogado(String advogado) {
        this.advogado = advogado;
    }

    public Processo numero(String numero) {
        this.numero = numero;
        return this;
    }

    public Processo id(Integer id) {
        this.id = id;
        return this;
    }

    public Processo advogado(String advogado) {
        this.advogado = advogado;
        return this;
    }

    @Override
    public boolean equals(Object o) {
        if (o == this)
            return true;
        if (!(o instanceof Processo)) {
            return false;
        }
        Processo processo = (Processo) o;
        return Objects.equals(numero, processo.numero) && Objects.equals(id, processo.id) && Objects.equals(advogado, processo.advogado);
    }

    @Override
    public int hashCode() {
        return Objects.hash(numero, id, advogado);
    }

    @Override
    public String toString() {
        return "{" +
            " numero='" + getNumero() + "'" +
            ", id='" + getId() + "'" +
            ", advogado='" + getAdvogado() + "'" +
            "}";
    }


}