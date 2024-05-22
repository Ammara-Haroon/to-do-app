package com.projects.todo.task;

import jakarta.validation.constraints.Pattern;

public class UpdateTaskDTO {
  @Pattern(regexp = ".*\\S.*", message = "Description cannot be empty")
  String description;

  boolean isCompleted;

  @Override
  public String toString() {
    return "UpdateTaskDTO [description=" + description + ", isCompleted=" + isCompleted + "]";
  }

  public String getDescription() {
    return description;
  }

  public boolean getIsCompleted() {
    return isCompleted;
  }

}
