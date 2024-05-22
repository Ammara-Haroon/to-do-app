package com.projects.todo.task;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.projects.todo.exceptions.NotFoundException;
import com.projects.todo.exceptions.ServiceValidationException;
import jakarta.validation.Valid;

import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/tasks")
public class TaskController {

  Logger logger = LoggerFactory.getLogger(TaskController.class);
  @Autowired
  TaskService taskService;

  @PostMapping()
  public ResponseEntity<Task> createTask(@Valid @RequestBody CreateTaskDTO data) {
    Task createdTask = this.taskService.create(data);
    return new ResponseEntity<>(createdTask, HttpStatus.CREATED);
  }

  @GetMapping()
  public ResponseEntity<List<Task>> findAllTasks() {
    List<Task> allTasks = this.taskService.findAll();
    logger.info("Getting All Tasks");
    return new ResponseEntity<>(allTasks, HttpStatus.OK);
  }

  @GetMapping("/{id}")
  public ResponseEntity<Task> findTaskById(@PathVariable Long id) throws NotFoundException {
    Optional<Task> maybeTask = this.taskService.findById(id);
    Task foundTask = maybeTask.orElseThrow(() -> new NotFoundException(Task.class, id));
    logger.info(String.format("Finding Task with id %s", id));
    return new ResponseEntity<>(foundTask, HttpStatus.OK);
  }

  @PatchMapping("/{id}")
  public ResponseEntity<Task> updateTaskById(@PathVariable Long id, @Valid @RequestBody UpdateTaskDTO data)
      throws NotFoundException {
    Optional<Task> maybeTask = this.taskService.updateById(id, data);
    Task updatedTask = maybeTask.orElseThrow(() -> new NotFoundException(Task.class, id));
    logger.info(String.format("Updating Task with id %s", id));
    return new ResponseEntity<>(updatedTask, HttpStatus.OK);

  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteTaskById(@PathVariable Long id) throws NotFoundException {
    try {
      this.taskService.deleteById(id);
    } catch (ServiceValidationException e) {
      throw new NotFoundException(Task.class, id);
    }
    logger.info(String.format("Deleting Task with id %s", id));
    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
  }
}
