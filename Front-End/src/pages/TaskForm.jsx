import { useForm } from 'react-hook-form';
import { useTasks } from '../context/TaskContext';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';

// Plugin from "dayjs" lib. to change date format.
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

export default function TaskForm() {

  const { register, handleSubmit, setValue } = useForm();
  const navigate = useNavigate();
  const { createTask, getTask, updateTask } = useTasks();

  // This save the param "id" of a task. We will use it to edit it. 
  const params = useParams();

  // This send a petition to get the task with the param.id.
  useEffect(() => {
    async function loadTask() {
      if (params.id) {
        const task = await getTask(params.id);
        console.log(task);
        // This sets the fields values of the form with the name indicated to those of the task:
        // setValue("imputName", value);
        setValue('title', task.title);
        setValue('description', task.description);
        setValue('date', dayjs(task.date).utc().format('YYYY-MM-DD'));
      }
    }

    loadTask();
  }, [])

  const onSubmit = handleSubmit((data) => {
    // In case the user decides not to set a date it will establish actual date.
    const dataValid = {
      ...data,
      date: data.date ? dayjs.utc(data.date).format() : dayjs.utc().format()
    };

    // If params.id exist then make an update, if not, then create a task.
    if (params.id) {
      // Receive the "param.id" of the task and the "data" that the form has updated on submit.
      updateTask(params.id, dataValid);
    } else {
      createTask(dataValid);
    }

    navigate("/tasks");
  });

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">

      <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>
        <form onSubmit={onSubmit}>

          <label htmlFor="title">Title</label>
          <input
            type="text"
            placeholder='Title'
            {...register('title')}
            className='w-full bg-zinc-700 text-white px-4 py-2 my-2 rounded-md'
            autoFocus
          />

          <label htmlFor="description">Description</label>
          <textarea
            rows="3"
            placeholder='Description'
            {...register('description')}
            className='w-full bg-zinc-700 text-white px-4 py-2 my-2 rounded-md'
          ></textarea>

          <label htmlFor="date">Date</label>
          <input
            type="date"
            {...register('date')}
            className='w-full bg-zinc-700 text-white px-4 py-2 my-2 rounded-md'
          />

          <button className="bg-indigo-500 px-3 py-2 rounded-md">Save Task</button>

        </form>
      </div>
    </div>
  )
}
