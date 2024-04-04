package com.backend.backend.controller;

import com.backend.backend.persistence.models.ArticuloMO;
import com.backend.backend.persistence.repositories.ArticuloJPARepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:5173") 
  
@RequestMapping("/api/articulos")
public class ArticuloController {

    @Autowired
    private ArticuloJPARepository articuloRepository;

    @GetMapping("/")
    public List<ArticuloMO> findAll() {
        return articuloRepository.findAll();
    }

    @PostMapping("/")
    public ArticuloMO create(@RequestBody ArticuloMO ArticuloMO) {
        return articuloRepository.save(ArticuloMO);
    }

    @GetMapping("/{id}")
    public ArticuloMO findById(@PathVariable Long id) {
        return articuloRepository.findById(id).orElse(null);
    }

    @PutMapping("/{id}")
    public ArticuloMO update(@PathVariable Long id, @RequestBody ArticuloMO articuloMO) {
        articuloMO.setId(id);
        Optional<ArticuloMO> response = this.articuloRepository.findById(id);
        ArticuloMO articuloFromDB = Optional.of(response).isPresent() ? response.get() : null;
        if(articuloFromDB == null){
            return null;
        }

        checkNullValues(articuloMO, articuloFromDB);

        return articuloRepository.save(articuloFromDB);
    }

    private void checkNullValues(ArticuloMO articuloMO, ArticuloMO articuloFromDB) {
        if(articuloMO.getCategoria() != null){
            articuloFromDB.setCategoria(articuloMO.getCategoria());
        }
        if(articuloMO.getImagen() != null){
            articuloFromDB.setImagen(articuloMO.getImagen());
        }
        if(articuloMO.getTitulo() != null){
            articuloFromDB.setTitulo(articuloMO.getTitulo());
        }
        if(articuloMO.getDescripcion() != null){
            articuloFromDB.setDescripcion(articuloMO.getDescripcion());
        }
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        articuloRepository.deleteById(id);
    }
}