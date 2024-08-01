
import TasksContainer from '@/components/TasksContainer/TasksContainer';
import { redirect } from 'next/navigation';

export default async function HomePage({params}: {params: {filter: string}}) {
  if (params.filter && params.filter[0] !== 'filter') {
    return redirect('/404')
  }

  return <TasksContainer mainTitle={"All Tasks"} />;
}
