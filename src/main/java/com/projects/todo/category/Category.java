package com.projects.todo.category;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.projects.todo.task.Task;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity()
@Table(name = "category")
public class Category {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  Long id;

  @Column
  String name;

  @Column
  String icon;

  @Override
  public String toString() {
    return "Category [id=" + id + ", name=" + name + ", icon=" + icon;
  }

  @OneToMany(mappedBy = "category")
  // @JsonIgnoreProperties("category")
  private List<Task> tasks;

  public String getIcon() {
    return icon;
  }

  public void setIcon(String icon) {
    this.icon = icon;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

}
