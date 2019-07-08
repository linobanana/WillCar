package com.exadel.carpoolfree.repository;

import com.exadel.carpoolfree.model.Driver;

import java.util.List;

public interface DriverRepository extends BaseRepository<Driver> {
    List<Driver> findAllByFirstName(String firstName);
}
