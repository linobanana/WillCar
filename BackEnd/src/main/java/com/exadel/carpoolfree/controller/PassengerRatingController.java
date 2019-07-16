package com.exadel.carpoolfree.controller;

import com.exadel.carpoolfree.model.PassengerRating;
import com.exadel.carpoolfree.repository.PassengerRatingRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/passenger-rating")
public class PassengerRatingController {
    private final PassengerRatingRepository passengerRatingRepository;

    public PassengerRatingController(PassengerRatingRepository
                                             passengerRatingRepository){
        this.passengerRatingRepository = passengerRatingRepository;
    }

    @PostMapping()
    public PassengerRating addMarkForPassenger(@RequestBody PassengerRating rating)
    {
        return passengerRatingRepository.save(rating);
    }
}
