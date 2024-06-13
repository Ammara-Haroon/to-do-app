package com.projects.todo.task;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface TaskRepository extends JpaRepository<Task, Long> {

  List<Task> findByIsCompleted(Boolean isCompleted, Sort sort);

  List<Task> findByIsCompletedAndCategoryId(Boolean isCompleted, Long categoryId, Sort sort);

  List<Task> findByCategoryId(Long categoryId, Sort sort);
}