import { FormEvent, useEffect, useRef, useState } from "react";
import { createTask, getAllTasks } from "../services/task-services";
import { Task ,TaskPartial} from "../services/api-responses.interface";
import TasksList from "../components/TasksList/TasksList";
import { faAdd, faTag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TaskForm from "../components/TaskForm/TaskForm";

const TasksPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [openModal,setOpenModal] = useState(false);
  const inputRef = useRef<null | HTMLInputElement>(null);
  useEffect(() => {
    getAllTasks()
      .then((data) => setTasks(data))
      .catch((e) => console.warn(e));
  }, []);
  const handleCreate = (data:FormData):void => {
    const newTask:TaskPartial = Object.fromEntries(data.entries());
    createTask(newTask)
      .then(task=>tasks.push(task));
    
    //e.preventDefault();
    //const formValues = formRef?.current;
    //if(formValues){
      // const taskData:TaskPartial ={"description":"","isCompleted":false};
      // const formData = new FormData(formValues); 
      // if(formData){
      //   taskData.description = formData.get("description")?.toString();
      //   taskData.isCompleted = formData?.get("isCompleted")==="on";
        
        // createTask(taskData)
        // .then(task=>{
        //   tasks.push(task); 
        // });
        
      //}
   //   formRef?.current?.submit();
    //}
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

  return (
  <>
    <div className="p-2 min-h-screen w-4/5 border rounded-lg flex-column  bg-stone-100">
      <h1 className="text-xl md:text-4xl font-mono italic text-rose-500 p-2 text-center">To Do List</h1>
      <TasksList taskList = {tasks}/>
      <form className="flex bg-rose-500 p-2 sticky bottom-0 w-full"  onSubmit={handleAddNew}>
        <input className="w-11/12 px-1" name="description" ref={inputRef} type="text" maxLength={200} placeholder="new task..."/>
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
  );
};

export default TasksPage;


