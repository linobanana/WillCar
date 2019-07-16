package com.exadel.carpoolfree.controller;


import com.exadel.carpoolfree.model.Path;
import com.exadel.carpoolfree.repository.PathRepository;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/path")
public class PathController {
    private final PathRepository pathRepository;

    public PathController(PathRepository pathRepository) {
        this.pathRepository = pathRepository;
    }

    @GetMapping("/{id}")
    public Path getPathById(final @PathVariable Long id) {
        return pathRepository.findById(id).get();
    }

    @PostMapping()
    public Path addPath(@RequestBody Path path) {
        return pathRepository.save(path);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        pathRepository.deleteById(id);
    }


}
