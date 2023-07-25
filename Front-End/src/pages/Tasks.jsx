import { useEffect } from 'react';
import { useTasks } from '../context/TaskContext';
import TaskCard from '../components/TaskCard';

export default function Tasks() {

  const { getTasks, tasks } = useTasks();

  useEffect(() => {
    getTasks();
  }, []);

  if (tasks.length === 0) return (<h1>No Tasks</h1>);

  return (
    <div className='grid grid-cols-3 gap-2'>
      {/* Go through the tasks array and make a card for each one. */}
      {tasks.map( (task) => (<TaskCard task={task} key={task._id} />) )}
    </div>
  )
}
