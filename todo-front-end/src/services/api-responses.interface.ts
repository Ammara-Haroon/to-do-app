export interface TaskPartial {
  isCompleted?: boolean;
  id?: number;
  createdAt?: string;
  updatedAt?: string;
  description?: string;
  categoryId? : number|null;
  dueDate?: Date|null;
  category?:Category|null;
}
export interface Task{
  isCompleted: boolean;
  id: number;
  createdAt: string;
  updatedAt: string;
  description: string;
  category : Category;
  dueDate: Date
}

export interface Category{
  name: string;
  icon:string;
  id:number;
}




