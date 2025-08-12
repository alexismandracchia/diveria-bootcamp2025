import { useState } from 'react';

export default function TaskItem({ task, onToggle, onDelete, onEdit }) {
    const [hover, setHover] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(task.title);
    const [editDesc, setEditDesc] = useState(task.description);

    const handleSave = () => {
        onEdit(task.id, editTitle, editDesc);
        setIsEditing(false);
    };

    return (
        <li
            className={`task-item ${task.completed ? 'completed' : ''} ${hover ? 'hover' : ''}`}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            {isEditing ? (
                <div className="edit-form">
                    <textarea
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    placeholder="Titulo de la Tarea"
                    rows={2}
                    />
                    <textarea
                    value={editDesc}
                    onChange={(e) => setEditDesc(e.target.value)}
                    placeholder="Descripcion de la Tarea"
                    rows={2}
                    />
                    <button className="btn" onClick={handleSave}>Guardar</button>
                    <button className="btn btn-clear" onClick={() => setIsEditing(false)}>Cancelar</button>
                </div>
            ) : (
                <>
                <label className="task-label task-label-grow">
                    <input type="checkbox" checked={task.completed} onChange={onToggle}/>
                    <div>
                        <div className="task-line">{task.title}</div>
                        {task.description && <div className="task-line">{task.description}</div>}
                    </div>
                </label>
                <div className="actions">
                    <button className="btn btn-clear" onClick={() => setIsEditing(true)}></button>
                    <button className="btn btn-danger" onClick={onDelete} aria-label="Eliminar Tarea"></button>
                </div>
            </>
        )}
    </li>
    );
}
