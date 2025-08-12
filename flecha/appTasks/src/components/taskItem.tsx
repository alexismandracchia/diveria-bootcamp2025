import "../styles/item.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faPenToSquare,
  faCircleCheck,
  faCircle
} from "@fortawesome/free-solid-svg-icons";

interface TaskItemProps {
  title: string;
  description: string;
  completed: boolean;
  deleteTask: () => void;
  completeTask: () => void;
}

export function TaskItem({
  title,
  description,
  completed,
  deleteTask,
  completeTask,
}: TaskItemProps) {
  return (
    <div className={`taskItem ${completed ? "completed" : ""}`}>
      <div className="taskItem-title">
      <button className="completeButton" onClick={completeTask}>
          <FontAwesomeIcon icon={completed? faCircleCheck : faCircle} />
        </button>
      <h3>{title}</h3>
      </div>
      <p>{description}</p>
      <div className="button-container">
        <button className="deleteButton" onClick={deleteTask}>
          <FontAwesomeIcon icon={faTrash} />
        </button>
        <button className="editButton" onClick={deleteTask}>
          <FontAwesomeIcon icon={faPenToSquare} />
        </button>
      </div>
    </div>
  );
}
