import { describe, expect, it } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import TasksList from "./TasksList";

import "@testing-library/jest-dom";
import { Task } from "../../services/api-responses.interface";

const testTasks: Task[] = [
  {
    id: 71,
    description: "Water Plants",
    isCompleted: false,
    updatedAt: "2024-05-31T02:13:36.723+00:00",
    createdAt: "2024-05-30T04:17:23.427+00:00",
    dueDate: new Date("2024-05-29T14:00:00.000+00:00"),
    category: null,
  },
  {
    id: 74,
    description: "Eggs",
    isCompleted: false,
    updatedAt: "2024-05-30T04:26:12.325+00:00",
    createdAt: "2024-05-30T04:26:12.325+00:00",
    dueDate: null,
    category: {
      id: 9,
      name: "Shopping",
      icon: "/src/assets/basket-icon.png",
    },
  },
  {
    id: 72,
    description: "Do coding",
    isCompleted: false,
    updatedAt: "2024-05-30T04:22:37.693+00:00",
    createdAt: "2024-05-30T04:22:37.693+00:00",
    dueDate: null,
    category: null,
  },
  {
    id: 67,
    description: "Call Mum",
    isCompleted: false,
    updatedAt: "2024-05-30T04:16:57.807+00:00",
    createdAt: "2024-05-29T01:07:40.483+00:00",
    dueDate: null,
    category: {
      id: 8,
      name: "Urgent",
      icon: "/src/assets/siren-icon.png",
    },
  },
  {
    id: 70,
    description: "Work on project",
    isCompleted: false,
    updatedAt: "2024-05-30T04:16:39.071+00:00",
    createdAt: "2024-05-30T04:16:39.071+00:00",
    dueDate: new Date("2024-06-13T14:00:00.000+00:00"),
    category: {
      id: 3,
      name: "Office",
      icon: "/src/assets/briefcase-icon.png",
    },
  },
  {
    id: 73,
    description: "Bread",
    isCompleted: true,
    updatedAt: "2024-05-30T04:28:50.165+00:00",
    createdAt: "2024-05-30T04:25:30.900+00:00",
    dueDate: null,
    category: {
      id: 9,
      name: "Shopping",
      icon: "/src/assets/basket-icon.png",
    },
  },
  {
    id: 69,
    description: "Buy Milk",
    isCompleted: true,
    updatedAt: "2024-05-30T04:28:48.556+00:00",
    createdAt: "2024-05-30T02:04:16.088+00:00",
    dueDate: new Date("2024-06-01T14:00:00.000+00:00"),
    category: {
      id: 9,
      name: "Shopping",
      icon: "/src/assets/basket-icon.png",
    },
  },
];

describe("TasksList Tests", () => {
  it("Should display all tasks", () => {
    render(<TasksList taskList={testTasks} />);
    testTasks.forEach((tsk) =>
      expect(screen.getByText(tsk.description)).toBeInTheDocument()
    );
  });
});
