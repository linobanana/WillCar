package com.exadel.carpoolfree.controller;

import com.exadel.carpoolfree.model.Mark;
import com.exadel.carpoolfree.repository.MarkRepository;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/mark")
public class MarkController {

    private final MarkRepository markRepository;

    public MarkController(MarkRepository markRepository) {
        this.markRepository = markRepository;
    }

    @PostMapping()
    public Mark addMark(@RequestBody Mark mark) {
        return markRepository.save(mark);
    }

}
