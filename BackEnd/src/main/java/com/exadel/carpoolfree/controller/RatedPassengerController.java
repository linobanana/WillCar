package com.exadel.carpoolfree.controller;

import com.exadel.carpoolfree.model.RatedPassenger;
import com.exadel.carpoolfree.repository.RatedPassengerRepository;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/passenger-rating")
public class RatedPassengerController {
    private final RatedPassengerRepository ratedPassengerRepository;

    public RatedPassengerController(RatedPassengerRepository
                                            ratedPassengerRepository){
        this.ratedPassengerRepository = ratedPassengerRepository;
    }

    @PostMapping()
    public RatedPassenger addMarkForPassenger(@RequestBody RatedPassenger rating)
    {
        return ratedPassengerRepository.save(rating);
    }
}
