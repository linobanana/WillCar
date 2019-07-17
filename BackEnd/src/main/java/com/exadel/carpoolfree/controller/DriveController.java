package com.exadel.carpoolfree.controller;


import com.exadel.carpoolfree.model.Drive;
import com.exadel.carpoolfree.repository.DriveRepository;
import com.exadel.carpoolfree.repository.PathRepository;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("api/drive")
public class DriveController {
    private final DriveRepository driveRepository;
    private final PathRepository pathRepository;

    public DriveController(DriveRepository driveRepository, PathRepository pathRepository) {
        this.driveRepository = driveRepository;
        this.pathRepository = pathRepository;
    }

    @GetMapping()
    public List<Drive> findAllDrives() {
        return driveRepository.findAll();
    }

    @GetMapping("/{id}")
    public Drive findById(final @PathVariable Long id) {
        return driveRepository.findById(id).get();
    }


    @GetMapping("/startPoint/{startPoint}")
    public List<Drive> getDriveByStartPoint(final @PathVariable Double startPoint) {
        return driveRepository.findDrivesByStartPoint(startPoint);
    }

    @GetMapping("/startTime/{startTime}")
    public List<Drive> findAllByStartTime(final @PathVariable LocalDateTime startTime) {
        return driveRepository.findAllByStartTime(startTime);
    }

    @PostMapping()
    public Drive addDrive(@RequestBody Drive drive) {
        pathRepository.save(drive.getPath());
        return driveRepository.save(drive);
    }

    @PutMapping("/{id}")
    public Drive updateDrive(@PathVariable Long id, @RequestBody Drive drive) {
        return driveRepository.findById(id)
                .map(drive1 -> {
                    drive1.setPath(drive.getPath());
                    return driveRepository.save(drive1);
                })
                .orElseThrow((() -> new RuntimeException("User not found")));
    }

    @DeleteMapping("/{id}")
    public boolean delete(final @PathVariable Long id) {
        driveRepository.deleteById(id);
        return true;
    }

}
