import { Task, TaskPartial } from "../../services/api-responses.interface"
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { FormEvent, useRef, useState } from "react";
dayjs.extend(relativeTime);

interface TaskFormProps {
  mode:string,
  task:Task | TaskPartial | null,
  closeForm():void,
  saveTask(data:FormData):void
}

const TaskForm = ({mode, task, closeForm, saveTask}:TaskFormProps) => {
  const [isCompleted,setIsCompleted] = useState(task?.isCompleted);
  let descriptionStyleClass = "resize-none w-11/12 text-ellipsis px-2 text-lg text-rose-400 text-ellipsis";
  descriptionStyleClass += isCompleted ? " line-through" : "";
  const handleIsCompleted = ()=>{
    setIsCompleted(!isCompleted);
  }
  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    console.log(mode);
    saveTask(new FormData(event.currentTarget));
    
    // if(task && mode === "edit") {
    //   const formData = new FormData(event.currentTarget);
    //   task.description = formData.get("description")?.toString() ?? "";
    //   task.isCompleted = formData.get("isCompleted") === "on";
    //   //add category change
    //   saveTask(task);
    // } else {
    //   // const formData = new FormData(event.currentTarget);
    //   // const newTask:TaskPartial ={"description":"","isCompleted":false};
    //   // if(formData){
    //   //   newTask.description = formData.get("description")?.toString();
    //   //   newTask.isCompleted = formData.get("isCompleted")==="on";
    //   //   //add category change
    //   //   saveTask(newTask);
    //   saveTask()
    // }
    // //closeForm();
  }

  return (
  <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
      <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
          <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 w-full text-center sm:ml-4 sm:mt-0 sm:text-left">
                <h2 className="font-bold text-rose-600" id="modal-title">{mode === "edit" ? "Edit task" : "Add task"}</h2>
                <div className="mt-2">
                  <form onSubmit={handleSubmit} className='flex-column items-start w-full'>
                      <div className='w-full flex'>
                        {mode === "edit" && <input  className="m-2 self-start" type="checkbox"  name="isCompleted" id="isCompleted" defaultChecked={task?.isCompleted} onChange={handleIsCompleted}/>}
                        <textarea placeholder="new task ..." className={descriptionStyleClass} name="description" id="description" defaultValue={task?.description}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-semibold text-rose-600" htmlFor="category">Select category: </label>
                        <select className="text-rose-500 text-sm" defaultValue = {"Home"} name="category" id="category">
                          <option value="Home">Home</option>
                          <option value="Work">Work</option>
                          <option value="Social">Social</option>
                          <option value="Grocery">Grocery</option>
                        </select>
                      </div>
                      <p className='pt-2 text-sm text-slate-500'>Created At: {dayjs(task?.createdAt).format("HH:MM A DD/MM/YYYY")}</p>
                      <p className='text-sm text-slate-500'>Last Updated: {dayjs(task?.updatedAt).format("HH:MM A DD/MM/YYYY")}</p>
                      <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                        <button type="submit"  className="inline-flex w-full justify-center rounded-md  px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto bg-rose-500">Save</button>
                        <button onClick={closeForm} type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Cancel</button>
                      </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default TaskForm;