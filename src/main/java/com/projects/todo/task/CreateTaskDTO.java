package com.projects.todo.task;

import jakarta.validation.constraints.NotBlank;

public class CreateTaskDTO {
  @NotBlank
  String description;

  @Override
  public String toString() {
    return "CreateTaskDTO [description=" + description + ", getDescription()=" + getDescription() + ", getClass()="
        + getClass() + ", hashCode()=" + hashCode() + ", toString()=" + super.toString() + "]";
  }

  public String getDescription() {
    return description;
  }

}
