package com.exadel.carpoolfree.controller;


import com.exadel.carpoolfree.model.Drive;
import com.exadel.carpoolfree.repository.DriveRepository;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("api/drive")
public class DriveController {
    private final DriveRepository driveRepository;

    public DriveController(DriveRepository driveRepository) {
        this.driveRepository = driveRepository;
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
        return driveRepository.save(drive);
    }

    @DeleteMapping("/{id}")
    public boolean delete(final @PathVariable Long id) {
        driveRepository.deleteById(id);
        return true;
    }

}
