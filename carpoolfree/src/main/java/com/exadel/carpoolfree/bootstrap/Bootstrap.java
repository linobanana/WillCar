package com.exadel.carpoolfree.bootstrap;

import com.exadel.carpoolfree.model.Driver;
import com.exadel.carpoolfree.repository.DriverRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.ArrayList;
import java.util.List;

@Configuration
@Slf4j
public class Bootstrap {

    @Bean
    CommandLineRunner initDatabase(DriverRepository driverRepository) {
        return args -> {
            log.debug("Loading Bootstrap Data ...");

            List<Driver> drivers = new ArrayList<>(driverRepository.findAll());
            log.debug("Drivers before save: {}", drivers.toString());

            Driver saved = driverRepository.save(new Driver("Uladzimir", "Chernitsky", "Mazda 6"));
            log.debug("Drivers saved: {}", saved.toString());

            drivers = new ArrayList<>(driverRepository.findAll());
            log.debug("Drivers after save: {}", drivers.toString());
        };
    }
}
