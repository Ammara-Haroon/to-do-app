package com.projects.todo.task;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.projects.todo.exceptions.NotFoundException;
import com.projects.todo.exceptions.ServiceValidationException;
import jakarta.validation.Valid;

import java.util.List;
import java.util.Optional;
import java.util.Locale.Category;

import javax.print.DocFlavor.STRING;

import org.apache.coyote.BadRequestException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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
  public ResponseEntity<Task> createTask(@Valid @RequestBody CreateTaskDTO data) throws BadRequestException {
    Task createdTask;
    logger.info(String.format("Created a new task %s", data.toString()));
    try {
      createdTask = this.taskService.create(data);
      logger.info(String.format("Created a new task %s", createdTask.toString()));
      return new ResponseEntity<>(createdTask, HttpStatus.CREATED);
    } catch (ServiceValidationException e) {
      throw new BadRequestException(e.generateMessage());
    }
  }

  @GetMapping()
  public ResponseEntity<List<Task>> findAllTasks(
      // @RequestParam(required = false, name = "isCompleted") Boolean isCompleted,
      @RequestParam(required = false, name = "categoryId") Long categoryId,
      @RequestParam(required = false, name = "sortBy") SortBy sortBy,
      @RequestParam(required = false, name = "sortOrder") SortOrder sortOrder) {

    // List<Task> allTasks = this.taskService.findAll(isCompleted, categoryId,
    // sortBy, sortOrder);
    List<Task> allTasks = this.taskService.findAll(categoryId, sortBy, sortOrder);

    logger.info(String.format("Getting All Tasks with categoryId=%d sortBy=%s sortOrder=%s",
        categoryId, sortBy, sortOrder));
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
      throws NotFoundException, BadRequestException {
    Task updatedTask = null;
    logger.info(String.format("Updating Task with id %s to %s", id, data));

    try {
      updatedTask = this.taskService.updateById(id, data);
    } catch (ServiceValidationException e) {
      if (e.contains("Category")) {
        throw new BadRequestException(e.generateMessage());
      }
      if (e.contains("Task")) {
        throw new NotFoundException(Task.class, id);
      }
    }
    return new ResponseEntity<>(updatedTask, HttpStatus.OK);

  }

  @PutMapping("/{id}")
  public ResponseEntity<Task> overwriteTaskById(@PathVariable Long id, @Valid @RequestBody UpdateTaskDTO data)
      throws NotFoundException, BadRequestException {
    Task updatedTask = null;
    logger.info(String.format("Updating Task with id %s to %s", id, data));

    try {
      updatedTask = this.taskService.overwriteById(id, data);
    } catch (ServiceValidationException e) {
      if (e.contains("Category")) {
        throw new BadRequestException(e.generateMessage());
      }
      if (e.contains("Task")) {
        throw new NotFoundException(Task.class, id);
      }
    }
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
