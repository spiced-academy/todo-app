import MainContainer from "@/components/Navigation/MainContainer";
import TaskList from "@/components/TaskList/TaskList";
import AddTaskInput from "@/components/Task/AddTaskInput";
import SetupModal from "@/components/Modal/Modal";
import "./TasksContainer.module.css";
import { completeTask, createTask, deleteTask, updateTask } from "@/services/TaskService";

interface TasksContainerComponentProps {
  tasks: Task[];
  mainTitle: string;
}

const TasksContainerComponent = ({ mainTitle, tasks }: TasksContainerComponentProps) => {
  return (
    <MainContainer mainTitle={mainTitle}>
      <SetupModal createTask={createTask}/>
      <AddTaskInput createTask={createTask} />
      <TaskList tasks={tasks} completeTask={completeTask} deleteTask={deleteTask} updateTask={updateTask}/>
    </MainContainer>
  );
};

export default TasksContainerComponent;
