import TaskItem from './TaskItem';

export default function TaskList({ tasks, onToggle, onDelete, onEdit }) {
    if (tasks.length === 0){
        return <p className="empty"> No hay Tareas Disponibles </p>;
    }
    return (
        <ul className="task-list">
            {tasks.map(task => (
                <TaskItem
                    key={task.id}
                    task={task}
                    onToggle={() => onToggle(task.id)}
                    onDelete={() => onDelete(task.id)}
                    onEdit={onEdit}
                />
            ))}
        </ul>
    );
}