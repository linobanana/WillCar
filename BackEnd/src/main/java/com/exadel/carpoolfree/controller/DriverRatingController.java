package com.exadel.carpoolfree.controller;

import com.exadel.carpoolfree.model.DriverRating;
import com.exadel.carpoolfree.repository.DriverRatingRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/driver-rating")
public class DriverRatingController {
    private final DriverRatingRepository driverRatingRepository;

    public DriverRatingController(DriverRatingRepository
                                             driverRatingRepository){
        this.driverRatingRepository = driverRatingRepository;
    }

    @PostMapping()
    public DriverRating addMarkForDriver(@RequestBody DriverRating rating)
    {
        return driverRatingRepository.save(rating);
    }
}
