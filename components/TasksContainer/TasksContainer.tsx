import MainContainer from "@/components/Navigation/MainContainer";
import TaskList from "@/components/TaskList/TaskList";
import AddTaskInput from "@/components/Task/AddTaskInput";
import SetupModal from "@/components/Modal/Modal";
import "./TasksContainer.module.css";
import { completeTask, createTask, deleteTask, updateTask, assignTaskToUser } from "@/services/TaskService";
import { getUsers } from "@/services/UserService";

interface TasksContainerComponentProps {
  mainTitle: string;
}

const TasksContainerComponent = async ({ mainTitle }: TasksContainerComponentProps) => {
  return (
      <MainContainer mainTitle={mainTitle}>
        <SetupModal createTask={createTask} />
        <AddTaskInput createTask={createTask} />
        <TaskList users={await getUsers()} completeTask={completeTask} deleteTask={deleteTask} updateTask={updateTask} assignTaskToUser={assignTaskToUser} />
      </MainContainer>
  );
};

export default TasksContainerComponent;
