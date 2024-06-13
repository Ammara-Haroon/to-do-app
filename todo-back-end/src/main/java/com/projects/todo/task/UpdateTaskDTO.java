package com.projects.todo.task;

import java.util.Date;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Pattern;

public class UpdateTaskDTO {
  @Pattern(regexp = ".*\\S.*", message = "Description cannot be empty")
  String description;

  boolean isCompleted;

  private Long categoryId;

  private Date dueDate;

  public Date getDueDate() {
    return dueDate;
  }

  @Override
  public String toString() {
    return "UpdateTaskDTO [description=" + description + ", isCompleted=" + isCompleted + ", categoryId=" + categoryId
        + ", dueDate=" + dueDate + "]";
  }

  public String getDescription() {
    return description;
  }

  public boolean getIsCompleted() {
    return isCompleted;
  }

  public Long getCategoryId() {
    return categoryId;
  }

}
