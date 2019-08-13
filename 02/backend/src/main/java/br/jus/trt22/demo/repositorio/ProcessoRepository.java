package br.jus.trt22.demo.repositorio;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

import br.jus.trt22.demo.modelo.Processo;

@RepositoryRestResource(path = "processos", collectionResourceRel = "processos")
@Repository
public interface ProcessoRepository extends PagingAndSortingRepository<Processo, Long> {

}