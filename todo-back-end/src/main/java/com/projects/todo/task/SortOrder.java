package com.projects.todo.task;

public enum SortOrder {
  ASC("ASC"),
  DESC("DESC");

  public final String label;

  private SortOrder(String label) {
    this.label = label;
  }
}
