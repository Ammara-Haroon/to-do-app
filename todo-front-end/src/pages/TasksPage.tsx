import { ChangeEvent, FormEvent, useContext, useEffect, useRef, useState } from "react";
import { QueryParams, createTask, getAllTasks, mapObjectToTaskPartial } from "../services/task-services";
import { Task ,TaskPartial} from "../services/api-responses.interface";
import TasksList from "../components/TasksList/TasksList";
import { faAdd, faTag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TaskForm from "../components/TaskForm/TaskForm";
import CategoriesContextProvider from "../context/CategoriesContext";
import Tabs from "../components/Tabs/Tabs";
import { deleteTask } from "../services/task-services";

interface SortSelectOption {
  label:string,
  sortOrder:string,
  sortBy:string
}

const TasksPage = () => {
  const initialQuery:QueryParams = {};
  const [tasks, setTasks] = useState<Task[]>([]);
  const [openModal,setOpenModal] = useState(false);
  const inputRef = useRef<null | HTMLInputElement>(null);
  const [queryParams,setQueryParams] = useState(initialQuery); 
  const sortOptions:SortSelectOption[] = 
  [
    {label:"Last Updated ASC",sortOrder:"ASC",sortBy:"updatedAt"},
    {label:"Last Updated DESC",sortOrder:"DESC",sortBy:"updatedAt"},
    {label:"Date Created ASC",sortOrder:"ASC",sortBy:"createdAt"},
    {label:"Date Created DESC",sortOrder:"DESC",sortBy:"createdAt"},
    {label:"A-Z",sortOrder:"ASC",sortBy:"description"},
    {label:"Z-A",sortOrder:"DESC",sortBy:"description"},
    {label: "Due Date ASC",sortOrder:"ASC",sortBy:"dueDate"},
    {label:"Due Date DESC",sortOrder:"DESC",sortBy:"dueDate"}
  ];

  useEffect(() => {
    console.log("getting all tasks with query",queryParams);
    getAllTasks(queryParams)
      .then((data) => {
        setTasks(data);
        console.log(data);
      })
      .catch((e) => console.warn(e));
      
      
  }, [queryParams]);

  const handleCreate = (data:FormData):void => {
    console.log(Object.fromEntries(data.entries()));
    const newTask:TaskPartial = mapObjectToTaskPartial(Object.fromEntries(data.entries()));
    console.log(newTask);
    createTask(newTask);
      //.then(task=>tasks.push(task));
  };
  
  const openForm = (e:React.MouseEvent):void => {
    e.preventDefault();
    setOpenModal(true);
  }
  function closeForm(): void {
    setOpenModal(false);
  }
  function handleAddNew(event: FormEvent<HTMLFormElement>): void {
    handleCreate(new FormData(event.currentTarget));
  }

  const getFilteredTasks = (categoryId:number):void => {
    if(categoryId){
     setQueryParams((prev) => ({...prev, categoryId}));
    } else {
     setQueryParams((prev) => ({...prev, categoryId:undefined}));
    }
  }
  const sortTasks = (e: ChangeEvent<HTMLSelectElement>) => {
    console.log(e.currentTarget.value);
    const selected:SortSelectOption = sortOptions[parseInt(e.currentTarget.value)]; 
    setQueryParams((prev) => ({...prev, sortOrder:selected.sortOrder,sortBy:selected.sortBy}));
  }

  // const handleEdit = (id: number, updatesToTask: TaskPartial) => void {
    
  // }

  // const handleDelete = (id:number): void => {
  //   deleteTask(id);
  // }

  return (
  <CategoriesContextProvider>
    <>
    <div className="p-2 min-h-screen w-4/5 border rounded-lg flex-column  bg-stone-100">
      <h1 className="text-xl md:text-4xl font-mono italic text-rose-500 p-2 text-center">To Do List</h1>
    <Tabs handleClick={getFilteredTasks}/>
    <div className="flex justify-end">
      <label className="text-rose-500 text-sm font-semibold" htmlFor="sortOption">Sort by:</label>
    <select name="sortOption" onChange={sortTasks} className="text-rose-500 text-sm self-end">
      {sortOptions.map((op,index) => <option key={index} value={index}>{op.label}</option>)}
    </select>
    </div>
      <TasksList taskList = {tasks}/>
      <form className="flex bg-rose-500 p-2 sticky bottom-0 w-full"  onSubmit={handleAddNew}>
        <input className="w-11/12 px-1" name="description" required ref={inputRef} type="text" maxLength={200} placeholder="new task..."/>
        <div className="pl-1">
        <button className="p-1 hover:shadow-lg border rounded  border-transparent hover:border-rose-100 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none" type="submit">
          <FontAwesomeIcon icon={faAdd} size="lg"/>
        </button>
        <button className="p-1 hover:shadow-lg border rounded  border-transparent hover:border-rose-100 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none" onClick={openForm}>
          <FontAwesomeIcon icon={faTag} size="lg"/>
        </button>
        </div>
      </form>
    </div>
    {openModal && <TaskForm mode={"create"} closeForm={closeForm} task={{"description":inputRef.current?.value}} saveTask={handleCreate}/>}
  </>
  </CategoriesContextProvider>
  
  );
};

export default TasksPage;


