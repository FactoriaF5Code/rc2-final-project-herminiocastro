package com.backend.backend.controller;

import com.backend.backend.persistence.models.ArticuloMO;
import com.backend.backend.persistence.repositories.ArticuloJPARepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:5173")

@AllArgsConstructor
@RequestMapping("/api/articulos/")
public class ArticuloController {

    private ArticuloJPARepository articuloRepository;

    @GetMapping("/")
    public List<ArticuloMO> findAll() {
        return articuloRepository.findAll();
    }

    @PostMapping("/")
    public ArticuloMO create(@RequestParam("file") MultipartFile file, @RequestParam("jsonData") String jsonData)
            throws JsonMappingException, JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        ArticuloMO articulo = objectMapper.readValue(jsonData, ArticuloMO.class);
        return this.articuloRepository.save(articulo);

    }

    @GetMapping("/{id}")
    public ArticuloMO findById(@PathVariable Long id) {
        return articuloRepository.findById(id).orElse(null);
    }

    @PutMapping("/{id}")
    public ArticuloMO update(@PathVariable Long id, @RequestParam("file") MultipartFile file,
                             @RequestParam("jsonData") String jsonData) throws JsonMappingException,
            JsonProcessingException{
        ObjectMapper objectMapper = new ObjectMapper();
        ArticuloMO articulo = objectMapper.readValue(jsonData, ArticuloMO.class);
        articulo.setId(id);
        Optional<ArticuloMO> response = this.articuloRepository.findById(id);
        ArticuloMO articuloFromDB = Optional.of(response).isPresent() ? response.get() : null;
    
        if (articuloFromDB == null) {
            return null;
        }

        checkNullValues(articulo, articuloFromDB);

        return articuloRepository.save(articuloFromDB);
    }

    private void checkNullValues(ArticuloMO articuloMO, ArticuloMO articuloFromDB) {
        if (articuloMO.getCategoria() != null) {
            articuloFromDB.setCategoria(articuloMO.getCategoria());
        }
        if (articuloMO.getImagen() != null) {
            articuloFromDB.setImagen(articuloMO.getImagen());
        }
        if (articuloMO.getTitulo() != null) {
            articuloFromDB.setTitulo(articuloMO.getTitulo());
        }
        if (articuloMO.getDescripcion() != null) {
            articuloFromDB.setDescripcion(articuloMO.getDescripcion());
        }
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        articuloRepository.deleteById(id);
    }
}