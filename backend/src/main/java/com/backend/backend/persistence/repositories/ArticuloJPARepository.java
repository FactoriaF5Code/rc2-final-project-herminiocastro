package com.backend.backend.persistence.repositories;

import com.backend.backend.persistence.models.ArticuloMO;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ArticuloJPARepository extends JpaRepository<ArticuloMO, Long> {
}