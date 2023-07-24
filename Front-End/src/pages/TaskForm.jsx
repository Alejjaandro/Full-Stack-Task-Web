import { useForm } from 'react-hook-form';
import { useTasks } from '../context/TaskContext';

export default function TaskForm() {

  const { register, handleSubmit } = useForm();

  const { createTask } = useTasks();

  const onSubmit = handleSubmit((data) => {
    createTask(data);
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

        <button>Save Task</button>

      </form>
    </div>
  )
}
