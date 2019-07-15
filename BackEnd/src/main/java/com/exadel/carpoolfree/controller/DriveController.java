package com.exadel.carpoolfree.controller;


import com.exadel.carpoolfree.model.Drive;
import com.exadel.carpoolfree.repository.DriveRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/drive")
public class DriveController {
    private final DriveRepository driveRepository;

    public DriveController(DriveRepository driveRepository) {
        this.driveRepository = driveRepository;
    }

    //Is it need to return absolutely all drives?

    @GetMapping("/{id}")
    public Drive findById(final @PathVariable Long id) {
        return driveRepository.findById(id).get();
    }


    @GetMapping("/startTime/{startTime}")
    public List<Drive> findAllByStartTime(final @PathVariable String startTime) {
        return driveRepository.findAllByStartTime(startTime);
    }

    @GetMapping("/startPoint/{startPoint}")
    public List<Drive> findAllByStartPoint(final @PathVariable Double startPoint) {
        return driveRepository.findAllByStartPoint(startPoint);
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
