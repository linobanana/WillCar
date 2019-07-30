package com.exadel.carpoolfree.controller;


import com.exadel.carpoolfree.model.Drive;
import com.exadel.carpoolfree.model.Path;
import com.exadel.carpoolfree.model.view.DriveVO;
import com.exadel.carpoolfree.service.DriveService;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/drive")
public class DriveController {

    private final DriveService driveService;

    public DriveController(DriveService driveService) {
        this.driveService = driveService;
    }

    @GetMapping()
    public List<DriveVO> findAllDrives()
    {
        return driveService.findAllDrives();
    }

    @GetMapping("/{id}")
    public DriveVO findById(final @PathVariable Long id) {

        return driveService.findById(id);
    }

    @GetMapping("/userId/{userId}")
    private List<DriveVO> findAllByUserId(final @PathVariable Long userId) {
        List<DriveVO> result = driveService.findAllByUserId(userId);
        return result;
    }

    @GetMapping("/driverId/{driverId}")
    private List<DriveVO> findAllByDriverId(final @PathVariable Long driverId) {
        List<DriveVO> result = driveService.findAllByDriverId(driverId);
        return result;
    }

    @GetMapping("/passengerId/{passengerId}")
    private List<DriveVO> findAllByPassengerId(final @PathVariable Long passengerId) {
        List<DriveVO> result = driveService.findAllByPassengerId(passengerId);
        return result;
    }

    @GetMapping("/startPoint/{startPoint}")
    public List<DriveVO> getDriveByStartPoint(final @PathVariable Double startPoint) {
        return driveService.getDriveByStartPoint(startPoint);
    }

    @GetMapping("/startTime/{startTime}")
    public List<DriveVO> findAllByStartTime(final @PathVariable String startTime) {
        return driveService.findAllByStartTime(startTime);
    }

    @PostMapping()
    public DriveVO addDrive(@RequestBody Drive drive) {
        return driveService.addDrive(drive);
    }

    @PutMapping("/{id}")
    public DriveVO updateDrive(@PathVariable Long id, @RequestBody Path path) {
       return driveService.updateDrive(id, path);
    }

    @DeleteMapping("/{id}")
    public void delete(final @PathVariable Long id) {
        driveService.deleteById(id);
    }

}
