package com.projects.todo.task;

public enum SortBy {
  categoryId("categoryId"),
  description("description"),
  isCompleted("isCompleted"),
  updatedAt("updatedAt"),
  createdAt("createdAt"),
  dueDate("dueDate");

  public final String label;

  private SortBy(String label) {
    this.label = label;
  }

  String valueOf(SortBy label) {
    return label.toString();
  }
}
