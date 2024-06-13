package com.projects.todo.category;

import jakarta.validation.constraints.NotBlank;

public class CreateCategoryDTO {

  @NotBlank
  String name;

  @NotBlank
  String icon;

  public String getName() {
    return name;
  }

  public String getIcon() {
    return icon;
  }

}
