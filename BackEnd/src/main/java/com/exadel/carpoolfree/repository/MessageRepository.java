package com.exadel.carpoolfree.repository;

import com.exadel.carpoolfree.model.Message;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Long> {
    List<Message> findAllByDriveId(Long driveId);

}
