package com.to_do_list.controllers;

import com.to_do_list.entities.Task;
import com.to_do_list.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/adminuser/tasks")
public class TaskController {

    private final TaskService taskService;

    @Autowired
    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping
    public ResponseEntity<List<Task>> getAllTasks() {
        List<Task> tasks = taskService.getAllTasks();
        return ResponseEntity.ok(tasks);
    }

    @GetMapping("/user/{email}")
    public ResponseEntity<List<Task>> getTasksByUserEmail(@PathVariable String email) {

        // Validate the email
        if (!isValidEmail(email)) {
            return ResponseEntity.badRequest().body(null); // Return bad request if the email is invalid
        }

        List<Task> tasks = taskService.getTasksByUserEmail(email);
        if (tasks == null) {
            return ResponseEntity.notFound().build(); // Return not found if no tasks are found for the email
        }
        return ResponseEntity.ok(tasks);
    }

    // Validate email method
    private boolean isValidEmail(String email) {
        return email != null && email.matches("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$");
    }

    @GetMapping("/{id}")
    public ResponseEntity<Task> getTaskById(@PathVariable String id) {
        if (id == null || !id.matches("\\d+") || Long.parseLong(id) <= 0) {
            return ResponseEntity.badRequest().body(null);
        }
        Long taskId = Long.parseLong(id);
        Optional<Task> taskOptional = taskService.getTaskById(taskId);
        return taskOptional.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Task> createTask(@RequestBody Task task) {
        if (task.getId() != null) {
            return ResponseEntity.badRequest().build();
        }
        Task savedTask = taskService.saveTask(task);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedTask);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Task> updateTask(@PathVariable Long id, @RequestBody Task task) {
        if (!id.equals(task.getId())) {
            return ResponseEntity.badRequest().build();
        }
        Optional<Task> existingTaskOptional = taskService.getTaskById(id);
        if (existingTaskOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        Task updatedTask = taskService.saveTask(task);
        return ResponseEntity.ok(updatedTask);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id) {
        Optional<Task> existingTaskOptional = taskService.getTaskById(id);
        if (existingTaskOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        taskService.deleteTask(id);
        return ResponseEntity.noContent().build();
    }
}