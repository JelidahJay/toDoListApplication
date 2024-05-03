package com.to_do_list.repository;

import com.to_do_list.entities.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepo extends JpaRepository<Task, Long> {

    /**
     * Custom method to find tasks by user email.
     * @param email Email address of the user.
     * @return List of tasks associated with the specified user.
     */
    List<Task> findByUserEmail(String email);
}