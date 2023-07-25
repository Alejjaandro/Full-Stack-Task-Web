import { useForm } from 'react-hook-form';
import { useTasks } from '../context/TaskContext';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';

export default function TaskForm() {

  const { register, handleSubmit, setValue } = useForm();
  const navigate = useNavigate();
  const { createTask, getTask, updateTask } = useTasks();
  
  // This save the param "id" of a task. We will use it to edit it. 
  const params = useParams();

  // This send a petition to get the task with the param.id.
  useEffect( () => {
    async function loadTask() {
      if (params.id) {
        const task = await getTask(params.id);
        console.log(task);
        // This sets the fields values of the form with the name indicated to those of the task:
        // setValue("imputName", value);
        setValue('title', task.title);
        setValue('description', task.description);
      }  
    }

    loadTask();
  }, [])

  const onSubmit = handleSubmit((data) => {
    // If params.id exist then make an update, if not, then create a task.
    if (params.id) {
      // Receive the "param.id" of the task and the "data" that the form has updated on submit.
      updateTask(params.id, data);
    } else {
      createTask(data);
    }

    navigate("/tasks");  
  });

  return (
    <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>
      <form onSubmit={onSubmit}>

        <input
          type="text"
          placeholder='Title'
          {...register('title')}
          className='w-full bg-zinc-700 text-white px-4 py-2 my-2 rounded-md'
          autoFocus
        />

        <textarea
          rows="3"
          placeholder='Description'
          {...register('description')}
          className='w-full bg-zinc-700 text-white px-4 py-2 my-2 rounded-md'
        ></textarea>

        <button className="bg-indigo-500 px-4 py-1 rounded-sm">Save Task</button>

      </form>
    </div>
  )
}
