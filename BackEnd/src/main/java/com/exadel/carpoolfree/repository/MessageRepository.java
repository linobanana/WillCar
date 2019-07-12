package com.exadel.carpoolfree.repository;

import com.exadel.carpoolfree.model.Message;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MessageRepository extends JpaRepository<Message, Long> {
}
