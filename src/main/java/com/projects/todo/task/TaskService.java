package com.projects.todo.task;

import java.util.List;
import java.util.Optional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.projects.todo.exceptions.ServiceValidationException;
import com.projects.todo.exceptions.ValidationErrors;
import jakarta.transaction.Transactional;

@Service
@Transactional
public class TaskService {
  @Autowired
  private ModelMapper mapper;

  @Autowired
  private TaskRepository repo;

  public Task create(CreateTaskDTO data) {
    Task newTask = mapper.map(data, Task.class);
    return this.repo.save(newTask);
  }

  public List<Task> findAll() {
    return this.repo.findAll();
  }

  public Optional<Task> findById(Long id) {
    return this.repo.findById(id);
  }

  public void deleteById(Long id) throws ServiceValidationException {
    ValidationErrors errors = new ValidationErrors();
    Optional<Task> maybeTask = this.findById(id);
    if (maybeTask.isEmpty()) {
      errors.addError("Task", String.format("Task with id %s does not exist", id));
      throw new ServiceValidationException(errors);
    }
    this.repo.delete(maybeTask.get());
  }

  public Optional<Task> updateById(Long id, UpdateTaskDTO data) {
    Optional<Task> maybeTask = this.findById(id);
    if (maybeTask.isEmpty()) {
      return maybeTask;
    }

    Task foundTask = maybeTask.get();
    mapper.map(data, foundTask);
    Task updatedTask = this.repo.save(foundTask);
    return Optional.of(updatedTask);
  }

}