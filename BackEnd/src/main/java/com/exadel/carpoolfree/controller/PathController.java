package com.exadel.carpoolfree.controller;


import com.exadel.carpoolfree.model.Path;
import com.exadel.carpoolfree.repository.PathRepository;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/path")
public class PathController {
    private final PathRepository pathRepository;

    public PathController(PathRepository pathRepository) {
        this.pathRepository = pathRepository;
    }

    @GetMapping("/{id}")
    public String getCoordinatesById(final @PathVariable Long id) {
        return pathRepository.getCoordinatesById(id);
    }

    @GetMapping("/{start}")
    public String getCoordinatesByStartPoint(final @PathVariable Double start) {
        return pathRepository.getCoordinatesByStartPoint(start);
    }

    @PostMapping()
    public Path addCoordinates(@RequestBody Path coordinates) {
        return pathRepository.save(coordinates);
    }

    @DeleteMapping("/id")
    public boolean delete(@PathVariable Long id) {
        pathRepository.deleteById(id);
        return true;
    }


}
