package com.projects.todo.category;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public class UpdateCategoryDTO {

  @Pattern(regexp = ".*\\S.*", message = "name cannot be empty")
  String name;

  @Pattern(regexp = ".*\\S.*", message = "icon cannot be empty")
  String icon;

  public String getName() {
    return name;
  }

  public String getIcon() {
    return icon;
  }

}
