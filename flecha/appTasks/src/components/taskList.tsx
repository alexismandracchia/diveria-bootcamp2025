import type { Task } from "./task";
import { TaskItem } from "./taskItem";
import '../styles/list.css';

interface TaskListProps {
  tasksList: Task[];
  deleteTask: (index: number) => void;
  completeTask: (index: number) => void;
}

export function TaskList({ tasksList, deleteTask, completeTask }: TaskListProps) {
  return(
    <div className="taskList">
      {tasksList.length === 0 && <p>No hay tareas pendientes. Comienza a agregar :)</p>}
      {tasksList.map((task, index) => (
        <TaskItem key={index} title={task.title} description={task.description} completed={task.completed} deleteTask={() => deleteTask(index)} completeTask={() => completeTask(index)} />
      ))}
    </div>
  )
}