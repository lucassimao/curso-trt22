package br.jus.trt22;

import java.net.URI;
import java.util.LinkedList;
import java.util.List;

import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

@Path("/processos")
public class ProcessosApi {

    private final static List<Processo> DB = new LinkedList<>();


    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Processo> obterTodosOsProcessos() {
        return DB;
    }

    // curl -v -H"content-type: application/json" -d '{"numero":"123","advogado":"joao bacurau"}' http://localhost:8080/processos
    @POST
    public Response salvar(Processo processo) {
        processo.setId(DB.size()+1);
        DB.add(processo);
        return Response.created(URI.create("/processos/" + processo.getId())).build();
    }

    // curl -XDELETE http://localhost:8080/processos/1
    @DELETE
    @Path("/{id}")
    public Response excluir(@PathParam("id") Integer id) {
        boolean removeu = DB.removeIf((processo) -> processo.getId().equals(id));
        if (removeu)
            return Response.noContent().build();
        else
            return Response.status(Status.NOT_FOUND).build();
    }
}