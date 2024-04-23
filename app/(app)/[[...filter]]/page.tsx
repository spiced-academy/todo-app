
import TasksContainer from '@/components/TasksContainer/TasksContainer';
import { getTasksByState } from '@/services/TaskService';
import { redirect } from 'next/navigation';

export default async function HomePage({params}: {params: {filter: string}}) {
  if (params.filter && params.filter[0] !== 'filter') {
    return redirect('/404')
  }
  const filter = params.filter?.[1] as TaskState || null

  const tasks = (await getTasksByState(filter)).map(task => ({
    ...task,
    completed: task.completed === null ? false : task.completed,
  }));

  return <TasksContainer mainTitle={"All Tasks"} tasks={tasks} />;
}
