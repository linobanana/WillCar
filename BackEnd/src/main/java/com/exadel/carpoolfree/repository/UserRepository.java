package com.exadel.carpoolfree.repository;

import com.exadel.carpoolfree.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByLogin(String login);
}
