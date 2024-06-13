package com.projects.todo.task;

import java.util.Date;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

public class CreateTaskDTO {
  @NotBlank
  String description;

  private Long categoryId;

  private Date dueDate;

  @Override
  public String toString() {
    return "CreateTaskDTO [description=" + description + ", categoryId=" + categoryId + ", dueDate=" + dueDate + "]";
  }

  public String getDescription() {
    return description;
  }

  public Long getCategoryId() {
    return categoryId;
  }

  public Date getDueDate() {
    return dueDate;
  }

}
