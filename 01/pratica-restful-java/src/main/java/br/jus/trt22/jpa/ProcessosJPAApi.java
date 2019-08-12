package br.jus.trt22.jpa;

import java.net.URI;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.validation.Valid;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import br.jus.trt22.Processo;

@Path("/jpa/processos")
public class ProcessosJPAApi {

    private static EntityManagerFactory emf = Persistence.createEntityManagerFactory( "pratica-restful-java" );

    /**
     * manualmente abrir transação e tudo mais
     * @return
     */

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Processo> obterTodosOsProcessos() {
        EntityManager entityManager = emf.createEntityManager();
        entityManager.getTransaction().begin();
        List<Processo> processos = entityManager.createQuery("from Processo",Processo.class).getResultList();
        entityManager.getTransaction().commit();
        entityManager.close();
        return processos;
    }

    // curl -v -H"content-type: application/json" -d '{"numero":"123","advogado":"joao bacurau"}' http://localhost:8080/processos
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public Response salvar(@Valid Processo processo) {

        EntityManager entityManager = emf.createEntityManager();
        entityManager.getTransaction().begin();
        entityManager.persist(processo);
        entityManager.getTransaction().commit();
        entityManager.close();

        return Response.created(URI.create("/processos/" + processo.getId())).build();
    }

    // curl -XDELETE http://localhost:8080/processos/1
    @DELETE
    @Path("/{id}")
    public Response excluir(@PathParam("id") Integer id) {

        EntityManager entityManager = emf.createEntityManager();
        entityManager.getTransaction().begin();
        Processo processo = entityManager.find(Processo.class, id);
        boolean removeu = false;
        if (processo !=null){
            entityManager.remove(processo);
            removeu=true;
        }
        entityManager.getTransaction().commit();
        entityManager.close();

        if (removeu)
            return Response.noContent().build();
        else
            return Response.status(Status.NOT_FOUND).build();
    }
}