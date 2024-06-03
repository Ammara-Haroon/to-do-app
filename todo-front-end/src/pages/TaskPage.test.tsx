import { describe, expect, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import TasksPage from "./TasksPage";
import "@testing-library/jest-dom";
import * as taskServices from "../services/task-services";
import * as categoryServices from "../services/category-services";
import { Task } from "../services/api-responses.interface";

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

const testCategories = [
  {
    id: 6,
    name: "Home",
    icon: "/src/assets/home-icon.png",
  },
  {
    id: 3,
    name: "Office",
    icon: "/src/assets/briefcase-icon.png",
  },
  {
    id: 9,
    name: "Shopping",
    icon: "/src/assets/basket-icon.png",
  },
  {
    id: 8,
    name: "Urgent",
    icon: "/src/assets/siren-icon.png",
  },
];

describe("Tasks Test", () => {
  it("Should display a loading spinner while loading tasks", () => {
    const spyGetTasks = vi.spyOn(taskServices, "getAllTasks");
    spyGetTasks.mockResolvedValue(testTasks);

    render(<TasksPage />);

    const loadingSpinner = screen.getByTestId("spinner");
    expect(loadingSpinner).toBeInTheDocument();
  });
  it("Should display basic elements and all the tasks on the page after loading", () => {
    const spyGetTasks = vi.spyOn(taskServices, "getAllTasks");
    spyGetTasks.mockResolvedValue(testTasks);

    render(<TasksPage />);

    const loadingSpinner = screen.getByTestId("spinner");
    expect(loadingSpinner).toBeInTheDocument();

    waitFor(() => {
      expect(loadingSpinner).not.toBeInTheDocument();
      const insertionForm = screen.getByPlaceholderText("\\new task\\i");
      expect(insertionForm).toBeInTheDocument();
      expect(screen.getByText("\\All\\i")).toBeInTheDocument();

      expect(screen.getAllByRole("TaskCard").length).toBe(testTasks.length);
    });
  });

  it("Should display No tasks here if there are no tasks", () => {
    const spyGetTasks = vi.spyOn(taskServices, "getAllTasks");
    spyGetTasks.mockResolvedValue([]);

    render(<TasksPage />);

    waitFor(() => {
      expect(screen.getAllByText("No tasks herei")).toBeInTheDocument;
    });
  });
});
describe("Categories Tests", () => {
  it("Should display the name of all categories and 'All'", () => {
    const spyGetTasks = vi.spyOn(categoryServices, "getAllCategories");
    spyGetTasks.mockResolvedValue(testCategories);

    render(<TasksPage />);

    waitFor(() => {
      expect(screen.getByText("\\All\\i")).toBeInTheDocument();
      testCategories.forEach((cat) =>
        expect(screen.getByAltText(cat.name)).toBeInTheDocument()
      );
    });
  });
});
