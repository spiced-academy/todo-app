import TasksContainer from "@/components/TasksContainer/TasksContainer";
import { getTasksByState } from "@/services/TaskService";

interface HomePageProps {
  params: {
    taskState: TaskState
  }
}

export default async function HomePage({ params }: HomePageProps) {

  const filterState = (params.taskState || [])[0] as (TaskState | undefined)

  const tasks = await getTasksByState(filterState)

  return <TasksContainer mainTitle={"All Tasks"} tasks={tasks} />;
}

