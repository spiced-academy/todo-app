
import TasksContainer from '@/components/TasksContainer/TasksContainer';
import { getTasksByState } from '@/services/TaskService';

export default async function HomePage({params}: {params: {taskState: TaskState}}) {
  const filter = params.taskState as TaskState || null

  const tasks = (await getTasksByState(filter)).map(task => ({
    ...task,
    completed: task.completed === null ? false : task.completed,
  }));

  return <TasksContainer mainTitle={"All Tasks"} tasks={tasks} />;
}
