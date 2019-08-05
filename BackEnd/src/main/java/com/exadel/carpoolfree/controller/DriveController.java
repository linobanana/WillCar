package com.exadel.carpoolfree.controller;

import com.exadel.carpoolfree.model.view.DriveVO;
import com.exadel.carpoolfree.model.view.PathVO;
import com.exadel.carpoolfree.service.DriveService;
import com.exadel.carpoolfree.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
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

    @Autowired
    private UserService userService;

    private final DriveService driveService;

    public DriveController(DriveService driveService) {
        this.driveService = driveService;
    }

//    @GetMapping()
//    public List<DriveVO> findAllDrives()
//    {
//        return driveService.findAllDrives();
//    }

//    @GetMapping("/{id}")
//    public DriveVO findById(final @PathVariable Long id) {
//
//        return driveService.findById(id);
//    }

    @GetMapping("/userId/{userId}")
    private List<DriveVO> findAllByUserId(final @PathVariable Long userId) {
       /* SecurityContext context = SecurityContextHolder.getContext();
        String login = context.getAuthentication().getName();
        Long id = userService.findUserByLogin(login).getId();*/

       /* if (userId == id) {*/
            List<DriveVO> result = driveService.findAllByUserId(userId);
            return result;
      /*  } else {
            throw new RuntimeException("Incorrect userId");
        }*/
    }

    @GetMapping("/driver/driverId/{driverId}")
    private List<DriveVO> findAllByDriverId(final @PathVariable Long driverId) {
        List<DriveVO> result = driveService.findAllByDriverId(driverId);
        return result;
    }

    @GetMapping("/passenger/passengerId/{passengerId}")
    private List<DriveVO> findAllByPassengerId(final @PathVariable Long passengerId) {
        /*SecurityContext context = SecurityContextHolder.getContext();
        String login = context.getAuthentication().getName();
        Long id = userService.findUserByLogin(login).getId();
        if (passengerId == id) {*/

            List<DriveVO> result = driveService.findAllByPassengerId(passengerId);
            return result;
        /*} else {
            throw new RuntimeException("Incorrect userId");
        }*/
    }

    @PostMapping("/passenger/points")
    public List<DriveVO> getDriveByStartPoint(@RequestBody PathVO pathVO) {
        return driveService.getDriveByPoints(pathVO.getStartPoint(), pathVO.getEndPoint(), pathVO.getDateTime());
    }

    @GetMapping("/passenger/startTime/{startTime}")
    public List<DriveVO> findAllByStartTime(final @PathVariable String startTime) {
        return driveService.findAllByStartTime(startTime);
    }

    @PostMapping("/driver")
    public DriveVO addDrive(@RequestBody DriveVO drive) {
        return driveService.addDrive(drive);
    }

    @PutMapping("/driver/{id}")
    public DriveVO updateDrive(@PathVariable Long id, @RequestBody String path) {
       return driveService.updateDrive(id, path);
    }

    @DeleteMapping("/driver/{id}")
    public void delete(final @PathVariable Long id) {
        driveService.deleteById(id);
    }

}
