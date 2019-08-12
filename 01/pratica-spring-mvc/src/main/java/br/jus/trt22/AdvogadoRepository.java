package br.jus.trt22;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

/**
 * AdvogadoRepository
 */
@Service
public interface AdvogadoRepository  extends JpaRepository<Advogado,Integer>{
    
}