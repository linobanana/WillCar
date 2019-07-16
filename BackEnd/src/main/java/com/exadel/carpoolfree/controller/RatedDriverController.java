package com.exadel.carpoolfree.controller;

import com.exadel.carpoolfree.model.RatedDriver;
import com.exadel.carpoolfree.repository.RatedDriverRepository;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/driver-rating")
public class RatedDriverController {
    private final RatedDriverRepository ratedDriverRepository;

    public RatedDriverController(RatedDriverRepository
                                         ratedDriverRepository){
        this.ratedDriverRepository = ratedDriverRepository;
    }

    @PostMapping()
    public RatedDriver addMarkForDriver(@RequestBody RatedDriver rating)
    {
        return ratedDriverRepository.save(rating);
    }
}
