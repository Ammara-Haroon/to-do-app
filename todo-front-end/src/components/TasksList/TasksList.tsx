
import TaskCard from '../TaskCard/TaskCard'
import { deleteTask, overwriteTask, updateTask } from '../../services/task-services';
import { useEffect, useState } from 'react';
import {Task, TaskPartial}  from '../../services/api-responses.interface';

interface TasksListProps {
  taskList: Task[];
  // editTask: (id:number,updatesToTask:TaskPartial)=>void;
  // deleteTask: (id:number)=>void;
}

const TasksList = ({taskList}:TasksListProps) => {
const [tasks,setTasks] = useState<Task[]>([]);
useEffect(()=>{
  setTasks(taskList);
},[taskList]);
  const handleEdit = (id:number,updatesToTask:TaskPartial) =>{
    const index = tasks.findIndex(tsk=>tsk.id==id);
    Object.assign(tasks[index],updatesToTask);  
    updateTask(id,updatesToTask);
  }
  const handleDelete = (id:number) =>{
    setTasks(tasks.filter(task=>task.id !== id));
    deleteTask(id);
  }
  const handleOverwrite = (id:number,updatesToTask:TaskPartial) =>{
    const index = tasks.findIndex(tsk=>tsk.id==id);
    Object.assign(tasks[index],updatesToTask); 
    overwriteTask(id,updatesToTask);

  }
  return (
    <div className='w-full border border-rose-300 overflow-y-auto '>
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          handleOverwrite={handleOverwrite}
        />
      ))}
      {tasks.length===0 && <p className='m-2 text-slate-500 text-sm text-center'>No tasks here</p>}
  </div>)
}

export default TasksList