package br.jus.trt22;

import java.util.LinkedList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.servlet.ModelAndView;

/**
 * AdvogadoController
 */
@Controller("/")
public class AdvogadoController {

    @Autowired
    private AdvogadoRepository repository;

    @GetMapping
    public ModelAndView listarTodos() {
        ModelAndView mv = new ModelAndView();
        mv.setViewName("index");
        mv.addObject("advogados", repository.findAll());

        return mv;
    }

    @PostMapping("/")
    public String salvar(Advogado advogado,HttpServletRequest request) {
        repository.save(advogado);
        return "redirect:/";
    }

    @GetMapping("excluir/{id}")
    public String excluir(@PathVariable("id") Integer id,HttpServletRequest request) {
        repository.deleteById(id);
        return "redirect:/";

    }
    
}