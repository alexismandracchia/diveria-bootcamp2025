import TaskItem from "./TaskItem.jsx";

export default function TaskList({ tasks, onToggle, onDelete }) {
  if (!tasks.length) return <p className="empty">No hay tareas todavía.</p>;
  return (
    <ul className="list">
      {tasks.map((t) => (
        <TaskItem
          key={t.id}
          task={t}
          onToggle={() => onToggle(t.id)}
          onDelete={() => onDelete(t.id)}
        />
      ))}
    </ul>
  );
}
