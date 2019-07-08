package com.exadel.carpoolfree.repository;

import com.exadel.carpoolfree.model.BaseEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.NoRepositoryBean;

@NoRepositoryBean
interface BaseRepository<T extends BaseEntity> extends JpaRepository<T, Long> {
}
