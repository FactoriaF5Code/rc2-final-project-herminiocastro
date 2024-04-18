package com.backend.backend.controller;

import com.backend.backend.persistence.models.ArticuloMO;
import com.backend.backend.persistence.repositories.ArticuloJPARepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectResponse;

import java.io.IOException;
import java.util.Optional;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/articulos/")
public class ArticuloController {

    @Autowired
    private ArticuloJPARepository articuloRepository;

    private final S3Client s3Client = S3Client.builder()
            .region(Region.EU_NORTH_1)
            .build();

    @GetMapping("/")
    public List<ArticuloMO> findAll() {
        return articuloRepository.findAll();
    }

    @PostMapping("/")
    public ArticuloMO createArticulo(@RequestParam("image") MultipartFile image,
                                     @RequestParam("data") String jsonData) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        ArticuloMO articuloMO = objectMapper.readValue(jsonData, ArticuloMO.class);

        String imageUrl = uploadImageToS3(image);
        articuloMO.setImagen(imageUrl);

        return articuloRepository.save(articuloMO);
    }

    private String uploadImageToS3(MultipartFile image) throws IOException {
        String fileName = image.getOriginalFilename();
        s3Client.putObject(PutObjectRequest.builder()
                .bucket("strangerpops")
                .key(fileName)
                .build(), RequestBody.fromInputStream(image.getInputStream(), image.getSize()));
        return s3Client.utilities().getUrl(builder -> builder
                .bucket("strangerpops")
                .key(fileName))
                .toString();
    }

    @GetMapping("/{id}")
    public ArticuloMO findById(@PathVariable Long id) {
        return articuloRepository.findById(id).orElse(null);
    }

    @PutMapping("/{id}")
    public ArticuloMO update(@PathVariable Long id,
                             @RequestParam("image") MultipartFile image,
                             @RequestParam("data") String jsonData) throws IOException {
        Optional<ArticuloMO> optionalArticulo = articuloRepository.findById(id);
        if (!optionalArticulo.isPresent()) {
            return null;
        }
        ArticuloMO articuloFromDB = optionalArticulo.get();

        ObjectMapper objectMapper = new ObjectMapper();
        ArticuloMO articuloMO = objectMapper.readValue(jsonData, ArticuloMO.class);

        checkNullValues(articuloMO, articuloFromDB);

        String imageUrl = uploadImageToS3(image);
        articuloFromDB.setImagen(imageUrl);

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
