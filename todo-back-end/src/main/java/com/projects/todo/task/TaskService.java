package com.projects.todo.task;

import java.util.List;
import java.util.Optional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.projects.todo.category.Category;
import com.projects.todo.category.CategoryService;
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

  @Autowired
  private CategoryService categoryService;

  public Task create(CreateTaskDTO data) throws ServiceValidationException {
    Task newTask = mapper.map(data, Task.class);
    ValidationErrors errors = new ValidationErrors();
    Long categoryId = data.getCategoryId();
    if (categoryId != null) {
      Optional<Category> maybeCategory = this.categoryService.findById(categoryId);
      if (maybeCategory.isEmpty()) {
        errors.addError("category", String.format("Category with id %s does not exist", categoryId));
      } else {
        newTask.setCategory(maybeCategory.get());
      }
    }
    if (errors.hasErrors()) {
      throw new ServiceValidationException(errors);
    }
    return this.repo.save(newTask);

  }

  public List<Task> findAll(Long categoryId, SortBy sortBy, SortOrder sortOrder) {
    Sort sort = Sort.by("isCompleted").ascending();
    if (sortBy != null) {
      if (sortOrder.equals(SortOrder.ASC)) {
        sort = sort.and(Sort.by(sortBy.toString()).ascending());
      } else {
        sort = sort.and(Sort.by(sortBy.toString()).descending());
      }
    } else {
      sort = sort.and(Sort.by(SortBy.updatedAt.toString()).descending());
    }

    if (categoryId == null) {
      return this.repo.findAll(sort);
    }

    return this.repo.findByCategoryId(categoryId, sort);
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

  public Task updateById(Long id, UpdateTaskDTO data) throws ServiceValidationException {
    ValidationErrors errors = new ValidationErrors();
    Optional<Task> maybeTask = this.findById(id);
    if (maybeTask.isEmpty()) {
      errors.addError("Task", String.format("Task with id %s does not exist", id));
      throw new ServiceValidationException(errors);
    }
    Task foundTask = maybeTask.get();
    Long categoryId = data.getCategoryId();
    if (categoryId != null) {
      Optional<Category> maybeCategory = this.categoryService.findById(categoryId);
      if (maybeCategory.isEmpty()) {
        errors.addError("Category", String.format("Category with id %s does not exist", categoryId));
        throw new ServiceValidationException(errors);
      } else {
        foundTask.setCategory(maybeCategory.get());
      }
    }
    mapper.map(data, foundTask);
    Task updatedTask = this.repo.save(foundTask);
    return updatedTask;
  }

  public Task overwriteById(Long id, UpdateTaskDTO data) throws ServiceValidationException {
    ValidationErrors errors = new ValidationErrors();
    Optional<Task> maybeTask = this.findById(id);
    if (maybeTask.isEmpty()) {
      errors.addError("Task", String.format("Task with id %s does not exist", id));
      throw new ServiceValidationException(errors);
    }
    Task foundTask = maybeTask.get();
    Long categoryId = data.getCategoryId();
    if (categoryId != null) {
      Optional<Category> maybeCategory = this.categoryService.findById(categoryId);
      if (maybeCategory.isEmpty()) {
        errors.addError("Category", String.format("Category with id %s does not exist", categoryId));
        throw new ServiceValidationException(errors);
      } else {
        foundTask.setCategory(maybeCategory.get());
      }
    } else {
      foundTask.setCategory(null);
    }
    mapper.map(data, foundTask);
    if (data.getDueDate() == null) {
      foundTask.dueDate = null;
    }
    Task updatedTask = this.repo.save(foundTask);
    return updatedTask;
  }
}