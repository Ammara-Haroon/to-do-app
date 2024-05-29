import { Task, TaskPartial } from "./api-responses.interface";
import { baseUrl } from "./api-config";
import dayjs from "dayjs";
//import { BlogFormData } from "../components/BlogPostForm/schema";

export interface QueryParams {
  isCompleted?:boolean,
  categoryId?:number,
  sortBy?:string,
  sortOrder?:string
}
const getQueryString = (queryParams:QueryParams):string=>{
  let queryString = "";
  if(queryParams.isCompleted) {
    queryString += `isCompleted=${queryParams.isCompleted}`;
  }
  if(queryParams.categoryId) {
    queryString += `&categoryId=${queryParams.categoryId}`;
  }
  if(queryParams.sortBy) {
    queryString += `&sortBy=${queryParams.sortBy}`;
  }
  if(queryParams.sortOrder) {
    queryString += `&sortOrder=${queryParams.sortOrder}`;
  }
  
  if(queryString) {
    queryString = "?" + queryString;
  }
  return queryString;
}
export const getAllTasks = async (queryParams:QueryParams): Promise<Task[]> => {
  console.log("bringing queryparams",getQueryString(queryParams));
  const response = await fetch(`${baseUrl}/tasks${getQueryString(queryParams)}`);
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
  console.log("updating task to" ,data);
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

export const overwriteTask = async (
  id:number,data: TaskPartial
): Promise<Task> => {
  console.log("updating task to" ,data);
  const response = await fetch(`${baseUrl}/tasks/${id}`, {
    method: "PUT",
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
  if(data?.description){
    task.description = data.description;
  }
  if(data?.isCompleted){
    task.isCompleted = data.isCompleted?.toString() === "on";
  }
  if(data?.category && parseInt(data.category)){
    task.categoryId = parseInt(data.category);
  }
  if(data?.dueDate){
    const dateStr = data.dueDate.split("/");
    task.dueDate = new Date(parseInt(dateStr[2]),parseInt(dateStr[1])-1,parseInt(dateStr[0]));
  }
  return task;
}

export const fillTask = (data:any):TaskPartial =>{
  const task:TaskPartial = {};
  
  if(data?.description){
    task.description = data.description;
  } 
  if(data?.isCompleted){
    task.isCompleted = data.isCompleted?.toString() === "on";
  } else {
    data.isCompleted = false;
  }
  if(data?.category && parseInt(data.category)){
    task.categoryId = parseInt(data.category);
  } else {
    task.categoryId = null;
  }
  if(data?.dueDate){
    const dateStr = data.dueDate.split("/");
    task.dueDate = new Date(parseInt(dateStr[2]),parseInt(dateStr[1])-1,parseInt(dateStr[0]));
  } else {
    task.dueDate = null;
  }
  return task;
}

