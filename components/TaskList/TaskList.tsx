"use client"
import { FC } from "react";
import {
  UnorderedList, useToast
} from "@chakra-ui/react";
import { useTaskStore } from "@/store";
import JSConfetti from "js-confetti";
import TaskItem from "@/components/TaskItem/TaskItem";
import { User } from "@prisma/client";
import { useTasks } from "@/contexts/TasksContext";

interface TaskListProps {
  users: User[];
  completeTask: (taskId: string) => Promise<Task>
  deleteTask: (taskId: string) => Promise<void>
  updateTask: (taskId: string, title: string) => Promise<Task>
  assignTaskToUser: (taskId: string, userId: string) => Promise<Task>
}

const TaskList: FC<TaskListProps> = ({ users = [], completeTask, updateTask, assignTaskToUser, deleteTask }) => {
  const context = useTasks();
  const toast = useToast();
  const funMode = useTaskStore((state) => state.funMode);
  const searchTerm = useTaskStore((state) => state.searchTerm);

  if (!context || !context.tasks) {
    return null
    // throw new Error('TasksContext is not available');
  }

  const { tasks, assignTask: assignTaskContext, updateTask: updateTaskContext, deleteTask: deleteTaskContext, completeTask: completeTaskContext } = context;

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAssignTask = async (taskId: string, userId: string) => {
    try {
      await assignTaskToUser(taskId, userId );
      assignTaskContext(taskId, userId);
    } catch (error) {
      console.error(error)
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      await deleteTask(taskId);
      deleteTaskContext(taskId);

      toast({
        title: "Task deleted",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      const message = (error as Error).message;
      toast({
        title: "Error deleting task",
        description: message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleEditTask = async (taskId: string, nextValue: string) => {
      await updateTask(taskId, nextValue);
      updateTaskContext(taskId, nextValue);
  };

  const handleCompletedTask = async (taskId: string) => {
    try {
      const task = await completeTask(taskId);
      completeTaskContext(taskId);
      if (task.completed) {
        if (funMode) {
          const confetti = new JSConfetti();
          confetti.addConfetti({
            emojis: ["🌈", "🐻", "✏️", "✅", "🥳", "🎉", "🦄", "🐻", "🐼"],
            emojiSize: 150,
            confettiRadius: 100,
          });
        } else {
          toast({
            title: "Task Done",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
        }
      }
    } catch (error) {
      toast({
        title: "Error completing task",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } 
  };

  return (
    <UnorderedList styleType="none" spacing={2} marginTop={5}>
      {filteredTasks.map((task) => (
        <TaskItem key={task.id} task={task} handleCompletedTask={handleCompletedTask} handleEditTask={handleEditTask} handleAssignTask={handleAssignTask} handleDeleteTask={handleDeleteTask} users={users} />
      ))}
    </UnorderedList>
  );
}
export default TaskList;