package com.to_do_list.repository;

import com.to_do_list.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

/**
 * Repository interface for {@link User} entities. Extends JpaRepository to provide
 * standard CRUD operations on User entities.
 */
public interface UserRepo extends JpaRepository<User, Integer> {

    /**
     * Finds a user by their email address.
     */
    Optional<User> findByEmail(String email);

}