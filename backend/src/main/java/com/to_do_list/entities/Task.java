package com.to_do_list.entities;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;

import jakarta.persistence.*;
import java.util.Date;

/**
 * Represents a task entity in the to-do list application.
 */
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "tasks", schema = "tasks")
public class Task {

    // Primary key of the table task.
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Title of the task.
    private String title;

    // Description of the task.
    private String description;

    // Due date of the task.
    private Date dueDate;

    // Indicates whether the task is completed or not.
    private boolean completed;

    /**
     * Establishes a many-to-one relationship between the tables users and tasks.
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;
}