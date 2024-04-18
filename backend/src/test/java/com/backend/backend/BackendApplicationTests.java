package com.backend.backend;

import com.backend.backend.controller.ArticuloController;
import com.backend.backend.persistence.models.ArticuloMO;
import com.backend.backend.persistence.repositories.ArticuloJPARepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.when;

@SpringBootTest
class BackendApplicationTests {

	@Mock
	ArticuloJPARepository repository;

	ArticuloController controller;

	@BeforeEach
	void config(){
		repository = Mockito.mock(ArticuloJPARepository.class);
		this.controller = new ArticuloController(repository);
	}
	@Test
	void contextLoads() {
		when(this.repository.findAll()).thenReturn(new ArrayList<>());
		List<ArticuloMO> response = controller.findAll();
		assertNotNull(response);
		assertTrue(response.isEmpty());
	}

	@Test
	void testFindByIdIsNull(){
		when(this.repository.findById(anyLong())).thenReturn(null);
		assertThrows(NullPointerException.class, () -> this.controller.findById(1L));
	}

	@Test
	void testFindByIdIsNotNull(){
		ArticuloMO articuloMO = new ArticuloMO(1L, "imagen",
				"categoria", "titulo", "descripcion");
		when(this.repository.findById(anyLong())).thenReturn(Optional.of(articuloMO));
		ArticuloMO response = this.controller.findById(1L);
		assertNotNull(response);
        assertSame(response.getId(), articuloMO.getId());
	}

}
