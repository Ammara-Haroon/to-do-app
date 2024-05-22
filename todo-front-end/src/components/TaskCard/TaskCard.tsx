
import {Task, TaskPartial}  from '../../services/api-responses.interface';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faPencil, faTrash} from "@fortawesome/free-solid-svg-icons";
import TaskForm from '../TaskForm/TaskForm';
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { updateTask , mapObjectToTaskPartial} from '../../services/task-services';
dayjs.extend(relativeTime);

interface TaskCardProps {
  task: Task,
  handleEdit(id:number,updatesToTask:TaskPartial):void,
  handleDelete(id:number):void
}
const TaskCard = ({task,handleEdit,handleDelete}:TaskCardProps) => {
  const [isEditMode,setIsEditMode] = useState(false);
  const [isCompleted,setIsCompleted] = useState(task.isCompleted);
  const taskRef = useRef<null | HTMLTextAreaElement>(null);
  let descriptionStyleClass = "resize-none w-11/12 text-ellipsis px-2 text-lg text-rose-400 overflow-hidden text-ellipsis";
  descriptionStyleClass += isCompleted ? " line-through" : "";
  
  const handleIsCompleted = (e:ChangeEvent<HTMLInputElement>)=>{
    e.target.checked = !(isCompleted);
    console.log(!isCompleted);
    handleEdit(task.id,{"isCompleted":!isCompleted});
    setIsCompleted(!isCompleted);

  }
  const handleClick = ()=>{
    // if(isEditMode){
    //   handleEdit(task.id,{"description":taskRef?.current?.value});
    // }
    setIsEditMode(!isEditMode);   
  }
 
  const updateTask = (data:FormData) => {
    const dataObj:TaskPartial = Object.fromEntries(data.entries());
    const updatedTask = mapObjectToTaskPartial(dataObj);
    console.log(updatedTask);
    handleEdit(task.id,updatedTask);
    //setIsEditMode(false);   

  }
  function closeForm(): void {
    setIsEditMode(false);
  }

  return (
    <>
    <div className='w-full h-max-screen flex justify-between p-2 border'>
      <div className='flex items-start w-11/12'>
        <input className="mt-2.5" type="checkbox"  defaultChecked={task.isCompleted} onChange={handleIsCompleted} />
        <div className='w-full'>
          <p className={descriptionStyleClass}>{task.description}</p>
          <p className='px-2 text-sm text-slate-500'>{dayjs(task.createdAt).format("HH:MM A DD/MM/YYYY")}</p>
        </div>
      </div>
    <div>
      <button className="p-1 hover:shadow-lg border rounded  border-transparent hover:border-rose-500 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none" onClick={handleClick}>{isEditMode? <FontAwesomeIcon icon={faCheck} size="lg"/>:<FontAwesomeIcon icon={faPencil} size="lg"/>}
        </button>
        <button className="p-1 hover:shadow-lg border rounded  border-transparent hover:border-rose-500 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none" onClick={()=>handleDelete(task.id)}>
          <FontAwesomeIcon icon={faTrash} size="lg"/>
        </button>
      </div>
  </div>
  {isEditMode && <TaskForm mode={"edit"} task = {task} closeForm={closeForm} saveTask={updateTask}/>}
  </>
  )
}

export default TaskCard

