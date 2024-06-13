package com.projects.todo.task;

import java.util.Date;

import org.springframework.beans.factory.annotation.Value;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.projects.todo.category.Category;

import jakarta.annotation.Nullable;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import jakarta.validation.constraints.Min;

@Entity()
@Table(name = "task")
public class Task {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  Long id;

  @Column(nullable = false)
  String description;

  @Column(nullable = false)
  boolean isCompleted;

  @Column(nullable = true)
  @Temporal(TemporalType.TIMESTAMP)
  Date updatedAt;

  public Date getDueDate() {
    return dueDate;
  }

  public void setDueDate(Date dueDate) {
    this.dueDate = dueDate;
  }

  @Column(nullable = false)
  @Temporal(TemporalType.TIMESTAMP)
  Date createdAt;

  @Column(nullable = true)
  @Temporal(TemporalType.TIMESTAMP)
  Date dueDate;

  @ManyToOne()
  @JoinColumn(name = "category_id", nullable = true)
  @JsonIgnoreProperties("posts")
  private Category category;

  public Category getCategory() {
    return category;
  }

  public void setCategory(Category category) {
    this.category = category;
  }

  @Override
  public String toString() {
    return "Task [id=" + id + ", description=" + description + ", isCompleted=" + isCompleted + ", updatedAt="
        + updatedAt + ", createdAt=" + createdAt + ", dueDate=" + dueDate + ", category=" + category + "]";
  }

  public Long getId() {
    return id;
  }

  public String getDescription() {
    return description;
  }

  public boolean getIsCompleted() {
    return isCompleted;
  }

  public Date getCreatedAt() {
    return createdAt;
  }

  public Date getUpdatedAt() {
    return updatedAt;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public void setIsCompleted(boolean isCompleted) {
    this.isCompleted = isCompleted;
  }

  @PrePersist
  public void onCreate() {
    Date timeStamp = new Date();
    createdAt = timeStamp;
    updatedAt = timeStamp;
    isCompleted = false;

  }

  @PreUpdate
  public void onUpdate() {
    updatedAt = new Date();
  }
}
