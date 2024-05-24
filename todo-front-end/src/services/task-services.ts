import { Task, TaskPartial } from "./api-responses.interface";
import { baseUrl } from "./api-config";
import dayjs from "dayjs";
//import { BlogFormData } from "../components/BlogPostForm/schema";

export const getAllTasks = async (): Promise<Task[]> => {
  const response = await fetch(baseUrl + "/tasks");
  if (!response.ok) {
    throw new Error("Failed to fetch all tasks");
  }
  const data = await response.json();
  return data;
};

export const getTaskById = async (
  id: number
): Promise<Task> => {
  const response = await fetch(`${baseUrl}/tasks/${id}`);
  if (!response.ok) {
    console.log(response.status);
    throw new Error("Failed to fetch task");
  }
  return await response.json();
};

export const createTask = async (
  data: TaskPartial
): Promise<Task> => {
  console.log("sending");

  console.log(data);
  const response = await fetch(baseUrl + "/tasks", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    console.log(response.status);
    throw new Error("Failed to create task");
  }
  return await response.json();
};

export const deleteTask = async (
  id: number
): Promise<void> => {
  const response = await fetch(`${baseUrl}/tasks/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    console.log(response.status);
    throw new Error("Failed to delete task");
  }
  
};

export const updateTask = async (
  id:number,data: TaskPartial
): Promise<Task> => {
  const response = await fetch(`${baseUrl}/tasks/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    console.log(response.status);
    throw new Error("Failed to update task");
  }
  return await response.json();
};

export const mapObjectToTaskPartial = (data:any):TaskPartial =>{
  const task:TaskPartial = {};
  if(data.hasOwnProperty("description")){
    task.description = data.description;
  }
  if(data.hasOwnProperty("isCompleted")){
    task.isCompleted = data.isCompleted?.toString() === "on";
  }
  if(data.hasOwnProperty("category")){
    task.categoryId = parseInt(data.category);
  }
  if(data.hasOwnProperty("dueDate")){
    const dateStr = data.dueDate.split("/");
    console.log(dateStr,parseInt(dateStr[2]),parseInt(dateStr[1]),parseInt(dateStr[0]));
    console.log(new Date(parseInt(dateStr[2]),parseInt(dateStr[1]),parseInt(dateStr[0])));

    task.dueDate = new Date(parseInt(dateStr[2]),parseInt(dateStr[1])-1,parseInt(dateStr[0]));
  }
  return task;
}