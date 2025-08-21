function formatDate(isoDate) {
  if (!isoDate) return null;
  const d = new Date(isoDate + "T00:00:00");
  return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}

function isOverdue(task) {
  if (!task.dueDate || task.completed) return false;
  const today = new Date(); today.setHours(0,0,0,0);
  const due = new Date(task.dueDate + "T00:00:00");
  return due < today;
}

export default function TaskItem({ task, onToggle, onDelete }) {
  const dateLabel = formatDate(task.dueDate);
  const overdue = isOverdue(task);

  return (
    <li className={`item prio-${task.priority} ${task.completed ? "item--done" : ""}`}>
      <button
        className="check"
        role="checkbox"
        aria-checked={task.completed}
        aria-label={task.completed ? "Desmarcar tarea" : "Completar tarea"}
        onClick={onToggle}
      />
      <div className="item__main">
        <div className="item__top">
          <span className="item__name">{task.name}</span>
          <div className="badges">
            {task.completed && <span className="badge badge--success">Completada</span>}
            {dateLabel && !task.completed && (
              <span className={`badge ${overdue ? "badge--danger" : "badge--info"}`}>
                {overdue ? "Vencida: " : "Fecha: "}{dateLabel}
              </span>
            )}
          </div>
        </div>
        {task.description && <p className="item__desc">{task.description}</p>}
      </div>
      <div className="item__actions">
        <button className="btn btn--ghost" onClick={onToggle}>
          {task.completed ? "Desmarcar" : "Completar"}
        </button>
        <button className="btn btn--danger" onClick={onDelete} aria-label="Eliminar">
          Eliminar
        </button>
      </div>
    </li>
  );
}
