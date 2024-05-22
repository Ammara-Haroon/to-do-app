package com.projects.todo.task;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

@Entity()
@Table(name = "task")
public class Task {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  Long id;

  @Column
  String description;

  @Column
  boolean isCompleted;

  @Override
  public String toString() {
    return "Task [id=" + id + ", description=" + description + ", isCompleted=" + isCompleted + ", createdAt="
        + createdAt + ", updatedAt=" + updatedAt + "]";
  }

  @Column
  @Temporal(TemporalType.TIMESTAMP)
  Date createdAt;

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

  @Column
  @Temporal(TemporalType.TIMESTAMP)
  Date updatedAt;

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
