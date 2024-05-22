import { useEffect, useRef, useState } from "react";
import { createTask, getAllTasks } from "../services/task-services";
import { Task ,TaskPartial} from "../services/api-responses.interface";
import TasksList from "../components/TasksList/TasksList";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TasksPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const formRef = useRef<null | HTMLFormElement>(null);
  useEffect(() => {
    getAllTasks()
      .then((data) => setTasks(data))
      .catch((e) => console.warn(e));
  }, []);
  const handleCreate = (e:React.FormEvent):void => {
    e.preventDefault();
    const formValues = formRef?.current;
    if(formValues){
      const taskData:TaskPartial ={"description":""};
      const inputValue = new FormData(formValues).get("description")?.toString(); 
      if(inputValue){
        taskData.description = inputValue;
        createTask(taskData)
        .then(task=>{
          tasks.push(task); 
        });
        
      }
      formRef?.current?.submit();
    }
  };
  return (
    <div className="p-2 min-h-screen w-4/5 border rounded-lg flex-column  bg-stone-100">
      <h1 className="text-xl md:text-4xl font-mono italic text-rose-500 p-2 text-center">To Do List</h1>
      <TasksList taskList = {tasks}/>
      <form className="bg-rose-500 p-2 sticky bottom-0 w-full" ref={formRef} onSubmit={handleCreate}>
        <input className="w-11/12" name="description" type="text" maxLength={200} placeholder="new task..."/>
        <button className="px-2" type="submit">
          <FontAwesomeIcon icon={faAdd} size="lg"/>
        </button></form>
    </div>
  );
};

export default TasksPage;