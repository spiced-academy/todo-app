import { fonts } from "@/lib/fonts";

import '@/styles/global.css'
import { SessionProvider } from "@/providers/session-provider";
import { ChakraProvider } from "@/providers/chacra-provider";
import { TasksProvider } from "@/providers/tasks-provider";
import { getTasksByState } from '@/services/TaskService';

export default async function RootLayout({ params, children }: { params: { filter: string }, children: React.ReactNode }) {
  const filter = params.filter?.[1] as TaskState || null

  const tasks = (await getTasksByState(filter)).map(task => ({
    ...task,
    completed: task.completed === null ? false : task.completed,
  }));

  return (
    <html data-theme="light" lang="en">
      <body className={fonts.rubik.className}>
        <SessionProvider>
            <ChakraProvider>
              <TasksProvider initialTasks={tasks}>
                {children}
              </TasksProvider>
            </ChakraProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
